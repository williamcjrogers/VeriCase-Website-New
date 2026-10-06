import { useMemo, useReducer } from 'react';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { Gated } from '@/components/editorial/Gated';
import * as M from '@/calculators/evidenceModel';
import { CALCULATORS as C, CALCULATOR_GATE, CALCULATOR_SOURCES, EVIDENCE_COST as P } from '@/content/calculators';
import { ActivityMeter, BasisKey, Scroll, BasisMeter, Badge, CalcNotes, Linked, LiveSummary, MobileBar, NumberInput, RateInput, ReductionsTable, Slider, StartingPoints, Timesheet, fill, gbp, gbp2, hrs, pct, plural } from '@/components/calculators/parts';
import { cn } from '@/lib/utils';
import '@/components/calculators/calculators.css';

// The evidence cost calculator (owner, 06 October 2026, reviewed and refined): the cost of the
// professional time on the evidence, built up from each person's hours on one matter. The headline
// is that cost; the time a shared record might free is shown beneath it as an illustration.

function reducer(state, a) {
  switch (a.type) {
    case 'preset':
      return M.applyPreset(state, a.key);
    case 'set':
      return { ...state, [a.key]: a.value, dirty: a.key === 'matters' ? true : state.dirty };
    case 'rateBasis':
      return M.setRateBasis(state, a.value);
    case 'rate':
      return { ...state, rates: { ...state.rates, [a.id]: a.value } };
    case 'team':
      return { ...state, dirty: true, team: { ...state.team, [a.id]: { ...state.team[a.id], [a.field]: a.value } } };
    case 'meeting':
      return { ...state, dirty: a.field === 'red' ? state.dirty : true, meetings: { ...state.meetings, [a.id]: { ...state.meetings[a.id], [a.field]: a.value } } };
    case 'attend': {
      const att = state.meetings[a.id].att.filter((r) => r !== a.role).concat(a.on ? [a.role] : []);
      return { ...state, dirty: true, meetings: { ...state.meetings, [a.id]: { ...state.meetings[a.id], att } } };
    }
    case 'red':
      return { ...state, red: { ...state.red, [a.act]: { ...state.red[a.act], [a.k]: Math.min(100, a.value) } } };
    case 'pubOnly':
      return { ...state, pubOnly: a.value };
    case 'restore':
      return M.restoreReductions(state);
    default:
      return state;
  }
}

