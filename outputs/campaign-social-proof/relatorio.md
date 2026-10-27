# Campaign social-proof delivery

## Implemented
- RecentDonations: five records per page, recent/top active filters, privacy-aware top amounts, previous/next controls and unavailable/loading/error states.
- DonationEntry: initials, public/anonymous name, consented amount in USD, confirmed date and top badge.
- CampaignSocialProof: contribution count only with a known source; top/recent highlights and history. No counts invented from historical totals.
- CampaignSupport: public campaign-scoped deduplicated messages, anonymity, genuinely available amount/date only, six-message incremental pagination and loading/error states. Existing undated support prose remains undated.
- Right funding sidebar: existing funding/amount/actions untouched, with recent records and organizer contact below. Mobile prioritizes the existing donation panel and stacks highlights/history; no redundant donor rail.

## Added files
`src/lib/campaign-social-proof.ts`, `src/components/campaign-social-proof.tsx`, `src/test/campaign-social-proof.test.tsx`, `dev/campaign-social-proof.html`, `dev/campaign-social-proof.tsx`, this report, audit and screenshot pointers.

## Modified files
`src/routes/campaign-detail.tsx`, `src/components/campaign-support.tsx`, `src/styles.css` (campaign-scoped rules), `AGENTS.md`, `roadmap.md`.

## Checks
- 87 tests passed across 17 files, including 14 new activity/privacy tests.
- Public Fabi campaign: 320/375/390/430/768/1024/1280/1440/1920 px, no horizontal overflow or browser errors.
- DEV harness: 0/1/5/50 records at 320/390/768/1440 px; sorting, page navigation, long/short messages, anonymous and hidden amounts, loading/error verified. No analytics/provider/store requests from harness.
- Organizer Contact opens the existing dialog; $20 preset opens `/donate?slug=help-save-fabi&amount=20` and selects $20. No external payment navigation or transaction performed.
- Automatic preview build: OK. Manual production build is prohibited in this environment; production bundle exclusion of the development harness remains unverified.
- Existing thank-you tests emitted their pre-existing nesting/href warnings; browser checks here had no page errors.

## Pending authentic activity
No donor ledger or live activity service exists in the inspected project. All real campaign donor sections remain explicitly unavailable; no reference donors were copied. Existing source support has no dates, donation IDs or amount consent. An authorized campaign-scoped public read feed is required before real donation lists can be populated; see the minimal safe proposal in `auditoria.md`.

## Visual evidence

### before
![before](/__l5e/assets-v1/bf23fb3a-8adc-4ab1-91dc-4e7b33cfc8df/social-proof-before.png)

### after-mobile
![after-mobile](/__l5e/assets-v1/78ea0d57-409d-417a-b1c4-4d322438fa03/social-proof-after-mobile.png)

### after-desktop
![after-desktop](/__l5e/assets-v1/096a9bce-40a8-4ee1-a6e8-c88c6b4a635c/social-proof-after-desktop.png)

### sidebar
![sidebar](/__l5e/assets-v1/da69f3d9-74ee-45ea-8115-11b634e3cbb4/social-proof-sidebar.png)

No publication, payment, email submission or financial integration changes.
