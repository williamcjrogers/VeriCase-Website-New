# VeriCase Editorial Homepage Implementation Plan

> For agentic workers: use superpowers:subagent-driven-development with independent review after each task and a final review. Preserve existing uncommitted work. No commit, push or deployment.

**Goal:** Establish the evidence problem, introduce one solution, and explain its capabilities through clearly identified editorial chapters.

**Architecture:** Refine existing React chapter, citation, illustration and navigation components. Restore reference typography and detailing without reviving obsolete sections or replacing application demonstrations.

**Tech stack:** React 18, Tailwind/CSS, local Newsreader and IBM Plex fonts, Jest and the existing production build.

**Spec:** Owner-approved plan in this conversation, 10 October 2026. This document supersedes conflicting presentation rules in `docs/design/current-contract.md`.

## Global constraints

- Work in the existing checkout and preserve prior uncommitted changes. No new dependency, backend, form, API or analytics destination. Do not commit, push or deploy.
- British English, no em dashes. Do not change colours or synthetic records inside application demonstrations.
- Preserve the original hero Lens, source interactions, embossed outcome, continuous motto and attribution, all four Time paragraphs, research figures and references.
- Retain publication gates and professional-review qualifications. No old benchmark, immutable-storage or automatic legal-outcome promises.

## Approved copy

Opening H1: **When the story changes, the records matter.**

Opening lead: Bring scattered emails and documents into focus with Chronology Lens™. Follow the correspondence, ask questions of the record and prepare a report, claim or response with the evidence beside you.

Outcome remains: **Know what happened. Show why it matters.** Primary CTA remains Request a demonstration. Secondary: Explore Chronology Lens, targeting #chronology-lens. Do not transplant the mock-up's facade records into the bracket-based hero Lens.

Page order: opening, motto, Time is your ally, statistics, THE VERICASE SOLUTION with six chapters and source-review support, audience, people, questions, demonstration, references.

| Number / label / ID | Heading | Lead |
|---|---|---|
| I / The Chronology Lens™ / chronology-lens | Many threads. One order of events. | Bring emails, attachments and project documents into one searchable record. Read the correspondence in date order, with each entry linked to its source. |
| II / Ask your evidence / research | Ask a question. Read a cited answer. | Ask a focused question in plain English. Executive Analysis answers from the evidence and lets you follow up as new points emerge. |
| III / Reports and bundles / worked-example | A report. Its evidence. One bundle. | Deep Research produces a report with its sources. Create a bundle containing the report and cited records, with a cover, index and page numbers. |
| IV / The case room / case-room | Their points, numbered. Your replies, cited. | Examine the other side’s account point by point. Bring supporting and conflicting records alongside each assertion, with proposed replies for your team to review. |
| V / Develop the argument / claims | Develop the argument. Keep the evidence beside it. | Structure your claim or response in sections. Draft with the relevant records beside the wording, including material that challenges your position. |
| VI / Work together / collaboration | Keep the discussion with the evidence. | Discuss the email or document where it sits. Bring your team, consultants and advisers into the conversation, with the history kept alongside the record. |

Comparison labels: Where the record fails / Where VeriCase comes in.

- Chronology fail: An instruction sits in an email. The qualification is in its attachment. A later reply changes the picture.
- Chronology recover: Search emails and attachments together. See matching passages in date order, then open the records behind them.
- Questions fail: A summary reaches you without its sources. Before you can rely on it, the checking starts again.
- Questions recover: Read the answer alongside its supporting records. Follow the citations and check what the material establishes.
- Case room fail: Under time pressure, the easiest points to answer can take attention from the assertions that need further investigation.
- Case room recover: Consider the evidence beside each point. Review the proposed reply, its references and any gaps before developing your response.

These replace issue/method introductions. Reports, drafting and collaboration retain useful existing steps instead of another comparison pair.

## Visual specification

