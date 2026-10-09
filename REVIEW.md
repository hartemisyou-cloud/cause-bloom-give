# Hope Human Foundation — end-to-end QA report

**Review date:** October 9, 2026  
**Scope:** existing unpublished preview; 54 campaigns; active repository, visitor routes, imported artwork, responsive behavior and primary interactions.

## Outcome
The active site is Hope Human Foundation throughout. Campaign content, natural-English translations, alternate beneficiary surnames and the authentic supplied logo remain intact. The review found and fixed residual QA-test wording, two branded campaign graphics, missing supporting-page artwork, gallery state carried between query-string campaigns, incomplete legacy aliases, storage-error resilience, compact/mobile spacing and contrast on supporting-page buttons. Checkout remains intentionally disabled and honest.

## Brand and operational sweep
A case-insensitive sweep covered source, routes, campaign JSON, metadata, accessible labels, manifest/public files, docs and tests. **No old-brand name/domain, placeholder EIN, source pixel script, tracking endpoint, provider credential or old operational endpoint remains in active or public project content.** The only `stripe_account_id` text is a negative regression-test pattern. No old-domain hotlinks remain. Per-route titles, descriptions and OpenGraph text identify Hope Human Foundation. All 18 leaf route files have route-specific metadata; the catch-all is `noindex`.

The old reference pages themselves used an old logo, social graphic, offline data and tracking scripts. None were migrated. Optional analytics remains provider-free and consent-gated; attribution parameters only persist in session storage.

## Artwork audit
- Reference campaign collection: **54 slugs, 133 unique source gallery photos**.
- Local campaign delivery: **188 optimized WebP variants** (large and thumbnail representations), plus authentic Hope Human logo and supporting artwork. Every active asset pointer returned HTTP 200; every pointer was referenced. Galleries load only the selected large image.
- Exact 133-row source-relative-path → campaign/gallery-index → active-pointer mapping: `src/data/artwork-audit.csv`.
- Visual method: all 133 source rasters were inspected on seven numbered contact sheets; all 53 card thumbnail crops were inspected on a separate contact sheet; OCR was run across all 133; text-bearing/flagged images were opened larger. This is a comprehensive visual review, not a filename-only claim.
- Embedded identity findings: Mateo photo 2 carried a Spanish foundation mark and Spanish campaign panel; Emma photo 1 carried a small organization mark. Both were replaced with English Hope Human graphics using the authentic logo, while leaving beneficiary photography untouched.
- Retained documentary text: the Fabián certificate names a medical institution and another image contains a camera timestamp. These are source evidence, not fundraising-brand identity, and remain unaltered. Other visible source captions/signs are beneficiary-authored or documentary content.
- Twelve supporting reference photographs were migrated as optimized immutable assets and used on Blog, Events and Contact. Old social artwork and avatars were not copied because the new site has no corresponding operational/social profiles.

## Routes, behavior and errors
- Automated crawl: **245 route/viewport checks** covering all visitor-independent pages and all 54 campaign details at 360, 768 and 1440 px, plus focused 320, 390, 430, 1024 and 1920 px checks. Result: **0 horizontal overflows, 0 page errors, 0 broken image requests**.
- **72 discovered internal links** checked with no broken destination.
- All 54 details returned their expected title and primary image. **All 133 gallery states** were clicked, decoded and matched to the expected local URL. Query-to-query campaign navigation now resets gallery, story, support and donation state.
- Search populated/empty/reset, four category counts (42 health, 11 children/family, 1 animals, 0 disaster), four sort modes, active/urgent/fully-funded states and homepage category empty state passed.
- Sixteen `.html` aliases redirect permanently. Missing detail slug redirects to the canonical detail query; unknown page, unknown query campaign and invalid campaign path return real 404s.
- Desktop dropdown, mobile drawer, FAQ disclosure, homepage carousel, how-it-works selection, story expansion, clipboard share and a stubbed native-share invocation passed. The operating-system share sheet cannot be rendered headlessly.
- All three proposal forms reject missing values and prepare a real user-sent `mailto:` proposal. Nothing is stored, published or automatically sent.
- Donation flow passed at 360×740, 768×900, 1440×900, 320×430 and 844×390: invalid low/high amounts show errors; USD 75 produces “Nothing has been charged”; focus stays in the dialog; Escape dismisses it. No card field, payment call, receipt or success simulation exists.
- Consent decline/allow and `utm_source`/`gclid` preservation passed. Browser storage failures are now contained rather than interrupting navigation or giving controls.

## Responsive and visual evidence
Widths reviewed: **320, 360, 390, 430, 768, 1024, 1440 and 1920 px**. Home, directory, campaign details, forms, navigation and donation dialog were inspected at representative mobile/tablet/desktop widths; 320×430 and 844×390 cover reduced-height/mobile-keyboard and landscape constraints. Long campaign titles, gallery dots, status controls, sticky desktop panel/mobile CTA, footer links and modal scrolling fit without clipping or overlap. Fully loaded evidence uses these project-accessible pointers:

- Home: `src/assets/qa/settled-home-360.webp.asset.json`, `src/assets/qa/settled-home-1440.webp.asset.json`
- Campaign directory: `src/assets/qa/settled-campaigns-360.webp.asset.json`, `src/assets/qa/settled-campaigns-1440.webp.asset.json`
- Rebranded Mateo detail: `src/assets/qa/settled-campaign-detail-mateo-360.webp.asset.json`, `src/assets/qa/settled-campaign-detail-mateo-1440.webp.asset.json`
- Proposal form: `src/assets/qa/settled-start-yourself-360.webp.asset.json`, `src/assets/qa/settled-start-yourself-1440.webp.asset.json`
- Navigation: `src/assets/qa/menu-360-settled.webp.asset.json`, `src/assets/qa/menu-768.webp.asset.json`, `src/assets/qa/menu-1440.webp.asset.json`
- Donation dialog: the five `src/assets/qa/donation-*.webp.asset.json` pointers.

## Tests and performance
- Vitest: **2 files, 6 tests passed**. Assertions cover collection cardinality/uniqueness, exact categories, story/gallery completeness, funding snapshots, alternate surnames, filtering/sorting and routing.
- Managed preview build: **build OK** after final fixes; no current runtime error log. A separate manual typecheck/production build was not run because this environment delegates those checks to the managed harness; generated production output is not exposed for independent inspection.
- Local unthrottled development observation: LCP entry about **104 ms**, CLS **0** on the homepage. This is useful only as a smoke signal. INP requires real interaction/event timing, and reliable Core Web Vitals require a published production origin with network/device conditions; none are claimed here.
- Performance controls verified in source and network behavior: explicit image dimensions, optimized thumbnail/large variants, lazy below-fold artwork, selected-gallery-only loading, stable card/gallery geometry, reduced-motion support, prerender allowlist and immutable CDN assets.

## Outstanding launch blockers
1. **Payments:** enable payments in the Lovable editor, establish verified recipients and confirmed fees/refunds, then implement server-side checkout. The current preview must remain non-collecting.
2. **Rights and current facts:** confirm image/content permissions, beneficiary authorization, current needs and organizer relationships before public fundraising.
3. **Legal/operational review:** confirm legal terms, registration/status claims and operating procedures; no EIN or tax-deductibility claim is currently made.
4. **Production verification:** after explicit publish approval, rerun broken-link checks and measure production LCP/CLS/INP. This review did **not** publish.

## Revision note
Lovable manages repository commits. Latest observed managed revision: `4f1aeab` (Changes); final report/evidence updates may receive a subsequent managed revision. No manual stateful Git command was used.
