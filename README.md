# Hope Human Foundation

Main site: https://hopehumanfoundation.org

## Current presentation and checkout
The reference-matched English campaign site preserves 54 campaign stories, their established display surnames and authentic Hope Human logo. Shared semantic tokens use the measured reference greens and gold, with locally served Plus Jakarta Sans normal and italic fonts.

Every campaign Donate action opens `/donate?slug=…`. Supported amounts remain USD 20, 30, 50, 100, 250 and 500. The final action identifies a real ebook purchase and uses same-tab `window.location.replace("https://hopehumanbooks.com/comprar/<slug>")`, mapping each amount to the matching store product ($20 Tom Sawyer, $30 Little Women, $50 Huckleberry Finn, $100 Moby-Dick, $250 American Classics Collection, $500 American Classics Library). The selected title and purchase disclosure appear before navigation. The store handles checkout; this site never fetches a payment session, collects card information, runs a payment processor or simulates payment success. It does not guarantee campaign allocation, direct beneficiary transfers or refunds. Only the seven established UTM/click parameters and genuinely configured ref codes are forwarded, without inventing campaign/session identifiers. `/thank-you` is an acknowledgement, not payment verification.

Campaign totals remain clearly labeled Previous fundraising. Proposals and contact messages prepare user-sent emails, not automatic submissions. No unverified event dates, legal registration, EIN or donor records are invented.

## Adapted crowdfunding capabilities
The uploaded specification is adapted without changing Hope Human colors, logo, typography or full-page amount selection. Cards add source-backed status, summaries, locations, percentages and independent campaign/support/favorite actions. Nine category options derive counts from the unchanged 54 records; absent categories have zero campaigns. Progress safely handles invalid goals and overfunding. Favorites persist only in this browser, with a memory fallback if storage is blocked; they are not public popularity counts. Most Loved remains ranked by previous fundraising. Gallery controls support touch and keyboard, and the mobile action appears only when primary controls are offscreen. No generated donations, new verification, fake updates, impact promises, countdowns, newsletter persistence, payment integrations or Free Hearts credentials are added. Existing language remains English; no unsupported automatic translation is introduced.

## Portable hosting
Runtime immutable assets have byte-identical files in `public/__l5e/assets-v1/`; pointer files alone are not portable to Vercel. Mirror new runtime assets at the same path; do not include QA evidence in production public assets.

Preserve the 16-page explicit prerender list, `crawlLinks:false`, `failOnError:true` and Vercel compiled hook in `vite.config.ts`. Query campaign and donation pages render on demand. `vercel.json` preserves immutable caching. Node 22 was verified in earlier Vercel work; no hosting settings or DNS changed here.

## Development
Use Bun to install dependencies and run the existing test suite. The managed Lovable environment runs preview builds and typechecks automatically.

See `AGENTS.md` for durable architecture rules and `REVIEW.md` for dated evidence and limitations. Do not publish without authorization.
