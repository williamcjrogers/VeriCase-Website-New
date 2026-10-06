import { useMemo, useReducer } from 'react';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { Gated } from '@/components/editorial/Gated';
import * as M from '@/calculators/discussionModel';
import { near } from '@/calculators/rates';
import { CALCULATORS as C, CALCULATOR_GATE, CALCULATOR_SOURCES, DISCUSSION_COST as P } from '@/content/calculators';
import { BasisKey, BasisMeter, Scroll, Badge, CalcNotes, Linked, LiveSummary, MobileBar, NumberInput, RateInput, ReductionsTable, Slider, StartingPoints, Timesheet, fill, gbp, hrs, pct, plural, rate, wk } from '@/components/calculators/parts';
import { cn } from '@/lib/utils';
import '@/components/calculators/calculators.css';

// The discussion cost calculator (owner, 06 October 2026, reviewed and refined): the cost of the
// professional time on the evidence, built up from each item and each time it is discussed. Its
// adjudication starting point is note 3's model on the home page, and models.test.js holds the
// two to the same figure.

const HOME_ROUND_COST = 18318.6;
const ROLE_IDS = M.ROLES.map((r) => r.id);

function reducer(state, a) {
  switch (a.type) {
    case 'preset':
      return M.applyPreset(state, a.key);
    case 'matter':
      return { ...state, [a.key]: a.value, dirty: ['items', 'rounds', 'bundles', 'weeks'].includes(a.key) ? true : state.dirty };
    case 'band':
      return M.setBand(state, a.value);
    case 'rate':
      return { ...state, rates: { ...state.rates, [a.id]: a.value } };
    case 'disc':
      return { ...state, disc: { ...state.disc, [a.id]: { ...state.disc[a.id], ...a.patch } } };
    case 'team':
      return { ...state, dirty: true, team: { ...state.team, [a.id]: { ...state.team[a.id], [a.field]: a.value } } };
    case 'meeting':
      return { ...state, dirty: true, meetings: { ...state.meetings, [a.id]: { ...state.meetings[a.id], [a.field]: a.value } } };
    case 'attend': {
      const att = state.meetings[a.id].att.filter((r) => r !== a.role).concat(a.on ? [a.role] : []);
      return { ...state, dirty: true, meetings: { ...state.meetings, [a.id]: { ...state.meetings[a.id], att } } };
    }
    case 'red':
      return { ...state, red: { ...state.red, [a.act]: { ...state.red[a.act], [a.k]: Math.min(100, a.value) } } };
    case 'pubOnly':
      return { ...state, pubOnly: a.value };
    case 'value':
      return { ...state, value: a.value };
    case 'reset':
      return M.resetRatesAndReductions(state);
    default:
      return state;
  }
}

const roundsText = (n) => (n === 1 ? P.matter.rounds.once : n === 2 ? P.matter.rounds.twice : fill(P.matter.rounds.many, { n }));
const weeksText = (w) => `${w} ${plural(w, P.matter.weeks.words)}`;
const pickValue = (v, choices) => (choices.some((c) => near(v, c)) ? String(choices.find((c) => near(v, c))) : 'own');

