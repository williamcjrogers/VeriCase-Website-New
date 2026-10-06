// Copy revised under the approved screenshot-led plan, 03 October 2026.
export const TIME_ADVANTAGE = {
  title: 'The project took years. Your response cannot.',
  paragraphs: [
    'The claim has arrived. The deadline is fixed. The record is spread across mailboxes, attachments and years of correspondence.',
    'Use VeriCase to follow disputed events through the record and prepare a response grounded in the documents.',
  ],
};

// Excerpts and dates from the existing fictional sampleEvidence.json, not live client data.
export const EVIDENCE_ILLUSTRATION = [
  { id: 'EV-0131', date: '03 March 2025', isoDate: '2025-03-03', document: 'Instruction', title: 'Change instructed', excerpt: 'Please proceed with bracket type B. This is an instruction requiring a Change.' },
  { id: 'EV-0138', date: '12 March 2025', isoDate: '2025-03-12', document: 'Lead-time email', title: 'Lead time given', excerpt: 'Stainless brackets are ten weeks from order.' },
  { id: 'EV-0147', date: '26 March 2025', isoDate: '2025-03-26', document: 'Delivery confirmation', title: 'Delivery confirmed', excerpt: 'Supplier confirms delivery week commencing 19 May 2025.' },
];

// The two illustrations draw on the records above. They depict outcomes (records read in date
// order; a point read with its sources), are labelled as illustrations and show no application
// controls. A record is cited as the report export cites one: by document and date.
export const ILLUSTRATION_LABEL = 'Illustration';
export const CONTEXT_LABEL = 'In context';

export const CHRONOLOGY_ILLUSTRATION = {
  title: 'From documents to chronology.',
  recordLabel: 'One record, in date order',
  caption: 'Illustrative chronology from a fictional construction matter.',
};

export const ARGUMENT_ILLUSTRATION = {
  title: 'An argument with its sources.',
  // One point for each record above, in the same order; each point cites its record by name.
  points: [
    'The change was instructed on 03 March 2025',
    'The ten-week lead time was recorded on 12 March 2025',
    'Delivery was confirmed on 26 March 2025 for the week commencing 19 May 2025',
  ],
  sourcesLabel: 'Supporting records',
  caption: 'Illustrative argument from a fictional construction matter. The source references connect each point to the record behind it.',
};

// Four further illustrations, one for each capability no application capture shows. Each depicts an
// outcome the capability register supports, uses the same fictional records, and shows no
// controls, counts, mentions or notifications.
export const RESEARCH_ILLUSTRATION = {
  title: 'A question traced to its sources.',
  questionLabel: 'Question',
  question: 'When was the ten-week lead time recorded?',
  findingsLabel: 'Findings',
  // Each finding cites one record above, in the same order.
  findings: [
    'The change to bracket type B was instructed on 03 March 2025.',
    'The lead time of ten weeks from order was recorded on 12 March 2025.',
    'Delivery was then confirmed for the week commencing 19 May 2025.',
  ],
  gap: 'Not found in the records examined: the date on which the brackets were ordered.',
  caption: 'Illustrative research from a fictional construction matter.',
};

export const REBUTTAL_ILLUSTRATION = {
  title: 'An opposing assertion, tested against the record.',
  assertionLabel: 'Opposing submission, paragraph 12',
  // The page acts for the Contractor throughout: the Employer's Response says the delay was apparent
  // on 12 March 2025, so that the Contractor's notice of 28 March came too late.
  assertion: 'Delay was reasonably apparent to the Contractor on 12 March 2025.',
  recordsLabel: 'The record',
  // Indexes into EVIDENCE_ILLUSTRATION, each with how it bears on the assertion.
  records: [
    { index: 1, relation: 'Gives a lead time from order, not a delivery week.' },
    { index: 2, relation: 'Confirms the delivery week, fourteen days later.' },
  ],
  replyLabel: 'Proposed reply, for review',
  // The reply cites its record as the argument illustration does: "(document)." after the point.
  reply: 'On 12 March 2025 the Contractor knew the lead time but not the delivery week, which the supplier confirmed on 26 March 2025',
  replySource: 2,
  caption: 'Illustrative rebuttal from a fictional construction matter.',
};

