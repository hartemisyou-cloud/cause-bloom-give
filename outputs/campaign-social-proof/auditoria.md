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
`/dev/campaign-social-proof.html` is an independent Vite development entry guarded by `import.meta.env.DEV`, no public route/link, no root analytics and no production entry. Fixtures are labelled TEST DATA; counts, values, timestamps and messages never reach public campaign records.
