// The fictional record itself, shared by every chapter: the matter, its parties, the exhibits
// and the noise items, with their SHA-256 digests (sampleHashes.json, generated at build).
// Citations, the Source sheet and Fig. 1 need only this module, so it is kept apart from
// sampleMatter.js (the demonstrations' data and logic), which then loads with the
// demonstrations instead of in the page's initial chunk. Nothing here is real: see note A.
import evidence from '@/content/sampleEvidence.json';
import hashes from '@/content/sampleHashes.json';
import { formatDate } from '@/lib/format';

// The title bar of the app-family windows in the demonstrations.
export const APP_WINDOW = 'VeriCase · Sample matter (fictional)';

export const MATTER = evidence.matter;
export const PARTIES = evidence.parties;
export const RECORDS = evidence.records;
export const NOISE = evidence.noise;
export const HASHES = hashes;

const byId = Object.fromEntries(RECORDS.map((r) => [r.id, r]));
export const recordById = (id) => {
  const r = byId[id];
  if (!r) throw new Error(`Unknown evidence reference: ${id}`);
  return r;
};

export const partyOf = (key) => PARTIES[key];
export const personLabel = (key) => PARTIES[key].role;
export const addressLabel = (key) => `${PARTIES[key].role} <${PARTIES[key].email}>`;
export const kindLabel = (r) => (r.kind === 'email' ? 'Email' : 'Scanned PDF (OCR)');

// Short description for aria-labels: "email of 12 March 2025". Accessible names keep ordinary
// spaces: the no-break spaces that hold a printed date together have no place in them.
export const recordPhrase = (id) => {
  const r = recordById(id);
  return `${r.kind === 'email' ? 'email' : 'site diary page'} of ${formatDate(r.date).replace(/\u00a0/g, ' ')}`;
};

// ---------------------------------------------------------------------------------------------
// Cover: the Lens rows (Fig. 1), in date order
// ---------------------------------------------------------------------------------------------
export const LENS_ROWS = ['EV-0131', 'EV-0138', 'EV-0139', 'EV-0144', 'EV-0147', 'EV-0151'].map((id) => {
  const r = recordById(id);
  return {
    ev: id,
    date: formatDate(r.date),
    time: r.time,
    parties: r.partiesLabel,
    excerpt: r.excerpt,
    hash: HASHES[id],
    desktopOnly: id === 'EV-0144',
  };
});
