# Hope Human Foundation

Main site: https://hopehumanfoundation.org

## Current presentation and checkout
The reference-matched English campaign site preserves 54 campaign stories, their established display surnames and authentic Hope Human logo. Shared semantic tokens use the measured reference greens and gold, with locally served Plus Jakarta Sans normal and italic fonts.

Every Donate action opens `/donate?slug=…`. Supported amounts are USD 20, 30, 50, 100, 250 and 500. The final Donate button is pure same-tab navigation: `window.location.replace("https://hopehumanbooks.com/comprar/<slug>")`, mapping each amount to the matching store product ($20 Tom Sawyer, $30 Little Women, $50 Huckleberry Finn, $100 Moby-Dick, $250 American Classics Collection, $500 American Classics Library). The store route `/comprar/<slug>` opens secure checkout from there; this site itself never fetches a session, collects card information, runs a payment processor or simulates payment success, and it does not guarantee direct beneficiary transfers or refunds. Donation-facing pages present only the donation framing; the small note under each donate action states that the donation is processed securely, with no store, book or ebook wording anywhere in the donor flow.

Campaign totals remain clearly labeled Previous fundraising. Proposals and contact messages prepare user-sent emails, not automatic submissions. No unverified event dates, legal registration, EIN or donor records are invented.

## Portable hosting
Runtime immutable assets have byte-identical files in `public/__l5e/assets-v1/`; pointer files alone are not portable to Vercel. Mirror new runtime assets at the same path; do not include QA evidence in production public assets.

Preserve the 16-page explicit prerender list, `crawlLinks:false`, `failOnError:true` and Vercel compiled hook in `vite.config.ts`. Query campaign and donation pages render on demand. `vercel.json` preserves immutable caching. Node 22 was verified in earlier Vercel work; no hosting settings or DNS changed here.

## Development
Use Bun to install dependencies and run the existing test suite. The managed Lovable environment runs preview builds and typechecks automatically.

See `AGENTS.md` for durable architecture rules and `REVIEW.md` for dated evidence and limitations. Do not publish without authorization.
