# tecMAMBO routing model

## URL shapes

- Section index: `/{section}`
- Article URL: `/{section}/{slug}`
- Section topic archive: `/{section}/{topicSlug}`
- Wearables filters: `/reviews/wearables`, `/reviews/wearables/headphones`, `/reviews/wearables/smart-watches`, `/reviews/wearables/vr-ar`

## Resolution order

For `/{section}/{segment}`, resolve in this order:

1. If `segment` is a reserved topic slug for the section, render the section-topic archive.
2. Otherwise treat `segment` as an article slug and render the article when its format belongs to that section.
3. Otherwise return 404.

## Reserved topic slugs

News:

- `ai`
- `apps`
- `smartphones`
- `computing`
- `social-media`
- `entertainment`
- `evs-mobility`

Reviews:

- `smartphones`
- `laptops-pcs`
- `gaming`
- `wearables`

Wallet Watch:

- `smartphones`
- `laptops-pcs`
- `smart-homes`
- `wearables`

Business:

- `startups`

Wearables filter URLs:

- `headphones`
- `smart-watches`
- `vr-ar`

## Collision rule

Editors must not publish an article slug that matches a reserved topic slug within the same section. The WordPress mu-plugin enforces this through `wp_insert_post_data`; colliding slugs are auto-suffixed with `-story`.