export const DiscussionCost = () => {
  const [state, dispatch] = useReducer(reducer, undefined, () => M.initialState());
  const res = useMemo(() => M.compute(state), [state]);
  const R = M.effectiveReductions(state);
  const N = state.matters;
  const V = state.value;
  const cost = res.cost * N;
  const hours = res.hours * N;
  const value = (x) => x * V * N;
  const freed = value(res.scen.c.c);
  const share = cost > 0 ? (100 * freed) / cost : 0;
  const discussing = res.acts.email.cost * N;
  const asHome = state.preset === 'adj' && !state.dirty && N === 1 && near(res.acts.email.cost, HOME_ROUND_COST);
  const checks = M.checks(state, res);
  const sheet = M.timesheet(res, N);
  const nameOf = (id) => P.team.names[id];
  const texCount = M.people(state, 'tex');

  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="calc-page bg-parchment outline-none">
        <Gated id={CALCULATOR_GATE} block className="container">
          <section className="calc-intro" aria-labelledby="discussion-cost-title">
            <div className="double-rule mb-5 max-w-[8rem]" aria-hidden="true" />
            <p className="eyebrow">{C.eyebrow}</p>
            <h1 id="discussion-cost-title">{P.h1}</h1>
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
                  name="discussion-start"
                  legend={P.matter.startLegend}
                  options={M.PRESETS_ORDER.map((k) => [k, P.matter.starts[k]])}
                  value={state.dirty ? null : state.preset}
                  onChoose={(key) => dispatch({ type: 'preset', key })}
                />
                <p className="calc-status" aria-live="polite">
                  {state.dirty ? fill(P.matter.custom, { start: P.matter.starts[state.preset].toLowerCase() }) : P.matter.status[state.preset]}
                </p>
                <Slider id="dc-items" label={P.matter.items.label} hint={P.matter.items.hint} value={state.items} output={state.items.toLocaleString('en-GB')} min={10} max={1000} step={10} onValue={(v) => dispatch({ type: 'matter', key: 'items', value: v })} />
                <Slider id="dc-rounds" label={P.matter.rounds.label} hint={P.matter.rounds.hint} value={state.rounds} output={roundsText(state.rounds)} min={1} max={6} onValue={(v) => dispatch({ type: 'matter', key: 'rounds', value: v })} />
                <Slider id="dc-bundles" label={P.matter.bundles.label} hint={P.matter.bundles.hint} value={state.bundles} output={state.bundles === 0 ? P.matter.bundles.none : `${state.bundles} ${plural(state.bundles, P.matter.bundles.words)}`} min={0} max={12} onValue={(v) => dispatch({ type: 'matter', key: 'bundles', value: v })} />
                <Slider id="dc-weeks" label={P.matter.weeks.label} hint={P.matter.weeks.hint} value={state.weeks} output={weeksText(state.weeks) + (state.weeks >= 9 ? fill(P.matter.weeks.months, { m: Math.round((state.weeks * 12) / 52) }) : '')} min={2} max={156} onValue={(v) => dispatch({ type: 'matter', key: 'weeks', value: v })} />
                <Slider id="dc-matters" label={P.matter.matters.label} hint={P.matter.matters.hint} value={N} output={N} min={1} max={10} onValue={(v) => dispatch({ type: 'matter', key: 'matters', value: v })} />
                <div className="calc-row">
                  <div>
                    <label className="calc-mini" htmlFor="dc-forum">{P.matter.forum.label}</label>
                    <select id="dc-forum" className="calc-select" value={state.forum} onChange={(e) => dispatch({ type: 'matter', key: 'forum', value: e.target.value })}>
                      {M.FORUMS.map((f) => <option key={f} value={f}>{P.matter.forum.options[f]}</option>)}
                    </select>
                  </div>
                </div>
              </fieldset>

              <fieldset className="calc-group">
                <legend className="calc-legend">{P.rates.legend}</legend>
                <p className="calc-note">{P.rates.note}</p>
                <div className="calc-row is-single">
                  <div>
                    <label className="calc-mini" htmlFor="dc-band">{P.rates.band.label}</label>
                    <select id="dc-band" className="calc-select" value={state.band} onChange={(e) => dispatch({ type: 'band', value: e.target.value })}>
                      {M.BANDS.map((b) => <option key={b} value={b}>{P.rates.band.options[b]}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="calc-mini" htmlFor="dc-kc">{P.rates.kc.label}</label>
                    <select id="dc-kc" className="calc-select" value={pickValue(state.rates.kc, M.KC_CHOICES)} onChange={(e) => e.target.value !== 'own' && dispatch({ type: 'rate', id: 'kc', value: Number(e.target.value) })}>
                      {M.KC_CHOICES.map((v) => <option key={v} value={String(v)}>{P.rates.kc.options[v]}</option>)}
                      <option value="own" hidden>{P.rates.kc.own}</option>
                    </select>
                  </div>
                  <div>
                    <label className="calc-mini" htmlFor="dc-jun">{P.rates.jun.label}</label>
                    <select id="dc-jun" className="calc-select" value={pickValue(state.rates.jun, M.JUNIOR_CHOICES)} onChange={(e) => e.target.value !== 'own' && dispatch({ type: 'rate', id: 'jun', value: Number(e.target.value) })}>
                      {M.JUNIOR_CHOICES.map((v) => <option key={v} value={String(v)}>{P.rates.jun.options[v]}</option>)}
                      <option value="own" hidden>{P.rates.jun.own}</option>
                    </select>
                  </div>
                </div>
                <fieldset className="calc-subgroup">
                  <legend className="calc-mini">{P.rates.disciplines.label}</legend>
                  {M.DISCIPLINES.map((d) => (
                    <div key={d} className="calc-disc">
                      <label className="calc-tick">
                        <input type="checkbox" checked={state.disc[d].on} onChange={(e) => dispatch({ type: 'disc', id: d, patch: { on: e.target.checked } })} />
                        {P.rates.disciplines.names[d]}
                      </label>
                      <RateInput value={state.disc[d].rate} disabled={!state.disc[d].on} label={fill(P.rates.disciplines.rateLabel, { name: P.rates.disciplines.names[d] })} onValue={(v) => dispatch({ type: 'disc', id: d, patch: { rate: v } })} />
                    </div>
                  ))}
                  <p className="calc-hint">
                    {texCount ? fill(P.rates.disciplines.some, { n: texCount, experts: plural(texCount, P.rates.disciplines.words), rate: rate(M.rateOf(state, 'tex')) }) : P.rates.disciplines.none}
                  </p>
                </fieldset>
              </fieldset>

              <fieldset className="calc-group">
                <legend className="calc-legend">{P.team.legend}</legend>
                <p className="calc-note">{P.team.note}</p>
                <div className="calc-scroll" role="region" aria-label={P.team.legend} tabIndex={0}>
                  <table className="calc-table calc-team">
                    <thead>
                      <tr>{P.team.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
                    </thead>
                    <tbody>
                      {M.ROLES.map((r, i) => {
                        const t = state.team[r.id];
                        const n = M.people(state, r.id);
                        const off = !t.on || n === 0;
                        const basis = M.rateBasis(state, r.id);
                        const name = nameOf(r.id);
                        const field = (f) => `${name}, ${P.team.fields[f]}`;
                        return [
                          (i === 0 || M.ROLES[i - 1].group !== r.group) && (
                            <tr key={`${r.group}-group`} className="is-group"><td colSpan={6}>{P.team.groups[r.group]}</td></tr>
                          ),
                          <tr key={r.id} className={cn(off && 'is-off')}>
                            <td>
                              <div className="calc-who">
                                <label>
                                  <input type="checkbox" checked={t.on} onChange={(e) => dispatch({ type: 'team', id: r.id, field: 'on', value: e.target.checked })} />
                                  <span>{name}{r.id === 'tex' && texCount ? ` (${texCount})` : ''}</span>
                                </label>
                                {r.id === 'tex' && n === 0 ? <span className="calc-hint">{P.team.noDiscipline}</span> : <Badge cls={basis[0]}>{C.rateBasis[basis[1]]}</Badge>}
                              </div>
                            </td>
                            <td>
                              {r.id === 'tex' ? (
                                <div className="calc-rate is-derived"><output aria-label={P.team.texRate}>{texCount ? rate(M.rateOf(state, 'tex')) : ''}</output></div>
                              ) : (
                                <RateInput value={state.rates[r.id]} disabled={!t.on} label={field('rate')} onValue={(v) => dispatch({ type: 'rate', id: r.id, value: v })} />
                              )}
                            </td>
                            {['min', 'smin', 'read', 'bund'].map((f) => (
                              <td key={f}>
                                <NumberInput value={t[f]} step="any" disabled={!t.on} aria-label={field(f)} onValue={(v) => dispatch({ type: 'team', id: r.id, field: f, value: v })} />
                              </td>
                            ))}
                          </tr>,
                        ];
                      })}
                    </tbody>
                  </table>
                </div>
              </fieldset>

              <fieldset className="calc-group">
                <legend className="calc-legend">{P.meetings.legend}</legend>
                <p className="calc-note">{P.meetings.note}</p>
                <div>
                  {M.MEETINGS.map((m) => {
                    const s = state.meetings[m];
                    const name = P.meetings.names[m];
                    return (
                      <div key={m} className="calc-meet">
                        <div className="calc-meet-head">
                          <p className="calc-meet-name">{name}</p>
                          <div>
                            <label className="calc-mini" htmlFor={`dc-meet-${m}-n`}>{P.meetings.number}</label>
                            <NumberInput id={`dc-meet-${m}-n`} value={s.n} step="1" onValue={(v) => dispatch({ type: 'meeting', id: m, field: 'n', value: v })} />
                          </div>
                          <div>
                            <label className="calc-mini" htmlFor={`dc-meet-${m}-len`}>{P.meetings.length}</label>
                            <NumberInput id={`dc-meet-${m}-len`} value={s.len} step="0.25" onValue={(v) => dispatch({ type: 'meeting', id: m, field: 'len', value: v })} />
                          </div>
                        </div>
                        <label className="calc-tick">
                          <input type="checkbox" checked={s.red} onChange={(e) => dispatch({ type: 'meeting', id: m, field: 'red', value: e.target.checked })} />
                          {P.meetings.replaceable}
                        </label>
                        <fieldset className="calc-chips">
                          <legend className="sr-only">{fill(P.meetings.who, { name })}</legend>
                          {ROLE_IDS.map((rid) => (
                            <label key={rid} className="calc-chip">
                              <input
                                type="checkbox"
                                checked={s.att.includes(rid)}
                                disabled={!state.team[rid].on || M.people(state, rid) === 0}
                                onChange={(e) => dispatch({ type: 'attend', id: m, role: rid, on: e.target.checked })}
                              />
                              <span>{nameOf(rid)}</span>
                            </label>
                          ))}
                        </fieldset>
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
                <div className="calc-row">
                  <div>
                    <label className="calc-mini" htmlFor="dc-meet-central">{P.reductions.meeting.label}</label>
                    <select
                      id="dc-meet-central"
                      className="calc-select"
                      disabled={state.pubOnly}
                      value={pickValue(R.meet.c, [0, 14, 18.9])}
                      onChange={(e) => e.target.value !== 'own' && dispatch({ type: 'red', act: 'meet', k: 'c', value: Number(e.target.value) })}
                    >
                      {[0, 14, 18.9].map((v) => <option key={v} value={String(v)}>{P.reductions.meeting.options[v]}</option>)}
                      <option value="own" hidden>{P.reductions.meeting.own}</option>
                    </select>
                  </div>
                  <div>
                    <label className="calc-mini" htmlFor="dc-value">{P.reductions.value.label}</label>
                    <select id="dc-value" className="calc-select" value={String(V)} onChange={(e) => dispatch({ type: 'value', value: Number(e.target.value) })}>
                      {[1, 0.8, 0.25].map((v) => <option key={v} value={String(v)}>{P.reductions.value.options[v]}</option>)}
                    </select>
                  </div>
                </div>
                <ReductionsTable state={state} R={R} dispatch={dispatch} basisOf={(a) => M.reductionBasis(state, a)} />
                <button type="button" className="calc-text-button" onClick={() => dispatch({ type: 'reset' })}>{C.restore}</button>
              </fieldset>
            </form>

            <aside className="calc-results" id="discussion-results" aria-labelledby="discussion-results-title">
              <h2 className="sr-only" id="discussion-results-title">{P.results.title}</h2>
              <p className="calc-results-label">{N === 1 ? P.results.label : fill(P.results.labelMany, { n: N })}</p>
              <p className="calc-total">{gbp(cost)}</p>
              <p className="calc-total-sub">
                {fill(P.results.sub, { hours: hrs(hours), days: Math.round(hours / M.HOURS_PER_DAY).toLocaleString('en-GB') })}
                {N > 1 ? fill(P.results.subEach, { cost: gbp(res.cost) }) : ''}
              </p>
              <p className="calc-line">
                <Linked text={asHome ? fill(P.results.homeFigure, { cost: gbp(discussing) }) : fill(P.results.discussion, { cost: gbp(discussing) })} />
              </p>

              <div className="calc-freed">
                <p className="calc-freed-title">{C.freedTitle}</p>
                <p className="calc-freed-big">{gbp(freed)}</p>
                <p className="calc-freed-sub">
                  {fill(P.results.freedSub, { hours: hrs(res.scen.c.h * N), share: pct(share), lo: gbp(value(res.scen.lo.c)), hi: gbp(value(res.scen.hi.c)) })}
                </p>
                {V !== 1 && <p className="calc-caveat">{fill(P.results.partValue, { share: pct(V * 100), full: gbp(res.scen.c.c * N) })}</p>}
                <p className="calc-caveat">{C.caveat}</p>
              </div>

              <section className="calc-block" aria-labelledby="dc-firm-title">
                <h2 id="dc-firm-title">{P.results.firm.title}</h2>
                <p className="calc-meter-label"><span>{P.results.firm.byReduction}</span></p>
                <BasisMeter parts={res.byBasis} total={res.scen.c.c} label={P.results.firm.byReduction} />
                <p className="calc-meter-label"><span>{P.results.firm.byRate}</span></p>
                <BasisMeter parts={res.byRate} total={res.cost} label={P.results.firm.byRate} />
                <p className="calc-note-line">
                  {res.scen.c.c > 0 ? fill(P.results.firm.line, { pub: gbp(value(res.byBasis.pub || 0)) }) : P.results.firm.lineNone}
                </p>
              </section>

              <section className="calc-block" aria-labelledby="dc-checks-title">
                <h2 id="dc-checks-title">{P.results.checks.title}</h2>
                <p>{P.results.checks.intro}</p>
                <ul className="calc-checks">
                  {checks.length ? checks.map((c) => <Check key={c.key} c={c} state={state} nameOf={nameOf} />) : <li>{C.noTime}</li>}
                </ul>
              </section>

              <Timesheet sheet={sheet} hoursPerDay={M.HOURS_PER_DAY} idPrefix="dc" />

              <section className="calc-block" aria-labelledby="dc-act-title">
                <h2 id="dc-act-title">{P.results.activity.title}</h2>
                <Scroll label={P.results.activity.title}>
                  <table className="calc-table calc-out">
                    <thead><tr>{P.results.activity.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
                    <tbody>
                      {M.ACTIVITIES.filter((a) => res.acts[a].h > 0).map((a) => {
                        const x = res.acts[a];
                        const c = R[a].c;
                        return (
                          <tr key={a}>
                            <td><span className="calc-cellname"><span className={cn('calc-sw', `act-${a}`)} />{C.activities[a].short}</span></td>
                            <td>{hrs(x.h * N)}</td>
                            <td>{gbp(x.cost * N)}</td>
                            <td>{pct(c)}{a === 'meet' && c > 0 && x.fh === 0 ? P.reductions.noneReplaceable : ''}</td>
                            <td>{gbp(value(x.c))}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr><td>{C.total}</td><td>{hrs(hours)}</td><td>{gbp(cost)}</td><td>{pct(cost > 0 ? (100 * res.scen.c.c * N) / cost : 0)}</td><td>{gbp(freed)}</td></tr>
                    </tfoot>
                  </table>
                </Scroll>
              </section>

              <section className="calc-block" aria-labelledby="dc-who-title">
                <h2 id="dc-who-title">{P.results.people.title}</h2>
                <Scroll label={P.results.people.title}>
                  <table className="calc-table calc-out">
                    <thead><tr>{P.results.people.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
                    <tbody>
                      {res.rows.length ? res.rows.map((row) => (
                        <tr key={row.id}>
                          <td>{nameOf(row.id)}{row.id === 'tex' ? ` (${row.n})` : ''}</td>
                          <td>{rate(row.rate)}</td>
                          <td>{hrs(row.hours * N)}</td>
                          <td>{wk(row.hours / row.n / state.weeks)}</td>
                          <td>{gbp(row.cost * N)}</td>
                          <td>{gbp(value(row.fc))}</td>
                        </tr>
                      )) : <tr><td colSpan={6}>{C.noOne}</td></tr>}
                    </tbody>
                    <tfoot>
                      <tr><td>{C.total}</td><td /><td>{hrs(hours)}</td><td /><td>{gbp(cost)}</td><td>{gbp(freed)}</td></tr>
                    </tfoot>
                  </table>
                </Scroll>
                <p className="calc-note-line">{P.results.people.note}</p>
              </section>

              <section className="calc-block" aria-labelledby="dc-scn-title">
                <h2 id="dc-scn-title">{P.results.scenarios.title}</h2>
                <p>{P.results.scenarios.intro}</p>
                <Scroll label={P.results.scenarios.title}>
                  <table className="calc-table calc-out">
                    <thead><tr>{P.results.scenarios.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
                    <tbody>
                      {M.ACTIVITIES.filter((a) => res.acts[a].h > 0).map((a) => (
                        <tr key={a}>
                          <td><span className="calc-cellname"><span className={cn('calc-sw', `act-${a}`)} />{C.activities[a].short}</span></td>
                          {['lo', 'c', 'hi'].map((k) => <td key={k}>{gbp(value(res.acts[a][k]))}</td>)}
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="is-central"><td>{C.total}</td>{['lo', 'c', 'hi'].map((k) => <td key={k}>{gbp(value(res.scen[k].c))}</td>)}</tr>
                      <tr><td>{P.results.scenarios.hours}</td>{['lo', 'c', 'hi'].map((k) => <td key={k}>{hrs(res.scen[k].h * N)}</td>)}</tr>
                      <tr><td>{P.results.scenarios.share}</td>{['lo', 'c', 'hi'].map((k) => <td key={k}>{pct(cost > 0 ? (100 * value(res.scen[k].c)) / cost : 0)}</td>)}</tr>
                    </tfoot>
                  </table>
                </Scroll>
                <p className="calc-note-line">{C.recover[state.forum]}</p>
              </section>

              <div className="calc-actions">
                <button type="button" className="calc-text-button" onClick={() => window.print()}>{C.print}</button>
              </div>
            </aside>
          </div>

          <CalcNotes method={P.method} sources={CALCULATOR_SOURCES} idPrefix="dc" />
          <LiveSummary text={fill(C.live, { cost: gbp(cost), freed: gbp(freed) })} />
        </Gated>
      </main>
      <SiteFooter />
      <MobileBar label={C.mobileLabel} value={gbp(cost)} targetId="discussion-results" />
    </>
  );
};

// One check: the figure, its status and gauge, and the benchmark it is measured against.
const Check = ({ c, state, nameOf }) => {
  const T = P.results.checks;
  const status = <span className={cn('calc-st', c.status === 'ok' || c.status === 'fits' ? 'is-ok' : c.status === 'ctx' ? 'is-ctx' : 'is-warn')}>{T.status[c.status]}</span>;
  const weeks = weeksText(state.weeks);
  let figure;
  if (c.key === 'adj') figure = fill(T.adj, { weeks, days: Math.round(state.weeks * 7) });
  else if (c.key === 'bund') figure = fill(T.bund, { hours: wk(c.perBundle) });
  else figure = fill(T.line, { person: c.person === 'tex' ? P.team.each : nameOf(c.person), hours: wk(c.weekly), unit: T.units[c.key], weeks });
  const v = c.key === 'bund' ? c.perBundle : c.weekly;
  return (
    <li>
      <div className="calc-check-head"><strong>{T.titles[c.key]}</strong>{status}</div>
      <p className="calc-check-fig">{figure}</p>
      {c.key !== 'adj' && (
        <div className={cn('calc-gauge', v > c.bench && 'is-over')} aria-hidden="true">
          <span style={{ width: `${Math.min(100, (100 * v) / (c.bench * 1.25)).toFixed(1)}%` }} />
          <i />
        </div>
      )}
      <p className="calc-check-bench"><Linked text={T.bench[c.key]} /></p>
    </li>
  );
};
