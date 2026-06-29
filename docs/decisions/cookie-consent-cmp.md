# Cookie consent CMP decision

Chosen CMP: Cookiebot CMP by Usercentrics, integrated with a custom tecMAMBO visual layer for production.

Why:

- Google lists Cookiebot CMP as a certified CMP option for IAB TCF integration and Additional Consent support.
- Source: `https://support.google.com/admanager/answer/13554116`
- The production consent layer must support TCF v2.2, Google Consent Mode v2, consent logging, geo rules, and US state signals such as GPP.
- tecMAMBO controls the visual layer so the banner and modal match the brand, while the production CMP is responsible for TC strings, the Global Vendor List, vendor disclosure, proof of consent, and regulator-ready logging.

Current repo integration:

- `CookieConsent` provides the tecMAMBO visual layer, category state, Consent Mode v2 defaults and updates, local proof-of-choice logging, GPC handling, and the global reopen API.
- `CookiePreferencesButton` opens the tecMAMBO preference modal and can fall back to common CMP APIs.
- Production must set `NEXT_PUBLIC_COOKIEBOT_ID` to load the Cookiebot CMP script, then configure the Cookiebot vendor list before Google Ad Manager, analytics, or embedded social scripts are enabled.

Consent Mode defaults:

- `ad_storage`: denied
- `analytics_storage`: denied
- `ad_user_data`: denied
- `ad_personalization`: denied
- `functionality_storage`: denied
- `personalization_storage`: denied
- `security_storage`: granted

Geo logic:

- Privacy-first global default: show choices and keep non-essential categories off until an affirmative action.
- EEA and UK visitors must receive GDPR and UK GDPR consent treatment through TCF v2.2.
- Kenyan visitors receive non-essential cookie consent treatment aligned with the Data Protection Act, 2019.
- US state opt-out and GPP signals must be handled by the production CMP configuration.
- Global Privacy Control and Do Not Track are treated as opt-out signals for advertising and social tracking in the local layer.

Consent logging:

- The local layer stores category choices, timestamp, policy version, expiry, GPC state, and a local consent string in `localStorage`.
- Production CMP logging must be enabled for regulator-grade proof of consent and vendor-level consent records.
- Current policy version: `2026-04-15`.
- Current expiry: 180 days.

Pre-consent blocking:

- No non-essential script should be loaded outside a consent-gated path.
- Google Ad Manager, analytics, advertising tags, and social embeds must wait for the matching consent category.
- Verify with browser devtools and tag-auditor tooling before launch.
