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
