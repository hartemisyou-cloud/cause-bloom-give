# Hope Human Foundation — review website

This is the new project. The source brand project was not checked out or modified.

## Content import
- 54 exact reference campaign slugs, 133 unique source photos, and all supplied story paragraphs and galleries.
- 14 Spanish campaigns translated into English; 79 historical Spanish support messages translated.
- 24 beneficiary full-name replacement mappings are recorded in `src/data/surname-audit.json`. First-name-only beneficiaries do not receive fabricated surnames. Non-beneficiary relatives and organizers retain their original names unless the organizer field actually names the beneficiary.
- The `help-save-gwen` source is inconsistent: its story/title identify Lily, while its organizer is Gwen Rodriguez. The original organizer is retained; no unsupported surname is assigned to Lily.
- Source placeholders for organizer/location are clearly identified. Reference payment configuration, legal identity, credentials, donor amounts and relative support timestamps are not imported.
- Historical totals are imported snapshots dated October 5, 2026, not receipts of this new institution. Original goals and source currency conversion disclosure are retained.

## Configuration and limitations
- Checkout is disabled. This session cannot enable the payments integration, so no payment processing code, credentials, destinations or simulated success are installed. Enable payments through the Lovable editor before adding server-side checkout. Payment setup and verified recipients are launch blockers, not issues to hide behind a donation success screen.
- Forms validate and prepare a user-sent email proposal. They do not store data, automatically submit, or publish campaigns.
- `VITE_SITE_URL` configures canonical URLs. Without a verified public domain, URLs remain relative and no invented sitemap domain is used.
- Optional analytics events are dispatched as `hope:analytics` only after consent from the privacy page. No provider or invented advertising ID is installed. Attribution parameters persist within the browser session.
- Static visitor-independent pages are explicitly prerendered. Query-string detail pages render from bundled campaign data; gallery images load one at a time, not all at startup. Image files are optimized WebP variants served through immutable asset pointers.
- No claims of charity registration, EIN, tax deductibility, verification, payment protection or successful donations are made.
- Content/imagery rights, beneficiary authorization, current campaign needs, legal terms and recipient arrangements require review before a public fundraising launch.

## Verification
- Unit tests: 54 unique slugs, exact category counts, story/gallery completeness, filtering/sorting, snapshot metadata, surname consistency and removal of untranslated display boilerplate.
- Live preview: all 54 detail titles and primary images checked; 16 main pages plus legacy links returned 200; unknown page and campaign returned 404.
- Search, category empty state, most/least funded, smallest goal, urgent and fully funded filters exercised.
- Home/detail checked at 360, 390, 768 and 1440 pixels with no horizontal overflow. Drawer, photo gallery, donation selection and proposal validation checked.
- UTM and gclid preservation checked through navigation. No runtime errors observed.
- Static prerendering is configured, but generated production HTML output is not exposed in this sandbox and has not been independently inspected. Performance thresholds are targets, not verified paid-traffic guarantees. Published production measurements and third-party analytics are not available because this project has not been published.
