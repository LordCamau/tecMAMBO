# tecMAMBO Media Kit

The downloadable media kit is generated as an A4 PDF by `scripts/generate-media-kit.py`.

## Output

- Public download file: `apps/web/public/media/tecMAMBO-Media-Kit-2026.pdf`
- Archive copy: `output/pdf/tecMAMBO-Media-Kit-2026.pdf`
- Advertise route: `/api/advertise/media-kit`

The `/advertise` page keeps using its existing light lead gate. After the form succeeds, the API returns the stable media-kit download route.

## Source Of Truth

The PDF seed copy follows the Advertise singleton. The WordPress ACF export in `wordpress/acf-advertise.json` includes editable media-kit fields for:

- audience stats
- specifications
- rate guide rows
- contact details
- current media-kit file

Audience figures, rates, testimonials, and partner logos should stay empty until they are verified. The generated kit uses honest fallback copy such as `Available on request` instead of invented numbers.

## Regeneration

Run the generator from the repo root:

```bash
/Users/aumac/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 scripts/generate-media-kit.py
```

The generator uses the official tecMAMBO logo asset prepared in `apps/web/public/media/tecMAMBO-logo-print.png`, creates a white print variant for purple pages, writes PDF metadata, sets language to English, and blocks em dash characters, bracketed placeholders, and incorrect brand casing before publishing.

After regeneration, render sample pages with Poppler and inspect the cover, an interior page, and the back cover:

```bash
/Users/aumac/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/pdftoppm -png -r 120 apps/web/public/media/tecMAMBO-Media-Kit-2026.pdf tmp/pdfs/rendered/media-kit
```
