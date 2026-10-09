// Copy deck for the home page: "The Working Record". British English; dates as DD Month YYYY;
// no em or en dashes. Inline markup read by components/editorial/Rich.jsx:
//   [[note:n]]      numbered site note (brass superscript, opens a Popover, links to Notes)
//   [[ev:EV-0131]]  product citation chip that opens the fictional source in the Source sheet
//   *text*          italic
//   {{TOKEN}}       owner-supplied text; blocks a production build until supplied
// Items with a `gate` are governed by content/gates.js (open, confirmed or struck).

export const BRAND_LINE = 'Making time your ally, not your enemy.';
export const CTA_LABEL = 'Request a demonstration';
export const CTA_MICROCOPY = 'Opens an email to enquiries@veri-case.com. Please do not include confidential details of a live matter.';
export const CTA_MICROCOPY_SHORT = 'Opens an email. Please do not include confidential details of a live matter.';

// Chapters, in page order. Used by the Contents sheet, the footer and the 404 page.
export const CHAPTERS = [
  { id: 'top', numeral: '', title: 'Records, records, records.', sheetLabel: 'Cover', nav: null },
  { id: 'clock', numeral: 'I', title: 'The clock', nav: 'The clock' },
  { id: 'chronology-lens', numeral: 'II', title: 'The Chronology Lens™', nav: 'Chronology Lens' },
  { id: 'research', numeral: 'III', title: 'Just ask', nav: 'Ask' },
  { id: 'worked-example', numeral: 'IV', title: 'A report, then the bundle', nav: 'Bundles' },
  { id: 'case-room', numeral: 'V', title: 'Test the other side’s account', nav: 'Rebuttal' },
  { id: 'claims', numeral: 'VI', title: 'Develop the argument', nav: 'Develop the argument' },
  { id: 'integrity', numeral: 'VII', title: 'The record holds', nav: 'Integrity' },
];
export const HOME_NAV = [
  { id: 'platform', title: 'How it works', nav: 'How it works' },
  { id: 'worked-example', title: 'Reports and bundles', nav: 'Reports and bundles' },
  { id: 'collaboration', title: 'Collaboration', nav: 'Collaboration' },
  { id: 'about', title: 'About', nav: 'About' },
  { id: 'questions', title: 'Questions', nav: 'Questions' },
];

export const END_MATTER = [
  { id: 'platform', title: 'In brief' },
  { id: 'about', title: 'Who is behind it', nav: 'About' },
  { id: 'demonstration', title: 'Request a demonstration' },
  { id: 'notes', title: 'Notes' },
];

export const HEADER = {
  skip: 'Skip to content',
  logoAlt: 'VeriCase home',
  signIn: 'Sign in',
  contents: 'Menu',
  sheetTitle: 'Explore VeriCase',
  sheetDescription: 'How VeriCase works, preparing a case, the team and common questions.',
  endMatterLabel: 'End matter',
  close: 'Close menu',
};

export const COVER = {
  // The motto beside the heading (owner, 06 October 2026): "Records," and "records," then, where a
  // third "records" is expected, "VeriCase.", with the line typed patiently beneath it. It adapts
  // Abrahamson's three lessons, whose wording and source are checked in
  // docs/source-check-2026-09-25.md (item 10).
  motto: {
    // Set in italic within quotation marks (owner, 06 October 2026).
    open: '“',
    words: ['Records,', 'records,'],
    brand: 'VeriCase.',
    close: '”',
    // Typed in two lines (owner, 06 October 2026), with a comma where the owner wrote a dash,
    // which the house style does not use.
    lines: ['Making Time Your Ally,', 'Not Your Enemy.'],
    whole: '“Records, records, VeriCase.” Making Time Your Ally, Not Your Enemy.',
    attribution: 'Adapted from Max W. Abrahamson.',
    // The card's bar, and two illustrative notes floating beside it, as in the owner's reference.
    label: 'Records first',
    chips: [
      { title: 'Answer found', text: 'With its sources' },
      { title: 'Bundle ready', text: 'Indexed and numbered' },
    ],
    toPassage: 'Read the passage',
  },
  // Market-agnostic and simple (owner, 08 and 09 October 2026): for contractors, subcontractors and
  // any client, with search and quick questions to the evidence as the focal point.
  // The owner, 09 October 2026: "The Dispute Intelligence Platform was better."
  eyebrow: "The Dispute Intelligence Platform",
  // The reference headline the owner preferred (09 October 2026: "transforming compelling
  // arguments ... was better"), without "legal", so that it still speaks to any client.
  h1: "Transform complex evidence into compelling arguments.",
  h1Lead: "Transform complex evidence into",
  h1Emphasis: "compelling arguments.",
  // Search and quick questions stay the focal point (owner, 09 October 2026). Rewritten the same
  // evening after the owner found the first version "so basic": it opens on the reader's problem
  // (the facts are there, but buried), then the answer, then where it leads.
  lead: "The facts that win a dispute are already in your records, buried in years of emails and attachments. Ask VeriCase in plain English and get the answer with its source, ready for the report, the bundle or the claim.",
  heroSecondary: { label: 'See it answer a question', section: 'research' },
  heroMicrocopy: "We arrange it by email. Please bring sample material, not live client files.",
  practitionerProof: "Founded by construction claims and dispute resolution practitioners.",
  audience: "For contractors, subcontractors and commercial teams, and the consultants and advisers they work with.",
  fastPath: "Explore how it works",
  strip: [
    { label: 'Founded by practitioners', text: 'William Rogers MCIArb & Warren Kemp (Partner, gunnercooke): forensic quantum, claims and dispute resolution.' },
    {
      label: 'Owned in part by practitioners',
      text: 'Practitioners from law firms and claims consultancies hold equity in VeriCase Ltd.',
      gate: 'G5_equity',
    },
    { label: 'Before disclosure, not instead of it', text: 'VeriCase prepares the record and works alongside your disclosure platform.' },
  ],
  fig: {
    number: 1,
    bar: 'The Chronology Lens™ · Sample matter (fictional)',
    caption:
      'Fig. 1. The Chronology Lens™, illustrated with the sample matter. Names, message IDs and exhibit references are fictional. See note A.',
    summaryDesktop:
      'Illustration: nine items of fictional correspondence and records are threaded, stripped of quoted history and, where they are a near-duplicate, an automatic reply or another project’s email, set aside. Six remain and take their places in date order, each with a citation to its source.',
    summaryMobile:
      'Illustration: seven items of fictional correspondence are threaded, stripped of quoted history and, where they are a near-duplicate or another project’s email, set aside. Five remain and take their places in date order, each with a citation to its source.',
    handle: 'Drag the Lens',
    stages: ['Raw', 'Thread', 'Read', 'Set aside', 'Order', 'Cite'],
    valueText: [
      'Stage 0 of 5: the raw record, as received.',
      'Stage 1 of 5: threads rebuilt from message headers.',
      'Stage 2 of 5: quoted history folded, so each entry shows what its author wrote.',
      'Stage 3 of 5: items that do not belong in the review set are set aside.',
      'Stage 4 of 5: the remaining entries in date order.',
      'Stage 5 of 5: each entry cited to its source.',
    ],
    controls: { play: 'Play', pause: 'Pause', replay: 'Replay' },
    chips: {
      thread: 'Thread {n} · {count} messages',
      references: 'Threaded by References header',
      quoted: 'Quoted history folded ({n})',
      ocr: 'Scanned page read by OCR',
      attachment: 'Attachment extracted: {file}',
      placed: 'Placed in order: {date}',
    },
    trayDesktop: 'Set aside: 1 near-duplicate · 1 automatic reply · 1 other project',
    trayMobile: 'Set aside: 1 near-duplicate · 1 other project',
    cite: 'Notice was given on 28 March 2025 [[ev:EV-0151]]: sixteen days after the lead-time email [[ev:EV-0138]] and two days after delivery was confirmed [[ev:EV-0147]].',
    footDesktop: '6 entries · 4 parties · 3 set aside · 6 of 6 linked to source',
    footMobile: '5 entries · 4 parties · 2 set aside · 5 of 5 linked to source',
  },
};

