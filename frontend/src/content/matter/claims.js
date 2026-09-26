// The claims builder (Chapter IV, Fig. 5).
// Nothing here is real: see note A.

export const CLAIMS_BUILDER = {
  tree: [
    {
      n: '1',
      title: 'A later Completion Date (clauses 2.24 to 2.26)',
      children: [
        { n: '1.1', title: 'The Change instructed on 03 March 2025' },
        { n: '1.2', title: 'Notice under clause 2.24', active: true },
        { n: '1.3', title: 'The Employer’s position of 04 April 2025' },
      ],
    },
    { n: '2', title: 'Loss and expense (section 4)', children: [{ n: '2.1', title: 'The Relevant Matter' }] },
    { n: '3', title: 'Valuation of the Change', children: [] },
  ],
  section: '1.2 Notice under clause 2.24',
  paragraphs: [
    { n: '1.2.1', text: 'The Employer’s Agent instructed a Change on 03 March 2025 [[ev:EV-0131]].' },
    { n: '1.2.2', text: 'On 12 March 2025 the Façade Sub-Contractor gave a lead time of ten weeks from order [[ev:EV-0138]]. It did not give a delivery date.' },
    { n: '1.2.3', text: 'On 26 March 2025 the supplier confirmed delivery for the week commencing 19 May 2025, and the Façade Sub-Contractor passed the confirmation to the Contractor the same morning [[ev:EV-0147]]. The Contractor gave notice under clause 2.24 two days later [[ev:EV-0151]].' },
  ],
  finderTitle: 'Evidence finder: section 1.2',
  suggested: 'Suggested',
  finder: [
    { ev: 'EV-0139', text: 'Site Manager to Commercial Manager · ‘Can we get a firm date before we notify?’' },
    { ev: 'EV-0144', text: 'Site diary, page 41 (OCR)' },
    { ev: 'EV-0153', text: 'Employer’s Agent to Commercial Manager' },
  ],
  insert: 'Insert citation',
  dismiss: 'Dismiss',
  insertTarget: '1.2.2',
  exportBar: 'Export: Word · PDF · citations preserved',
  mobileTabs: ['Draft', 'Tree', 'Finder'],
};