export const DRAFTING_ILLUSTRATION = {
  title: 'A claim section built from its records.',
  // The prompt's label, over the section heading typed under it.
  sectionHeadingLabel: 'Section heading',
  sectionLabel: 'Section 4. Bracket type B',
  recordsLabel: 'Record',
  // One paragraph for each record above, in the same order.
  paragraphs: [
    { n: '4.1', text: 'The change to bracket type B was instructed.' },
    { n: '4.2', text: 'The lead time was ten weeks from order.' },
    { n: '4.3', text: 'Delivery was confirmed for the week commencing 19 May 2025.' },
  ],
  status: 'Draft, for review before export.',
  caption: 'Illustrative claim section from a fictional construction matter.',
};

export const DISCUSSION_ILLUSTRATION = {
  title: 'A discussion kept with the record.',
  recordIndex: 1,
  commentsLabel: 'Comments on this record',
  comments: [
    { role: 'Commercial manager', text: 'Does this come before the delivery confirmation?' },
    { role: 'Claims consultant', text: 'Yes, by fourteen days. Paragraph 4.2 of the draft relies on it.' },
  ],
  caption: 'Illustrative discussion from a fictional construction matter.',
};

// Lanes (owner, 06 October 2026): the record the discussion figure shows, discussed in three
// lanes, each naming the roles taking part in it. Roles only; it depicts how the discussion is
// organised, not an application screen: no controls, reference numbers, counts or states, and no
// claim about who may read a lane (gate G14). The lanes and their members are illustrative.
export const LANES_ILLUSTRATION = {
  title: 'One record, discussed in lanes.',
  record: 'EV-0138',
  lanesLabel: 'The discussion, in three lanes',
  // Who is talking in each lane. It names the participants, not who may read the lane: in the
  // product source of 01 October 2026 lanes organise the discussion and are not access control.
  audienceLead: 'Discussed by',
  lanes: [
    {
      id: 'core',
      name: 'Core team',
      audience: ['Project manager', 'Commercial manager', 'Solicitor'],
      comments: [
        { role: 'Project manager', text: 'When this email arrived, the brackets were still forecast to arrive in time. The supplier confirmed the delivery week on 26 March 2025.' },
        { role: 'Solicitor', text: 'Please send me the bracket order and the delivery forecast current on 12 March 2025.' },
      ],
    },
    {
      id: 'counsel',
      name: 'With counsel',
      audience: ['Solicitor', 'Counsel'],
      comments: [
        { role: 'Counsel', text: 'The Employer will say that delay was reasonably apparent from this email. What the project team expected on that date is central to the answer.' },
        { role: 'Solicitor', text: 'The project team is locating its forecast for that date. The delay expert will receive the same records.' },
      ],
    },
    {
      id: 'expert',
      name: 'With the delay expert',
      audience: ['Solicitor', 'Delay expert'],
      comments: [
        { role: 'Solicitor', text: 'Please consider whether, on the records available at 12 March 2025, the ten-week lead time was likely to delay completion.' },
        { role: 'Delay expert', text: 'I will also need the records available at 26 March 2025, so that the two dates can be compared.' },
      ],
    },
  ],
  caption: 'Illustrative discussion in lanes, from a fictional construction matter.',
};

