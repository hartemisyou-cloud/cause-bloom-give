<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Hope Human architecture
- Store campaigns as static JSON with a surname audit; derive UI totals and metadata counts from its length to prevent stale import counts.
- Preserve reference funding totals only as clearly identified imported snapshots, never as new institution receipts.
- Use TanStack leaf routes for supporting pages and query-compatible campaign details; the catch-all redirects legacy .html paths and returns real not-found responses for unknown paths.
- Prerender only explicitly enumerated visitor-independent pages with link crawling off and failures fatal; campaign and donation query-string pages render on demand (crawling them broke external builds).
- On Vercel builds, vite.config re-runs the Vercel preset compiled hook, because enabling prerender displaces it and drops .vercel/output config files.
- Use optimized CDN-backed immutable image pointers and source-URL-keyed gallery thumbnails; render all small photo previews but load only the selected full-size gallery photo to keep initial transfers small.
- Keep campaign source-to-active image mappings in the artwork audit, with supporting imagery catalogued separately; this makes replacements and coverage traceable without shipping archived source websites.
- Use the query-compatible donation leaf page for amount selection and transparent ebook-purchase navigation via window.location.replace to the configured product map; never submit a payment form, create sessions or collect card data on this site. Keep public foundation terms separate from unconfirmed store allocation or approval states, and never treat a thank-you URL as proof of payment.
- Prepare campaign proposals as explicit user-sent emails without pretending to store, submit or publish campaigns.
- Meta Pixel is the only analytics vendor: loaded for every visitor without a prompt, except Europe-timezone browsers and an explicit Decline; browser sends PageView/AddToCart/InitiateCheckout (once per page) only, Purchase stays server-side (CAPI) to avoid duplicates. Preserve paid-traffic parameters within the session; store ref codes per campaign in checkout.ts.
- Use per-leaf metadata with VITE_SITE_URL (default canonical https://hopehumanfoundation.org) and omit image tags when only relative CDN asset URLs are available.
- Mirror every runtime-referenced /__l5e/assets-v1 file byte-identically under public/ at the same path; non-Lovable hosts (Vercel) lack the Lovable asset route. Add new runtime assets there too (QA evidence excluded).

- Implement reference-matched layouts through shared semantic CSS and design-system controls, with CDN-hosted public font subsets; this preserves consistent geometry without shipping archived source pages or scripts.
- Keep campaign gallery and funding in focused presentation modules with campaign-keyed state and bounded reference geometry; this isolates page reconstruction from homepage and payment integrations.
- Keep campaign-bound activity in a privacy-safe presentation adapter with confirmed eligible records only, never derive donors from historical totals or support prose; absent donor sources stay explicitly unavailable, and labelled fixtures live only in tests and a DEV-only standalone harness without analytics.
- Render campaign stories through a safe rich-text component and exact source-path artwork map; this preserves inline photo order/captions and prevents serialization markers from appearing as prose.

- Render expanding campaign panels in a dedicated accessible presentation module, keeping campaign data immutable and navigation shared with leaf routes.
- Keep image-led supporting page families in focused presentation modules; retain genuine content and explicit empty event records instead of importing unsupported reference claims.
- Keep story reactions local to the current page without fabricated counts or persistence; sharing uses the canonical campaign link.
- Keep the explainer timer browser-only, visibility-gated and reduced-motion aware; its states are illustrations, never payment confirmation.
- Rank Most Loved by genuine previous fundraising and omit unsupported supporter/time metrics; keep support and transparency layouts in shared content presentation.
- Derive progress and funded/urgent status through shared finite-value guards, cap only visual progress and never mutate imported totals; this handles zero goals and overfunding consistently.
- Keep favorites deduplicated in browser storage with a synchronized memory fallback; no public heart or donor counts are inferred from device-local preferences.
- Observe primary donation controls before showing the mobile floating action; this avoids duplicate visible controls while preserving access lower on the page.
- Keep the institutional footer in a dedicated shared presentation component with footer-scoped semantic tokens and the authentic logo as its decorative watermark; this isolates visual updates from navigation, payment logic and page content.
- Use the shared decorative Lucide subject-icon resolver for heading and category cues, with scoped size/stroke rules; this keeps icon meanings consistent without changing accessible text or business behavior.

- Allocate homepage campaigns into disjoint category-interleaved collections with bounded, accessible pagination and local discovery filters; every authentic record remains reachable without duplicating highlights or mutating source data.
- Keep reference-adapted homepage process sections and policy contents navigation in focused presentation modules; preserve destination-owned copy, routes and integrations instead of importing source services or institutional records.
- Reuse the compact campaign amount panel across desktop and mobile; preset links select amounts on the existing donation page without starting checkout or changing provider behavior.
