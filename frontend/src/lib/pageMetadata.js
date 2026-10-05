export const PAGE_METADATA = {
  '/': {
    title: 'VeriCase | Construction claims and disputes',
    description: 'Evidence in order. Arguments on the record. Evidence investigation, chronology and drafting for construction claims and disputes.',
    url: 'https://veri-case.com/',
  },
  '/cookies': {
    title: 'Cookie notice | VeriCase',
    description: 'How VeriCase uses consent-based website analytics and browser storage, and how to change your cookie choice.',
    url: 'https://veri-case.com/cookies',
  },
  '*': {
    title: 'Page not found | VeriCase',
    description: 'This address does not match a VeriCase website page. Return to the homepage or explore how VeriCase works.',
    url: null,
  },
};

export const metadataForPath = (path) => PAGE_METADATA[path.replace(/\/+$/, '') || '/'] || PAGE_METADATA['*'];
