import { createHash } from 'crypto';
import evidence from './sampleEvidence.json';
import hashes from './sampleHashes.json';

const sha256 = (text) => createHash('sha256').update(Buffer.from(text.normalize('NFC'), 'utf8')).digest('hex');

describe('sample evidence hashes', () => {
  it('has one digest for every record', () => {
    expect(Object.keys(hashes).sort()).toEqual(evidence.records.map((r) => r.id).sort());
  });

  it.each(evidence.records.map((r) => [r.id, r]))('%s matches its canonical text', (id, record) => {
    expect(record.canonical).toBe(record.canonical.normalize('NFC'));
    expect(record.canonical.endsWith('\n')).toBe(false);
    expect(hashes[id]).toBe(sha256(record.canonical));
  });

  it('keeps the EV-0138 text used by the hash check exactly as specified', () => {
    const ev = evidence.records.find((r) => r.id === 'EV-0138');
    expect(ev.canonical.split('\n')[0]).toBe('From: Package Manager <package.manager@facade-sub.example>');
    expect(ev.canonical.split('\n').pop()).toBe(
      'Stainless brackets are ten weeks from order. Cladding to Levels 3 to 6 cannot start until they arrive. We will confirm a delivery date once the supplier has the order.'
    );
  });
});
