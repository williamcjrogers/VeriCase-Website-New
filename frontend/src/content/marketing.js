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
  { id: 'EV-0147', date: '26 March 2025', isoDate: '2025-03-26', document: 'Delivery confirmation', title: 'Delivery date confirmed', excerpt: 'Supplier confirms delivery week commencing 19 May 2025.' },
];

// The two illustrations draw on the records above. They depict outcomes (records read in date
// order; a point read with its sources), are labelled as illustrations and show no application
// controls. A record is cited as the report export cites one: by document and date.
export const ILLUSTRATION_LABEL = 'Illustration';

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
  assertion: 'The Contractor did not know the lead time for the brackets until 26 March 2025.',
  recordsLabel: 'The record',
  // Indexes into EVIDENCE_ILLUSTRATION, each with how it bears on the assertion.
  records: [
    { index: 1, relation: 'Challenges the assertion.' },
    { index: 2, relation: 'Consistent with the date given.' },
  ],
  replyLabel: 'Proposed reply, for review',
  // The reply cites its record as the argument illustration does: "(document)." after the point.
  reply: 'The Contractor was told the lead time on 12 March 2025, fourteen days before the date alleged',
  replySource: 1,
  caption: 'Illustrative rebuttal from a fictional construction matter.',
};

export const DRAFTING_ILLUSTRATION = {
  title: 'A claim section built from its records.',
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
