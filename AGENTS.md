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
- Store the imported campaign collection as versioned static JSON with a separate surname audit; read-heavy content does not need a database.
- Preserve reference funding totals only as clearly identified imported snapshots, never as new institution receipts.
- Use TanStack leaf routes for supporting pages and query-compatible campaign details; the catch-all redirects legacy .html paths and returns real not-found responses for unknown paths.
- Prerender only explicitly enumerated visitor-independent pages; campaign query-string details are rendered from bundled static data on demand.
- Use optimized CDN-backed immutable image pointers, separate thumbnails, and load only the selected gallery photo to keep initial transfers small.
- Keep campaign source-to-active image mappings in the artwork audit, with supporting imagery catalogued separately; this makes replacements and coverage traceable without shipping archived source websites.
- Keep payment processing disabled until payments is enabled in the Lovable editor; selection UI must never collect card details or simulate success.
- Prepare campaign proposals as explicit user-sent emails without pretending to store, submit or publish campaigns.
- Keep analytics provider-free and consent-gated; preserve paid-traffic parameters within the same browser session.
- Use per-leaf metadata with a configurable VITE_SITE_URL and omit image tags when only relative CDN asset URLs are available.

- Implement reference-matched layouts through shared semantic CSS and design-system controls, with CDN-hosted public font subsets; this preserves consistent geometry without shipping archived source pages or scripts.
- Keep campaign-detail lower sections in a shared campaign-bound module with accessible action dialogs; absent donor records remain explicit empty states, social links use canonical campaign URLs, and contact/report only prepare user-sent support emails.
- Render campaign stories through a safe rich-text component and exact source-path artwork map; this preserves inline photo order/captions and prevents serialization markers from appearing as prose.
