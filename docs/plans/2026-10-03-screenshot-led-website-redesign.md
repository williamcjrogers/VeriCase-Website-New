# VeriCase website: consolidated, screenshot-led improvement plan

03 October 2026.

**Status: implemented for review on `codex/screenshot-led-website`, 03 October 2026.** The consolidated plan remains the governing scope. Implementation, test and browser evidence are recorded in [the acceptance report](../../reviews/optimisation/implementation-acceptance-2026-10-03.md). Production publication, live application availability, field metrics and the five-buyer exercise are not claimed complete.

This document governs the next revision wherever earlier plans conflict. It retains the green and brass identity and takes the strongest compatible ideas from each source. The [source review and reconciliation record](../../reviews/optimisation/plan-synthesis-2026-10-03.md) explains the selections, exclusions and coverage. Source baseline: `1805b2f3d20416e08c3b9360fc4a3fb1adb1ffb0`, including optimisation commit `e58baac`. Public deployment equivalence was not rechecked for this consolidation.

## 1. Intended result and governing decisions

Create a distinctive, credible website that helps construction claims consultants and contractors' commercial teams understand VeriCase, recognise work it supports, inspect the actual application and request a demonstration. Solicitors, counsel and experts remain clearly represented as collaborators and secondary buyers.

Combine the clarity and scale of the [reference website](https://vericase-site.vercel.app/) with substantive capability explanations and the credibility of real application screenshots. Retain Newsreader, IBM Plex and the genuine VeriCase wordmark. The signature should be a readable product view and its relationship to a source record.

**The screenshots we took are the visual source of truth for product presentation.** An external reference, prototype or historical specification cannot establish a screen, control, workflow or capability. A screenshot establishes appearance at capture time; behaviour and current customer availability require separate verification.

The latest owner directions resolve earlier conflicts:

- Improve wording and structure while retaining the identity. Earlier requirements to preserve the opening and time copy verbatim are superseded for this revision.
- Show all four people with concise introductions and expandable full biographies, credentials and approved experience. Permanently expanded full biographies are no longer required.
- Keep useful visual explanation, optional interaction and some restrained motion. Every example must be complete and readable at rest, with reduced motion supported.
- Improve the existing email enquiry route. No new form, backend, authentication system or public API is required.
- Preserve the removal of programme marketing, File Login, the context-statistics band and unsupported Quantum/Final Account product claims. Do not import features from the reference website or old roadmaps.

## 2. Best material taken from each source family

| Source family | Decision carried forward |
|---|---|
| Original landing-page plan | Outcome-first copy, generous spacing, prominent real product imagery and operational simplicity. Retire its teal/coral identity, editor and invented metrics. |
| Working Record and plates | One coherent fictional issue, source traceability, evidential precision, a short route for skim readers and careful navigation/accessibility. Replace the long chapter system and simulated tools with focused screenshot-led explanation. |
| Sage-as-Witness and branding research | Every visual claim needs a product counterpart; functional controls and readable working information matter. Do not adopt its competing palette, logo, no-serif rule or sealing conventions. |
| 01 October optimisation | Preserve consent, email fallback, real routes, metadata and honest release reporting. Recheck existing fixes rather than rebuilding completed infrastructure. |
| Content-depth and purposeful-interaction revisions | Three practical jobs lead to substantial explanations. Optional source inspection helps, but essential understanding does not require clicking. |
| Application-reference and 03 October redesign work | Screenshot provenance, faithful presentation, construction-specific wording, compact profiles, mobile enlargement and explicit acceptance. |
| Latest audits and research PDFs | Use concrete findings and useful task vocabulary after checking them. Reject unmeasured performance diagnoses, arbitrary component counts and roadmap ideas presented as available features. |

Historical blueprints and wireframes explain user problems and identify capabilities to verify. They do not authorise new controls, prove production availability or substantiate public claims. Where they disagree, record the conflict and use original captures, the current application and verified behaviour to determine the published representation.

## 3. Establish an accurate baseline and repair regressions

Start implementation with current desktop/mobile browser captures, then address these source-confirmed issues within the new composition. Their rendered effects still need reproduction.

| Finding at the source baseline | Required action |
|---|---|
| TimeAdvantage uses pale on-ink text, but its dark-background rule has disappeared. Base grid and team selectors are also missing from clarity.css. | Restore complete surface, grid and team styles; measure computed contrast and layout, not class names alone. |
| LandingPage no longer mounts the record, evidence and integrity explanations; the three-job overview contains only three short paragraphs. | Restore capability substance through the new sections. A summary is not a replacement for explanation. |
| The mounted claims feature list uses undefined capability styles. | Establish heading hierarchy, spacing and bounded prose for retained explanations. |
| Four old addresses have lost their mounted destinations: #chronology-lens, #research, #case-room and #integrity. | Restore useful aliases that scroll to and focus the relevant explanation. Preserve #clock, #claims, #notes and other supported addresses. |
| Truth/winning/timing promises and the AI-drafting FAQ contradiction remain. | Reconcile wording across source, copy checks, metadata and prerendered output. |
| Full biographies dominate the reading path; clipboard failure has no announced guidance. | Add concise profiles/full disclosures and visible, accessible manual-copy instructions. |

The footer already includes 44 px link-height styling; raster texture replaced SVG noise; extra font preloads, consent-gated analytics code and source-sheet interaction handlers exist. Verify suitability and behaviour rather than assigning duplicate fixes. The source sheet is a marketing mock-up, not proof of application fidelity. These changes establish no measured INP improvement, account-side analytics receipt or current public deployment match.

## 4. Screenshot and capability evidence

### Reference register

Create `docs/design/product-reference-register.md` and a contact sheet under `reviews/optimisation/product-references/`. Locate the owner's original captures wherever available. The [existing provenance record](../design/application-reference-status-2026-10-01.md) identifies these candidates in WR2.0 Git history:

| Candidate | Repository path | Commit |
|---|---|---|
| Files library | vericase/docs/files-overhaul-qa/library-desktop.png | 8eb7dfecafc325dc0ea5a202d98742210962b30c |
| Files search | vericase/docs/files-overhaul-qa/search-desktop.png | 8eb7dfecafc325dc0ea5a202d98742210962b30c |
| Document reader | vericase/docs/files-overhaul-qa/reader-fix-desktop.png | cb8b2c4ff286aa0f75c0b4d19b3fb3ff781922fa |
| Report export | vericase/docs/qa/copilot-export/styled-report-preview.png | ba9621637f21858864ed13735cb71c8722d20d83 |

These are QA captures from 05 to 12 September 2026, not confirmed as the complete originally supplied set or latest deployed UI. Verify suitability. Live-matter Case Configuration images are not public assets. Marketing illustrations and Superdesign proposals are design history, not product evidence.

For each selected image, record original file, repository/revision, capture date if known, screen, customer task, current verification, sensitive content, all edits, caption and adjacent claim. Explicitly record unresolved provenance or availability. Source originals remain in their existing private reference locations, outside deployable/public assets; record their provenance rather than copying confidential captures into the website repository. Only sanitised contact sheets and derivatives belong in the website's review/public asset folders.

Prefer sanitised screenshots. Allow useful cropping, enlargement, removal of irrelevant browser chrome, consistent fictional substitutions and clearly external annotations. Preserve app colours, hierarchy, labels, controls and relationships. Keep an explicit reference from each derivative to its private original for comparison. Do not merge separate screens into an apparently real screen, add approval states or counts, fabricate processing, or redesign the application inside the image.

HTML recreation is exceptional, justified by legibility or a verified useful interaction and reviewed side by side against its capture. A screenshot may contain inert controls because it is clearly an image. A recreated HTML button presented as interactive must work. Label exports as exports and conceptual diagrams as explanations outside the application.

Aim for three substantial views: **find the record**, **inspect the source**, **use the evidence**. Include chronology, research or drafting screens only where adequate references exist. If the third view lacks a reference, use a verified export or plain explanation. Never imply that separate captures demonstrate an automatic end-to-end sequence.

### Capability register

Create `docs/design/website-capability-register.md`. Map each public promise and every concept in the historical detailed copy to proposed wording, supporting screen where applicable, source/behaviour check, release or flag availability, disposition (retained, rewritten, merged or omitted) and reason. Historical approval flags, roadmaps and code presence alone do not prove a currently usable feature.

Preserve this breadth, expressed only as specifically as verification allows:

| Capability | Substance to investigate and explain | Boundary |
|---|---|---|
| Record preparation | Supported correspondence/documents, attachments, organisation, filters, quoted history and duplicate handling. | Name supported inputs accurately. Verify reversible exclusion separately from deletion; no exhaustive deduplication promise. |
| Chronology | Examine dates and records, filter a view and return to its source. | Message, forecast and actual-event dates differ. Chronology alone does not establish critical delay or entitlement. |
| Research | Ask a focused question, inspect its interpretation where supported, examine findings and cited records. | A ranked result does not establish full-corpus coverage, completeness or correctness. |
| Rebuttal | Examine opposing points with supporting and contradictory records, then review proposed replies. | Do not imply every point is automatically or conclusively answered. |
| Drafting and outputs | Develop wording, organise heads where supported, inspect sources and use verified outputs. | Verify Word/PDF export, selected-source bundles and cited-source bundles separately. Do not guarantee citation enforcement after edits. |
| Collaboration | Discuss a record or draft with colleagues and advisers in the supported workspace. | Verify permissions and document/draft relationships; do not invent presence or approval workflows. |
| Evidence and access | Explain source handling, professional review, access and a route for data due diligence. | Storage, audit, retention, training-use, hosting and compliance assurances require current operational evidence. |

Omit or narrow unverified promises, keeping internal verification language out of the public page. Exclude WORM/immutable-original guarantees, universal audit claims, admissibility assurances, certification badges, unsupported benchmarks and automated delay/programme features unless independently substantiated and within the owner's scope.

## 5. Positioning, wording and reading order

Proposed opening, subject to the capability check:

> **Build your construction case from the evidence.**
>
> Bring together project correspondence and documents, examine the chronology, and prepare claims and responses with the supporting records alongside your work.
>
> For construction claims and commercial teams, working with solicitors, counsel and experts.

Use **Request a demonstration** consistently for the primary action and **See how VeriCase works** for the secondary link. External sign-in remains a separate action for existing users.

Provide a short reading path with meaningful depth. Component or section count is not an acceptance criterion:

| Reading stage | Content and presentation |
|---|---|
| Opening | Proposition, audience, action and a large, readable actual application view. |
| Recognisable problem | A concise construction scenario: dispersed records, departed staff and a position to prepare. |
| Three practical jobs | **Organise the record. Investigate the issue. Prepare the claim or response.** Each links to substantial explanation. |
| Product and capabilities | Three screenshot-led sections integrating preparation, chronology, research, rebuttal and drafting detail. Avoid a second repetitive feature grid. |
| Working together; evidence and access | Shared work, source context, verified access/data facts and due-diligence contact route. |
| People | Four concise profiles with portraits and accessible full-detail disclosures. |
| Questions | Inputs, AI assistance, existing systems, access/data arrangements and the demonstration. |
| Demonstration | What the prospect will see, then email and copy-address actions. |

Take the reference site's strong construction framing, for example:

> **The project ran for years. The response cannot wait.**
>
> The people have moved on. Correspondence sits across inboxes, shared drives and document folders. Your team needs to establish what happened, find the supporting records and prepare its position.

Use task-specific headings: **Find the records that matter. Read the source in context. Develop the argument with its sources in view. Keep the discussion beside the document.** Replace generic AI promises and fear-based urgency with concrete, supportable advantages.

Resolve the drafting FAQ consistently, if current functionality supports this wording:

> **Can VeriCase help draft a claim or response?**
>
> Yes. It can propose wording and supporting evidence for your team to review. Check the sources, revise the argument and approve the final document before it is issued. Your team remains responsible for the submission.

Use one fictional construction issue where the references permit. Keep EV-0131, EV-0138 and EV-0147 consistent through a shared content source: names, dates, excerpts and attachments. Preserve relevant contradictory material when used. A supplier's forecast proves what was communicated, not actual delivery or causative delay. Distinguish fictional evidence references from citations supporting public website claims.

Do not restore statistics or legal deadlines merely because a historical source-check exists. Revalidate any necessary assertion against its primary source before publication, retaining scope and date. A statistics band is not needed for this page.

## 6. Visual composition and purposeful interaction

| Element | Direction |
|---|---|
| Palette | Forest #0B2516, deep green #041A0F, paper #FCFAF5, parchment #F5F0E6, brass #BF9B58, bronze #5C431B. Brass is restrained emphasis; use suitable dark text on light grounds. Product colours remain faithful within captures. |
| Type | Self-hosted Newsreader for display, Plex Sans for explanation/controls and Plex Mono sparingly for dates/identifiers. Selected italic phrases provide contrast; keep headings left aligned. |
| Scale | Approximately 40–64 px H1, 30–42 px H2, 22–28 px H3 and 17–18 px body. Prose around 60–68 characters wide; judge the rendered result. |
| Layout | Container about 1280 px; 16–24 px mobile and about 40 px desktop side spacing. Alternate bounded prose with substantial application views and purposeful dark/light sections. |
| Signature | A readable real record in the application, with an external caption explaining why it matters. No new logo, decorative dashboard or generic card grid. A full-screen city photograph is unnecessary. |
| Mobile | Purposeful crops with context and accessible enlargement of the complete image. Stack explanation and views rather than shrinking a dashboard into miniature text. |

Compare two hero compositions using the same verified asset: a balanced copy/image split and copy above a wide reader view. Choose the composition preserving product legibility at desktop and mobile widths. Do not invent an interface to fit a layout.

Include one restrained, nonessential emphasis, such as a website caption highlighting its source relationship once on entry. Keep all essential content readable from first paint. Motion must not imply automatic ingestion, chronology generation or an unverified application action. No loops, artificial processing, counters or hidden essential text. Reduced-motion users immediately receive the final state. A new motion library is not required.

Image enlargement is the default useful interaction. Retain a source drawer/selection only if it matches a verified product relationship or is clearly an external website explanation. One action produces one obvious result; pointer, keyboard and touch receive equivalent functionality. Captions and adjacent prose remain useful if images or JavaScript fail. Preserve print readability.

## 7. People and demonstration enquiry

Show William Rogers and Warren Kemp as VeriCase co-founders, Malcolm Brechin as Managing Director and Sam Whisker as Chief Technology Officer. Use current approved profiles and portraits, not obsolete prototype biographies. Each gets a 60–90 word introduction and an individual disclosure preserving complete approved background, credentials and experience. Retain the professional-affiliations disclaimer. Attribute other-company roles accurately; no blanket ban on the word “founder”.

Describe the verified work a prospect will see in a demonstration: locating a record, inspecting its source and examining how it supports the work. Keep the email address visible/selectable, with an optional prefilled subject and copy action. Clipboard failure displays and announces manual-copy guidance. Do not request confidential matter details.

Reuse consent-gated, fixed-identifier analytics. No automatic text capture or session recording of document/demo content. Verify consent acceptance, rejection, withdrawal, regrant, persistence, cross-tab behaviour and blocked/unavailable storage. Email clicks and address-copy actions are intent signals, never received enquiries, bookings or customers. Account-side receipt and real conversion outcomes need separate evidence.

## 8. Implementation sequence and outputs

| Stage | Work | Completion evidence |
|---|---|---|
| 1. Current baseline | Record checkout/deployment, capture desktop/mobile, reproduce source-identified regressions and test sign-in. | Dated SHA, captures and confirmed versus unverified findings. Resolve a broken external sign-in from authoritative product configuration, not an invented local login. |
| 2. Product/content evidence | Assemble reference/contact sheet and capability register; map every historical concept to a disposition; check sensitive content. | Reviewable references and complete claim-to-evidence mapping, with unresolved claims omitted/narrowed. |
| 3. Copy/composition | Write final copy and desktop/mobile layouts together using selected captures; compare hero arrangements and remove repetition. | Copy deck, compositions and side-by-side product fidelity review. |
| 4. Implementation | Repair contrast/layout/aliases; implement capability depth, profiles, verified interaction and email fallback; align contracts/copy checks. | Working revision preserving route, consent, source-data and component contracts, without unrelated refactoring. |
| 5. Verification | Run relevant checks/build, complete browser/accessibility/truthfulness review and independent review; resolve findings. | Evidence against each acceptance item, with untested items identified. |
| 6. Release verification | When implementing/publishing the revision, match approved source to deployed HTML, assets and rendered page. | Git SHA, deployment identifier, final captures, route/CTA checks and analytics receipt status. A build or push alone is insufficient. |

Likely implementation surfaces are LandingPage, section components and clarity.css, retained mock components, DemoCTA, content files, navigation, active styles, metadata and existing copy/test scripts under `frontend/`. Confirm actual file locations before editing. Keep React, service boundaries and local brand/font assets. Reuse primitives and inspect consumers before removing tokens or components.

Use pnpm through Corepack under the owner's standing instructions, accounting for the existing Yarn package-manager declaration without an incidental dependency migration. Run the existing `lint:copy`, `test:copy`, relevant component/navigation/consent tests and `build` scripts for implementation. Historical counts and design-generation success messages are not new acceptance evidence.

Preserve concurrent working-tree changes. Implementation is isolated in the managed worktree; the acceptance report distinguishes local implementation, review artefacts and release evidence. Design-service credits, a new diagram or a particular generation tool are not prerequisites for completing the next revision.

## 9. Acceptance criteria

### Product truth and content

- Every product visual has a source reference, documented edits and completed side-by-side fidelity review.
- Copy, captions and records agree; fictional examples are labelled and contain no live matter identifiers.
- No invented screens, controls, states, metrics, endorsements, certifications or workflow connections.
- Every historical capability concept has a recorded disposition. Retained capabilities have substantive visible explanations, not only an overview or closed accordions.
- Opening, capabilities, FAQ and demonstration promise agree about software assistance and professional responsibility.
- Full approved team information remains accessible, with correct roles and no implied firm endorsement.

### Design, navigation and accessibility

- Inspect the entire page at 320, 390, 480, 600, 768, 1024 and 1440 px, plus 200% zoom and reflow.
- No overflow, clipped controls, illegible images or uncontrolled prose width. Verify contrast on dark/light grounds, nested panels and focus states.
- Meet WCAG 2.2 AA through automated and manual keyboard/assistive-technology review. The project requires 44 × 44 px primary and standalone actions, deliberately stronger than the [AA 24 × 24 CSS pixel minimum with exceptions](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- Test menu, disclosures, source inspection and enlargement: Escape, appropriate focus containment/return and announced states.
- Navigation and legacy aliases work from home, /cookies and 404 routes. Focus clears the sticky header and cookie notice; use one scroll-offset mechanism.
- Essential content is immediately readable. Image/JavaScript failure, reduced motion and print retain a useful account.

### Commercial clarity

- A brief scan identifies audience, principal tasks and demonstration action without interaction.
- Conduct a directional test with five representative buyers, aiming for at least four identifying audience, tasks and next action. Record recruitment/results or mark the activity outstanding. It is not an already-completed test or a statistical market claim.
- Readers distinguish actual application appearance, fictional samples, external annotations and professional judgement.
- Email/manual-copy routes work without a form or analytics consent. Report only conversion evidence actually observed.

### Technical and release evidence

- Relevant tests, source/built copy checks and production build pass. Inspect compiled styles and loaded fonts, including legible dates/identifiers.
- Preserve canonicals, prerendered content, metadata, sitemap, sharing image, redirects, external sign-in and genuine unknown-route 404s.
- Reserve image dimensions, use suitable responsive assets and lazy-load lower imagery. Preload only useful first-paint fonts; check the waterfall.
- Measure representative interaction/scroll performance before and after. Retain the project field targets at the 75th percentile: LCP ≤2.5 seconds, INP ≤200 milliseconds and CLS ≤0.1. Report lab observations separately, mark unavailable field data explicitly and do not infer field improvement from CSS.
- Verify consent in the browser. Distinguish installed analytics, browser dispatch and account ingestion.
- Inspect final deployed HTML/assets/rendering against the accepted source. Record deployment evidence and outstanding customer validation/operational facts.

The implementation deliverables are the revised website, reference/contact sheet, capability register, final copy/compositions, aligned contracts and dated acceptance record. This updated plan and its source review record are the deliverables of the current planning task.

## Authorised commercial copy revision, 03 October 2026

Following implementation, the owner accepted the UI and branding and requested stronger wording that sells VeriCase as a disruptor. The [copy effectiveness review](../../reviews/optimisation/copy-effectiveness-review-2026-10-03.md) and its proposed direction were independently challenged, then the owner instructed the site to be changed.

The current implementation restores "Transform complex evidence into compelling legal arguments", identifies AI and construction claims, introduces practitioner proof earlier, gives each section a distinct commercial purpose and consolidates repeated professional-review instructions. The revised copy deck and current contract govern; earlier wording in planning records is historical. No generated product screen, new functionality or unsupported performance claim is added.

Verification and release state for this follow-up are recorded in [copy revision acceptance](../../reviews/optimisation/copy-revision-acceptance-2026-10-03.md).

## Phone correction, 03 October 2026

The owner rejected the phone formatting after the copy revision. This correction supersedes native-width nested image scrolling and acceptance based only on overflow. Use the implemented phone type scale, focal detail crops, optional capability disclosures and compact profiles described in the current contract. Preserve the original screenshots and approved wording. Verification and delivery: `reviews/optimisation/phone-repair-2026-10-03.md`.
