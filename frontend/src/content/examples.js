// The app examples (owner, 09 October 2026: "use app.veri-case.com for the main inspiration", "draw
// inspiration from its features"). Each example shows one output the application produces, as its
// own screen shows it, drawn more simply: the same fictional matter as the rest of the page (a
// nine-storey residential building with a ground-floor nursery, under JCT Design and Build 2016),
// with no names, places or sums from a real matter. Counts are illustrative, and each caption says
// so. The features seen in the application on 09 October 2026 (E18), and lanes, rebuttal and
// drafting, restored on the owner's word that day (E12, E4, E5; docs/design/website-capability-
// register.md).

export const EXAMPLE_LABEL = 'Example';
export const PROJECT = 'Sample project';

// The application's own navigation, for the rail beside each example.
export const RAIL = ['Chronology Lens', 'Research', 'Add Evidence', 'Bundles', 'Collaboration', 'Activity Log'];

// Add Evidence: a mailbox in, parsed, analysed and searchable.
export const UPLOAD_EXAMPLE = {
  title: 'A mailbox in, ready to search.',
  view: 'Add Evidence',
  heading: 'Add evidence',
  intro: 'Upload mailboxes, emails, documents and images.',
  formats: ['PST', 'EML', 'MSG', 'PDF', 'DOCX', 'XLSX', 'JPEG', 'TIFF'],
  file: { name: 'Site manager mailbox.pst', size: '4.2 GB' },
  steps: [
    { name: 'Upload', text: 'Sent securely to VeriCase' },
    { name: 'Parse', text: 'Emails and attachments extracted and indexed' },
    { name: 'Analyse', text: 'Read against your keywords' },
    { name: 'Ready', text: 'In the evidence view, searchable' },
  ],
  result: [
    { value: '18,406', label: 'emails' },
    { value: '6,931', label: 'attachments' },
    { value: '412', label: 'set aside as noise' },
  ],
  caption: 'Illustrative upload from a fictional construction matter. Counts are illustrative.',
};

// Chronology Lens: a search that finds the passage inside an attachment, in date order.
export const SEARCH_EXAMPLE = {
  title: 'The Chronology Lens™',
  intro: 'Find the passage that changes the picture. Search emails and attachments together, with matching passages in date order and their sources alongside.',
  view: 'Chronology Lens',
  placeholder: 'Search evidence',
  term: 'time impact',
  count: '2 of 1,084 results',
  order: 'In date order',
  results: [
    {
      date: '21 Oct 2024',
      from: 'Employer’s Agent',
      to: 'Contractor',
      subject: 'Façade change: brick-slip panels',
      foundIn: 'Facade instruction.pdf',
      before: 'Change from render to brick-slip panels. Cost: a saving; ',
      after: ': none.',
      attachments: [{ name: 'Facade instruction.pdf', size: '212 KB' }],
    },
    {
      date: '25 Nov 2024',
      from: 'Package manager',
      to: 'Commercial manager',
      subject: 'Risk register, November',
      foundIn: 'Risk register.xlsx',
      before: 'Brick-slip panels: bespoke sizes required; ',
      after: ' six to eight weeks.',
      attachments: [{ name: 'Risk register.xlsx', size: '96 KB' }],
    },
  ],
  caption: 'Illustrative search from a fictional construction matter.',
};

// The evidence item: the email in full, tagged, and a colleague mentioned, which opens a
// discussion on it.
export const ITEM_EXAMPLE = {
  title: 'One email: read, tagged and discussed.',
  view: 'Chronology Lens',
  subject: 'Road works: early notice',
  date: '14 Feb 2025, 09:12',
  from: 'Commercial manager',
  to: 'Employer’s Agent',
  body: [
    'Please treat this email as early notice: the off-site road works are a Relevant Event under clause 2.26.13.',
    'We will send our assessment of the delay with monthly report 9.',
  ],
  tagsLabel: 'Tags',
  tags: ['Notice', 'Road works'],
  mentionsLabel: 'Mentions',
  mention: 'Claims consultant',
  discussionNote: 'A discussion about this evidence has been opened with the people mentioned.',
  discussionLabel: 'Discussion',
  messages: [
    { who: 'Commercial manager', initials: 'CM', text: 'Is this enough to count as notice under clause 2.24?' },
    { who: 'Claims consultant', initials: 'CC', text: 'It names the Relevant Event but gives no estimate of delay. Report 9 may supply it.' },
  ],
  caption: 'Illustrative evidence and discussion from a fictional construction matter.',
};

