# Hope Human Foundation Launch

Create a BRAND NEW project from scratch (not a remix) for Hope Human Foundation. User explicitly requests reproducing the structure, page layouts and all campaigns of https://us.solenari-care.com while replacing brand name, logo and colors with their existing institution from https://lovable.dev/projects/41ca4f21-7b14-4357-b6c5-a3c908066c13. Build now, not a plan. Do not modify that source project. Entire website and EVERY campaign must be in English by default including Spanish source campaigns.

BRAND VERIFIED from source files:
name Hope Human Foundation; short name Hope Human.
Actual current logo (download/copy into this new project's public assets): https://id-preview--41ca4f21-7b14-4357-b6c5-a3c908066c13.lovable.app/__l5e/assets-v1/8e79c970-b007-4bf7-9d10-481d4c379575/hope-human-logo.png
Alternative transparent asset if needed: https://id-preview--41ca4f21-7b14-4357-b6c5-a3c908066c13.lovable.app/__l5e/assets-v1/c7a58210-6b98-4989-8157-684a9bad34be/hope-human-logo-transparent.png
Use the authentic logo, do not invent a new emblem. Colors ACTUAL source CSS: institutional green #245C4F, dark green #173B34, gold #D6B86A, champagne #E7DDC6, sage #DCE7E1, off-white #FCFBF7, text #1F2A27. Soft matte gold styling. Don't copy Solenari's EIN, legal status, contact details, payment destinations or credentials. Source brand email support@hopehumanfoundation.org. Source EIN 00-0000000 is a placeholder: omit EIN and unsupported tax/legal claims.

Reference observed:
Desktop centered brand logo in 80px white header; dropdown navigation left "How to help" (Campaigns, Causes), "Discover" (Most Loved, Events, Blog); gold pill Start a Campaign right. Mobile compact header + accessible drawer.
Home spacious mint/champagne hero: left eyebrow MAKE A DIFFERENCE TODAY, large "Find a cause that moves you." with gold accent, supporting copy, Find a campaign pill; right rounded featured campaign photo card, category badge, title/excerpt, progress bar, raised/funded, Donate now, See more campaigns, arrows and pagination dots. Below in order Trending campaigns to donate with category selector and 5 campaign cards + see-all; How it works/Donate in 3 simple steps (interactive visual); Featured campaigns to support with 4 cards; start something meaningful section offering yourself, friends & family, business; full multi-column footer.
Campaigns page https://us.solenari-care.com/campaigns.html currently has EXACTLY 54 campaign entries. Import ALL 54, preserve source slugs, images, categories and goals/story content translated into natural English, not just a handful of placeholder cards. User's latest edit: CHANGE ONLY BENEFICIARIES' SURNAMES, keep first names and the rest of the campaign content. Assign consistent alternate display surnames across list/detail/story, track original vs display in data so the changes are auditable. Do not fabricate clinical facts, fresh live donations, verification or processing success. Historical amounts imported from reference must be identified as imported snapshots, not live receipts of this new institution.
Fetch the website and its public data/scripts where needed to accurately import all campaign detail bodies and image galleries. Campaign listing shows search, category dropdown, left sidebar counts (Children & Family 11, Animals & Pets 1, Disaster Relief 0, Health 42), Active/Urgent/Fully Funded filters, sort Most Funded/Least Funded/Newest/Smallest Goal, responsive 3-column card grid, count results, empty state.
Reference detail route campaign-detail.html?slug=help-teddy (also clean /campaign-detail?slug=help-teddy) has breadcrumbs, large title, photo carousel with arrows/dots; left story with Read more, organizer, sharing, words of support and organizer/beneficiary block; sticky right progress/raised/goal card with Donate now/Share; related campaigns, trust strip, mobile sticky Donate CTA. Implement equivalent pages for every slug, and compatible old .html links.
Supporting routes: /causes, /most-loved, /events, /blog, /about, /contact, /help-center, /privacy-policy, /terms-of-use, /refund-cancellation-policy, /start-yourself, /start-family, /start-business, /guarantee; use meaningful English content and working navigation. Campaign creation forms validate and clearly communicate actual submission capabilities. Donation amount selection modal/sheet with USD preset/custom amounts, secure server-side integration hooks/configuration. No reference-site checkout or hardcoded external beneficiary/payment endpoints. If actual new-project payment credentials are absent, clearly show checkout not yet configured and never simulate completed payment. No unnecessary database needed for read-heavy pages.

PERFORMANCE for substantial paid traffic: static/prerendered content where possible, local optimized WebP/AVIF responsive images and thumbnails, proper width/height, eager/fetchpriority only first hero image, lazy below-fold images, no giant initial gallery loads, route splitting, lean dependencies, no heavy animation libraries/videos/autoplay, self-hosted font subset or system fallback with font-display swap, cached immutable assets, correct 404 handling, campaign SEO metadata/OpenGraph/canonical configurable domain, html lang=en, UTM/gclid/fbclid preservation and configurable consent-aware analytics hooks with NO invented IDs. Targets LCP<2.5s, CLS<0.1, INP<200ms (targets not guarantees). Native accessible controls, keyboard/focus behavior, reduced motion. Mobile 360/390, tablet 768, desktop 1440 with no overflow and >=44px tap targets.
Test build/type checks, all 54 detail routes, broken images/links, filtering/sorting/search, English completeness, surname replacements, desktop/mobile homepage/detail and donation modal. Report verified checks and anything blocked. Do not publish yet; create complete reviewable project with preview.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cause-bloom-give.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5dc3b815-88ea-4da6-b1d3-a58fa6079440).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
