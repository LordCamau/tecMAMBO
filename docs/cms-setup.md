# tecMAMBO headless WordPress setup

This repository is ready for a headless WordPress connection, but a live WordPress instance and credentials must be provided by the site owner. The frontend defaults to local content until the CMS is verified.

## Required human-provided pieces

- A reachable private WordPress instance, recommended `https://cms.tecmambo.com`.
- WPGraphQL endpoint, for example `https://cms.tecmambo.com/graphql`.
- A WordPress Application Password or JWT-equivalent credential for migration and preview only.
- Shared secrets for preview, revalidation, and search reindexing.
- DNS, hosting, SSL, Cloudflare Access or IP allow-listing, and WordPress admin accounts.

Do not hardcode any of these values. Put them in environment variables.

## Environment variables

Copy `.env.example` and set:

- `CONTENT_SOURCE`: `local` or `wordpress`. Keep `local` until the migration and verification are complete.
- `WORDPRESS_GRAPHQL_ENDPOINT`: the WPGraphQL endpoint.
- `WORDPRESS_API_TOKEN_OR_APP_PASSWORD`: server-only credential for authenticated preview and migration. Use a base64 `username:application-password` value when using Basic auth.
- `WORDPRESS_PREVIEW_SECRET`: shared secret for `/api/preview`.
- `REVALIDATE_SECRET` or `WP_WEBHOOK_SECRET`: shared secret for `/api/revalidate`.
- `SEARCH_REINDEX_SECRET`: shared secret for `/api/search/reindex`.
- `TYPESENSE_*` or `ALGOLIA_*`: optional search provider credentials.
- `SITE_URL`: public frontend URL.

Only values intentionally exposed to browsers may use `NEXT_PUBLIC_`. None of the CMS credentials should.

## WordPress install steps

1. Install the required plugins from `wordpress/plugins.json`.
2. Copy `wordpress/mu-plugins/tecmambo-content.php` into `wp-content/mu-plugins/`.
3. Install `wordpress/wp-content/plugins/tecmambo-headless/` as a normal plugin and activate it.
4. In `wp-config.php`, define:

```php
define('TECMAMBO_NEXT_SITE_URL', 'https://tecmambo.com');
define('TECMAMBO_PREVIEW_SECRET', 'paste-preview-secret');
define('TECMAMBO_WEBHOOK_SECRET', 'paste-revalidate-secret');
define('TECMAMBO_SEARCH_REINDEX_SECRET', 'paste-search-secret');
```

5. Import the ACF JSON field groups from `wordpress/acf-*.json`.
6. Import seed region terms from `wordpress/region-terms-seed.json`.
7. In WPGraphQL Smart Cache, enable persisted operations for production and connect object caching.
8. Lock the WordPress public theme frontend. Public readers should only reach the Next.js app.

## Codegen

After WordPress and WPGraphQL are reachable:

```bash
WORDPRESS_GRAPHQL_ENDPOINT=https://cms.tecmambo.com/graphql npm --workspace apps/web run cms:codegen
```

The generated file will be written to `apps/web/lib/cms/generated/graphql.ts`. If the live schema uses different ACF field names, adjust the ACF GraphQL field names or the query documents in `apps/web/lib/cms/queries.ts`, then rerun codegen.

## Migration

The migration script is idempotent and matches existing WordPress posts by slug. It defaults to dry run.

```bash
WORDPRESS_GRAPHQL_ENDPOINT=https://cms.tecmambo.com/graphql npm --workspace apps/web run cms:migrate
```

To write to WordPress:

```bash
DRY_RUN=false WORDPRESS_GRAPHQL_ENDPOINT=https://cms.tecmambo.com/graphql WORDPRESS_API_TOKEN_OR_APP_PASSWORD=base64-user-app-password npm --workspace apps/web run cms:migrate
```

The script prints a JSON report with created, updated, skipped, and failed items. Authors are skipped by default because they should be matched to existing WordPress users or created by an administrator.

## Cutover plan

1. Keep `CONTENT_SOURCE=local`.
2. Configure WordPress, import field groups, install plugins, and run codegen.
3. Run the migration in dry-run mode.
4. Run the migration with `DRY_RUN=false`.
5. Spot-check WordPress content counts against the migration report.
6. Set `CONTENT_SOURCE=wordpress` in a staging deployment.
7. Verify homepage, article pages, archives, topics, brands, regions, glossary, authors, search, feeds, sitemap, preview, and revalidation.
8. Flip production to `CONTENT_SOURCE=wordpress`.
9. Keep local fallback content until sign-off. Remove it only in a later change.

## Current status

The repository now includes:

- Feature-flagged CMS data layer in `apps/web/lib/cms`.
- Local fallback through `apps/web/lib/content.ts`.
- Next draft-mode preview at `/api/preview`.
- Preview exit at `/api/preview/exit`.
- Secret-protected revalidation at `/api/revalidate`.
- Secret-protected search reindex hook at `/api/search/reindex`.
- WordPress must-use content model plugin and headless helper plugin.
- ACF JSON exports and plugin manifest.
- Idempotent migration script.

Still needed from the human:

- Live WordPress host and WPGraphQL endpoint.
- WordPress admin access.
- Application Password or JWT credential.
- Shared secrets.
- A staging run of codegen and migration against the live schema.
