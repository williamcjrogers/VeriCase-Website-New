import { ACTIVITIES, BASIS_CLASS, basisOf, cloneReductions, effective, splitOf } from './reductions';
import { timesheet as drawSheet } from './sheet';
import { COMMERCIAL_MANAGER, DIRECTOR, EXPERT_RATE, GUIDELINE_BANDS, KC_ASSUMED, PANEL_JUNIOR, PROJECT_MANAGER, near } from './rates';

// The evidence cost calculator: what the professional time spent on the evidence costs, built up
// from each person's hours on one matter (the discussion cost calculator builds the same activities
// up from each item of evidence instead). Finding earlier replies is a share of each person's email
// time, and meetings are counted for everyone who attends them. Words live in
// content/calculators.js; this file holds only numbers and arithmetic.

export { ACTIVITIES };

// Hours on one large adjudication before any reduction: email discussion, reading and review, and
// bundling. The other starting points scale them. All are VeriCase estimates.
export const ROLES = [
  { id: 'kc', group: 'counsel', rate: KC_ASSUMED, basis: ['asm', 'assumption'], email: 10, read: 40, bund: 0 },
  { id: 'junior', group: 'counsel', rate: PANEL_JUNIOR, basis: ['pub', 'panel'], email: 20, read: 80, bund: 0 },
  { id: 'partner', group: 'solicitors', grade: 'A', email: 30, read: 30, bund: 3 },
  { id: 'sa', group: 'solicitors', grade: 'B', email: 40, read: 60, bund: 0 },
  { id: 'assoc', group: 'solicitors', grade: 'C', email: 50, read: 80, bund: 12 },
  { id: 'para', group: 'solicitors', grade: 'D', email: 0, read: 0, bund: 60 },
  { id: 'tech1', group: 'experts', rate: EXPERT_RATE, basis: ['pub', 'survey'], email: 15, read: 40, bund: 0 },
  { id: 'tech2', group: 'experts', rate: EXPERT_RATE, basis: ['pub', 'survey'], email: 15, read: 40, bund: 0 },
  { id: 'tech3', group: 'experts', rate: EXPERT_RATE, basis: ['pub', 'survey'], email: 15, read: 40, bund: 0 },
  { id: 'quantum', group: 'experts', rate: EXPERT_RATE, basis: ['pub', 'survey'], email: 20, read: 60, bund: 0 },
  { id: 'delay', group: 'experts', rate: EXPERT_RATE, basis: ['pub', 'survey'], email: 20, read: 60, bund: 0 },
  { id: 'cm', group: 'client', rate: COMMERCIAL_MANAGER, basis: ['pub', 'derived'], email: 40, read: 20, bund: 0 },
  { id: 'pm', group: 'client', rate: PROJECT_MANAGER, basis: ['asm', 'assumption'], email: 25, read: 10, bund: 0 },
  { id: 'dir', group: 'client', rate: DIRECTOR, basis: ['asm', 'assumption'], email: 15, read: 5, bund: 0 },
];
const ROLE = Object.fromEntries(ROLES.map((r) => [r.id, r]));
const ALL = ROLES.map((r) => r.id);

export const MEETINGS = [
  { id: 'conf', att: ['kc', 'junior', 'partner', 'sa', 'assoc', 'cm', 'dir', 'quantum', 'delay'] },
  { id: 'expert', att: ['tech1', 'tech2', 'tech3', 'quantum', 'delay', 'sa', 'assoc', 'cm', 'pm'] },
  { id: 'progress', att: ['partner', 'sa', 'assoc', 'cm', 'pm', 'dir'] },
];
// The reduction each kind of meeting may take: none (the default), the company and vendor figures,
// or the visitor's own estimate.
export const MEETING_OPTIONS = [0, 14, 18.9, 25, 50, 100];
export const MEETING_OPTION_CLASS = { 0: '', 14: 'ven', 18.9: 'ven', 25: 'own', 50: 'own', 100: 'own' };

export const RATE_BASES = [...Object.keys(GUIDELINE_BANDS), 'own'];
export const PRESETS_ORDER = ['adj', 'large', 'serial', 'tcc'];
export const PRESETS = {
  adj: { matters: 1, scale: 0.4, roles: ['junior', 'partner', 'assoc', 'quantum', 'delay', 'cm', 'para'], meet: { conf: [3, 2], expert: [3, 1.5], progress: [6, 1] } },
  large: { matters: 1, scale: 1, roles: ALL, meet: { conf: [6, 2], expert: [8, 1.5], progress: [12, 1] } },
  serial: { matters: 3, scale: 1, roles: ALL, meet: { conf: [6, 2], expert: [8, 1.5], progress: [12, 1] } },
  tcc: { matters: 1, scale: 3, roles: ALL, meet: { conf: [15, 2], expert: [20, 1.5], progress: [52, 1] } },
};
export const DEFAULT_SEARCH_SHARE = 30;
export const DEFAULT_DAY = 7.5;
export const DEFAULT_RECAP = 80;
export const MAX_MATTERS = 6;

const half = (v) => Math.round(v * 2) / 2;

export const applyPreset = (state, key) => {
  const p = PRESETS[key];
  return {
    ...state,
    preset: key,
    dirty: false,
    matters: p.matters,
    team: Object.fromEntries(ROLES.map((r) => [r.id, {
      on: p.roles.includes(r.id),
      email: half(r.email * p.scale),
      read: half(r.read * p.scale),
      bund: half(r.bund * p.scale),
    }])),
    meetings: Object.fromEntries(MEETINGS.map((m) => [m.id, {
      n: p.meet[m.id][0],
      h: p.meet[m.id][1],
      red: state.meetings?.[m.id]?.red ?? 0,
      att: [...m.att],
    }])),
  };
};

