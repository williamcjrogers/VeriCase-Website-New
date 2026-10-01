# Website optimisation implementation

01 October 2026. Baseline `6744c3630090844064f2524a1f5619a01a8f3c21`.

## Implemented

The forest-green working-record identity remains. The chronology grid now fits 320 px; the narrow header uses 44 px primary controls. The warning uses the lighter signal colour (approximately 6.82:1 against its green background). Chronology controls are native buttons with selected states and keyboard operation. A textual description supplements the miniature illustration.

The illustration has a single running condition covering manual pause, viewport visibility, document visibility, reduced motion and selected operation. CSS and SVG timelines pause together. The scan beam remains mounted, preserving its position; Replay explicitly restarts it. Reduced motion leaves a static, operable presentation. The illustrative lead time now agrees with EV-0138 (10 weeks).

Newsreader is the display typeface throughout; fonts are self-hosted. The cookie notice has its own prerendered and client-side metadata. Unknown paths serve an HTTP 404 with noindex and no homepage canonical. Existing login and fileserver compatibility redirects are retained.

The hero describes a cited record and professional review. Unsupported timing language has been removed. Demonstration links consistently say “Request a demonstration”, with the existing copy-address fallback. The chapter sequence includes Rebuttal. The fiction notice applies to the sample matter. Company founders are consistent in structured data. The client-data answer and website privacy-page gates remain closed because their factual approval is outstanding.

Project audit skills and agent briefs now follow `docs/design/current-contract.md`, replacing obsolete palette, typography and section instructions. Historical design documents identify their status.

## Measurement contract

Five explicit events: `marketing_page_viewed`, `marketing_section_viewed`, `demonstration_email_clicked`, `demonstration_email_copied`, `sample_interacted`.

Only fixed placement, section and interaction identifiers are accepted. Source text, form text, addresses, URL query strings and arbitrary campaign/profile fields are excluded. Required SDK transport and anonymous-profile fields are preserved. An email click measures intent, copying measures fallback use, and neither represents an enquiry received or a booked demonstration.

Analytics does not load before consent. Withdrawal stops capture, including withdrawal in another tab while the SDK is loading. Storage-unavailable choices apply only to the current page. Autocapture, session recording, automatic page capture, surveys and feature flags are disabled. Section observations start after consent, without replaying earlier activity.

Browser checks individually verified the email-click, address-copy, section-view and sample-interaction queues with the analytics network blocked. Tests cover the actual shipped bootstrap, transport-field preservation and delayed-load consent race. This establishes client behaviour, not live ingestion or business conversion.

## Verification

- 71 tests across ten suites pass, including the original 52 tests.
- Production build and prerender succeed; built copy check has zero warnings; diff whitespace check passes.
- Fully materialised browser page: document width equals viewport width at 320, 390, 768 and 1440 px.
- Narrow header CTA and logo targets measure 44 px.
- Paused SVG time and rotation matrices remain unchanged. CSS scan time measured 9205.107 ms on successive paused observations, then continued above 9446 ms on Resume rather than restarting.
- Reduced motion, offscreen suspension and controlled document-visibility checks pass. Native chronology buttons respond to Enter/Space and show their pressed state and focus outline.
- The sample source drawer opens the matching record and closes correctly.
- Settled-page axe checks for colour contrast, button names, allowed ARIA attributes, valid ARIA values and link names report no violations. A transient contrast result during an existing fade disappeared at its settled colour; no palette change was made for that transient measurement.
- Cookie and unknown-page metadata checked in the browser. Initial Vercel preview returned a real 404 for an unknown path and correct robots content type.

This is targeted Chromium acceptance, not a complete screen-reader or cross-browser audit. No Lighthouse score or real-user Core Web Vitals pass is claimed. Field targets remain LCP <=2.5 seconds, INP <=200 ms and CLS <=0.1 at the 75th percentile.

## Independent review

One independent whole-branch review identified three issues: removal of the required PostHog token, stale cross-tab consent during delayed loading, and scan-beam remounting on pause. Each was reproduced by a failing regression test, corrected and verified. Tests also preserve the SDK's anonymous-profile flag. All 71 tests pass after those corrections.

## Services and release

Vercel 0.21.4 and PostHog 2.0.1 are installed. Vercel account access is confirmed. PostHog is at its sign-in screen; account/project access and received events remain unverified. GSC Wizard remains conditional on an authorised Search Console property. No duplicate analytics service or redesign plugin was added.

