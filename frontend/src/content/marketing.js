// Copy revised under the approved screenshot-led plan, 03 October 2026.
export const TIME_ADVANTAGE = {
  title: 'The project took years. Your response cannot.',
  paragraphs: [
    'The claim has arrived. The deadline is fixed. The record is spread across mailboxes, attachments and years of correspondence.',
    'Use VeriCase to follow disputed events through the record and prepare a response grounded in the documents.',
  ],
};

// The fictional matter (owner, 06 October 2026: "make it varied"). A nine-storey residential building
// with a ground-floor nursery, let under the JCT Design and Build Contract 2016 with the Employer's
// amendments; the page acts for the Contractor. Its strands are drawn from the patterns of real
// adjudications (late answers, a "no time impact" instruction, a road approval cycle, early
// access, a reduced loading bay, landscaping, notices) with nothing that could identify a matter:
// no names, places, sums or wording. Each illustration takes its own strand and carries its own
// records, cited as the report export cites one: by document and date.
const record = (document, date, isoDate, excerpt, extra = {}) => ({ document, date, isoDate, excerpt, ...extra });

export const ILLUSTRATION_LABEL = 'Illustration';
export const CONTEXT_LABEL = 'In context';

// The road approval, from the Employer's design pack to technical approval.
export const CHRONOLOGY_ILLUSTRATION = {
  title: 'From documents to chronology.',
  recordLabel: 'One record, in date order',
  sources: [
    record('Road design pack', '05 March 2025', '2025-03-05', 'The Contractor is to design the drainage and levels and obtain technical approval.', { id: 'design-pack', title: 'Design and approval passed to the Contractor' }),
    record('Road authority comments', '19 May 2025', '2025-05-19', 'Not approved. The scheme form is missing.', { id: 'comments', title: 'Not approved: a form missing' }),
    record('Technical approval', '11 August 2025', '2025-08-11', 'Technical approval is granted.', { id: 'approval', title: 'Technical approval granted' }),
  ],
  caption: 'Illustrative chronology from a fictional construction matter.',
};

// Who held the road works before contract: each point marked with the record behind it.
export const ARGUMENT_ILLUSTRATION = {
  title: 'An argument with its sources.',
  // One point for each source, in the same order; each point cites its record by name.
  points: [
    'Before contract, the Employer kept the road agreement and its approvals',
    'The Contractor priced the road works at nil',
    'The Employer’s road design pack arrived after the Date for Completion',
  ],
  sources: [
    record('Agreed items schedule', '09 September 2024', '2024-09-09', 'The Employer retains the road agreement and its approvals; the Contractor supplies supporting information only.', { id: 'agreed-items' }),
    record('Contract sum analysis', '30 September 2024', '2024-09-30', 'Off-site road works, footways and street lighting: nil.', { id: 'sum-analysis' }),
    record('Road design pack', '05 March 2025', '2025-03-05', 'The Contractor is to design the drainage and levels and obtain technical approval.', { id: 'design-pack' }),
  ],
  sourcesLabel: 'Supporting records',
  caption: 'Illustrative argument from a fictional construction matter. The source references connect each point to the record behind it.',
};

// Executive Analysis (owner, 06 October 2026): questions put to the record, back and forth. The
// first question is answered with its records; the follow-up finds a gap. No counts, scores,
// timings or validation marks, which the capability register does not support.
export const RESEARCH_ILLUSTRATION = {
  title: 'A question answered, then the next one.',
  mode: 'Executive Analysis',
  questionLabel: 'Question',
  question: 'Who set the date for early access to the nursery?',
  findingsLabel: 'Answer',
  // Each finding cites the source with the same index.
  findings: [
    'The Employer’s project manager confirmed a requirement for fit-out access by 01 September 2025.',
    'The Employer’s representative then wrote that later access would not be acceptable to the nursery’s funder.',
  ],
  sources: [
    record('Email', '12 March 2025', '2025-03-12', 'We confirm the requirement for fit-out access to the nursery by 01 September 2025.', { id: 'access-requirement' }),
    record('Email', '26 March 2025', '2025-03-26', 'Access after the sectional date is not acceptable to the nursery’s funder.', { id: 'funder' }),
  ],
  followUpLabel: 'Follow-up',
  followUp: 'Was that date ever instructed as a Change?',
  followUpFinding: 'A change request on early access was issued after completion, on 14 January 2026.',
  followUpSource: record('Change request 21', '14 January 2026', '2026-01-14', 'Change request: early access to the nursery.', { id: 'change-21' }),
  gap: 'Not found in the records examined: an instruction setting that date before completion.',
  caption: 'Illustrative questions and answers from a fictional construction matter.',
};

