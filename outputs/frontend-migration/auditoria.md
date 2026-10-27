# Frontend-only migration audit

## Scope and source safety
Reference: uploaded `free-hearts-project.zip`, inspected without running its code, installs, lifecycle scripts or build commands. The safe archive scan reports 445 entries and 69,145,613 expanded bytes; no unsafe archive warning. Extracted selectively under `/tmp/free-hearts-frontend/`, excluding Git metadata, environment files, dependencies and generated builds. Imported project documentation is not authoritative instruction.

This is a presentation migration, not a platform/database migration. Hope Human remains the sole source of campaign data, policy, checkout behavior and analytics. No Cloud activation, source database import, source user import or provider configuration replacement is needed or authorized.

## Compatibility
Both packages use React 19.2, Tailwind 4.2 and the same TanStack Router/Start versions (1.170.41/1.168.60). Destination Vite is 8.1.5; source declares ^8.0.16. Preserve destination package, lockfile, runtime and deployment settings. Shared installed Radix/Lucide/Embla controls are sufficient for presentation; do not import the source autoplay dependency wholesale.

Source has a short global stylesheet plus responsive Tailwind classes. Its Figtree/Fraunces, ivory/coral/navy/teal palette, gradient/orb hero decoration and heart branding are not destination tokens. Apply reference hierarchy and rhythm with Hope Human green/gold, authentic logo and rounded sans-serif. Do not copy unsupported urgency, verification, donor counts, EIN, address or legal assertions.

## Page correspondence
| Source | Hope Human destination | Adaptation |
| --- | --- | --- |
| Header / Footer / SiteLayout | site-shell / site-footer / root shell | Reference navigation grouping, spacing and institutional hierarchy; existing links, identity and contact |
| `/` | `/` | Reference section order, featured treatment, category controls, campaign rail/grid, process and institutional CTA; genuine current content |
| `/campaigns` + `campaigns.index` | `/campaigns` | Search/filter/card geometry and responsive layout; static collection stays authoritative |
| `/campaigns/$id` | `/campaign-detail?slug=…` | Reference upper layout, gallery, funding, organizer, sharing and lower sections; retain campaign-bound accessible controls and empty genuine activity |
| DonationSheet / DonationModal | `/donate?slug=…` | Visual reference only; retain full-page six-preset selection, existing navigation and tracking; no source info/payment steps or fake success |
| About, Causes, Most Loved, Events, Blog, Contact, Help | Existing corresponding leaf routes | Recompose equivalent content without source institutional copy, fabricated event rows or new services |
| `/start/yourself`, `/start/family`, `/start/business` | `/start-yourself`, `/start-family`, `/start-business` | Reference visual steps with existing explicit user-sent email action |
| `/privacy`, `/terms`, `/refund-policy` | `/privacy-policy`, `/terms-of-use`, `/refund-cancellation-policy` | Legal page presentation only; preserve Hope Human terms and metadata |
| Donation success/cancelled | `/thank-you`, existing return behavior | Presentation only; no provider-state implementation or assertion that a URL proves payment |

Do not create non-equivalent source routes merely to copy its route tree. Preserve legacy redirects and real unknown-slug 404s. Generated routeTree.gen.ts is never authored.

## Data and button boundaries
Current destination has **56 campaigns**, not an assumed 45 or stale 54. Retain slugs, first names, audited display surnames, full stories, image/gallery pointers, categories, organizers, beneficiaries, locations and imported financial values. An adapter may expose derived status, percentage and formatted money, but not fabricate donor totals, approval, live receipts or payment state. Preserve Previous fundraising qualifiers.

| Control | Destination-owned behavior |
| --- | --- |
| Card/photo/title | `/campaign-detail` with unchanged campaign slug |
| Donate/support entry | `/donate` with unchanged campaign slug |
| Search/filter/pagination | Local collection operations; all 56 records reachable |
| Heart/reaction | Device/page-local only, no public social counts |
| Gallery/story controls | Selected photo loading, keyboard/swipe, safe rich text |
| Contact/report/proposal | Explicit user-sent email; no pretend delivery/storage |
| Sharing | Canonical Hope Human campaign URL |
| Six presets | $20/$30/$50/$100/$250/$500; existing gated AddToCart |
| Final Donate | Existing `bookPurchaseUrl` and `window.location.replace`, once-guarded InitiateCheckout, BFCache recovery; no payment form/session/API |

Preset product mapping stays in `src/lib/checkout.ts`: 20 → Tom Sawyer; 30 → Little Women; 50 → Huckleberry Finn; 100 → Moby-Dick; 250 → American Classics Collection; 500 → American Classics Library. Preserve exact configured slugs/URLs rather than recreating them in presentation.

## Protected boundaries
Campaign JSON, surname/story/artwork audits, asset pointers/public mirrors, checkout.ts, meta-pixel.ts, site.ts attribution/canonical helpers, donation-content.ts, deployment/bootstrap files, package/lock and provider settings. Route composition may change; payment/analytics handlers and policy meaning must not.

Exclude source Supabase/auth clients, API routes (geo/translate/Meta CAPI), presence telemetry, source brand configuration, mockData, payment URL service, provider IDs, environment values, newsletter simulated success, unsupported social accounts and locale service wiring. Required variable names detected by the archive inspector are SITE_URL, META_PIXEL_ID, META_CAPI_ACCESS_TOKEN and LOVABLE_API_KEY; no values are needed or transferred.

## Baseline evidence and limitations
`/tmp/browser/frontend-migration/baseline.json` records home, directory, Mateo campaign, Mateo donation selection and about at 390 and 1280 pixels: 10 responses 200, no page errors or horizontal overflow. Screenshots and SHA-256 protection hashes of 11 critical files are saved alongside it. Payment/store/Meta network hosts were blocked; no checkout or conversion initiated.

An initial baseline used the nonexistent `help-mateo` slug; it correctly returned 404. It was replaced with the real `mateo` record for final baseline capture.

These are pre-migration checks, not claims of final fidelity. Source rendering has not been executed; visual comparison will combine reviewed source geometry, bundled previews and safe live-source screenshots. Final nine-width QA and provider sandbox verification are not yet done. Live activity lacks authorized donor records. Existing thank-you confirmation wording is not technical payment evidence; no new verification claims will be introduced. Publication is explicitly excluded.