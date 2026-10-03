# VeriCase copy effectiveness review

03 October 2026. Editorial review and proposed wording, not an implemented revision.

## Verdict

The current site explains how to handle evidence more effectively than it explains why a buyer should choose VeriCase. The central commercial opportunity is to make the move from fragmented project records to evidence-led case preparation tangible. The owner's preferred transformation headline is stronger than the implemented opening.

Recommend an authoritative, disruptive voice: commercially ambitious, specific about the work and grounded in the product. Retain the current design, branding and genuine captures. Demonstrate the change in working method through the copy; do not substitute the label "disruptor" for an explanation of its value.

## Review basis and limits

- Baseline: managed `codex/screenshot-led-website` branch at `00aafbb`, with the functional implementation from `078df978f28dee6c0b64b4191212cc9540bc544c`.
- Rendered homepage inspected at `https://veri-case-website-7l0k1xn4l-quantum-commercial-solutions.vercel.app/#top`. This is a protected preview, not confirmation of production publication.
- Coverage: navigation, opening, timing section, overview, preparation/chronology, research, rebuttal, drafting, collaboration, source review, team introduction and profiles, all six FAQ answers, enquiry copy and footer. Read the active component wiring as well as the content deck. Inactive legacy content is excluded from the verdict on the visible page.
- Additional review: the two proposed directions in the conversation, the owner's preferred wording and the earlier inspected `app.veri-case.com` reference. No fresh certification, benchmark or customer-result verification was performed.
- Evidence boundaries: `docs/design/website-capability-register.md` and `docs/design/product-reference-register.md`. These distinguish source support, historical captures and live availability. This review does not establish customer availability or end-to-end product performance.
- Method: 10x-Team product and commercial reasoning, followed by independent adversarial challenge and revision. The Adversarial Review plugin's critique/convergence method is adapted to copy; its Claude-to-Codex CLI code loop was not executed.
- This is editorial judgement, not a measured conversion improvement. No buyer interviews or controlled campaign experiment were conducted.

## Prioritised findings

| Priority | Finding and current source | Commercial consequence | Recommended correction | Acceptance check |
|---|---|---|---|---|
| High | The opening says "Build your construction case from the evidence" and lists workflow activities. `frontend/src/content/home.js:51-54`; the actual heading is duplicated in `frontend/src/components/sections/Hero.jsx:12`. | It tells an expert something they already know and does not clearly establish the transformation or AI proposition. | Restore the preferred transformation headline, identify the construction market and AI, and give a concrete evidence-to-argument mechanism. | A reader can explain what VeriCase is, who it serves and why it matters from the first screen. Both the rendered heading and content source agree. |
| High | "Spend more time assessing the case" describes an allocation of effort. `frontend/src/content/marketing.js:3-6`. | The key commercial pressure is understated; "spend more time" can even sound like additional work. | Use "The project took years. Your response cannot." and a recognisable scenario of fragmented records and a response deadline. | The section establishes urgency without inventing a deadline, speed benchmark or guaranteed time saving. |
| High | Repeated review/check instructions crowd out value. Examples: `frontend/src/content/home.js:255`, `:266`, `:289`, `:305`, `:331`, `:358`. | AI sounds like a new checking burden and the page loses momentum. A rendered DOM count found 37 occurrences of check/review word variants in 1,338 words across nine non-overlapping sales sections, including headings, labels and captions. Some instances are useful; the count is a diagnostic, not a quality score. | Lead each section with what the buyer can understand or produce. Consolidate general professional responsibility into a clear trust statement and relevant FAQ; retain necessary local limitations. | Each sales section adds a distinct reason to buy. Generic professional-review caveats are not repeated in successive sections. Scope, confidentiality and sample labels remain accurate. |
| High | Research, rebuttal and drafting are stronger than the overview's "Find / Inspect / Use" suggests. `frontend/src/content/home.js:398-407`, `:254-271`, `:328`. | The product risks being mistaken for a document viewer or ordinary file search. | Frame the three jobs as "Understand what happened", "Test the competing accounts" and "Develop the argument". Support them with the actual chronology, source-reference and drafting mechanisms. | Headings describe buyer outcomes; supporting sentences explain the existing mechanism without implying automatic responsibility decisions or exhaustive discovery. |
| Medium | Relevant practitioner experience appears late and the team introduction is generic. `frontend/src/content/home.js:490-498`; founder proof also exists in unmounted `COVER.strip` at `:57`. | A credible reason to believe the product understands construction disputes is underused. | Add a short founded-by-practitioners proof line near the opening; change the team section introduction to connect experience with the work the product supports. Preserve the approved full profiles. | Proof comes from approved founder records, is visible early and cannot be mistaken for a law firm's endorsement or customer result. |
| Medium | The demonstration paragraph promises locating and inspecting a record. `frontend/src/content/home.js:628-634`. | The reason to give up time for a sales conversation is too small for the headline promise. | Describe the evaluation as seeing how VeriCase supports evidence investigation and case preparation, using sample material. Keep "Request a demonstration" for the email action. | The invitation names relevant buyer tasks and accurately describes the next action. It implies neither an instant booking nor an end-to-end workflow that has not been demonstrated. |
| Medium | The data answer defers hosting, access, retention and AI processing to a conversation. `frontend/src/content/home.js:482-483`; `G8_data` is struck. | A serious buyer has an unresolved adoption question. Stronger adjectives cannot supply the missing facts. | Retain the factual interim answer. Prepare a verified data-handling response separately, then publish it once supported. | No security, residency, retention, training or certification assurance is introduced without evidence. The buyer can find the actual current answer when available. |

