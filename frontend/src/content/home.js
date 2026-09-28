// Copy deck for the home page: "The Working Record". British English; dates as DD Month YYYY;
// no em or en dashes. Inline markup read by components/editorial/Rich.jsx:
//   [[note:n]]      numbered site note (brass superscript, opens a Popover, links to Notes)
//   [[ev:EV-0131]]  product citation chip that opens the fictional source in the Source sheet
//   *text*          italic
//   {{TOKEN}}       owner-supplied text; blocks a production build until supplied
// Items with a `gate` are governed by content/gates.js (open, confirmed or struck).

export const BRAND_LINE = 'Make time your ally, not your enemy.';
export const CTA_LABEL = 'Book a demonstration';
export const CTA_MICROCOPY = 'Opens an email to enquiries@veri-case.com. Please do not include confidential details of a live matter.';
export const CTA_MICROCOPY_SHORT = 'Opens an email. Please do not include confidential details of a live matter.';

// Chapters, in page order. Used by the Contents sheet, the footer and the 404 page.
export const CHAPTERS = [
  { id: 'top', numeral: '', title: 'Records, records, records.', sheetLabel: 'Cover', nav: null },
  { id: 'clock', numeral: 'I', title: 'The clock', nav: null },
  { id: 'chronology-lens', numeral: 'II', title: 'The Chronology Lens™', nav: 'Chronology Lens' },
  { id: 'research', numeral: 'III', title: 'Ask, cite, bundle', nav: 'Ask, cite, bundle' },
  { id: 'claims', numeral: 'IV', title: 'Build the claim', nav: null },
  { id: 'case-room', numeral: 'V', title: 'The case room', nav: 'Rebuttal' },
  { id: 'integrity', numeral: 'VI', title: 'The record holds', nav: 'Integrity' },
];
export const END_MATTER = [
  { id: 'platform', title: 'In brief' },
  { id: 'about', title: 'Who is behind it', nav: 'About' },
  { id: 'demonstration', title: 'Book a demonstration' },
  { id: 'notes', title: 'Notes' },
];

export const HEADER = {
  skip: 'Skip to content',
  logoAlt: 'VeriCase home',
  signIn: 'Sign in',
  contents: 'Contents',
  sheetTitle: 'Contents',
  sheetDescription: 'The chapters of this page.',
  endMatterLabel: 'End matter',
  close: 'Close contents',
};

export const COVER = {
  masthead: ['Records,', 'records,', 'records.'],
  eyebrow: 'The pre-litigation evidence workspace for construction disputes',
  h1: 'Years of project correspondence. One cited chronology.',
  subhead:
    'VeriCase turns project email and documents into a time-ordered chronology, a cited analysis and a numbered bundle, so that solicitors, counsel, experts and contractors’ commercial teams can test each point against the record.',
  fastPath: 'Short on time? The platform in brief',
  strip: [
    { label: 'Founded by a practitioner', text: 'William Rogers MCIArb: construction claims, forensic quantum and adjudication.' },
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
    'Many construction disputes run to fixed timetables. When a notice falls due or a referral arrives, the case is only as strong as the record you can find, read and cite in the time allowed. It is often said that the three lessons of construction disputes are records, records and records. The periods below show why.',
  fail: 'The record exists, but it sits across mailboxes, custodians and years, in a form no one can read in order.',
  recover: 'VeriCase helps you put the record in order before the clock starts, and keeps each entry tied to its source.',
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
  context: {
    heading: 'Context, with its sources',
    keys: ['referrals', 'sumsInDispute', 'majorProjects'],
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
        'Plate 2. The record as it is kept: sixteen months of correspondence in six mailboxes, one mark per message. An illustrative drawing of the fictional sample matter. See note B.',
      alt: 'Illustrative drawing: the correspondence of the fictional sample matter as it is kept, one mark per message, in six lanes for the mailboxes of the Employer’s Agent, the Contractor’s Design Manager, Site Manager and Commercial Manager, the Façade Sub-Contractor’s Package Manager and the Supplier’s Sales Office, a week to a line from January 2024 to April 2025. Copies repeat faintly across mailboxes, and noise is drawn hollow. Near the foot, a bracket gathers the five weeks from 03 March 2025 in which the eight exhibits in issue, EV-0131 to EV-0153, are marked in blue.',
    },
  },
  fig: {
    number: 3,
    summary:
      'Illustration: the sample matter in the Chronology Lens workbench, with eight entries from four parties in date order, controls for view, date window, Smart Filter, excluded keywords and Create bundle, and a File Manager view of attachments by type with a Show Noise switch.',
    caption: 'Fig. 3. The Chronology Lens™ workbench and File Manager, illustrated with the sample matter. Counts are illustrative. See note A.',
  },
  next: { label: 'Next: ask the record a question', href: '#research' },
};