// Research, Executive Analysis: quick questions to the evidence, as you would ask a colleague
// (owner, 09 October 2026: "General searches and quick chatting with your evidence ... should also
// be a focal point"). Two turns; the last answer carries its sources and a confidence score.
export const ANALYSIS_EXAMPLE = {
  title: 'Just ask.',
  view: 'Research',
  mode: 'Executive Analysis',
  scope: '1,084 evidence items in scope',
  turns: [
    {
      question: 'When did the client first ask for early access to the nursery?',
      answer: 'On 12 March 2025. The client’s project manager asked for fit-out access by 01 September 2025.',
    },
    {
      question: 'Did they ever confirm it as a change?',
      answer: 'Not before completion. Two weeks later their representative said later access was not acceptable to the nursery’s funder, but the change request for early access only came on 14 January 2026.',
    },
  ],
  evidenceLabel: 'Supporting evidence',
  evidence: [
    'Email of 26 March 2025: later access not acceptable to the funder.',
    'Change request 21, 14 January 2026: early access to the nursery.',
  ],
  confidenceLabel: 'Confidence score',
  confidence: 78,
  confidenceNote: 'Consistent across both sources.',
  sources: 'View 2 sources',
  caption: 'Illustrative questions and answers from a fictional construction matter. The score is illustrative.',
};

// Research, Deep Research: a report on one question, with its checks, from which a bundle is built.
export const REPORT_EXAMPLE = {
  title: 'A full report on one question.',
  view: 'Research',
  mode: 'Deep Research',
  question: 'What notice did the Contractor give of delay from the loading bay reduction?',
  stats: [
    { value: '14', label: 'Sources cited' },
    { value: '243', label: 'Evidence analysed' },
    { value: 'Passed', label: 'Validation', badge: true },
  ],
  actions: ['Download PDF', 'View report', 'Create bundle'],
  reportTitle: 'VeriCase Analysis Report',
  summaryHeading: 'Executive summary',
  summary: 'The Contractor’s first warning came in monthly report 11, its effect still being assessed. Six weeks later its commercial manager put the delay at two months. The Employer’s Agent replied by asking which clause it relied on.',
  anglesHeading: 'Key research angles',
  angles: [
    'Whether the early warning in monthly report 11 was a notice under clause 2.24',
    'Whether the reduced bay was a Change or the road authority’s requirement',
  ],
  caption: 'Illustrative report from a fictional construction matter. Counts are illustrative.',
};

// Bundles: built from the report's evidence, ordered, with a cover page, and downloaded.
export const BUNDLE_EXAMPLE = {
  title: 'A bundle, built and downloaded.',
  view: 'Bundles',
  bundleTitle: 'Loading bay: notice of delay',
  source: 'Deep Research',
  // Built for you (owner, 09 October 2026): Create bundle on a Deep Research report gathers the
  // evidence the report cites, in order, with the report itself on top, after the cover page.
  auto: 'Built from the report in one step: the report on top, then every item it cites.',
  contentsLabel: 'Bundle contents',
  cover: 'Cover page',
  fixed: 'Fixed',
  items: [
    { title: 'VeriCase Analysis Report', sub: 'Deep Research, 09 October 2026', kind: 'Report' },
    { title: 'Monthly report 11', sub: '30 April 2025', kind: 'Document' },
    { title: 'Loading bay: delay assessment', sub: '11 June 2025', kind: 'Email' },
    { title: 'Re: Loading bay: delay assessment', sub: '13 June 2025', kind: 'Email' },
    { title: 'Road authority comments', sub: '19 May 2025', kind: 'Document' },
  ],
  settingsLabel: 'PDF settings',
  coverToggle: 'Include cover page',
  numberingLabel: 'Page numbering',
  numbering: ['1, 2, 3', 'a, b, c', 'I, II, III', '1, 1a, 2'],
  coverLabel: 'Cover page',
  coverFields: [['Case / matter', 'Sample project'], ['Prepared by', 'Contractor'], ['Bundle date', '09 October 2026']],
  // The PDF as the application builds it (the owner's bundle of 09 October 2026, read for its form
  // only, and the owner's confirmation that day that the report goes in it): a cover sheet, an index
  // with page numbers, then the report on top of the items, each headed with its number and kind.
  pdfLabel: 'As downloaded',
  pdfCover: { kicker: 'Evidence bundle', fields: [['Case / matter', 'Sample project'], ['Bundle date', '09 October 2026']] },
  pdfIndex: { title: 'Index', columns: ['No.', 'Title', 'Date', 'Page'] },
  pdfItem: {
    kicker: 'Item 1 · Report', page: 3, title: 'VeriCase Analysis Report',
    fields: [['Question', 'What notice did the Contractor give of delay from the loading bay reduction?'], ['Sources cited', '14'], ['Validation', 'Passed']],
    summaryHeading: REPORT_EXAMPLE.summaryHeading,
    summary: REPORT_EXAMPLE.summary,
  },
  ready: 'Download ready',
  file: 'Loading bay notice of delay.pdf',
  caption: 'Illustrative bundle from a fictional construction matter.',
};

