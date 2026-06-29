# tecMAMBO legal and trust pages

The Terms of Use, Privacy Policy, and Cookie Policy copy are templates, not legal advice. A qualified Kenyan lawyer should review them before launch.

The Editorial standards page is a trust document, not legal advice. Its value depends on it being true. Review every clause so it reflects how tecMAMBO actually operates, and adjust anything that does not match the real workflow before publishing. Pay particular attention to the AI-use, reviews, corrections, sourcing, affiliate, and sponsored-content sections.

The Privacy Policy is written to the Data Protection Act, 2019 of Kenya. Before publishing, confirm whether tecMAMBO must register as a data controller with the Office of the Data Protection Commissioner, complete the privacy placeholders, and verify the regulator's current contact details.

The Cookie Policy is written to align with the Data Protection Act, 2019 of Kenya and standard consent practice. Before publishing, confirm the exact cookies the final stack sets, connect the consent management platform, and verify the regulator's current contact details.

The consent implementation decision is recorded in `docs/decisions/cookie-consent-cmp.md`.

Complete these Terms of Use placeholders in the CMS before publishing:

- `[Legal Entity Name]`
- `[registration number]`
- `[registered address]`
- `[legal contact email]`
- `[general contact email]`
- `[Note for legal review: confirm whether arbitration under the Arbitration Act of Kenya is preferred, and complete this clause accordingly.]`

Complete these Privacy Policy placeholders in the CMS before publishing:

- `[Legal Entity Name]`
- `[registration number]`
- `[registered address]`
- `[privacy contact email]`
- `[Data Protection Officer name or role]`
- `[verify and insert ODPC website and contact details]`

Complete these Cookie Policy placeholders in the CMS before publishing:

- `[Legal Entity Name]`
- `[registered address]`
- `[privacy contact email]`
- `[verify and insert ODPC website and contact details]`

Complete these Editorial standards placeholders in the CMS before publishing:

- `[Effective date]`
- `[editorial contact email]`
- `[Legal Entity Name]`
- `[registered address]`

Cookie-list maintenance:

- Prefer the live, auto-maintained list from the consent management platform.
- If a fallback cookie table is needed, edit it in the Legal Page ACF fields and review it whenever analytics, ads, embeds, tags, or consent tools change.

Content guards run in `npm run test`:

- Legal and policy pages must not contain an em dash character or em dash HTML entity.
- Legal and policy pages must use the exact brand casing `tecMAMBO`.