export const EvidenceCost = () => {
  const [state, dispatch] = useReducer(reducer, undefined, () => M.initialState());
  const res = useMemo(() => M.compute(state), [state]);
  const low = useMemo(() => M.compute(state, 'lo'), [state]);
  const high = useMemo(() => M.compute(state, 'hi'), [state]);
  const R = M.effectiveReductions(state);
  const t = res.tot;
  const N = state.matters;
  const day = state.dayLen > 0 ? state.dayLen : M.DEFAULT_DAY;
  const pubV = res.grades.pub;
  const sheet = M.timesheet(res, day);
  const nameOf = (id) => P.team.names[id];
  const on = M.ROLES.filter((r) => state.team[r.id].on);
  const sum = (f) => on.reduce((s, r) => s + state.team[r.id][f], 0);

  let published = '';
  if (t.baseC > 0 && t.freeC > 0) {
    if (pubV >= t.freeC - 0.5) published = P.results.allPublished;
    else if (pubV <= 0.5) published = P.results.nonePublished;
    else published = fill(P.results.somePublished, { pub: gbp(pubV) });
  }

  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="calc-page bg-parchment outline-none">
        <Gated id={CALCULATOR_GATE} block className="container">
          <section className="calc-intro" aria-labelledby="evidence-cost-title">
            <div className="double-rule mb-5 max-w-[8rem]" aria-hidden="true" />
            <p className="eyebrow">{C.eyebrow}</p>
            <h1 id="evidence-cost-title">{P.h1}</h1>
            {P.intro.map((p) => <p key={p}><Linked text={p} /></p>)}
            <BasisKey />
            <p className="calc-other"><Linked text={P.other} /></p>
          </section>

          <div className="calc-layout">
            <form className="calc-form" noValidate onSubmit={(e) => e.preventDefault()} aria-label={P.h1}>
              <fieldset className="calc-group">
                <legend className="calc-legend">{P.matter.legend}</legend>
                <p className="calc-note">{P.matter.note}</p>
                <StartingPoints
                  name="evidence-start"
                  legend={P.matter.startLegend}
                  options={M.PRESETS_ORDER.map((k) => [k, P.matter.starts[k]])}
                  value={state.dirty ? null : state.preset}
                  onChoose={(key) => dispatch({ type: 'preset', key })}
                />
                <p className="calc-status" aria-live="polite">
                  {state.dirty ? fill(P.matter.edited, { start: P.matter.starts[state.preset] }) : P.matter.status[state.preset]}
                </p>
                <Slider id="ec-matters" label={P.matter.matters.label} hint={P.matter.matters.hint} value={N} output={N} min={1} max={M.MAX_MATTERS} onValue={(v) => dispatch({ type: 'set', key: 'matters', value: v })} />
                <div className="calc-field">
                  <div className="calc-field-head">
                    <label htmlFor="ec-search">{P.matter.searchShare.label}</label>
                    <output htmlFor="ec-search">{fill(P.matter.searchShare.output, { n: state.searchShare })}</output>
                  </div>
                  <input id="ec-search" type="range" min={0} max={60} step={5} value={state.searchShare} onChange={(e) => dispatch({ type: 'set', key: 'searchShare', value: Number(e.target.value) })} />
                  <p className="calc-hint">
                    <Badge cls={state.searchShare === M.DEFAULT_SEARCH_SHARE ? 'asm' : 'own'} /> {P.matter.searchShare.hint}
                  </p>
                </div>
                <div className="calc-row">
                  <div>
                    <label className="calc-mini" htmlFor="ec-basis">{P.matter.rateBasis.label}</label>
                    <select id="ec-basis" className="calc-select" value={state.rateBasis} onChange={(e) => dispatch({ type: 'rateBasis', value: e.target.value })}>
                      {M.RATE_BASES.map((b) => <option key={b} value={b}>{P.matter.rateBasis.options[b]}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="calc-mini" htmlFor="ec-day">{P.matter.dayLen.label}</label>
                    <NumberInput id="ec-day" value={state.dayLen} step="0.5" max={12} onValue={(v) => dispatch({ type: 'set', key: 'dayLen', value: v })} />
                  </div>
                </div>
                <p className="calc-hint">{P.matter.rateHint}</p>
                <div className="calc-row is-single">
                  <div className="calc-disc">
                    <label className="calc-tick">
                      <input type="checkbox" checked={state.recapOn} onChange={(e) => dispatch({ type: 'set', key: 'recapOn', value: e.target.checked })} />
                      {P.matter.recap.label}
                    </label>
                    <NumberInput value={state.recap} max={100} step="5" disabled={!state.recapOn} aria-label={P.matter.recap.field} onValue={(v) => dispatch({ type: 'set', key: 'recap', value: v })} />
                  </div>
                  <p className="calc-hint">{P.matter.recap.hint}</p>
                </div>
              </fieldset>

              <fieldset className="calc-group">
                <legend className="calc-legend">{P.team.legend}</legend>
                <p className="calc-note">{P.team.note}</p>
                <div className="calc-scroll" role="region" aria-label={P.team.legend} tabIndex={0}>
                  <table className="calc-table calc-team">
                    <thead><tr>{P.team.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
                    <tbody>
                      {M.ROLES.map((r, i) => {
                        const row = state.team[r.id];
                        const basis = M.rateBasis(state, r.id);
                        const name = nameOf(r.id);
                        const field = (f) => `${name}, ${P.team.fields[f]}`;
                        const derived = Boolean(r.grade) && state.rateBasis !== 'own';
                        return [
                          (i === 0 || M.ROLES[i - 1].group !== r.group) && (
                            <tr key={`${r.group}-group`} className="is-group"><td colSpan={5}>{P.team.groups[r.group]}</td></tr>
                          ),
                          <tr key={r.id} className={cn(!row.on && 'is-off')}>
                            <td>
                              <div className="calc-who">
                                <label>
                                  <input type="checkbox" checked={row.on} onChange={(e) => dispatch({ type: 'team', id: r.id, field: 'on', value: e.target.checked })} />
                                  <span>{name}</span>
                                </label>
                                <Badge cls={basis[0]}>{C.rateBasis[basis[1]]}</Badge>
                              </div>
                            </td>
                            <td>
                              <RateInput value={state.rates[r.id]} disabled={!row.on || derived} label={field('rate')} onValue={(v) => dispatch({ type: 'rate', id: r.id, value: v })} />
                            </td>
                            {['email', 'read', 'bund'].map((f) => (
                              <td key={f}>
                                <NumberInput value={row[f]} step="0.5" disabled={!row.on} aria-label={field(f)} onValue={(v) => dispatch({ type: 'team', id: r.id, field: f, value: v })} />
                              </td>
                            ))}
                          </tr>,
                        ];
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>{P.team.foot}</td>
                        <td>{on.length} {plural(on.length, P.team.people)}</td>
                        <td>{hrs(sum('email'))}</td>
                        <td>{hrs(sum('read'))}</td>
                        <td>{hrs(sum('bund'))}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </fieldset>

              <fieldset className="calc-group">
                <legend className="calc-legend">{P.meetings.legend}</legend>
                <p className="calc-note">{P.meetings.note}</p>
                <div>
                  {M.MEETINGS.map(({ id }) => {
                    const s = state.meetings[id];
                    const x = res.meets[id];
                    const name = P.meetings.names[id];
                    return (
                      <div key={id} className="calc-meet">
                        <div className="calc-meet-head">
                          <p className="calc-meet-name">{name}</p>
                          <div>
                            <label className="calc-mini" htmlFor={`ec-meet-${id}-n`}>{P.meetings.number}</label>
                            <NumberInput id={`ec-meet-${id}-n`} value={s.n} step="1" onValue={(v) => dispatch({ type: 'meeting', id, field: 'n', value: v })} />
                          </div>
                          <div>
                            <label className="calc-mini" htmlFor={`ec-meet-${id}-h`}>{P.meetings.length}</label>
                            <NumberInput id={`ec-meet-${id}-h`} value={s.h} step="0.25" onValue={(v) => dispatch({ type: 'meeting', id, field: 'h', value: v })} />
                          </div>
                        </div>
                        <div className="mt-2">
                          <label className="calc-mini" htmlFor={`ec-meet-${id}-red`}>{P.meetings.reduction}</label>
                          <select id={`ec-meet-${id}-red`} className="calc-select" value={String(s.red)} disabled={state.pubOnly} onChange={(e) => dispatch({ type: 'meeting', id, field: 'red', value: Number(e.target.value) })}>
                            {M.MEETING_OPTIONS.map((v) => <option key={v} value={String(v)}>{P.meetings.options[v]}</option>)}
                          </select>
                          {state.pubOnly && <p className="calc-hint">{P.meetings.locked}</p>}
                        </div>
                        <fieldset className="calc-chips">
                          <legend className="sr-only">{fill(P.meetings.who, { name })}</legend>
                          {M.ROLES.map((r) => (
                            <label key={r.id} className="calc-chip">
                              <input type="checkbox" checked={s.att.includes(r.id)} disabled={!state.team[r.id].on} onChange={(e) => dispatch({ type: 'attend', id, role: r.id, on: e.target.checked })} />
                              <span>{nameOf(r.id)}</span>
                            </label>
                          ))}
                        </fieldset>
                        <p className="calc-hint">{fill(P.meetings.summary, { n: x.people, attendees: plural(x.people, P.meetings.attendees), hours: hrs(x.hours), cost: gbp(x.cost) })}</p>
                        <p className="calc-hint">{P.meetings.hints[id]}</p>
                      </div>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="calc-group">
                <legend className="calc-legend">{P.reductions.legend}</legend>
                <p className="calc-note">{P.reductions.note}</p>
                <div className="calc-row is-single">
                  <div>
                    <label className="calc-tick">
                      <input type="checkbox" checked={state.pubOnly} onChange={(e) => dispatch({ type: 'pubOnly', value: e.target.checked })} />
                      {C.pubOnly.label}
                    </label>
                    <p className="calc-hint">{C.pubOnly.hint}</p>
                  </div>
                </div>
                <ReductionsTable state={state} R={R} dispatch={dispatch} basisOf={(a) => (a === 'meet' ? meetingBasis(state) : M.reductionBasis(state, a))} perMeeting={P.reductions.perMeeting} />
                <button type="button" className="calc-text-button" onClick={() => dispatch({ type: 'restore' })}>{P.reductions.restore}</button>
              </fieldset>
            </form>

            <aside className="calc-results" id="evidence-results" aria-labelledby="evidence-results-title">
              <h2 className="sr-only" id="evidence-results-title">{P.results.title}</h2>
              <p className="calc-results-label">{N === 1 ? P.results.label : fill(P.results.labelMany, { n: N })}</p>
              <p className="calc-total">{gbp(t.baseC)}</p>
              <p className="calc-total-sub">
                {t.baseC > 0
                  ? fill(P.results.sub, { hours: hrs(t.baseH), days: hrs(t.baseH / day), day: hrs(day) })
                  : P.results.tickSomeone}
              </p>

              <div className="calc-freed">
                <p className="calc-freed-title">{C.freedTitle}</p>
                <p className="calc-freed-big">{gbp(t.freeC)}</p>
                <p className="calc-freed-sub">
                  {t.freeC > 0
                    ? `${fill(P.results.freedSub, { hours: hrs(t.freeH), days: hrs(t.freeH / day), share: pct(t.baseC > 0 ? (100 * t.freeC) / t.baseC : 0) })} ${published}`
                    : P.results.setReduction}
                </p>
                {state.recapOn && <p className="calc-caveat">{fill(P.results.partValue, { share: pct(state.recap) })}</p>}
                <p className="calc-caveat">{C.caveat}</p>
                <p className="calc-caveat">{C.recover[state.preset === 'tcc' ? 'court' : 'adj']}</p>
              </div>

              <section className="calc-block" aria-labelledby="ec-act-meter-title">
                <h2 id="ec-act-meter-title">{P.results.activity.title}</h2>
                <p>{P.results.activity.intro}</p>
                <ActivityMeter values={Object.fromEntries(M.ACTIVITIES.map((a) => [a, res.acts[a].freeC]))} total={t.freeC} label={P.results.activity.intro} />
              </section>

              <section className="calc-block" aria-labelledby="ec-grade-title">
                <h2 id="ec-grade-title">{P.results.grade.title}</h2>
                <p>{P.results.grade.intro}</p>
                <p className="calc-meter-label"><span>{P.results.grade.label}</span><strong>{t.freeC > 0 ? pct((100 * pubV) / t.freeC) : '0%'}</strong></p>
                <BasisMeter parts={res.grades} total={t.freeC} label={P.results.grade.intro} />
              </section>

              <Timesheet sheet={sheet} hoursPerDay={day} idPrefix="ec" />

              <section className="calc-block" aria-labelledby="ec-act-title">
                <h2 id="ec-act-title">{P.results.byActivity.title}</h2>
                <Scroll label={P.results.byActivity.title}>
                  <table className="calc-table calc-out">
                    <thead><tr>{P.results.byActivity.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
                    <tbody>
                      {M.ACTIVITIES.map((a) => {
                        const A = res.acts[a];
                        return (
                          <tr key={a}>
                            <td><span className="calc-cellname"><span className={cn('calc-sw', `act-${a}`)} />{C.activities[a].name}</span></td>
                            <td>{hrs(A.baseH)}</td>
                            <td>{gbp(A.baseC)}</td>
                            <td>{A.baseH > 0 ? pct((100 * A.freeH) / A.baseH) : '0%'}</td>
                            <td>{hrs(A.freeH)}</td>
                            <td>{gbp(A.freeC)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>{C.total}</td>
                        <td>{hrs(t.baseH)}</td>
                        <td>{gbp(t.baseC)}</td>
                        <td>{t.baseC > 0 ? pct((100 * t.freeC) / t.baseC) : '0%'}</td>
                        <td>{hrs(t.freeH)}</td>
                        <td>{gbp(t.freeC)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </Scroll>
              </section>

              <section className="calc-block" aria-labelledby="ec-person-title">
                <h2 id="ec-person-title">{P.results.byPerson.title}</h2>
                <Scroll label={P.results.byPerson.title}>
                  <table className="calc-table calc-out">
                    <thead><tr>{P.results.byPerson.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
                    <tbody>
                      {on.length ? on.map((r) => {
                        const x = res.roles[r.id];
                        return (
                          <tr key={r.id}>
                            <td>{nameOf(r.id)}</td>
                            <td>{gbp2(state.rates[r.id] || 0)}</td>
                            <td>{hrs(x.baseH)}</td>
                            <td>{hrs(x.freeH)}</td>
                            <td>{gbp(x.freeC)}</td>
                          </tr>
                        );
                      }) : <tr><td colSpan={5}>{C.noOne}</td></tr>}
                    </tbody>
                    <tfoot>
                      <tr><td>{C.total}</td><td /><td>{hrs(t.baseH)}</td><td>{hrs(t.freeH)}</td><td>{gbp(t.freeC)}</td></tr>
                    </tfoot>
                  </table>
                </Scroll>
              </section>

              <section className="calc-block" aria-labelledby="ec-range-title">
                <h2 id="ec-range-title">{P.results.range.title}</h2>
                <Scroll label={P.results.range.title}>
                  <table className="calc-table calc-out">
                    <thead>
                      <tr>{P.results.range.columns.map((c) => <th key={c} scope="col">{fill(c, { n: N })}</th>)}</tr>
                    </thead>
                    <tbody>
                      {[['lo', low], ['c', res], ['hi', high]].map(([k, r]) => (
                        <tr key={k} className={cn(k === 'c' && 'is-central')}>
                          <td>{P.results.range.rows[k]}</td>
                          <td>{gbp(r.tot.freeC / N)}</td>
                          <td>{gbp(r.tot.freeC)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Scroll>
                <p className="calc-note-line">{P.results.range.note}</p>
              </section>

              <div className="calc-actions">
                <button type="button" className="calc-text-button" onClick={() => window.print()}>{C.print}</button>
              </div>
            </aside>
          </div>

          <CalcNotes method={P.method} sources={CALCULATOR_SOURCES} idPrefix="ec" />
          <LiveSummary text={fill(C.live, { cost: gbp(t.baseC), freed: gbp(t.freeC) })} />
        </Gated>
      </main>
      <SiteFooter />
      <MobileBar label={C.mobileLabel} value={gbp(t.baseC)} targetId="evidence-results" />
    </>
  );
};

// The meeting reductions are set for each kind of meeting, so the basis shown in the reductions
// table is that of the meetings that use one.
const meetingBasis = (state) => {
  if (state.pubOnly) return 'noneMeasured';
  const used = Object.values(state.meetings).filter((m) => m.red > 0);
  if (!used.length) return 'noneMeasured';
  return used.some((m) => M.MEETING_OPTION_CLASS[m.red] === 'own') ? 'aboveVendor' : 'withinVendor';
};
