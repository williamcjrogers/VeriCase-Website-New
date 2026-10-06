import { ACTIVITIES, RED_DEFAULT, basisOf, cloneReductions, effective, splitOf } from './reductions';
import { timesheet as drawSheet } from './sheet';
import { CHAMBERS_MINIMUM, CLAIMED_TCC, COMMERCIAL_MANAGER, DIRECTOR, EXPERT_RATE, GUIDELINE_BANDS, KC_ASSUMED, KC_UPPER, PANEL_JUNIOR, PANEL_KC, PROJECT_MANAGER, near } from './rates';

// The discussion cost calculator: what the professional time spent on the evidence costs, built up
// from each item of evidence and each time it is discussed. Its adjudication starting point is the
// model in note 3 on the home page: 40 items, each discussed three times (120 rounds), at 40
// minutes of discussion a round from the same six people at the same rates, which comes to
// £18,318.60. The court claim starting point is note 3's base case of 900 rounds (£137,389.50).
// Words live in content/calculators.js; this file holds only numbers and arithmetic.

export const ROLES = [
  { id: 'kc', group: 'counsel' },
  { id: 'jun', group: 'counsel' },
  { id: 'ptr', group: 'solicitors', grade: 'A' },
  { id: 'sa', group: 'solicitors', grade: 'B' },
  { id: 'asc', group: 'solicitors', grade: 'C' },
  { id: 'para', group: 'solicitors', grade: 'D' },
  { id: 'tex', group: 'experts' },
  { id: 'qex', group: 'experts' },
  { id: 'dex', group: 'experts' },
  { id: 'cm', group: 'client' },
  { id: 'pm', group: 'client' },
  { id: 'dir', group: 'client' },
];
const ROLE = Object.fromEntries(ROLES.map((r) => [r.id, r]));

export const FIXED_RATES = { kc: KC_ASSUMED, jun: PANEL_JUNIOR, qex: EXPERT_RATE, dex: EXPERT_RATE, cm: COMMERCIAL_MANAGER, pm: PROJECT_MANAGER, dir: DIRECTOR };
export const KC_CHOICES = [KC_ASSUMED, PANEL_KC, KC_UPPER];
export const JUNIOR_CHOICES = [PANEL_JUNIOR, ...CHAMBERS_MINIMUM];
const BAND_RATES = { ...GUIDELINE_BANDS, mkt: CLAIMED_TCC };
export const BANDS = Object.keys(BAND_RATES);
export const DISCIPLINES = ['fire', 'arch', 'me'];
export const MEETINGS = ['conf', 'exp', 'prog'];
export const PRESETS_ORDER = ['adj', 'large', 'court', 'arb'];
export const FORUMS = ['adj', 'court', 'arb'];

export const HOURS_PER_DAY = 7.5;
export const WEEK_HOURS = 37.5;

// Per-person times. Discussing and finding: minutes each time an item is discussed. Reading:
// minutes for each item over the matter. Bundling: hours for each bundle.
const READ = { kc: 24, jun: 48, ptr: 18, sa: 36, asc: 48, para: 0, tex: 24, qex: 36, dex: 36, cm: 12, pm: 6, dir: 3 };
const BUND = { kc: 0, jun: 0, ptr: 1, sa: 0, asc: 4, para: 20, tex: 0, qex: 0, dex: 0, cm: 0, pm: 0, dir: 0 };
const LARGE_TALK = { kc: [2, 0.6], jun: [4, 1.2], ptr: [6, 1.8], sa: [8, 2.4], asc: [10, 3], para: [0, 0], tex: [3, 0.9], qex: [4, 1.2], dex: [4, 1.2], cm: [8, 2.4], pm: [5, 1.5], dir: [3, 0.9] };
// Note 3's round: the commercial manager 10 minutes, the solicitor 12, the partner 3, counsel 5
// and each of the two experts 5, which is 40 minutes; finding earlier replies adds 2 minutes each.
const SMALL_TALK = { jun: [5, 2], ptr: [3, 2], asc: [12, 2], qex: [5, 2], dex: [5, 2], cm: [10, 2] };
const ALL_ON = ROLES.map((r) => r.id);
const SMALL_ON = ['jun', 'ptr', 'asc', 'para', 'qex', 'dex', 'cm'];

const makeTeam = (on, talk) => Object.fromEntries(ROLES.map((r) => {
  const k = talk[r.id] || LARGE_TALK[r.id];
  return [r.id, { on: on.includes(r.id), min: k[0], smin: k[1], read: READ[r.id], bund: BUND[r.id] }];
}));