export const CLOCK = {
  numeral: 'I',
  eyebrow: 'Chapter I · The clock',
  h2: 'Most disputes come down to what the record shows, and when.',
  lead:
    'Many construction disputes run to fixed timetables. Time is the commodity everyone is chasing. When a notice falls due or a referral arrives, the case is only as strong as the record you can find, read and cite in the time allowed. It is often said that the three lessons of construction disputes are records, records and records. The periods below show why.',
  fail: 'You need to build a factual chronology from tens of thousands of emails. The record exists, but it sits across mailboxes, custodians and years, in a form no one can read in order. Finding the relevant correspondence takes time.',
  recover: 'VeriCase puts the correspondence in order and links each entry to its source, so your team can examine what happened and prepare its analysis.',
  matter: {
    label: 'The sample matter (fictional)',
    title: 'Example Contractor Ltd and Example Employer Ltd',
    body:
      'A residential building let under the JCT Design and Build Contract 2016, with the Employer’s amendments. On 03 March 2025 the Employer’s Agent instructed a Change: stainless steel cladding brackets (type B) in place of aluminium brackets (type A) on Levels 3 to 6. The Contractor gave notice under clause 2.24 on 28 March 2025.[[note:12]]',
    issueLabel: 'The point in issue',
    issue:
      'In this fictional contract, clause 2.24 has been amended to make notice a condition precedent to a later Completion Date under clause 2.25. The Employer contends that notice was not given forthwith. The date on which it became reasonably apparent that progress was being or was likely to be delayed is therefore decisive.',
    foot: 'Every chapter below works from this matter. See note A.',
    gate: 'G1_jct',
  },
  ruler: {
    number: 2,
    title: 'When did delay become reasonably apparent?',
    axisTitle: 'March to April 2025',
    pins: [
      { date: '2025-03-03', label: 'Change instructed', ev: 'EV-0131' },
      { date: '2025-03-12', label: 'Lead time given', ev: 'EV-0138', flag: 'The Employer’s date' },
      { date: '2025-03-26', label: 'Delivery confirmed', ev: 'EV-0147', flag: 'The Contractor’s date' },
      { date: '2025-03-28', label: 'Notice under clause 2.24', ev: 'EV-0151' },
    ],
    brackets: [
      { from: '2025-03-12', to: '2025-03-28', label: '16 days to notice', style: 'solid' },
      { from: '2025-03-26', to: '2025-03-28', label: '2 days to notice', style: 'dashed' },
    ],
    line: 'Whether notice was given forthwith is for the adjudicator. The ruler shows only what the record says, and when.',
    caption: 'Fig. 2. Notice ruler for the sample matter. Dates only; this is not an analysis of delay. See note A.',
  },
  schedule: {
    title: 'Schedule 1: Time limits that do not wait for the record',
    heads: ['Period', 'Provision', 'Summary'],
    gate: 'G2_legal',
    rows: [
      {
        period: '28 days',
        provision: 'HGCRA 1996, s 108',
        summary:
          'An adjudicator must reach a decision within 28 days of referral, extendable to 42 days with the referring party’s consent, or longer if both parties agree after referral.[[note:13]]',
      },
      {
        period: 'Forthwith',
        provision: 'JCT D&B 2016, cl 2.24',
        summary:
          'The Contractor must give written notice forthwith when it becomes reasonably apparent that the progress of the Works is being or is likely to be delayed. Whether late notice bars a later Completion Date depends on the terms of the contract, including any amendments.[[note:12]]',
      },
      {
        period: 'Eight weeks',
        provision: 'NEC4, cl 61.3',
        summary:
          'A compensation event notified more than eight weeks after the Contractor became aware that it had happened is barred, subject to the exceptions in the clause.[[note:14]]',
        timeBar: true,
      },
      {
        period: '28 days',
        provision: 'FIDIC 2017, sub-cl 20.2.1',
        summary:
          'Notice of a claim is required as soon as practicable, and no later than 28 days after the claiming party became aware, or should have become aware, of the event or circumstance.[[note:15]]',
        timeBar: true,
      },
      {
        period: 'Six and twelve years',
        provision: 'Limitation Act 1980, ss 5 and 8',
        summary:
          'Six years for an action founded on simple contract; twelve years for an action upon a specialty, which includes a contract made by deed (England and Wales).[[note:16]]',
      },
    ],
    timeBarLabel: 'Time bar',
    foot: 'Summaries for orientation only. The statute and the contract govern; this is not legal advice. See note C.',
  },
  plate: {
    number: 1,
    caption: 'Plate 1. A residential frame with its façade under way. Illustrative image (computer-generated). See note B.',
    alt: 'Illustrative image: a residential frame under construction, its façade partly clad.',
    drawn: {
      caption:
        'Plate 1. Detail 7 of the façade drawings: a section at the slab edge through bracket type B, clouded as revision B. An illustrative drawing of the fictional sample matter. See note B.',
      alt: 'Illustrative drawing: a section through the slab edge of a residential frame, showing bracket type B, a stainless steel bracket fixed to the slab edge through the insulation to carry the rail and the rainscreen panel, clouded as revision B.',
    },
  },
  next: { label: 'Next: put the record in order', href: '#chronology-lens' },
};