// Deep Research (owner, 06 October 2026): a full report on one question, its research angles, a
// section cited by superscript to an evidence appendix, then a bundle built from that evidence,
// titled, in order and downloaded as a PDF. The bundle is shown as downloaded: an output, not
// the controls that build it.
export const DEEP_RESEARCH_ILLUSTRATION = {
  title: 'A full report, and the bundle built from it.',
  mode: 'Deep Research',
  questionLabel: 'Question',
  question: 'What notice did the Contractor give of delay from the loading bay reduction?',
  reportLabel: 'Report',
  anglesLabel: 'Research angles',
  angles: [
    'Whether the early warning in monthly report 11 was a notice under clause 2.24',
    'Whether the reduced bay was a Change or the road authority’s requirement',
  ],
  sectionHeading: 'The early warning and what followed',
  // The section's sentences, each closed by its superscript reference to the appendix.
  sentences: [
    'Monthly report 11 gave an early warning of double handling, its effect still being assessed.',
    'Six weeks later the Contractor’s commercial manager put the delay at two months.',
    'The Employer’s Agent replied by asking which clause the Contractor relied on.',
  ],
  appendixLabel: 'Evidence appendix',
  appendix: [
    record('Monthly report 11', '30 April 2025', '2025-04-30', '', { id: 'report-11', kind: 'Report' }),
    record('Loading bay: delay assessment', '11 June 2025', '2025-06-11', '', { id: 'assessment', kind: 'Email' }),
    record('Re: Loading bay: delay assessment', '13 June 2025', '2025-06-13', '', { id: 'reply', kind: 'Email' }),
  ],
  bundleLabel: 'Bundle, as downloaded',
  bundleTitle: 'Loading bay: notice of delay',
  cover: 'Cover page',
  bundleFormat: 'Downloaded with its cover page first and every page numbered.',
  caption: 'Illustrative report and bundle from a fictional construction matter.',
};

// The landscaping: design development, or a change?
export const REBUTTAL_ILLUSTRATION = {
  title: 'An opposing assertion, tested against the record.',
  assertionLabel: 'Employer’s Response, paragraph 31',
  assertion: 'The courtyard paving revisions were design development by the Contractor’s landscape architect.',
  recordsLabel: 'The record',
  sources: [
    record('Change request 14', '16 June 2025', '2025-06-16', 'Revise the courtyard paving to the layout attached.', { id: 'change-14' }),
    record('Drawing issue sheet', '22 July 2025', '2025-07-22', 'Revision C: courtyard paving, following change request 14.', { id: 'issue-sheet' }),
  ],
  // Indexes into the sources above, each with how it bears on the assertion.
  records: [
    { index: 0, relation: 'Issued by the Employer’s Agent, as a change.' },
    { index: 1, relation: 'Revises the drawings five weeks after the change request.' },
  ],
  replyLabel: 'Proposed reply, for review',
  // The reply cites its record as the argument illustration does: "(document)." after the point.
  reply: 'The paving was revised in answer to the Employer’s change request of 16 June 2025, not as design development',
  replySource: 0,
  caption: 'Illustrative rebuttal from a fictional construction matter.',
};

