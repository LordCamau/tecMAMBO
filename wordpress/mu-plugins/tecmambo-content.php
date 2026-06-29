<?php
/**
 * Plugin Name: tecMAMBO Content Model
 * Description: Registers tecMAMBO editorial content types, options pages, and taxonomies.
 */

add_action('init', function () {
    add_post_type_support('post', ['excerpt', 'thumbnail', 'revisions', 'author']);

    register_post_type('ad_unit', [
        'label' => 'Ad units',
        'public' => false,
        'show_ui' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'adUnit',
        'graphql_plural_name' => 'adUnits',
        'supports' => ['title', 'editor', 'thumbnail'],
    ]);

    register_post_type('glossary', [
        'label' => 'Glossary',
        'public' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'glossaryTerm',
        'graphql_plural_name' => 'glossaryTerms',
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
        'has_archive' => true,
    ]);

    register_post_type('legal', [
        'label' => 'Legal pages',
        'public' => true,
        'show_ui' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'legalPage',
        'graphql_plural_name' => 'legalPages',
        'supports' => ['title', 'editor', 'revisions'],
        'has_archive' => false,
        'rewrite' => ['slug' => 'legal'],
    ]);

    register_taxonomy('format', ['post'], [
        'label' => 'Format',
        'public' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'format',
        'graphql_plural_name' => 'formats',
        'hierarchical' => true,
    ]);

    register_taxonomy('topic', ['post', 'glossary'], [
        'label' => 'Topic',
        'public' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'topic',
        'graphql_plural_name' => 'topics',
        'hierarchical' => false,
    ]);

    register_taxonomy('brand', ['post'], [
        'label' => 'Brand',
        'public' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'brand',
        'graphql_plural_name' => 'brands',
        'hierarchical' => false,
    ]);

    register_taxonomy('region', ['post'], [
        'label' => 'Region',
        'public' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'region',
        'graphql_plural_name' => 'regions',
        'hierarchical' => true,
        'show_admin_column' => true,
        'rewrite' => ['slug' => 'region'],
    ]);
});

add_filter('register_post_type_args', function ($args, $post_type) {
    if ($post_type !== 'post') {
        return $args;
    }

    $args['show_in_graphql'] = true;
    $args['graphql_single_name'] = 'article';
    $args['graphql_plural_name'] = 'articles';
    $args['supports'] = array_values(array_unique(array_merge($args['supports'] ?? [], ['excerpt', 'thumbnail', 'revisions', 'author'])));

    return $args;
}, 10, 2);

add_action('acf/init', function () {
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page([
            'page_title' => 'tecMAMBO Homepage',
            'menu_title' => 'Homepage',
            'menu_slug' => 'tecmambo-homepage',
            'capability' => 'edit_posts',
            'redirect' => false,
            'show_in_graphql' => true,
        ]);

        acf_add_options_page([
            'page_title' => 'tecMAMBO About',
            'menu_title' => 'About',
            'menu_slug' => 'tecmambo-about',
            'capability' => 'edit_posts',
            'redirect' => false,
            'show_in_graphql' => true,
        ]);

        acf_add_options_page([
            'page_title' => 'tecMAMBO Site Settings',
            'menu_title' => 'Site Settings',
            'menu_slug' => 'tecmambo-site-settings',
            'capability' => 'edit_posts',
            'redirect' => false,
            'show_in_graphql' => true,
        ]);

        acf_add_options_page([
            'page_title' => 'tecMAMBO Advertise',
            'menu_title' => 'Advertise',
            'menu_slug' => 'tecmambo-advertise',
            'capability' => 'edit_posts',
            'redirect' => false,
            'show_in_graphql' => true,
        ]);
    }
});

function tecmambo_reserved_slugs_by_section() {
    return [
        'news' => ['ai', 'apps', 'smartphones', 'computing', 'social-media', 'entertainment', 'evs-mobility'],
        'reviews' => ['smartphones', 'laptops-pcs', 'gaming', 'wearables'],
        'wallet-watch' => ['smartphones', 'laptops-pcs', 'smart-homes', 'wearables'],
        'business' => ['startups'],
    ];
}

function tecmambo_reserved_region_slugs() {
    return ['africa', 'more', 'kenya', 'nigeria', 'south-africa', 'rwanda', 'ghana', 'egypt', 'ethiopia', 'tanzania', 'uganda'];
}

add_filter('wp_insert_post_data', function ($data) {
    if (($data['post_type'] ?? '') === 'glossary' && ($data['post_name'] ?? '') === 'topic') {
        $data['post_name'] = 'topic-term';
        return $data;
    }

    if (($data['post_type'] ?? '') !== 'post' || empty($data['post_name'])) {
        return $data;
    }

    if (in_array($data['post_name'], tecmambo_reserved_region_slugs(), true)) {
        $data['post_name'] = $data['post_name'] . '-story';
        return $data;
    }

    $format_terms = wp_get_object_terms((int) ($data['ID'] ?? 0), 'format', ['fields' => 'slugs']);
    $format_slug = is_wp_error($format_terms) || empty($format_terms) ? '' : $format_terms[0];
    $section_map = [
        'news' => 'news',
        'review' => 'reviews',
        'wallet-watch' => 'wallet-watch',
        'business' => 'business',
    ];
    $section = $section_map[$format_slug] ?? '';
    $reserved = tecmambo_reserved_slugs_by_section()[$section] ?? [];

    if (in_array($data['post_name'], $reserved, true)) {
        $data['post_name'] = $data['post_name'] . '-story';
    }

    return $data;
}, 20);
