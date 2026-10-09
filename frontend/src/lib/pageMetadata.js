export const PAGE_METADATA = {
  '/': {
    title: 'VeriCase | Search and question your project evidence',
    description: 'Transform complex evidence into compelling arguments. Search, questions, reports, bundles and discussion for contractors, subcontractors and commercial teams.',
    url: 'https://veri-case.com/',
  },
  '/cookies': {
    title: 'Cookie notice | VeriCase',
    description: 'How VeriCase uses consent-based website analytics and browser storage, and how to change your cookie choice.',
    url: 'https://veri-case.com/cookies',
  },
  '/notes': {
    title: 'Notes and sources | VeriCase',
    description: 'The sources and assumptions behind the figures on the VeriCase home page: email volume, a modelled round of email, and the modelled cost of professional time.',
    url: 'https://veri-case.com/notes',
  },
  '/discussion-cost': {
    title: 'What does discussing the evidence cost? | VeriCase',
    description: 'Estimate the cost of the professional time your team spends discussing, finding, reading, meeting about and bundling the evidence in a construction dispute, with the basis of every rate shown.',
    url: 'https://veri-case.com/discussion-cost',
  },
  '/evidence-cost': {
    title: 'What does the evidence cost your team? | VeriCase',
    description: 'Price the hours your counsel, solicitors, experts and project team spend on the evidence in a construction dispute, with the basis of every rate and reduction shown.',
    url: 'https://veri-case.com/evidence-cost',
  },
  '*': {
    title: 'Page not found | VeriCase',
    description: 'This address does not match a VeriCase website page. Return to the homepage or explore how VeriCase works.',
    url: null,
  },
};

export const metadataForPath = (path) => PAGE_METADATA[path.replace(/\/+$/, '') || '/'] || PAGE_METADATA['*'];