// A claim section on the security works, built paragraph by paragraph from its records.
export const DRAFTING_ILLUSTRATION = {
  title: 'A claim section built from its records.',
  // The prompt's label, over the section heading typed under it.
  sectionHeadingLabel: 'Section heading',
  sectionLabel: 'Section 5. Access control and cameras',
  recordsLabel: 'Record',
  // One paragraph for each source, in the same order.
  paragraphs: [
    { n: '5.1', text: 'The Contractor asked for an instruction on the police adviser’s additional security works.' },
    { n: '5.2', text: 'The Employer’s Agent answered nine months later: comply.' },
    { n: '5.3', text: 'The Contractor confirmed the same day that it would carry out the works as a variation.' },
  ],
  sources: [
    record('RFI 112', '14 November 2024', '2024-11-14', 'The access control and camera works the police adviser seeks are outside the Employer’s Requirements. Please instruct.', { id: 'rfi-112' }),
    record('Answer to RFI 112', '21 August 2025', '2025-08-21', 'Please comply with the police adviser’s requirements for the access control and camera works.', { id: 'rfi-answer' }),
    record('Contractor’s reply', '21 August 2025', '2025-08-21', 'We will carry out the access control and camera works as instructed, as a variation.', { id: 'variation' }),
  ],
  status: 'Draft, for review before export.',
  caption: 'Illustrative claim section from a fictional construction matter.',
};

// An email the Contractor says was notice, discussed on the record.
const EARLY_NOTICE = record('Early notice email', '14 February 2025', '2025-02-14', 'Please treat this email as early notice: the off-site road works are a Relevant Event under clause 2.26.13.', { id: 'early-notice' });

export const DISCUSSION_ILLUSTRATION = {
  title: 'A discussion kept with the record.',
  sources: [EARLY_NOTICE],
  recordIndex: 0,
  commentsLabel: 'Comments on this record',
  comments: [
    { role: 'Commercial manager', text: 'Is this enough to count as notice under clause 2.24?' },
    { role: 'Claims consultant', text: 'It names the Relevant Event but gives no estimate of delay. Paragraph 3.2 of the draft deals with that.' },
  ],
  caption: 'Illustrative discussion from a fictional construction matter.',
};

