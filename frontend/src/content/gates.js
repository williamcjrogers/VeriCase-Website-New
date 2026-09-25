// Publication gates. Each item is 'open', 'confirmed' or 'struck'.
//   open      shown on previews with an "Owner to confirm" marker; a production build fails.
//   confirmed shown normally.
//   struck    removed from the page.
// scripts/lint-copy.mjs reads this file and fails when VERCEL_ENV=production while any item is open.
// The gate numbers follow the design specification (docs/design/the-working-record.md, section 8).

export const GATES = {
  G1_jct: { status: 'open', gate: 'G1', label: 'JCT review of every contractual statement in the sample matter' },
  G2_legal: { status: 'open', gate: 'G2', label: 'Practitioner approval of Schedule 1 and notes 2 to 5' },
  G3_stats: { status: 'open', gate: 'G3', label: 'Final source check of notes 6 to 8 against the primary documents' },
  G4_benchmarks: { status: 'open', gate: 'G4', label: 'Benchmark notes 9 and 10 (otherwise both figures are struck)' },
  G5_guard: { status: 'open', gate: 'G5', label: 'Research: the broad-question guard (Question C)' },
  G5_badge: { status: 'open', gate: 'G5', label: 'Research: what the validation badge checks' },
  G5_hash: { status: 'open', gate: 'G5', label: 'Manifest: what the hash covers, and whether it is SHA-256' },
  G5_rebuttalCite: { status: 'open', gate: 'G5', label: 'Rebuttal Mode enforces citations on edited replies' },
  G5_autoReply: { status: 'open', gate: 'G5', label: 'Automatic replies are set aside as noise' },
  G5_showNoise: { status: 'open', gate: 'G5', label: 'Show Noise in File Manager reveals attachments such as signature images' },
  G5_quoted: { status: 'open', gate: 'G5', label: 'Quoted history is detected and folded' },
  G5_nearDup: { status: 'open', gate: 'G5', label: 'Near-duplicates, not only exact duplicates, leave the review set' },
  G5_ownMaterial: { status: 'open', gate: 'G5', label: 'Demonstrations on a prospect’s own material' },
  G5_equity: { status: 'open', gate: 'G5', label: 'The practitioner equity sentence' },
  G5_claims: { status: 'open', gate: 'G5', label: 'Claims builder: evidence finder, and Word and PDF export' },
  G5_roles: { status: 'open', gate: 'G5', label: 'Access roles and restricted fields as listed' },
  G6_ui: { status: 'open', gate: 'G6', label: 'United Infrastructure account, substantiation and consent' },
  G7_office: { status: 'open', gate: 'G7', label: 'Registered office' },
  G8_data: { status: 'open', gate: 'G8', label: 'Data policy answer (hosting, sub-processors, retention, model training)' },
  G8_host: { status: 'open', gate: 'G8', label: 'PostHog host (EU or US) and the cookie notice to match' },
  G9_names: { status: 'open', gate: 'G9', label: 'Fictional names checked and resemblance to real matters ruled out' },
  G10_images: { status: 'open', gate: 'G10', label: 'Every Higgsfield image approved' },
  G11_attribution: { status: 'open', gate: 'G11', label: 'Abrahamson attribution verified (until then the masthead stays unattributed)' },
  G12_typeface: { status: 'open', gate: 'G12', label: 'Typeface accepted (Newsreader, or Playfair for headings)' },
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
