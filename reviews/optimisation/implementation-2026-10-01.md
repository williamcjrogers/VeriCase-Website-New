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

The marketing project is `veri-case-website-new-re2v` (`prj_JavSKONSjXnMvEpWc3lIYoMVLuGV`). The other website project is retained. Public cutover will update only the apex and www A records, using Vercel's current recommended IPv4 addresses, and invert Vercel's domain redirect so the apex is canonical. The existing AWS load-balancer rules do not need alteration. The rollback file restores the two previous AWS aliases.

Public delivery verification will be appended after the release and DNS change.

## Outstanding owner or service inputs

1. Sign in to the existing PostHog project, verify incoming events and create engagement/enquiry-intent views. Reconcile received enquiries and arranged demonstrations separately.
2. Confirm the authorised Search Console property before connecting GSC Wizard or using search data.
3. Supply approved operational facts for client-data hosting, retention, subprocessors and model-training treatment; publish only after verification.
4. Confirm the website sign-in destination. The preserved `https://app.veri-case.com/ui/login.html` returned 404 before this release; the current Meritus application at `https://www.meritusiq.com/ui/login.html` displays its sign-in screen. No application DNS or branding migration is included here.

## Sources

- [PostHog event processing](https://github.com/PostHog/posthog-js/blob/main/packages/browser/src/posthog-core.ts), required transport properties.
- [PostHog anonymous events](https://posthog.com/docs/data/anonymous-vs-identified-events), anonymous-profile processing.
- [Vercel domain update API](https://vercel.com/docs/rest-api/projects/update-a-project-domain).
- [AWS DNS change API](https://docs.aws.amazon.com/Route53/latest/APIReference/API_ChangeResourceRecordSets.html).
