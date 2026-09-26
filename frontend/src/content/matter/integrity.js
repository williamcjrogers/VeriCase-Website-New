// The hash check and the bundle manifest (Chapter VI, Figs 9 and 10).
// Nothing here is real: see note A.
import { HASHES, recordById } from '@/content/records';
import { formatDate } from '@/lib/format';

export const HASH_CHECK = {
  title: 'Check it yourself',
  intro: 'A hash is a fingerprint of a file’s exact contents. Change one character and the fingerprint changes. Try it on EV-0138.',
  field: 'EV-0138.eml (simplified)',
  subject: 'EV-0138',
  readouts: { manifest: 'Manifest', now: 'Computed now' },
  diff: 'Changed characters',
  states: { match: 'Match', mismatch: 'Does not match' },
  reset: 'Reset',
  showFull: 'Show full hash',
  hideFull: 'Hide full hash',
  note: 'This demonstration computes a SHA-256 hash in your browser. The text you type stays in your browser.',
  meaning: 'A matching hash shows that a file is unchanged since it was hashed. It does not show who wrote the file, or that what it says is true.',
  fallback: 'This check needs a secure (https) connection.',
  live: { mismatch: 'Hash does not match the manifest.', match: 'Hash matches the manifest.' },
};

export const MANIFEST = {
  title: 'Manifest · Bundle VC-SAMPLE-01',
  heads: ['Seq', 'Exhibit', 'Date', 'Message-ID or file', 'Hash (SHA-256)', 'Source path'],
  hashGate: 'G5_hash',
  line: 'The manifest lists each item’s cryptographic hash as recorded on ingestion, so that anyone holding the original can check that it has not changed since.',
  items: ['EV-0131', 'EV-0138', 'EV-0139', 'EV-0144', 'EV-0147', 'EV-0151'],
  copy: 'Copy hash',
  copied: 'Hash copied.',
};

export const manifestRows = () =>
  MANIFEST.items.map((id, i) => {
    const r = recordById(id);
    return {
      seq: String(i + 1).padStart(3, '0'),
      ev: id,
      date: formatDate(r.date),
      ref: r.messageId || `File: ${r.file}`,
      hash: HASHES[id],
      path: r.sourcePath,
    };
  });