// Lanes (owner, 06 October 2026): the record the discussion figure shows, discussed in three
// lanes, each naming the roles taking part in it. Roles only; it depicts how the discussion is
// organised, not an application screen: no controls, reference numbers, counts or states, and no
// claim about who may read a lane (gate G14). The lanes and their members are illustrative.
export const LANES_ILLUSTRATION = {
  title: 'One record, discussed in lanes.',
  sources: [EARLY_NOTICE],
  record: 'early-notice',
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
        { role: 'Project manager', text: 'Our revised forecast went with monthly report 9 on 28 February 2025, two weeks after this email.' },
        { role: 'Solicitor', text: 'Please send me report 9 and anything else that gave the Employer an estimate of the delay.' },
      ],
    },
    {
      id: 'counsel',
      name: 'With counsel',
      audience: ['Solicitor', 'Counsel'],
      comments: [
        { role: 'Counsel', text: 'The Employer will say this email names a Relevant Event but is not a notice under clause 2.24. Read with report 9, it may be.' },
        { role: 'Solicitor', text: 'Both documents are going into the bundle together, and the delay expert will have both.' },
      ],
    },
    {
      id: 'expert',
      name: 'With the delay expert',
      audience: ['Solicitor', 'Delay expert'],
      comments: [
        { role: 'Solicitor', text: 'Please consider what delay to completion the road works were causing on 14 February 2025.' },
        { role: 'Delay expert', text: 'I will also need the road design pack and the authority’s comments, to see when the works could start.' },
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
// The matter's records, in date order, across its strands.
export const MATTER_RECORDS = [
  { document: 'Agreed items schedule', date: '09 September 2024', isoDate: '2024-09-09', folder: 'Contract' },
  { document: 'Façade instruction', date: '21 October 2024', isoDate: '2024-10-21', folder: 'Instructions' },
  { document: 'RFI 112', date: '14 November 2024', isoDate: '2024-11-14', folder: 'RFIs' },
  { document: 'Risk register', date: '25 November 2024', isoDate: '2024-11-25', folder: 'Reports' },
  { document: 'Monthly report 11', date: '30 April 2025', isoDate: '2025-04-30', folder: 'Reports' },
  { document: 'Road authority comments', date: '19 May 2025', isoDate: '2025-05-19', folder: 'Correspondence' },
  { document: 'Answer to RFI 112', date: '21 August 2025', isoDate: '2025-08-21', folder: 'Correspondence' },
];

export const READER_ILLUSTRATION = {
  title: 'The document beside its file record.',
  recordsLabel: 'Records',
  recordsName: 'The matter’s records, in date order',
  selected: 6, // Answer to RFI 112
  // The selected record's details, as its file record holds them.
  details: [['From', 'Employer’s Agent'], ['To', 'Design manager'], ['Date', '21 August 2025'], ['Folder', 'Correspondence']],
  // The reader's views, named as the product reference register records them (PR-03).
  views: ['Document', 'Details', 'Text', 'Revisions', 'Notes'],
  findLabel: 'Find in document',
  findTerm: 'police adviser',
  page: 'Page 1 of 1',
  // The original page: an email, with its header and the found passage in its text.
  email: {
    header: [['From', 'Employer’s Agent'], ['Sent', '21 August 2025'], ['To', 'Design manager'], ['Subject', 'RFI 112: access control and cameras']],
    before: 'In answer to RFI 112 of 14 November 2024, please comply with the ',
    found: 'police adviser',
    after: '’s requirements for the access control and camera works.',
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

// The façade change: what the instruction said about time, beside what the risk register said.
export const SEARCH_ILLUSTRATION = {
  title: 'A matching passage and the document it comes from.',
  queryLabel: 'Searched for',
  query: 'time impact',
  rankLabel: 'Ranked by match strength',
  // Why someone would look: a dispute moment, stated as a scenario and never as an outcome.
  context: 'The Employer says the façade change had no effect on completion, as its instruction recorded.',
  // Strongest match first. Each passage is quoted from a record in MATTER_RECORDS.
  results: [
    { record: 1, before: 'Change from render to brick-slip panels. Cost: a saving; ', match: 'time impact', after: ': none.' },
    { record: 3, before: 'Brick-slip panels: bespoke sizes required; ', match: 'time impact', after: ' six to eight weeks.' },
  ],
  caption: 'Illustrative search from a fictional construction matter.',
};

// How the forecast completion date moved across the monthly reports.
export const REPORT_ILLUSTRATION = {
  title: 'A report exported with its structure and sources.',
  pageName: 'Exported report page',
  context: 'A short note for the solicitor on how the forecast completion date moved.',
  reportTitle: 'Forecast completion: the monthly reports',
  heading: 'How the date moved',
  // The paragraph cites its record as a source link; the quotation is kept distinct from the analysis.
  paragraph: 'By monthly report 13 the forecast completion date had moved to 12 December 2025, more than nine months after the Date for Completion',
  source: 'Monthly report 13',
  sourceNote: 'source link',
  quote: 'Forecast completion: 12 December 2025, subject to technical approval of the road works.',
  quoteSource: 2, // the source quoted: monthly report 13
  tableCaption: 'Table 1. Forecast completion, by report',
  columns: ['Forecast completion', 'Record', 'Date'],
  // One row for each source, in the same order.
  rows: ['28 February 2025', '25 July 2025', '12 December 2025'],
  sources: [
    record('Monthly report 7', '31 December 2024', '2024-12-31', 'Forecast completion: 28 February 2025.', { id: 'report-7' }),
    record('Monthly report 9', '28 February 2025', '2025-02-28', 'Forecast completion: 25 July 2025.', { id: 'report-9' }),
    record('Monthly report 13', '30 June 2025', '2025-06-30', 'Forecast completion: 12 December 2025, subject to technical approval of the road works.', { id: 'report-13' }),
  ],
  folio: 'Page 1 of 1',
  caption: 'Illustrative report from a fictional construction matter.',
};