export const RESEARCH = {
  numeral: 'III',
  eyebrow: 'Chapter III · Research',
  h2: 'Ask a question. Read a cited answer. Bundle the sources.',
  lead:
    'Research takes a question in plain English, shows you how it has understood it, and returns a VeriCase Analysis Report in which each finding carries a numbered citation to the email or document it rests on. One step turns the cited items into a bundle.',
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
  numeral: 'IV',
  eyebrow: 'Chapter IV · Claims builder and collaboration',
  h2: 'Draft the claim with the evidence already cited.',
  lead:
    'Structure the Heads of Claim, draft the narrative and cite by message ID as you write. The project team, solicitors, counsel and experts work on the same evidence, and discuss it where it sits.',
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
  numeral: 'V',
  kicker: 'Project time ends. Case time begins.',
  cut: 'Case time',
  h2: 'Their points, numbered. Your replies, cited.',
  lead:
    'Upload the other side’s submission. Rebuttal Mode divides it into numbered points, ranks the evidence that bears on each by content, date window and participants, and proposes reply points that must cite the evidence they rely on. A person accepts, edits or rejects each one, and every decision is recorded.',
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
    'Raw email is held in immutable storage with a cryptographic hash for each message. Everything done to the evidence afterwards is recorded against it, and each person sees only what their role permits.',
  leadGate: 'G5_hash',
  fail: 'A bundle assembled by hand at midnight is where exhibits can go missing, pages can be misnumbered and a citation can point to the wrong document.',
  recover: 'Bundles are numbered in sequence and carry a manifest listing each item.',
  controls: [
    { icon: 'HashSeal', title: 'Immutable originals', text: 'Each raw message is kept unchanged with its hash, so the working record can be compared with the message as received.', gate: 'G5_hash' },
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
  eyebrow: 'In brief',
  h2: 'The platform, on one page.',
  sub: 'VeriCase is deliberately lean: evidence, chronology, claims and rebuttal. Each line links to the chapter that shows it.',
  ledger: [
    { numeral: 'II', href: '#chronology-lens', title: 'Ingestion', text: 'PST, MSG, EML, PDF, DOC, DOCX, spreadsheets and images, with OCR. One record per message, threaded by header, with quoted text folded, near-duplicates set aside and attachments listed by type in File Manager.' },
    { numeral: 'II', href: '#chronology-lens', title: 'The Chronology Lens™', text: 'One time-ordered view across every party, in Cards or Table view, with a project date window, Smart Filter, Exclude keywords and Create bundle.' },
    { numeral: 'III', href: '#research', title: 'Research', text: 'Plain-English questions, an editable Query Plan, and an Analysis Report with numbered citations, counts and a validation badge. Download PDF or create a bundle.' },
    { numeral: 'IV', href: '#claims', title: 'Claims builder', text: 'Heads of Claim, a narrative cited by message ID, an evidence finder, and Word or PDF export.' },
    { numeral: 'V', href: '#case-room', title: 'Rebuttal Mode', text: 'Numbered points, ranked evidence, reply points with mandatory citations, accept, edit or reject with an audit trail, and an export pairing each point with its reply and cited evidence.' },
    { numeral: 'VI', href: '#integrity', title: 'Integrity and access', text: 'Immutable originals with hashes, a per-message audit trail, numbered bundles with manifests, role-based access and server-side AI.' },
  ],
  benchmarks: {
    gate: 'G4_benchmarks',
    text: 'In benchmark testing, VeriCase processed more than 50,000 documents per hour[[note:9]] and extracted dates with 99.7% accuracy.[[note:10]] The notes describe how each figure was measured, so that you can judge them for yourself.',
  },
  audience: {
    label: 'Who it is for',
    text: 'For construction solicitors and counsel, including King’s Counsel; claims consultants; quantum and other experts; and contractors’ commercial and in-house legal teams.',
  },
  questionsLabel: 'Questions',
  questions: [
    { q: 'Does VeriCase replace our disclosure platform?', a: 'No. VeriCase is a pre-litigation workspace. It prepares evidence, chronology, claim and rebuttal material, which then moves to the platform your solicitors use.' },
    { q: 'Will the output be accepted by the tribunal?', a: 'Admissibility and weight are for the tribunal. VeriCase keeps each original with its hash, message ID and source path, and records what was done to it, so that its provenance can be examined.' },
    { q: 'Does the AI write our submissions?', a: 'No. It suggests evidence and proposes reply points, each with citations. A person accepts, edits or rejects every proposal, and the decision is recorded. Responsibility for anything served stays with its author.' },
    { q: 'Who sees what?', a: 'Access is by role: Team Leader, Senior Lawyer, Claims Consultant, QS, Project Manager, External Counsel and Client Viewer. BCC recipients and other sensitive fields are restricted by permission.', gate: 'G5_roles' },
    { q: 'Where is our data held, and is it used to train AI models?', a: '{{DATA_POLICY}}', gate: 'G8_data' },
  ],
};

export const FOUNDER = {
  eyebrow: 'Who is behind it',
  h2: 'Built by people who have had to assemble the record themselves.',
  body1:
    'VeriCase was founded by William Rogers MCIArb, a construction commercial management professional who specialises in claims, forensic quantum and adjudication under the NEC, JCT and FIDIC forms, and who founded Quantum Commercial Solutions in 2016.',
  body2: 'Practitioners from law firms and claims consultancies hold equity in VeriCase Ltd. Their involvement is not an endorsement by the firms they work for.',
  body2Gate: 'G5_equity',
  credentials: ['William Rogers MCIArb', 'Founder, VeriCase Ltd', 'Member of the Chartered Institute of Arbitrators', 'Founder, Quantum Commercial Solutions (2016)'],
  declaration: {
    label: 'Declaration of interest',
    text: 'United Infrastructure is an associated company of VeriCase’s founder, William Rogers. We state the connection before the account, so that you can give the account the weight you think it deserves.',
  },
  h3: 'A record of use: United Infrastructure',
  account: '{{UI_CASE}}[[note:11]]',
  accountGate: 'G6_ui',
  closing:
    'Each adjudication turns on its own facts, its own law and its own adjudicator. This account describes one use of VeriCase. It is not a prediction or a promise of the result in any other matter.',
  plate: {
    caption: 'Plate {n}. A site office desk. Illustrative image (AI-generated). See note B.',
    alt: 'Illustrative image: a site diary and printed correspondence on a desk.',
    drawn: {
      caption: 'Plate {n}. The Change to bracket type B, valued and checked. An illustrative drawing of the fictional sample matter. See note B.',
      alt: 'Illustrative drawing: a valuation of the Change to bracket type B, Levels 3 to 6, in the fictional sample matter, ruled by hand as a schedule. Five items are priced by quantity, unit and rate: stainless brackets type B, the omission of aluminium brackets type A shown in brackets, thermal isolator pads, anchors, and extra labour to fix, for a total of £15,120. Each amount carries a checking tick and the total is ringed.',
    },
  },
};

export const DEMONSTRATION = {
  eyebrow: 'Next step',
  h2: 'See it on a matter like yours.',
  body: 'We will take you through the Chronology Lens™, Research, the claims builder and Rebuttal Mode on sample correspondence, and answer your questions on integrity and access.',
  ownMaterial: 'If you would like to see VeriCase on your own material, we will first agree confidentiality terms with you.',
  ownMaterialGate: 'G5_ownMaterial',
  copy: 'Copy email address',
  copied: 'Email address copied.',
  microcopy: 'Book a demonstration opens an email to enquiries@veri-case.com with the subject line completed. Please do not include confidential details of a live matter.',
  plain: 'Or write to enquiries@veri-case.com.',
  plate: {
    caption: 'Plate {n}. A bundle, tabbed and tied. Illustrative image (AI-generated). See note B.',
    alt: 'Illustrative image: a tabbed bundle tied with legal ribbon.',
    drawn: {
      caption: 'Plate {n}. The bundle, tabbed and indexed. An illustrative drawing of the fictional sample matter. See note B.',
      alt: 'Illustrative drawing: the bound bundle for the fictional sample matter, VC-SAMPLE-01, in spine and front elevation with six divider tabs, beside the first page of its index: items 001 to 006, EV-0131 of 03 March 2025 to EV-0151 of 28 March 2025. The tab for EV-0151, the notice under clause 2.24, is picked out.',
    },
  },
};

export const NOTES_SECTION = {
  heading: 'Notes',
  intro: 'Each note marker on this page links here, and each note links back to where it was cited.',
  back: 'Back to text',
  readInNotes: 'Read in Notes',
};

export const FOOTER = {
  descriptor: 'The pre-litigation evidence workspace for construction disputes: evidence, chronology, claims and rebuttal.',
  heads: { contents: 'Contents', company: 'Company', cookies: 'Cookies' },
  company: { about: 'Who is behind it', demo: 'Book a demonstration', signIn: 'Sign in' },
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
  h1: 'This record is not in the bundle.',
  body: 'The page you asked for does not exist, or has moved. The contents below will take you back to the record.',
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