export const LENS_CHAPTER = {
  numeral: 'II',
  eyebrow: 'Chapter II · The Chronology Lens™',
  h2: "Get it all in.",
  // The section reads as a journey: the issue (the problem, in the reader's world), the method
  // (what VeriCase does), the steps on the thread, and the line that introduces the example.
  issue: "The evidence is spread across mailboxes, attachments, drawings, spreadsheets and site photos, kept by different people.",
  method: "Upload it to one project in VeriCase. It is read, sorted and made searchable, so anyone on the team can find what they need.",
  steps: [
    {
      "title": "Upload everything",
      "text": "Mailboxes, individual emails and their attachments, PDFs, Word documents, spreadsheets and images. Scanned pages are read so that they can be searched too."
    },
    {
      "title": "Follow the correspondence",
      "text": "Threading and quoted-text handling help you tell a new reply from the history beneath it.",
      "gate": "G5_quoted"
    },
    {
      "title": "Cut the noise",
      "text": "Repeated messages are set aside in the working view, and you can check what was set aside."
    },
    {
      "title": "Find it fast",
      "text": "Search the text of every email and attachment, in date order, and narrow it by dates and keywords."
    },
    {
      "title": "Read each date for what it is",
      "text": "Compare the dates and the records behind them, so that a forecast is not taken for an instruction or a confirmation."
    },
    {
      "title": "Take the key records forward",
      "text": "Select the records the case will rely on, and keep them with the issue they concern."
    }
  ],
  leadIn: "Watch a site manager’s mailbox go in and come out ready to search, then a document read beside its file record.",
  plate: {
    number: 2,
    caption: 'Plate 2. The record as it is often kept. Illustrative image (computer-generated). See note B.',
    alt: 'Illustrative image: an aisle of archive boxes and lever-arch files.',
    drawn: {
      caption:
        'Plate 2. Sixteen months of correspondence across six mailboxes, with four pivotal exhibits highlighted. An illustrative drawing of the fictional sample matter; totals are illustrative. See note B.',
      alt: 'Illustrative drawing of the fictional sample matter: six custodian mailboxes from January 2024 to April 2025. Correspondence links the Employer, Design, Site, Commercial, Package and Supplier teams. Noise and near-duplicates are set aside. Four pivotal exhibits are highlighted in the dispute window of 03 March to 04 April 2025: EV-0131, EV-0138, EV-0147 and EV-0151.',
    },
  },
  fig: {
    number: 3,
    summary:
      'Illustration: the sample matter in the Chronology Lens workbench, with eight entries from four parties in date order, controls for view, date window, Smart Filter, excluded keywords and Create bundle, and a File Manager view of attachments by type with a Show Noise switch.',
    caption: 'Fig. 3. The Chronology Lens™ workbench and File Manager, illustrated with the sample matter. Counts are illustrative. See note A.',
  },
  next: { label: 'Next: a report, then the bundle', href: '#worked-example' },
};

export const RESEARCH = {
  numeral: 'IV',
  eyebrow: 'Chapter IV · Research',
  h2: "Ask your evidence.",
  issue: "You need one answer from thousands of emails. When did the client first ask for it? Did anyone confirm it? Who said what, and when?",
  // Executive Analysis (owner, 06 October 2026): questions and answers back and forth, each answer
  // with its sources and a confidence score. A focal point with search (owner, 09 October 2026).
  // No claim of completeness or accuracy.
  method: "Type a question in Executive Analysis, the way you would ask a colleague. VeriCase answers from your evidence, with its sources and a confidence score, and you can follow up straight away.",
  steps: [
    {
      title: 'Ask in plain English',
      text: 'No search terms to work out. Ask the question the way you would say it.',
      gate: 'G5_research',
    },
    {
      title: 'Follow up',
      text: 'Ask the next question, and the next, as you would with a colleague.',
      gate: 'G5_research',
    },
    {
      title: 'Check the source',
      text: 'Each answer lists its supporting evidence and a confidence score. Open the sources and read them yourself.',
      gate: 'G5_research',
    },
    {
      title: 'Note the gaps',
      text: 'Keep the records you need, and note what was not found.',
      note: 'Answers depend on the material in scope; they are not a complete account of events.',
    },
  ],
  leadIn: 'Watch two quick questions about early access to the nursery, answered from the evidence.',
  fig: {
    number: 4,
    summary:
      'Illustration: a plain-English question about the sample matter, the Query Plan derived from it and the resulting Analysis Report with six numbered citations. Each citation opens its fictional source. Create bundle adds the six cited items to a bundle.',
    caption: 'Fig. 4. Research, illustrated with the sample matter. The report, sources and bundle are fictional. See note A.',
  },
  cta: { line: 'See search and Executive Analysis on sample correspondence.' },
};

export const CLAIMS = {
  numeral: 'V',
  eyebrow: 'Chapter V · Reports and bundles',
  // Deep Research and bundles (owner, 06 and 09 October 2026): a full report on one question, and
  // Create bundle on it builds the bundle from the evidence it cites, the report on top; the PDF has
  // a cover sheet, an index and page numbers, and the report inside it.
  h2: "A full report, then the bundle.",
  issue: "Some questions need more than a quick answer. And the deadline still needs a bundle: every email found, put in order, numbered and indexed.",
  method: "Deep Research works through one question and writes a report with its sources. Create a bundle from it in one step: the report on top, every item it cites in order, a cover page and an index, ready to download.",
  steps: [
    {
      "title": "Ask for a full report",
      "text": "Deep Research works through the question and reports, with an executive summary and the sources it cites, ready to download as a PDF.",
      "gate": "G5_research"
    },
    {
      "title": "Create the bundle",
      "text": "Create bundle on the report gathers the evidence it cites, with the report itself on top.",
      "gate": "G5_research"
    },
    {
      "title": "Set the order",
      "text": "Drag items or use the arrows to change the order. The cover page always stays first."
    },
    {
      "title": "Download it",
      "text": "Fill in the cover page, choose how the pages are numbered, and download the PDF with its index."
    }
  ],
  leadIn: "Watch a report on a notice of delay, then the bundle built from it, as it downloads.",
  fig: {
    caption: 'Fig. 5. The claims builder, illustrated with the sample matter. See note A.',
    summary:
      'Illustration: the Heads of Claim for the sample matter, and the narrative for section 1.2 with each paragraph cited by exhibit reference.',
  },
  discussionFig: {
    caption: 'Fig. 6. A discussion anchored to a document, illustrated with the sample matter. Participants are shown by role, not as people. See note A.',
    summary: 'Illustration: a discussion among the legal team, anchored to the Site Manager’s email of 13 March 2025.',
  },
};

