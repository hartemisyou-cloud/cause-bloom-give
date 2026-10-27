# Campaign refinement audit

## Inputs and checkpoint
- New Hope Human and Solenari screenshots: image-26.png and image-27.png (composition references only).
- Uploaded reconstruction specification, all 666 lines.
- Previously recovered HTTrack campaign HTML and CSS under /tmp/soleni-reference/campaign; reference scripts are not executed.
- Current campaign route, gallery, funding, lower sections, story actions, shared card and semantic stylesheet.
- Recoverable source snapshot: /tmp/campaign-refinement-checkpoint/source-before.tar.gz. No Git history manipulation.

## Component comparison
| Priority | Component | Current | Reference-backed correction |
|---|---|---|---|
| P1 | Main columns | Already bounded to 1040px, sidebar 340px, gap 44px | Preserve; keep typography bounded at wide widths |
| P1 | Funding | Ring and data valid; gold action uses general diagonal gradient | Campaign-scoped vertical gold treatment; retain previous fundraising qualifier |
| P1 | Related campaigns | Three full generic cards on white background | Full-width soft-gold band, bounded 1100px inner, 270px snap cards with 22px gaps, category selector and previous/next controls |
| P2 | Inline sharing | One combined copy/share control | Distinct native-share, Facebook, email and copy controls with actual campaign URL and status feedback |
| P2 | Support | All-or-six toggle and generic row spacing | Dedicated accessible message section, progressive pagination and compact aligned initials/message rows |
| P2 | High activity | No real donor/support records supplied | Isolated test-only fixtures at 10/30/100 rows; never ship fabricated donor activity |
| Preserved | Shared header/footer | Authentic Hope Human logo, existing menus and institutional footer | No global redesign or identity changes |

## Constraints
Campaign snapshots remain immutable. No payment requests, checkout modifications, production analytics changes or publication. Source donor counts, avatars, testimonials, simulated success scripts and unsupported claims are excluded. Live activity updates/moderation require a genuine confirmed-record source and authorized backend; no such source exists here. Full production Core Web Vitals cannot be established by local screenshots.