## Review of the proposed directions

| Wording | Decision | Reason |
|---|---|---|
| "Transform complex evidence into compelling legal arguments." | Keep as the recommended headline. | It states an ambitious, relevant purpose. Adjacent copy must identify construction and explain the mechanism. It does not, by itself, promise a successful legal outcome. |
| "We reconstruct truth." | Revise. | It carries conviction but suggests that software resolves disputed truth. "Reconstruct the sequence of events" describes the useful activity more precisely. |
| "Evidence graveyards / evidence goldmines." | Reserve as an optional campaign metaphor. | It communicates dormant value, but the contrast is too broad to explain the product. Repetition would make the brand sound theatrical. Do not treat all metaphor as a factual guarantee. |
| "The next chapter of your case is buried in the last six years." | Do not use as the main hero. | The fixed duration is arbitrary and the sentence makes a buyer decode a metaphor before understanding the product. It could be adapted to a specific evidenced campaign story later. |
| "VeriCase brings intelligence to the project record." | Replace. | It is generic. Name the useful actions: investigate, compare accounts, follow the chronology and develop a draft. |
| "The project took years. Your response cannot." | Use for the timing section. | It makes the pressure memorable without claiming a particular processing time or legal deadline. It is a scenario for disputes, not a claim that every project lasts years. |
| "See VeriCase in action" | Use only where the destination supplies an actual product view. | The current primary action opens an email request. Keep its accurate label; do not imply that clicking immediately plays a demo. |

## Proposed copy for the principal sales sections

This is the recommended editorial direction for review. It is not a promise that any proposed live demonstration sequence has been verified. The examples retain the existing task-level capability boundaries. No new metrics, integrations or outcome guarantees are introduced.

### Opening

**AI for construction claims and disputes**

**Transform complex evidence into compelling legal arguments.**

Find the records that matter, test competing accounts and develop your claim or response with the evidence behind it. VeriCase brings investigation, chronology and AI-assisted drafting into one workspace.

Founded by construction claims and dispute resolution practitioners.

Primary action: **Request a demonstration**

Secondary action: **Explore how it works**

Email microcopy: Opens an email to enquiries@veri-case.com. Please do not include confidential details of a live matter.

### Time and commercial pressure

**The project took years. Your response cannot.**

The claim has arrived. The deadline is fixed. The record is spread across mailboxes, attachments and years of correspondence.

Use VeriCase to follow disputed events through the record and prepare a response grounded in the documents.

### Three reasons to use VeriCase

**From the project record to the case you need to make.**

**Understand what happened.** Bring correspondence and documents together and examine the sequence of events around the disputed issue.

**Test the competing accounts.** Investigate the records that support a position and those that challenge it, with references back to the sources.

**Develop the argument.** Use AI-assisted drafting to work on the claim or response, with relevant evidence alongside the narrative.

### Preparation and chronology

**Find the sequence that gives the evidence meaning.**

An instruction, a revised delivery date and a warning of delay can sit in different mailboxes. Read together, they can change how an event is understood.

Bring project correspondence and documents into VeriCase, follow the chronology and examine the records behind it. Threading, quoted-text handling and relevance controls help you work through the material in context.

Supporting detail should retain the existing input families, text recognition and scoped duplicate handling. Keep these technical qualifications in the relevant detail, without allowing them to become the section's sales message.

### Research

**Ask the question the case turns on.**

What was instructed? When did the delivery date change? Which records support the account you have been given?

Investigate focused questions across the project material and follow the source references behind the findings. Bring supporting and contradictory evidence into the same analysis, so you can develop the argument with a clearer view of the record.

### Rebuttal

**Put the other side's argument against the evidence.**