- Newsreader chapter headings, weight 500, #1A2550, clamp(2rem, 1.536rem + 1.905vw, 3.25rem). IBM Plex Sans body 18px desktop and 16px phone, line-height about 1.6.
- Twelve-column chapter header: at 1024px+ numeral/label in columns 1-2, copy starts column 3. Below 1024px, 48px numeral and italic label above the heading. Large numerals italic gold.
- Alternate explicit #F5F0E6 ivory / #FCFAF5 paper grounds. No grid in editorial solution chapters; retain opening treatment.
- Case room #0E1630; ivory #F5F0E6 text and gold detailing. Copy original `.cr-rain` static SVG recipe from caseroom.css (0.03-0.12 opacity) into scoped editorial styling. No legacy caseroom stylesheet import. Decorative absolute layer within positioned copy wrapper, aria-hidden and pointer-events:none; app above it unchanged.
- Gold #BF9B58 2px paired rules, 7px central diamond, one ornament per boundary.
- Preserve solution title: unboxed, embossed #1F3A6E, existing max 32px. Stats keep #15181F band, light-gold figures, ivory labels and stacked phone layout.
- Scope fonts/colours, never override shared app colour variables. Phone gutters 24px from 360px; 20px below. Stack comparison pairs and keep demonstrations visible.

## Review focus

1. Nested active navigation must select specific chapters over platform, with platform fallback.
2. Reparented sections must retain dividers, intended grounds and app colour isolation.
3. Gated claims must not bypass publication checks through new leads/comparisons.
4. All old fragments, source-dialog focus and footnote round trips must remain functional.
5. Mobile, reduced-motion, no-JavaScript and print views must retain essential content without clipping.

### Task 1: Page hierarchy and navigation

**Own:** LandingPage.jsx/tests, Hero.jsx, HeroMotto.test.jsx, InBrief.jsx, ChapterHeader.jsx, home.js registry only, useActiveSection.js/new tests, MarketingProgress.jsx/new tests. Structural chapter heading integration and audience extraction may be prepared here so the hierarchy is testable; copy and example reduction belong to Task 2.

- [x] Add meaningful composition tests for order, unique destinations, chapters inside platform, and navigation focus.
- [x] Hero contains only opening and original Lens. Compose motto, Time and stats explicitly in LandingPage.
- [x] InBrief is full-width solution wrapper with container for heading/index and full-width chapter children.
- [x] One SOLUTION_CHAPTERS registry supplies numerals/labels/index; derive compatible legacy metadata. Preserve six feature link wording and all fragment IDs.
- [x] Extend ChapterHeader with optional label, as (default h2) and leadGate. New solution headings are h3.
- [x] Active section hook chooses deepest intersecting section, preserves original order for unrelated ties and platform fallback. Test nested bundles/collaboration and no match.
- [x] MarketingProgress observes each section's own aria-labelledby heading, including h3, without weakening consent. Test consent off/on and revocation cleanup.
- [x] Move full-page assertions from HeroMotto.test to LandingPage.test; isolated hero keeps Lens and CTA assertions.
- [x] Run relevant Jest tests and independent task review.

### Task 2: Approved copy and example reduction

**Own:** home.js copy, CapabilityDetails.jsx, Collaboration.jsx, SharedWorkspace.jsx, Hero.jsx conditional copy, shared illustration/step headings and relevant tests. Consume Task 1's hierarchy, registry and ChapterHeader API. No CSS changes except essential class hooks for Task 3.

