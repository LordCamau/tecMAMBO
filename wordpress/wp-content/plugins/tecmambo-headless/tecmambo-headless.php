<?php
/**
 * Plugin Name: tecMAMBO Headless Helper
 * Description: Keeps WordPress private, creates Next.js preview links, and sends revalidation webhooks.
 * Version: 1.0.0
 */

function tecmambo_headless_env($key, $default = '') {
    $value = getenv($key);
    if ($value !== false && $value !== '') {
        return $value;
    }
    if (defined($key)) {
        return constant($key);
    }
    return $default;
}

function tecmambo_next_site_url() {
    return rtrim(tecmambo_headless_env('TECMAMBO_NEXT_SITE_URL', 'https://tecmambo.com'), '/');
}

function tecmambo_preview_secret() {
    return tecmambo_headless_env('TECMAMBO_PREVIEW_SECRET', '');
}

function tecmambo_webhook_secret() {
    return tecmambo_headless_env('TECMAMBO_WEBHOOK_SECRET', '');
}

function tecmambo_search_secret() {
    return tecmambo_headless_env('TECMAMBO_SEARCH_REINDEX_SECRET', '');
}

add_action('template_redirect', function () {
    if (is_admin() || wp_doing_ajax() || (defined('GRAPHQL_REQUEST') && GRAPHQL_REQUEST) || str_starts_with($_SERVER['REQUEST_URI'] ?? '', '/graphql')) {
        return;
    }

    wp_redirect(tecmambo_next_site_url(), 301);
    exit;
});

add_filter('preview_post_link', function ($preview_link, $post) {
    $secret = tecmambo_preview_secret();
    if (!$secret || !in_array($post->post_type, ['post', 'glossary'], true)) {
        return $preview_link;
    }

    return add_query_arg(
        [
            'secret' => $secret,
            'id' => $post->ID,
            'slug' => $post->post_name,
            'type' => $post->post_type === 'post' ? 'article' : 'glossary',
        ],
        tecmambo_next_site_url() . '/api/preview'
    );
}, 10, 2);

function tecmambo_terms_for_webhook($post_id, $taxonomy) {
    $terms = wp_get_object_terms($post_id, $taxonomy, ['fields' => 'slugs']);
    if (is_wp_error($terms)) {
        return [];
    }
    return array_values($terms);
}

function tecmambo_revalidate_payload($post_id, $post) {
    $format_terms = tecmambo_terms_for_webhook($post_id, 'format');
    return [
        'id' => $post_id,
        'slug' => $post->post_name,
        'type' => $post->post_type === 'glossary' ? 'glossary' : 'article',
        'section' => $format_terms[0] ?? '',
        'topics' => tecmambo_terms_for_webhook($post_id, 'topic'),
        'brands' => tecmambo_terms_for_webhook($post_id, 'brand'),
        'regions' => tecmambo_terms_for_webhook($post_id, 'region'),
    ];
}

function tecmambo_call_revalidate($post_id, $post) {
    $secret = tecmambo_webhook_secret();
    if (!$secret || wp_is_post_revision($post_id) || !in_array($post->post_type, ['post', 'glossary', 'legal'], true)) {
        return;
    }

    wp_remote_post(tecmambo_next_site_url() . '/api/revalidate', [
        'timeout' => 4,
        'headers' => [
            'Content-Type' => 'application/json',
            'X-tecMAMBO-Revalidate-Secret' => $secret,
        ],
        'body' => wp_json_encode(tecmambo_revalidate_payload($post_id, $post)),
    ]);

    $search_secret = tecmambo_search_secret();
    if ($search_secret && in_array($post->post_type, ['post', 'glossary'], true)) {
        wp_remote_post(tecmambo_next_site_url() . '/api/search/reindex', [
            'timeout' => 4,
            'headers' => [
                'Content-Type' => 'application/json',
                'X-tecMAMBO-Search-Secret' => $search_secret,
            ],
            'body' => wp_json_encode([
                'id' => $post_id,
                'slug' => $post->post_name,
                'type' => $post->post_type === 'glossary' ? 'glossary' : 'article',
                'action' => $post->post_status === 'trash' ? 'delete' : 'upsert',
            ]),
        ]);
    }
}

add_action('save_post', 'tecmambo_call_revalidate', 20, 2);
add_action('deleted_post', function ($post_id, $post) {
    if ($post instanceof WP_Post) {
        tecmambo_call_revalidate($post_id, $post);
    }
}, 20, 2);
