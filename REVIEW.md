# Supplemental measured verification — October 15, 2026

## Corrections applied
- Donation campaign photo and gradient/title are now physically embedded inside the single mobile donation card; desktop summary and donation header hidden at860 and below. Maximum layout480px, photo64vw/max300px, -72px overlay with deep-green fade, 20px body at768, three columns retained at390 with7px gap (8px at768). Desktop layout960px with40px/5%/80px padding,1:1.05 grid and24px gap. Existing six authorized amounts, suggested100 and clicked-only external navigation unchanged.
- Mobile menu now fills actual390/768 viewport rather than90vw drawer: genuine logo, grouped Help/Discover/Foundation links, measured header/body padding,48px close control and full-width CTA. Escape closes with focus management retained. Group letter-spacing remains zero under project typography rules.
- Explainer now uses exact six-stop semantic gradient,300×480 desktop phone/268×430 mobile,9px deep-green border,36px corners,16px step corners and measured spacing. Browser-only4500ms cycle pauses offscreen, document-hidden and reduced motion; manual step selection remains functional. No payment-success state.
- Footer now has2:1:1:1 desktop tracks,48px gap and margin, two columns below900, single column at768 and below with40px4%24px padding. Policies wrap vertically on mobile.
- Completed additional missing page anatomy: Most Loved dark intro + genuine aggregate previous fundraising and54 stories, numbered top3 dark band and remaining story grid. No fabricated supporter count or current-week ranking. Help now grouped campaigns/checkout/support accordions. Transparency has reference-sized shield intro and three information pillars with truthful copy, no protection promise. Policy reading width/dividers and proposal-header gradient corrected. Existing Causes/Journal/Events/About/Contact structures checked, not skipped.
- Detail title now uses measured20.8–28.8px scale instead of fixed28.8 on tablet; home category selector placed under section heading as reference.

## Actual browser measurements/checklist
Playwright Chromium, fresh navigation and explicit innerWidth assertion; actual **390/768/1440×1000**, not an external viewport emulator. All19 URLs in the previous route inventory revisited at each width (**57 successful page checks**), including both Mateo/Graceline details, donate and every supporting family. Each intended title, font readiness and visible-image decode/no-overflow signal checked. Zero page errors or failed visible images. Screenshots reset scroll to top; replaced early captures affected by restored scroll.

| Measurement |390|768|1440|
|---|---|---|---|
| Donation layout width |390|480|960|
| Donation photo height |249.59|300|desktop16:10|
| Donation body padding |20|20|28|
| Amount grid |3×100.94, gap7|3×120.19, gap8|3×107.88, gap12|
| Menu width×height |390×1000|768×1000|desktop dropdown retained|
| Explainer phone |268×430|268×430|300×480|
| Footer columns |1|1|2:1:1:1|

All six amounts clicked in actual mobile UI; external requests intercepted, no purchase. Correct `https://hopehumanfoundations.org/pay?amount={20,30,50,100,250,500}&campaign=mateo&utm_source=supplemental` observed. Continue disabled initially. Unknown donation/detail slug404.
All three proposal families exercised end-to-end: invalid blank form blocked; genuine test input through5 steps; permission checkbox; review prepares foundation-support mailto and explicit not-submitted status. Nothing sent. FAQ opens, privacy consent state updates, Graceline expanded photo and gallery2 decode, Contact dialog opens and Escape closes.
4500ms timer observed advancing when visible and staying unchanged offscreen; reduced-motion emulation stops it. New timer test verifies visible-only advance, offscreen pause and cleanup. **6 test files /17 tests passed.** Latest managed diagnostics checked **build OK 01:50:15 UTC**. Independent production/Vercel build and standalone typecheck remain unverified under managed-build-only sandbox instructions. No Vercel configuration, runtime assets or campaign data changed.

## Evidence and remaining differences
81 fresh QA screenshots/comparisons in `src/assets/qa/supplemental/`, including all19 routes at all3 widths,12 paired home/list/detail/donate comparisons, menus, footer, explainer, completed proposals and decoded story photo. Evidence stays excluded from runtime public asset mirrors. Reference captures use actual public source and same widths; source screens contain Spanish text. Matched mobile donate photo/overlay anatomy directly inspected. Fine height differences remain from English wrapping and neutral book-checkout disclosures. Footer lacks undocumented social profiles; empty events/donors, genuine categories, proposal/email-only behavior and no guarantees are intentional. All main families implemented and checked, but **not pixel-identical**: source decorative effects, unavailable article/event/partner facts and some supporting-section fine spacing remain different. No live deployment rendering or live payment verification. Nothing published.

