export const PAGE_METADATA = {
  '/': {
    title: 'VeriCase | Evidence and chronology for construction disputes',
    description: 'Project correspondence in date order, analysis with citations and sources ready for professional review. Evidence and chronology for construction disputes.',
    url: 'https://veri-case.com/',
  },
  '/cookies': {
    title: 'Cookie notice | VeriCase',
    description: 'How VeriCase uses consent-based website analytics and browser storage, and how to change your cookie choice.',
    url: 'https://veri-case.com/cookies',
  },
  '*': {
    title: 'Page not found | VeriCase',
    description: 'This address does not match a VeriCase website page. Return to the homepage or browse the chapters.',
    url: null,
  },
};

export const metadataForPath = (path) => PAGE_METADATA[path.replace(/\/+$/, '') || '/'] || PAGE_METADATA['*'];
