# VeriCase website: stronger presentation grounded in the real application

03 October 2026.

Status: revised plan saved at the owner's request. Implementation and release acceptance remain outstanding. This document replaces the redesign proposal in the current conversation; the 01 October 2026 optimisation plan remains a historical implementation record.

## 1. Objective and governing design rule

Create a distinctive, persuasive website for construction claims consultants and contractors' commercial teams, with solicitors, counsel and experts clearly represented as collaborators.

Retain the forest green and brass identity, improve the copy and reading experience, and take inspiration from https://vericase-site.vercel.app/ for scale, typography, pacing and construction scenarios.

**The screenshots we took are the visual source of truth for every product illustration.** The reference website informs presentation only. It does not establish VeriCase's screens, controls, workflows or capabilities.

Every product visual must satisfy three requirements:

- **Recognisable:** the layout, terminology, controls and relationships remain faithful to an identified application screenshot.
- **Accurate:** the surrounding copy describes only the capability that the screenshot and supporting verification establish.
- **Safe to publish:** client information is replaced with consistent fictional content, with the illustration clearly labelled.

A screenshot establishes appearance at the time it was captured. It does not, by itself, prove that a control works, that an automated process exists or that a feature is currently available to customers.

## 2. Screenshot selection and product presentation

Before designing the revised page, assemble a contact sheet of the existing application screenshots and map each selected image to the task it explains.

The previous review located application references for the files library, file search, document reader and exported report preview. These are candidates, not an assumption that they are the complete original screenshot set or the latest application state. Distinguish actual application captures from marketing concepts and previous design proposals. Use `docs/design/application-reference-status-2026-10-01.md` to locate the recovered references, then verify them before use.

For each selected screenshot, record:

| Required information | Purpose |
|---|---|
| Original image and capture date, where known | Establish the reference being followed. |
| Application screen and customer task | Explain why the image belongs on the website. |
| Relevant capability and verification status | Prevent appearance from being treated as proof of behaviour. |
| Crop, redactions and fictional replacements | Make editorial changes reviewable. |
| Proposed caption and adjacent copy | Check the visual and promise together. |

**Permitted changes:** crop to the relevant area, enlarge it, remove irrelevant surrounding browser chrome, replace sensitive content, and add clearly external captions or callouts.

**Not permitted:** invent controls, combine separate screens into an apparently real screen, add unsupported approval states, fabricate activity or processing statistics, or recolour the application so substantially that it appears to be a different product. The website's green and brass treatment belongs around the product image; the product itself retains its recognisable appearance.

Prefer sanitised screenshots. Use an HTML recreation only where necessary for legibility or an approved interaction, with a side-by-side fidelity check against the source image.

Use three substantial product views, selected from the verified references:

1. **Find the record:** a file list or search result showing the relationship between a document, its context and a relevant excerpt.
2. **Inspect the source:** the real document-reader arrangement, with the selected record and readable source content.
3. **Use the evidence:** a verified report, chronology or drafting view showing how the source supports the work. An exported report must be labelled as an export, not presented as an application screen.

If no adequate screenshot supports a proposed visual, omit that visual or obtain a new sanitised capture. Do not fill the gap with an invented interface.

On mobile, show a readable crop and offer an accessible enlarged view of the complete image. Preserve enough context to make the crop intelligible. Do not compress a desktop dashboard into miniature text.

## 3. Positioning, copy and page structure

Use a direct opening:

> **Build your construction case from the evidence.**
>
> Bring together project correspondence and documents, examine the chronology, and prepare claims and responses with the supporting records alongside your work.
>
> For construction claims and commercial teams, working with solicitors, counsel and experts.

Primary action: **Request a demonstration**. Secondary action: **See how VeriCase works**.

The opening pairs this copy with one readable, screenshot-based product view. It should establish both the proposition and the reality of the software immediately.

Follow this page structure:

| Section | Content and visual treatment |
|---|---|
| Opening | Clear proposition, audience, demonstration action and a faithful application view. |
| Recognisable problem | A short construction scenario describing dispersed records, departed project staff and the need to prepare a position. |
| Three practical jobs | **Organise the record. Investigate the issue. Prepare the claim or response.** Link each to its explanation. |
| Product walkthrough | Three screenshot-led sections showing how the records are found, inspected and used. |
| Supporting capabilities | Concise explanations of verified ingestion, chronology, research, rebuttal, drafting, collaboration and export behaviour. |
| Evidence and access | Factual information about source handling, review and permissions, plus a route for data due diligence. |
| People | Four concise profiles, with full biographies and credentials in accessible disclosures. |
| Questions | Uploads, AI drafting, existing systems, access, data arrangements and demonstrations. |
| Demonstration | A concrete explanation of what the prospect will see, with email and copy-address actions. |

Use scenario-led copy inspired by the reference:

> **The project ran for years. The response cannot wait.**
>
> The people have moved on. Correspondence sits across inboxes, shared drives and document folders. Your team needs to establish what happened, find the supporting records and prepare its position.