// Develop the argument: the section as it stood before PR #14 (Chapter V, "Claims builder"),
// restored on the owner's word of 09 October 2026. Drafting a claim or response from its records
// (product source E5, gate G5_claims), then a short report as exported.
export const ARGUMENT = {
  h2: "Develop the argument.",
  issue: "The narrative is drafted in one file and the evidence kept in another. By the fifth draft, which document does paragraph 5.2 rely on?",
  method: "Write the claim or response in VeriCase, with the records each paragraph relies on in the same workspace as the wording.",
  methodGate: 'G5_claims',
  steps: [
    {
      "title": "Structure the argument",
      "text": "Set out the points you need to establish, with a section for each."
    },
    {
      "title": "Find the evidence",
      "text": "Search the record for the section you are drafting, including material that tells against your position."
    },
    {
      "title": "Cite the record",
      "text": "Use source references to check each factual point against the record it rests on."
    },
    {
      "title": "Finalise the draft",
      "text": "Go through it with its source references, add any qualification it needs, then export it to Word or PDF, or share it."
    }
  ],
  leadIn: "Watch section 5 take shape beside its records, then see a short report as exported.",
};

// The collaboration section (owner, 06 October 2026; revised 09 October 2026 to the application as
// seen that day): a discussion on a single record, opened by mentioning someone on it, people from
// different organisations, tags, and the history kept with the record. Lanes were not seen in the
// application on 09 October 2026 and are no longer shown (owner's decision). Nothing here
// claims privilege protection, court-rule compliance, legal hold, audit trails or notifications.
export const COLLABORATION = {
  h2: 'Keep the discussion with the evidence.',
  issue: 'An email is forwarded to the commercial manager, then the consultant, then the expert, and the replies split into separate chains. Before long, no single inbox holds the whole conversation.',
  method: 'In VeriCase the conversation happens on the email or document itself, and the people who need it join there, each from their own organisation.',
  steps: [
    {
      title: 'Mention a colleague',
      text: 'Mention someone on an email or document and a discussion opens with them, on that record.',
      gate: 'G5_collab',
    },
    {
      title: 'Bring in the people who need it',
      text: 'Consultants, experts and advisers can join from their own organisations, with access agreed for each project. Nothing needs attaching or forwarding.',
      gate: 'G5_collab',
    },
    {
      title: 'Keep separate conversations apart',
      text: 'Use lanes to discuss the same record with different groups. Each lane is read only by the people added to it.',
      gate: 'G14_laneAccess',
    },
    {
      title: 'Tag what matters',
      text: 'Tag evidence as you go, so that the team can find it again by issue.',
    },
    {
      title: 'Come back to it later',
      text: 'The discussion stays with the record, so nothing has to be pieced together from old email.',
      gate: 'G5_collab',
    },
  ],
  leadIn: 'Watch an email tagged and discussed, then the same email discussed in separate lanes.',
  // What the email relay costs. The second and third figures come from a model (notes 2 and 3, the
  // rates verified by the owner on 06 October 2026) and are labelled as modelled on the page.
  statsName: 'What discussion by email costs',
  stats: [
    { figure: '117', text: 'emails a day: the average a worker receives in Microsoft’s data from its workplace software.[[note:1]]' },
    { figure: '6 emails', label: 'Modelled example', text: 'and 14 inbox deliveries in one modelled round of email about one document between a contractor, a solicitor (with a partner copied), counsel and two experts. In VeriCase, that round is one thread on the record.[[note:2]]' },
    { figure: 'About £18,300', label: 'Modelled cost, not a measured saving', text: 'of professional time on those rounds in one modelled adjudication of 120 rounds, and between about £22,900 and £137,400 over a dispute lasting two to three years.[[note:3]]' },
  ],
};

export const CASE_ROOM = {
  numeral: 'III',
  kicker: 'Project time ends. Case time begins.',
  cut: 'Case time',
  // The section as it stood before PR #14, restored on the owner's word of 09 October 2026: answering
  // the other side point by point (product source E4, gate G5_rebuttalReview), every reply for the
  // team to review. Drafting has its own section again (ARGUMENT).
  h2: "Test the other side’s account.",
  issue: "The other side’s claim or response describes an event one way; your team remembers it another. Before you respond, you need to know which account the documents bear out.",
  method: "Answer it in VeriCase from the record, with proposed replies for your team to review.",
  methodGate: 'G5_rebuttalReview',
  steps: [
    {
      "title": "Take their document point by point",
      "text": "Add the other side’s claim or response and set out the points it makes."
    },
    {
      "title": "Test the assertions",
      "text": "Set records that support or challenge each point beside it, and see where the account holds, where it is challenged and what needs further investigation before you respond."
    },
    {
      "title": "Prepare the reply",
      "text": "Accept or edit the proposed replies, with the records they rely on, before anything is sent."
    }
  ],
  leadIn: "Watch a point from the other side’s response meet the records.",
  plate: {
    number: 3,
    caption: 'Plate 3. A meeting room with the bundles, on a wet evening. Illustrative image and video (computer-generated). See note B.',
    alt: 'Illustrative image: an empty meeting room with bundles on the table on a wet evening.',
  },
  video: { pause: 'Pause background video', play: 'Play background video' },
  standing: 'Drafts are proposals for a qualified person to review. Responsibility for what is served stays with its author.',
  day28: {
    stamp: 'Day 28 · 17 February 2026 · Decision due',
    h3: 'The decision is the adjudicator’s.',
    body:
      'We will not tell you how the sample matter ends. VeriCase does not decide disputes, and admissibility and weight are for the tribunal. What VeriCase does is help you put the record of what was known, and when, in front of the adjudicator, with each point cited to its source.',
    cta: 'See Rebuttal Mode working on sample correspondence.',
  },
  fig7Caption: 'Fig. 7. The grid shows the adjudication timetable for the sample matter. See note A.',
  fig8Caption: 'Fig. 8. Rebuttal Mode is illustrated with the sample matter. See note A.',
  fig8Summary:
    'Illustration: the Employer’s Response in the sample matter, paragraphs 4.12 and 4.13, set out as a Scott Schedule. Each paragraph sits beside a proposed reply and the evidence ranked for it. The reply to 4.13 is accepted, the reply to 4.12 is edited with the text before and after retained, and a suggested point for 4.12 is rejected because its evidence does not support it.',
};

