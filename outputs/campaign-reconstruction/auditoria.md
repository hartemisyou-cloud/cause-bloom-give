# HTTrack campaign-page reconstruction: initial audit

## Scope
The continuation document limits reconstruction to individual campaign pages. Preserve the existing homepage, Hope Human identity and information, campaign collection, header/footer, donation presets and existing integrations. No payment requests, transactions or publication are authorized by this audit.

## Inventory and checkpoint
- `SOLENI_CARE.rar`: 89 files, including 33 HTML, seven JavaScript, two CSS, 25 WOFF2 font files and 15 image/icon files.
- `soleni_pag_campanha.rar`: 90 files; adds `campaign-detaild512.html`, captured from `campaign-detail?slug=help-save-fabi`.
- All shared CSS, JavaScript, fonts and images are byte-identical. Shared site HTML differences are HTTrack capture comments, not substantive page changes.
- Full entry names, sizes and SHA-256 hashes are recorded in `inventory.json`. Archives remain outside the application in temporary staging; neither contains Git metadata.
- Baseline screenshots and geometry were recorded before presentation-code changes at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 pixels, using the current Mateo campaign. No horizontal overflow or page errors were observed. Payment/store/Meta hosts were blocked during this baseline check.

## Source-to-application mapping
| Captured reference | Current application | Responsibility |
|---|---|---|
| `campaign-detaild512.html`, inline layout CSS | `src/routes/campaign-detail.tsx`, `src/styles.css` | Page order, main column, gallery, funding panel and mobile presentation |
| Inline story/carousel event handlers | Campaign-detail route, `campaign-story.tsx`, `campaign-story-actions.tsx` | Selection, swipe, expansion, local reactions |
| Organizer, donor, contact/report and sharing HTML | `src/components/campaign-detail-sections.tsx` | Shared campaign-bound lower sections and accessible dialogs |
| `assets/fonts/plus-jakarta-sans.css`, WOFF2 | Existing CDN font definitions in `src/styles.css` | Plus Jakarta Sans; preserve existing optimized font assets |
| `offline-data8611.js` | `src/data/campaigns.json` and artwork audits | Reference data comparison only; do not import its fetch replacement |
| `campaign-mediafdfe.css`, `campaign-media2fdd.js` | Existing gallery/story media | Inspect as reference, not evidence that uncaptured video exists |
| Reference donate/tracking scripts | Existing `/donate`, checkout and Pixel modules | Excluded from reconstruction; preserve current behavior |

## Prioritized divergence matrix
| Priority | Verifiable reference | Current difference | Proposed correction |
|---|---|---|---|
| P0 | Main maximum 1040px, padding 36px 4%, sidebar 340px, gap 44px | 940px main limit; expands to 2200px at 1920px | Restore bounded geometry and remove unsupported wide-screen scaling |
| P0 | Single column at 860px; desktop sidebar hidden at 600px | Stack begins at 800px; later CSS restores desktop sidebar on mobile | Consolidate scoped breakpoint rules; preserve donor/contact access in mobile-specific sections |
| P1 | Sidebar padding 22px, radius 12px, sticky top 88px | 28px, 18px, top 100px | Match dimensions with existing semantic colors |
| P1 | Portrait photos contained; final story-summary slide | Always cropped; no summary slide | Add selected-image fitting and summary bound to actual story, without fabricated supporters |
| P1 | Horizontal-dominant swipe >22px, mobile swipe/dots | Swipe >40px without direction guard; mobile arrows restored | Guard vertical gestures; retain labelled controls and keyboard access |
| P1 | Campaign metadata near organizer/footer | Metadata appears before mobile photo | Relocate existing facts without changing data |
| P1 | 220px collapsed story; compact organizer/report typography | Mobile story 180px; oversized lower typography | Match measured spacing and type scale |
| P1 | Mobile floating action inset 8px, with ring and goal | Full-width bottom strip | Use compact inset composition; retain visibility-aware action behavior |
| P2 | Trust inner maximum 1040px, padding 60px; sharing maximum 1100px, padding 72px | Containers up to 2200px and enlarged sharing type/padding | Match bounded sections and mobile stacking without viewport-scaled typography |
| P2 | Three distinct overlapping sharing previews | Three copies of one card | Refine existing campaign-bound previews without importing external social content |
| Intentional | Reference donation choices differ; generated donor/reaction activity and success alerts | Hope Human has six authorized presets, genuine empty states and explicit user-sent contact emails | Preserve current truthful behavior; do not copy simulated reference data or success |

## Reference limitations
- Campaign photo paths are assembled from embedded data. The archives contain no `uploads/` tree, including none of Fabi's seven gallery photos. Existing authentic Hope Human media must be used, not captured Unsplash replacements.
- Eight duplicate error pages are crawler artifacts. The crawl log records eight 404 errors, including expression-based image/checkout paths and site-config references. This does not establish a production-service outage.
- Static `script/link/img` references resolve locally, but that check does not cover dynamic paths; `resource-check.json` is only that narrow static check.
- The offline script intercepts fetch and can return simulated submission/storage success. It is unsuitable as functional backend evidence and will not be executed or imported.
- Original donor/reaction pools are generated by scripts. They will not be reconstructed as real records.
- Complete reference-runtime screenshots are not yet available: the saved HTML starts with empty campaign slots and requires scripts plus missing photos. Authored CSS values are valid evidence; visual equivalence is not claimed.

## Next validation
After scoped changes, repeat all nine widths, compare before/after geometry and screenshots, test gallery selection/swipe/keyboard, story expansion, dialogs/focus return, related navigation and campaign-to-amount selection. Run the existing tests and inspect automatic build diagnostics. Do not open checkout, execute a payment or publish.