Examine an opposing submission, investigate its factual assertions and develop proposed replies with the supporting and contradictory records alongside them.

See where the account holds, where it is challenged and what needs further investigation before you respond.

### Drafting

**Build the argument with the evidence beside it.**

Develop your claim or response around the points you need to establish. Bring the narrative, supporting records and AI-assisted drafting into the same workspace, from the structure of the argument to the detail of each section.

One clear responsibility statement elsewhere on the page remains necessary; this section need not repeat several versions of it.

### Collaboration

**Keep the discussion with the evidence.**

An important document can generate a long email chain of its own. Discuss the record with colleagues in the workspace, keeping the conversation connected to the material under examination.

### Sources and professional judgement

**Know what the argument rests on.**

Follow source references back to the underlying documents. Examine the wording, dates and context behind a finding as you develop your position.

**Your judgement. Supported by the record.** AI-assisted findings and drafts require professional review. Your team assesses the evidence, develops the argument and approves the final work.

Retain the tribunal-admissibility explanation in the relevant FAQ. Keep sample-capture labels beside the captures and confidentiality guidance beside the enquiry. These serve distinct purposes and should not be consolidated away.

### Team introduction

**Founded by people who prepare and argue construction claims.**

VeriCase brings together construction claims, dispute resolution and software expertise. Its founders' experience of preparing evidence, developing claims and working with experts and counsel informs the product.

Retain all four approved profiles, credentials and affiliation disclosures. This proposed introduction relies on the owner-approved biographies; the review has not independently reverified them.

### Demonstration

**See how the evidence becomes the argument.**

Explore evidence investigation and case preparation using sample material. Tell us whether your priority is understanding the record, testing an opposing position or developing a claim or response.

**Request a demonstration**

Opens an email to enquiries@veri-case.com. Please do not include confidential details of a live matter.

The existing confidentiality and data-arrangements condition remains applicable before any client material is used. A mailto click remains an enquiry-intent signal, not a confirmed booking.

### FAQ improvements

Lead the FAQ with the product-fit question, keeping the existing truthful answers about inputs, drafting, collaboration and professional responsibility.

**We already have a document system. Where does VeriCase fit?**

VeriCase focuses on developing the case from the project record: investigating disputed events, examining the chronology, testing opposing accounts and preparing claims and responses. It works alongside your existing document and disclosure systems.

This describes complementary use, not an automatic integration or synchronisation promise.

**How will you handle our project and client material?**

Demonstrations use sample material. Before introducing your own records, discuss your organisation's requirements for hosting, access, retention and AI processing with us.

This remains an interim process explanation. Replace it with approved specifics when available; do not imply that the factual gap has been resolved through wording alone.

### Footer descriptor

AI-assisted evidence investigation and case preparation for construction claims and disputes.

## Revision and validation checklist

- Apply the chosen voice consistently across the page, including FAQ wording and metadata, while preserving approved biography facts, legal/company information and functional labels.
- Retain substantive capability explanations. Reduce repeated instruction and caveats, not the useful explanation of what the product does.
- Reconcile the canonical copy deck, current design contract, content module and hard-coded headings. The latest owner preference supersedes the previous stylistic choice of a cautious opening. Do not treat all existing copy-lint rules as a substitute for editorial judgement; retain safeguards against unsupported factual claims.
- Keep the three genuine captures, original pixels, appropriate crops, sample labels and capture dates. The report export remains a formatting specimen, not proof of a completed claim or drafting workflow.
- Validate the revised page at desktop and mobile sizes: headline wrapping, reading order, section rhythm, screenshot-caption relationship and CTA expectations.
- Run the existing source/built copy checks and relevant build checks when copy is implemented. No application test run is required merely to save this review.
- Conduct a proposed five-person buyer comprehension check across the target roles. Ask what the product does, who it serves, what differentiates it and what the CTA does. Treat at least four clear, substantially correct responses out of five as an internal acceptance target, not market validation.
- After publication, measure consent-permitted enquiry intent and separately record qualified demonstration conversations. Do not report more clicks as increased sales or causally attribute changes without a suitable comparison.

## Decision status

Current copy: revision recommended for commercial effectiveness.

Proposed copy: APPROVED by the independent adversarial reviewer as an editorial direction against the supplied evidence. The independent commercial reviewer found the direction materially stronger, recommended removing a repeated capability inventory from the time section and strengthening the final demonstration heading; those refinements are included. The review record is in `.adversarial-review/copy-effectiveness-2026-10-03/`.

This is not customer testing, legal sign-off, live product verification or publication approval. Conversion effectiveness remains to be tested.

Application source, the existing implementation plan and deployment remain unchanged by this review.
