# tecMAMBO brand and UI guardrails

- Primary brand violet is `#4C1FC4`, a deeper MAMBO Violet chosen to make tecMAMBO feel calmer and more premium than the earlier electric violet.
- Brand hover and pressed violet is `#3F18A8`; the deepest brand violet is `#2E1568`.
- The former electric violet now lives as `--spark`: `#6E2BFF` in light mode and `#8A5BFF` in dark mode. Use it sparingly for small energy moments only, not default fills or normal text.
- Dark-mode brand links use lifted violets: `#9A78FF` for links and accents, `#B6A2FF` for stronger labels and emphasis.
- Orange remains `#FF8A00` in light mode and `#FFA033` in dark mode. I kept the existing orange instead of tuning it deeper because it preserves the Wallet Watch/value role and still passes contrast with dark ink.
- Orange is reserved for price, urgency, and Wallet Watch deal callouts.
- Do not use white text on orange. Orange callouts use dark ink.
- Filled badge, button, score, newsletter, and price surfaces use stable `--brand-*` fills so dark mode cannot pastel-ize them. Their foregrounds come from paired `--on-*`, `--badge-*`, `--button-*`, `--price-*`, and `--pill-*` tokens.
- Filled MAMBO Explains badges use `#4C1FC4` with white text in both themes; MAMBO vs Real Life uses `#2E1568` with white text; Wallet Watch uses orange with dark ink.
- Lavender tint surfaces are now `#F3F0FB` with `#E4DEF6` hairlines to match the deeper violet family.
- The dark Why it matters surface is `#211B3A`, its border is `#2F2752`, and its label is `#B6A2FF`.
- Light-mode muted grey is `#72727B` so byline and secondary metadata pass AA on the off-white page background.
- Headlines use sentence case.
- Mono type is reserved for labels, tags, specs, and compact metadata.
- Homepage grid lanes are capped at three cards except the hero and latest rail. Feature lanes use a balanced four-story structure.
- Segment pages to aid navigation, not to fill space.