export const INTEGRITY = {
  numeral: 'VI',
  h2: "Keep the source in sight.",
  issue: "An extract can read differently once the whole document is in front of you.",
  method: "Before you rely on an answer, a paragraph or a reply, read it against the document it cites: its wording, its date and its context.",
  methodGate: 'G5_sourceReview',
  steps: [
    {
      "title": "Open the source",
      "text": "Go from the reference to the document it points to."
    },
    {
      "title": "Read the whole document",
      "text": "See the extract in place, with what comes before and after it and any qualification it carries."
    },
    {
      "title": "Choose the output",
      "text": "A report, a selection of evidence and a bundle serve different purposes; know what yours contains before it goes out."
    },
    {
      "title": "See who did what",
      "text": "The Activity Log records every upload, tag, message and access change in a project, with who made it and when."
    }
  ],
  leadIn: "Watch the points of an argument marked, one by one, with the records behind them, then see a project’s Activity Log.",
  declaration: {
    label: 'Your judgement. Supported by the record.',
    text: 'Findings and drafts require professional review. Your team assesses the evidence, develops the argument and approves the final work.',
  },
  positioning: {
    h3: 'Work alongside your existing systems.',
    text: 'Use VeriCase to investigate the project record and develop the case, alongside your existing document and disclosure systems. Your team decides which material to take forward into each stage of the matter.',
    stages: [
      'The project record: mailboxes, archives, site diaries, drawings and reports',
      'VeriCase: evidence, search, research, bundles and discussion',
      'The pack: chronology, cited analysis, bundle and manifest',
      'Outside VeriCase: your advisers’ disclosure platform, and the tribunal',
    ],
  },
  fig9Caption: 'Fig. 9. The hash check runs on fictional text. See note A.',
  fig10Caption: 'Fig. 10. The entries shown are an extract from a bundle manifest for the sample matter. See note A.',
  fig11Caption: 'Fig. 11. The diagram shows where VeriCase sits. See note A.',
};

// The passage the motto adapts, in full, under the opening (owner, 06 October 2026: "it's the very
// grounds that VeriCase was built on"). Both sentences are checked word for word against the 1975
// and 1979 editions (docs/source-check-2026-09-25.md, item 10 and its addendum); the passage is
// confirmed from 1975, and the book was first published in 1965. The emphasis is VeriCase's.
export const LESSONS = {
  kicker: 'Why VeriCase exists',
  intro: ['As Max W. Abrahamson observed in ', 'Engineering Law and the I.C.E. Contracts', ' (first published in 1965):'],
  quote: [
    'A party to a dispute, particularly if there is arbitration, will learn three lessons (often too late): the importance of records, the importance of records and the importance of records. It is impossible to exaggerate the extent to which lawyers can find unexpected grounds, often quite real, on which to cast doubt on evidence if it is not backed by ',
    'meticulously established records',
    '.',
  ],
  emphasis: '[Emphasis added]',
  close: [
    'Those words have been in print for half a century, yet the industry has still to learn the three lessons.',
    'They are the very grounds on which VeriCase was built.',
  ],
};

// The difference (from the reference William sent on 09 October 2026, "Why teams stop reading the
// archive by hand"): what VeriCase does that files and spreadsheets do not, limited to what the
// page shows. Each row links to nothing; the sections below show each one.
export const DIFFERENCE = {
  kicker: 'The difference',
  h2Lead: 'Why teams stop reading',
  h2Emphasis: 'the archive by hand.',
  columns: ['What you need', 'Files and spreadsheets', 'VeriCase'],
  rows: [
    'Find every email and attachment on an issue',
    'Ask a question and get an answer with its sources',
    'Read the events in date order, from the records',
    'Test a position you have received',
    'Draft a claim or response from the records',
    'Build an indexed, numbered bundle',
  ],
  no: 'Not on its own',
  yes: 'Yes',
};

