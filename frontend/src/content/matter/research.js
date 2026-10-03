// Research: questions, Query Plan presets, the report logic and the bundle (Chapter III, Fig. 4).
// Nothing here is real: see note A.
import { recordById } from '@/content/records';
import { fill, formatDate, plural } from '@/lib/format';

export const PERIOD_PRESETS = {
  default: { key: 'default', label: '01 March 2025 to 04 April 2025', from: '2025-03-01', to: '2025-04-04' },
  early: { key: 'early', label: '01 March 2025 to 20 March 2025', from: '2025-03-01', to: '2025-03-20' },
  whole: { key: 'whole', label: 'Whole matter', from: '2024-01-01', to: '2026-12-31' },
  aprilB: { key: 'aprilB', label: '01 March 2025 to 30 April 2025', from: '2025-03-01', to: '2025-04-30' },
  march: { key: 'march', label: 'March 2025', from: '2025-03-01', to: '2025-03-31' },
};

export const ALL_PARTIES = ['Contractor', 'Façade Sub-Contractor', 'Employer’s Agent', 'Supplier'];
export const ALL_SOURCES = ['email and attachments', 'site diary (OCR)'];

// A finding's own facts: date, parties, topics and source.
const FINDING_FACTS = {
  'EV-0131': { parties: ['Employer’s Agent', 'Contractor'], topics: ['bracket type B', 'brackets'], source: 'email and attachments' },
  'EV-0133': { parties: ['Contractor', 'Façade Sub-Contractor'], topics: ['bracket type B', 'lead time'], source: 'email and attachments' },
  'EV-0138': { parties: ['Façade Sub-Contractor', 'Contractor'], topics: ['lead time', 'cladding'], source: 'email and attachments' },
  'EV-0139': { parties: ['Contractor'], topics: ['lead time', 'notice'], source: 'email and attachments' },
  'EV-0144': { parties: ['Contractor'], topics: ['bracket type B', 'cladding'], source: 'site diary (OCR)' },
  'EV-0147': { parties: ['Supplier', 'Façade Sub-Contractor', 'Contractor'], topics: ['bracket type B', 'lead time'], source: 'email and attachments' },
  'EV-0151': { parties: ['Contractor', 'Employer’s Agent'], topics: ['notice', 'brackets'], source: 'email and attachments' },
  'EV-0153': { parties: ['Employer’s Agent', 'Contractor'], topics: ['notice', 'brackets'], source: 'email and attachments' },
};

