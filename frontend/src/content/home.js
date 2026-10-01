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
  { id: 'case-room', numeral: 'III', title: 'The case room', nav: 'Rebuttal' },
  { id: 'research', numeral: 'IV', title: 'Ask, cite, bundle', nav: 'Ask, cite, bundle' },
  { id: 'claims', numeral: 'V', title: 'Build the claim', nav: 'Build the claim' },
  { id: 'integrity', numeral: 'VI', title: 'The record holds', nav: 'Integrity' },
];
export const HOME_NAV = [
  { id: 'platform', title: 'How it works', nav: 'How it works' },
  { id: 'worked-example', title: 'Worked example', nav: 'Worked example' },
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
  sheetDescription: 'How VeriCase works, an evidence example, the team and common questions.',
  endMatterLabel: 'End matter',
  close: 'Close menu',
};

export const COVER = {
  masthead: ['Records,', 'records,', 'records.'],
  eyebrow: 'The early case diagnostic tool for construction disputes',
  h1: 'Transform complex evidence into compelling legal arguments.',
  subhead:
    "VeriCase approaches the evidence crisis differently. We don't just manage documents; we reconstruct truth. Forensic-grade AI turns scattered records into winning, defensible strategies.",
  audience: 'Software for contractors, claims consultants and construction lawyers.',
  fastPath: 'See how it works',
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
      'A residential building let under the JCT Design and Build Contract 2016, with the Employer’s amendments. On 03 March 2025 the Employer’s Agent instructed a Change: stainless steel cladding brackets (type B) in place of aluminium brackets (type A) on Levels 3 to 6. The Contractor gave notice under clause 2.24 on 28 March 2025.[[note:1]]',
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
          'An adjudicator must reach a decision within 28 days of referral, extendable to 42 days with the referring party’s consent, or longer if both parties agree after referral.[[note:2]]',
      },
      {
        period: 'Forthwith',
        provision: 'JCT D&B 2016, cl 2.24',
        summary:
          'The Contractor must give written notice forthwith when it becomes reasonably apparent that the progress of the Works is being or is likely to be delayed. Whether late notice bars a later Completion Date depends on the terms of the contract, including any amendments.[[note:1]]',
      },
      {
        period: 'Eight weeks',
        provision: 'NEC4, cl 61.3',
        summary:
          'A compensation event notified more than eight weeks after the Contractor became aware that it had happened is barred, subject to the exceptions in the clause.[[note:3]]',
        timeBar: true,
      },
      {
        period: '28 days',
        provision: 'FIDIC 2017, sub-cl 20.2.1',
        summary:
          'Notice of a claim is required as soon as practicable, and no later than 28 days after the claiming party became aware, or should have become aware, of the event or circumstance.[[note:4]]',
        timeBar: true,
      },
      {
        period: 'Six and twelve years',
        provision: 'Limitation Act 1980, ss 5 and 8',
        summary:
          'Six years for an action founded on simple contract; twelve years for an action upon a specialty, which includes a contract made by deed (England and Wales).[[note:5]]',
      },
    ],
    timeBarLabel: 'Time bar',
    foot: 'Summaries for orientation only. The statute and the contract govern; this is not legal advice. See note C.',
  },
  plate: {
    number: 1,
    caption: 'Plate 1. A residential frame with its façade under way. Illustrative image (AI-generated). See note B.',
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
  h2: 'Many threads. One order of events.',
  lead:
    'Email is stored as threads and mailboxes. A tribunal reads a case as events. The Chronology Lens™ merges the correspondence in a matter into one time-ordered view across every party, and keeps each entry tied to the message it came from.',
  fail: 'The same message can sit in four mailboxes under three subject lines, and the account of what happened can be buried under quoted replies.',
  recover: 'Every email becomes its own record. Threads are rebuilt from their headers, quoted history is folded away and near-duplicates leave the review set.',
  recoverGate: 'G5_quoted',
  items: [
    { icon: 'EmailArchive', title: 'Load the record as it is kept', text: 'PST, MSG and EML email, with bodies and attachments; PDF, DOC and DOCX documents; spreadsheets; and images, with OCR for scanned pages.' },
    { icon: 'Thread', title: 'One record per message', text: 'Each email is parsed to its own record and threaded by its Message-ID and References headers, with heuristics for exports in which those headers are missing or damaged.' },
    { icon: 'QuoteFold', title: 'Read what was written', text: 'Quoted text is detected, so each entry shows what its author added. Earlier history is folded, not discarded.', gate: 'G5_quoted' },
    { icon: 'NearDuplicate', title: 'Set aside the noise', text: 'Near-duplicates leave the review set and the originals are retained. Correspondence for other projects is excluded. File Manager lists extracted attachments by type, and Show Noise brings attachments set aside as noise, such as signature images, back into view.', gate: 'G5_showNoise' },
    { icon: 'ExcludedProject', title: 'Narrow it to the matter', text: 'Set the project date window, apply a Smart Filter and exclude keywords that only add bulk. Mark an item as Not Relevant and its attachments leave search with it.' },
    { icon: 'ChronologyLens', title: 'Cards or Table', text: 'Read the chronology as cards or scan it as a table, export it as it stands, or create a bundle from what you have selected.' },
  ],
  plate: {
    number: 2,
    caption: 'Plate 2. The record as it is often kept. Illustrative image (AI-generated). See note B.',
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
  next: { label: 'Next: test the case against the record', href: '#case-room' },
};

export const RESEARCH = {
  numeral: 'IV',
  eyebrow: 'Chapter IV · Research',
  h2: 'Ask a question. Read a cited answer. Bundle the sources.',
  lead:
    'Ask a question about the project record, such as “What does the correspondence say about delivery?” Review how VeriCase has understood the question, then read an analysis with links to the emails and documents behind its findings. Your team checks the sources and assesses what they establish.',
  fail: 'Someone asks what the record shows on a point. The answer can arrive days later as a summary without sources, and the checking starts again.',
  recover: 'The answer arrives with its sources attached. Follow any citation to the message itself, then bundle what was cited.',
  steps: [
    { n: '1', title: 'Ask', text: 'Choose a question. Before anything runs, the Query Plan sets out the mode, period, parties, topics and sources that VeriCase has understood, as chips you can change. You correct the question, not the answer.' },
    { n: '2', title: 'Cite', text: 'The report gives numbered citations to the underlying emails and documents, the number of sources cited and of items analysed, and a validation badge. Select a citation to open its source.' },
    { n: '3', title: 'Bundle', text: 'Create bundle adds every cited item to a bundle with its title, description, case or matter, court, reference, who prepared it and for whom, its date and notes. Download PDF keeps the report as it stands.' },
  ],
  fig: {
    number: 4,
    summary:
      'Illustration: a plain-English question about the sample matter, the Query Plan derived from it and the resulting Analysis Report with six numbered citations. Each citation opens its fictional source. Create bundle adds the six cited items to a bundle.',
    caption: 'Fig. 4. Research, illustrated with the sample matter. The report, sources and bundle are fictional. See note A.',
  },
  cta: { line: 'See Research, the Chronology Lens™ and Rebuttal Mode on sample correspondence.' },
};

export const CLAIMS = {
  numeral: 'V',
  eyebrow: 'Chapter V · Claims builder and collaboration',
  h2: 'Draft the claim with the evidence already cited.',
  lead:
    'Organise the claim into sections, draft the narrative and link each point to its supporting evidence. The project team, solicitors, counsel and experts work on the same evidence, and discuss it where it sits.',
  fail: 'The narrative is drafted in one place, the evidence is kept in another, and the argument about the evidence happens in a reply-all thread.',
  recover: 'Each citation opens its message, and each discussion is anchored to the document it concerns.',
  items: [
    { title: 'Heads of Claim', text: 'Organise the claim by head and sub-head, with evidence linked to the head it supports.' },
    { title: 'Citations by message ID', text: 'Each citation points to one message, not to a file name that may change.' },
    { title: 'Evidence finder', text: 'For the section you are drafting, VeriCase proposes material from the record. It proposes; the drafter decides what is cited.', gate: 'G5_claims' },
    { title: 'Word and PDF', text: 'Export the narrative to Word or PDF with its citations intact.', gate: 'G5_claims' },
    { title: 'Discussion on the document', text: '@mention a colleague on a document and the discussion opens on that document, so the reasoning stays beside the evidence.' },
  ],
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

export const CASE_ROOM = {
  numeral: 'III',
  kicker: 'Project time ends. Case time begins.',
  cut: 'Case time',
  h2: 'Their points, numbered. Your replies, cited.',
  lead:
    'Upload the other side’s submission to interrogate their factual position. Rebuttal Mode divides it into numbered points, ranks the evidence that bears on each, and proposes reply points that cite the documents that support or contradict the position. A person accepts, edits or rejects each one, and every decision is recorded.',
  leadGate: 'G5_rebuttalCite',
  fail: 'Under time pressure, a team answers first the points it can evidence quickly, and the rest risk being answered thinly.',
  recover: 'Each point sits beside the evidence ranked for it, and each proposed reply arrives with its citations.',
  plate: {
    number: 3,
    caption: 'Plate 3. A meeting room with the bundles, on a wet evening. Illustrative image and video (AI-generated). See note B.',
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
  h2: 'The original stays original.',
  lead:
    'Raw email is held in write-once storage with a cryptographic hash for each message. Everything done to the evidence afterwards is recorded against it, and each person sees only what their role permits.',
  leadGate: 'G5_hash',
  fail: 'A bundle assembled by hand at midnight is where exhibits can go missing, pages can be misnumbered and a citation can point to the wrong document.',
  recover: 'Bundles are numbered in sequence and carry a manifest listing each item.',
  controls: [
    { icon: 'HashSeal', title: 'Originals held unchanged', text: 'Each raw message is kept unchanged with its hash, so the working record can be compared with the message as received.', gate: 'G5_hash' },
    { icon: 'Thread', title: 'An audit trail for every message', text: 'Tags, notes, links and edits are logged with the user, the time and the values before and after.' },
    { icon: 'TabbedBundle', title: 'Numbered bundles with a manifest', text: 'Items are numbered in bundle order, and the manifest lists each item’s message ID, cryptographic hash and source path.', gate: 'G5_hash' },
    { icon: 'RebuttalPair', title: 'Access by role', text: 'Team Leader, Senior Lawyer, Claims Consultant, QS, Project Manager, External Counsel and Client Viewer.', gate: 'G5_roles' },
    { icon: 'QueryChip', title: 'Sensitive fields restricted', text: 'BCC recipients and other sensitive fields are visible only to the roles permitted to see them.', gate: 'G5_roles' },
    { icon: 'CitedReport', title: 'AI and keys on the server', text: 'AI processing and API keys are held server-side, not in the browser.' },
  ],
  declaration: {
    label: 'What we do not claim',
    text: 'We do not describe VeriCase’s outputs as court-ready or admissible. Admissibility and weight are matters for the tribunal. Our part is to preserve the material and show its provenance, so that those questions can be argued on the record.',
  },
  positioning: {
    h3: 'Before disclosure, not instead of it.',
    text: 'VeriCase is the pre-litigation workspace. It prepares the evidence, chronology, claim and rebuttal material that your solicitors take forward, and it does not replace the disclosure or review platform they already use. It is deliberately lean: evidence, chronology, claims and rebuttal, and nothing that does not serve them.',
    stages: [
      'The project record: mailboxes, archives, site diaries, drawings and reports',
      'VeriCase: evidence, chronology, claims and rebuttal',
      'The pack: chronology, cited analysis, bundle and manifest',
      'Outside VeriCase: your advisers’ disclosure platform, and the tribunal',
    ],
  },
  fig9Caption: 'Fig. 9. The hash check runs on fictional text. See note A.',
  fig10Caption: 'Fig. 10. The entries shown are an extract from a bundle manifest for the sample matter. See note A.',
  fig11Caption: 'Fig. 11. The diagram shows where VeriCase sits. See note A.',
};

export const IN_BRIEF = {
  jobs: [
    { title: 'Put the record in order', text: 'Bring together emails and documents from the project. Read events in date order, with a link back to each source.' },
    { title: 'Find the evidence', text: 'Ask a question about the records. Check the answer against the emails and documents it refers to.' },
    { title: 'Prepare your case', text: 'Build a claim or respond to the other side’s arguments. Review proposed wording with the supporting evidence alongside it.' },
  ],
  eyebrow: 'In brief',
  h2: 'The platform, on one page.',
  sub: 'VeriCase is deliberately lean: evidence, chronology, claims and rebuttal. Each line links to the chapter that shows it.',
  ledger: [
    { numeral: 'II', href: '#chronology-lens', title: 'Ingestion', text: 'PST, MSG, EML, PDF, DOC, DOCX, spreadsheets and images, with OCR. One record per message, threaded by header, with quoted text folded, near-duplicates set aside and attachments listed by type in File Manager.' },
    { numeral: 'II', href: '#chronology-lens', title: 'The Chronology Lens™', text: 'One time-ordered view across every party, in Cards or Table view, with a project date window, Smart Filter, Exclude keywords and Create bundle.' },
    { numeral: 'III', href: '#case-room', title: 'Rebuttal Mode', text: 'Numbered points, ranked evidence, reply points with mandatory citations, accept, edit or reject with an audit trail, and an export pairing each point with its reply and cited evidence.' },
    { numeral: 'IV', href: '#research', title: 'Research', text: 'Plain-English questions, an editable Query Plan, and an Analysis Report with numbered citations, counts and a validation badge. Download PDF or create a bundle.' },
    { numeral: 'V', href: '#claims', title: 'Claims builder', text: 'Heads of Claim, a narrative cited by message ID, an evidence finder, and Word or PDF export.' },
    { numeral: 'VI', href: '#integrity', title: 'Integrity and access', text: 'Originals kept as received, with hashes, a per-message audit trail, numbered bundles with manifests, role-based access and server-side AI.' },
  ],
  benchmarks: {
    gate: 'G4_benchmarks',
    text: 'In benchmark testing, VeriCase processed more than 50,000 documents per hour[[note:6]] and extracted dates with 99.7% accuracy.[[note:7]] The notes describe how each figure was measured, so that you can judge them for yourself.',
  },
  audience: {
    label: 'Who it is for',
    text: 'For construction solicitors and counsel, including King’s Counsel; claims consultants; quantum and other experts; and contractors’ commercial and in-house legal teams.',
  },
  questionsLabel: 'Questions',
  questions: [
    { q: 'What can we upload?', a: 'Email archives and individual emails, PDFs, Word documents, spreadsheets and images. Scanned pages can be read using text recognition.' },
    { q: 'Does VeriCase replace our disclosure platform?', a: 'No. VeriCase is a pre-litigation workspace. It prepares evidence, chronology, claim and rebuttal material, which then moves to the platform your solicitors use.' },
    { q: 'Will the output be accepted by the tribunal?', a: 'Admissibility and weight are for the tribunal. VeriCase keeps each original with its hash, message ID and source path, and records what was done to it, so that its provenance can be examined.' },
    { q: 'Does the AI write our submissions?', a: 'No. It suggests evidence and proposes reply points, each with citations. A person accepts, edits or rejects every proposal, and the decision is recorded. Responsibility for anything served stays with its author.' },
    { q: 'Who sees what?', a: 'Access is by role: Team Leader, Senior Lawyer, Claims Consultant, QS, Project Manager, External Counsel and Client Viewer. BCC recipients and other sensitive fields are restricted by permission.', gate: 'G5_roles' },
    { q: 'Where is our data held, and is it used to train AI models?', a: '{{DATA_POLICY}}', gate: 'G8_data' },
  ],
};

export const FOUNDER = {
  eyebrow: 'Who is behind it',
  h2: 'The people behind VeriCase.',
  body1:
    'Our team brings together construction claims, legal, commercial and software development experience.',
  // Portraits are 440 px greyscale JPEG squares in /public/assets/team, drawn at 220 px.
  people: [
    {
      name: 'William Rogers MCIArb',
      role: 'Co-Founder · Claims, Forensic Quantum & Testifying Expert',
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
          { name: 'Welbourne, Tottenham Hale, London', detail: 'Adjudication (JCT D&B 2016), £30m, ongoing' },
          { name: 'Kennaway', detail: 'Adjudication (JCT D&B 2016), £2.49m counterclaim, 2026' },
          { name: 'Project Admiral, Poole', detail: 'Adjudication and final account (JCT ICD 2016), £25.3m, 2026' },
          { name: 'Points Cross, Leeds', detail: 'Structural design dispute, ongoing' },
          { name: 'Cambridgeshire Guided Busway', detail: 'TCC litigation, £37m' },
          { name: 'Petrochemical facility explosion, Middle East', detail: 'Arbitration, $340m' },
          { name: 'Airport design and construction, Middle East', detail: 'Arbitration, $260m' },
          { name: 'Highworth STW, Swindon', detail: 'Adjudication (NEC3), £4m' },
        ],
      },
    },
    {
      name: 'Warren Kemp',
      role: 'Co-Founder · Dispute Resolution | Partner, gunnercooke LLP',
      photo: { src: '/assets/team/warren-kemp.jpg', alt: 'Warren Kemp' },
      email: 'warren.kemp@gunnercooke.com',
      tel: '+44 (0) 7470 332 945',
      bio:
        'Warren is a construction and engineering disputes solicitor of more than twenty years’ standing, admitted in 2002, who advises developers, contractors, subcontractors, professional consultants and their insurers across the public and private sectors. He trained and built his practice in Newcastle, first at Watson Burton and then at DAC Beachcroft, which he joined as a partner on 01 November 2013 and where, with James Harrison, he established the firm’s Newcastle construction practice and grew it to more than 25 specialist construction lawyers. He went on to lead DAC Beachcroft’s national construction and engineering team jointly with Mark Roach, a practice of over 50 senior lawyers in the United Kingdom and internationally, until joining gunnercooke LLP in February 2024. His work spans adjudication, arbitration, mediation and Technology and Construction Court litigation, together with the professional indemnity dimension of construction claims and the non-contentious drafting that prevents them. He is ranked in Chambers UK and The Legal 500, which has described him as “simply the best around”, and he writes regularly on construction law, including on CC Construction Limited v Mincione and on the contractual treatment of anaerobic digestion plants. Warren acts, among his various roles, as General Counsel to United Living, a business approaching £1bn turnover with a telecoms division, and previously spent 18 months in house on secondment at the global consultancy WS Atkins. He combines a pragmatic, commercial approach with the tenacity to see a dispute through to decision.',
      credentials: [
        'Dispute Resolution Partner, gunnercooke LLP',
        'Former Joint Head of Construction & Engineering, DAC Beachcroft',
        'Co-founded DAC Beachcroft’s Newcastle construction practice (2013)',
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
      role: 'Managing Director · Commercial Strategy & Go-to-Market',
      photo: { src: '/assets/team/malcolm-brechin.jpg', alt: 'Malcolm Brechin' },
      bio:
        'Malcolm is a commercial strategist with more than 25 years’ experience building and scaling technology businesses across finance, retail, healthcare, hospitality and government. His career has centred on taking products to market: as business development director at OfficeTeam he led a national sales team and secured the William Hill distribution outsourcing contract; as National Director of New Business at OT Group he positioned the business on the Crown Commercial Service Tail Spend Solution framework; and as Director of Strategic Development at Mobile Rocket he led the go-to-market for its recruitment and healthcare platforms, now used by Amazon, Waitrose and the NHS, during the period in which the company was shortlisted for Recruitment Technology Innovation of the Year at the Recruiter Awards 2023. In 2025 he founded NE Tech in County Durham, rebranded as Invent Group in 2026, which has since released VeriCase, Bid King and Schools-safe. Malcolm’s focus is on identifying real operational challenges and turning them, in partnership with clients, into practical and commercially viable technology.',
      credentials: [
        'Founder and CEO, NE Tech, rebranded Invent Group (2025)',
        'Director of Strategic Development, Mobile Rocket',
        'National Director of New Business, OT Group',
        'Business Development Director, OfficeTeam',
        'Over 25 years in commercial strategy and go-to-market leadership',
        'Published on AI adoption, Invent Group (18 August 2026)',
      ],
      list: {
        label: 'Notable products',
        items: [
          { name: 'VeriCase', detail: 'AI-powered legal dispute and complex casework platform' },
          { name: 'Bid King', detail: 'AI-assisted bid, tender and proposal response tool' },
          { name: 'Rocket Healthcare', detail: 'Mobile Rocket; featured in Open Access Government, 2023' },
        ],
      },
    },
    {
      name: 'Sam Whisker',
      role: 'Chief Technology Officer · AI Implementation & Product Engineering',
      photo: { src: '/assets/team/sam-whisker.jpg', alt: 'Sam Whisker' },
      bio:
        'Sam is a software engineer and AI specialist who has spent his entire career writing code that changes how organisations operate. A Teesside University graduate, he began as a senior PHP developer at Stockton-based web development firm Koodoo Creative before becoming Chief Technology Officer of Mobile Rocket, the Newton Aycliffe company whose recruitment and workforce platforms are now used by organisations including Amazon, Waitrose and the NHS. During his time as CTO, Mobile Rocket was shortlisted for Recruitment Technology Innovation of the Year at the Recruiter Awards 2023. Since 2024 he has concentrated on AI implementation, advising businesses in sectors from manufacturing to recruitment on process automation, custom GPT systems and AI-driven workflows. In 2025 he co-founded NE Tech, now Invent Group, with Malcolm Brechin and leads its technology, building AI products including VeriCase, for managing complex legal disputes, and Bid King, for tenders and proposals. Sam’s strength lies in moving ideas from prototype to working, scalable systems that deliver measurable gains in operational efficiency.',
      credentials: [
        'Co-Founder and CTO, NE Tech, rebranded Invent Group (2025)',
        'Chief Technology Officer, Mobile Rocket, from 2013',
        'Shortlisted, Recruiter Awards 2023 (Mobile Rocket, as CTO)',
        'Independent AI implementation consultant since 2024',
        'Teesside University graduate; developer since 2008',
      ],
      list: {
        label: 'Notable products',
        items: [
          { name: 'VeriCase', detail: 'AI-native legal dispute product for complex casework' },
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
  account: '{{UI_CASE}}[[note:8]]',
  accountGate: 'G6_ui',
  closing:
    'Each adjudication turns on its own facts, its own law and its own adjudicator. This account describes one use of VeriCase. It is not a prediction or a promise of the result in any other matter.',
};

export const DEMONSTRATION = {
  eyebrow: 'Next step',
  h2: 'See it on a matter like yours.',
  body: 'We will take you through the Chronology Lens™, Research, the claims builder and Rebuttal Mode on sample correspondence, and answer your questions on integrity and access.',
  ownMaterial: 'If you would like to see VeriCase on your own material, we will first agree confidentiality terms with you.',
  ownMaterialGate: 'G5_ownMaterial',
  copy: 'Copy email address',
  copied: 'Email address copied.',
  microcopy: 'Opens your email client with the subject line completed. Please do not include confidential details of a live matter.',
  plain: 'Or write to enquiries@veri-case.com.',
};

export const NOTES_SECTION = {
  heading: 'Notes',
  intro: 'Each note marker on this page links here, and each note links back to where it was cited.',
  back: 'Back to text',
  readInNotes: 'Read in Notes',
};

export const FOOTER = {
  descriptor: 'Software to organise project records, find supporting evidence and prepare construction claims and responses.',
  heads: { contents: 'Contents', company: 'Company', cookies: 'Cookies' },
  company: { about: 'Who is behind it', demo: 'Request a demonstration', signIn: 'Sign in' },
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
    caption: 'A gap in the shelf. Illustrative image (AI-generated).',
    alt: 'Illustrative image: a gap in a shelf of archive boxes.',
    drawn: {
      caption: 'A gap in the shelf. An illustrative drawing of the fictional sample matter.',
      alt: 'Illustrative drawing: an elevation of a bay of archive shelving holding the box files for the fictional sample matter, Boxes 13 to 19, one a month from December 2024 to June 2025. Box 16 is not on the shelf: a dashed outline marks where it should stand, the gap is dimensioned at 85 millimetres, and the title block records the shelf as found.',
    },
  },
};