- [donate-mateo-390](https://id-preview--5dc3b815-88ea-4da6-b1d3-a58fa6079440.lovable.app/__l5e/assets-v1/26d67fca-d06f-4aaf-a1e0-18b0b1a3bfee/donate-mateo-390.webp)
- [menu-390](https://id-preview--5dc3b815-88ea-4da6-b1d3-a58fa6079440.lovable.app/__l5e/assets-v1/af56cc18-f13f-4d38-967a-f8e5ec2e7243/menu-390.webp)
- [how-768](https://id-preview--5dc3b815-88ea-4da6-b1d3-a58fa6079440.lovable.app/__l5e/assets-v1/02fa708f-9583-4c88-86d3-810dba57dcd6/how-768.webp)
- [most-loved-1440](https://id-preview--5dc3b815-88ea-4da6-b1d3-a58fa6079440.lovable.app/__l5e/assets-v1/c4499e2b-8894-49e0-9a24-132665ae5c86/most-loved-1440.webp)
- [guarantee-390](https://id-preview--5dc3b815-88ea-4da6-b1d3-a58fa6079440.lovable.app/__l5e/assets-v1/1f2dfb99-c966-4a79-8f5c-00f66ab76daa/guarantee-390.webp)
- [compare-donate-mateo-390](https://id-preview--5dc3b815-88ea-4da6-b1d3-a58fa6079440.lovable.app/__l5e/assets-v1/9dc71796-b201-4265-bbca-f0cc79b77321/compare-donate-mateo-390.webp)

# Latest verification — October 15, 2026

This section supersedes earlier donation-modal, matte-palette and checkout-disabled descriptions below. Earlier sections are historical QA, not the current checkout specification.

## Implemented correction
- Exact measured reference palette in shared semantic OKLCH tokens: primary #08733D, dark #045C28, gold #F4B740, gold-dark #E5A62F, ink #16382A, slate #4F6F5D, muted #667085, line #DDE9E2, surface #F7FBF8.
- Authentic existing Hope Human logo retained unmodified. Added genuine public Plus Jakarta Sans variable italic WOFF2 (29,524 bytes), uploaded pointer and byte-identical public mirror. Normal font remains local. Header 80px desktop/64px mobile, mobile logo max132px, desktop max210px; removed home copy margin offset and corrected hero type/card geometry.
- Dedicated expanding home panels: desktop flex1/active3.6, full-cover photos, 520px maximum height, 18px corners, category/teaser/funding/CTA overlays and green see-all tile. Mobile vertical accordion uses 58px collapsed/330px active/64px CTA. Hover/focus and explicit 44px expansion controls work. The first invisible whole-panel control was replaced after browser clicks exposed interception by title links.
- How-it-works remains a real interactive three-state visual; amount demonstration uses authorized presets and opens the real selection page. Featured mobile cards use an 82%-width horizontal rail.
- Directory retains actual 54-row search/category/status/sort/favorites and reference sidebar/grid. Decimal abbreviated money now displays $611.4k/$377.5k rather than $611k/$378k.
- Detail returns to centered reference-sized desktop title/gallery/sidebar with cover crop; preserves rich stories and the earlier organizer, donor-empty, trust and three-photo sharing composition. Added the missing story reactions/Donate/Share/compact sharing block. Reactions are local UI state, not fabricated public counts. Previous fundraising remains concise, without duplicate wording on the goal row.
- Image-led Causes, Events and Journal restored in focused modules. Causes uses real existing category counts rather than invented partner organizations. Events uses genuine transferred photos, explicit no-confirmed-events states and idea/contact actions, not fake dates or results. Journal uses existing English guidance in image cards and working topic filters, not invented editorial authors/statistics.
- About header now wraps in two desktop lines; six value slots use truthful copy; mission/values geometry and shared surfaces updated. Contact now matches two-column information/form layout but prepares a user-sent support email rather than false sent success. FAQ boxed accordions and policy reading width updated. Existing three five-step proposal flows preserved.
- NEW `/donate?slug=…`: centered 832px two-column desktop composition (394px/414px at1280), campaign photo/summary, white selection card with green header, six amount buttons, $100 Suggested badge, gold Continue initially disabled, neutral checkout disclosure. Mobile uses integrated photograph/dark summary + selection card with info below, not a drawer. `/donate` redirects to directory; unknown slug404; `donate.html` redirects preserving query.
- All existing Donate actions route to full page; removed `donation-modal.tsx` and its styling. Continue validates USD20/30/50/100/250/500 and navigates ONLY to `https://hopehumanfoundations.org/pay?amount=…&campaign=…`, carrying allow-listed attribution. This is the existing digital-book checkout owned by Hope Human Books. No card fields, processor SDK, keys, charges, simulated success or direct-beneficiary/refund promises introduced.
- Canonical campaign sharing now defaults to singular `https://hopehumanfoundation.org`, not current preview origin. Updated outdated checkout help/policy copy and README. Vite prerender/compiled hook and vercel.json unchanged.

## Route/page-family checklist
All reference pages below fetched as actual HTML and screens at1280. Home/list/detail/donate reference captures additionally at390/768/1440. Every current row below visited at390/768/1280/1440, HTTP200, no horizontal overflow and no completed broken images.

| Family | Routes | Scope/status |
|---|---|---|
| Home | `/` | Hero, panels, explainer, featured rail, start options, header/footer updated; comparison captured |
| Directory | `/campaigns` | Search/filter/sort/favorite grid preserved; comparison captured |
| Causes | `/causes` | Photo grid and working category tabs; 4 genuine categories, not 18 invented partners |
| Most Loved | `/most-loved` | Existing actual-data campaign grid with updated shared styling |
| Events | `/events` | Photo-led sections and honest unavailable event records |
| Journal | `/blog` | Photo cards and working topic selection; genuine existing guidance |
| About | `/about` | Two-line desktop header, mission, six values, how-it-works |
| Contact | `/contact` | Two-column information/form; validated email preparation |
| Help | `/help-center` | Boxed native accessible FAQ disclosures |
| Transparency | `/guarantee` | Reference shared styling, truthful policies rather than transferred guarantee claims |
| Proposals | `/start-yourself`, `/start-family`, `/start-business` | Existing five-step truthful email-proposal workflow preserved, shared styling |
| Policies | `/privacy-policy`, `/terms-of-use`, `/refund-cancellation-policy` | Reading width and current external-checkout disclosures |
| Details | `/campaign-detail?slug=mateo`, `…help-graceline-now` | Four-width full-page captures; all54 campaign titles/main photos additionally verified at390 |
| Amount selection | `/donate?slug=mateo` | Four-width captures; all6 actual UI selections/navigation URLs intercepted |

## Actual verification
- 19 route visits ×4 widths =76 recorded checks at390/768/1280/1440×1800. All HTTP200 with intended titles; zero overflow or completed broken-image observations. No page errors in successful focused flow and 54-detail crawl.
- All54 details independently visited at390, each expected campaign title checked and actual selected gallery image naturalWidth>0.
- Mateo and Graceline detail200; unknown campaign and unknown donate slug404; donate without slug lands directory; legacy donate.html lands valid query page.
- All6 UI amounts selected, Continue enabled, external navigation intercepted (no purchase): exact amount/campaign and utm_source=qa observed on correct HTTPS checkout host.
- Mobile navigation opens, focus-visible close control shown, Escape dismisses. Desktop Discover dropdown and featured next arrow exercised. How step2 displays all6 authorized presets and checkout-review copy.
- Mobile panel switched to Graceline with loaded campaign photo; directory search gives1 Mateo, meaningless query gives empty state, Clear filters resets, animal category gives1; sort selector changed.
- Graceline expanded first story photograph naturalWidth1200. Selected gallery photo2 URL matches data, decodes naturalWidth554. Story photos were initially measured before lazy decode; waiting for real decode corrected verification, not source data.
- Contact form valid input prepares actual mailto at foundation support; no send success. Contact action dialog opens and Escape dismisses; mobile sticky Donate reaches full page with zero dialogs.
- `bunx vitest run`: **5 files /16 tests passed** after changes (collection/surnames/filtering, stories, detail sections, routing and new checkout validator). No test files suppressed.
- Managed preview diagnostics newest checked entry: **build OK 2026-10-15T01:32:07Z**. No separate manual typecheck or clean VERCEL production build was executed this turn: environment instructions delegate those to the managed harness. Consequently final clean Vercel manifests/prerender output and standalone typecheck are **not independently verified for this revision**. Earlier Vercel QA is not evidence of a new production build.
- Runtime delivery scan: **214 distinct files, 11,259,072 bytes, zero missing public mirrors**, including added italic font. QA pointers excluded. All existing campaign/gallery/story files retained, no campaign JSON or artwork mapping changes.
- Active source/data sweep: no old-brand name/domain/contact endpoints, no payment SDK/keys, no old tracking vendor. Per-leaf route metadata retained; donate gets unique dynamic head. Reference archived HTML/CSS stays under /tmp, never shipped.

## Visual comparison findings and honest limitations
Directly inspected same-width actual/reference comparisons for home, directory, detail and donate. Mobile home introduction now closely tracks source typography, sunrise crop and geometry. Desktop donation photo/card x/y/width match closely; extra neutral checkout explanation increases right-card height. Detail main geometry aligns closely without source red fabricated urgency banner; English story length, empty donor records and additional transparency produce intentional section-height differences.

Not pixel-identical: user explicitly requested mobile expanding accordion, but live public source currently shows a horizontal card rail in that slot; followed explicit accordion instruction. Source legal guarantees, fake-looking live donor/time/count records, event dates/partners, statistics, authors and direct-beneficiary checkout claims are NOT transferred. Footer has genuine Hope links and no invented social profile, so its grouping/height differs. Most Loved/proposal/policy families retain existing functional structures, not every source decoration. Reference explainer still differs in fine artwork/animation detail; no undocumented success animation was copied. No claims of comprehensive pixel identity.

No live deployment, Vercel/DNS/settings/secrets modifications, central-project changes or purchase. This task updates the preview/repository only. Production build/typecheck and live Vercel rendering remain unverified; legal/content permissions and checkout business terms remain outside this visual task.

## Fresh screenshot evidence

[menu-390.webp](https://id-preview--5dc3b815-88ea-4da6-b1d3-a58fa6079440.lovable.app/__l5e/assets-v1/2eb85660-6a06-469e-bd8d-e8b9fafbea6a/menu-390.webp)

[sharing-1440.webp](https://id-preview--5dc3b815-88ea-4da6-b1d3-a58fa6079440.lovable.app/__l5e/assets-v1/99ece7d9-42ab-4519-96df-e4632dd1265d/sharing-1440.webp)

[compare-donate-mateo-1280.webp](https://id-preview--5dc3b815-88ea-4da6-b1d3-a58fa6079440.lovable.app/__l5e/assets-v1/186716a3-d867-443a-858e-20ca27fc26a0/compare-donate-mateo-1280.webp)

[compare-home-390.webp](https://id-preview--5dc3b815-88ea-4da6-b1d3-a58fa6079440.lovable.app/__l5e/assets-v1/3c44cd38-a6e8-47d0-ba60-eddbc8a6c49e/compare-home-390.webp)
31 immutable QA pointers under `src/assets/qa/reference-correction/`, excluded from runtime public mirrors. Sixteen comparisons: `compare-{home,campaigns,campaign-detail-mateo,donate-mateo}-{390,768,1280,1440}.webp.asset.json`. Actual home/donate at390/1440, menus390/1440, sharing1440, selected gallery1440, decoded story photo1440, contact/about/blog/events/causes/proposal1280 also saved.

# Hope Human Foundation — end-to-end QA report

**Review date:** October 9, 2026  
**Scope:** existing unpublished preview; 54 campaigns; source-faithful visual reconstruction, active repository, visitor routes, imported artwork, responsive behavior and primary interactions.

## Outcome
The active site is Hope Human Foundation throughout. Its visual system now closely reproduces the reference site rather than the earlier editorial redesign: Plus Jakarta Sans, matching 80px desktop/compact mobile headers, hero and featured-card proportions, directory toolbar/sidebar/grid, campaign-detail gallery and funding rail, responsive breakpoints, form wizard, section order, radii, shadows, controls and footer proportions. Campaign content, natural-English translations, alternate beneficiary surnames and the authentic supplied logo remain intact. Checkout remains intentionally disabled and honest.

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
- Twelve supporting reference photographs were migrated as optimized immutable assets and used on Blog, Events and Contact. The reference mobile sunrise artwork was also imported, reduced from about 5.2 MB to about 28 KB and restored behind the mobile home introduction. Old social artwork and avatars were not copied because the new site has no corresponding operational/social profiles.

## Source-faithful visual reconstruction
- The public reference HTML, CSS, JavaScript and font declarations were examined for home, directory, representative campaign detail, About and campaign-proposal pages. Plus Jakarta Sans was identified as the actual family; its public Latin and Latin Extended WOFF2 resources are now self-hosted and used at the matching 400–800 weight range. The former Georgia/Arial treatment was removed.
- Home now reproduces the reference 384px desktop feature card, 190px image, 20px radius, full-width Donate button, centered secondary link, 40px edge arrows and dots below. At 390px the source behavior is retained: compact header, text-led sunrise introduction, hidden desktop feature card and horizontal campaign rail.
- Directory now reproduces the dark page introduction, desktop search bar, 240px sidebar, three-column cards and the source mobile stacked controls/cards. Detail now reproduces the 1040px two-column layout with 340px sticky funding panel and the mobile full-bleed gallery, title/organizer overlays, funding block and sticky Donate action.
- About and the five-step proposal form were compared at 1280px. Their header heights, page bands, type hierarchy, centered form width, progress rail, field grid and surface treatment align with the reference structure.
- Concrete corrections made after side-by-side review: heading family and weights; header/logo scale; home hero/card alignment; card crop, radius and shadow; Donate/link stacking; carousel arrow/dot positions; directory toolbar/sidebar/grid proportions; detail gallery/funding/sticky layouts; mobile title and organizer overlays; proposal-wizard progression; explainer color progression; mobile sunrise art; lower-page spacing and footer columns.
- Intentional differences are limited to authorized or truthful changes: Hope Human identity and palette; authentic smaller-aspect logo; English translations; alternate beneficiary surnames; historical-snapshot labels instead of live donation/urgency claims; no fake recent-donation timestamps; no fake payment-success or SSL artwork; and no old operational/tracking/social endpoints. These alter some line wrapping and labels but not the structural layout.

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
Widths reviewed: **320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920 px**. Home, directory, campaign details, About, forms, navigation and donation dialog were inspected at representative mobile/tablet/desktop widths; 320×430 and 844×390 cover reduced-height/mobile-keyboard and landscape constraints. Long campaign titles, gallery dots, status controls, sticky desktop panel/mobile CTA, footer links and modal scrolling fit without clipping or overlap. Fully loaded evidence uses these project-accessible pointers:

- Home: `src/assets/qa/settled-home-360.webp.asset.json`, `src/assets/qa/settled-home-1440.webp.asset.json`
- Campaign directory: `src/assets/qa/settled-campaigns-360.webp.asset.json`, `src/assets/qa/settled-campaigns-1440.webp.asset.json`
- Rebranded Mateo detail: `src/assets/qa/settled-campaign-detail-mateo-360.webp.asset.json`, `src/assets/qa/settled-campaign-detail-mateo-1440.webp.asset.json`
- Proposal form: `src/assets/qa/settled-start-yourself-360.webp.asset.json`, `src/assets/qa/settled-start-yourself-1440.webp.asset.json`
- Navigation: `src/assets/qa/menu-360-settled.webp.asset.json`, `src/assets/qa/menu-768.webp.asset.json`, `src/assets/qa/menu-1440.webp.asset.json`
- Donation dialog: the five `src/assets/qa/donation-*.webp.asset.json` pointers.
- Labeled same-width reference/Hope Human comparisons:
  - Home: `src/assets/qa/visual-rebuild/compare-home-{390,1280,1440}.webp.asset.json`
  - Directory: `src/assets/qa/visual-rebuild/compare-listing-{390,1280,1440}.webp.asset.json`
  - Detail: `src/assets/qa/visual-rebuild/compare-detail-{390,1280,1440}.webp.asset.json`
  - About: `src/assets/qa/visual-rebuild/compare-about-1280.webp.asset.json`
  - Proposal form: `src/assets/qa/visual-rebuild/compare-start-yourself-1280.webp.asset.json`

## Tests and performance
- Vitest: **2 files, 6 tests passed**. Assertions cover collection cardinality/uniqueness, exact categories, story/gallery completeness, funding snapshots, alternate surnames, filtering/sorting and routing.
- Managed preview build: **build OK** after final fixes; no current runtime error log. The TypeScript check completed cleanly. A separate manual production build was not run because this environment delegates builds to the managed harness; generated production output is not exposed for independent inspection.
- Local unthrottled development observation: LCP entry about **104 ms**, CLS **0** on the homepage. This is useful only as a smoke signal. INP requires real interaction/event timing, and reliable Core Web Vitals require a published production origin with network/device conditions; none are claimed here.
- Performance controls verified in source and network behavior: explicit image dimensions, optimized thumbnail/large variants, lazy below-fold artwork, selected-gallery-only loading, stable card/gallery geometry, reduced-motion support, prerender allowlist and immutable CDN assets.

## Outstanding launch blockers
1. **Payments:** enable payments in the Lovable editor, establish verified recipients and confirmed fees/refunds, then implement server-side checkout. The current preview must remain non-collecting.
2. **Rights and current facts:** confirm image/content permissions, beneficiary authorization, current needs and organizer relationships before public fundraising.
3. **Legal/operational review:** confirm legal terms, registration/status claims and operating procedures; no EIN or tax-deductibility claim is currently made.
4. **Production verification:** after explicit publish approval, rerun broken-link checks and measure production LCP/CLS/INP. This review did **not** publish.

## Revision note
Lovable manages repository commits. Latest observed managed revision before this final report update: `f36f3c3`; the final report/evidence update may receive a subsequent managed revision. No manual stateful Git command was used.


## Screenshot-authoritative campaign-detail correction — October 9, 2026

**Starting revision:** `2e5fbeea92fc399d67ca2932f89fe602d13bda7a`, verified before changes. Existing user edits were retained; no checkout code, campaign JSON, surname audit, gallery photos or authentic logo were changed. No subagents or publication were used. This section supersedes earlier broad visual-completeness statements for the detail lower sections.

### Missing → implemented
- Organizer footer previously lacked the created month/category row, shield badge, report control and muted foundation disclaimer. Added genuine organizer/location/beneficiary metadata, creation month in UTC, pale-green transparency badge, dividers, flag Report fundraiser and Hope Human disclaimer.
- Donation rail previously substituted support-message names for donor records and omitted organizer contact. Added a donor-sized empty-state area, two equal dark-green/outlined-star pill controls, divider, genuine organizer avatar/name, campaign creation month and full-width outlined Contact. The collection contains support names/messages only, **no individual donor amounts or activity timestamps**; neither is invented. Creation date is not described as account activity.
- The trust block was previously a small text strip, placed after related cards. It is now a full-width mint band immediately after the story/organizer area, with the requested heading and three wide icon/text columns, outlined plane (gold accent), heart and shield, gray body text and a truthful foundation link.
- The sharing block was missing. Added a white two-column section, bold two-line desktop headline, secondary truthful paragraph, five large circular social controls, and three overlapping ±10° campaign cards. All three use the **current campaign's same actual photo**, title/organizer, previous total/goal, circular progress and central gold Donate pill. Related campaigns follow sharing; the existing foundation footer follows related campaigns.
- Widened the detail main/rail layout to 90% viewport (170:100 tracks with 5% gap; 4% gap at wide desktop), instead of the former 1040px cap; aligned lower typography and spacing with attachment proportions. At 390/768 the rail and trust/share blocks intentionally stack.
- A new category link exposed that directory category URLs were previously ignored; optional category search validation and state synchronization now make that link actually select the category.

### Comparison assessment (not an identical claim)
- **Screenshot 3:** restored organizer hierarchy, spacing, created/category separator, green shield surface, report/disclaimer divider, rail equal pill buttons and outlined contact. Reference donor names/amounts/recent timestamps and protected guarantee are intentionally replaced by an honest empty state, creation month and transparency wording. Beneficiary information is retained as an additional concise line.
- **Screenshot 1:** restored full-width mint surface, large heading above three horizontal icon/text columns, generous vertical padding, gray two-line text and underlined green foundation link. The thin outlined icon shapes were refined after the first visual pass. No undocumented donation-protection claim.
- **Screenshot 2:** restored white composition, heading line break, larger social circles/shadows and same-photo angled cards with dark-green bodies and gold central pill. First mobile pass showed card-edge cropping; narrowed mobile cards from 172 to 158px and increased their composition height to retain their corners. The unsupported $50 sharing statistic is omitted. Amount formatting keeps the project's established whole-dollar display, not reference cents.
- Plus Jakarta Sans confirmed through computed browser styles. Heading uses 800, donor/organizer controls 600–700; semantic Hope Human colors remain authoritative. Desktop headline: 48px at 1440, 64px at 2460; trust heading 23/28px. Desktop social circles 74/92px; stacked 390 circles 56px. Reference screenshots are context crops with no authoritative original viewport metadata; normalized labeled comparisons are **not pixel-diff certification**.
- Screenshots directly inspected: before lower 390/1440; after trust/sharing 1440, lower 2460, sharing 390; final organizer/rail 1440, sharing 390/2460, trust 390. Screenshots were recorded at every requested width, not all repeatedly opened.

### Actual verification
- Primary route: `/campaign-detail?slug=help-graceline-now`; all **54** `/campaign-detail?slug=<slug>` pages crawled at **390×1800, 768×1800, 1440×1800** (162 route/width checks). Each checked overflow, genuine rail organizer, and current-photo binding. No overflow, page errors or failing asset requests.
- Focused sections/actions at **390×1800, 768×1800, 1440×1800, 2460×1800**, plus donation dialog at **390×460**. Main run: **196 checks**, **0 page errors**, **0 failed asset requests**.
- At every focused width: Contact/Report required-message validation, real support `mailto:` with campaign URL/organizer/message, focus containment through eight Tabs and Escape; See all/See top truthful dialogs; Instagram/TikTok clipboard and instructions; Facebook/WhatsApp URL construction; More real clipboard and stubbed native-share invocation; central-card amount flow rejects 0 and reviews $75 with “Nothing has been charged”; gallery next/dot photo decodes; story expand/collapse; image health; all internal footer destinations return 200.
- Extra navigation run at all four widths: Health category link selects 42 campaigns; disaster empty and reset to 54; four sorts; desktop urgent filter; desktop dropdown navigation; mobile/tablet drawer, Escape and Blog navigation. Search populated/empty passed in the main run after waiting for hydration before typing.
- `campaigns.html` redirect verified; unknown path and invalid campaign query return 404. `help-graceline-now.html` returns 404 because it is not a configured legacy reference alias. Campaign-specific details use the existing supported query URL. No tabs or donor sorting filters existed on the current detail; the new See all/See top actions show honest no-record states instead of fabricated sortable donors.
- Vitest: **3 files / 10 tests passed**, including four new tests for genuine/nullable dates, clean sharing URLs, all three actual photo bindings and absence of fabricated donor activity. Managed typecheck/build signals were checked; nullable date and optional category search typing issues found during work were corrected. No manual build/typecheck command was run, as the harness owns those checks.
- Case-insensitive source/public/docs identity sweep: no old foundation identity/domain, placeholder EIN or source pixel invocation matches. Existing leaf metadata retained; all content routes, including index, inspected for head declarations.

### Evidence
35 actual immutable screenshot pointers (8 before, 24 final section/dialog and 3 labeled supplied-reference comparisons) are stored in `src/assets/qa/detail-sections/`. These are real browser captures, not generated mockups. Before is available at identical 390/768/1440/2460 widths; final section captures include organizer, rail, trust, sharing, contact and donation at each width. Reference images themselves are not embedded in the visitor page.

- `src/assets/qa/detail-sections/before-lower-1440.webp.asset.json` — `/__l5e/assets-v1/736bd1ab-6114-40d4-b9f6-fed3ae47d92c/before-lower-1440.webp`
- `src/assets/qa/detail-sections/before-lower-2460.webp.asset.json` — `/__l5e/assets-v1/991da231-e541-4303-b01c-d278effebce9/before-lower-2460.webp`
- `src/assets/qa/detail-sections/before-lower-390.webp.asset.json` — `/__l5e/assets-v1/6505bb96-b5bb-42e2-9a5a-fb0364fe1aa0/before-lower-390.webp`
- `src/assets/qa/detail-sections/before-lower-768.webp.asset.json` — `/__l5e/assets-v1/bdaace7c-248a-46aa-a8d4-2857bbca9d9a/before-lower-768.webp`
- `src/assets/qa/detail-sections/before-top-1440.webp.asset.json` — `/__l5e/assets-v1/4d81933f-dcb1-4179-a581-8536d16a5ce2/before-top-1440.webp`
- `src/assets/qa/detail-sections/before-top-2460.webp.asset.json` — `/__l5e/assets-v1/db47e5b7-abd5-404d-a264-db82dcdb8f6c/before-top-2460.webp`
- `src/assets/qa/detail-sections/before-top-390.webp.asset.json` — `/__l5e/assets-v1/6e06507c-3a28-4279-8c32-5651109172ff/before-top-390.webp`
- `src/assets/qa/detail-sections/before-top-768.webp.asset.json` — `/__l5e/assets-v1/407f66f8-139d-4e41-a197-d696e2f3a152/before-top-768.webp`
- `src/assets/qa/detail-sections/comparison-organizer.webp.asset.json` — `/__l5e/assets-v1/007163bd-6d3f-49d1-a785-1fcb6408cf7a/comparison-organizer.webp`
- `src/assets/qa/detail-sections/comparison-sharing.webp.asset.json` — `/__l5e/assets-v1/957c23b3-e210-4a73-9439-3e8e0c77ecb8/comparison-sharing.webp`
- `src/assets/qa/detail-sections/comparison-trust.webp.asset.json` — `/__l5e/assets-v1/16bdb550-14dc-4152-bad5-cbeec42446c1/comparison-trust.webp`
- `src/assets/qa/detail-sections/final-contact-1440.webp.asset.json` — `/__l5e/assets-v1/3efc727d-5a4d-461d-ba8d-38f8d6772574/final-contact-1440.webp`
- `src/assets/qa/detail-sections/final-contact-2460.webp.asset.json` — `/__l5e/assets-v1/6dee03c5-6d54-4733-9772-cbd6a174bd24/final-contact-2460.webp`
- `src/assets/qa/detail-sections/final-contact-390.webp.asset.json` — `/__l5e/assets-v1/8b7fe1e4-50e4-4203-a50d-522282edf6e8/final-contact-390.webp`
- `src/assets/qa/detail-sections/final-contact-768.webp.asset.json` — `/__l5e/assets-v1/2fef876f-784c-4766-85f3-d8be76cf4e18/final-contact-768.webp`
- `src/assets/qa/detail-sections/final-donation-1440.webp.asset.json` — `/__l5e/assets-v1/1e597aea-2c08-4fc1-ad97-e0854a28ef0a/final-donation-1440.webp`
- `src/assets/qa/detail-sections/final-donation-2460.webp.asset.json` — `/__l5e/assets-v1/65b6c1b2-62c5-406d-95f9-225420b670f6/final-donation-2460.webp`
- `src/assets/qa/detail-sections/final-donation-390.webp.asset.json` — `/__l5e/assets-v1/319b0f25-e963-4724-9994-bba83dd68b1f/final-donation-390.webp`
- `src/assets/qa/detail-sections/final-donation-768.webp.asset.json` — `/__l5e/assets-v1/cec8abff-21fc-4699-974a-498f2a9444a8/final-donation-768.webp`
- `src/assets/qa/detail-sections/final-organizer-1440.webp.asset.json` — `/__l5e/assets-v1/0acda2f7-601a-43c4-b0e3-3cedf5dcfe6b/final-organizer-1440.webp`
- `src/assets/qa/detail-sections/final-organizer-2460.webp.asset.json` — `/__l5e/assets-v1/6fb10541-ee1c-408e-8025-41a09cd78989/final-organizer-2460.webp`
- `src/assets/qa/detail-sections/final-organizer-390.webp.asset.json` — `/__l5e/assets-v1/3824a80f-41f4-4753-841d-b47055f083d8/final-organizer-390.webp`
- `src/assets/qa/detail-sections/final-organizer-768.webp.asset.json` — `/__l5e/assets-v1/209d81f8-b477-41cb-a9c6-485d3482fd66/final-organizer-768.webp`
- `src/assets/qa/detail-sections/final-rail-1440.webp.asset.json` — `/__l5e/assets-v1/fe5c8082-5be9-46f1-a6ce-a7ddca5659dc/final-rail-1440.webp`
- `src/assets/qa/detail-sections/final-rail-2460.webp.asset.json` — `/__l5e/assets-v1/2203e24d-bba2-4202-b497-c0d4fca51573/final-rail-2460.webp`
- `src/assets/qa/detail-sections/final-rail-390.webp.asset.json` — `/__l5e/assets-v1/a0a1dd41-8748-42d9-a93a-e3a782c5adad/final-rail-390.webp`
- `src/assets/qa/detail-sections/final-rail-768.webp.asset.json` — `/__l5e/assets-v1/20893d5f-3150-484f-a196-2c6076302229/final-rail-768.webp`
- `src/assets/qa/detail-sections/final-sharing-1440.webp.asset.json` — `/__l5e/assets-v1/4a10ee2a-2519-4531-995c-7d74d73cee02/final-sharing-1440.webp`
- `src/assets/qa/detail-sections/final-sharing-2460.webp.asset.json` — `/__l5e/assets-v1/6e41d0db-4761-4390-955e-8f79d24d93a3/final-sharing-2460.webp`
- `src/assets/qa/detail-sections/final-sharing-390.webp.asset.json` — `/__l5e/assets-v1/cdbe584b-844d-43fe-bf7c-7d5b630adbc6/final-sharing-390.webp`
- `src/assets/qa/detail-sections/final-sharing-768.webp.asset.json` — `/__l5e/assets-v1/0929591e-d3a3-41c3-9e25-b356eb260ead/final-sharing-768.webp`
- `src/assets/qa/detail-sections/final-trust-1440.webp.asset.json` — `/__l5e/assets-v1/b0bc026b-f215-4a76-861f-bb414304ea49/final-trust-1440.webp`
- `src/assets/qa/detail-sections/final-trust-2460.webp.asset.json` — `/__l5e/assets-v1/0a3b1654-1172-4c7c-b0c0-de98eefb36f6/final-trust-2460.webp`
- `src/assets/qa/detail-sections/final-trust-390.webp.asset.json` — `/__l5e/assets-v1/2fbe4d51-3440-43f1-b948-2415ae1b38d7/final-trust-390.webp`
- `src/assets/qa/detail-sections/final-trust-768.webp.asset.json` — `/__l5e/assets-v1/47b876d9-2258-4e50-99c4-bea9ce77be53/final-trust-768.webp`

### Limitations and intentionally outstanding differences
- No real donor amounts/activity or organizer email are available; donor-sized empty states remain and contact goes to foundation support. Email preparation and share URL/clipboard behavior were verified; sending email, opening external social account UI and the operating-system native share sheet are outside headless verification. Native-share API input was verified with a stub; clipboard fallback was real.
- Payments remain unconfigured: no card collection, charges or success simulation; this task did not change payment setup. Existing rights/legal/current-campaign validation and production-performance launch blockers still apply.
- Reference copy claiming donation protection, recent live gifts and a $50 share statistic is intentionally not reproduced. Hope Human colors/logo, changed beneficiary surname and honest previous-funding labels remain. Exact reference pixel identity is not claimed; mobile composition is intentionally stacked.
- The attachments depict partial lower sections, so exact unseen page ordering and original viewport scale cannot be certified from them; implemented order is story/support → organizer/footer with rail → trust → sharing → related → footer.
- Latest managed revision is recorded after the final verification in chat; no manual Git commit operation is permitted or used.


## Campaign story rendering fix — October 9, 2026

### Defect and scope
The plain-text paragraph renderer displayed serialized `IMAGE:` path/caption markers literally. Confirmed nine visible markers on expanded `/campaign-detail?slug=help-graceline-now` before changes (1280×1800 screenshot). Audited all 54 stored stories: four contain 17 inline image markers (Graceline 9, Hilary 4, Adrieli 2, Arielle 2); 50 have no inline photos.

### Fixed
- Replaced paragraph-only rendering with a safe rich-text renderer: paragraphs, semantic existing section headings, emphasis, lists and blockquotes; raw HTML does not execute. Existing standalone heading labels are explicitly recognized rather than guessing that every short sentence is a heading. Graceline now has five semantic headings, including “The Agony of Relapse”. Text, first names, established alternate surnames and campaign JSON were not changed.
- Added `src/data/story-artwork.json`: 17 exact original-relative-path → optimized CDN image mappings, preserving serialized source order and captions at the same prose positions. Seven photographs reuse previously audited artwork; ten actual missing public source files downloaded, optimized with complete uncropped aspect ratios and uploaded as immutable image pointers. Six new Graceline photos plus two Adrieli and two Arielle source assets; the latter campaigns deliberately share source supply photos, as in the reference. No unrelated replacements or visitor-facing old-domain hotlinks. `src/data/artwork-audit.csv` now includes the ten story-only asset entries; existing gallery mappings retained.
- Each inline photo uses explicit width/height, full-width auto-height, lazy loading, async decoding, original English alt/caption, reference 12px rounded treatment and restrained token-based shadow. Portrait images are fully visible, not cropped. Existing collapse/expand and all lower-page sections preserved. Metadata descriptions are cleaned of formatting.

### Actual verification
- All 54 expanded detail routes × 390/768/1440×1800: **162 checks**, no horizontal overflow or raw serialization/markdown markers, exact expected image counts/caption order. All 17 inline photos scrolled into view and decoded at each width (51 image checks), with natural dimensions, correct responsive widths and lazy loading. **Zero page errors and zero failing CDN image responses**.
- All 54 public reference query-detail pages inspected for inline `#storyBox` photo order. **54/54 match** the stored marker sequence: no additional photos missing from the other 50 stories. The attempted `.html` addresses returned 404; the correct public query addresses returned 200. One reference page (`help-save-fabi`) timed out waiting for network-idle; retry using DOM readiness confirmed its zero inline-photo sequence.
- Expanded Graceline contains nine photos, five headings and “Graceline Bennett”; no technical markers. Read less returns to the original collapsed state. Actual screenshots visually inspected for mobile heading/photo flow, desktop first photo/story with preserved donation rail, and tablet final portrait/caption.
- Regression tests: **4 files / 14 tests passed**, including all 54 stories, all 17 resolved source paths/captions, Graceline headings/photos/lazy attributes and safe markdown rendering. Automatic preview build reports build OK; no manual production build/typecheck run.
- New image contact sheet visually inspected for all ten downloads: no old foundation logo/name/watermark visible. Original product labels on care supplies are retained; no beneficiary photo manipulation. This is a visual inspection, not a guarantee about every microscopic mark. Contact sheet/raw reference pages remain under `/tmp/browser/story-fix/source/`, not shipped.

### Screenshot assets
Ten real screenshot pointers under `src/assets/qa/stories/`: before at 1280; after first photo, heading and final photo at 390, 768 and 1440. No generated mockups.
- `src/assets/qa/stories/before-1280.webp.asset.json` — `/__l5e/assets-v1/89893bb1-e90d-494a-b593-d4a4a1f96303/before-1280.webp`
- `src/assets/qa/stories/graceline-heading-1440.webp.asset.json` — `/__l5e/assets-v1/494ff8f7-803b-48ef-b2de-556bcca4e271/graceline-heading-1440.webp`
- `src/assets/qa/stories/graceline-heading-390.webp.asset.json` — `/__l5e/assets-v1/1501e415-3c5d-48e5-a211-1fdf4e778055/graceline-heading-390.webp`
- `src/assets/qa/stories/graceline-heading-768.webp.asset.json` — `/__l5e/assets-v1/08f258e9-ccf0-4a97-8390-523375af29b4/graceline-heading-768.webp`
- `src/assets/qa/stories/graceline-intro-1440.webp.asset.json` — `/__l5e/assets-v1/59c60ed6-019e-4c56-8c70-3d9a350c2db4/graceline-intro-1440.webp`
- `src/assets/qa/stories/graceline-intro-390.webp.asset.json` — `/__l5e/assets-v1/333dafbb-fdd3-4165-b066-c187c89f0f82/graceline-intro-390.webp`
- `src/assets/qa/stories/graceline-intro-768.webp.asset.json` — `/__l5e/assets-v1/4a5a222f-f176-40ee-8dfb-8902ebf635f7/graceline-intro-768.webp`
- `src/assets/qa/stories/graceline-last-photo-1440.webp.asset.json` — `/__l5e/assets-v1/fe71bd0e-24d4-4ac9-8ab3-85aa6fe6f389/graceline-last-photo-1440.webp`
- `src/assets/qa/stories/graceline-last-photo-390.webp.asset.json` — `/__l5e/assets-v1/7d0e9a1b-ede6-4350-a0ad-64508653fbb7/graceline-last-photo-390.webp`
- `src/assets/qa/stories/graceline-last-photo-768.webp.asset.json` — `/__l5e/assets-v1/6dd7e297-d4a0-48cd-88e3-a0891d01743e/graceline-last-photo-768.webp`

### Preserved / limitations
Authentic Hope Human identity, reference visual rebuild, all existing 54 campaigns/galleries, English prose and changed surnames preserved. Payments remain disabled and unchanged; nothing published. Existing public-launch content rights, legal verification and real payment configuration blockers remain. No pixel-identical claim: this fix preserves source image positions/order and captions, and deliberately upgrades existing standalone labels to semantic headings. Raw source serialization remains in static campaign data as input, never visitor-visible output. Verification results/script reside under `/tmp/browser/story-fix/`; screenshot pointers and this report are durable project evidence.

## Final sharing-only refinement — October 9, 2026
- Changed only sharing CSS: side cards scale to 90%, retain ±10° rotation and rear layering, and move upward to align rotated bottoms with the central card. Before, sides extended 42–57px below center; after, difference is under 1px at 390/768/1160/1280/1440/2460. Center remains taller and prominent.
- Central goal row is visually hidden; Previous fundraising remains. Funding moves upward, retaining open space above the bottom gold CTA. No campaign, story, payment, logo or data changes.
- Desktop tracks changed from equal columns to 54:39 with the existing 7% gap; headline verified exactly two lines at 1160, 1280 and 1440 (44px at 1160–1400, existing 48px at 1440), with the requested break after “than”. Mobile/tablet intentionally remain stacked.
- Actual card bounding width reduces from 754px to 716px at 2460, and 581px to 552px at 1440. The latter is 38.3% of viewport. At 2460 the existing fixed-card sizing yields 29.1%, **not a certified 37%**; supplied screenshot viewport/crop metadata remains unknown. Same-width normalized comparison was visually inspected, not treated as pixel identity. Remaining differences include original side-card content placement, truthful sharing copy, whole-dollar formatting and authorized Hope Human colors.
- Browser before/after captures: `/campaign-detail?slug=help-graceline-now` at 390/768/1160/1280/1440/2460×1800. Zero horizontal overflow; center qualifier retained; center goal hidden; two headline lines at all tested sizes. Final desktop 1440/2460 and mobile 390 screenshots directly inspected alongside supplied reference2 and normalized comparison.
- Central Donate opens the unchanged not-configured notice; Escape closes after its exit animation. Zero page errors. Sharing regression tests: 1 file / 4 tests passed. Managed preview log: build OK. No publication.
- Durable final evidence under `src/assets/qa/sharing-final/`:
  - Mobile: `/__l5e/assets-v1/18cb776a-71ad-4c46-963f-51b74f8519aa/sharing-final-390.png`
  - Desktop 1440: `/__l5e/assets-v1/7675ea5d-5134-4829-b829-8bff712a8164/sharing-final-1440.png`
  - Desktop 2460: `/__l5e/assets-v1/b6b6bbfb-46db-455f-a8e5-f8b4e2c19167/sharing-final-2460.png`
  - Normalized supplied-reference comparison: `/__l5e/assets-v1/e4b1844f-1230-4296-9067-07c9461f4656/sharing-final-comparison.png`
- Latest observed managed revision before this report addition: `ebf65f5`; report changes may receive a subsequent managed revision.

### Wide-screen sharing scale correction
Supersedes the prior capped 2460 sizing. Above 1440px only, the entire verified 1296px sharing canvas uses `--sharing-scale: calc(100vw / 1440px)` and CSS zoom; section top/bottom whitespace uses the same multiplier. Removed the old sharing-specific 1920 caps, without touching other sections. Images, text, padding, rings, shadows, social controls, CTAs, rotation offsets and radii scale together. The 1440 and mobile layouts are unchanged.

Browser verification on `/campaign-detail?slug=help-graceline-now`, at 1440/1920/2460/390×1800: composition widths **551.57 / 735.40 / 942.24 / 344.11px**; desktop composition stays **38.3%** of viewport. Central card widths **230 / 306.66 / 392.91px** and circles **74 / 98.66 / 126.41px** across desktop widths. Side-bottom difference remains under 0.4px desktop; headline stays two lines; no horizontal overflow or page errors. Actual normalized reference2 versus final 2460 was directly visually inspected: headline, circles and overall card composition are now comparable in scale, rather than materially smaller. Authorized palette/copy and side-card content differences remain; not a pixel-identity claim. Central Donate opens the unchanged checkout-not-configured notice and Escape closes it. Four sharing regression tests passed; managed preview build OK; nothing published.

Fresh immutable evidence in `src/assets/qa/sharing-fluid/`:
- 2460: `/__l5e/assets-v1/82894816-4620-4f58-a006-b833aa1a449f/sharing-fluid-2460.png`
- Normalized comparison: `/__l5e/assets-v1/3abdbe85-d66e-4c9a-803e-cbc916ca47b4/sharing-fluid-comparison.png`
- 1920: `/__l5e/assets-v1/c86ef40d-944f-4188-b5a2-5cf777add2c4/sharing-fluid-1920.png`
- 1440: `/__l5e/assets-v1/9ec4aa52-3e7f-40c0-a1a5-4c663477a7ca/sharing-fluid-1440.png`
- 390: `/__l5e/assets-v1/7d10f4fd-6656-4c4b-966a-79f894295bdc/sharing-fluid-390.png`
