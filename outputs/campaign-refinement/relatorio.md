# Hope Human campaign-page refinement

## Result
Incremental screenshot/HTTrack-backed corrections to campaign pages only. Hope Human identity, all 56 immutable campaigns, shared header/footer, homepage, amount selection, checkout destinations and analytics remain unchanged. No transactions, email delivery or publication.

## Implemented
- Compact horizontal related-campaign rail instead of three generic cards. Category-filtered authentic records, all-causes option, bounded previous/next buttons, keyboard arrows, touch scrolling and reduced-motion handling. Cards use original imagery, organizer, title, finite progress and clearly qualified previous fundraising.
- Campaign-scoped vertical gold Donate treatment, dark-green Share, aligned amount/label typography and vertically centered gallery arrows.
- White inset story-summary panel with actual organizer, no fabricated supporting avatars/counts.
- Inline native sharing, Facebook, email preparation and explicit copy-link action with clipboard success/failure feedback. Mobile sharing no longer disappears.
- Focused Words of support presentation with compact initials rows and six-at-a-time pagination. Public empty records remain empty.
- Explicit TEST DATA fixtures at 10/30/100 messages in test files only; progressive rendering, deduplication and source immutability verified. No public demonstration route, payment integration or analytics imports.

## Files
Created: src/lib/campaign-activity.ts, src/components/campaign-support.tsx, src/components/campaign-related.tsx, src/test/campaign-activity.test.ts, src/test/campaign-support.test.tsx.

Updated: src/routes/campaign-detail.tsx, src/components/campaign-story-actions.tsx, src/components/campaign-gallery.tsx, src/styles.css, AGENTS.md, roadmap.md. Auditing/report documents in this directory.

## Verification
- 16 test files / 73 tests passed.
- Latest automatic compilation/typecheck: build OK, 2026-10-27T02:33:06Z. A test-only inferred-empty-array typing error was corrected before completion.
- Browser widths: 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920px. No horizontal document overflow or page errors.
- At every width: campaign gallery loads, story summary expands/retracts, explicit copy returns the current campaign URL, Contact closes with Escape and restores focus, carousel moves forward, category filter yields the genuine single animal campaign, and all causes exposes the other 55 records.
- Liam Donate opens /donate with the correct slug; $20 enables Donate $20. Final checkout button not clicked.
- Homepage checks at 390/1280px: no overflow; no redesign.
- Unknown campaign slug returns HTTP 404.
- Preserved campaign leaf head uses campaign-specific title, description, Open Graph, canonical URL, og:type and twitter:card via pageHead. Relative image URLs intentionally omitted from social image metadata.

## Evidence
Before captures remain in outputs/campaign-reconstruction/evidence. New nine-width captures, sharing and related-section captures, amount-selection capture and machine-readable verification are in outputs/campaign-refinement/evidence. Source checkpoint remains under /tmp/campaign-refinement-checkpoint/source-before.tar.gz.

## Limits and owner dependencies
- No genuine public donor-record feed exists. Dynamic confirmed-donation updates, moderation and spam handling require an authorized real-data source; historical totals and empty donor rows were not fabricated or converted into receipts.
- A restricted deployed demonstration environment requires authentication/access provisioning. High-activity scenarios are isolated to tests instead of publicly exposing fake activity. Donation/progress edge cases are covered by the existing finite-value tests; no demo transactions exist.
- HTTrack omits dynamic campaign images and activity dependencies. Hope Human's authorized assets are used, not missing source donor identities, tracking/payment scripts or simulated-success code.
- Screenshots differ in story length/activity. Comparison is by equivalent components, never total document height. No 100% visual-equivalence claim or pixel-perfect diff is asserted.
- Production Lighthouse/Core Web Vitals, live receipts and real-time activity cannot be established locally. Existing root-shell test warnings remain in the test environment; live browser emitted no page errors.