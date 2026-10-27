# Campaign social-proof audit and mapping

Scope: campaign-only; current Hope Human composition retained. No financial backend, API, checkout, analytics or global page changes.

## Real sources
- `src/data/campaigns.json` via `src/lib/campaigns.ts`: 56 campaigns, 237 name/message support entries across 40 campaigns. Support has no individual amounts, dates, transaction IDs or consent metadata.
- Campaign `raised`, `goal`, `createdAt`, `snapshotDate` are historical/display metadata, not a donor ledger.
- No donation read endpoint, database integration or campaign ledger found in source; no hosted backend connected. This is a source audit, not verification of external store records.
- `/thank-you?amount=` is not proof of payment and is never consumed by activity components.

## Reference mapping
- Print 1: heading, top/recent highlights and compact contribution history → campaign-scoped social-proof module.
- Print 2: recent list below existing funding buttons, See all/See top, organizer contact → existing right sidebar extended without altering amount links.
- Print 3: initials, name, approved amount/date only when genuinely available, compact separators and pagination → support module.
- Print 4: keep gallery, story, current toolbar, funding composition, brand, header/footer and checkout intact.

## Minimal future extension proposal (not implemented)
An authorized upstream campaign-scoped public read service could supply confirmed, eligible, privacy-approved contributions with opaque ID, campaign slug, name/anonymous setting, amount visibility, cents, confirmed timestamp and moderated public messages. Never expose email, card/payment identifiers or provider secrets. Require opt-in consent for historical message imports before adding new personal fields. Use stable IDs, cursor pagination, authoritative counts, and one request shared by sidebar/highlights/support. Revoked consent, refunds/disputes and moderation changes must remove records. This proposal does not introduce a parallel financial system or alter checkout contracts.

## Demonstration isolation
`http://localhost:8080/@fs/dev-server/dev/campaign-social-proof.html` is an independent Vite development entry guarded by `import.meta.env.DEV`, no public route/link, no root analytics and no production entry. Fixtures are labelled TEST DATA; counts, values, timestamps and messages never reach public campaign records.

## Owner-requested Free Hearts import — October 27, 2026
The owner authorized importing their Free Hearts reviews/donations. Authorization to reuse content does not establish confirmed transactions or make another campaign's testimonials applicable to Hope Human campaigns.

The previously supplied Free Hearts archive defines its content in `src/data/mockData.ts`, explicitly described on lines 3–4 as mock content awaiting a real backend. Its `Donor` interface (lines 19–25) has name, amount, message and a fixed relative `timeAgo`, but no confirmation timestamp, transaction status or publication-permission record. A shared `donorSample` (lines 107–113) is reused across campaigns. Liam's entries (lines 936–943) and Cassiel's entries (lines 2848–2854) likewise contain fixed relative times, not dated transaction records. The campaign page initializes its displayed donors directly from those arrays (`src/routes/campaigns.$id.tsx:170`). These entries are not eligible for import as confirmed recent donations or verified reviews.

No generated entries have been added to Hope Human, no existing financial totals have been changed, and no testimonial has been reassigned to another campaign. A confirmed campaign-scoped export with original dates and public-display choices remains necessary for recent donations.

Public read verification on October 27, 2026: `https://www.freeheartsfoundation.org/campaigns/help-jazlyns-baby-boy-fight-cystic-fibrosis` and `https://www.freeheartsfoundation.org/campaigns/help-cassiel-fight-stage-4-neuroblastoma` returned 200. Their displayed donor names, amounts, messages and relative times match the uploaded static arrays exactly (including Liam's “2 minutes ago” and Cassiel's “3 minutes ago”). The attempted source paths `/campaigns/help-save-fabi` and `/campaign-detail?slug=help-save-fabi` returned 404. Public display alone is not payment confirmation. Raw reads remain temporary under `/tmp/freehearts-investigation/`; no financial requests were made. All 14 existing activity/privacy/filter tests passed; automatic preview reports build OK. No application or checkout changes, publication or transactions.
