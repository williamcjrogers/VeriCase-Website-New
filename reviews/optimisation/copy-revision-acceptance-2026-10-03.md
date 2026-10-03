# Commercial copy revision acceptance

03 October 2026. Owner-authorised follow-up to the screenshot-led implementation, in `codex/screenshot-led-website`. Previous baseline: `00aafbb`.

## What changed

Restored the preferred evidence-to-argument headline, identified the AI/construction category, added early practitioner proof and strengthened the time, research, rebuttal, drafting and demonstration propositions. Repeated generic review instructions are consolidated. Product-fit and data-handling FAQs, metadata and prefilled enquiry wording are consistent with the revised copy. Small component wiring changes keep the rendered headings in the content module; the existing design is preserved.

All four full approved profile records and summaries, their credentials, representative experience, affiliations, portraits and contacts remain unchanged. The three genuine synthetic product captures, their crops, dates, alt text and captions remain unchanged. Company/legal wording, professional responsibility, confidentiality and consent behaviour are preserved.

## Fresh verification

- Production build passed, including prerender and both source/built copy checks with zero warnings. Eight sample hashes were unchanged.
- Existing Jest suite: 15 suites, 93 tests passed; copy regression suite: two tests passed.
- Build command: `COREPACK_ENABLE_PROJECT_SPEC=0 corepack pnpm@9.15.9 --config.package-manager-strict=false run build` from `frontend`.
- Tests used pnpm 11 with `COREPACK_ENABLE_PROJECT_SPEC=0 pnpm_config_verify_deps_before_run=false corepack pnpm --pm-on-fail=ignore`. The existing Yarn declaration was bypassed without changing dependencies or installing packages.
- Independent frontend review: no blocking findings. Its stale-canonical-deck observation is resolved in `docs/design/website-copy-2026-10-03.md`.
- Browser geometry at 320, 390, 768, 1024 and 1440 pixels: document width equals viewport width, no heading overflow and no empty main paragraphs. Record: `screenshots/copy-2026-10-03/geometry.json`.
- Visually inspected desktop opening, mobile opening, timing/overview and expanded FAQ. The opening text content exactly matches the approved headline, including its space before the italic phrase.
- Mobile "Explore how it works" follows the overview fragment and focuses `platform-title`. The new product-fit FAQ opens and exposes the correct answer. All four primary demonstration actions remain `mailto:` links; no email was sent.

## Superdesign

The existing draft `425b94c7-c50b-4d91-9bd9-edc561547894` was updated as a reversible version 2 using a literal export of the built site. No generation credits were used. Native disclosures remain available; application-only buttons are disabled in the static canvas. Functional verification belongs to the website, not this static export.

Canvas: https://superdesign.dev/teams/442d52f1-9ceb-487d-9c33-5479d0169097/projects/3c76a4ca-5759-439e-84c8-e463d9921c70?node=draft-variant-425b94c7-c50b-4d91-9bd9-edc561547894

Static preview: https://p.superdesign.dev/draft/425b94c7-c50b-4d91-9bd9-edc561547894

## Release and limits

Draft PR #5 is the existing delivery path. Hosted preview verification will be recorded after the branch update. Production has not been changed.

This copy revision does not establish product availability, current data-processing arrangements, buyer acceptance or conversion performance. The independent editorial reviews assess the copy against supplied records, not advertising-law compliance or measured commercial results. The broader manual screen-reader, cross-browser and buyer-test limits from the preceding implementation remain.