// Activity Log: every upload, tag, message and access change, with who and when.
export const ACTIVITY_EXAMPLE = {
  title: 'Every step, on the record.',
  view: 'Activity Log',
  heading: 'Activity Log',
  intro: 'Every upload, tag, message and access change in this project.',
  columns: ['Activity', 'Type', 'Date'],
  rows: [
    { activity: 'Commercial manager uploaded Site manager mailbox.pst', type: 'File upload', date: '03 Feb 2026, 08:41' },
    { activity: 'Commercial manager tagged evidence with “Notice”', type: 'Evidence tagged', date: '04 Feb 2026, 10:15' },
    { activity: 'Claims consultant added a collaboration message', type: 'Message', date: '04 Feb 2026, 11:02' },
    { activity: 'Project lead granted the delay expert member access', type: 'Access granted', date: '05 Feb 2026, 16:30' },
  ],
  caption: 'Illustrative activity from a fictional construction matter.',
};

// Collaboration, lanes (owner, 06 October 2026; restored on the owner's word of 09 October 2026):
// one email discussed in separate lanes, each with its own members. Each lane is read only by the
// people added to it (gate G14). Roles only; the lanes and their members are illustrative.
export const LANES_EXAMPLE = {
  title: 'Separate conversations, one email.',
  view: 'Collaboration',
  record: { subject: 'Road works: early notice', date: '14 Feb 2025' },
  membersLabel: 'Members',
  lanes: [
    {
      name: 'Site team',
      members: ['Project manager', 'Site manager'],
      messages: [
        { who: 'Project manager', initials: 'PM', text: 'Our revised forecast went with monthly report 9, two weeks after this email.' },
        { who: 'Site manager', initials: 'SM', text: 'The road closure started on 03 March. The site diary has it.' },
      ],
    },
    {
      name: 'Commercial',
      members: ['Commercial manager', 'Quantity surveyor'],
      messages: [
        { who: 'Commercial manager', initials: 'CM', text: 'Put report 9 and the site diary in the bundle with this email.' },
      ],
    },
    {
      name: 'With the delay expert',
      members: ['Commercial manager', 'Delay expert'],
      messages: [
        { who: 'Delay expert', initials: 'DE', text: 'I will need the road design pack too, to see when the works could start.' },
      ],
    },
  ],
  note: 'Each lane is read only by the people added to it.',
  caption: 'Illustrative discussion in lanes, from a fictional construction matter.',
};

// Rebuttal (restored on the owner's word of 09 October 2026; product source E4): one point from the
// other side's response, the records set beside it, and a proposed reply for your team to review.
export const REBUTTAL_EXAMPLE = {
  title: 'Answer the other side, point by point.',
  view: 'Rebuttal',
  mode: 'Rebuttal',
  documentLabel: 'Their response',
  pointLabel: 'Paragraph 31',
  point: 'The courtyard paving revisions were design development by the Contractor’s landscape architect.',
  recordsLabel: 'Evidence',
  records: [
    { title: 'Change request 14', date: '16 June 2025', text: 'Revise the courtyard paving to the layout attached.', relation: 'Challenges', tone: 'warn' },
    { title: 'Drawing issue sheet', date: '22 July 2025', text: 'Revision C: courtyard paving, following change request 14.', relation: 'Challenges', tone: 'warn' },
  ],
  replyLabel: 'Proposed reply',
  reply: 'The paving was revised in answer to the client’s change request of 16 June 2025, not as design development (Change request 14; Drawing issue sheet, 22 July 2025).',
  review: 'For your team to review',
  actions: ['Accept', 'Edit'],
  caption: 'Illustrative rebuttal from a fictional construction matter.',
};

// Drafting (restored on the owner's word of 09 October 2026; product source E5, gate G5_claims): a
// claim section written paragraph by paragraph from its records, exported as Word or PDF.
export const DRAFTING_EXAMPLE = {
  title: 'Draft the claim from the records.',
  view: 'Drafting',
  mode: 'Drafting',
  documentTitle: 'Claim for additional security works',
  sectionLabel: 'Section heading',
  section: 'Section 5. Access control and cameras',
  paragraphs: [
    { n: '5.1', text: 'We asked for an instruction on the police adviser’s additional security works.', source: 'RFI 112, 14 November 2024' },
    { n: '5.2', text: 'The client answered nine months later: comply.', source: 'Answer to RFI 112, 21 August 2025' },
    { n: '5.3', text: 'We confirmed the same day that we would carry out the works as a variation.', source: 'Our reply, 21 August 2025' },
  ],
  status: 'Draft, for review before export',
  actions: ['Export Word', 'Export PDF'],
  caption: 'Illustrative claim section from a fictional construction matter.',
};

