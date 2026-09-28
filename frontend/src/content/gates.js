// Publication gates. Each item is 'open', 'confirmed' or 'struck'.
//   open      shown on previews with an "Owner to confirm" marker; a production build fails.
//   confirmed shown normally.
//   struck    removed from the page. `tokens` lists the owner placeholders the struck item holds,
//             which a production build then allows, because they are never rendered.
// scripts/lint-copy.mjs reads this file and fails when VERCEL_ENV=production while any item is open.
//
// First publication, 27 September 2026 (the owner's instruction): the benchmarks (G4), the United
// Infrastructure account (G6) and the data-policy answer (G8) are held back until the owner
// supplies them; no generated imagery is used (G10); the masthead stays unattributed (G11). To
// restore an item, supply its text in place of each token and set the gate to 'confirmed'.
// The gate numbers follow the design specification (docs/design/the-working-record.md, section 8).

export const GATES = {
  G1_jct: { status: 'confirmed', gate: 'G1', label: 'JCT review of every contractual statement in the sample matter' },
  G2_legal: { status: 'confirmed', gate: 'G2', label: 'Practitioner approval of Schedule 1 and notes 2 to 5' },
  G3_stats: { status: 'confirmed', gate: 'G3', label: 'Final source check of notes 6 to 8 against the primary documents' },
  G4_benchmarks: { status: 'struck', gate: 'G4', label: 'Benchmark notes 9 and 10 (otherwise both figures are struck)', tokens: ['BENCHMARK_NOTE_THROUGHPUT', 'BENCHMARK_NOTE_DATES'] },
  G5_guard: { status: 'confirmed', gate: 'G5', label: 'Research: the broad-question guard (Question C)' },
  G5_badge: { status: 'confirmed', gate: 'G5', label: 'Research: what the validation badge checks' },
  G5_hash: { status: 'confirmed', gate: 'G5', label: 'Manifest: what the hash covers, and whether it is SHA-256' },
  G5_rebuttalCite: { status: 'confirmed', gate: 'G5', label: 'Rebuttal Mode enforces citations on edited replies' },
  G5_autoReply: { status: 'confirmed', gate: 'G5', label: 'Automatic replies are set aside as noise' },
  G5_showNoise: { status: 'confirmed', gate: 'G5', label: 'Show Noise in File Manager reveals attachments such as signature images' },
  G5_quoted: { status: 'confirmed', gate: 'G5', label: 'Quoted history is detected and folded' },
  G5_nearDup: { status: 'confirmed', gate: 'G5', label: 'Near-duplicates, not only exact duplicates, leave the review set' },
  G5_ownMaterial: { status: 'confirmed', gate: 'G5', label: 'Demonstrations on a prospect’s own material' },
  G5_equity: { status: 'confirmed', gate: 'G5', label: 'The practitioner equity sentence' },
  G5_claims: { status: 'confirmed', gate: 'G5', label: 'Claims builder: evidence finder, and Word and PDF export' },
  G5_roles: { status: 'confirmed', gate: 'G5', label: 'Access roles and restricted fields as listed' },
  G6_ui: { status: 'struck', gate: 'G6', label: 'United Infrastructure account, substantiation and consent', tokens: ['UI_CASE', 'UI_CASE_NOTE'] },
  G7_office: { status: 'confirmed', gate: 'G7', label: 'Registered office' },
  G8_data: { status: 'struck', gate: 'G8', label: 'Data policy answer (hosting, sub-processors, retention, model training)', tokens: ['DATA_POLICY'] },
  G8_host: { status: 'confirmed', gate: 'G8', label: 'PostHog host (EU or US) and the cookie notice to match' },
  G9_names: { status: 'confirmed', gate: 'G9', label: 'Fictional names checked and resemblance to real matters ruled out' },
  G10_images: { status: 'struck', gate: 'G10', label: 'Every Higgsfield image approved' },
  G11_attribution: { status: 'struck', gate: 'G11', label: 'Abrahamson attribution verified (until then the masthead stays unattributed)' },
  G12_typeface: { status: 'confirmed', gate: 'G12', label: 'Typeface accepted (Newsreader, or Playfair for headings)' },
};

export const gateStatus = (id) => {
  const g = GATES[id];
  if (!g) throw new Error(`Unknown gate: ${id}`);
  return g.status;
};
export const isStruck = (id) => gateStatus(id) === 'struck';
export const isOpen = (id) => gateStatus(id) === 'open';

// Vercel exposes REACT_APP_VERCEL_ENV to Create React App builds. Anything other than
// production (a preview, or a local build) shows open gates marked in place.
export const IS_PREVIEW = process.env.REACT_APP_VERCEL_ENV !== 'production';
