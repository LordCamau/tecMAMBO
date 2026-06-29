# tecMAMBO content model notes

## Homepage singleton

The frontend now uses `apps/web/lib/home-curation.ts` as the local fallback for the planned WordPress Homepage singleton. The matching ACF export lives at `/wordpress/acf-homepage.json`.

Expected WordPress fields:

- `hero_article`
- `hero_fallback`
- `latest_rail`
- `lanes`
- `glossary_spotlight`
- `promo_partner`

Lane rows should expose:

- `key`
- `title`
- `eyebrow`
- `enabled`
- `order`
- `featured_article`
- `source`
- `count`

## Imagery

Every article must have a unique featured image with alt text and credit. The local draft loader uses deterministic topic-matched Unsplash placeholders until real CMS images exist.

## Deals

Wallet Watch articles may carry a `deal` object with product, retailer, price, affiliate URL, expiry, threshold, and verification fields. Product/Offer schema only renders when `verified` is true.

## Region taxonomy

Region is a cross-cutting taxonomy for stories with specific country relevance. It sits beside Format, Topic, and Brand, so a story can be News, AI, Google, and Kenya without changing its article URL.

Current seeded group: Africa. Seeded country terms: Kenya, Nigeria, South Africa, Rwanda, Ghana, Egypt, Ethiopia, Tanzania, and Uganda.

Editorial rule: tag the country or countries the story is about or especially useful to. Leave global stories untagged. Do not add a country tag just because a global story is readable there.

Regional hub markdown mirrors live at `/africa.md` and `/africa/<country>.md`.