export const QUESTIONS = [
  {
    id: 'A',
    text: 'When did the Contractor first learn that bracket type B would hold up the cladding?',
    plan: {
      mode: 'Evidence',
      period: 'default',
      parties: ['Contractor', 'Façade Sub-Contractor', 'Employer’s Agent'],
      topics: ['bracket type B', 'lead time', 'cladding', 'notice'],
      sources: ['email and attachments', 'site diary (OCR)'],
    },
    periodOptions: ['default', 'early', 'whole'],
    findings: [
      { ev: 'EV-0131', text: 'On 03 March 2025 the Employer’s Agent instructed bracket type B for Levels 3 to 6, describing the email as an instruction requiring a Change.' },
      { ev: 'EV-0138', text: 'On 12 March 2025 the Façade Sub-Contractor told the Contractor that stainless brackets were ten weeks from order and that cladding to Levels 3 to 6 could not start until they arrived.' },
      { ev: 'EV-0139', text: 'At 07:55 the next morning the Contractor’s Site Manager asked the Commercial Manager whether a firm date could be obtained ‘before we notify’.' },
      { ev: 'EV-0144', text: 'The site diary for 21 March 2025 records type A brackets returned to store.' },
      { ev: 'EV-0147', text: 'On 26 March 2025 the supplier confirmed delivery for the week commencing 19 May 2025, and the Façade Sub-Contractor forwarded the confirmation to the Contractor.' },
      { ev: 'EV-0151', text: 'On 28 March 2025 the Contractor gave notice under clause 2.24, identifying the Change as a Relevant Event.' },
    ],
    // Prepared summaries, keyed by period preset, for the unedited parties, topics and sources.
    // [[c:EV-0138]] renders the citation number of that record within the current report.
    summaries: {
      default:
        'The record contains two dates on which the Contractor may be said to have learned that bracket type B would affect the cladding: 12 March 2025[[c:EV-0138]][[c:EV-0139]] and 26 March 2025.[[c:EV-0147]] Notice under clause 2.24 followed on 28 March 2025.[[c:EV-0151]]',
      early:
        'Within this period the record contains one date on which the Contractor may be said to have learned that bracket type B would affect the cladding: 12 March 2025.[[c:EV-0138]][[c:EV-0139]]',
    },
    analysed: { default: 214, early: 128, whole: 312 },
  },
  {
    id: 'B',
    text: 'What did the Employer’s Agent say about brackets between March and April 2025?',
    plan: {
      mode: 'Evidence',
      period: 'aprilB',
      parties: ['Employer’s Agent'],
      topics: ['brackets', 'notice'],
      sources: ['email and attachments'],
    },
    periodOptions: ['aprilB', 'march', 'whole'],
    findings: [
      { ev: 'EV-0131', text: 'On 03 March 2025 the Employer’s Agent instructed bracket type B and described the email as an instruction requiring a Change.' },
      { ev: 'EV-0153', text: 'On 04 April 2025 the Employer’s Agent wrote that the Employer did not accept that notice had been given forthwith, and relied on clause 2.24 as amended.' },
    ],
    summaries: {
      aprilB:
        'The Employer’s Agent wrote about the brackets twice in this period: to instruct bracket type B on 03 March 2025,[[c:EV-0131]] and on 04 April 2025 to say that the Employer did not accept that notice had been given forthwith.[[c:EV-0153]]',
    },
    analysed: { aprilB: 57, march: 41, whole: 312 },
  },
  {
    id: 'C',
    gate: 'G5_guard',
    text: 'What evidence do we have on the façade?',
    plan: {
      mode: 'Evidence',
      period: null,
      parties: null,
      topics: ['façade', 'cladding', 'brackets'],
      sources: ['email and attachments', 'site diary (OCR)'],
    },
    guard: {
      notice: 'This question is broad. Choose a period or a party before it runs.',
      unset: 'not set',
      quick: [
        { label: 'March 2025', set: { period: 'march' } },
        { label: 'Employer’s Agent', set: { parties: ['Employer’s Agent'] } },
      ],
    },
    periodOptions: ['march', 'default', 'whole'],
    findings: [
      { ev: 'EV-0131', text: 'On 03 March 2025 the Employer’s Agent instructed bracket type B for Levels 3 to 6, describing the email as an instruction requiring a Change.' },
      { ev: 'EV-0133', text: 'On 05 March 2025 the Design Manager asked the Façade Sub-Contractor to price the Change and confirm the lead time.' },
      { ev: 'EV-0138', text: 'On 12 March 2025 the Façade Sub-Contractor told the Contractor that stainless brackets were ten weeks from order and that cladding to Levels 3 to 6 could not start until they arrived.' },
      { ev: 'EV-0139', text: 'At 07:55 the next morning the Contractor’s Site Manager asked the Commercial Manager whether a firm date could be obtained ‘before we notify’.' },
      { ev: 'EV-0144', text: 'The site diary for 21 March 2025 records type A brackets returned to store.' },
      { ev: 'EV-0147', text: 'On 26 March 2025 the supplier confirmed delivery for the week commencing 19 May 2025, and the Façade Sub-Contractor forwarded the confirmation to the Contractor.' },
      { ev: 'EV-0151', text: 'On 28 March 2025 the Contractor gave notice under clause 2.24, identifying the Change as a Relevant Event.' },
      { ev: 'EV-0153', text: 'On 04 April 2025 the Employer’s Agent wrote that the Employer did not accept that notice had been given forthwith, and relied on clause 2.24 as amended.' },
    ],
    summaries: {
      march:
        'In March 2025 the record runs from the instruction of 03 March 2025[[c:EV-0131]] to the Contractor’s notice under clause 2.24 on 28 March 2025.[[c:EV-0151]]',
      party:
        'The Employer’s Agent instructed the Change on 03 March 2025,[[c:EV-0131]] received the Contractor’s notice on 28 March 2025,[[c:EV-0151]] and on 04 April 2025 reserved the Employer’s position on notice.[[c:EV-0153]]',
    },
    analysed: { march: 198, party: 57, default: 214, whole: 312 },
  },
];

export const REPORT = {
  title: 'VeriCase Analysis Report',
  generated: 'Generated 16 January 2026, 10:12 · Sample matter (fictional)',
  cards: { cited: 'Sources cited', analysed: 'Evidence analysed', validation: 'Citations checked' },
  badgeCount: '{n} of {n}',
  badgeLine: 'Each resolves to an item in this matter.',
  badgeLineOne: 'It resolves to an item in this matter.',
  badgeGate: 'G5_badge',
  hidden: '{n} findings fall outside the plan and are not shown.',
  hiddenOne: '1 finding falls outside the plan and is not shown.',
  notRegenerated: 'Summary not regenerated in this demonstration. The findings below reflect the plan.',
  limits:
    'This report is generated automatically from the evidence in this matter. It identifies and cites material; it does not decide what the material means. Interpretation, and responsibility for any use of it, remain yours.',
  downloadPdf: 'Download PDF',
  downloadNote: 'In VeriCase this downloads the report as a PDF with its citations. This demonstration creates no files.',
  createBundle: 'Create bundle',
  pickerLabel: 'Choose a question. This demonstration uses prepared questions on the sample matter.',
  modes: ['Filter', 'Evidence'],
  runPlan: 'Run plan',
  planChanged: 'Plan changed. Run the plan to update the report.',
  chipKeys: { mode: 'Mode', period: 'Period', parties: 'Parties', topics: 'Topics', sources: 'Sources' },
  editLabels: { period: 'Edit period', parties: 'Edit parties', topics: 'Edit topics', sources: 'Edit sources', remove: 'Remove', apply: 'Apply', cancel: 'Cancel' },
  live: { planChanged: 'Plan changed', updated: 'Report updated: {sources} cited', bundle: 'Bundle created with {items}.' },
};