- [x] Apply exact approved opening/chapter/comparison copy above. Remove old situation paragraph from rendered opening; keep original Lens and embossed outcome.
- [x] Preserve methodGate on moved promises through leadGate and recoverGate, and existing step gates. Regression tests strike G5_rebuttalReview / G5_claims and prove migrated sentences are absent.
- [x] Keep seven app examples in order: search, analysis, bundle, rebuttal, drafting, lanes, activity, plus original hero Lens.
- [x] Unmount UploadExample and ItemExample only; retain ingestion, tagging and mentions in useful supporting text. Keep source files.
- [x] SearchExample moves to chapter I with duplicate introduction and process diagram omitted. Existing bundle owns its report; no standalone report panel.
- [x] Keep compact £153 illustration, qualifications/source/calculator; unmount duplicate long collaboration stats but keep notes/routes.
- [x] Integrity is unnumbered support inside platform, preserving #notes and professional-review language.
- [x] Audience is a named export from its existing module, mounted after platform, preserving approved cards/copy.
- [x] Shared figure/step components accept headingAs with backward-compatible h3 default, pass h4 within chapters; subordinate app headings h5 where needed.
- [x] Test retained example order, IDs, content, gates, protected Time/motto/statistics and original Lens, then independent review.

### Task 3: Editorial styling

**Own:** clarity.css and a scoped editorial stylesheet if needed; index.css only where essential shared ornament geometry needs correction. Consume Task 1/2 component classes and semantics; coordinate any new class hook with controller. No global app token changes.

- [x] Apply exact visual specification above using existing fonts and editorial primitives.
- [x] Remove direct-main/nth-child assumptions for nested solution chapters; assign surfaces explicitly.
- [x] Restore sidebar numerals/italic labels/serif headings, comparison rules and content alignment.
- [x] Add original restrained case-room texture in scoped decorative layer; isolate application colours.
- [x] Preserve small unboxed solution title, stats palette/reels, hero Lens and motto.
- [x] Add print ink-on-paper and ensure motion/no-JS visible end states.
- [x] Inspect required responsive widths and fix measured clipping, then independent task review.

### Task 4: Validation and documentation

- [x] Run complete Jest suite, copy tests and production build; inspect sampleHashes.json if generated content differs.
- [x] Fresh built-page inspection at 1359, 1024, 768, 390 and 320px; measured bounds as well as document overflow. The 200% check used equivalent reflow at 680 CSS pixels and scale factor 2, not the browser UI zoom command. This verification limitation is retained in the final report.
- [x] Exercise keyboard/menu/disclosures/Lens stages and slider/source-dialog focus return/replay/citation links. Confirm 40,000, 5.5, 18% end values.
- [x] Verify reduced motion, no JavaScript and print. Preserve demo styles and synthetic source distinctions.
- [x] Capture before/after at identical widths; default page must be shorter than fresh baseline without hiding retained examples.
- [x] Independent whole-change code/copy/visual review; fix material findings, rerun affected checks.
- [x] Update current-contract.md and save verification in reviews/optimisation/2026-10-10-editorial-homepage/.

## Commands

Use `/bin/bash`, login false. Prefix pnpm commands with COREPACK_ENABLE_PROJECT_SPEC=0 and use corepack pnpm --dir frontend --config.pm-on-fail=warn --config.verify-deps-before-run=false.

- Tests: CI=true [prefix] test --watchAll=false --runInBand
- Copy: [prefix] test:copy
- Build: [prefix] build

Build writes ignored frontend/build and may update tracked sampleHashes.json when canonical evidence changes. No evidence changes are planned.

## Execution decisions

Use the current checkout because the owner explicitly authorised it and it holds approved uncommitted work. Review task deltas against saved pre-task file snapshots, not HEAD alone. Preserve review evidence and ledger after completion because there will be no commit to hold them. DeepEval is not applicable to this static marketing-page change.

## Completion record, 10 October 2026

Implemented locally through task workers and independent review. The final review is APPROVED after corrections. All 25 Jest suites (182 tests), both copy tests and the production build passed. The five-width page is shorter at every measured width, with all retained illustrations rendered. See [verification](../../../reviews/optimisation/2026-10-10-editorial-homepage/verification.md) for complete results, screenshots, resolved findings and the explicit zoom-check limitation. HEAD and sample hashes remain unchanged. No commit, push or deployment was made.