const fixedRates = () => Object.fromEntries(ROLES.filter((r) => !r.grade).map((r) => [r.id, r.rate]));
const bandRates = (band) => Object.fromEntries(ROLES.filter((r) => r.grade).map((r) => [r.id, GUIDELINE_BANDS[band][r.grade]]));

export const initialState = (key = 'large') =>
  applyPreset(
    {
      rateBasis: 'l1',
      rates: { ...fixedRates(), ...bandRates('l1') },
      searchShare: DEFAULT_SEARCH_SHARE,
      dayLen: DEFAULT_DAY,
      recapOn: false,
      recap: DEFAULT_RECAP,
      red: cloneReductions(),
      pubOnly: true,
    },
    key,
  );

// A guideline band sets the solicitors' rates; "own" leaves them as they are, to be typed over.
export const setRateBasis = (state, basis) =>
  basis === 'own' ? { ...state, rateBasis: basis } : { ...state, rateBasis: basis, rates: { ...state.rates, ...bandRates(basis) } };

export const restoreReductions = (state) => ({
  ...state,
  red: cloneReductions(),
  pubOnly: true,
  searchShare: DEFAULT_SEARCH_SHARE,
  recapOn: false,
  recap: DEFAULT_RECAP,
  meetings: Object.fromEntries(Object.entries(state.meetings).map(([id, m]) => [id, { ...m, red: 0 }])),
});

export const rateBasis = (state, id) => {
  const r = ROLE[id];
  const v = state.rates[id];
  if (r.grade) return state.rateBasis !== 'own' && near(v, GUIDELINE_BANDS[state.rateBasis][r.grade]) ? ['pub', 'guideline'] : ['own', 'yours'];
  return near(v, r.rate) ? r.basis : ['own', 'yours'];
};

export const effectiveReductions = (state) => effective(state.red, state.pubOnly);
export const reductionBasis = (state, act) => basisOf(act, effectiveReductions(state)[act].c);
export { BASIS_CLASS };

// One run of the model for a case: 'lo', 'c' (the visitor's settings) or 'hi'.
export const compute = (state, scen = 'c') => {
  const R = effectiveReductions(state);
  const share = Math.min(100, Math.max(0, state.searchShare)) / 100;
  const k = state.matters;
  const rv = state.recapOn ? Math.min(100, Math.max(0, state.recap)) / 100 : 1;
  const redFor = (a) => R[a][scen] / 100;
  const meetRed = (m) => {
    const own = state.pubOnly && scen === 'c' ? 0 : m.red;
    if (scen === 'lo') return Math.min(own, state.red.meet.lo) / 100;
    if (scen === 'hi') return Math.max(own, state.red.meet.hi) / 100;
    return own / 100;
  };
  const acts = Object.fromEntries(ACTIVITIES.map((a) => [a, { baseH: 0, baseC: 0, freeH: 0, freeC: 0 }]));
  const roles = {};
  const grades = { pub: 0, ven: 0, asm: 0, own: 0 };
  const meets = {};

  const add = (act, id, rate, h, red, split) => {
    const A = acts[act];
    const P = roles[id];
    const c = h * rate;
    A.baseH += h * k;
    A.baseC += c * k;
    A.freeH += h * red * k;
    A.freeC += c * red * k * rv;
    P.baseH += h * k;
    P.baseC += c * k;
    P.freeH += h * red * k;
    P.freeC += c * red * k * rv;
    for (const [g, s] of Object.entries(split)) grades[g] += c * red * k * rv * s;
  };

  for (const r of ROLES) {
    const t = state.team[r.id];
    roles[r.id] = { baseH: 0, baseC: 0, freeH: 0, freeC: 0 };
    if (!t.on) continue;
    const rate = Math.max(0, state.rates[r.id] || 0);
    for (const a of ['email', 'search', 'read', 'bund']) {
      const h = a === 'search' ? t.email * share : t[a];
      add(a, r.id, rate, h, redFor(a), splitOf(a, R[a].c));
    }
  }
  for (const m of MEETINGS) {
    const s = state.meetings[m.id];
    const red = meetRed(s);
    const cls = MEETING_OPTION_CLASS[s.red] ?? (s.red > 18.9 ? 'own' : 'ven');
    let count = 0;
    let cost = 0;
    for (const r of ROLES) {
      if (!state.team[r.id].on || !s.att.includes(r.id)) continue;
      const rate = Math.max(0, state.rates[r.id] || 0);
      count += 1;
      cost += s.n * s.h * rate;
      add('meet', r.id, rate, s.n * s.h, red, cls ? { [cls]: 1 } : {});
    }
    meets[m.id] = { people: count, hours: s.n * s.h * count, cost };
  }
  const tot = { baseH: 0, baseC: 0, freeH: 0, freeC: 0 };
  for (const a of ACTIVITIES) for (const key of Object.keys(tot)) tot[key] += acts[a][key];
  return { acts, roles, grades, tot, meets };
};

// The timesheet for the whole of the matters, in the visitor's working day.
export const timesheet = (res, hoursPerDay) =>
  drawSheet(Object.fromEntries(ACTIVITIES.map((a) => [a, { h: res.acts[a].baseH, fh: res.acts[a].freeH }])), hoursPerDay);