export const IN_BRIEF = {
  // Each job links to the section that explains it.
  jobs: [
    {
      "title": "Search everything.",
      "text": "Bring every email and document together, find anything by what it says, and follow events in date order.",
      "section": "chronology-lens"
    },
    {
      "title": "Just ask.",
      "text": "Ask your evidence a question and get an answer with its sources.",
      "section": "research"
    },
    {
      "title": "Build the bundle.",
      "text": "Turn a report into a bundle with a cover page, an index and page numbers.",
      "section": "worked-example"
    },
    {
      "title": "Test the competing accounts.",
      "text": "See the records that support a position and those that challenge it, with references back to the sources.",
      "section": "case-room"
    },
    {
      "title": "Develop the argument.",
      "text": "Draft the claim or response with the evidence alongside the wording, each point cited to its record.",
      "section": "claims"
    },
    {
      "title": "Work on it together.",
      "text": "Discuss an email or document with your team and advisers, on the record itself.",
      "section": "collaboration"
    }
  ],
  eyebrow: 'In brief',
  h2: 'From evidence to answers.',
  sub: "Your project records in one place, ready to search, question, discuss and bundle.",
  ledger: [
    {
      "numeral": "II",
      "href": "#chronology-lens",
      "title": "Record preparation",
      "text": "Bring together correspondence and documents; use threading, quoted-text handling and relevance controls to help review them."
    },
    {
      "numeral": "II",
      "href": "#chronology-lens",
      "title": "Chronology",
      "text": "Examine records in date order and return to the source to distinguish forecasts, instructions and confirmations."
    },
    {
      "numeral": "III",
      "href": "#research",
      "title": "Executive Analysis",
      "text": "Ask a focused question; each answer cites its sources and carries a confidence score."
    },
    {
      "numeral": "III",
      "href": "#research",
      "title": "Deep Research",
      "text": "A full report on one question, with the sources it cites and its checks."
    },
    {
      "numeral": "IV",
      "href": "#worked-example",
      "title": "Bundles",
      "text": "Built from a report, with a cover page, an index and page numbers, ready to download."
    },
    {
      "numeral": "V",
      "href": "#integrity",
      "title": "Activity and access",
      "text": "Every upload, tag, message and access change is logged, and advisers can be given access to a project."
    }
  ],
  benchmarks: {
    gate: 'G4_benchmarks',
    text: 'In benchmark testing, VeriCase processed more than 50,000 documents per hour[[note:9]] and extracted dates with 99.7% accuracy.[[note:10]] The notes describe how each figure was measured, so that you can judge them for yourself.',
  },
  // Set as the collaboration section's closing statement, in two lines: who uses VeriCase, then
  // who they work with (revised 09 October 2026 to be market-agnostic, at the owner's request).
  audience: {
    label: 'Who it is for',
    lead: 'For contractors, subcontractors and commercial teams,',
    rest: 'and the consultants, experts and advisers they work with.',
  },
  questionsLabel: 'Questions',
  questions: [
    {
      "q": "We already have a document system. Where does VeriCase fit?",
      "a": "VeriCase is for working with the project record: searching it, asking it questions, discussing it and building bundles. It works alongside your existing document systems."
    },
    {
      "q": "Do we need to learn how to search?",
      "a": "No. Search by the words in the email or attachment, or ask a question in plain English and follow up on the answer."
    },
    {
      "q": "What can we work with?",
      "a": "Mailboxes (PST), individual emails (EML and MSG), PDFs, Word documents, spreadsheets and images. Text recognition helps make scanned pages searchable. We can discuss your record types and preparation needs during a demonstration."
    },
    {
      "q": "Can VeriCase build the bundle?",
      "a": "Yes. Create a bundle from a Deep Research report: the report goes on top, followed by the evidence it cites, with a cover page, an index and page numbers. Change the order if you need to, then download it as a PDF."
    },
    {
      "q": "Can VeriCase help draft a claim or response?",
      "a": "Yes. Use drafting tools to develop the wording and identify supporting material, with the evidence alongside the argument. Your team revises the work and approves the final document before it is issued."
    },
    {
      "q": "Will the output be accepted by the tribunal?",
      "a": "Admissibility and weight are for the tribunal. Review the underlying records, the source references and the final document with the professionals responsible for the matter."
    },
    {
      "q": "Can we rely on what VeriCase finds?",
      "a": "Every answer shows its sources, so you can read them yourself. Review the records and the final document with the people responsible for the matter."
    },
    {
      "q": "How can our team work together?",
      "a": "Discuss each record where it sits. Your team, consultants, experts and advisers can join from their own organisations, and mentioning someone on a record opens a discussion with them there. Lanes keep separate conversations about the same record apart. We can go through the access arrangements in the demonstration."
    },
    {
      "q": "How will you handle our project and client material?",
      "a": "Demonstrations use sample material. Before introducing your own records, discuss your organisation’s requirements for hosting, access, retention and automated processing with us."
    }
  ],
};

