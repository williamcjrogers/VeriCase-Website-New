#!/usr/bin/env node
// Computes the SHA-256 digest of each fictional record's canonical text and writes
// src/content/sampleHashes.json. The hash check and the manifest (Chapter VI) both read it,
// and src/content/sampleHashes.test.js recomputes the digests to prove they match.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const evidence = JSON.parse(readFileSync(join(root, 'src/content/sampleEvidence.json'), 'utf8'));

export const sha256 = (text) => createHash('sha256').update(Buffer.from(text.normalize('NFC'), 'utf8')).digest('hex');

const hashes = {};
for (const record of evidence.records) {
  if (record.canonical.endsWith('\n')) throw new Error(`${record.id}: canonical text must not end with a newline`);
  if (record.canonical.includes('\r')) throw new Error(`${record.id}: canonical text must use LF line endings`);
  hashes[record.id] = sha256(record.canonical);
}

const out = join(root, 'src/content/sampleHashes.json');
const next = `${JSON.stringify(hashes, null, 2)}\n`;
let prev = '';
try { prev = readFileSync(out, 'utf8'); } catch { /* first run */ }
if (prev !== next) writeFileSync(out, next);
console.log(`Sample hashes: ${Object.keys(hashes).length} records${prev === next ? ' (unchanged)' : ' (written)'}.`);
