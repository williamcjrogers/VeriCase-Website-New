// The app examples (owner, 09 October 2026: "use app.veri-case.com for the main inspiration", "draw
// inspiration from its features"). Each example shows one output the application produces, as its
// own screen shows it, drawn more simply: the same fictional matter as the rest of the page (a
// nine-storey residential building with a ground-floor nursery, under JCT Design and Build 2016),
// with no names, places or sums from a real matter. Counts are illustrative, and each caption says
// so. Only features seen in the application on 09 October 2026 appear here
// (docs/design/website-capability-register.md, E13).

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
  title: 'The passage, wherever it sits.',
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

// Research, Executive Analysis: a question answered with its sources and a confidence score.
export const ANALYSIS_EXAMPLE = {
  title: 'Ask the record. See the sources.',
  view: 'Research',
  mode: 'Executive Analysis',
  scope: '1,084 evidence items in scope',
  question: 'Who set the date for early access to the nursery?',
  answer: 'The Employer set it. Its project manager asked for fit-out access by 01 September 2025, and its representative then said later access was not acceptable to the nursery’s funder.',
  evidenceLabel: 'Supporting evidence',
  evidence: [
    'Source 1, email of 12 March 2025, confirms fit-out access by 01 September 2025.',
    'Source 2, email of 26 March 2025, says later access is not acceptable to the funder.',
  ],
  confidenceLabel: 'Confidence score',
  confidence: 78,
  confidenceNote: 'Consistent across both sources. No instruction setting the date before completion was found.',
  sources: 'View 2 sources',
  caption: 'Illustrative question and answer from a fictional construction matter. The score is illustrative.',
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
  contentsLabel: 'Bundle contents',
  cover: 'Cover page',
  fixed: 'Fixed',
  items: [
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
