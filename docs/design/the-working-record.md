# VeriCase PR 2: final website design, "The Working Record"

> **Status.** This is the design specification for PR 2 as the design panel delivered it on
> 25 September 2026, kept for reference. Real matter and party names that appeared in the working
> notes have been removed. Since the build, `frontend/src/content/` is canonical for all copy, and
> the owner decisions recorded in the pull request prevail where they differ from this document.


Prepared for VeriCase Ltd on 25 September 2026. This is the design for build. The copy is subject to the owner gates in section 8.

---

## 1. Big idea and rationale

### The big idea: the page is a working record, and the visitor works it

Construction solicitors, counsel and experts are trained to distrust assertion and to ask for the document. So the site does not assert. It hands them one fictional matter under the JCT Design and Build Contract 2016 and lets them work the record themselves:

1. They drag the Chronology Lens™ across scattered correspondence and watch it come into date order.
2. They ask the record a question and read a VeriCase Analysis Report. Each finding in it carries a numbered citation that opens the source email.
3. They bundle the cited items.
4. They draft the claim with the evidence already cited.
5. In an ink "case room", against a 28-day adjudication clock, they answer the other side's Response point by point.
6. They change one character in an exhibit and see its hash stop matching the manifest.

Every claim about the product, the law or the industry on the page falls into one of three kinds:

- it is demonstrated in a figure;
- it is cited to a statute or clause; or
- it is footnoted to a source.

That discipline is the brand. "Records, records, records" opens the page as kinetic type, and the page then holds its own claims to that standard. The brand line "Make time your ally, not your enemy." is set against the real clocks of UK construction disputes.

### Why this synthesis

| | Legal buyer | Conversion | Craft | Combined (of 30) |
|---|---|---|---|---|
| Instrument ("show the working") | 8.0 | 8.0 | 8.0 | **24.0 (base)** |
| Exhibit ("the bundle") | 8.5 | 5.5 | 7.5 | 21.5 |
| Lifecycle ("the life of a dispute") | 7.0 | 6.5 | 6.5 | 20.0 |

**Base: Instrument.** It gives:

- a hero hierarchy that is clear in five seconds;
- the spine of product operations (folded to six chapters);
- the in-browser SHA-256 check;
- editable Query Plan chips;
- the rule on Rebuttal citations, with its audit line;
- the logo's swoosh redrawn as a verification tick;
- the engineering pattern: lazy stations, skeletons of identical size, aria-live narration.

**Grafted from Exhibit:**

