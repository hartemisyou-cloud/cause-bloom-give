# Hope Human Foundation

Main site: https://hopehumanfoundation.org

## Current presentation and checkout
The reference-matched English campaign site preserves 54 campaign stories, their established display surnames and authentic Hope Human logo. Shared semantic tokens use the measured reference greens and gold, with locally served Plus Jakarta Sans normal and italic fonts.

Every Donate action opens `/donate?slug=…`. Supported amounts are USD 20, 30, 50, 100, 250 and 500. Continue submits an ordinary same-tab native form POST (`target="_top"`) to `https://hopehumanbooks.com/donations/start` with the single urlencoded `payload` field containing `{campaignSlug, amountCents, idempotencyKey, attribution?}`. The Central route at Books resolves `/donations/pay/token` and redirects to Stripe; this site itself never fetches a session, collects card information, runs a payment processor or simulates payment success, and it does not guarantee direct beneficiary transfers or refunds.

Campaign totals remain clearly labeled Previous fundraising. Proposals and contact messages prepare user-sent emails, not automatic submissions. No unverified event dates, legal registration, EIN or donor records are invented.

## Portable hosting
Runtime immutable assets have byte-identical files in `public/__l5e/assets-v1/`; pointer files alone are not portable to Vercel. Mirror new runtime assets at the same path; do not include QA evidence in production public assets.

Preserve the 16-page explicit prerender list, `crawlLinks:false`, `failOnError:true` and Vercel compiled hook in `vite.config.ts`. Query campaign and donation pages render on demand. `vercel.json` preserves immutable caching. Node 22 was verified in earlier Vercel work; no hosting settings or DNS changed here.

## Development
Use Bun to install dependencies and run the existing test suite. The managed Lovable environment runs preview builds and typechecks automatically.

See `AGENTS.md` for durable architecture rules and `REVIEW.md` for dated evidence and limitations. Do not publish without authorization.