export const FOUNDER = {
  eyebrow: 'Who is behind it',
  h2: 'Built on experience.',
  body1:
    "Founded by construction claims and dispute resolution practitioners. Built around the demands of real casework.",
  // Portraits are 440 px greyscale JPEG squares in /public/assets/team, drawn at 220 px.
  people: [
    {
      name: 'William Rogers',
      // Beneath the name and role: short accolades drawn from the credentials below (owner,
      // 06 October 2026: MCIArb moves here from the name; no contact details are shown).
      accolades: ['MCIArb, Chartered Institute of Arbitrators', 'Forensic quantum expert', 'Live instructions in excess of £100m'],
      summary: "William brings more than 15 years of construction claims and disputes experience across infrastructure, water, power, rail and residential projects. A quantity surveying and commercial management specialist and Member of the Chartered Institute of Arbitrators, he acts as a testifying quantum expert. His work spans adjudication, arbitration and TCC litigation. He brings the practical demands of preparing evidence, developing claims and briefing experts and counsel into VeriCase’s product direction.",
      role: 'Co-Founder · Claims Advisory and Forensic Quantum Expert',
      photo: { src: '/assets/team/william-rogers.jpg', alt: 'William Rogers' },
      bio:
        'A construction claims and disputes specialist with over 15 years across the water, power, rail, infrastructure and residential sectors, qualified in quantity surveying and commercial management and a Member of the Chartered Institute of Arbitrators. He founded his first commercial management consultancy in 2016 and has since built Meritus Group, Orrery Group, Peak Developments and VeriCase, a legal technology platform combining forensic evidence review with a chronology engine built to the SCL Protocol. His portfolio spans adjudication, arbitration and TCC litigation under NEC, JCT, FIDIC and IChemE forms, with live instructions in excess of £100m across residential, regeneration and infrastructure schemes, and prior roles on international arbitrations exceeding $600m. He acts as a testifying quantum expert and leads claims and recovery across a national contractor’s distressed portfolio, preparing each case in house so that experts and counsel are instructed only when it is ready.',
      credentials: [
        'Member of the Chartered Institute of Arbitrators (MCIArb)',
        'RICS Level 5 Diploma, Adjudication in the Construction Industry',
        'BSc (Hons) Quantity Surveying and Commercial Management',
        'Testifying quantum expert',
        'NEC, JCT, FIDIC and IChemE dispute specialist',
        'Founder, Meritus Group',
        'Founder, Orrery Group',
        'Founder, Peak Developments',
      ],
      list: {
        label: 'Representative matters',
        items: [
          { name: 'Mixed-use residential regeneration scheme, London', detail: 'Adjudication (JCT D&B 2016), £30m, ongoing' },
          { name: 'Residential development, Wales', detail: 'Adjudication (JCT D&B 2016), £2.49m counterclaim, 2026' },
          { name: 'Residential tower block refurbishment, Dorset', detail: 'Adjudication and final account (JCT ICD 2016), £25.3m, 2026' },
          { name: 'Residential development, Yorkshire', detail: 'Structural design dispute, ongoing' },
          { name: 'Guided busway infrastructure, East of England', detail: 'TCC litigation, £37m' },
          { name: 'Petrochemical facility explosion, Middle East', detail: 'Arbitration, $340m' },
          { name: 'Airport design and construction, Middle East', detail: 'Arbitration, $260m' },
          { name: 'Sewage treatment works, Wiltshire', detail: 'Adjudication (NEC3), £4m' },
        ],
      },
    },
    {
      name: 'Warren Kemp',
      summary: "Warren is a construction and engineering disputes solicitor and a partner at gunnercooke LLP. His practice spans adjudication, arbitration, mediation and TCC litigation, advising contractors, developers, consultants and insurers. Previously joint head of construction and engineering at DAC Beachcroft, he brings more than twenty years of legal practice to VeriCase. His contribution centres on the commercial judgement, evidential discipline and clear argument that construction disputes require.",
      role: 'Co-Founder · Dispute Resolution',
      photo: { src: '/assets/team/warren-kemp.jpg', alt: 'Warren Kemp' },
      accolades: ['Partner, gunnercooke LLP', 'Co-founded DAC Beachcroft’s construction practice (2013), circa 50 lawyers', 'Former Joint Head of Construction & Engineering, DAC Beachcroft', 'Ranked in Chambers UK and The Legal 500'],
      bio:
        'Warren is a construction and engineering disputes solicitor of more than twenty years’ standing, admitted in 2002, who advises developers, contractors, subcontractors, professional consultants and their insurers across the public and private sectors. He trained and built his practice in Newcastle, first at Watson Burton and then at DAC Beachcroft, which he joined as a partner on 01 November 2013 and where he and James Harrison set up the firm’s construction practice that year. He went on to lead DAC Beachcroft’s national construction and engineering team jointly with Mark Roach, a practice of circa 50 lawyers in the United Kingdom and internationally, until joining gunnercooke LLP in February 2024. His work spans adjudication, arbitration, mediation and Technology and Construction Court litigation, together with the professional indemnity dimension of construction claims and the non-contentious drafting that prevents them. He is ranked in Chambers UK and The Legal 500, which has described him as “simply the best around”, and he writes regularly on construction law, including on CC Construction Limited v Mincione and on the contractual treatment of anaerobic digestion plants. Warren acts, among his various roles, as General Counsel to United Living, a business approaching £1bn turnover with a telecoms division, and previously spent 18 months in house on secondment at the global consultancy WS Atkins. He combines a pragmatic, commercial approach with the tenacity to see a dispute through to decision.',
      credentials: [
        'Dispute Resolution Partner, gunnercooke LLP',
        'Former Joint Head of Construction & Engineering, DAC Beachcroft',
        'Co-founded DAC Beachcroft’s construction practice with James Harrison (2013)',
        'General Counsel, United Living Group',
        'Admitted as a solicitor, 15 August 2002',
        'Ranked, Chambers UK, Construction (North East)',
        'Ranked, The Legal 500, Construction',
        'Adjudication, arbitration, mediation and TCC litigation',
        'Professional indemnity and construction insurance disputes',
        'Former In-House Counsel (Secondment), WS Atkins, 18 months',
      ],
      list: {
        label: 'Reported authorities and commentary',
        items: [
          { name: 'Van Elle Limited v Keynvor Morlift Limited', detail: '[2023] EWHC 3137 (TCC)' },
          { name: 'Celtic Bioenergy Limited v Knowles Limited', detail: '[2017] EWHC 472 (TCC)' },
          { name: 'CC Construction Limited v Mincione', detail: '[2021] EWHC 2502 (TCC), published commentary' },
          { name: 'Anaerobic digestion plants: contractual risk', detail: 'Published commentary, DAC Beachcroft Construction Professionals Newsletter' },
          { name: 'The Legal 500, Construction, Newcastle', detail: '“Simply the best around”' },
          { name: 'Chambers UK 2021, Construction, North East', detail: 'Ranked individual, client endorsed' },
        ],
      },
    },
    {
      name: 'Malcolm Brechin',
      summary: "Malcolm brings more than 25 years of experience in commercial strategy and taking technology products to market. His career includes leadership roles at OfficeTeam, OT Group and Mobile Rocket, working across sectors including healthcare, recruitment and government. As Managing Director, he focuses on understanding customers’ operational needs and translating them into practical products, working with the team to make VeriCase useful and commercially relevant to the organisations adopting it.",
      role: 'Managing Director · Commercial Strategy & Go-to-Market',
      photo: { src: '/assets/team/malcolm-brechin.jpg', alt: 'Malcolm Brechin' },
      accolades: ['CEO, Invent Group', 'Former Director of Strategic Development, Mobile Rocket', 'Over 25 years in commercial strategy and go-to-market'],
      bio:
        'Malcolm is a commercial strategist with more than 25 years’ experience building and scaling technology businesses across finance, retail, healthcare, hospitality and government. His career has centred on taking products to market: as business development director at OfficeTeam he led a national sales team and secured the William Hill distribution outsourcing contract; as National Director of New Business at OT Group he positioned the business on the Crown Commercial Service Tail Spend Solution framework; and as Director of Strategic Development at Mobile Rocket he led the go-to-market for its recruitment and healthcare platforms, now used by Amazon, Waitrose and the NHS, during the period in which the company was shortlisted for Recruitment Technology Innovation of the Year at the Recruiter Awards 2023. In 2025 he established NE Tech in County Durham, rebranded as Invent Group in 2026, which has since released VeriCase, Bid King and Schools-safe. Malcolm’s focus is on identifying real operational challenges and turning them, in partnership with clients, into practical and commercially viable technology.',
      credentials: [
        'CEO, NE Tech, rebranded Invent Group (2025)',
        'Director of Strategic Development, Mobile Rocket',
        'National Director of New Business, OT Group',
        'Business Development Director, OfficeTeam',
        'Over 25 years in commercial strategy and go-to-market leadership',
        'Published on technology adoption, Invent Group (18 August 2026)',
      ],
      list: {
        label: 'Notable products',
        items: [
          { name: 'VeriCase', detail: 'Legal dispute and complex casework platform' },
          { name: 'Bid King', detail: 'Bid, tender and proposal response tool' },
          { name: 'Rocket Healthcare', detail: 'Mobile Rocket; featured in Open Access Government, 2023' },
        ],
      },
    },
    {
      name: 'Sam Whisker',
      summary: "Sam is a software engineer and automation specialist with experience taking products from early ideas to working systems. A Teesside University graduate and former Chief Technology Officer at Mobile Rocket, he has worked on recruitment and workforce platforms and, since 2024, focused on automation. As Chief Technology Officer, he leads the engineering behind VeriCase, bringing software development and automation together around the needs of complex casework.",
      role: 'Chief Technology Officer · Automation & Product Engineering',
      photo: { src: '/assets/team/sam-whisker.jpg', alt: 'Sam Whisker' },
      accolades: ['CTO, Invent Group', 'Former Chief Technology Officer, Mobile Rocket', 'Shortlisted, Recruiter Awards 2023'],
      bio:
        'Sam is a software engineer and automation specialist who has spent his entire career writing code that changes how organisations operate. A Teesside University graduate, he began as a senior PHP developer at Stockton-based web development firm Koodoo Creative before becoming Chief Technology Officer of Mobile Rocket, the Newton Aycliffe company whose recruitment and workforce platforms are now used by organisations including Amazon, Waitrose and the NHS. During his time as CTO, Mobile Rocket was shortlisted for Recruitment Technology Innovation of the Year at the Recruiter Awards 2023. Since 2024 he has concentrated on automation, advising businesses in sectors from manufacturing to recruitment on process automation, custom GPT systems and automated workflows. In 2025 he started NE Tech, now Invent Group, with Malcolm Brechin and leads its technology, building software products including VeriCase, for managing complex legal disputes, and Bid King, for tenders and proposals. Sam’s strength lies in moving ideas from prototype to working, scalable systems that deliver measurable gains in operational efficiency.',
      credentials: [
        'CTO, NE Tech, rebranded Invent Group (2025)',
        'Chief Technology Officer, Mobile Rocket, from 2013',
        'Shortlisted, Recruiter Awards 2023 (Mobile Rocket, as CTO)',
        'Independent automation consultant since 2024',
        'Teesside University graduate; developer since 2008',
      ],
      list: {
        label: 'Notable products',
        items: [
          { name: 'VeriCase', detail: 'Legal dispute product for complex casework' },
          { name: 'Bid King', detail: 'Intelligent information processing for bids and tenders' },
          { name: 'Schools-safe', detail: 'Secure parental communications app for academy schools' },
        ],
      },
    },
  ],
  body2: 'Practitioners from law firms and claims consultancies hold equity in VeriCase Ltd. Their involvement is not an endorsement by the firms they work for.',
  body2Gate: 'G5_equity',
  credentials: [
    'William Rogers MCIArb · Co-Founder, VeriCase Ltd',
    'Warren Kemp · Co-Founder, VeriCase Ltd | Partner, gunnercooke LLP',
    'Chartered Institute of Arbitrators (MCIArb)',
    'Solicitor of the Senior Courts (20+ years)',
  ],
  declaration: {
    label: 'Declaration of interest',
    text: 'United Infrastructure is an associated company of VeriCase’s founder, William Rogers. Warren Kemp serves as General Counsel for United Living. We state these connections before the account, so that you can give the account the weight you think it deserves.',
  },
  h3: 'A record of use: United Infrastructure',
  account: '{{UI_CASE}}[[note:11]]',
  accountGate: 'G6_ui',
  closing:
    'Each adjudication turns on its own facts, its own law and its own adjudicator. This account describes one use of VeriCase. It is not a prediction or a promise of the result in any other matter.',
};

