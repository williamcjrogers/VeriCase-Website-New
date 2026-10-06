import * as D from './discussionModel';
import * as E from './evidenceModel';
import { RED_DEFAULT, ASSUMED } from './reductions';
import { noteByNumber } from '@/content/notes';

const note3 = [].concat(noteByNumber(3).body).join(' ');
const pounds = (v) => `£${v.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

describe('the discussion cost calculator', () => {
  it('starts from note 3: 120 rounds of 40 minutes cost what the home page says', () => {
    const state = D.initialState();
    expect(state.preset).toBe('adj');
    expect(state.items * state.rounds).toBe(120);
    const minutes = Object.values(state.team).filter((t) => t.on).reduce((s, t) => s + t.min, 0);
    expect(minutes).toBe(40);
    const res = D.compute(state);
    expect(res.acts.email.cost).toBeCloseTo(18318.6, 6);
    expect(note3).toContain(`${pounds(18318.6)} for 120 rounds in one adjudication`);
  });

  it('reproduces note 3’s base case for a court claim of 900 rounds', () => {
    const state = D.applyPreset(D.initialState(), 'court');
    expect(state.items * state.rounds).toBe(900);
    expect(D.compute(state).acts.email.cost).toBeCloseTo(137389.5, 6);
    expect(note3).toContain(`${pounds(137389.5)} for 900 rounds`);
  });

  it('counts published research only in the central case until the visitor chooses otherwise', () => {
    const state = D.initialState();
    expect(state.pubOnly).toBe(true);
    const R = D.effectiveReductions(state);
    for (const a of ASSUMED) expect(R[a].c).toBe(0);
    expect(R.email.c).toBe(RED_DEFAULT.email.c);
    const res = D.compute(state);
    expect(Object.keys(res.byBasis)).toEqual(['pub']);
    const withAssumptions = D.compute({ ...state, pubOnly: false });
    expect(withAssumptions.scen.c.c).toBeGreaterThan(res.scen.c.c);
    expect(withAssumptions.byBasis.asm).toBeGreaterThan(0);
    // The low and high cases are the same either way.
    expect(withAssumptions.scen.hi.c).toBeCloseTo(res.scen.hi.c, 6);
  });

  it('marks a reduction above the published range as the visitor’s own', () => {
    const state = D.initialState();
    const above = { ...state, red: { ...state.red, email: { ...state.red.email, c: 40 } } };
    expect(D.reductionBasis(above, 'email')).toBe('abovePublished');
    const res = D.compute(above);
    expect(res.byBasis.own).toBeCloseTo(res.acts.email.c * (10 / 40), 6);
    expect(res.byBasis.pub).toBeCloseTo(res.acts.email.c * (30 / 40) + res.acts.search.c, 6);
  });

  it('labels each rate with its basis', () => {
    const state = D.initialState();
    expect(D.rateBasis(state, 'ptr')).toEqual(['pub', 'guideline']);
    expect(D.rateBasis(state, 'jun')).toEqual(['pub', 'panel']);
    expect(D.rateBasis(state, 'kc')).toEqual(['asm', 'assumption']);
    expect(D.rateBasis(state, 'qex')).toEqual(['pub', 'survey']);
    expect(D.rateBasis(state, 'cm')).toEqual(['pub', 'derived']);
    expect(D.rateBasis({ ...state, rates: { ...state.rates, cm: 60 } }, 'cm')).toEqual(['own', 'yours']);
    expect(D.rateBasis(D.setBand(state, 'n2'), 'asc')).toEqual(['pub', 'guideline']);
  });

  it('draws a timesheet of whole squares that adds up to the hours', () => {
    const res = D.compute(D.initialState());
    const sheet = D.timesheet(res, 1);
    expect(sheet.squares.length).toBe(Math.round(sheet.totalDays / sheet.unit));
    expect(sheet.totalDays).toBeCloseTo(res.hours / D.HOURS_PER_DAY, 6);
    const big = D.timesheet(D.compute(D.applyPreset(D.initialState(), 'court')), 10);
    expect(big.squares.length).toBeLessThanOrEqual(520);
  });

  it('tests the busiest person’s week against each benchmark', () => {
    const state = D.initialState();
    const keys = D.checks(state, D.compute(state)).map((c) => c.key);
    expect(keys).toEqual(['search', 'email', 'meet', 'total', 'bund', 'adj']);
  });
});

describe('the evidence cost calculator', () => {
  it('keeps the worked example’s arithmetic when assumptions are included', () => {
    // The large adjudication with every default and the assumed reductions counted: £364,404 of
    // time before any reduction and £38,294 of it freed in the central case.
    const state = { ...E.initialState('large'), pubOnly: false };
    const res = E.compute(state);
    expect(Math.round(res.tot.baseC)).toBe(364404);
    expect(Math.round(res.tot.freeC)).toBe(38294);
  });

  it('counts published research only by default, and multiplies one matter for a series', () => {
    const state = E.initialState('large');
    const res = E.compute(state);
    expect(res.grades.asm).toBe(0);
    expect(res.grades.pub).toBeCloseTo(res.tot.freeC, 6);
    const serial = E.compute(E.applyPreset(state, 'serial'));
    expect(serial.tot.baseC).toBeCloseTo(res.tot.baseC * 3, 4);
  });

  it('applies a meeting reduction only when assumptions count, and values part of the time if asked', () => {
    let state = E.initialState('large');
    state = { ...state, meetings: { ...state.meetings, progress: { ...state.meetings.progress, red: 18.9 } } };
    expect(E.compute(state).acts.meet.freeC).toBe(0);
    const counted = E.compute({ ...state, pubOnly: false });
    expect(counted.acts.meet.freeC).toBeGreaterThan(0);
    expect(counted.grades.ven).toBeCloseTo(counted.acts.meet.freeC, 6);
    const part = E.compute({ ...state, recapOn: true, recap: 80 });
    expect(part.tot.freeC).toBeCloseTo(E.compute(state).tot.freeC * 0.8, 6);
    expect(part.tot.freeH).toBeCloseTo(E.compute(state).tot.freeH, 6);
  });

  it('labels the rates by their basis', () => {
    const state = E.initialState();
    expect(E.rateBasis(state, 'partner')).toEqual(['pub', 'guideline']);
    expect(E.rateBasis(state, 'junior')).toEqual(['pub', 'panel']);
    expect(E.rateBasis(state, 'kc')).toEqual(['asm', 'assumption']);
    expect(E.rateBasis(E.setRateBasis(state, 'own'), 'partner')).toEqual(['own', 'yours']);
  });
});