const inPeriod = (date, preset) => !preset || (date >= preset.from && date <= preset.to);
const intersects = (a, b) => !b || a.some((x) => b.includes(x));

// The report for a question under a plan. Citations are numbered in date order.
export function computeReport(question, plan) {
  const preset = plan.period ? PERIOD_PRESETS[plan.period] : null;
  const shown = [];
  let hidden = 0;
  for (const f of question.findings) {
    const facts = FINDING_FACTS[f.ev];
    const r = recordById(f.ev);
    const ok =
      inPeriod(r.date, preset) &&
      intersects(facts.parties, plan.parties) &&
      intersects(facts.topics, plan.topics) &&
      (!plan.sources || plan.sources.includes(facts.source));
    if (ok) shown.push(f);
    else hidden += 1;
  }
  shown.sort((a, b) => (recordById(a.ev).date + (recordById(a.ev).time || '')).localeCompare(recordById(b.ev).date + (recordById(b.ev).time || '')));
  const numbers = Object.fromEntries(shown.map((f, i) => [f.ev, i + 1]));

  const base = question.plan;
  const sameList = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const untouched = sameList(plan.topics, base.topics) && sameList(plan.sources, base.sources) && plan.mode === base.mode;
  let summary = null;
  if (question.id === 'C') {
    if (untouched && plan.period === 'march' && !plan.parties) summary = question.summaries.march;
    else if (untouched && !plan.period && sameList(plan.parties, ['Employer’s Agent'])) summary = question.summaries.party;
  } else if (untouched && sameList(plan.parties, base.parties)) {
    summary = question.summaries[plan.period] || null;
  }
  const analysedKey = question.id === 'C' && !plan.period && plan.parties ? 'party' : plan.period;
  let analysed = question.analysed[analysedKey] ?? 0;
  if (plan.sources && !plan.sources.includes('site diary (OCR)') && question.plan.sources.includes('site diary (OCR)')) analysed -= 36;
  if (plan.sources && !plan.sources.includes('email and attachments')) analysed = 36;

  return {
    findings: shown.map((f) => ({ ...f, n: numbers[f.ev] })),
    numbers,
    hidden,
    hiddenText: hidden === 1 ? REPORT.hiddenOne : hidden ? fill(REPORT.hidden, { n: hidden }) : null,
    summary,
    cited: shown.length,
    analysed: Math.max(analysed, shown.length),
  };
}

export const planIsComplete = (plan) => Boolean(plan.period || plan.parties);

export const BUNDLE = {
  title: 'Create bundle',
  description: 'Every item cited in this report will be added: {items}.',
  fields: [
    { key: 'title', label: 'Title', value: 'Bracket type B: notice under clause 2.24' },
    { key: 'description', label: 'Description', value: 'Items cited in the analysis of 16 January 2026 on when the Contractor learned of the bracket lead time.', multiline: true },
    { key: 'matter', label: 'Case or matter', value: 'Example Contractor Ltd and Example Employer Ltd (fictional)' },
    { key: 'court', label: 'Court', value: 'Statutory adjudication' },
    { key: 'reference', label: 'Reference', value: 'VC-SAMPLE-01' },
    { key: 'preparedBy', label: 'Prepared by', value: 'Claims Consultant, Example Contractor Ltd' },
    { key: 'preparedFor', label: 'Prepared for', value: 'External Counsel' },
    { key: 'date', label: 'Bundle date', value: '16 January 2026' },
    { key: 'notes', label: 'Notes', value: 'Fictional sample bundle for demonstration only.', multiline: true },
  ],
  note: 'This demonstration creates nothing and sends nothing. What you type stays on this page and is cleared when you leave it.',
  create: 'Create bundle',
  cancel: 'Cancel',
  stamp: 'Bundle created · {items} · 16 January 2026',
  indexHeads: ['Tab', 'Item', 'Exhibit', 'Date', 'Description'],
  manifestLink: 'The manifest for this bundle is shown in Chapter VI.',
};

export const bundleRows = (evIds) =>
  evIds.map((id, i) => ({
    tab: '1',
    item: String(i + 1).padStart(3, '0'),
    ev: id,
    date: formatDate(recordById(id).date),
    description: recordById(id).description,
  }));
export const itemsLabel = (n) => plural(n, 'item');
