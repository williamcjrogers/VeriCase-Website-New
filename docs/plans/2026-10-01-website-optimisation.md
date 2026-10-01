# Website optimisation implementation

Approved scope, 01 October 2026. Baseline: `6744c3630090844064f2524a1f5619a01a8f3c21`.

Retain the forest-green working-record design and improve qualified demonstration enquiries. Implement the approved review in five stages:

1. Reconcile public delivery: map both Vercel projects and AWS DNS; serve the marketing site at `https://veri-case.com`, preserving application sign-in. Do not delete either project.
2. Repair browser defects: 320 px overflow, 44 px primary controls, warning contrast, complete animation pause/reduced motion/visibility handling, selected chronology controls, accurate drawing description, Newsreader display typography and route metadata/HTTP errors.
3. Measure enquiry intent: consistent “Request a demonstration”, email/copy fallback, explicit consent-gated events with fixed section identifiers, no session recording and no claim that a click is a booking.
4. Clarify supported claims, chapter order and fictional sample boundaries. Publish client-data policy only from verified operational facts. Reconcile audit instructions with the current implementation.
5. Verify the build, relevant regressions, browser at 320/390/768/1440 px, public resources and analytics consent. Obtain one independent review of the final changes and publish the verified release.

Acceptance: no horizontal overflow; pause freezes CSS, SVG and timers; reduced motion remains operable; cookie metadata and unknown-route 404 are correct; no analytics before consent; individually verify explicit intent events. Real-user Core Web Vitals and actual enquiries require service data; do not infer them from local tests.

## Progress

- Source implementation and independent review complete. All three reviewer findings corrected: required analytics transport properties, cross-tab consent withdrawal and retained scan beam position.
- 71 tests across ten suites pass; production build and built copy check pass with no copy warnings.
- Browser acceptance: no page overflow at 320, 390, 768 or 1440 px; primary header controls 44 px; keyboard selection, evidence drawer, animation pause/reduced motion/offscreen/visibility checks complete. Five targeted axe rules report no violations on the settled page.
- Vercel 0.21.4 and PostHog 2.0.1 installed. Vercel account access confirmed. PostHog account connection remains outstanding.
- AWS access confirmed through the alternate existing AWS connection. Both marketing A records point to an AWS redirect. The intended Vercel project is `veri-case-website-new-re2v`; the duplicate project is retained.
- Public cutover and release verification are the remaining operational steps, recorded in the implementation report.
- Client-data policy facts, PostHog account access and the intended replacement for the existing broken application sign-in URL have been requested from the owner. Publication gates stay closed pending facts.

Evidence and release status: `reviews/optimisation/implementation-2026-10-01.md`.
