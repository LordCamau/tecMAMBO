# Runbook

## Local development

1. Install dependencies with `npm install`.
2. Copy `apps/web/.env.example` to `apps/web/.env.local` and fill secrets.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Add a format, topic, or brand

- Add the term in WordPress.
- For local placeholder data, update `apps/web/lib/sample-data.ts`.
- For a new format, update `apps/web/lib/formats.ts` and add archive copy.

## Revalidate content

WordPress should call:

```bash
curl -X POST "https://tecmambo.com/api/revalidate?secret=$REVALIDATE_SECRET" \
  -H "content-type: application/json" \
  -d '{"tags":["home","wpgraphql","sitemap","rss","llms"]}'
```

## Rotate secrets

Rotate in Vercel project settings and WordPress webhook settings at the same time:

- `REVALIDATE_SECRET`
- `WP_WEBHOOK_SECRET`
- `WORDPRESS_PREVIEW_SECRET`
- Search provider keys
- CMP and ad keys

## Production checks

- Run `npm run build`.
- Run `npm run test`.
- Check `/sitemap.xml`, `/news-sitemap.xml`, `/feed.xml`, `/feed.json`, `/robots.txt`, `/llms.txt`.
- Check one article HTML and its `.md` mirror.
- Run Lighthouse on home, article, glossary, and search.