// The workspace illustrations replace the three historical application captures (owner, 05 October
// 2026). Each depicts one relationship the product reference register supports: a document read
// beside its file record (PR-03), a matching passage beside the document it comes from (PR-02),
// and a report exported with its structure and source links (PR-04). They are drawn in the page's
// own type and colours, show no controls, and use the same fictional matter as the other figures.
// The matter's records, in date order. Three of them are the EVIDENCE_ILLUSTRATION records above.
export const MATTER_RECORDS = [
  { document: 'Contract particulars', date: '14 January 2025', isoDate: '2025-01-14', folder: 'Contract' },
  { document: 'Instruction', date: '03 March 2025', isoDate: '2025-03-03', folder: 'Correspondence' },
  { document: 'Site diary', date: '10 March 2025', isoDate: '2025-03-10', folder: 'Site records' },
  { document: 'Lead-time email', date: '12 March 2025', isoDate: '2025-03-12', folder: 'Correspondence' },
  { document: 'Progress meeting minutes', date: '20 March 2025', isoDate: '2025-03-20', folder: 'Meetings' },
  { document: 'Delivery confirmation', date: '26 March 2025', isoDate: '2025-03-26', folder: 'Correspondence' },
  { document: 'Photographic record', date: '02 April 2025', isoDate: '2025-04-02', folder: 'Site records' },
];

export const READER_ILLUSTRATION = {
  title: 'The document beside its file record.',
  recordsLabel: 'Records',
  recordsName: 'The matter’s records, in date order',
  selected: 3, // Lead-time email
  // The selected record's details, as its file record holds them.
  details: [['From', 'Supplier'], ['To', 'Package manager'], ['Date', '12 March 2025'], ['Folder', 'Correspondence']],
  // The reader's views, named as the product reference register records them (PR-03).
  views: ['Document', 'Details', 'Text', 'Revisions', 'Notes'],
  findLabel: 'Find in document',
  findTerm: 'ten weeks from order',
  page: 'Page 1 of 1',
  // The original page: an email, with its header and the found passage in its text.
  email: {
    header: [['From', 'Supplier'], ['Sent', '12 March 2025'], ['To', 'Package manager'], ['Subject', 'Bracket type B']],
    before: 'Thank you for the instruction of 03 March 2025. Stainless brackets are ',
    found: 'ten weeks from order',
    after: '. We will confirm the delivery week once the order is placed.',
  },
  // Marginal notes, in the manner of a figure in an expert's report, naming what each part is.
  notes: {
    selected: 'The record selected',
    details: 'Its file record',
    page: 'Its original page',
    found: 'The passage found in the document',
  },
  caption: 'Illustrative records from a fictional construction matter.',
};

export const SEARCH_ILLUSTRATION = {
  title: 'A matching passage and the document it comes from.',
  queryLabel: 'Searched for',
  query: 'ten weeks',
  rankLabel: 'Ranked by match strength',
  // Why someone would look: a dispute moment, stated as a scenario and never as an outcome.
  context: 'The Employer says the delay was apparent once the lead time was known, on 12 March 2025.',
  // Strongest match first. Each passage is quoted from a record in MATTER_RECORDS.
  results: [
    { record: 3, before: 'Stainless brackets are ', match: 'ten weeks', after: ' from order.' },
    { record: 4, before: 'Supplier lead time for bracket type B noted as ', match: 'ten weeks', after: ' from order; order placed, date of order to be confirmed.' },
  ],
  caption: 'Illustrative search from a fictional construction matter.',
};

export const REPORT_ILLUSTRATION = {
  title: 'A report exported with its structure and sources.',
  pageName: 'Exported report page',
  context: 'A short note for the solicitor on when the lead time was first recorded.',
  reportTitle: 'Bracket type B: the record',
  heading: 'Lead time',
  // The paragraph cites its record as a source link; the quotation is kept distinct from the analysis.
  paragraph: 'The lead time of ten weeks from order was recorded on 12 March 2025',
  source: 'Lead-time email',
  sourceNote: 'source link',
  quote: 'Stainless brackets are ten weeks from order.',
  quoteSource: 1, // EVIDENCE_ILLUSTRATION index: the lead-time email
  tableCaption: 'Table 1. Events and their records',
  columns: ['Event', 'Record', 'Date'],
  // One row for each EVIDENCE_ILLUSTRATION record, in the same order.
  rows: ['Change instructed', 'Lead time given', 'Delivery confirmed'],
  folio: 'Page 1 of 1',
  caption: 'Illustrative report from a fictional construction matter.',
};
