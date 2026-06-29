# Decision: static content adapter before WPGraphQL integration

The workspace started empty and no WordPress instance or schema endpoint was available. The app therefore ships with typed sample content behind `apps/web/lib/content.ts`.

The data functions mirror the CMS boundary. The active integration now lives in `apps/web/lib/cms`, with `CONTENT_SOURCE=local|wordpress` controlling the source. Local content remains the fallback until a WordPress host, WPGraphQL endpoint, secrets, and migration run are verified.
