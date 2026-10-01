# Full original capability copy for proposed restoration

Use only after reproduction. Keep paragraphs intact. Gates G5.* are confirmed.

```js
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

```