// Restored on 09 October 2026 (owner: "forgotten about a lot of the stuff that we had in there
// before"): the reader, the argument and the exported report from the site before PR #14, redrawn
// as the application shows them, with the same fictional records.

// The reader: a document read beside its file record, the find term typed and the passage marked.
export const READER_EXAMPLE = {
  title: 'The document beside its file record.',
  view: 'Chronology Lens',
  recordsLabel: 'Evidence, in date order',
  records: [
    { document: 'Façade instruction', date: '21 Oct 2024', folder: 'Instructions' },
    { document: 'RFI 112', date: '14 Nov 2024', folder: 'RFIs' },
    { document: 'Risk register', date: '25 Nov 2024', folder: 'Reports' },
    { document: 'Monthly report 11', date: '30 Apr 2025', folder: 'Reports' },
    { document: 'Road authority comments', date: '19 May 2025', folder: 'Correspondence' },
    { document: 'Answer to RFI 112', date: '21 Aug 2025', folder: 'Correspondence' },
  ],
  selected: 5,
  detailsLabel: 'File record',
  details: [['From', 'Employer’s Agent'], ['To', 'Design manager'], ['Date', '21 August 2025'], ['Folder', 'Correspondence']],
  views: ['Document', 'Details', 'Text', 'Notes'],
  findLabel: 'Find in document',
  findTerm: 'police adviser',
  page: 'Page 1 of 1',
  email: {
    header: [['From', 'Employer’s Agent'], ['Sent', '21 August 2025'], ['To', 'Design manager'], ['Subject', 'RFI 112: access control and cameras']],
    before: 'In answer to RFI 112 of 14 November 2024, please comply with the ',
    found: 'police adviser',
    after: '’s requirements for the access control and camera works.',
  },
  caption: 'Illustrative records from a fictional construction matter.',
};

// The argument: the drafted points, each citing its record, and the records arriving beside them.
export const ARGUMENT_EXAMPLE = {
  title: 'An argument with its sources.',
  view: 'Drafting',
  heading: 'Section 4. The road works',
  // One point for each record, in the same order; each point cites its record by name.
  points: [
    'Before contract, the Employer kept the road agreement and its approvals',
    'The Contractor priced the road works at nil',
    'The Employer’s road design pack arrived after the Date for Completion',
  ],
  recordsLabel: 'Supporting records',
  records: [
    { document: 'Agreed items schedule', date: '09 September 2024', excerpt: 'The Employer retains the road agreement and its approvals; the Contractor supplies supporting information only.' },
    { document: 'Contract sum analysis', date: '30 September 2024', excerpt: 'Off-site road works, footways and street lighting: nil.' },
    { document: 'Road design pack', date: '05 March 2025', excerpt: 'The Contractor is to design the drainage and levels and obtain technical approval.' },
  ],
  caption: 'Illustrative argument from a fictional construction matter. Each point is linked to the record behind it.',
};

// The exported report: a short report as it comes out, with its structure and its sources.
export const EXPORT_EXAMPLE = {
  title: 'A report exported with its structure and sources.',
  view: 'Drafting',
  context: 'A short note for the project director on how the forecast completion date moved.',
  file: 'Forecast completion.pdf',
  reportTitle: 'Forecast completion: the monthly reports',
  heading: 'How the date moved',
  paragraph: 'By monthly report 13 the forecast completion date had moved to 12 December 2025, more than nine months after the Date for Completion',
  source: 'Monthly report 13',
  quote: 'Forecast completion: 12 December 2025, subject to technical approval of the road works.',
  quoteSource: 'Monthly report 13, 30 June 2025',
  tableCaption: 'Table 1. Forecast completion, by report',
  columns: ['Forecast completion', 'Record', 'Date'],
  rows: [
    ['28 February 2025', 'Monthly report 7', '31 December 2024'],
    ['25 July 2025', 'Monthly report 9', '28 February 2025'],
    ['12 December 2025', 'Monthly report 13', '30 June 2025'],
  ],
  folio: 'Page 1 of 1',
  caption: 'Illustrative report from a fictional construction matter.',
};