The marketing project is `veri-case-website-new-re2v` (`prj_JavSKONSjXnMvEpWc3lIYoMVLuGV`). The other website project is retained. Public cutover updated only the apex and www A records to Vercel's current recommended IPv4 addresses, and inverted Vercel's domain redirect so the apex is canonical. The existing AWS load-balancer rules do not need alteration. The rollback file restores the two previous AWS aliases.

Code release `c76b278cd4fa5ce8023aba14bc6f17d3929ebec9` was committed and pushed to `main`, then deployed automatically as production deployment `dpl_AMiuebxYVQUAtyPqymT37CiE8NBk`. GitHub and Vercel metadata agree on the commit. The final evidence commit changes only these records and screenshots.

The pre-existing Vercel certificate had expired. A replacement was issued before DNS cutover using temporary DNS challenges. TLS validation then passed on both recommended addresses for both marketing hostnames. The new certificate expires on 29 December 2026 and Vercel lists automatic renewal enabled. The two temporary challenge records were subsequently removed, with Route 53 reporting INSYNC. No certificate warning was bypassed. A fresh browser tab loaded the public site successfully after propagation.

Route 53 now contains the same 23 records as before. Exactly two records changed, the apex and www A records; all other 21 records are unchanged. Application, API and mail records, and the AWS load-balancer rules, were preserved. Vercel reports the domain configured correctly.

Public checks completed:

| Resource | Result |
|---|---|
| `https://veri-case.com/` | 200, intended hero and current JavaScript, canonical apex, no noindex header |
| `https://www.veri-case.com/cookies?source=release-check` | 308 to the same path and query on the apex |
| `/robots.txt` | 200, text/plain, allows crawling and points to the correct sitemap |
| `/sitemap.xml` | 200, application/xml, lists homepage and cookie notice |
| `/og-image.png` | 200, image/png |
| `/cookies` | 200, cookie-specific title and canonical, also verified in the public browser |
| `/website-acceptance-unknown` | 404, noindex, no canonical |
| `/login` | 307 to the preserved application sign-in destination, whose pre-existing 404 remains an owner decision |

The public site was separately exercised at 320, 390, 768 and 1440 px after cutover; document and body widths matched each viewport. Public pause stopped SVG and CSS. There were zero PostHog resource requests both before consent and after rejection. Desktop and mobile screenshots are in `screenshots/`; structured HTTP, browser and DNS evidence is alongside this report.

The original untracked audit instructions in the primary checkout were preserved at `.anchor/backups/agents-before-optimisation-20261001` before bringing in their reviewed replacements. The user's other `.anchor` material was retained.

### Rollback

Prefer Vercel's production rollback to the previous known release for a website regression. If the DNS migration itself must be reversed, submit the exact `dns-rollback-2026-10-01.json` Route 53 change batch. That restores the two old AWS aliases and therefore also restores the original redirect problem. The prior Vercel mapping was apex to www and no redirect on www; if reversing this mapping, first clear www's redirect, then set the apex redirect to www to avoid a redirect loop. No rollback has been applied.

## Outstanding owner or service inputs

1. Sign in to the existing PostHog project, verify incoming events and create engagement/enquiry-intent views. Reconcile received enquiries and arranged demonstrations separately.
2. Confirm the authorised Search Console property before connecting GSC Wizard or using search data.
3. Supply approved operational facts for client-data hosting, retention, subprocessors and model-training treatment; publish only after verification.
4. Confirm the website sign-in destination. The preserved `https://app.veri-case.com/ui/login.html` returned 404 before this release; the current Meritus application at `https://www.meritusiq.com/ui/login.html` displays its sign-in screen. No application DNS or branding migration is included here.

## Sources

- [PostHog event processing](https://github.com/PostHog/posthog-js/blob/main/packages/browser/src/posthog-core.ts), required transport properties.
- [PostHog anonymous events](https://posthog.com/docs/data/anonymous-vs-identified-events), anonymous-profile processing.
- [Vercel certificate pre-generation](https://vercel.com/docs/domains/pre-generating-ssl-certs).
- [Vercel domain update API](https://vercel.com/docs/rest-api/projects/update-a-project-domain).
- [AWS DNS change API](https://docs.aws.amazon.com/Route53/latest/APIReference/API_ChangeResourceRecordSets.html).