- the footnote apparatus: markers that resolve to a Notes panel with back-links (sharing one superscript style with the product's citations);
- the "What we do not claim" declaration;
- the United Infrastructure declaration of interest, placed before the account;
- the benchmark framing ("so that you can judge them for yourself");
- Schedule 1 of time limits, with its exact statutory paraphrases;
- separate numbering for site figures ("Fig. n") and in-product evidence ("EV-0138");
- the Scott Schedule layout for Rebuttal Mode;
- the content-file architecture and the CI copy checks;
- the 404 line "This record is not in the bundle."

**Grafted from Lifecycle:**

- the turn from parchment to ink, from project time to case time;
- the 28-cell adjudication day grid;
- the awareness ruler, recut as a clause 2.24 notice ruler;
- "The decision is the adjudicator's";
- the paired "Where the record fails / Where VeriCase comes in" blocks;
- the "As received / As authored" toggle;
- the "Short on time?" fast path;
- the practitioner strip beneath the hero.

### How the owner's steers of 25 September 2026 are applied

| Steer | Applied as |
|---|---|
| 1. Creativity | Seven signature moments, each product-true, keyboard-operable, with a reduced-motion equivalent: <br>(a) kinetic "Records, records, records." masthead, where three paper slips square up under a passing lens (CSS only, 1.16 s); <br>(b) a draggable Chronology Lens that clips scattered correspondence into a dated, cited chronology; <br>(c) Query Plan chips that assemble in parse order and can be edited; <br>(d) superscript citations that open the fictional source email in a side sheet; <br>(e) exhibit-stamp micro-interactions (EV stamps, "Bundle created", "Accepted"); <br>(f) the ink case room, with a muted rain-on-glass loop and a 28-day clock; <br>(g) a hash check the reader breaks with one keystroke. <br>Confident type (an 88 px masthead and 128 px italic chapter numerals) and a hard cut from parchment to ink. No blobs, icon grids, handshakes, brains, padlocks or shields. |
| 2. JCT D&B 2016 | A single fictional matter: Example Contractor Ltd and Example Employer Ltd. A Change is instructed by the Employer's Agent (a Relevant Event under clause 2.26). The Contractor gives notice under clause 2.24. The crux is the Employer's contention that a *fictional amended* clause 2.24 makes notice a condition precedent to a later Completion Date under clause 2.25, so the date on which it became reasonably apparent that progress was being or was likely to be delayed is decisive. The page never says which date is right. There are no ground conditions, no NEC vocabulary in the matter and no programme visuals. |
| 3. Live product and Research | Chapter III, "Ask, cite, bundle", is the centrepiece. It shows the Query Plan, an Analysis Report with superscript citations, counts, a validation badge, Download PDF, and Create bundle with all nine live fields. Mock UIs use parchment, VeriCase-blue card headers, navy text and beige chips, so the site reads as the same family as the app. The copy follows the live feature list, including File Manager with Show Noise and Create Bundle in the Chronology Lens. There is no Microsoft 365 mention. |
| 4. Approved statistics | 2,264 referrals, 33.4% and 72% appear once each in Chapter I, scoped exactly and footnoted. 28 days, and six and twelve years, appear in Schedule 1. There are no {{STAT}} tokens. |
| 5. Conversion | "Book a demonstration" appears everywhere, as mailto:enquiries@veri-case.com with a prefilled subject and body. "Sign in" goes to https://app.veri-case.com/ui/login.html. The footer carries the exact legal line, no VAT number and no social icons. No form on the page submits anything. |
| 6. Length | A cover, six chapters, then compact end matter (In brief, Who is behind it, Book a demonstration, Notes). The first viewport carries "Short on time? The platform in brief". The header CTA stays in view at every width, and in-page CTAs follow the cover, Chapter III, Chapter V, In brief and the close. |

### Resolution of every must-fix item

| Must-fix (all three judges, grouped) | Resolution |
|---|---|
| Recast every fictional matter to JCT D&B 2016; no "Engineer", "compensation event", "SI-017", NEC "Client" or "Project Manager"; rename "Contractor PM" | One matter, recast. The parties and people are Employer, Contractor, Employer's Agent, Design Manager, Site Manager, Commercial Manager, Façade Sub-Contractor and Supplier. "Project Manager" survives only as a VeriCase product role name. NEC and FIDIC appear only as rows in Schedule 1 of time limits and in notes 3 and 4. |
| Unforeseen ground conditions are a Contractor risk; piling obstruction drifts to ground risk | The Relevant Event is a Change instructed by the Employer's Agent: stainless steel cladding brackets (type B) in place of aluminium (type A). |
| Condition precedent must be a fictional amendment; no fixed day count for clause 2.24; cite no sub-clauses other than 2.24, 2.25 and 2.26; JCT build note | The amendment is stated as fictional in the matter card, the ruler caption and note 1. The notice test is "forthwith". Only 2.24, 2.25, 2.26 and "section 4" are cited. The build note below is binding. |
| Keep the crux evidential; no Gantt, critical path or EOT calculation; remove "delay analysis" from the founder bio | The notice ruler shows dates and gaps in days, captioned "Dates only; this is not an analysis of delay." The founder bio omits delay analysis. Head 1 is named "A later Completion Date (clauses 2.24 to 2.26)". |
| Pleading vocabulary: "Denied" for a positive case; Response and Reply roles | The Contractor is the Referring Party. The Employer serves the Response and the Contractor serves the Reply. Every proposed reply that advances a positive case begins "Denied." |
| Approved statistics with exact scope; 2025-26 with a hyphen | See Chapter I and notes 6 to 8. The 72% is labelled delivery confidence, central government, not delay. |
| Owner metrics only where supported; define "document"; never beside OCR | The figures sit in "In brief", away from any OCR copy, framed as benchmark results, with notes 9 and 10 carrying {{BENCHMARK_NOTE}} and the definition of "document". |
| Hash scope; "SHA-256" only once confirmed; hashing detects alteration, it does not prove authenticity | The manifest copy carries [confirm] on hash scope and algorithm. The hash-check note says the demonstration uses SHA-256, and its caption states that a match shows a file unchanged since hashing, not who wrote it or whether it is true. |
| Define the validation badge; report is AI-generated; interpretation stays with the user | The badge reads "Citations checked: 6 of 6 resolve to items in this matter" [confirm]. A limits line sits under every report. |
| No designed forms; mailto CTA; no-confidential-details line; Sign in URL; no token in query strings | No form submits anything. The Create bundle dialog is a local demonstration with no `<form>` action. DemoCTA uses mailto with a prefilled subject and body, plus "Copy email address". The header no longer reads AuthContext. |
| Exact footer line; no VAT; no social icons | See 3.14. |
| Six chapters with a fast path; merge Custody, Workspace, Where it fits, Audiences; FAQ a handful | Six chapters. Workspace sits in IV, Custody and Where it fits in VI, Audiences in "In brief". The FAQ has five questions. |
| Live capability list (PST, MSG, EML, PDF, DOC, DOCX, spreadsheets, images; ZIP unconfirmed); Cards and Table; date window; Smart Filter; Exclude Keywords; Create Bundle; @mentions; Mark as Not Relevant; File Manager with Show Noise; Query Plan confirmed; guard still [confirm]; no Microsoft 365 | Chapter II (Fig. 3 has a Chronology Lens tab and a File Manager tab) and "In brief". ZIP is omitted pending confirmation. The broad-question guard (Question C in Chapter III) carries [confirm]. |
| Equity phrasing | "Practitioners from law firms and claims consultancies hold equity in VeriCase Ltd. Their involvement is not an endorsement by the firms they work for." [confirm] wherever it appears. |
| United Infrastructure: declaration before the account at body size; no CAP Code citation in public copy; substantiation held; confidentiality checked; no EOT language | See 3.11 and gate G6. |
| "Records, records, records" unattributed until verified; no CPR terms of art; no completeness guarantees | The masthead is unattributed. Chapter I says "It is often said that…". "Proportionate by design" and "none is left unanswered" are not used. |
| Label every mock and plate; check fictional names; never reuse the old lens assets | "Fig. n · … illustrated with the sample matter. See note A." and "Plate n … Illustrative image (AI-generated). See note B." Gate G9 covers the name checks. `/assets/Chronology Lens.png`, `public/ChronoLensVertical.jpg` and every other old lens image are banned from the build. |
| HoverCard is inaccessible for citations and footnotes | Footnotes open a Radix Popover on click or Enter, which persists and can be dismissed. Product citations open a Sheet. Hover never carries unique content, and Notes is canonical. |
| Pause for autoplay; the Lens starts at rest or can be paused | The Lens's only autoplay is a 2.4 s glide, which has Pause. The masthead runs 1.16 s. The video has a visible pause control. |
| Contrast failures (borders at 1.39:1, muted text on vellum at 4.49:1, 11 px chip keys, blue focus ring on navy) | Control borders use rule-strong (#857A62, 3.35:1 or better). Secondary text is graphite (5.43:1 or better on every light ground). Mono text is at least 12 px. Every dark ground (ink and navy) carries `.on-ink`, which sets parchment text and headings and an azure-300 focus ring (9.78:1 on ink, 8.07:1 on navy); paper panels inside dark grounds carry `.on-paper`, which restores the light-ground colours. All pairs are recomputed in 4.1. |
| Sticky UI must not obscure focus; no stacked sticky bars | One sticky header (64 or 56 px). The case-room day grid is sticky only at 1024 px and above, inside its own column. `html` carries `scroll-padding-top` of the header height plus 16 px (80 or 72 px) and, while the consent bar is open, `scroll-padding-bottom` of its height. |
| Kinetic type must not delay LCP; no typewriter | The masthead text is opacity 1 from first paint, and only transforms and pseudo-element slips animate. There is no typewriter anywhere. |
| Video loops and flicker | A locked-off camera with ambient rain, and a 1 s crossfade loop built in post. The prompt excludes flicker. The loop lives in the case room, not behind a form. |
| Hard hats and hi-vis in prompts; negatives in the negative field; off-plot images | Removed. Negatives are listed separately. The piling rig and trial pit images are retired. |
| Prerendering | A post-build Playwright snapshot with hydrateRoot. Animations are captured at rest. The cookie bar and consent state are never in the snapshot. |
| Hash demo exactness; analytics off inside panels | Digests are generated at build from one canonical NFC, UTF-8, LF constant (sampleEvidence.json), with a unit test. Panels carry `ph-no-capture`, which excludes them from PostHog autocapture, and session recording is disabled in the PostHog initialisation. |
| One font strategy; no Space Grotesk, Manrope or Playfair imports; no font-black | Self-hosted @fontsource files. theme.fontWeight is restricted to 400, 500 and 600. font-synthesis is none. |

### Build notes that gate publication (binding)

- **JCT review.** An owner with JCT expertise must check every contractual statement before launch:
  - the sample matter card and the notice ruler;
  - Schedule 1, row 2;
  - note 1;
  - EV-0131, EV-0151 and EV-0153;
  - the Heads of Claim tree and paragraphs 1.2.1 to 1.2.3;
  - the Research findings for Questions A to C;
  - the Response and Reply rows;
  - the role label "Façade Sub-Contractor".

  Nothing cites a JCT sub-clause other than 2.24, 2.25 and 2.26.
- **Legal summaries.** A practitioner must approve the Schedule 1 and notes 2 to 5 wording, particularly the NEC4 and FIDIC exceptions.
- **Statistics.** Every figure stays subject to a final source check against the primary document. The fact-check register governs `src/content/stats.js`.
- **[confirm] and {{token}} items** must be resolved before publication. The CI copy check (section 8) fails a production build while any remain.

---

## 2. Information architecture

### Home page, in order

| # | id | Component (frontend/src/components/sections/) | Ground | Purpose |
|---|---|---|---|---|
| 0 | `top` | `Hero.jsx` (rewritten) | parchment | Kinetic masthead; what, for whom and why; draggable Lens (Fig. 1); CTA; fast path; practitioner strip |
| I | `clock` | `TheClock.jsx` | Plate 1 band, then parchment, then a parchment-300 schedule | The sample matter, the clause 2.24 crux (Fig. 2), Schedule 1, approved statistics |
| II | `chronology-lens` | `ChronologyLens.jsx` | parchment | Ingestion, threading, quoted text, noise, the Lens workbench and File Manager (Fig. 3) |
| III | `research` | `Research.jsx` | paper desk band | **Centrepiece**: Query Plan, Analysis Report, citations, bundle (Fig. 4); CTA band |
| IV | `claims` | `ClaimsBuilder.jsx` | parchment | Heads of Claim, cited narrative, evidence finder (Fig. 5); discussion anchored to a document (Fig. 6) |
| V | `case-room` | `CaseRoom.jsx` | **ink** | 28-day clock (Fig. 7); Rebuttal Mode schedule (Fig. 8); "The decision is the adjudicator's."; CTA |
| VI | `integrity` | `RecordIntegrity.jsx` | parchment with an ink panel | Hash check (Fig. 9), manifest (Fig. 10), controls, declaration, positioning (Fig. 11) |
| End | `platform` | `InBrief.jsx` | parchment-300 | Fast-path target: six-line ledger, benchmarks, audiences, five questions, CTA |
| End | `about` | `Founder.jsx` | paper | Founder, equity, declaration of interest, United Infrastructure |
| End | `demonstration` | `Demonstration.jsx` | parchment with a navy inset panel | Closing CTA |
| End | `notes` | `Notes.jsx` | parchment-300 | Numbered and lettered notes with back-links |
| | | `SiteFooter.jsx` (rewritten) | ink | Contents, company, cookies, legal line |
| | | `frontend/src/components/CookieConsent.jsx` (PR 1, restyled; mounted once in `App.js`) | paper bar | Consent for PostHog |

`main#main` (tabIndex -1) wraps the ids from `top` to `notes`. Anchored sections clear the sticky header through `html { scroll-padding-top }` (section 4.2); no element carries a separate `scroll-margin-top`, so the offsets do not add together.

### Navigation (`SiteHeader.jsx`, replacing `Navigation.jsx`)

- **One band.** 64 px at 1024 px and above; 56 px below. It is sticky. The background is parchment at 96% opacity with a backdrop blur, and a 1 px rule appears after 8 px of scroll. The two-band 140 px header and the "Records, Records, VeriCase" band are removed.
- **At 1280 px and above:**
  - Skip to content;
  - logo (positive SVG, 28 px tall);
  - links: Chronology Lens (`#chronology-lens`), Ask, cite, bundle (`#research`), Rebuttal (`#case-room`), Integrity (`#integrity`), About (`#about`);
  - Sign in (text link to `SIGN_IN_URL`);
  - Book a demonstration (primary button, mailto).

  Scroll-spy gives the active link a 2 px azure-500 underline and `aria-current="location"`.
- **From 640 to 1279 px:** Skip to content, logo, Sign in, Book a demonstration, and a "Contents" button with the lucide List icon and a visible label. (The five links need about 930 px beside the logo and CTA, which does not fit reliably at 1024 px.)
- **Below 640 px:** logo (22 px tall), Book a demonstration (compact padding, same words) and an icon-only Contents button (44 × 44 px, `aria-label="Contents"`, `aria-expanded`, `aria-controls`). At 390 px this measures about 338 px, so it fits. Below 360 px (which includes a 1280 px window at 400% zoom) the logo becomes the "V" mark alone, with the same alt text, so the band never overflows (WCAG 1.4.10).
- **Contents sheet** (shadcn Sheet, from the right; full width below 640 px). Focus is trapped. Escape and a labelled close button dismiss it. Choosing a link closes the sheet, scrolls, and moves focus to the target heading (each chapter heading carries `tabIndex={-1}`). Contents: Cover; Chapters I to VI; end matter (In brief, Who is behind it, Book a demonstration, Notes); Sign in; the full-width CTA; the brand line.
- There are no Pricing, Features, Blog, "Get Started", "Analysis Login" or "Open App" links. The header no longer reads `AuthContext`, so no token can enter a URL.
- On any route other than `/`, header, sheet and footer anchors are written as `/#id` (for example `/#research`), so none is dead. PR 1's hash-scroll effect in `LandingPage.jsx` is kept and extended to move focus to the target heading.

### Footer (`SiteFooter.jsx`)

- The footer carries `.on-ink`.
- **Row 1:** reversed logo SVG (transparent, replacing the opaque `VeriCase.png`), a one-line descriptor, and the brand line in italic.
- **Column "Contents":** anchors to chapters I to VI, In brief and Notes.
- **Column "Company":** Who is behind it (`#about`), Book a demonstration (mailto), enquiries@veri-case.com (plain mailto), Sign in.
- **Column "Cookies":** a "Cookie settings" button that dispatches `vc-open-cookie-settings` (the PR 1 event), and a "Cookie notice" link to `/cookies` (the PR 1 page).
- **Legal strip:** the exact trading line, the trade mark and not-advice line, the fictional-data line, and "©" with the computed year.
- There are no social icons and no VAT line. The "Privacy notice" link renders only when `SITE.legalPages.privacy` is true. The privacy page is out of scope for PR 2, so that flag ships false and no dead link ships. `SITE.legalPages.cookies` ships true because `/cookies` exists.
- Below 768 px the columns stack as shadcn Collapsible groups with 48 px triggers. The legal strip is always expanded.

### Routes (`App.js`)

| Route | Status in PR 2 |
|---|---|
| `/` | LandingPage (rewritten composition) |
| `*` | `pages/NotFound.jsx` (PR 1 page, **rewritten**), "This record is not in the bundle." Also prerendered to `build/404.html`; the host must serve it with HTTP 404. |
| `/cookies` | PR 1 cookie notice, restyled with SiteHeader and SiteFooter; wording unchanged unless the PostHog host changes (G8) |
| `/login`, `/fileserver`, `/Fileserver` | Unchanged in function (out of scope). The `ExternalRedirect` spinner is restyled with the palette tokens, so no teal remains. |
| `/privacy`, `/terms`, `/accessibility` | **Out of scope.** Not created and not linked until the flags are set. |

`CookieConsent` and `Toaster` stay mounted once, in `App.js`, as in PR 1.

### Fast paths

- Hero: "Short on time? The platform in brief", to `#platform`, which ends in the CTA.
- The header CTA at every width.
- In-page CTAs in the hero, after Chapter III, at the end of Chapter V, in In brief, and in the Demonstration close.
- The Contents sheet lists every chapter.

---

## 3. Copy deck

**Conventions**

- British English. Typographic apostrophes and quotes (’ “ ”) in the build.
- Dates as DD Month YYYY, formatted with `Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })`.
- No U+2014, and no U+2013 anywhere.
- `[n]` is a numbered footnote marker (NoteRef, brass). `[EV-nnnn]` is a product citation chip (azure) inside mocks.
- `[confirm]` and `{{TOKEN}}` block publication.
- "Fig." numbers belong to site illustrations. "EV-" numbers belong to fictional in-product evidence. The two never collide.
- Text shown in capitals (stamps, mono labels) is written in sentence case in the content files and set in capitals with CSS `text-transform`, so screen readers do not spell it out and the date check can read it.
- Counts inside demonstrations are computed from the plan and written from templates (`{n}`), with singular forms ("1 finding falls outside the plan").

### 3.1 Meta (full detail in section 7)

- Title: `VeriCase | Evidence and chronology for construction disputes` (60 characters)
- Description: `The pre-litigation evidence workspace for UK construction disputes: project email turned into a cited chronology, cited answers and numbered bundles.` (149 characters)

### 3.2 Header and Contents sheet

- Skip link: "Skip to content"
- Logo alt: "VeriCase home"
- Links: "Chronology Lens" · "Ask, cite, bundle" · "Rebuttal" · "Integrity" · "About"
- "Sign in" · "Book a demonstration" · "Contents"
- Sheet title: "Contents". Visually hidden description: "The chapters of this page."
- Sheet rows (roman numeral in mono, title in serif):
  - "Cover · Records, records, records."
  - "I · The clock"
  - "II · The Chronology Lens™"
  - "III · Ask, cite, bundle"
  - "IV · Build the claim"
  - "V · The case room"
  - "VI · The record holds"
- Sheet group label: "End matter". Rows: "In brief" · "Who is behind it" · "Book a demonstration" · "Notes"
- Sheet footer: "Sign in" · [Book a demonstration] · "Make time your ally, not your enemy."
- Close button aria-label: "Close contents"

### 3.3 Cover (`#top`)

- **Masthead (kinetic):** "Records, records, records."
- **Eyebrow:** "The pre-litigation evidence workspace for construction disputes"
- **H1:** "Years of project correspondence. One cited chronology."
- **Subhead:** "VeriCase turns project email and documents into a time-ordered chronology, a cited analysis and a numbered bundle, so that solicitors, counsel, experts and contractors' commercial teams can test each point against the record."
- **Brand line:** "Make time your ally, not your enemy."
- **Primary:** [Book a demonstration]
- **Microcopy:** "Opens an email to enquiries@veri-case.com. Please do not include confidential details of a live matter."
- **Fast path:** "Short on time? The platform in brief"
- **Practitioner strip** (three ledger entries):
  - "Founded by a practitioner": "William Rogers MCIArb: construction claims, forensic quantum and adjudication."
  - "Owned in part by practitioners": "Practitioners from law firms and claims consultancies hold equity in VeriCase Ltd. [confirm]"
  - "Before disclosure, not instead of it": "VeriCase prepares the record and works alongside your disclosure platform."

**Fig. 1, the Chronology Lens stage**

- Title bar: "The Chronology Lens™ · Sample matter (fictional)" · right: "Fig. 1"
- Screen-reader summary (before the stage; two variants, shown by CSS so that only the one matching the visible cast is in the accessibility tree):
  - 640 px and above: "Illustration: nine items of fictional correspondence and records are threaded, stripped of quoted history and, where they are a near-duplicate, an automatic reply or another project's email, set aside. Six remain and take their places in date order, each with a citation to its source."
  - Below 640 px: "Illustration: seven items of fictional correspondence are threaded, stripped of quoted history and, where they are a near-duplicate or another project's email, set aside. Five remain and take their places in date order, each with a citation to its source."
- Handle: visible label "Drag the Lens", `aria-label="Drag the Lens"` (the accessible name matches the visible label; the figure caption names the Lens).
- Stage rail buttons: "Raw" · "Thread" · "Read" · "Set aside" · "Order" · "Cite"
- Stage aria-valuetext (worded to be true for both casts):
  - 0: "Stage 0 of 5: the raw record, as received."
  - 1: "Stage 1 of 5: threads rebuilt from message headers."
  - 2: "Stage 2 of 5: quoted history folded, so each entry shows what its author wrote."
  - 3: "Stage 3 of 5: items that do not belong in the review set are set aside."
  - 4: "Stage 4 of 5: the remaining entries in date order."
  - 5: "Stage 5 of 5: each entry cited to its source."
- Controls: "Play" (at rest) / "Pause" (while gliding) / "Replay" (at the end)
- Fragment processing labels (mono chips):
  - "Thread 1 · 3 messages"
  - "Threaded by References header"
  - "Quoted history folded (3)"
  - "Scanned page read by OCR"
  - "Near-duplicate: removed from review; original retained"
  - "Automatic reply: hidden as noise" [confirm, G5]
  - "Project Birch: excluded as another project"
  - "Attachment extracted: Delivery_schedule.pdf"
  - "Placed in order: 28 March 2025"
- Ordered entries (date · time · parties · excerpt · stamp):
  1. "03 March 2025 · 09:14 · Employer's Agent to Contractor · 'Please proceed with bracket type B. This is an instruction requiring a Change.' · EV-0131"
  2. "12 March 2025 · 16:42 · Façade Sub-Contractor to Contractor · 'Stainless brackets are ten weeks from order.' · EV-0138"
  3. "13 March 2025 · 07:55 · Site Manager to Commercial Manager · 'Can we get a firm date before we notify?' · EV-0139"
  4. "21 March 2025 · Site diary, page 41 (OCR) · 'Type A brackets returned to store.' · EV-0144" (640 px and above only)
  5. "26 March 2025 · 11:20 · Supplier via Façade Sub-Contractor to Contractor · 'Confirmed delivery: week commencing 19 May 2025.' · EV-0147"
  6. "28 March 2025 · 15:48 · Contractor to Employer's Agent · 'Notice under clause 2.24.' · EV-0151"
- Set-aside tray: "Set aside: 1 near-duplicate · 1 automatic reply · 1 other project". Below 640 px: "Set aside: 1 near-duplicate · 1 other project".
- Cite sentence (stage 5): "Notice was given on 28 March 2025 [EV-0151]: sixteen days after the lead-time email [EV-0138] and two days after delivery was confirmed [EV-0147]."
- Footer bar: "6 entries · 4 parties · 3 set aside · 6 of 6 linked to source". Below 640 px: "5 entries · 4 parties · 2 set aside · 5 of 5 linked to source".
- Caption: "Fig. 1 · The Chronology Lens™, illustrated with the sample matter. Names, message IDs and exhibit references are fictional. See note A."

### 3.4 Chapter I: The clock (`#clock`)

- **Plate 1 caption:** "Plate 1. A residential frame with its façade under way. Illustrative image (AI-generated). See note B."
- **Eyebrow:** "Chapter I · The clock"
- **H2:** "Every dispute comes down to what the record shows, and when."
- **Lead:** "Many construction disputes run to fixed timetables. When a notice falls due or a referral arrives, the case is only as strong as the record you can find, read and cite in the time allowed. It is often said that the three lessons of construction disputes are records, records and records. The periods below are why."
- **Where the record fails:** "The record exists, but it sits across mailboxes, custodians and years, in a form no one can read in order."
- **Where VeriCase comes in:** "VeriCase helps you put the record in order before the clock starts, and keeps each entry tied to its source."

**Sample matter card (file cover)**

- Label: "The sample matter (fictional)"
- Title: "Example Contractor Ltd and Example Employer Ltd"
- Body: "A residential building let under the JCT Design and Build Contract 2016, with the Employer's amendments. On 03 March 2025 the Employer's Agent instructed a Change: stainless steel cladding brackets (type B) in place of aluminium brackets (type A) on Levels 3 to 6. The Contractor gave notice under clause 2.24 on 28 March 2025.[1]"
- The point in issue: "In this fictional contract, clause 2.24 has been amended to make notice a condition precedent to a later Completion Date under clause 2.25. The Employer contends that notice was not given forthwith. The date on which it became reasonably apparent that progress was being or was likely to be delayed is therefore decisive."
- Foot: "Every chapter below works from this matter. See note A."

**Fig. 2, the notice ruler**

- Title: "When did delay become reasonably apparent?"
- Axis title: "March to April 2025"
- Pins (each a button that opens the source):
  - "03 March 2025 · Change instructed · EV-0131"
  - "12 March 2025 · Lead time given · EV-0138" (flag: "The Employer's date")
  - "26 March 2025 · Delivery confirmed · EV-0147" (flag: "The Contractor's date")
  - "28 March 2025 · Notice under clause 2.24 · EV-0151"
- Brackets: "16 days to notice" · "2 days to notice"
- Line: "Whether notice was given forthwith is for the adjudicator. The ruler shows only what the record says, and when."
- Caption: "Fig. 2 · Notice ruler for the sample matter. Dates only; this is not an analysis of delay. See note A."

**Schedule 1**

- Title: "Schedule 1: Time limits that do not wait for the record"
- Column heads: "Period" · "Provision" · "Summary"

| Period | Provision | Summary |
|---|---|---|
| 28 days | HGCRA 1996, s 108 | "An adjudicator must reach a decision within 28 days of referral, extendable to 42 days with the referring party's consent, or longer if both parties agree after referral.[2]" |
| Forthwith | JCT D&B 2016, cl 2.24 | "The Contractor must give written notice forthwith when it becomes reasonably apparent that the progress of the Works is being or is likely to be delayed. Whether late notice bars a later Completion Date depends on the terms of the contract, including any amendments.[1]" |
| Eight weeks | NEC4, cl 61.3 | "A compensation event notified more than eight weeks after the Contractor became aware that it had happened is barred, subject to the exceptions in the clause.[3]" Label: "Time bar" |
| 28 days | FIDIC 2017, sub-cl 20.2.1 | "Notice of a claim is required as soon as practicable, and no later than 28 days after the claiming party became aware, or should have become aware, of the event or circumstance.[4]" Label: "Time bar" |
| Six and twelve years | Limitation Act 1980, ss 5 and 8 | "Six years for an action founded on simple contract; twelve years for an action upon a specialty, which includes a contract made by deed (England and Wales).[5]" |

- Foot: "Summaries for orientation only. The statute and the contract govern; this is not legal advice. See note C."

**Context strip (static numerals; no count-up)**

- Heading: "Context, with its sources"
- "2,264": "statutory adjudication referrals to adjudicator nominating bodies between May 2023 and April 2024, the highest number recorded at the time of the report.[6]"
- "33.4%": "average sums in dispute as a share of contract budget, across more than 2,200 distressed projects in 114 countries investigated by HKA.[7]"
- "72%": "of the infrastructure and construction projects in the Government Major Projects Portfolio (49 of 68, central government only) were rated Amber or Red for delivery confidence at 31 March 2026. The rating measures confidence in delivery, not delay.[8]"
- Next link: "Next: put the record in order"

### 3.5 Chapter II: The Chronology Lens™ (`#chronology-lens`)

- **Eyebrow:** "Chapter II · The Chronology Lens™"
- **H2:** "Many threads. One order of events."
- **Lead:** "Email is stored as threads and mailboxes. A tribunal reads a case as events. The Chronology Lens™ merges the correspondence in a matter into one time-ordered view across every party, and keeps each entry tied to the message it came from."
- **Where the record fails:** "The same message can sit in four mailboxes under three subject lines, and the account of what happened can be buried under quoted replies."
- **Where VeriCase comes in:** "Every email becomes its own record. Threads are rebuilt from their headers, quoted history is folded away and near-duplicates leave the review set."
- **Items:**
  - "Load the record as it is kept": "PST, MSG and EML email, with bodies and attachments; PDF, DOC and DOCX documents; spreadsheets; and images, with OCR for scanned pages."
  - "One record per message": "Each email is parsed to its own record and threaded by its Message-ID and References headers, with heuristics for exports in which those headers are missing or damaged."
  - "Read what was written": "Quoted text is detected, so each entry shows what its author added. Earlier history is folded, not discarded."
  - "Set aside the noise": "Near-duplicates leave the review set and the originals are retained. Correspondence for other projects is excluded. File Manager lists extracted attachments by type, and Show Noise brings attachments set aside as noise, such as signature images, back into view."
  - "Narrow it to the matter": "Set the project date window, apply a Smart Filter and exclude keywords that only add bulk. Mark an item as Not Relevant and its attachments leave search with it."
  - "Cards or Table": "Read the chronology as cards or scan it as a table, export it as it stands, or create a bundle from what you have selected."
- **Plate 2 caption:** "Plate 2. The record as it is often kept. Illustrative image (AI-generated). See note B."

**Fig. 3, the workbench**

- Window tabs: "Chronology Lens™" · "File Manager"
- Chronology Lens toolbar:
  - "View" [Cards | Table]
  - chip "Date window: 01 February 2025 to 30 June 2025"
  - [Smart Filter]
  - "Exclude keywords" chips "newsletter" · "canteen" · "parking"
  - party chips "Employer's Agent" · "Contractor" · "Façade Sub-Contractor" · "Supplier"
  - [Create bundle] (popover: "Create bundle works as shown in Chapter III." with a link to `#research`)
- Ledger ("Archive_Contractor.pst (sample)"): "Messages parsed 312 · Attachments extracted 146 · Threads rebuilt 41 · Quoted passages folded 187 · Near-duplicates removed from review 58 · Other projects excluded 23 · Pages read by OCR 36"
- Card toggle on EV-0139: [As received | As authored]. As authored chip: "Quoted history folded (3)".
- Filter marker (only when a filter hides entries): "{n} entries hidden by filter". Keyword marker: "14 items excluded by keyword".
- File Manager tab: "Attachments by type: PDF 64 · Images 52 · DOC and DOCX 19 · Spreadsheets 11" (146 in all), with a switch "Show Noise". Noise rows when shown: "image001.png (signature image)" · "logo.gif (signature image)", both labelled "Noise".
- Drawer tabs: "Details" · "AI suggestions" · "Notes" · "Audit"
- Drawer, AI suggestions: "Suggested tag: Notice · Suggested head: 1.2 Notice under clause 2.24" (each labelled "Suggested")
- Not-relevant demonstration (on "Weekly canteen menu", 17 March 2025): button "Mark as Not Relevant". Result: "Not relevant: excluded from search with its attachment (menu.pdf)". Button "Undo".
- Screen-reader summary: "Illustration: the sample matter in the Chronology Lens workbench, with eight entries from four parties in date order, controls for view, date window, Smart Filter, excluded keywords and Create bundle, and a File Manager view of attachments by type with a Show Noise switch."
- Caption: "Fig. 3 · The Chronology Lens™ workbench and File Manager, illustrated with the sample matter. Counts are illustrative. See note A."
- Next link: "Next: ask the record a question"

### 3.6 Chapter III: Ask, cite, bundle (`#research`), the centrepiece

- **Eyebrow:** "Chapter III · Research"
- **H2:** "Ask a question. Read a cited answer. Bundle the sources."
- **Lead:** "Research takes a question in plain English, shows you how it has understood it, and returns a VeriCase Analysis Report in which each finding carries a numbered citation to the email or document it rests on. One step turns the cited items into a bundle."
- **Where the record fails:** "Someone asks what the record shows on a point. The answer can arrive days later as a summary without sources, and the checking starts again."
- **Where VeriCase comes in:** "The answer arrives with its sources attached. Follow any citation to the message itself, then bundle what was cited."
- **Steps:**
  - "1 · Ask": "Choose a question. Before anything runs, the Query Plan sets out the mode, period, parties, topics and sources that VeriCase has understood, as chips you can change. You correct the question, not the answer."
  - "2 · Cite": "The report gives numbered citations to the underlying emails and documents, the number of sources cited and of items analysed, and a validation badge. Select a citation to open its source."
  - "3 · Bundle": "Create bundle adds every cited item to a bundle with its title, description, case or matter, court, reference, who prepared it and for whom, its date and notes. Download PDF keeps the report as it stands."

**Fig. 4, the demonstration**

- Picker label: "Choose a question. This demonstration uses prepared questions on the sample matter."
- Questions:
  - A: "When did the Contractor first learn that bracket type B would hold up the cladding?"
  - B: "What did the Employer's Agent say about brackets between March and April 2025?"
  - C [confirm]: "What evidence do we have on the façade?"
- Command bar mode control: [Filter | Evidence]
- Query Plan chips (key above value), Question A: "Mode: Evidence" · "Period: 01 March 2025 to 04 April 2025" · "Parties: Contractor; Façade Sub-Contractor; Employer's Agent" · "Topics: bracket type B; lead time; cladding; notice" · "Sources: email and attachments; site diary (OCR)"
- Chip editor buttons: "Edit period" · "Edit parties" · "Edit topics" · "Edit sources" · "Remove"
- Period presets: "01 March 2025 to 04 April 2025" · "01 March 2025 to 20 March 2025" · "Whole matter". Editor buttons: "Apply" · "Cancel"
- Edited note: "Plan changed. Run the plan to update the report."
- Button: [Run plan]
- Guard, Question C only [confirm]: chips "Period: not set" · "Parties: not set". Notice: "This question is broad. Choose a period or a party before it runs." Quick chips: "March 2025" · "Employer's Agent". Choosing a quick chip completes the plan; Run plan then returns the findings from the eight sample records that fall within it (seven for "March 2025", three for "Employer's Agent").

**Report, Question A**

- Header: "VeriCase Analysis Report" · "Generated 16 January 2026, 10:12 · Sample matter (fictional)"
- Counts: "Sources cited: 6 · Evidence analysed: 214"
- Badge: "Citations checked" with the sub-line "6 of 6 citations resolve to items in this matter." [confirm what the badge checks]
- Summary: "The record contains two dates on which the Contractor may be said to have learned that bracket type B would affect the cladding: 12 March 2025² ³ and 26 March 2025.⁵ Notice under clause 2.24 followed on 28 March 2025.⁶"
- Findings:
  1. "On 03 March 2025 the Employer's Agent instructed bracket type B for Levels 3 to 6, describing the email as an instruction requiring a Change.¹"
  2. "On 12 March 2025 the Façade Sub-Contractor told the Contractor that stainless brackets were ten weeks from order and that cladding to Levels 3 to 6 could not start until they arrived.²"
  3. "At 07:55 the next morning the Contractor's Site Manager asked the Commercial Manager whether a firm date could be obtained 'before we notify'.³"
  4. "The site diary for 21 March 2025 records type A brackets returned to store.⁴"
  5. "On 26 March 2025 the supplier confirmed delivery for the week commencing 19 May 2025, and the Façade Sub-Contractor forwarded the confirmation to the Contractor.⁵"
  6. "On 28 March 2025 the Contractor gave notice under clause 2.24, identifying the Change as a Relevant Event.⁶"
- Hidden marker (after plan edits; computed): "{n} findings fall outside the plan and are not shown." Example: with the period set to 01 March 2025 to 20 March 2025, "3 findings fall outside the plan and are not shown."
- Summaries: `sampleMatter.js` holds a prepared summary for each question and period preset. For the 01 March 2025 to 20 March 2025 preset: "Within this period the record contains one date on which the Contractor may be said to have learned that bracket type B would affect the cladding: 12 March 2025.² ³" For any other combination the summary reads "Summary not regenerated in this demonstration. The findings below reflect the plan."
- Limits line: "This report is generated by AI from the evidence in this matter. It identifies and cites material; it does not decide what the material means. Interpretation, and responsibility for any use of it, remain yours."
- Buttons: [Download PDF] (popover: "In VeriCase this downloads the report as a PDF with its citations. This demonstration creates no files.") · [Create bundle]

**Report, Question B**

- Counts: "Sources cited: 2 · Evidence analysed: 57"
- Findings:
  1. "On 03 March 2025 the Employer's Agent instructed bracket type B and described the email as an instruction requiring a Change.¹"
  2. "On 04 April 2025 the Employer's Agent wrote that the Employer did not accept that notice had been given forthwith, and relied on clause 2.24 as amended.²"

**Report, Question C [confirm]**

- Findings are drawn from Question A's six, Question B's second, and one more: "On 05 March 2025 the Design Manager asked the Façade Sub-Contractor to price the Change and confirm the lead time.ⁿ" Citations are numbered in date order within the report.

**Source sheet (opened from any citation)**

- Title: "EV-0138 · Email"
- Rows: "From" · "To" · "Cc" · "Date" · "Subject" · "Message-ID" · "Custodian" · "Source path" · "Hash"
- Sections: "Authored text" · "Quoted history (2)" (Collapsible) · "Attachments: none"
- Buttons: "Previous citation" · "Next citation" · "Close"
- Hash row label: "Hash (SHA-256) [confirm]" with a "Show full hash" toggle.

**Create bundle dialog**

- Title: "Create bundle". Description: "Every item cited in this report will be added: 6 items." (computed)
- Fields and fictional values:
  - Title: "Bracket type B: notice under clause 2.24"
  - Description: "Items cited in the analysis of 16 January 2026 on when the Contractor learned of the bracket lead time."
  - Case or matter: "Example Contractor Ltd and Example Employer Ltd (fictional)"
  - Court: "Statutory adjudication"
  - Reference: "VC-SAMPLE-01"
  - Prepared by: "Claims Consultant, Example Contractor Ltd"
  - Prepared for: "External Counsel"
  - Bundle date: "16 January 2026"
  - Notes: "Fictional sample bundle for demonstration only."
- Note: "This demonstration creates nothing and sends nothing. What you type stays on this page and is cleared when you leave it."
- Buttons: [Create bundle] · [Cancel]

**After creation**

- Stamp (set in capitals by CSS): "Bundle created · 6 items · 16 January 2026"
- Live region: "Bundle created with 6 items."
- Cover sheet: the nine fields as a definition list.
- Index heads: "Tab" · "Item" · "Exhibit" · "Date" · "Description"
- Rows:
  - "1 · 001 · EV-0131 · 03 March 2025 · Instruction: bracket type B"
  - "1 · 002 · EV-0138 · 12 March 2025 · Lead time for type B"
  - "1 · 003 · EV-0139 · 13 March 2025 · Site Manager to Commercial Manager"
  - "1 · 004 · EV-0144 · 21 March 2025 · Site diary, page 41"
  - "1 · 005 · EV-0147 · 26 March 2025 · Delivery confirmation, with schedule"
  - "1 · 006 · EV-0151 · 28 March 2025 · Notice under clause 2.24"
- Link: "The manifest for this bundle is shown in Chapter VI."

**Close of chapter**

- Screen-reader summary: "Illustration: a plain-English question about the sample matter, the Query Plan derived from it and the resulting Analysis Report with six numbered citations. Each citation opens its fictional source. Create bundle adds the six cited items to a bundle."
- Caption: "Fig. 4 · Research, illustrated with the sample matter. The report, sources and bundle are fictional. See note A."
- CTA band:
  - Line: "See Research, the Chronology Lens™ and Rebuttal Mode on sample correspondence."
  - [Book a demonstration]
  - Microcopy: "Opens an email. Please do not include confidential details of a live matter."

### 3.7 Chapter IV: Build the claim (`#claims`)

- **Eyebrow:** "Chapter IV · Claims builder and collaboration"
- **H2:** "Draft the claim with the evidence already cited."
- **Lead:** "Structure the Heads of Claim, draft the narrative and cite by message ID as you write. The project team, solicitors, counsel and experts work on the same evidence, and discuss it where it sits."
- **Where the record fails:** "The narrative is drafted in one place, the evidence is kept in another, and the argument about the evidence happens in a reply-all thread."
- **Where VeriCase comes in:** "Each citation opens its message, and each discussion is anchored to the document it concerns."
- **Items:**
  - "Heads of Claim": "Organise the claim by head and sub-head, with evidence linked to the head it supports."
  - "Citations by message ID": "Each citation points to one message, not to a file name that may change."
  - "Evidence finder": "For the section you are drafting, VeriCase proposes material from the record. It proposes; the drafter decides what is cited."
  - "Word and PDF": "Export the narrative to Word or PDF with its citations intact."
  - "Discussion on the document": "@mention a colleague on a document and the discussion opens on that document, so the reasoning stays beside the evidence."

**Fig. 5, the claims builder**

- Tree:
  - "1 A later Completion Date (clauses 2.24 to 2.26)": "1.1 The Change instructed on 03 March 2025" · "1.2 Notice under clause 2.24" · "1.3 The Employer's position of 04 April 2025"
  - "2 Loss and expense (section 4)": "2.1 The Relevant Matter"
  - "3 Valuation of the Change"
- Editor, section 1.2:
  - "1.2.1 The Employer's Agent instructed a Change on 03 March 2025 [EV-0131]."
  - "1.2.2 On 12 March 2025 the Façade Sub-Contractor gave a lead time of ten weeks from order [EV-0138]. It did not give a delivery date."
  - "1.2.3 On 26 March 2025 the supplier confirmed delivery for the week commencing 19 May 2025, and the Façade Sub-Contractor passed the confirmation to the Contractor the same morning [EV-0147]. The Contractor gave notice under clause 2.24 two days later [EV-0151]."
- Finder: "Evidence finder: section 1.2". Each suggestion is labelled "Suggested":
  - "EV-0139 · 13 March 2025 · Site Manager to Commercial Manager · 'Can we get a firm date before we notify?'"
  - "EV-0144 · 21 March 2025 · Site diary, page 41 (OCR)"
  - "EV-0153 · 04 April 2025 · Employer's Agent to Commercial Manager"
- Finder buttons: [Insert citation] · [Dismiss]
- Export bar label: "Export: Word · PDF · citations preserved"

**Fig. 6, discussion anchored to a document (EV-0139)**

- Document header: "EV-0139 · Site Manager to Commercial Manager · 13 March 2025"
- Comments:
  - "SL · Senior Lawyer · 19 January 2026, 09:40": "@External Counsel 'Can we get a firm date before we notify?' The Employer will rely on this as awareness on 13 March 2025. We should address it directly at 1.2.2."
  - "EC · External Counsel · 19 January 2026, 11:05": "Agreed. Cite it with EV-0147 and deal with both dates in the same paragraph."
  - "CC · Claims Consultant · 19 January 2026, 11:20": "Added to Head 1.2 and to the chronology export."
- Caption: "Fig. 5 · Claims builder. Fig. 6 · Discussion anchored to a document. Both are illustrated with the sample matter, and participants are shown by role, not as people. See note A."

### 3.8 Chapter V: The case room (`#case-room`), on ink

- **Kicker:** "Project time ends. Case time begins."
- **Eyebrow:** "Chapter V · Rebuttal Mode"
- **H2:** "Their points, numbered. Your replies, cited."
- **Lead:** "Upload the other side's submission. Rebuttal Mode divides it into numbered points, ranks the evidence that bears on each by content, date window and participants, and proposes reply points that must cite the evidence they rely on. A person accepts, edits or rejects each one, and every decision is recorded."
- **Where the record fails:** "Under time pressure, a team answers first the points it can evidence quickly, and the rest risk being answered thinly."
- **Where VeriCase comes in:** "Each point sits beside the evidence ranked for it, and each proposed reply arrives with its citations."
- **Plate 3 caption:** "Plate 3. A meeting room with the bundles, on a wet evening. Illustrative image and video (AI-generated). See note B."
- **Video control:** "Pause background video" / "Play background video"

**Fig. 7, the day grid**

- Title: "28 days from referral"
- Markers:
  - "Day 0 · 20 January 2026 · Referral"
  - "Day 14 · 03 February 2026 · Response (fictional directions)"
  - "Day 21 · 10 February 2026 · Reply (fictional directions)"
  - "Day 28 · 17 February 2026 · Decision due"
- Extension row: "Days 29 to 42 · Extension to 42 days with the referring party's consent[2]"
- Note: "Or longer, if both parties agree after referral. The dates for the Response and the Reply are the fictional adjudicator's directions, not periods fixed by the Act."
- Text equivalent: "Day 0, 20 January 2026: referral. Day 14, 03 February 2026: Response, under the fictional directions. Day 21, 10 February 2026: Reply, under the fictional directions. Day 28, 17 February 2026: decision due. Days 29 to 42, to 03 March 2026: available only with the referring party's consent, or longer if both parties agree."
- Station headings: "Day 14 · 03 February 2026 · The Response arrives" · "Day 21 · 10 February 2026 · The Reply is served" · "Day 28 · 17 February 2026 · Decision due"

**Fig. 8, the Scott Schedule**

- Table caption: "Rebuttal Mode: the Employer's Response (fictional), paragraphs 4.12 and 4.13"
- Columns: "Response" · "Proposed reply" · "Evidence, ranked" · "Decision"
- Row 4.13:
  - Response: "The email of 03 March 2025 clarified the Employer's Requirements. It was not an instruction requiring a Change."
  - Reply: "Denied. The email states that it is 'an instruction requiring a Change' [EV-0131], and the Contractor acted on it as a Change on 05 March 2025 [EV-0133]."
  - Evidence: "EV-0131" with reason chips "Content: instruction, Change" · "Date window: March 2025" · "Participants: both parties to 4.13"; then "EV-0133"
  - Decision: "Accepted"
  - Audit: "Accepted by Senior Lawyer · 04 February 2026, 09:40 · proposed text retained"
- Row 4.12:
  - Response: "It was reasonably apparent by 12 March 2025 that progress was likely to be delayed. Notice on 28 March 2025 was not given forthwith and, under clause 2.24 as amended, the Contractor is not entitled to a later Completion Date."
  - Reply before edit: "Denied. Delay was not reasonably apparent until 26 March 2025."
  - Reply after edit: "Denied. The email of 12 March 2025 gave a lead time from order, not a delivery date [EV-0138]. A delivery date was first given to the Contractor on 26 March 2025 [EV-0147], and notice followed two days later [EV-0151]."
  - Decision: "Edited"
  - Audit: "Edited by External Counsel · 05 February 2026, 17:02 · before and after retained"
- Suggested point for 4.12:
  - Text: "The Site Manager did not anticipate any delay before 26 March 2025 [EV-0139]."
  - Decision: "Rejected"
  - Reason: "Rejected: EV-0139 does not support this. The email anticipates delay and asks for a firm date before notice."
  - Audit: "Rejected by Senior Lawyer · 05 February 2026, 17:10"
- Decision controls: "Accept" · "Edit" · "Reject"; in edit mode, "Save" · "Cancel"
- Guard: "A reply point must cite at least one item of evidence."
- Demonstration audit: "Changed in this demonstration · before and after retained"
- Live regions: "Point 4.12: three items suggested." · "Reply accepted and recorded."
- Export strip: "Export: each point in the Response paired with its reply and the evidence cited. 2 points · 2 replies · 5 exhibits."
- Standing line: "Drafts are proposals for a qualified person to review. Responsibility for what is served stays with its author."

**Day 28 card**

- "Day 28 · 17 February 2026 · Decision due"
- H3: "The decision is the adjudicator's."
- Body: "We will not tell you how the sample matter ends. VeriCase does not decide disputes, and admissibility and weight are for the tribunal. What VeriCase does is help you put the record of what was known, and when, in front of the adjudicator, with each point cited to its source."
- CTA line: "See Rebuttal Mode working on sample correspondence." [Book a demonstration]
- Caption: "Fig. 7 · The adjudication timetable for the sample matter. Fig. 8 · Rebuttal Mode, illustrated with the sample matter. See note A."

### 3.9 Chapter VI: The record holds (`#integrity`)

- **Eyebrow:** "Chapter VI · Integrity and access"
- **H2:** "The original stays original."
- **Lead:** "Raw email is held in immutable storage with a cryptographic hash for each message. Everything done to the evidence afterwards is recorded against it, and each person sees only what their role permits."
- **Where the record fails:** "A bundle assembled by hand at midnight is where exhibits can go missing, pages can be misnumbered and a citation can point to the wrong document."
- **Where VeriCase comes in:** "Bundles are numbered in sequence and carry a manifest listing each item."

**Fig. 9, hash check**

- Title: "Check it yourself"
- Intro: "A hash is a fingerprint of a file's exact contents. Change one character and the fingerprint changes. Try it on EV-0138."
- Field label: "EV-0138.eml (simplified)"
- Readouts: "Manifest" · "Computed now"
- Diff line label: "Changed characters"
- States: "Match" (with the verification tick) · "Does not match" (with a cross icon)
- Button: "Reset"
- Note: "This demonstration computes a SHA-256 hash in your browser. The text you type stays in your browser."
- Meaning line: "A matching hash shows that a file is unchanged since it was hashed. It does not show who wrote the file, or that what it says is true."
- Fallback: "This check needs a secure (https) connection."
- Live region (announced only when the state changes): "Hash does not match the manifest." / "Hash matches the manifest."

**Fig. 10, manifest**

- Title: "Manifest · Bundle VC-SAMPLE-01"
- Columns: "Seq" · "Exhibit" · "Date" · "Message-ID or file" · "Hash (SHA-256) [confirm]" · "Source path"
- Line: "The manifest lists each item's cryptographic hash as recorded on ingestion [confirm], so that anyone holding the original can check that it has not changed since."

**Controls**

- "Immutable originals": "Each raw message is kept unchanged with its hash, so the working record can be compared with the message as received."
- "An audit trail for every message": "Tags, notes, links and edits are logged with the user, the time and the values before and after."
- "Numbered bundles with a manifest": "Items are numbered in bundle order, and the manifest lists each item's message ID, cryptographic hash and source path."
- "Access by role": "Team Leader, Senior Lawyer, Claims Consultant, QS, Project Manager, External Counsel and Client Viewer."
- "Sensitive fields restricted": "BCC recipients and other sensitive fields are visible only to the roles permitted to see them."
- "AI and keys on the server": "AI processing and API keys are held server-side, not in the browser."

**Declaration box**

- Label: "What we do not claim"
- Text: "We do not describe VeriCase's outputs as court-ready or admissible. Admissibility and weight are matters for the tribunal. Our part is to preserve the material and show its provenance, so that those questions can be argued on the record."

**Positioning (Fig. 11)**

- H3: "Before disclosure, not instead of it."
- Text: "VeriCase is the pre-litigation workspace. It prepares the evidence, chronology, claim and rebuttal material that your solicitors take forward, and it does not replace the disclosure or review platform they already use. It is deliberately lean: evidence, chronology, claims and rebuttal, and nothing that does not serve them."
- Stages:
  1. "The project record: mailboxes, archives, site diaries, drawings and reports"
  2. "VeriCase: evidence, chronology, claims and rebuttal"
  3. "The pack: chronology, cited analysis, bundle and manifest"
  4. "Outside VeriCase: your advisers' disclosure platform, and the tribunal"
- Caption: "Fig. 9 · Hash check on fictional text. Fig. 10 · Extract from a bundle manifest for the sample matter. Fig. 11 · Where VeriCase sits. See note A."

### 3.10 In brief (`#platform`)

- **Eyebrow:** "In brief"
- **H2:** "The platform, on one page."
- **Sub:** "VeriCase is deliberately lean: evidence, chronology, claims and rebuttal. Each line links to the chapter that shows it."
- **Ledger** (each line is marked with its chapter numeral and has a link "Read Chapter n"):
  - "Ingestion": "PST, MSG, EML, PDF, DOC, DOCX, spreadsheets and images, with OCR. One record per message, threaded by header, with quoted text folded, near-duplicates set aside and attachments listed by type in File Manager." (Chapter II)
  - "The Chronology Lens™": "One time-ordered view across every party, in Cards or Table view, with a project date window, Smart Filter, Exclude Keywords and Create Bundle." (Chapter II)
  - "Research": "Plain-English questions, an editable Query Plan, and an Analysis Report with numbered citations, counts and a validation badge. Download PDF or create a bundle." (Chapter III)
  - "Claims builder": "Heads of Claim, a narrative cited by message ID, an evidence finder, and Word or PDF export." (Chapter IV)
  - "Rebuttal Mode": "Numbered points, ranked evidence, reply points with mandatory citations, accept, edit or reject with an audit trail, and an export pairing each point with its reply and cited evidence." (Chapter V)
  - "Integrity and access": "Immutable originals with hashes, a per-message audit trail, numbered bundles with manifests, role-based access and server-side AI." (Chapter VI)
- **Benchmarks:** "In benchmark testing, VeriCase processed more than 50,000 documents per hour[9] and extracted dates with 99.7% accuracy.[10] The notes describe how each figure was measured, so that you can judge them for yourself."
- **Who it is for:** "For construction solicitors and counsel, including King's Counsel; claims consultants; quantum and other experts; and contractors' commercial and in-house legal teams."
- **Questions** (Accordion; answers stay in the DOM):
  1. "Does VeriCase replace our disclosure platform?" "No. VeriCase is a pre-litigation workspace. It prepares evidence, chronology, claim and rebuttal material, which then moves to the platform your solicitors use."
  2. "Will the output be accepted by the tribunal?" "Admissibility and weight are for the tribunal. VeriCase keeps each original with its hash, message ID and source path, and records what was done to it, so that its provenance can be examined."
  3. "Does the AI write our submissions?" "No. It suggests evidence and proposes reply points, each with citations. A person accepts, edits or rejects every proposal, and the decision is recorded. Responsibility for anything served stays with its author."
  4. "Who sees what?" "Access is by role: Team Leader, Senior Lawyer, Claims Consultant, QS, Project Manager, External Counsel and Client Viewer. BCC recipients and other sensitive fields are restricted by permission."
  5. "Where is our data held, and is it used to train AI models?" "{{DATA_POLICY: hosting location, sub-processors, retention and whether customer data is used to train models; delete this question if not supplied}}"
- **CTA:** [Book a demonstration], with the standard microcopy.

### 3.11 Who is behind it (`#about`)

- **Eyebrow:** "Who is behind it"
- **H2:** "Built by people who have had to assemble the record themselves."
- **Body 1:** "VeriCase was founded by William Rogers MCIArb, a construction commercial management professional who specialises in claims, forensic quantum and adjudication under the NEC, JCT and FIDIC forms. In 2016 he founded Quantum Commercial Solutions."
- **Body 2:** "Practitioners from law firms and claims consultancies hold equity in VeriCase Ltd. Their involvement is not an endorsement by the firms they work for. [confirm]"
- **Credential block (mono):** "William Rogers MCIArb · Founder, VeriCase Ltd · Member of the Chartered Institute of Arbitrators · Founder, Quantum Commercial Solutions (2016)"
- **Declaration box:**
  - Label: "Declaration of interest"
  - Text: "United Infrastructure is an associated company of VeriCase's founder, William Rogers. We state the connection before the account, so that you can give the account the weight you think it deserves."
- **H3:** "A record of use: United Infrastructure"
- **Account:** "{{UI_CASE}}[11]"
- **Closing:** "Each adjudication turns on its own facts, its own law and its own adjudicator. This account describes one use of VeriCase. It is not a prediction or a promise of the result in any other matter."
- **Plate caption** (used only if no founder photograph is supplied; numbered in page order): "Plate 4. A site office desk. Illustrative image (AI-generated). See note B."

### 3.12 Book a demonstration (`#demonstration`)

- **Eyebrow:** "Next step"
- **H2:** "See it on a matter like yours."
- **Body:** "We will take you through the Chronology Lens™, Research, the claims builder and Rebuttal Mode on sample correspondence, and answer your questions on integrity and access. [confirm] If you would like to see VeriCase on your own material, we will first agree confidentiality terms with you."
- **Buttons:** [Book a demonstration] · [Copy email address]
- **Toast:** "Email address copied."
- **Microcopy:** "Book a demonstration opens an email to enquiries@veri-case.com with the subject line completed. Please do not include confidential details of a live matter."
- **Plain line:** "Or write to enquiries@veri-case.com."
- **Brand line:** "Make time your ally, not your enemy."
- **Plate caption** (numbered in page order: Plate 5, or Plate 4 if a founder photograph replaces Plate 4): "Plate 5. A bundle, tabbed and tied. Illustrative image (AI-generated). See note B."
- **Prefilled email:**
  - Subject: `VeriCase demonstration request`
  - Body: `Name:` / `Organisation:` / `Role:` / `What would you like to see?` / (blank line) / `Please do not include confidential details of a live matter.`

### 3.13 Notes (`#notes`)

- **Heading:** "Notes"
- **Intro:** "Each note marker on this page links here, and each note links back to where it was cited."
- **Numbered notes:**
  1. **JCT Design and Build Contract 2016, clauses 2.24 to 2.26 (summary).** "If and whenever it becomes reasonably apparent that the progress of the Works is being or is likely to be delayed, the Contractor is to give written notice forthwith of the material circumstances, including the cause or causes of the delay, and to identify in the notice any event that in its opinion is a Relevant Event. It is also to give particulars of the expected effects, including an estimate of any expected delay in the completion of the Works beyond the Completion Date, and to keep them up to date (clause 2.24). If, on receiving the notice and particulars, the Employer considers that a Relevant Event has caused or is likely to cause delay to completion beyond the Completion Date, the Employer is to fix such later Completion Date as it then estimates to be fair and reasonable (clause 2.25). Relevant Events are listed in clause 2.26 and include Changes. The amendment that makes notice a condition precedent is part of the fictional sample matter; whether a real contract has that effect depends on its terms."
  2. **Housing Grants, Construction and Regeneration Act 1996, section 108(2)(c) and (d).** "The contract must require the adjudicator to reach a decision within 28 days of referral, or such longer period as the parties agree after referral, and must allow the adjudicator to extend the period by up to 14 days with the consent of the referring party."
  3. **NEC4 Engineering and Construction Contract, clause 61.3 (summary).** "A compensation event that the Contractor notifies more than eight weeks after becoming aware that it has happened is barred, subject to the exceptions stated in the clause. Refer to the clause, and to any amendments, in the contract concerned."
  4. **FIDIC Conditions of Contract, 2017 editions, sub-clause 20.2.1 (summary).** "The claiming party gives notice as soon as practicable, and no later than 28 days after it became aware, or should have become aware, of the event or circumstance. The Particular Conditions may amend this."
  5. **Limitation Act 1980, sections 5 and 8(1) (England and Wales).** "Six years from the date on which the cause of action accrued for an action founded on simple contract (section 5); twelve years for an action upon a specialty, which includes a contract made by deed (section 8(1))."
  6. **King's College London and the Adjudication Society, Construction Adjudication in the United Kingdom (November 2024).** "2,264 statutory adjudication referrals to adjudicator nominating bodies between May 2023 and April 2024, the highest number recorded at the time of the report."
  7. **HKA, CRUX Insight Eighth Annual Report (November 2025).** "Average sums in dispute of 33.4% of contract budget across more than 2,200 distressed projects in 114 countries investigated by HKA. The figure describes those projects, not the industry as a whole."
  8. **National Infrastructure and Service Transformation Authority, Major Projects Annual Report 2025-26 (13 July 2026).** "49 of the 68 infrastructure and construction projects in the Government Major Projects Portfolio were rated Amber or Red for delivery confidence at 31 March 2026. The rating measures confidence in delivery, not delay, and covers central government projects only."
  9. **Throughput benchmark.** "{{BENCHMARK_NOTE}} (to state what counts as a document, the date of the test, the corpus size and composition, the environment, and how the hourly rate was measured)"
  10. **Date-extraction benchmark.** "{{BENCHMARK_NOTE}} (to state which dates were extracted, the sample size, how extracted dates were verified, what counted as correct, and the date of the test)"
  11. **United Infrastructure.** "{{UI_CASE}} (forum, dates and outcome in the party's own factual terms, as approved and substantiated). United Infrastructure is an associated company of VeriCase's founder."
- **Lettered notes:**
  - A. **The sample matter and illustrations.** "Example Contractor Ltd, Example Employer Ltd and every other party, date, document, message ID and exhibit reference on this page are fictional, and so is the amendment to clause 2.24. The hashes shown are the real SHA-256 values of the fictional text. Product screens are simplified illustrations built in code, not screenshots of any real matter."
  - B. **Imagery.** "Photographs and video captioned as illustrative, and the scanned diary page shown as EV-0144, are AI-generated. They do not depict a VeriCase client, project, person or matter."
  - C. **Legal summaries.** "Summaries of legislation and contract terms are for orientation only. The statute and the contract govern, contracts are often amended, and nothing on this page is legal advice."
- **Back-link:** "Back to text" (`aria-label="Back to text, note n"`; where a note is cited more than once, "Back to text, note n, citation k")

### 3.14 Footer

- **Descriptor:** "The pre-litigation evidence workspace for construction disputes: evidence, chronology, claims and rebuttal."
- **Brand line:** "Make time your ally, not your enemy."
- **Column heads:** "Contents" · "Company" · "Cookies"
- **Contents links:** "The clock" · "The Chronology Lens™" · "Ask, cite, bundle" · "Build the claim" · "The case room" · "The record holds" · "In brief" · "Notes"
- **Company links:** "Who is behind it" · "Book a demonstration" · "enquiries@veri-case.com" · "Sign in"
- **Cookies:** "Cookie settings" · "Cookie notice"
- **Legal strip (exact):**
  - "VeriCase Ltd is registered in England and Wales (company number 14789532). Registered office: {{REGISTERED_OFFICE}}."
  - "The Chronology Lens™ is a trade mark of VeriCase Ltd. VeriCase is software and does not give legal advice. Illustrations on this site use a fictional matter."
  - "© 2026 VeriCase Ltd." (year computed)

### 3.15 Cookie choices (PR 1 component, restyled)

- Region label: "Cookie choices"
- Label (mono, capitals by CSS): "Cookies"
- Bar text (default at every width): "May we use PostHog analytics cookies to understand how this site is used? They stay off unless you allow them."
- Buttons of equal size and weight: [Allow analytics] · [Reject analytics]; then a text button "Details" (becomes "Hide details", with `aria-expanded`).
- Details (expands the bar upwards in place):
  - Title: "Analytics cookies"
  - Body: "We would like to use PostHog analytics cookies to understand how this site is used, so that we can improve it. They stay off unless you allow them, and no analytics data is sent before you choose. You can change your choice at any time from Cookie settings in the footer."
  - Link: "Read the cookie notice" (`/cookies`)

### 3.16 404 page (`pages/NotFound.jsx`)

- `<title>`: "Page not found | VeriCase"; `meta robots`: noindex
- Eyebrow: "Error 404"
- H1: "This record is not in the bundle."
- Body: "The page you asked for does not exist, or has moved. The contents below will take you back to the record."
- Buttons: [Return to the home page] · [Book a demonstration]
- List heading: "Contents" (chapters I to VI, as in the sheet, linked as `/#id`)
- Plate caption: "A gap in the shelf. Illustrative image (AI-generated)."

### 3.17 Sample matter records (`src/content/sampleEvidence.json`)

Parties and addresses (all on reserved `.example` domains):

- Employer's Agent (Example Agency LLP) `ea.lead@agent.example`
- Design Manager `design.manager@contractor.example`
- Site Manager `site.manager@contractor.example`
- Commercial Manager `commercial.manager@contractor.example` (all three of Example Contractor Ltd)
- Package Manager (Example Façades Ltd, the Façade Sub-Contractor) `package.manager@facade-sub.example`
- Sales Office (Example Fixings Ltd, the Supplier) `sales@fixings.example`

| Ref | Kind, date, time | From, to | Subject | Authored text | Quoted | Attachments | Message-ID or file | Source path |
|---|---|---|---|---|---|---|---|---|
| EV-0131 | Email, 03 March 2025, 09:14 | Employer's Agent to Design Manager; cc Site Manager | Instruction: bracket type B, Levels 3 to 6 | "Following the Employer's review of the façade samples, the Employer requires stainless steel brackets (type B) in place of aluminium brackets (type A) for the cladding support on Levels 3 to 6. Please proceed with bracket type B. This is an instruction requiring a Change." | 0 | none | `<20250303091412.4f2a@agent.example>` | Archive_DesignManager.pst/Inbox/Employer's Agent |
| EV-0133 | Email, 05 March 2025, 10:02 | Design Manager to Package Manager | RE: Instruction: bracket type B, Levels 3 to 6 | "The Employer's Agent has instructed a Change to bracket type B on Levels 3 to 6. Please price it and confirm the lead time." | 1 | none | `<20250305100233.91bc@contractor.example>` | Archive_DesignManager.pst/Sent Items |
| EV-0138 | Email, 12 March 2025, 16:42 | Package Manager to Site Manager; cc Design Manager | RE: RE: Instruction: bracket type B, Levels 3 to 6 | "Stainless brackets are ten weeks from order. Cladding to Levels 3 to 6 cannot start until they arrive. We will confirm a delivery date once the supplier has the order." | 2 | none | `<20250312164207.7c1d@facade-sub.example>` | Archive_SiteManager.pst/Inbox/Façade |
| EV-0139 | Email, 13 March 2025, 07:55 | Site Manager to Commercial Manager | FW: RE: RE: Instruction: bracket type B, Levels 3 to 6 | "If ten weeks is right we lose the cladding window. Can we get a firm date before we notify?" | 3 | none | `<20250313075511.2e8a@contractor.example>` | Archive_SiteManager.pst/Sent Items |
| EV-0144 | Scanned PDF (OCR), 21 March 2025 | Site Manager (author) | Site diary, page 41 | OCR raw: "Friday 21 March. Type A brackets returned to store. Cladding to Level 3 not started. Awaiting type B." Resolved date: 21 March 2025 | n/a | n/a | File: Site_Diary_March_2025.pdf, page 41 | Site records/Site_Diary_March_2025.pdf |
| EV-0147 | Email, 26 March 2025, 11:20 | Package Manager to Site Manager (forwarding Sales Office) | FW: Order confirmation: type B brackets | "Supplier confirms delivery week commencing 19 May 2025. Schedule attached." Quoted supplier message (Sales Office to Package Manager, 26 March 2025, 10:58): "Confirmed delivery: week commencing 19 May 2025." | 1 | Delivery_schedule.pdf | `<20250326112019.b3f0@facade-sub.example>` | Archive_SiteManager.pst/Inbox/Façade |
| EV-0151 | Email, 28 March 2025, 15:48 | Commercial Manager to Employer's Agent (for the Employer) | Notice under clause 2.24: bracket type B | "We give notice under clause 2.24 that the progress of the Works is likely to be delayed. The material circumstance is the Change to bracket type B instructed on 03 March 2025, which we identify as a Relevant Event. The supplier's confirmation of delivery for the week commencing 19 May 2025 is attached. Particulars of the expected effects, with our estimate of the expected delay in completion, will follow as soon as possible." | 0 | Delivery_schedule.pdf | `<20250328154802.c7d0@contractor.example>` | Archive_CommercialManager.pst/Sent Items |
| EV-0153 | Email, 04 April 2025, 12:00 | Employer's Agent to Commercial Manager | RE: Notice under clause 2.24: bracket type B | "Your notice of 28 March 2025 is noted. The Employer does not accept that it was given forthwith. Clause 2.24, as amended, makes notice a condition precedent to any adjustment of the Completion Date. The Employer's position is reserved." | 1 | none | `<20250404120011.a9e3@agent.example>` | Archive_CommercialManager.pst/Inbox |

Non-evidence items:

- **N-1:** automatic reply, 12 March 2025, 16:43: "Automatic reply: Design Manager out of the office until 17 March 2025." (Its treatment as noise is subject to G5.)
- **N-2:** other project, 13 March 2025, 09:30: "Project Birch: drainage survey results".
- **N-3:** near-duplicate of EV-0131 (the cc copy in the Site Manager's mailbox).
- **N-4:** "Weekly canteen menu", 17 March 2025, attachment menu.pdf.

The simplified `EV-0138.eml` for the hash check is canonical: NFC, UTF-8, LF line endings, no trailing newline. The manifest row for EV-0138 (Fig. 10) and the "Manifest" readout in Fig. 9 both use the digest of this exact text.

```
From: Package Manager <package.manager@facade-sub.example>
To: Site Manager <site.manager@contractor.example>
Cc: Design Manager <design.manager@contractor.example>
Date: 12 March 2025, 16:42
Subject: RE: RE: Instruction: bracket type B, Levels 3 to 6
Message-ID: <20250312164207.7c1d@facade-sub.example>

Stainless brackets are ten weeks from order. Cladding to Levels 3 to 6 cannot start until they arrive. We will confirm a delivery date once the supplier has the order.
```

---

## 4. Visual system

### 4.1 Palette, re-based on the logo

The logo was sampled from `LOGOTOBEUSED.png`: azure #2D78B7 and navy #1A2550. Contrast ratios below were recomputed with the WCAG 2.x formula.

| Token | Hex | Use | Key contrast |
|---|---|---|---|
| `--vc-ink-950` | #0E1630 | Case room, footer, hash-check panel | parchment on it 15.72 |
| `--vc-navy` | #1A2550 | Logo navy: headings, emphasis, CTA hover, demonstration panel | 12.98 on parchment; white on it 14.74 |
| `--vc-ink` | #232C4A | Body text | 12.08 parchment; 13.15 paper; 10.85 parchment-300 |
| `--vc-graphite` | #535A6E | Secondary text, captions, metadata | 6.05 parchment; 6.59 paper; 5.43 parchment-300; 5.92 azure-50 |
| `--vc-mist` | #B9BFD0 | Secondary text on ink or navy (never over imagery) | 9.72 ink; 8.02 navy |
| `--vc-azure-500` | #2D78B7 | Logo azure: focus rings on light grounds, lens outline, large text, VeriCase-blue card headers | 4.13 parchment and 4.49 paper (UI and large text only); white on it 4.69 |
| `--vc-azure-700` | #1F5E96 | Links, product citation chips, primary button fill | 5.96 parchment; 6.49 paper; white on it 6.77 |
| `--vc-azure-300` | #9CC4EA | Links and focus on ink and navy; reversed logo | 9.78 ink; 8.07 navy; 1.75 on paper (never used on light grounds) |
| `--vc-azure-50` | #E7EFF8 | Highlights, selected rows | navy on it 12.71 |
| `--vc-parchment` | #F5F0E6 | Page | |
| `--vc-parchment-300` | #ECE4D3 | Bands and beige chips (app family) | ink on it 10.85 |
| `--vc-paper` | #FCFAF5 | Panels, mocks, documents | |
| `--vc-rule` | #D8CDB6 | Decorative hairlines only (also shadcn `--border`) | 1.39 (never informative) |
| `--vc-rule-strong` | #857A62 | Input, chip and control borders (also shadcn `--input`) | 3.73 parchment; 4.06 paper; 3.35 parchment-300 |
| `--vc-brass-400` | #BF9B58 | Accent: stamps, declaration borders, day-grid fills; text and note markers only on dark grounds | 6.84 ink; 5.65 navy; decorative on light |
| `--vc-brass-700` | #7A5A28 | Eyebrows, footnote markers, chapter numerals on light | 5.57 parchment; 6.06 paper; 5.00 parchment-300 |
| `--vc-signal` | #A8352A | The one signal colour: Rejected, Does not match, Time bar (always with a word and an icon) | 5.76 parchment; 5.18 parchment-300; white on it 6.55 |
| `--vc-signal-300` | #EE8E7E | Signal on ink | 7.49 ink |

Discipline:

- Brass stays under about 5% of any viewport.
- Signal red appears at most four times in the default page state, and never as emphasis or on a CTA.
- The three teals, the coral, the orange and every gradient are removed.
- Every informative control boundary uses `border-input` (rule-strong). `border-border` (rule) is for decorative hairlines only.
- Every ink or navy ground carries `.on-ink`; every paper panel set inside one carries `.on-paper` (section 4.2).

### 4.2 CSS variables and base styles (`frontend/src/index.css`)

```css
@tailwind base; @tailwind components; @tailwind utilities;

@layer base {
  :root {
    --vc-ink-950:#0E1630; --vc-navy:#1A2550; --vc-ink:#232C4A; --vc-graphite:#535A6E; --vc-mist:#B9BFD0;
    --vc-azure-50:#E7EFF8; --vc-azure-300:#9CC4EA; --vc-azure-500:#2D78B7; --vc-azure-700:#1F5E96;
    --vc-parchment:#F5F0E6; --vc-parchment-300:#ECE4D3; --vc-paper:#FCFAF5;
    --vc-rule:#D8CDB6; --vc-rule-strong:#857A62; --vc-brass-400:#BF9B58; --vc-brass-700:#7A5A28;
    --vc-signal:#A8352A; --vc-signal-300:#EE8E7E;
    --ease-settle:cubic-bezier(0.2,0,0,1); --ease-exit:cubic-bezier(0.4,0,1,1); --ease-glide:cubic-bezier(0.45,0,0.2,1);
    --shadow-paper:0 1px 0 rgba(26,37,80,0.06),0 12px 32px -16px rgba(26,37,80,0.22);
    --header-h:64px;
    /* shadcn (HSL triplets) */
    --background:40 43% 93%; --foreground:226 36% 21%;
    --card:43 54% 97%; --card-foreground:226 36% 21%;
    --popover:43 54% 97%; --popover-foreground:226 36% 21%;
    --primary:208 66% 35%; --primary-foreground:0 0% 100%;
    --secondary:41 40% 88%; --secondary-foreground:226 36% 21%;
    --muted:41 40% 88%; --muted-foreground:224 14% 38%;
    --accent:212 55% 94%; --accent-foreground:228 51% 21%;
    --destructive:5 60% 41%; --destructive-foreground:0 0% 100%;
    --border:41 30% 78%; --input:41 15% 45%; --ring:207 61% 45%;
    --radius:0.25rem;
  }
  @media (max-width:1023px){ :root{ --header-h:56px; } }
  /* One offset mechanism only: no element also carries scroll-margin-top. */
  html{ scroll-padding-top:calc(var(--header-h) + 16px); scroll-padding-bottom:var(--consent-h, 0px); }
  body{ background:var(--vc-parchment); color:var(--vc-ink); font-family:'IBM Plex Sans','Plex Sans Fallback',Arial,sans-serif;
        font-size:1.0625rem; line-height:1.65; font-synthesis:none; -webkit-font-smoothing:antialiased;
        padding-bottom:var(--consent-h, 0px); }
  body::before{ content:""; position:fixed; inset:0; z-index:-1; pointer-events:none;
        background:url('/media/texture-paper.webp') repeat; background-size:512px; opacity:.04; mix-blend-mode:multiply; }
  h1,h2,h3,.font-display{ font-family:'Newsreader Variable','Newsreader Fallback',Georgia,serif; font-optical-sizing:auto; color:var(--vc-navy); }
  .mono,code,kbd{ font-family:'IBM Plex Mono',ui-monospace,monospace; font-variant-numeric:tabular-nums slashed-zero; }
  :focus-visible{ outline:3px solid var(--vc-azure-500); outline-offset:2px; }
  /* Dark grounds: case room, footer, hash-check panel, demonstration panel */
  .on-ink{ color:var(--vc-parchment); --ring:209 65% 76%; }
  .on-ink :is(h1,h2,h3){ color:var(--vc-parchment); }
  .on-ink :focus-visible{ outline-color:var(--vc-azure-300); }
  /* Paper panels inside a dark ground (Rebuttal table, Day 28 card) */
  .on-ink .on-paper{ color:var(--vc-ink); --ring:207 61% 45%; }
  .on-ink .on-paper :is(h1,h2,h3){ color:var(--vc-navy); }
  .on-ink .on-paper :focus-visible{ outline-color:var(--vc-azure-500); }
  ::selection{ background:var(--vc-azure-50); color:var(--vc-navy); }
}

/* Bespoke keyframes live here, not in tailwind.config.js: Tailwind emits a keyframe
   only when an animate-* utility that uses it appears in the content, and these are
   referenced from plain CSS. */
@layer components {
  .masthead{ position:relative; overflow:clip; }
  .masthead .slip{ display:inline-block; position:relative; isolation:isolate; } /* transforms need inline-block */
  .masthead .slip::before{ content:""; position:absolute; inset:-0.06em -0.16em; z-index:-1;
    background:var(--vc-paper); border:1px solid var(--vc-rule); box-shadow:var(--shadow-paper); }
  .masthead .slip:nth-of-type(1){ transform:translate(-6px,10px) rotate(-2deg); }
  .masthead .slip:nth-of-type(2){ transform:translate(4px,-6px) rotate(1.5deg); }
  .masthead .slip:nth-of-type(3){ transform:translate(-2px,8px) rotate(-1deg); }
  .fonts-ready .masthead .slip{ animation:word-settle 240ms var(--ease-settle) calc(120ms + var(--i) * 220ms) forwards; }
  .fonts-ready .masthead .slip::before{ animation:slip-fade 240ms var(--ease-settle) calc(120ms + var(--i) * 220ms) forwards; }
  .masthead-lens{ position:absolute; inset:0; pointer-events:none; }
  .masthead-lens::before{ content:""; position:absolute; inset-block:0; right:100%; width:24px;
    background:rgb(231 239 248 / 0.5); border-right:2px solid var(--vc-azure-500); }
  .fonts-ready .masthead-lens{ animation:lens-sweep 800ms var(--ease-glide) forwards; }
  .masthead-rule{ display:block; height:1px; margin-top:0.2em; background:var(--vc-brass-400);
    transform-origin:left; transform:scaleX(0); }
  .fonts-ready .masthead-rule{ animation:rule-draw 300ms var(--ease-settle) 860ms forwards; }
}
@keyframes word-settle{ to{ transform:none; } }
@keyframes slip-fade{ to{ opacity:0; } }
@keyframes lens-sweep{ from{ transform:translateX(0); } to{ transform:translateX(calc(100% + 26px)); } }
@keyframes rule-draw{ from{ transform:scaleX(0); } to{ transform:scaleX(1); } }
@keyframes stamp{ from{ opacity:0; transform:rotate(-2deg) scale(1.06); } to{ opacity:1; transform:rotate(-2deg) scale(1); } }

/* Lens casts: decided by CSS, never by matchMedia, so the prerender and hydration match */
@media (max-width:639px){ .lens [data-desktop-only]{ display:none; } }
@media (min-width:640px){ .lens [data-mobile-only]{ display:none; } }

@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{ animation-duration:.01ms !important; animation-delay:0s !important; animation-iteration-count:1 !important;
    transition-duration:.01ms !important; scroll-behavior:auto !important; }
  /* Final states from first paint, without waiting for fonts-ready or JavaScript */
  .masthead .slip{ transform:none; } .masthead .slip::before{ opacity:0; } .masthead-rule{ transform:none; }
  .lens:not([data-user]) .lens-field{ --lens-x:100%; }
  .lens:not([data-user]) :is(.row,.stamp,.hash,.lens-cite){ opacity:1; transform:none; }
}
```

### 4.3 Tailwind theme extension (`frontend/tailwind.config.js`)

```js
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    container: { center: true, padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2.5rem' }, screens: { '2xl': '1280px' } },
    fontWeight: { normal: '400', medium: '500', semibold: '600' }, // only loaded weights exist: no faux bold
    extend: {
      colors: {
        ink: { DEFAULT: '#232C4A', 950: '#0E1630' }, navy: '#1A2550', graphite: '#535A6E', mist: '#B9BFD0',
        azure: { 50: '#E7EFF8', 300: '#9CC4EA', 500: '#2D78B7', 700: '#1F5E96' },
        parchment: { DEFAULT: '#F5F0E6', 300: '#ECE4D3' }, paper: '#FCFAF5',
        rule: { DEFAULT: '#D8CDB6', strong: '#857A62' },
        brass: { 400: '#BF9B58', 700: '#7A5A28' }, signal: { DEFAULT: '#A8352A', 300: '#EE8E7E' },
        background: 'hsl(var(--background))', foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))', input: 'hsl(var(--input))', ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        display: ['"Newsreader Variable"', '"Newsreader Fallback"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', '"Plex Sans Fallback"', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        masthead: ['clamp(1.875rem, 0.529rem + 5.524vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        numeral: ['clamp(4rem, 2.514rem + 6.095vw, 8rem)', { lineHeight: '0.9' }],
        display: ['clamp(2.25rem, 1.507rem + 3.048vw, 4.25rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h2: ['clamp(2rem, 1.536rem + 1.905vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        h3: ['clamp(1.375rem, 1.236rem + 0.571vw, 1.75rem)', { lineHeight: '1.2' }],
        stat: ['clamp(1.875rem, 1.457rem + 1.714vw, 3rem)', { lineHeight: '1.05' }],
        lead: ['clamp(1.125rem, 1.056rem + 0.286vw, 1.3125rem)', { lineHeight: '1.55' }],
        body: ['1.0625rem', { lineHeight: '1.65' }], small: ['0.9375rem', { lineHeight: '1.55' }],
        caption: ['0.875rem', { lineHeight: '1.5' }], meta: ['0.8125rem', { lineHeight: '1.45' }],
        label: ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.08em' }],
      },
      borderRadius: { none: '0', sm: '2px', DEFAULT: '2px', md: '4px', lg: 'var(--radius)' },
      boxShadow: { paper: 'var(--shadow-paper)' },
      maxWidth: { measure: '68ch' },
      transitionTimingFunction: { settle: 'cubic-bezier(0.2,0,0,1)', exit: 'cubic-bezier(0.4,0,1,1)', glide: 'cubic-bezier(0.45,0,0.2,1)' },
      // Bespoke keyframes (word-settle, slip-fade, lens-sweep, rule-draw, stamp) are in index.css.
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: { 'accordion-down': 'accordion-down 200ms ease-out', 'accordion-up': 'accordion-up 200ms ease-out' },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### 4.4 Typography

**Families** (all Google Fonts, self-hosted so that no third-party font request is made):

- **Display: Newsreader** (Production Type). Variable, with optical size 6 to 72, roman and true italic. Load the 400 to 600 range.
- **Text and UI: IBM Plex Sans** 400, 500, 600 and 400 italic.
- **Evidence metadata: IBM Plex Mono** 400 and 500. It sets message IDs, EV references, hashes, day counters and labels, with tabular and slashed-zero figures.

**Why Newsreader over Playfair Display:**

1. The optical-size axis keeps 68 to 88 px display settings crisp and 20 to 28 px settings sturdy in one family. Playfair's Didone hairlines break up below about 28 px on the Windows screens common in firms and chambers.
2. It reads as a law report or a well-set judgment rather than a fashion masthead.
3. Its true italic carries the masthead, case names and marginalia.

**Continuity fallback** if the owner declines: Playfair Display 500 and 600 for masthead, H1 and H2 at 32 px and above only, Newsreader everywhere else, and never a weight that is not loaded.

**Loading**

- Remove the Playfair `<link>` from `public/index.html` and the Space Grotesk and Manrope `@import` from `index.css`.
- Add `@fontsource-variable/newsreader`, `@fontsource/ibm-plex-sans` and `@fontsource/ibm-plex-mono`.
- A `prebuild` script, `scripts/copy-fonts.mjs`, copies the Latin woff2 files into `public/fonts/`. `@font-face` rules in `index.css` point at `/fonts/…` with `font-display: swap`.
- Preload two files only: Newsreader roman variable Latin and Plex Sans 400 Latin.
- Metric-matched fallbacks (`Newsreader Fallback` from `local('Georgia')`, `Plex Sans Fallback` from `local('Arial')`) use `size-adjust`, `ascent-override` and `descent-override` values generated with fontaine or capsize, and are committed.
- Confirm the exact file names (opsz and italic) in the installed package.

**Scale** (fluid between 390 and 1440 px)

| Role | Setting | 390 px | 1440 px |
|---|---|---|---|
| Masthead | Newsreader italic 400, azure-500 | 30 px | 88 px |
| Chapter numeral (aria-hidden) | Newsreader italic 400, brass-700 (brass-400 on ink) | 64 px | 128 px |
| H1 | Newsreader 500, navy, -0.02em | 36 px | 68 px |
| H2 | Newsreader 500 | 32 px | 52 px |
| H3 | Newsreader 600 | 22 px | 28 px |
| Statistic and pull quote | Newsreader 500 (quotes italic 400) | 30 px | 48 px |
| Lead | Plex Sans 400 | 18 px | 21 px |
| Body | Plex Sans 400, 1.65, measure 68ch | 17 px | 17 px |
| Small / caption | Plex Sans 400 | 15 / 14 px | 15 / 14 px |
| Mono meta | Plex Mono 400, tabular | 13 px | 13 px |
| Mono label and eyebrow | Plex Mono 500, capitals by CSS, tracking 0.08em, brass-700 (brass-400 on ink and navy) | 12 px | 12 px |
| Footnote marker | Plex Sans 600 at 0.7em, brass-700 (brass-400 on ink); 24 × 24 px target | | |

Body text never goes below 16 px, and mono text never below 12 px.

### 4.5 Motifs (each one does a job)

1. **Chapter opener.** A huge italic roman numeral in the margin column, the eyebrow in mono, and a double hairline (1 px, 3 px gap, 1 px) that draws once.
2. **Fail and recover pairs.** "Where the record fails" has a 2 px dashed graphite rule. "Where VeriCase comes in" has a 2 px solid azure rule. A skimmer can read only the pairs.
3. **Figures.** Every mock sits in a fixed-ratio paper frame with a caption "Fig. n · … See note A."
4. **App-family mocks.** A VeriCase-blue header strip (azure-500, white 14 px 500 text, 4.69:1), a paper body, navy text and beige chips (parchment-300 fill, rule-strong border, key in mono 12 px above a sans value).
5. **Exhibit stamps.** EV references in a brass-edged mono tab. The stamp micro-interaction is used for EV stamps at Lens stage 5, "Bundle created" and "Accepted".
6. **Verification tick.** The logo's swoosh V redrawn as a 16 to 20 px glyph. It is used only where something has been checked: all sources linked, citations checked, hash match, reply accepted.
7. **Two kinds of superscript.** Site notes are brass numerals that open a Popover linking to Notes (NoteRef). Product citations are azure numerals inside mocks that open the Source sheet (EvidenceChip, superscript variant). The two components share one visual style (`.superscript-ref`) in two colour variants.
8. **The Lens band.** A vertical band with 2 px azure edges and brass bezel ticks. It is used only in the masthead sweep, Fig. 1 and the Chapter II view toggle.
9. **Parchment to ink.** A hard cut marked by a brass double rule and the label "Case time". It means one thing only: the move from project time to case time.
10. **Declaration boxes.** 1 px brass-400 border, mono label, Newsreader 22 px. This is the calmest typographic moment on the page.
11. **Ledger rules instead of cards.** Square documents. One paper shadow, on mocks only. No hover lift.
12. **Never used:** gradients, blobs, glowing AI, padlocks, shields, gavels, scales, handshakes, emoji, tinted icon tiles, icon grids, count-ups, typewriter effects, hover scaling.

### 4.6 Grid and spacing

- **Grid.** 12 columns with 24 px gutters and a maximum container of 1280 px (1200 px of content inside 40 px side padding). Side padding is 16 px up to 639 px, 24 px from 640 to 1023 px, and 40 px from 1024 px.
- **Desktop.** Columns 1 to 2 are the margin (chapter numerals and figure numbers). Text runs in columns 3 to 8, or 3 to 7 beside a figure. Figures take columns 7 to 12 (588 px at full width), or 3 to 12 for wide mocks.
- **Tablet.** 8 columns. The margin folds into the eyebrow.
- **Mobile.** 4 columns at 390 px, with a 358 px content width. There is no horizontal page scroll: wide tables become stacked cards.
- **Rhythm.** 8 px base. Section padding is 128 px on desktop, 96 px on tablet and 64 px on mobile. The hero is the exception: its top padding is 48 px at 1024 px and above and 24 px below, so that the first viewport carries the CTA. Paragraphs are 24 px apart, and a chapter header sits 48 px above its content.
- **Radii.** 0 for documents and figures, 2 px for buttons, inputs and chips, 4 px for mock windows.
- **No layout shift.** Every image, video and figure sits in a CSS `aspect-ratio` box, or has a fixed min-height per breakpoint.
- **Plate numbers** are assigned in page order at render, so a founder photograph in place of Plate 4 renumbers the demonstration plate as Plate 4.
- **Ground order.** Parchment (cover), Plate 1 band, parchment and parchment-300 (I), parchment (II), paper band (III), parchment (IV), ink (V), parchment with an ink panel (VI), parchment-300 (In brief), paper (About), parchment with a navy panel (Demonstration), parchment-300 (Notes), ink (footer).

### 4.7 Iconography

- **Base: lucide-react** at `strokeWidth={1.5}`: 20 px in UI, 24 px in lists, colour `currentColor` (ink, azure-700, or parchment on ink).
- **Bespoke set:** 12 domain glyphs, sketched with Recraft (HF-10) and redrawn by hand on a 24 px grid with 1.5 px strokes, round caps and no fills. They ship as React components in `frontend/src/components/icons/`: EmailArchive, Thread, QuoteFold, NearDuplicate, OcrPage, ExcludedProject, ChronologyLens, QueryChip, CitedReport, TabbedBundle, RebuttalPair, HashSeal. They appear in ruled lists (Chapter II items, Chapter III steps, Chapter VI controls), never as a grid of tiles.
- **Verification tick** (`VerificationTick.jsx`) is the only filled glyph.
- Every emoji and every text-glyph bullet (the check mark U+2713 and the em dash U+2014) is removed.
- Decorative icons are `aria-hidden`. Icon-only buttons carry an `aria-label`, with a 44 px touch target.

### 4.8 Imagery direction

Restrained documentary photography of UK construction and archival settings:

- overcast British light;
- desaturated by about 30%, with shadows towards navy and highlights towards parchment;
- fine grain, eye-level 35 to 50 mm framing.

Rules:

- No people at all, and no faces or hands.
- No legible text, signage or logos.
- No hard hats or hi-vis.
- No gavels, courtrooms or glowing overlays.
- UK-correct details (brick terraces, A4 lever-arch files).

Photographs supply place and pause, never proof: the proof is the figures. Product UI is always code-built with fictional data, never AI-generated and never a real screenshot. The one AI-generated element inside a mock is the EV-0144 diary scan (HF-09), which is always labelled illustrative and covered by note B. The founder appears only in a real photograph supplied by the owner, or not at all.

Delivery: WebP (AVIF optional) with `srcset` at 640, 960, 1440 and 1920 px, explicit width and height, `loading="lazy"` and `decoding="async"` below the fold, and a 24 px blurred LQIP as a CSS background. Alt text begins "Illustrative image:".

### 4.9 Motion principles and reduced motion

1. **Motion is procedure.** Every animation depicts an operation (thread, fold, set aside, order, cite, rank, stamp, hash) and ends in a still, readable state. Nothing loops except the optional video.
2. **Timings.** UI feedback 150 to 240 ms. Reveals 240 to 400 ms, with a stagger of 60 ms or less and offsets of 12 px or less. Settle easing is `cubic-bezier(0.2,0,0,1)` and the Lens glide is `cubic-bezier(0.45,0,0.2,1)`. The masthead runs 1.16 s. The Lens autoplay runs 2.4 s and has Pause. Nothing autoplays for more than 5 s without a pause control (WCAG 2.2.2).
3. **Triggers.** Reveals fire once, via IntersectionObserver at a 20% threshold. Demonstrations start at 40 to 50% in view. There is no scroll-jacking, no pinned body text and no parallax.
4. **Properties.** Transform and opacity only, with three exceptions: the Lens's user-driven `clip-path` on two small layers; `stroke-dashoffset` on small SVG strokes (ruler brackets, ticks, leader rules); and the height of Radix Accordion and Collapsible content (160 to 200 ms).
5. **Reduced motion.** Every sequence renders its final state: the masthead squared, the Lens at stage 5, chips and report present, the day grid filled to the current station. Tweens become instant swaps. Smooth scrolling is off. The video never loads and the poster shows. Every demonstration stays fully operable by keyboard. Implementation: CSS media queries set the defaults before JavaScript (section 4.2), and framer-motion runs under `<MotionConfig reducedMotion="user">`.
6. **Budget.** framer-motion loads via `LazyMotion` with `domMax` fetched asynchronously inside demo chunks. It is never in the first-paint bundle. Animations pause when `document.hidden`.
7. **Narration.** Each demo has an `aria-live="polite"` status line and a prose summary before the figure.

---

## 5. Component plan

### 5.0 File map and composition

**New content**

- `src/content/home.js`: all copy, keyed by section.
- `src/content/notes.js`: numbered and lettered notes.
- `src/content/sampleEvidence.json`: section 3.17. JSON so that both CRA and node can read it.
- `src/content/sampleMatter.js`: parties, questions, plan presets, prepared summaries, count lookups, count templates and derived helpers.
- `src/content/sampleHashes.json`: generated.
- `src/content/stats.js` (PR 1): kept. Add `noteNumber`, align `label` with the Chapter I copy, replace the `short` label "Adjudication referrals in 2023/24" with "Adjudication referrals, May 2023 to April 2024", and align the HKA source line to "investigated by HKA".

**New dependencies**

- `framer-motion`, `@fontsource-variable/newsreader`, `@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-mono`.
- Development: `playwright`, `@axe-core/playwright`, and `fontaine` or `@capsizecss/core`.

**Editorial primitives** (`src/components/editorial/`)

- `ChapterHeader.jsx` with props `{ numeral, eyebrow, title, lead, onInk }`; the H2 carries `tabIndex={-1}` so that the Contents sheet, back-links and hash navigation can move focus to it
- `FailRecover.jsx`
- `Figure.jsx`, a fixed-ratio frame with props `{ ratio, ratioMobile, caption, summary, children }`
- `NoteRef.jsx` and `NotePopover.jsx`
- `Declaration.jsx`
- `ExhibitStamp.jsx`
- `VerificationTick.jsx`
- `Plate.jsx` (picture element with LQIP; plate number from page order)
- `AmbientVideo.jsx`
- `DemoCTA.jsx`
- `LazyMount.jsx`, using IntersectionObserver with rootMargin 600 px and a same-size skeleton

**Mocks** (`src/components/mock/`)

`MockWindow.jsx`, `EvidenceChip.jsx`, `SourceSheet.jsx`, `QueryPlan.jsx`, `AnalysisReport.jsx`, `CreateBundleDialog.jsx`, `BundleIndex.jsx`, `LensWorkbench.jsx`, `FileManagerMock.jsx`, `NoticeRuler.jsx`, `ClaimsBuilderMock.jsx`, `DiscussionMock.jsx`, `DayGrid.jsx`, `ScottSchedule.jsx`, `ManifestTable.jsx`, `HashCheck.jsx`, `PositioningDiagram.jsx`

**Lens** (`src/components/lens/`)

- `LensStage.jsx`: static markup, main bundle
- `lensController.js`: dynamically imported
- `lensFragments.js`: data, including which fragments and rows are desktop-only

**Hooks** (`src/hooks/`)

`useInViewOnce.js`, `useActiveSection.js`, `useDocumentVisible.js`, `usePrefersReducedMotion.js`. The last is read only after mount, so hydration matches.

**lib**

- `src/lib/site.js` (PR 1), updated:

```js
export const CONTACT_EMAIL = 'enquiries@veri-case.com';
const SUBJECT = 'VeriCase demonstration request';
const BODY = ['Name:', 'Organisation:', 'Role:', 'What would you like to see?', '',
  'Please do not include confidential details of a live matter.'].join('\r\n');
export const DEMO_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;
const envUrl = process.env.REACT_APP_APP_URL;
const base = envUrl && envUrl.startsWith('https://') ? envUrl : 'https://app.veri-case.com/ui/';
export const APP_URL = base.endsWith('/') ? base : `${base}/`;
// The production build must resolve to https://app.veri-case.com/ui/login.html (checked in CI).
export const SIGN_IN_URL = `${APP_URL}login.html`;
export const COMPANY = { name: 'VeriCase Ltd', number: '14789532', registeredOffice: '{{REGISTERED_OFFICE}}' };
export const SITE = { legalPages: { privacy: false, cookies: true } };
```

- `src/lib/format.js`: `formatDate`, `formatTime`, and `truncateHash` (first 8, "…", last 8).
- `src/lib/motion.js`: `export const loadDomMax = () => import('framer-motion').then(m => m.domMax);`

**Scripts** (`frontend/scripts/`)

- `compute-sample-hashes.mjs` (prebuild): computes SHA-256 over the NFC-normalised UTF-8 canonical text of each record and writes `sampleHashes.json`. `src/content/sampleHashes.test.js` recomputes and asserts equality.
- `copy-fonts.mjs` (prebuild).
- `prerender.mjs` (postbuild): Playwright. Serves `build/`, loads `/` and `/404` at 1440 × 900 with no consent stored, waits for `document.fonts.ready`, and writes the DOM with `data-prerendered` into `build/index.html` and `build/404.html`.
- `render-og.mjs`: renders `og/og.html` to `public/og-image.png`.
- `lint-copy.mjs` (PR 1, `yarn lint:copy`), extended to the rules in section 8, reading `src/content/**` (including `.json`) and, in postbuild after the prerender, the prerendered HTML text. No second copy checker is added.

**Deletions**

- Sections: `EvidenceGap`, `Collaboration`, `Difference`, `EvidenceHub`, `HowItWorks`, `Accessible`, `Navigation`. (`Hero.jsx` and `SiteFooter.jsx` are rewritten.)
- `SourceNotes.jsx`, superseded by NoteRef and Notes.
- Legacy files in `public/`, after a search confirms nothing references them: `ChronoLensVertical.jpg` (an old lens image), `Logo2.jpg`, `Logo6.jpg`, `NewLogo.jpg`, `Logo-Vector.png`, `Logo2-Copy.png`, `Logoinwhite.png`, `VeriCase.png`, and `vericase-logo.svg` and `vericase-logo-white.svg` once the traced logos replace them.
- `design_guidelines.md` is rewritten to this system; the teal and coral version is retired.

**Pages updated**

- `pages/NotFound.jsx` and `pages/Cookies.jsx` (both PR 1) import `SiteHeader` in place of `Navigation` and adopt the new palette.
- `App.js`: `ExternalRedirect` restyled with palette tokens.

**Entry** (`src/index.js`)

```js
const el = document.getElementById('root');
el.hasChildNodes() ? hydrateRoot(el, <App />) : createRoot(el).render(<App />);
```

Nothing whose first render depends on browser state (consent, matchMedia, scroll) renders before mount.

**`pages/LandingPage.jsx`** (CookieConsent and Toaster stay in `App.js`, as in PR 1, so they are not repeated here; PR 1's hash-scroll effect is kept and also moves focus to the target heading)

```jsx
export const LandingPage = () => (
  <>
    <SiteHeader />
    <main id="main" tabIndex={-1}>
      <Hero /><TheClock /><ChronologyLens /><Research /><ClaimsBuilder />
      <CaseRoom /><RecordIntegrity /><InBrief /><Founder /><Demonstration /><Notes />
    </main>
    <SiteFooter />
  </>
);
```

### 5.1 Shared behaviour

- **NoteRef.** Renders `<sup><a href="#note-n" id="ref-n-k" class="note-ref superscript-ref">n</a></sup>`, with padding for a 24 × 24 px target and `aria-label="Note n"`.
  - The anchor is the trigger of a Radix Popover (`asChild`), so it also carries `aria-haspopup="dialog"` and `aria-expanded`. A click or Enter opens the Popover, containing the note text and a "Read in Notes" link. It persists, can be dismissed with Escape, and returns focus to the marker.
  - "Read in Notes" scrolls (smoothly unless reduced motion), focuses `#note-n` (tabIndex -1), and flashes a parchment-300 background for 1.2 s.
  - Without JavaScript the plain anchor still works.
  - The back-link returns focus to `ref-n-k`.
  - On ink, the marker is brass-400.
- **EvidenceChip.** A `<button>` styled `[EV-0138]` or a superscript numeral (`variant="superscript"`). It opens `SourceSheet`. The accessible name always contains the visible text: `aria-label="EV-0138: open source, email of 12 March 2025"` for the chip, and `aria-label="Citation 2: open source EV-0138, email of 12 March 2025"` for the superscript.
- **SourceSheet.** A shadcn Sheet: `side="right"` at 640 px and above (width 480 px), `side="bottom"` below (max height 85vh). It is titled by the EV reference. It has previous and next citation buttons, keeps focus inside, and returns focus to the invoking chip on close. One instance per page is held in a `SourceSheetProvider` context.
- **DemoCTA.** An `<a href={DEMO_MAILTO}>` styled as the primary button, a "Copy email address" button (Clipboard API, sonner toast, silent fallback that selects the plain email line), and the microcopy.
- **Demo panels.** Carry `className="ph-no-capture"`, which excludes them from PostHog autocapture. `vcLoadAnalytics` in `public/index.html` adds `disable_session_recording: true` to the PostHog initialisation, so no session is recorded anywhere on the site.
- **Demonstration inputs** (Create bundle fields, Rebuttal edits, hash check) sit outside any `<form>`; their buttons are `type="button"`, and values live in component state only.

### 5.2 `Hero.jsx` with the kinetic masthead and the Chronology Lens (Fig. 1)

**Layout**

- Top padding 48 px at 1024 px and above, 24 px below.
- Desktop: the masthead runs full width. Below it, columns 1 to 6 hold the eyebrow, H1, subhead, brand line, CTA, microcopy and fast path. Columns 7 to 12 hold `LensStage`, whose field is 5:4 (about 588 × 470 px at full width). The practitioner strip is a full-width three-column ledger with hairline dividers, and may fall below the fold at 1440 × 900.
- Mobile: masthead (one line, 30 px), then text, then CTA, microcopy, fast path and strip. Then the Lens, whose field is 4:5 (358 × 448 px), with the reduced cast.
- LCP is the masthead or the H1. Both are text in the prerendered HTML at opacity 1 from first paint.

**Masthead: CSS only, no JavaScript dependency** (styles in section 4.2)

```html
<p class="masthead font-display italic text-masthead text-azure-500">
  <span class="slip" style="--i:0">Records,</span> <span class="slip" style="--i:1">records,</span> <span class="slip" style="--i:2">records.</span>
  <span class="masthead-lens" aria-hidden="true"></span><span class="masthead-rule" aria-hidden="true"></span>
</p>
```

- **Start state** (visible at first paint):
  - Each `.slip` is `inline-block` (transforms do not apply to inline boxes) with a `::before` paper slip (paper fill, 1 px rule border, paper shadow) behind the word.
  - Offsets: word 0 is `translate(-6px,10px) rotate(-2deg)`, word 1 is `translate(4px,-6px) rotate(1.5deg)`, word 2 is `translate(-2px,8px) rotate(-1deg)`.
  - The masthead clips its overflow, so neither the tilted slips nor the sweep can cause horizontal page scroll.
- **Sequence** (runs when `html.fonts-ready` is set by a two-line inline script on `document.fonts.ready`, with a 1 s timeout fallback):
  - `.masthead-lens` spans the masthead; its band (a 24 px azure-50 band at 50% opacity with a 2 px azure leading edge) starts just off the left edge, and `lens-sweep` carries it across and off the right edge over 0 to 800 ms (glide). The translate is relative to the full-width element, so it crosses the whole line.
  - Words run `word-settle` for 240 ms (settle) with delays of 120, 340 and 560 ms.
  - Slip pseudo-elements run `slip-fade` for 240 ms with the same delays.
  - `.masthead-rule` (1 px brass-400, `transform-origin:left`) runs `rule-draw` for 300 ms at 860 ms.
  - Everything finishes at 1.16 s. All animations use `forwards`.
- **Fallbacks.** Reduced motion shows the final state from first paint (section 4.2). `<noscript><style>.masthead .slip{transform:none}.masthead .slip::before{opacity:0}.masthead-rule{transform:none}</style></noscript>`.

**LensStage: DOM structure (static markup in the main bundle)**

```html
<figure class="lens" aria-labelledby="fig1-cap" aria-describedby="fig1-sum">
  <p id="fig1-sum" class="sr-only"><span data-desktop-only>…desktop summary…</span><span data-mobile-only>…mobile summary…</span></p>
  <div class="lens-frame">
    <div class="lens-bar">The Chronology Lens™ · Sample matter (fictional) <span>Fig. 1</span></div>
    <div class="lens-field" data-stage="2" style="touch-action:pan-y">  <!-- aspect-ratio 5/4; 4/5 below 640px; --lens-x CSS default 40% -->
      <ol class="lens-ordered" aria-label="Chronology, sample matter">   <!-- clip-path: inset(0 calc(100% - var(--lens-x)) 0 0) -->
        <li class="row" data-row="1" data-processed>…date · time · parties · excerpt · stamp + hash…</li> … 6 rows (row 4 data-desktop-only), fixed heights
        <li class="tray">Set aside: …(desktop and mobile variants)…</li>
      </ol>
      <div class="lens-raw" aria-hidden="true">                           <!-- clip-path: inset(0 0 0 var(--lens-x)) -->
        <article class="frag" data-f="EV-0138" style="--x:12%;--y:46%;--r:2deg">…</article> … 9 fragments (EV-0144 and N-1 data-desktop-only) + SVG thread paths
      </div>
      <div class="lens-band" aria-hidden="true"><span class="lens-stage-chip">Read</span><svg class="bezel">…</svg></div>
      <div class="lens-handle" role="slider" tabindex="0" aria-label="Drag the Lens"
           aria-valuemin="0" aria-valuemax="5" aria-valuenow="2" aria-valuetext="Stage 2 of 5: …">Drag the Lens</div>
    </div>
    <p class="lens-cite">…cite sentence (opacity 0 until stage 5)…</p>  <!-- fixed strip: 48 px desktop, 64 px mobile -->
    <div class="lens-rail"><button>Raw</button>…<button>Cite</button><button class="lens-play" disabled>Play</button></div>
    <div class="lens-foot">…(desktop and mobile variants)… <span class="verified">6 of 6 linked to source</span></div>
    <p class="sr-only" aria-live="polite"></p>
  </div>
  <figcaption id="fig1-cap">Fig. 1 · …</figcaption>
</figure>
```

The bar, cite strip, rail and foot sit outside the field at fixed heights, so the figure's total height is fixed per breakpoint. Desktop: six rows at 64 px plus a 40 px tray fit the 470 px field. Mobile: five rows at 72 px plus the tray fit the 448 px field. Below 640 px the rail wraps to two rows of 44 px buttons, four per row, with no horizontal scroll.

**Fragments** (`lensFragments.js`; desktop positions as a percentage of the field; card width 28%, scan thumbnail 18%; threshold is the lens x at which processing begins)

| Fragment | x, y, rotation | Threshold | Processing at threshold | Fate |
|---|---|---|---|---|
| EV-0131 email | 3, 8, -3° | 6 | Thread line drawn to EV-0138; rotates to 0°; chip "Thread 1 · 3 messages" | Row 1 |
| EV-0138 email | 12, 46, 2° | 14 | Chip "Threaded by References header" | Row 2 |
| EV-0139 email (tall, grey quoted block) | 22, 18, -1.5° | 24 | Quoted block `scaleY(0)` to a 20 px bar "Quoted history folded (3)" | Row 3 |
| EV-0144 scan thumbnail (HF-09) | 32, 62, 3° | 34 | A scan line crosses (translateY); chip "Scanned page read by OCR" | Row 4 (desktop only) |
| N-3 near-duplicate | 42, 30, 4° | 44 | Slides 12 px under its twin's ghost; opacity 0.35; chip "Near-duplicate: removed from review; original retained" | Tray |
| N-1 auto reply | 50, 70, -4° | 50 | Opacity 0.35; chip "Automatic reply: hidden as noise" | Tray (desktop only) |
| N-2 Project Birch | 56, 10, -2° | 56 | Translates 12 px right; opacity 0.35; graphite chip "Project Birch: excluded as another project" | Tray |
| EV-0147 email with attachment chip | 64, 44, 2.5° | 64 | Attachment chip tucks behind with a paperclip icon; chip "Attachment extracted: Delivery_schedule.pdf" | Row 5 |
| EV-0151 email | 70, 72, -1° | 72 | Chip "Placed in order: 28 March 2025" | Row 6 |

**Rows and stages**

- Rows are fixed in date order at fixed heights (64 px desktop, 72 px mobile), so the layout never moves. The desktop-only row is removed by CSS from first paint, so there is no shift on mobile.
- A row gets `data-processed` when its fragment's threshold is passed. It then fades in: opacity 0 to 1 and translateX(-8 px to 0), 240 ms settle.
- Row columns, left to right: date (mono, 13 px) · time · parties (sans, 13 px) with an excerpt (Newsreader, 15 px, one-line clamp) · stamp and hash (mono, 12 px, in the rightmost 18%).
- The clip reveals dates first, then text, then stamps. That is the "Cite" stage.
- Stage index is `min(5, floor(lensX / 20))`, with stops at 0, 20, 40, 60, 80 and 100. Each operation completes before the stop named for it.
- On reaching 100:
  - EV stamps run `stamp` (180 ms, 60 ms stagger);
  - hashes fade in as plain characters (200 ms, no scramble);
  - the cite sentence fades in, in its reserved strip;
  - the verification tick draws (stroke-dashoffset, 300 ms).

**Initial and prerendered state**

- `--lens-x: 40%` (stage 2) is set in CSS. Rows 1 to 4 are processed and the left 40% is ordered, so the right 60% still shows the mess.
- At first glance the figure therefore shows the transformation itself.
- Under reduced motion, the CSS in section 4.2 sets `--lens-x: 100%` and shows every row, stamp, hash and the cite sentence, until the visitor interacts (which sets `data-user` on the figure).
- When the controller mounts, it sets `aria-valuenow`, `aria-valuetext`, `data-stage` and the rail's `aria-current` to match the stage actually rendered (5 under reduced motion), and enables the Play button.

**Controller** (`lensController.js`, dynamically imported in `useEffect` after `requestIdleCallback`, with a `setTimeout(…, 200)` fallback where `requestIdleCallback` is unavailable (Safari), so hydration is untouched; no framer-motion)

- **Pointer.** `pointerdown` on the band, handle or field calls `setPointerCapture`. `pointermove` sets `--lens-x` on the field element through `requestAnimationFrame` with no React render per frame. Threshold crossings toggle classes and `data-stage`, and update ARIA only when the stage changes. It is continuous, with no snapping. Vertical page scroll passes through because of `touch-action: pan-y`.
- **Keyboard** (WAI-ARIA slider pattern on `.lens-handle`):
  - Left or Down, and PageDown: previous stop.
  - Right or Up, and PageUp: next stop.
  - Home: 0. End: 100.
  - Each move is a 240 ms glide (instant under reduced motion). The live region announces the aria-valuetext.
- **Rail buttons** glide to their stop. The active button carries `aria-current="step"`.
- **Autoplay.** Only if all of these hold: not reduced motion, `document.visibilityState === 'visible'`, the figure is at least 50% in view, and there has been no interaction.
  - After 800 ms it glides 40 to 100 over 2,400 ms.
  - The control reads "Pause" while the glide runs, and "Play" at rest.
  - Any pointer, key or focus event on the figure cancels it.
  - It pauses on `visibilitychange`.
  - At the end the button reads "Replay", which resets to 0 and glides 0 to 100 over 3,600 ms.
- **Once the user interacts**, `data-user` is set on the figure, so the reduced-motion CSS override stops applying.

**Mobile.** Seven fragments (EV-0144 and N-1 omitted by CSS). Rows are two lines (date and time stacked; excerpt clamped to two lines), with a 64 px stamp column. The summary, tray and footer show their mobile variants, and the stage texts are true for both casts.

**Accessibility**

- The raw layer is `aria-hidden`. The ordered list is real content and always in the DOM, so screen readers get the full chronology for the visible cast whatever the lens position.
- The handle has a visible label that matches its accessible name, a 44 × 44 px target and a 3 px focus ring.
- Colour is never the only cue: every state has a text chip.

**Performance.** The chunk contains no images except HF-09 (about 30 KB, lazy). The static markup weighs about 6 KB.

### 5.3 `TheClock.jsx` (Chapter I)

- **Structure:**
  - `Plate` HF-04: full-bleed, 21:9 at 1024 px and above, 4:5 art-directed crop below, lazy.
  - `ChapterHeader` with numeral "I".
  - `FailRecover`.
  - A two-column row: the matter card (columns 3 to 7, paper, brass corner tab) and `NoticeRuler` (columns 8 to 12).
  - Schedule 1 on a parchment-300 band as a real `<table>` with caption. Below 768 px it becomes stacked definition cards.
  - The context strip: three columns on desktop, stacked on mobile, with numerals in `text-stat`.
- **NoticeRuler.**
  - Desktop: an SVG axis of 35 day ticks (01 March to 04 April 2025) with labels on Mondays, four pins as absolutely positioned `<button>` elements of at least 24 × 24 px (which open SourceSheet), and two brackets: solid navy "16 days to notice" and dashed navy "2 days to notice". Pin labels alternate above and below the axis, so the 26 and 28 March pins (about 30 px apart) and their labels never overlap. No signal colour.
  - Mobile: a vertical axis in the DOM with the dates running down the page.
  - Motion: brackets draw in turn (stroke-dashoffset, 400 ms each, 150 ms apart) and pins fade in (200 ms), once. Reduced motion shows the final state.
  - Accessibility: the SVG is `aria-hidden`. An ordered list of the four dated events with their EV references is the text equivalent.
- **Schedule rows.** The "Time bar" label is a signal-bordered pill with signal text (5.18:1 on parchment-300), used only on the NEC4 and FIDIC rows. Row hairlines draw once (scaleX, 400 ms, 60 ms stagger).
- **Data.** Statistics come from `STATS` in `stats.js`. Note numbers come from `notes.js`.

### 5.4 `ChronologyLens.jsx` (Chapter II)

- **Structure:** `ChapterHeader` "II", `FailRecover`, the items as a ruled definition list with icons (EmailArchive, Thread, QuoteFold, NearDuplicate, ExcludedProject, ChronologyLens), Plate 2 (HF-05, 4:5, columns 9 to 12, at 1024 px and above only), then `LazyMount` around `LensWorkbench` (columns 3 to 12). From 768 px the frame has a fixed height, with a fade and a count of the entries below the fold; below 768 px the list takes its own height, opens on four entries with "Show all", and the frame reserves the measured height of that opening view, so nothing shifts when it loads.
- **LensWorkbench** is a `MockWindow` with a blue header, "VeriCase · Sample matter (fictional)", and shadcn Tabs for "Chronology Lens™" and "File Manager".
  - The Chronology Lens toolbar is a shadcn ToggleGroup for Cards or Table, Popovers for the date window and Smart Filter, removable keyword chips, party ToggleGroup chips and a Create bundle button with its popover. Hidden rows leave a marker row.
  - The left rail is the ingestion ledger (mono, right-aligned, brass leader dots).
  - The main area lists entries from `sampleEvidence.json` filtered by state.
  - EV-0139 carries an As received / As authored ToggleGroup. The quoted block is a Radix Collapsible (200 ms).
  - Selecting an entry opens a drawer: an in-frame right panel at 1024 px and above, a Sheet below. It has Tabs for Details, AI suggestions, Notes and Audit.
  - The Not Relevant demonstration runs on N-4, with Undo.
  - `FileManagerMock` lists attachments by type with counts and a Switch for Show Noise, which reveals the two signature-image rows labelled "Noise".
- **Motion.** The Cards/Table swap is a 160 ms crossfade (framer `AnimatePresence`, opacity only). Filter changes fade rows (200 ms). Reduced motion swaps instantly.
- **Accessibility.**
  - Table view is a real `<table>` with a caption. Below 768 px it renders as cards, never with horizontal scroll.
  - All controls are Radix primitives with visible labels.
  - The status line announces changes, for example "2 entries hidden by filter", "Noise shown: 2 attachments" and "Item marked Not Relevant; 1 attachment excluded from search".

### 5.5 `Research.jsx` (Chapter III, the centrepiece)

- **Structure:** `ChapterHeader` "III" (the band ground is paper), `FailRecover`, three numbered steps in a row (stacked on mobile), then `LazyMount` around `ResearchDemo` (columns 2 to 12; fixed min-height 760 px on desktop, 1,180 px on mobile; skeleton of the same size), then the CTA band (full width, parchment-300, `DemoCTA`).
- **ResearchDemo:**
  - The question picker is a radio-card group with three options (C behind the `[confirm]` guard flag).
  - The command bar is read-only text with a Filter or Evidence ToggleGroup.
  - `QueryPlan` renders chips as buttons, each with a key label (mono, 12 px, brass-700) over a sans value. Each opens a Popover editor (RadioGroup of presets, Checkbox list, Apply and Cancel). An edited chip gains a 3 px azure left rule and the sr text "edited".
  - "Run plan" computes the report deterministically: `findings.filter(matchesPlan)`, with counts, the hidden marker and the summary taken from the lookups and templates in `sampleMatter.js`.
  - `AnalysisReport` is a paper document with a blue header, the counts in mono, the validation badge (azure outline, verification tick, the sub-line in 14 px graphite), numbered findings, `EvidenceChip variant="superscript"` citations, the limits line, and the Download PDF and Create bundle buttons.
  - `CreateBundleDialog` is a shadcn Dialog with nine labelled, prefilled fields: seven Inputs and two Textareas (Description and Notes). It contains no `<form>` action; Create bundle is a `type="button"` that updates state.
  - `BundleIndex` renders after creation: stamp, cover definition list and index table.
- **State:** `{ questionId, plan, planDirty, ran, sheetCitationId, bundleOpen, bundleCreated, fields }`.
- **Motion** (framer, `LazyMotion` domMax), all once on first 40% view and not under reduced motion:
  - chips enter in parse order (opacity plus 8 px rise, 200 ms, 70 ms stagger);
  - the report header fades in 200 ms after the last chip;
  - findings follow (200 ms, 80 ms stagger);
  - each citation superscript arrives 120 ms after its finding, because the citations are the point;
  - the badge tick draws (300 ms);
  - the stamp plays on creation (180 ms).

  The whole sequence is about 2.4 s and is not a loop. Reduced motion renders the report immediately and the stamp static.
- **Accessibility.**
  - The report is an `<article>` with a heading.
  - Findings are an `<ol>`.
  - Superscript buttons carry full aria-labels that begin with the visible numeral.
  - Live region messages (computed): "Plan changed", "Report updated: {n} sources cited", "Bundle created with {n} items".
  - The Popover and Dialog trap and return focus.
  - The guard notice uses `role="status"`. While the guard applies, Run plan carries `aria-disabled="true"` (it stays focusable) and `aria-describedby` pointing to the notice.

### 5.6 `ClaimsBuilder.jsx` (Chapter IV)

- **Structure:** `ChapterHeader` "IV", `FailRecover`, the items list, then `LazyMount` around `ClaimsBuilderMock` (Fig. 5), then `DiscussionMock` (Fig. 6), with no plate.
- **ClaimsBuilderMock.**
  - Desktop: three panes (tree in 3 of 12 columns, editor in 6, finder in 3).
  - Tablet: the tree becomes a Select above the editor.
  - Mobile: Tabs for Draft, Tree and Finder, with Draft as default.
  - The tree is a nested list with Collapsible nodes (160 ms).
  - The editor sets pleading-style paragraph numbers (mono, brass-700) in the margin, Newsreader 18 px text, and inline `EvidenceChip` elements that open SourceSheet.
  - Finder items are labelled "Suggested".
  - "Insert citation" appends a chip to paragraph 1.2.2 (a 240 ms move of a ghost copy, then a 400 ms azure outline). Under reduced motion the chip simply appears.
- **DiscussionMock.** The EV-0139 message on the left; the discussion panel on the right, headed by the document reference and joined to the message header by one brass rule that draws on view (300 ms). The sentence quoted in the first comment is set in Newsreader italic. Mono role badges (SL, EC, CC) sit in square outlined boxes. The `@External Counsel` mention is styled as a chip. Below 768 px the comments stack beneath the message and the rule becomes a left rule.
- **Accessibility.** The tree follows the disclosure pattern: nested lists whose parent nodes are buttons with `aria-expanded` (no `role="tree"`, which would require the full tree keyboard model). The comments are a list whose heading names the document.

### 5.7 `CaseRoom.jsx` (Chapter V, ink)

- **Structure:**
  - The section carries `class="on-ink bg-ink-950"`, which sets parchment text and headings and the azure-300 focus ring.
  - The top turn is a brass double rule with the label "Case time" in mono.
  - The header band (`min(62svh, 600px)`) holds `AmbientVideo` or the poster Plate 3 under a `rgba(14,22,48,0.72)` overlay. Parchment text on it stays at 6.3:1 or better even over a pure white frame. All text on the band is parchment; mist is not used over imagery. The kicker, `ChapterHeader` "V" and lead sit on top, with the pause button at bottom left.
  - At 1024 px and above the body splits: columns 1 to 4 hold a sticky `DayGrid` (top 96 px); columns 5 to 12 hold the stations.
  - Below 1024 px the DayGrid is inline at the top of the body, and each station heading carries "Day n of 28" in text. No extra sticky bar.
- **DayGrid.**
  - Four rows of seven cells (Days 1 to 28, 28 × 28 px on desktop) plus two dashed rows (Days 29 to 42, labelled for the extension), with a brass Day 0 marker before cell 1. Empty cells are outlined in mist (9.72:1 on ink); the extension rows use a dashed mist outline.
  - Annotations at Days 14, 21 and 28 (mono, mist).
  - The fill (brass-400) advances to 14, 21 and 28 as each station enters view (IntersectionObserver). Cells fill at 30 ms per cell, with no scrubbing and no reversal. Under reduced motion the fill jumps.
  - The cells are `aria-hidden`. The text equivalent is a visually hidden list.
- **ScottSchedule.**
  - A paper table on ink, carrying `.on-paper`, with columns Response, Proposed reply, Evidence ranked and Decision.
  - Response text is Newsreader italic with paragraph references in mono. Replies are Plex Sans. Evidence chips are mono, with reason chips in beige.
  - The Decision cell is a ToggleGroup for Accept, Edit and Reject, where every state has an icon and a word: Check with "Accepted" in an ink outline; Pencil with "Edited" in azure-700; X with "Rejected" in signal, with the proposed text struck through by a line drawn over 300 ms.
  - Edit swaps in a Textarea. On save it validates with `/\[EV-\d{4}\]/`, and on failure shows the guard in signal text with an AlertCircle icon and `aria-describedby`.
  - Audit lines are mono, graphite on paper, at 13 px. Before and after text is shown with differences underlined.
  - Selecting a row re-ranks the Evidence column with a framer layout animation (240 ms; instant under reduced motion), and the live region announces the new ranking.
  - Below 768 px each row becomes a card: Response, then Reply, then Evidence, then the Decision controls.
- **Close.** The export strip, the standing line, the Day 28 card (a paper card carrying `.on-paper`, with a brass border and the verification tick absent, because nothing is verified), `DemoCTA` in its on-ink variant (parchment button with navy text), and the figure captions.
- **AmbientVideo.**
  - Loads only if the viewport is at least 1024 px wide, reduced motion is off, `navigator.connection?.saveData` is not true, and the band is within 600 px of view.
  - `<video muted playsInline loop preload="none" poster>` with WebM then MP4 sources.
  - IntersectionObserver pauses it off-screen. A pause chosen by the visitor is respected: the video does not resume on re-entry.
  - The visible button's label switches between "Pause background video" and "Play background video" (no `aria-pressed`, so the state is not announced twice).
  - Otherwise the poster `<picture>` shows, with a 4:5 crop on mobile.

### 5.8 `RecordIntegrity.jsx` (Chapter VI)

- **Structure:** `ChapterHeader` "VI", `FailRecover`, then a row with the controls list (columns 3 to 7; icons HashSeal and others) and `HashCheck` (columns 8 to 12, as an ink panel carrying `.on-ink` inside the parchment section). Then `ManifestTable` full width, the `Declaration` box, and `PositioningDiagram`. The HF-11 linework sits at 6% opacity, bottom right, at 1024 px and above.
- **HashCheck.**
  - A Textarea (Plex Mono, 14 px, 9 rows; navy fill, parchment text at 12.98:1, mist border at 8.02:1) seeded from the canonical constant. `manifest` comes from `sampleHashes.json`.
  - On input, with a 60 ms debounce: `crypto.subtle.digest('SHA-256', new TextEncoder().encode(value.normalize('NFC')))`.
  - Both digests are shown truncated, with a "Show full hash" toggle.
  - A "Changed characters" line beneath the field (a textarea cannot style parts of its text) shows the edited text with differing characters underlined in azure-300 and briefly set on a navy fill (150 ms; no flash under reduced motion).
  - The status uses the tick and "Match", or a cross and "Does not match" in signal-300 on ink.
  - "Reset" restores the constant.
  - If `window.isSecureContext` is false, the fallback line shows.
  - Live status uses `role="status"` and is updated only when the state changes between match and no match, not on every keystroke.
- **ManifestTable.** A real `<table>` in Plex Mono 13 px with tabular figures, parchment-300 zebra rows and truncated hashes, each with a "Show full hash" toggle and a copy button. Below 768 px each row becomes a definition-list card and hashes wrap by character.
- **PositioningDiagram.** An SVG of four ruled boxes on a navy spine (vertical on mobile). The VeriCase box has an azure outline and the lens glyph. The fourth box has a graphite dashed outline. The SVG is `aria-hidden`, and an ordered list is the text equivalent. The spine draws once (500 ms).

### 5.9 `InBrief.jsx`, `Founder.jsx`, `Demonstration.jsx`, `Notes.jsx`, `SiteHeader.jsx`, `SiteFooter.jsx`, `CookieConsent.jsx`, `NotFound.jsx`

- **InBrief.**
  - The ledger is a 3 × 2 grid on desktop, 2 × 3 on tablet and one column on mobile. Each entry has a hairline box with no shadow, the chapter's roman numeral in Newsreader italic brass-700 at 40 px (no icon tile), the title in Newsreader 24 px, the text, and a mono "Read Chapter n" link at top right. The border darkens to navy on hover or focus.
  - The benchmark line sits in its own ruled row, away from ingestion copy.
  - Questions use a shadcn Accordion (Radix, with `forceMount` so that closed answers stay in the DOM, hidden by `data-state` styles; 56 px triggers; plus and minus icons).
  - The section ends with `DemoCTA`.
- **Founder.**
  - Columns 3 to 7 hold the text, credential block (mono), Declaration and account.
  - Columns 8 to 12 hold the founder photograph if supplied (4:5, lightly desaturated, brass hairline), otherwise Plate 4 (HF-06). No AI likeness.
  - The Declaration always precedes `{{UI_CASE}}`.
- **Demonstration.** A parchment band with a navy inset panel (4 px radius) carrying `.on-ink`. Headline in parchment Newsreader; eyebrow in brass-400. The on-ink DemoCTA with the parchment button. The demonstration plate (HF-07, 3:2) sits right at 1024 px and above.
- **Notes.** A two-column `<ol>` on desktop (one column on mobile). Each note has `id="note-n"` and `tabIndex={-1}` and a back-link. The lettered notes follow as a `<dl>`.
- **SiteHeader.** As section 2. `useActiveSection` drives the underline at 1280 px and above, on the home page only. The Contents sheet uses shadcn Sheet with a link list; `onSelect` closes the sheet, then `requestAnimationFrame` moves focus to the heading. Off the home page, anchors are written as `/#id`.
- **SiteFooter.** As section 2, carrying `.on-ink`. Links in azure-300 on ink (9.78:1), underlined on hover and focus. Collapsible groups below 768 px.
- **CookieConsent** (PR 1 logic kept: key `vc-analytics-consent`, event `vc-open-cookie-settings`, `window.vcLoadAnalytics`; mounted once in `App.js`).
  - Restyled as a paper bar fixed to the bottom edge at every width, with a rule-strong top border, a mono "Cookies" label and two buttons of equal size and weight.
  - One line at 1024 px and above (56 px tall); up to three lines below (no more than 136 px at 390 px).
  - While open, it sets `--consent-h` on the root to its measured height; the page uses it for `scroll-padding-bottom` and a matching bottom padding on `body`, so no focused element is hidden behind the bar (WCAG 2.4.11), and the padding at the end of the page causes no layout shift.
  - "Details" expands the full notice upwards in place; focus stays on the button, which becomes "Hide details".
  - The header CTA is never covered.
  - It mounts after hydration, so it is never in the prerendered HTML.
  - Owner decision noted: consider switching `api_host` to `https://eu.i.posthog.com`; the PR 1 cookie notice, which states US processing, must then be updated to match.
- **NotFound.** SiteHeader and SiteFooter. Columns 3 to 7 hold the copy and chapter list; columns 8 to 12 hold HF-08 at 3:2. `document.title` is set, and the prerendered 404 carries `<meta name="robots" content="noindex">`.

---

## 6. Higgsfield asset list

### Protocol

- Before the first run, confirm per-model credit costs with the Higgsfield balance and model tools, and estimate the total for the list below from those costs. Generate stills in batches of two to four per subject.
- Stop at 1,500 credits pending owner review, whatever the estimate.
- Reject any output with:
  - faces or people;
  - garbled or legible text;
  - logos;
  - non-UK details (American utility poles, US-style fencing, wrong brick);
  - hard hats or hi-vis.
- The owner signs off every final asset.

### Grading and export (all stills)

- **Grade** to the palette: saturation about -30%, shadows towards #1A2550, highlights towards #F5F0E6, fine grain retained.
- **Export** WebP at q70 to 75 in 640, 960, 1440 and 1920 px widths, with a 24 px LQIP. AVIF is optional.
- **Name** every file under `frontend/public/media/`.

| id | Model | Aspect | Placement | Target file(s) |
|---|---|---|---|---|
| HF-01 | Higgsfield Soul | 1:1 | Site-wide paper grain | `media/texture-paper.webp` |
| HF-02 | Higgsfield Soul Location | 16:9 | Plate 3: case room poster (Chapter V) | `media/case-room-poster-{960,1440,1920}.webp`, `media/case-room-poster-portrait-640.webp` |
| HF-03 | Kling v3.0 (image to video from HF-02) | 16:9 | Case room ambient loop | `media/case-room-loop.webm`, `media/case-room-loop.mp4` |
| HF-04 | Higgsfield Soul Location | 21:9 | Plate 1: Chapter I band | `media/plate-site-{960,1440,1920}.webp`, `media/plate-site-portrait-{640,960}.webp` |
| HF-05 | Higgsfield Soul Location | 4:5 | Plate 2: Chapter II (1024 px and above) | `media/plate-archive-{640,960}.webp` |
| HF-06 | Higgsfield Soul | 4:5 | Plate 4: About, if no founder photograph | `media/plate-site-office-{640,960}.webp` |
| HF-07 | Higgsfield Soul | 3:2 | Demonstration plate | `media/plate-bundle-{640,960,1440}.webp` |
| HF-08 | Higgsfield Soul Location | 3:2 | 404 page | `media/plate-404-{640,960,1440}.webp` |
| HF-09 | Higgsfield Soul | 3:4 | EV-0144 scan (Lens fragment, SourceSheet) | `media/evidence-diary-p41-{240,480}.webp` |
| HF-10 | Recraft V4.1 | 1:1 | Icon sketches (redrawn by hand) | `media/_source/icons-sketch.svg` (not shipped; components in `src/components/icons/`) |
| HF-11 | Recraft V4.1 | 16:9 | Chapter VI linework at 6% | `media/linework-section.svg` |

### HF-01, paper grain

- **Prompt:** "Top-down macro photograph of a sheet of heavyweight uncoated archival paper in a warm parchment tone close to #F5F0E6, fine cotton fibres and faint laid lines, perfectly flat and evenly lit by diffuse north-window daylight, extremely subtle tonal variation, uniform across the whole frame, photographed on a copy stand with a 100 mm macro lens, high detail, suitable for a seamless tiling texture."
- **Negative:** "text, letters, numbers, marks, stains, folds, creases, shadows, vignette, objects, edges of the sheet, colour cast, dust specks, watermark"
- **Post:** Crop to 1024 px square. Make seamless (offset by 50% and heal the seams). Convert to greyscale. Export WebP q60 at 40 KB or less. Applied at 4% opacity with multiply blending.

### HF-02, case room still (Plate 3 and video poster)

- **Prompt:** "An empty meeting room in a London office on a wet winter evening, prepared for an adjudication: a long pale oak table with neat stacks of black lever-arch files with plain muted index tabs, a closed notebook and a fountain pen beside them, one brass desk lamp lit with a warm pool of light, a tall Georgian sash window behind with rain on the glass and softly blurred city lights beyond, deep navy shadows and warm lamplight, calm and serious, symmetrical composition, restrained editorial interior photography, 35 mm lens, eye level, fine grain."
- **Negative:** "people, faces, hands, silhouettes, text, legible labels, logos, signage, brand names, gavel, scales of justice, courtroom, wigs, gowns, hard hats, hi-vis, lens flare, HDR, oversaturated colour, clutter, coffee cups"
- **Post:** Grade. Export 1920, 1440 and 960 px WebP (1920 at 180 KB or less). Produce a 4:5 mobile crop centred on the files and lamp (640 px at 60 KB or less). The band sits under a `rgba(14,22,48,0.72)` overlay. Alt: "Illustrative image: an empty meeting room with bundles on the table on a wet evening."

### HF-03, case room loop

- **Model and source:** Kling v3.0, image to video from the approved HF-02. 6 s, 16:9.
- **Prompt:** "Locked-off camera with no camera movement at all. Rain runs slowly down the window glass, and the blurred city lights beyond shift very gently through the water on the glass. The desk lamp stays perfectly steady. Nothing else in the room moves. No one enters. The lighting stays constant throughout."
- **Negative:** "camera motion, zoom, dolly, pan, push-in, shake, cuts, flicker, flashing, strobing, light changes, lightning, people, hands, text, morphing objects"
- **Post:**
  - Trim, then build a seamless loop by crossfading the tail over the head:
    `ffmpeg -i src.mp4 -filter_complex "[0:v]scale=1280:-2,split[x][y];[x]trim=1:6,setpts=PTS-STARTPTS[m];[y]trim=0:1,setpts=PTS-STARTPTS[h];[m][h]xfade=transition=fade:duration=1:offset=4,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart case-room-loop.mp4`
  - Then produce WebM: `-c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1`.
  - Output is 5 s, 1280 × 720, with no audio. MP4 at 1.8 MB or less, WebM at 1.5 MB or less.
  - Verify there are no flashes (WCAG 2.3.1).
  - Poster: HF-02 at 1440 px.

### HF-04, residential frame (Plate 1)

- **Prompt:** "A mid-rise residential building under construction in an English town on an overcast morning: a concrete frame, the lower floors already clad in pale buff brick slips, the upper floors showing bare slab edges with cladding support rails fixed, a mast climbing work platform parked at the base, a tower crane jib crossing the top of the frame, a row of Victorian brick terraced houses softly out of focus in the foreground, flat soft light, muted desaturated colour with cool navy shadows and pale warm highlights, long-lens compression, documentary editorial photography, fine grain."
- **Negative:** "people, faces, workers, text, signage, hoarding graphics, logos, brand names, hard hats, hi-vis, vehicles with markings, American utility poles, US-style chain-link fencing, dramatic sky, sun flare, HDR, drone view"
- **Post:** A 21:9 crop for desktop (1920, 1440 and 960 px; 1920 at 200 KB or less) and an art-directed 4:5 crop for mobile (640 and 960 px). Alt: "Illustrative image: a residential frame under construction, its façade partly clad."

### HF-05, archive aisle (Plate 2)

- **Prompt:** "A quiet records store in the basement of a UK construction company: a long aisle of grey steel shelving holding rows of plain buff cardboard archive boxes and dark navy lever-arch files with blank white spine labels, one box pulled slightly forward on the nearest shelf, cool overhead light falling away into shadow at the far end with a small warm pool of light, concrete floor, orderly and calm, muted palette of navy, grey and parchment, shallow depth of field, eye level, 35 mm lens, fine grain."
- **Negative:** "people, faces, text, legible labels, numbers, logos, brand names, safety signage, painted floor lines, clutter, fluorescent flicker, HDR"
- **Post:** A 4:5 crop (640 and 960 px; 960 at 90 KB or less). Loaded only at 1024 px and above. Alt: "Illustrative image: an aisle of archive boxes and lever-arch files."

### HF-06, site office desk (Plate 4, fallback only)

- **Prompt:** "Still life on a plain plywood desk in a construction site office: an open hardbound A4 site diary with soft pencil handwriting too small and blurred to read, a short stack of printed emails held by a black bulldog clip, a steel rule and a pencil, soft window light from the left, restrained editorial still life photography, parchment and navy palette, shallow depth of field, fine grain."
- **Negative:** "people, hands, faces, legible text, legible handwriting, numbers, logos, hard hats, hi-vis, mugs, laptop brand marks, phones, clutter"
- **Post:** A 4:5 crop (640 and 960 px; 960 at 90 KB or less). Alt: "Illustrative image: a site diary and printed correspondence on a desk."

### HF-07, bundle (demonstration plate)

- **Prompt:** "Overhead still life of a thick lever-arch legal bundle with a row of plain index tabs in muted cream, sage and dusty blue, resting on a dark navy leather desk surface, a small brass bulldog clip and a black fountain pen beside it, a length of faded pink legal ribbon tied around a folded document, soft directional light from the top left, restrained editorial photography, fine grain."
- **Negative:** "text, letters, numbers on tabs, logos, people, hands, gavel, scales, glare, clutter, oversaturated pink"
- **Post:** A 3:2 crop (640, 960 and 1440 px; 1440 at 150 KB or less). Alt: "Illustrative image: a tabbed bundle tied with legal ribbon."

### HF-08, gap in the shelf (404)

- **Prompt:** "A long steel archive shelf of plain grey box files with one conspicuous empty gap in the middle of the row, soft overhead light, quiet and slightly wry, muted navy and parchment palette, editorial photography, 35 mm lens, eye level, fine grain."
- **Negative:** "people, text, legible labels, numbers, logos, clutter, dramatic lighting"
- **Post:** A 3:2 crop (640, 960 and 1440 px). Alt: "Illustrative image: a gap in a shelf of archive boxes."

### HF-09, site diary scan (EV-0144)

- **Prompt:** "A flat, evenly lit scan of a single page from a handwritten UK construction site diary: pale ruled paper, a printed empty date box at the top, several lines of loose blue ballpoint handwriting that is deliberately illegible, a small pencil sketch of an L-shaped wall bracket in the margin, the page very slightly skewed on a white scanner bed, realistic paper texture."
- **Negative:** "legible words, legible numbers, names, dates, logos, stamps, signatures, faces, coffee stains, photographs"
- **Post:** A 3:4 crop (240 and 480 px, 30 KB or less). Code overlays the fictional OCR text. Always labelled "illustrative". Alt: "Illustrative image: a scanned page from a site diary."

### HF-10, icon sketches

- **Prompt:** "A cohesive set of twelve minimal monoline vector icons arranged in a 4 by 3 grid on a transparent background, each on a 24 by 24 grid with a uniform 1.5 px stroke, round caps and joins, single colour #1A2550, precise and sober legal-document style: 1 an open archive box holding envelopes; 2 three small message rectangles joined by one vertical thread line with branch nodes; 3 a document whose lower third folds into a single line; 4 two overlapping pages with the rear page struck through; 5 a page with a horizontal scan line and four corner brackets; 6 a folder with a circle and slash; 7 a circular lens over a vertical timeline with dots; 8 a small rectangle chip with a pencil; 9 a document with a small superscript numeral marker; 10 a bound stack of pages with three index tabs; 11 two facing columns of lines joined by short connectors; 12 a hexagonal seal containing a tick with a long rising right stroke."
- **Negative:** "fills, gradients, shading, 3D, text, letters, numbers, colour other than #1A2550, drop shadows"
- **Post:** Sketches only. Redraw each glyph by hand to exact 24 px geometry at 1.5 px stroke to match lucide, use `currentColor`, run SVGO, and write React components to `src/components/icons/`. The sketch file is not shipped.

### HF-11, section linework

- **Prompt:** "Minimal vector line drawing in architectural drafting style: a vertical section through a concrete slab edge with a cladding support bracket and rail, structural grid lines and dimension ticks, single-weight hairlines only, navy #1A2550 on a transparent background, generous empty space, precise and quiet."
- **Negative:** "text, numbers, letters, dimensions with figures, shading, fills, hatching, colour"
- **Post:** Recolour the strokes to #BF9B58 and run SVGO (30 KB or less). Place at 6% opacity, `aria-hidden`, at 1024 px and above.

---

## 7. SEO and social

### Head (`public/index.html`, static, so previews work without JavaScript)

- `<html lang="en-GB">`
- `<title>VeriCase | Evidence and chronology for construction disputes</title>`
- `<meta name="description" content="The pre-litigation evidence workspace for UK construction disputes: project email turned into a cited chronology, cited answers and numbered bundles.">`
- `<link rel="canonical" href="https://veri-case.com/">`
- `<meta name="theme-color" content="#1A2550">`
- Preload the two font files. Remove the Playfair link and the CRA placeholder comments. Keep the PR 1 consent-gated PostHog stub, which sends nothing before consent, and add `disable_session_recording: true` to the options passed to `posthog.init` in `vcLoadAnalytics`.

### Open Graph and Twitter

- `og:type` website · `og:site_name` VeriCase · `og:locale` en_GB · `og:url` https://veri-case.com/
- `og:title` "Years of project correspondence. One cited chronology."
- `og:description` "Project email in order, questions answered with numbered citations, sources bundled. For construction solicitors, counsel, experts and claims teams." (148 characters)
- `og:image` https://veri-case.com/og-image.png (1200 × 630) · `og:image:alt` "VeriCase: three dated entries of project correspondence under the Chronology Lens, each with an exhibit reference."
- `twitter:card` summary_large_image, with the same title, description and image.

### OG and Twitter card (rendered from HTML, not AI)

`frontend/og/og.html` is rendered by `scripts/render-og.mjs` with Playwright at 1200 × 630 into `public/og-image.png` (300 KB or less). Composition:

- parchment ground with the HF-01 grain at 4%;
- top left, "Records, records, records." in Newsreader italic azure at 40 px with a brass hairline beneath;
- the H1 in Newsreader 500 navy at 60 px across the left 60%;
- right third, a miniature Lens: three timeline rows (mono dates 03 March 2025, 12 March 2025 and 28 March 2025; serif excerpts; EV stamps) behind a vertical azure lens band with brass bezel ticks;
- bottom left, the positive logo SVG at 40 px;
- bottom right, "veri-case.com" in Plex Mono.

It must read as one cited exhibit at thumbnail size.

### Favicon and manifest (from the logo mark, never AI)

- Hand-trace the swoosh "V" from `LOGOTOBEUSED.png` (Figma or Illustrator; potrace output cleaned by hand). The same trace produces `logo-positive.svg` (azure #2D78B7 "V" and "eri", navy #1A2550 "Case"), `logo-reversed.svg` (azure-300 #9CC4EA and parchment) and `logo-mark.svg` (the "V" alone, for the header below 360 px), replacing the placeholder `vericase-logo.svg`.
- `favicon.svg`: the "V" in #2D78B7 on transparent, with an internal `@media (prefers-color-scheme: dark)` fill of #9CC4EA.
- `favicon.ico` (16, 32 and 48 px) and `favicon-32.png`.
- `apple-touch-icon.png`: 180 px, the "V" on a parchment square.
- `icon-192.png` and `icon-512.png`.
- `site.webmanifest`: `name` VeriCase, `theme_color` #1A2550, `background_color` #F5F0E6.

### Structured data (JSON-LD in index.html)

- `Organization`: `legalName` VeriCase Ltd, `url`, `logo` (/logo-positive.svg), `email` enquiries@veri-case.com, `founder` Person "William Rogers", `identifier` PropertyValue (Companies House, 14789532), `address` {{REGISTERED_OFFICE}}. No `sameAs` until real profiles exist.
- `SoftwareApplication`: `name` VeriCase, `applicationCategory` BusinessApplication, `operatingSystem` Web. No ratings, reviews or offers.
- `FAQPage`: generated from the In brief questions, excluding any question whose answer is a token.

(`Organization` is the schema.org type name and keeps its standard spelling.)

### On-page and crawl

- One H1. The chapter H2s carry the search language naturally: construction dispute chronology, evidence, claims, rebuttal, adjudication, JCT notice.
- Every figure has a prose summary in the static markup, so the argument is indexable without the demonstrations.
- Descriptive alt text.
- Prerendered `/` and `/404.html` (section 5.0).
- `public/robots.txt` allows all and names the sitemap. `public/sitemap.xml` lists the home page and `/cookies`.
- Target queries: construction dispute chronology software; PST email review for construction claims; adjudication evidence preparation; responding to an adjudication Response; JCT clause 2.24 notice evidence; evidence bundle manifest with hashes.

---

## 8. Acceptance checklist for the build

### Visual QA at 390, 768, 1024, 1280 and 1440 px (Chrome, Safari and Firefox; also 320 × 568, 390 × 667 and 1280 × 720)

- [ ] **First viewport at 390 × 844** shows all of the following without scrolling: header (56 px) with "Book a demonstration", masthead, eyebrow, H1, subhead, CTA and microcopy, fast path. At 1440 × 900 the Lens frame is also visible in full; the practitioner strip may fall below the fold.
- [ ] **No horizontal page scroll** at any width, including 320 px. Wide tables become cards below 768 px.
- [ ] **Header** is a single band (64 or 56 px). The five links appear from 1280 px without wrapping; from 640 to 1279 px the labelled Contents button replaces them; below 360 px the logo is the mark alone. The Contents sheet opens, traps focus, closes on Escape and on link selection, and moves focus to the target heading. On `/cookies` and the 404 page every anchor resolves to the home page section.
- [ ] **Lens.**
  - Mid state at first paint.
  - Drag works with mouse, touch (vertical scroll still works) and keyboard (Arrows, Home, End, PageUp, PageDown).
  - The autoplay glide runs once and stops on interaction. Pause works. The control reads "Play" at rest.
  - Mobile cast of seven fragments and five rows, with the mobile summary, tray and footer.
  - Row positions never shift, and the figure height is fixed per breakpoint.
- [ ] **Masthead** settles in 1.2 s or less. The text is legible in both start and end states. The sweep crosses the whole line and never causes horizontal scroll.
- [ ] **Research.** Chips assemble. Every chip editor works by keyboard. Run plan updates findings, counts, the hidden marker and the summary deterministically (for example, the 01 March 2025 to 20 March 2025 preset gives "3 findings fall outside the plan"). Every citation opens the correct source in the Sheet (right on desktop, bottom on mobile) with previous and next. Create bundle shows the nine fields and the stamp. Question C shows the guard only if it is confirmed.
- [ ] **Case room.**
  - The ink cut is marked "Case time".
  - The day grid fills to 14, 21 and 28 as stations enter view, and shows Days 29 to 42 as the extension.
  - Accept, Edit and Reject work by keyboard, and the citation guard fires on a reply with no citation.
  - The video loads only at 1024 px and above, without reduced motion or Save-Data, with a working pause control that stays paused, and the poster as fallback.
- [ ] **Hash check** shows "Match" on load, "Does not match" after one character changes (with the changed character underlined in the diff line), and "Match" again after Reset. It works over https and shows the fallback over http. The manifest row for EV-0138 shows the same digest.
- [ ] **Images and video** sit in aspect-ratio boxes with LQIP. No image is above the fold on mobile. Plate 2 and the case-room video load only at 1024 px and above.
- [ ] **Cookie bar** never covers the header CTA at any size, and leaves the hero CTA uncovered at 390 × 844 and 1440 × 900. Allow and Reject are of equal size and weight. Cookie settings in the footer reopens it. With the bar open, tabbing through the page never leaves the focused element hidden behind it.
- [ ] **404** renders on an unknown path with HTTP 404 from the host.

### Accessibility (WCAG 2.2 AA)

- [ ] axe-core (`@axe-core/playwright`) reports 0 violations on `/`, `/cookies` and `/404`, in the default state and with every demo in its final state.
- [ ] Lighthouse Accessibility score of 100.
- [ ] Every contrast pair in 4.1 is met in the build. No informative element uses `--vc-rule`. Focus rings are visible on every ground (azure-500 on light and on paper panels inside dark grounds, azure-300 on ink and navy). No navy heading renders on a dark ground.
- [ ] Keyboard-only walkthrough of the whole page. Focus is never obscured by the sticky header or the consent bar (2.4.11). Targets are at least 24 × 24 px (2.5.8), 44 px on touch.
- [ ] Every control's accessible name contains its visible label (2.5.3): the Lens handle, superscript citations, note markers and back-links.
- [ ] Footnotes and citations open on click or Enter, persist, and can be dismissed (1.4.13). The Notes panel holds all note content.
- [ ] Anything moving for more than 5 s has a pause control (2.2.2). There are no flashes (2.3.1).
- [ ] NVDA with Firefox and VoiceOver with Safari (iOS at 390 px and macOS at 1440 px): figures announce their summaries, live regions speak once per change, the Lens slider's valuetext reads correctly for the visible cast, and tables have captions.
- [ ] Zoom to 200% and 400% with reflow and no loss of content.
- [ ] `prefers-reduced-motion: reduce`:
  - the masthead is squared and the Lens is at stage 5 from first paint, with the slider's value reporting stage 5 once the controller loads;
  - there is no autoplay, video or smooth scrolling;
  - every demo is still operable.

### Performance (mobile, simulated 4G, mid-tier Android; plus one real low-end device)

- [ ] LCP under 2.5 s (masthead or H1). CLS under 0.05. INP under 200 ms (the Lens drag and the hash typing). TBT under 200 ms.
- [ ] First-view transfer is 400 KB or less, excluding lazy images and video: JS 170 KB or less gzip, CSS 25 KB or less, fonts on first view 180 KB or less (two preloaded files).
- [ ] framer-motion is absent from the initial chunk. Demo chunks mount within 600 px of view.
- [ ] Lighthouse scores: Performance 90 or above (mobile), Best Practices 95 or above, SEO 100.

### Copy rules (automated: `scripts/lint-copy.mjs` from PR 1, extended, failing the production build; set `COPY_CHECK=warn` for staging)

- [ ] **No forbidden characters or placeholders** in `src/content/**` (including `.json`) or prerendered HTML text:
  - U+2014 (em dash);
  - U+2013 (en dash);
  - `{{`;
  - `[confirm]`.
- [ ] **Banned terms** (case-insensitive, with a small allowlist for the "What we do not claim" and FAQ sentences):
  - court-ready, court-admissible, admissible;
  - ISO 27001, blockchain, military-grade, CPR, win your case, guarantee, tamper-proof, proportionate;
  - Microsoft 365, Office 365;
  - delay analysis, critical path, Gantt, programme;
  - defence bundle;
  - compensation event, Engineer, SI-017 (in sample-matter data only).
- [ ] **No real names or places:** the restricted real matter, party and place names, which the copy check matches by SHA-256 digest (the list itself is not published).
- [ ] **No American spellings** (color, organize, analyze, center, program, defense) in text; code identifiers and schema.org type names are exempt.
- [ ] **Dates:** every day, month and year date in rendered copy matches `\b\d{2} (January|February|…|December) \d{4}\b`, or is a day and month inside an axis label with the year in its title. Month-and-year references ("March 2025") are allowed. Verbatim evidence text in `sampleEvidence.json` (such as the OCR line "Friday 21 March.") is exempt. Year ranges use a hyphen ("2025-26").
- [ ] **Footnotes:** every statistic has a NoteRef, and every NoteRef resolves to a note with a back-link.
- [ ] **Links:** no `href="#"`, no dead anchors (off the home page, anchors are `/#id`), no links to `/privacy` while its flag is false. The CTA is exactly "Book a demonstration" everywhere. Sign in resolves to https://app.veri-case.com/ui/login.html in the production build. No query-string tokens anywhere.
- [ ] **Footer legal line** matches 3.14 character for character. No VAT number. No social icons.
- [ ] **Hash test** passes: `sampleHashes.json` equals the digests recomputed from `sampleEvidence.json`.
- [ ] **No analytics before consent.** No PostHog network request before "Allow analytics" (verified in Playwright). Session recording is disabled. Demo panels carry `ph-no-capture`.

### Owner and legal gates (manual, before publication)

- [ ] **G1. JCT.** An owner with JCT expertise approves every contractual statement: matter card, ruler, Schedule 1 row 2, note 1, EV-0131, EV-0151, EV-0153, the Heads of Claim tree and paragraphs 1.2.1 to 1.2.3, the Research findings, the Response and Reply rows, and the "Façade Sub-Contractor" label.
- [ ] **G2. Legal summaries.** A practitioner approves Schedule 1 and notes 2 to 5 (particularly the NEC4 and FIDIC wording).
- [ ] **G3. Statistics.** A final source check of notes 6 to 8 against the primary documents: exact titles, dates and scope.
- [ ] **G4. Benchmarks.** {{BENCHMARK_NOTE}} is completed for notes 9 and 10, including the definition of "document" and which dates were measured. Otherwise both figures are removed.
- [ ] **G5. Product confirmations.**
  - the broad-question guard (keep Question C or delete it);
  - what the validation badge checks;
  - what the manifest hash covers, and whether it is SHA-256 (otherwise relabel "Hash");
  - that Rebuttal Mode enforces citations on user edits;
  - that automatic replies are set aside as noise (otherwise N-1 becomes a second near-duplicate and its chip changes);
  - that Show Noise in File Manager reveals attachments such as signature images;
  - ZIP ingestion (add to the copy only if confirmed);
  - demonstrations on the prospect's own material;
  - the equity sentence, wherever it appears.
- [ ] **G6. United Infrastructure.** {{UI_CASE}} is supplied in the party's own factual terms, with documentary substantiation on file. No adjudication confidentiality obligation is breached. No EOT or delay-analysis language. The declaration precedes the account.
- [ ] **G7. Company.** {{REGISTERED_OFFICE}} is supplied. Company number 14789532 is checked at Companies House.
- [ ] **G8. Data.** {{DATA_POLICY}} is supplied, or the question is deleted. The owner decides on the PostHog host (EU or US), and the cookie notice states it correctly. The owner also decides whether a privacy notice is needed before launch (analytics data and enquiry emails are personal data under the UK GDPR); if so, it is published and `SITE.legalPages.privacy` is set to true.
- [ ] **G9. Names and resemblance.** "Example Contractor Ltd", "Example Employer Ltd", "Example Agency LLP", "Example Façades Ltd", "Example Fixings Ltd" and "Project Birch" are checked against Companies House and planning records. The owner confirms that the sample matter (building type, the bracket Change, the dates in March and April 2025 and the adjudication dates in 2026) resembles no live or past matter of the founder, Quantum Commercial Solutions or United Infrastructure. No old asset from `/assets` or `public/` (including the old Chronology Lens images and `ChronoLensVertical.jpg`) is in the build.
- [ ] **G10. Imagery.** The owner approves each Higgsfield asset against the rejection list in section 6.
- [ ] **G11. Attribution.** If the Abrahamson attribution is verified, add a note and name him in Chapter I. Until then, the masthead and the "It is often said" sentence stay unattributed.
- [ ] **G12. Typeface.** The owner accepts Newsreader, or selects the Playfair continuity fallback in 4.4.

---

## Critic's notes

- 4.7: removed the one em dash in the spec (in the list of text-glyph bullets), now "the check mark U+2713 and the em dash U+2014".
- Conventions: U+2013 is banned outright, matching the CI rule.
- 1: "Every sentence" on the page now reads "Every claim about the product, the law or the industry", since brand lines and headings are none of the three kinds.
- 1 and 3.6: "every statement carries a numbered citation" became "each finding carries a numbered citation" (an absolute claim about the live product).
- 1, steer table row 6: removed the untrue claim that in-page CTAs are "never more than two chapters apart" (hero to Chapter III is three); now lists where they sit.
- 1, steer table row 3: added File Manager with Show Noise and Chronology Lens Create Bundle to the live feature list.
- 1, must-fix table: sticky row now uses scroll-padding (not an extra 80 px scroll-margin) and covers the consent bar.
- 1, must-fix table: contrast row adds the `.on-ink` and `.on-paper` scopes.
- 1, must-fix table: "No designed forms" clarified; the Create bundle dialog is local state with no form action.
- 1, must-fix table: PostHog wording corrected (`ph-no-capture` excludes panels from autocapture; recording disabled in init), replacing "autocapture: false for these".
- 1, build notes: JCT review now covers paragraphs 1.2.1 to 1.2.3, the Research findings and the Sub-Contractor label.
- Throughout: "Façade Subcontractor" became "Façade Sub-Contractor", following JCT's hyphenated usage (checked under G1).
- 2 and 4.2: removed `[id]{scroll-margin-top:80px}`, which added to `scroll-padding-top` and doubled the offset to 160 px.
- 2 and 5.9: the five header links now start at 1280 px, because at 1024 px they need about 930 of 944 px and would wrap; 640 to 1279 px uses the labelled Contents button.
- 2: below 360 px the logo becomes the V mark, because at 320 px (and at 400% zoom) the header overflowed (WCAG 1.4.10).
- 2 and 5.9: off the home page, anchors are written as `/#id`, so links on `/cookies` and the 404 page are not dead.
- 2: chapter headings take `tabIndex={-1}` so that the Contents sheet can move focus to them.
- 2, Routes: `/cookies` already exists from PR 1, so it is now restyled and linked with the flag set true; it was wrongly listed as not created.
- 2, Routes: `NotFound.jsx` already exists from PR 1, so it is "rewritten", not "new".
- 2 and 5.0: CookieConsent and Toaster are already mounted in `App.js`, so they are removed from the LandingPage composition to avoid a second banner.
- 2: ExternalRedirect's teal spinner is restyled, so no teal survives.
- 3.3: the practitioner-strip equity line now carries [confirm], matching Body 2 and G5.
- 3.3: hero subhead "test every point" became "test each point".
- 3.3: Lens handle aria-label is now "Drag the Lens", so it matches the visible label (WCAG 2.5.3).
- 3.3: stage valuetexts reworded so they are true for both casts (the mobile cast has no OCR page or automatic reply).
- 3.3: screen-reader summary, tray and footer now have mobile variants; the mobile footer gains "4 parties" for parity.
- 3.3: the play control starts as "Play" at rest instead of showing "Pause" before anything moves.
- 3.3 and 3.17: EV-0147 is recorded as the supplier's 26 March confirmation forwarded by the Façade Sub-Contractor, and Lens entry 5 names that route.
- 3.3: the automatic-reply chip is marked subject to G5, because noise treatment of auto-replies is not a confirmed feature.
- 3.4: "Construction disputes run to fixed timetables" softened to "Many construction disputes".
- 3.4: "VeriCase puts the record in order" became "helps you put the record in order" (outcome-guaranteeing).
- 3.4: the point in issue now uses the full test, "is being or was likely to be delayed", and says the date "is therefore decisive".
- 3.4, Schedule 1 JCT row: now states the Contractor's duty to give written notice forthwith about the progress of the Works, and that the effect of late notice depends on the contract "including any amendments".
- 3.4, Schedule 1 HGCRA row: added "after referral" to the parties' agreement to a longer period.
- 3.4, Schedule 1 NEC4 row: tightened to awareness "that it had happened".
- 3.4, Schedule 1 Limitation row: added "(England and Wales)".
- 3.4: the 72% entry now carries "central government only", as the approved scope requires.
- 3.5: fail line softened ("can sit", "can be buried"), and "duplicates" became "near-duplicates" for accuracy.
- 3.5: the Show Noise description is limited to attachments (such as signature images), matching the live File Manager.
- 3.5: the Cards or Table item adds Create Bundle; the Plate 2 caption "usually kept" became "often kept".
- 3.5 and 5.4: Fig. 3 now has Chronology Lens and File Manager tabs; Show Noise moves to File Manager with attachment counts that sum to 146; the auto-reply noise row is removed; Create bundle is added to the toolbar.
- 3.5: the filter marker is templated and shown only when a filter hides entries.
- 3.6: fail line softened ("can arrive").
- 3.6: the Report A summary no longer cites EV-0131 (the 03 March instruction) as evidence for 12 March.
- 3.6: finding 5 now matches EV-0147; finding 6 says "identifying the Change as a Relevant Event", as the record does.
- 3.6: the hidden-findings marker and live counts are templated; the fixed "2 findings" and "4 sources" were wrong for every preset (the 20 March preset hides 3).
- 3.6: added prepared summaries per preset, plus a fallback line for other plan combinations.
- 3.6: defined Question C's report and its counts after the guard is satisfied.
- 3.6: the bundle "Court" value "Adjudication (statutory)" became "Statutory adjudication".
- 3.6: the Create bundle note now says typed values stay on the page.
- 3.6: the stamp is written in sentence case and set in capitals by CSS, so the date rule and screen readers handle it.
- 3.6: every bundle index row now shows Tab 1 (only the first row had a tab value).
- 3.7: "1.3 The Employer's response" became "1.3 The Employer's position of 04 April 2025", so it is not confused with the adjudication Response.
- 3.7: paragraph 1.2.3 is recast to match EV-0147 (the supplier confirmed; the Sub-Contractor passed it on).
- 3.7 and 5.6: discussion is now anchored to the document, not to a passage, which is what the live product supports; the recover line, the item, Fig. 6 and its caption are updated to match.
- 3.7: the EV-0153 finder entry names the Commercial Manager, as in the record.
- 3.8: the Plate 3 caption "prepared for a hearing" became "with the bundles", since adjudications rarely have hearings.
- 3.8: fail line softened ("risk being answered thinly").
- 3.8: the day-grid note and text equivalent add "after referral" and "if both parties agree".
- 3.8: the accepted-row audit line became "proposed text retained" (nothing was edited).
- 3.8: the Reply after edit now says a delivery date was "first given to the Contractor", which is precise for a forwarded email.
- 3.8: "Defence bundle" replaced by a neutral description of the export, since the Referring Party's Reply is not a defence; the term is also added to the CI banned list.
- 3.8: the Day 28 card "with every point cited" became "with each point cited to its source".
- 3.9: fail line softened ("can go missing"); the manifest "accounts for every item" became "listing each item".
- 3.9: the hash note now says the demonstration uses SHA-256 and that typed text stays in the browser ("Nothing is sent to us" was too broad).
- 3.9: added a "Changed characters" diff line, because a textarea cannot underline parts of its text; the live region now speaks only when the state changes.
- 3.9: "can always be compared" became "can be compared"; "never in the browser" became "not in the browser".
- 3.10: the ingestion line uses "near-duplicates" and mentions File Manager; the Lens line adds Create Bundle; the Rebuttal line drops "defence bundle".
- 3.11 and 3.12: plate captions are now numbered in page order, so a founder photograph does not leave a gap in plate numbers.
- 3.13: the Notes intro no longer claims that "every superscript" links there (product citations open the Source sheet).
- 3.13, note 1: added the particulars-and-estimate limb of clause 2.24 and the clause 2.25 test, without citing sub-clauses and without EOT language.
- 3.13, note 2: cites s 108(2)(c) and (d), matching `stats.js`.
- 3.13, note 3: tightened to awareness "that it has happened".
- 3.13, note 5: cites s 8(1) and adds England and Wales.
- 3.13, note 7: "on which HKA was engaged" became "investigated by HKA", the approved wording.
- 3.13, note B: now covers the AI-generated EV-0144 diary scan.
- 3.13: back-link aria-label now contains its visible text ("Back to text, note n").
- 3.14 and 2: footer Cookies column gains "Cookie notice" (the page exists); the privacy flag stays false.
- 3.15 and 5.9: the consent panel is now a compact bottom bar at every width, because the 360 px bottom-left panel covered the hero CTA at 1440 × 900; Details expands the full notice.
- 3.15 and 5.9: the bar reserves its height through `--consent-h` (scroll padding and body padding), so it never hides a focused element (WCAG 2.4.11).
- 3.15: buttons keep their full labels, "Allow analytics" and "Reject analytics".
- 3.16: 404 contents links use `/#id`.
- 3.17: EV-0147 now includes the dated supplier message (26 March 2025, 10:58) that supports "the supplier confirmed on 26 March".
- 3.17: EV-0151 adds that particulars and an estimate will follow as soon as possible, which a clause 2.24 notice needs to be realistic.
- 3.17: N-1 is marked subject to G5.
- 3.17: the canonical EV-0138.eml adds the Cc line from the record, and the spec now states that the manifest row and the hash check share its digest.
- 4.1: added missing ratios (graphite on paper 6.59, azure-500 on paper 4.49, brass-700 on paper 6.06, signal on parchment-300 5.18) and marked azure-300 on paper (1.75) as never used.
- 4.1: noted that shadcn `--border` is decorative and `--input` is informative; brass-400 is for note markers on dark grounds; mist is never used over imagery.
- 4.2: added `.on-ink` (parchment text and headings, azure-300 ring, `--ring` override) and `.on-paper`; without them, headings would be navy on ink (about 1.2:1) and focus rings azure-300 on paper (1.75:1).
- 4.2: the masthead keyframes moved to index.css, because Tailwind drops keyframes that no `animate-*` class uses, so the masthead would never have animated.
- 4.2: `.slip` is now `inline-block`, because transforms do not apply to inline spans.
- 4.2: the masthead sweep element now spans the full line (a 26 px element moved only 26 px); the band starts and ends off-screen and is clipped to prevent horizontal scroll.
- 4.2: reduced motion now shows the masthead's final state from first paint instead of snapping after fonts load.
- 4.2: added the Lens cast media queries and the reduced-motion Lens rules; `data-user` moves to the figure so that the cite strip is covered.
- 4.3: removed the bespoke keyframes from the Tailwind config (now in index.css).
- 4.4: label and eyebrow capitals are set by CSS; brass-400 on dark grounds is added for labels and note markers; self-hosting rationale corrected to "no third-party font request is made".
- 4.5, motif 7: clarified that NoteRef and EvidenceChip are two components sharing one style, which removes a contradiction with the file map.
- 4.5, motif 12: added icon grids to "Never used".
- 4.6: figure width corrected to 588 px (columns 7 to 12 of a 1200 px content area, not 620 px).
- 4.6: the hero is exempt from the 128 px section padding, so that the first-viewport checks can pass.
- 4.6: plate numbers are assigned in page order.
- 4.7: bespoke icons appear only in ruled lists, never as tile grids.
- 4.8: the HF-09 scan is recorded as the one AI-generated element inside a mock, which resolves the conflict with "never AI-generated".
- 4.9: the transform-and-opacity rule now lists its real exceptions (stroke-dashoffset, and Accordion and Collapsible height).
- 5.0: `stats.js` is to be aligned: the "2023/24" label and the HKA source wording.
- 5.0: the new dependencies are listed; framer-motion is not yet installed.
- 5.0: `site.js` now normalises a trailing slash on `REACT_APP_APP_URL`, and CI checks that Sign in resolves to https://app.veri-case.com/ui/login.html.
- 5.0: `SITE.legalPages.cookies` is set to true.
- 5.0: extends PR 1's `scripts/lint-copy.mjs` instead of adding a second checker (`check-copy.mjs`).
- 5.0: removed the `Benefits` and `ValuePropositions` deletions (those files do not exist).
- 5.0: added `public/ChronoLensVertical.jpg` (an old lens image) and the other legacy logos to the deletions.
- 5.0: `pages/Cookies.jsx` and `pages/NotFound.jsx` must swap Navigation (deleted) for SiteHeader.
- 5.0: added `FileManagerMock.jsx` and `logo-mark.svg`; `ChapterHeader` headings take focus.
- 5.1: NoteRef gets `aria-label="Note n"` and popover semantics; superscript citations get names that begin with the visible numeral.
- 5.1: `disable_session_recording: true` belongs in `vcLoadAnalytics` in index.html.
- 5.1: demonstration inputs sit outside any form.
- 5.2: the aspect ratio now applies to the Lens field only, because bar, rail, cite sentence and rows could not fit a 5:4 or 4:5 frame; the cite sentence gets a fixed strip, and the mobile rail wraps.
- 5.2: the mobile cast is decided by CSS, not matchMedia, so the prerender and hydration match without layout shift.
- 5.2: the controller syncs `aria-valuenow` to the rendered stage (stage 5 under reduced motion); added a `requestIdleCallback` fallback for Safari.
- 5.3: notice-ruler labels alternate above and below the axis so the 26 and 28 March pins (about 30 px apart) do not collide; pins are at least 24 px.
- 5.5: Create bundle has nine fields, seven Inputs and two Textareas (the spec said nine Inputs plus one Textarea, which is ten).
- 5.5: the guard uses `aria-disabled` with a description instead of a disabled, unfocusable button; live messages are templated.
- 5.6: replaced `role="tree"`, which needs the full tree keyboard model, with the disclosure pattern that was actually described.
- 5.7: the overlay contrast claim is corrected from "about 7:1" to "6.3:1 or better over pure white"; mist is barred over imagery.
- 5.7: the header band uses `svh`.
- 5.7: audit lines are graphite; "mist on paper" (about 1.8:1) contradicted its own parenthesis.
- 5.7: the video button uses a changing label without `aria-pressed`, and a visitor's pause is respected.
- 5.7: DayGrid empty cells get mist outlines (non-text contrast); the paper table and Day 28 card carry `.on-paper`.
- 5.8: the HashCheck textarea is styled for the ink panel (navy fill, parchment text, mist border).
- 5.8: the diff flash uses navy, because azure-50 behind parchment text would have been unreadable.
- 5.8: manifest full hashes are revealed by a toggle or copied, not "on focus" of a cell that cannot take focus.
- 5.9: the In brief ledger uses chapter numerals instead of icon tiles, to avoid the SaaS icon-grid cliché and add distinctiveness.
- 5.9: the Accordion uses `forceMount` so that answers really stay in the DOM.
- 5.9: the navy Demonstration panel and the footer carry `.on-ink`; the eyebrow on navy is brass-400.
- 6: the credit forecast ("well under half") is replaced by an estimate from confirmed per-model costs, keeping the 1,500-credit stop.
- 6: HF-02 alt text now matches the new Plate 3 caption.
- 7: the OG image alt now describes the static card, not an animation it cannot show.
- 7: session recording is disabled in the PostHog stub; the logo mark is added to the favicon set; the sitemap includes `/cookies`; noted that schema.org "Organization" keeps its standard spelling.
- 8: added 320 px and 1280 px to the QA widths, and header checks for wrapping, overflow and off-page anchors.
- 8: the 1440 × 900 first-viewport check no longer requires the practitioner strip, which cannot fit with the Lens.
- 8: Research QA now checks templated counts; hash-check QA checks the diff line and the manifest digest.
- 8: cookie QA is rewritten for the bottom bar and focus clearance.
- 8: added a label-in-name check, a check that no navy heading sits on dark grounds, and `/cookies` in the axe runs.
- 8: the copy-check script is renamed to `lint-copy.mjs` and extended to `.json`; added "defence bundle" and "defense" to the banned terms.
- 8: the date rule now exempts verbatim evidence text ("Friday 21 March.") and allows month-and-year references.
- 8, G1 and G5: widened JCT review; added confirmations that auto-replies count as noise and that Show Noise covers attachments.
- 8, G8: the PostHog host must match the cookie notice; the owner decides whether a UK GDPR privacy notice is needed before launch.
- 8, G9: the owner must confirm that the sample matter resembles none of the founder's or associated companies' matters; `ChronoLensVertical.jpg` added to the banned-asset check.
- Distinctiveness reviewed: the seven signature moments are product-true, keyboard-operable and have reduced-motion equivalents; the one generic pattern found (icon tiles in In brief) has been replaced; no other change was needed.