const ATTENDEES = {
  conf: ['kc', 'jun', 'ptr', 'sa', 'asc', 'cm', 'dir', 'qex', 'dex'],
  exp: ['tex', 'qex', 'dex', 'sa', 'asc', 'cm', 'pm'],
  prog: ['ptr', 'sa', 'asc', 'cm', 'pm', 'dir'],
};
// Only progress calls are marked replaceable: conferences and experts' discussions are kept.
const makeMeetings = (conf, exp, prog) => ({
  conf: { n: conf, len: 2, att: ATTENDEES.conf, red: false },
  exp: { n: exp, len: 1.5, att: ATTENDEES.exp, red: false },
  prog: { n: prog, len: 1, att: ATTENDEES.prog, red: true },
});

export const PRESETS = {
  adj: { forum: 'adj', items: 40, rounds: 3, bundles: 2, weeks: 6, team: makeTeam(SMALL_ON, SMALL_TALK), meetings: makeMeetings(1, 1, 3) },
  large: { forum: 'adj', items: 100, rounds: 3, bundles: 3, weeks: 12, team: makeTeam(ALL_ON, LARGE_TALK), meetings: makeMeetings(6, 8, 12) },
  court: { forum: 'court', items: 300, rounds: 3, bundles: 4, weeks: 104, team: makeTeam(SMALL_ON, SMALL_TALK), meetings: makeMeetings(8, 12, 52) },
  arb: { forum: 'arb', items: 250, rounds: 3, bundles: 4, weeks: 87, team: makeTeam(SMALL_ON, SMALL_TALK), meetings: makeMeetings(6, 10, 40) },
};

export { ACTIVITIES, RED_DEFAULT };

const clone = (o) => JSON.parse(JSON.stringify(o));
const solicitorRates = (band) => Object.fromEntries(ROLES.filter((r) => r.grade).map((r) => [r.id, BAND_RATES[band][r.grade]]));

export const startingRates = () => ({ ...FIXED_RATES, ...solicitorRates('l1') });

export const applyPreset = (state, key) => {
  const p = PRESETS[key];
  return {
    ...state,
    preset: key,
    dirty: false,
    forum: p.forum,
    items: p.items,
    rounds: p.rounds,
    bundles: p.bundles,
    weeks: p.weeks,
    team: clone(p.team),
    meetings: clone(p.meetings),
    disc: Object.fromEntries(DISCIPLINES.map((d) => [d, { ...state.disc[d], on: true }])),
  };
};

export const initialState = (key = 'adj') =>
  applyPreset(
    {
      matters: 1,
      band: 'l1',
      rates: startingRates(),
      disc: Object.fromEntries(DISCIPLINES.map((d) => [d, { on: true, rate: EXPERT_RATE }])),
      red: cloneReductions(),
      pubOnly: true,
      value: 1,
    },
    key,
  );

export const setBand = (state, band) => ({ ...state, band, rates: { ...state.rates, ...solicitorRates(band) } });

// The starting rates and reductions again, keeping the disciplines ticked and everything else.
export const resetRatesAndReductions = (state) => ({
  ...state,
  band: 'l1',
  rates: startingRates(),
  disc: Object.fromEntries(DISCIPLINES.map((d) => [d, { on: state.disc[d].on, rate: EXPERT_RATE }])),
  red: cloneReductions(),
  pubOnly: true,
  value: 1,
});

const ticked = (state) => DISCIPLINES.filter((d) => state.disc[d].on).map((d) => state.disc[d]);
export const people = (state, rid) => (rid === 'tex' ? ticked(state).length : 1);
export const rateOf = (state, rid) => {
  if (rid !== 'tex') return state.rates[rid] || 0;
  const t = ticked(state);
  return t.length ? t.reduce((s, d) => s + d.rate, 0) / t.length : 0;
};

// The basis of each person's rate: [class, key]. The keys are labelled in content/calculators.js.
export const rateBasis = (state, rid) => {
  const v = rateOf(state, rid);
  const r = ROLE[rid];
  if (r.grade) {
    if (!near(v, BAND_RATES[state.band][r.grade])) return ['own', 'yours'];
    return state.band === 'mkt' && r.grade !== 'D' ? ['pub', 'courtRecord'] : ['pub', 'guideline'];
  }
  if (rid === 'kc') return near(v, KC_ASSUMED) || near(v, KC_UPPER) ? ['asm', 'assumption'] : near(v, PANEL_KC) ? ['pub', 'panel'] : ['own', 'yours'];
  if (rid === 'jun') return near(v, PANEL_JUNIOR) ? ['pub', 'panel'] : CHAMBERS_MINIMUM.some((c) => near(v, c)) ? ['pub', 'chambers'] : ['own', 'yours'];
  if (rid === 'tex') {
    const t = ticked(state);
    return t.length && t.every((d) => near(d.rate, EXPERT_RATE)) ? ['pub', 'survey'] : ['own', 'yours'];
  }
  if (rid === 'qex' || rid === 'dex') return near(v, EXPERT_RATE) ? ['pub', 'survey'] : ['own', 'yours'];
  if (rid === 'cm') return near(v, COMMERCIAL_MANAGER) ? ['pub', 'derived'] : ['own', 'yours'];
  return near(v, FIXED_RATES[rid]) ? ['asm', 'assumption'] : ['own', 'yours'];
};

