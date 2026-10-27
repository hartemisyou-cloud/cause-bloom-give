# Global Recent Donations illustrative fallback

## Coverage
- All 56 current campaign pages render five visible entries per page with 5–10 total campaign-bound examples; future slugs receive the same shared fallback automatically.
- Desktop uses the approved sidebar. Below 1024px the same section appears in the main campaign column, since the sidebar is hidden there.

## Data boundary
- A deterministic slug-keyed generator produces stable fictional names, cents amounts and fixed illustrative dates. No storage, seed writes, transactions or external requests are needed.
- A conspicuous group notice says “Illustrative examples — not real donations”. Each row identifies a fictional donor and an illustrative date. Top markers are explicitly examples.
- Simulated records have their own type and are never added to confirmed donations, funding totals, public contribution counts, support messages or analytics.
- Any eligible confirmed public record for the campaign replaces the entire illustrative list. Private, pending, refunded, malformed or other-campaign records do not qualify.
- Real records retain original-timestamp relative formatting. Illustrations use fixed, explicitly illustrative absolute dates rather than suggesting recent payments.
- Loading/error states remain truthful. Contribution history and mobilization highlights remain authentic-only. No real donation service was added; an authoritative feed is still required for real history.

## Validation
- Full suite: 102 tests passed across 19 files, including eight deterministic-fallback tests and component replacement/label-boundary tests.
- Browser: every one of the 56 campaign URLs checked; 375/639/1280px verified for See all, See top, pagination and unchanged rows after reload.
- No horizontal overflow or browser page errors in these checks. Screenshots inspected at mobile and desktop sizes.
- Automatic preview build: OK. Leaf metadata retained. Checkout, Stripe/webhooks and conversion tracking untouched. No publication or transactions.