export const DEMONSTRATION = {
  eyebrow: 'Next step',
  h2: "See VeriCase in practice.",
  body: "See search, questions and bundles on sample material. Tell us what matters most to your team.",
  ownMaterial: "Please use sample material until confidentiality and data arrangements for your organisation have been agreed.",
  ownMaterialGate: 'G5_ownMaterial',
  copy: 'Copy email address',
  copied: 'Email address copied.',
  microcopy: 'Opens an email to enquiries@veri-case.com. Please do not include confidential details of a live matter.',
  plain: 'Or write to enquiries@veri-case.com.',
};

// The notes have a page of their own (/notes): a marker in the text opens its note in a pop-up,
// which links through to the full note there, and each note links back to the section citing it.
export const NOTES_SECTION = {
  heading: 'Notes',
  back: 'Back to the text',
  readInNotes: 'Read in Notes',
  // A note of several paragraphs shows its first in the pop-up; the rest is read in Notes.
  continueInNotes: 'Continue reading in Notes',
};

export const NOTES_PAGE = {
  eyebrow: 'Notes',
  h1: 'Notes and sources',
  intro: 'The sources and assumptions behind the figures on our home page. Each note links back to the text that cites it.',
  // The notes cited on the home page, grouped by the section that cites them.
  groups: [{ id: 'collaboration', kicker: 'Collaboration', title: 'Keep the discussion with the evidence.', notes: [1, 2, 3] }],
};

export const FOOTER = {
  descriptor: 'Evidence investigation and case preparation for construction claims and disputes.',
  heads: { contents: 'Contents', company: 'Company', cookies: 'Cookies' },
  company: { about: 'Who is behind it', demo: 'Request a demonstration', signIn: 'Sign in' },
  notes: 'Notes and sources',
  cookies: { settings: 'Cookie settings', notice: 'Cookie notice' },
  legal: [
    'VeriCase Ltd is registered in England and Wales (company number 16562435). Registered office: 85 Great Portland Street, London, England, W1W 7LT.',
    'The Chronology Lens™ is a trade mark of VeriCase Ltd. VeriCase is software and does not give legal advice. Illustrations on this site use a fictional matter.',
  ],
};

export const COOKIE_BAR = {
  region: 'Cookie choices',
  label: 'Cookies',
  text: 'May we use PostHog analytics cookies to understand how this site is used? They stay off unless you allow them.',
  allow: 'Allow analytics',
  reject: 'Reject analytics',
  details: 'Details',
  hide: 'Hide details',
  detailsTitle: 'Analytics cookies',
  detailsBody:
    'We would like to use PostHog analytics cookies to understand how this site is used, so that we can improve it. They stay off unless you allow them, and no analytics data is sent before you choose. You can change your choice at any time from Cookie settings in the footer.',
  link: 'Read the cookie notice',
};

export const NOT_FOUND = {
  title: 'Page not found | VeriCase',
  eyebrow: 'Error 404',
  h1: 'We cannot find that page.',
  body: 'The address may have changed. Return to the homepage or choose a section below.',
  home: 'Return to the home page',
  listHeading: 'Contents',
  plate: {
    caption: 'A gap in the shelf. Illustrative image (computer-generated).',
    alt: 'Illustrative image: a gap in a shelf of archive boxes.',
    drawn: {
      caption: 'A gap in the shelf. An illustrative drawing of the fictional sample matter.',
      alt: 'Illustrative drawing: an elevation of a bay of archive shelving holding the box files for the fictional sample matter, Boxes 13 to 19, one a month from December 2024 to June 2025. Box 16 is not on the shelf: a dashed outline marks where it should stand, the gap is dimensioned at 85 millimetres, and the title block records the shelf as found.',
    },
  },
};