// The reductions the central case uses, and what each central figure rests on.
export const effectiveReductions = (state) => effective(state.red, state.pubOnly);
export const reductionBasis = (state, act) => basisOf(act, effectiveReductions(state)[act].c);

export const compute = (state) => {
  const rounds = state.items * state.rounds;
  const R = effectiveReductions(state);
  const rows = [];
  for (const r of ROLES) {
    const t = state.team[r.id];
    const n = people(state, r.id);
    if (!t.on || n === 0) continue;
    const rate = rateOf(state, r.id);
    const h = {
      email: (rounds * t.min * n) / 60,
      search: (rounds * t.smin * n) / 60,
      read: (state.items * t.read * n) / 60,
      bund: state.bundles * t.bund * n,
      meetR: 0,
      meetK: 0,
    };
    for (const m of MEETINGS) {
      const s = state.meetings[m];
      if (s.att.includes(r.id)) {
        const x = s.n * s.len * n;
        if (s.red) h.meetR += x;
        else h.meetK += x;
      }
    }
    h.meet = h.meetR + h.meetK;
    const hours = h.email + h.search + h.meet + h.read + h.bund;
    if (hours <= 0) continue;
    rows.push({ id: r.id, n, rate, h, hours, cost: hours * rate, basis: rateBasis(state, r.id), fh: 0, fc: 0 });
  }
  const freed = (row, a, k) => ((a === 'meet' ? row.h.meetR : row.h[a]) * R[a][k]) / 100;
  const acts = Object.fromEntries(ACTIVITIES.map((a) => [a, { h: 0, cost: 0, lo: 0, c: 0, hi: 0, fh: 0 }]));
  const scen = { lo: { h: 0, c: 0 }, c: { h: 0, c: 0 }, hi: { h: 0, c: 0 } };
  let hours = 0;
  let cost = 0;
  for (const row of rows) {
    hours += row.hours;
    cost += row.cost;
    for (const a of ACTIVITIES) {
      const x = acts[a];
      x.h += row.h[a];
      x.cost += row.h[a] * row.rate;
      for (const k of ['lo', 'c', 'hi']) {
        const fh = freed(row, a, k);
        x[k] += fh * row.rate;
        scen[k].h += fh;
        scen[k].c += fh * row.rate;
        if (k === 'c') {
          x.fh += fh;
          row.fh += fh;
        }
      }
    }
    row.fc = row.fh * row.rate;
  }
  const byBasis = {};
  for (const a of ACTIVITIES) for (const [k, share] of Object.entries(splitOf(a, R[a].c))) byBasis[k] = (byBasis[k] || 0) + share * acts[a].c;
  const byRate = {};
  for (const row of rows) byRate[row.basis[0]] = (byRate[row.basis[0]] || 0) + row.cost;
  return { rows, acts, scen, hours, cost, byBasis, byRate };
};

// The checks: the busiest person's weekly hours on each activity, against a published benchmark.
export const BENCHMARKS = { search: 5.5, email: 13, meet: 18, total: WEEK_HOURS, bund: 55 };
const busiest = (res, weeks, pick) => {
  let best = null;
  for (const row of res.rows) {
    const v = pick(row) / row.n / weeks;
    if (!best || v > best.v) best = { v, id: row.id };
  }
  return best;
};
export const checks = (state, res) => {
  const out = [];
  if (!res.rows.length) return out;
  const W = state.weeks;
  for (const [key, pick] of [['search', (r) => r.h.search], ['email', (r) => r.h.email], ['meet', (r) => r.h.meet]]) {
    const b = busiest(res, W, pick);
    if (b && b.v > 0) out.push({ key, person: b.id, weekly: b.v, bench: BENCHMARKS[key], status: b.v <= BENCHMARKS[key] ? 'ok' : 'warn' });
  }
  const tot = busiest(res, W, (r) => r.hours);
  if (tot && tot.v > 0) out.push({ key: 'total', person: tot.id, weekly: tot.v, bench: WEEK_HOURS, status: tot.v <= WEEK_HOURS ? 'fits' : 'cap' });
  if (state.bundles > 0 && res.acts.bund.h > 0) {
    const per = res.acts.bund.h / state.bundles;
    out.push({ key: 'bund', perBundle: per, bench: BENCHMARKS.bund, status: per <= BENCHMARKS.bund ? 'ok' : 'warn' });
  }
  if (state.forum === 'adj') out.push({ key: 'adj', weeks: W, status: 'ctx' });
  return out;
};

// The timesheet, for the number of matters.
export const timesheet = (res, matters) =>
  drawSheet(Object.fromEntries(ACTIVITIES.map((a) => [a, { h: res.acts[a].h * matters, fh: res.acts[a].fh * matters }])), HOURS_PER_DAY);