Keep the product walkthrough grounded in one fictional construction issue wherever the screenshots allow it. Use the existing EV-0131, EV-0138 and EV-0147 records consistently. Where screens cannot accurately represent the same sequence, describe them as separate examples rather than implying an unverified end-to-end workflow.

Useful section headings include:

- **Find the records that matter.**
- **Read the source in context.**
- **Develop the argument with its sources in view.**
- **Keep the discussion beside the document.**

Retain substantive explanations but remove repeated problem statements, unsupported guarantees and unnecessary implementation language. Resolve the drafting contradiction with:

> **Can VeriCase help draft a claim or response?**
>
> Yes. It can propose wording and supporting evidence for your team to review. Check the sources, revise the argument and approve the final document before it is issued. Your team remains responsible for the submission.

Do not carry across the reference's named-firm endorsements, certification claims, automatic delay analysis, programme integrations, admissibility assurances or timed outcome promises without independent substantiation.

## 4. Visual design and implementation

Retain the existing palette: forest `#0B2516`, deep green `#041A0F`, paper `#FCFAF5`, parchment `#F5F0E6`, brass `#BF9B58` and bronze `#5C431B`.

Use Newsreader for display headings, IBM Plex Sans for explanations and controls, and IBM Plex Mono sparingly for dates and source identifiers. Permit a restrained italic phrase in selected headings, taking inspiration from the reference's typographic contrast.

Adopt its generous scale and varied section composition. Alternate bounded prose with substantial application images. Use subtle framing and enough whitespace to distinguish the website's explanation from the application interface.

**The signature element is the real product, presented exceptionally clearly.** The opening will use the application view rather than a full-screen city photograph. Architectural photography is not required for this release.

Complete the missing capability styles: paragraphs approximately 60–68 characters wide, clear feature headings, consistent spacing and intentional desktop/mobile layouts. Use roughly 40–64 px opening type, 30–42 px section headings and 17–18 px body text.

Default product visuals to static, readable states. Allow image enlargement and clearly labelled website annotations. Reproduce source selection or another application interaction only after its behaviour is verified. Do not add simulated live feeds, moving file queues, confidence scores or automatic processing sequences.

Show all four team members with correct roles and 60–90 word summaries. Preserve full biographies and credentials behind individual disclosures. Retain the clarification that professional affiliations do not constitute firm endorsements.

Keep the existing React architecture, routes, external sign-in destination and email enquiry mechanism. No new backend, enquiry form, authentication or public API is required. Preserve old section links through focus-aware aliases.

Implementation order:

1. Establish the screenshot register, capability register and current release baseline.
2. Finalise copy and screenshot selection together, checking each promise against the adjacent image.
3. Produce desktop and mobile compositions using those actual references.
4. Implement the page, capability styles, team disclosures and enquiry refinements.
5. Complete browser, accessibility, content and release verification.

Preserve unrelated working-tree changes. Update the design contract and copy checks to reflect this plan. The owner's decisions in this conversation permit challenging the previously preserved copy and page structure while retaining the identity and factual team information. Add explicit clipboard-failure guidance, enlarge standalone footer actions to 44 × 44 px, and retain consent-gated analytics.

## 5. Acceptance and release criteria

### Product fidelity

- Every application visual has an identified source screenshot and documented changes.
- Side-by-side review confirms faithful structure, terminology, controls and visual relationships.
- No fabricated application states, metrics, integrations or workflow connections appear.
- Screenshots, fictional replacements, captions and supporting copy describe the same example accurately.
- A delivery forecast is not presented as proof of actual delivery, delay or entitlement.
- Unsupported capabilities are omitted or described more narrowly; a historical approval flag alone is not sufficient evidence.

### Design and usability

- Inspect 320, 390, 480, 600, 768, 1024 and 1440 px, plus 200% zoom.
- No horizontal page overflow, clipped controls, excessively narrow prose or illegible product images.
- Essential copy appears immediately, without waiting for animation.
- Keyboard navigation, disclosures, image enlargement, Escape dismissal and focus return work.
- Contrast, semantics, accessible names and reflow meet WCAG 2.2 AA requirements, with manual assistive-technology checks alongside automated testing.

### Commercial clarity

- In a directional test with five representative buyers, at least four can identify the intended audience, principal tasks and next action after a brief scan.
- Readers can distinguish an actual product view, an illustrative example and a professional judgement.
- The demonstration invitation explains the relevant workflow without requesting confidential matter details.
- Email clicks and address-copy actions are reported as intent signals, never as received enquiries.

### Technical delivery

- Relevant copy, component, navigation and consent tests pass, together with the production build.
- Canonicals, prerendered content, metadata, sitemap, sharing image and genuine 404 responses remain correct.
- Load only the fonts and assets needed; reserve image dimensions and load below-the-fold imagery appropriately.
- Report lab performance separately from real-user performance.
- Verify the approved source against public HTML, downloaded assets and the rendered website. Record the Git SHA, deployment identifier and final desktop/mobile screenshots.

Deliver the revised website, screenshot-reference register, capability register, updated design contract and release acceptance record. The finished site should gain its credibility and visual distinction from a clear, faithful presentation of VeriCase's actual application.
