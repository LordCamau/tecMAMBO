# Versions

Verified with `npm show <pkg> version` on June 25, 2026 where the brief required latest stable pinning.

| Package | Version |
|---|---:|
| next | 16.2.9 |
| react | 19.2.7 |
| react-dom | 19.2.7 |
| typescript | 6.0.3 |
| next-themes | 0.4.6 |
| graphql-request | 7.4.0 |
| graphql | 16.14.2 |
| @graphql-codegen/cli | 7.1.3 |
| @playwright/test | 1.61.1 |
| axe-core / @axe-core/playwright | 4.12.1 |

Additional pinned packages are recorded in `apps/web/package.json` and `package-lock.json`.

Note: `npm show graphql version` reported `17.0.1`, but `graphql-request@7.4.0` peers on GraphQL 14-16. The app pins the latest compatible 16.x line instead of forcing an invalid dependency tree.

Note: `npm show eslint version` reported `10.5.0`, but the Next.js 16 lint config failed under ESLint 10. The app pins the latest compatible 9.x line.
