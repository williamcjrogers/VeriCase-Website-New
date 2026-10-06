import { Fragment, useEffect, useState } from 'react';
import { Rich } from '@/components/editorial/Rich';
import { CALCULATORS as C } from '@/content/calculators';
import { ACTIVITIES } from '@/calculators/reductions';
import { cn } from '@/lib/utils';

// The pieces both cost calculators are built from. Every word comes from content/calculators.js.

// Numbers as the calculators show them, in British English.
export const gbp = (v) => `£${Math.round(v).toLocaleString('en-GB')}`;
export const gbp2 = (v) => `£${v.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const rate = (v) => (Number.isInteger(Math.round(v * 100) / 100) ? gbp(v) : gbp2(v));
export const hrs = (h) => (h >= 100 ? Math.round(h) : Math.round(h * 10) / 10).toLocaleString('en-GB');
export const wk = (h) => (Math.round(h * 10) / 10).toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
export const pct = (p) => `${(Math.round(p * 10) / 10).toLocaleString('en-GB')}%`;
export const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, k) => (k in values ? String(values[k]) : `{${k}}`));
export const plural = (n, [one, many]) => (n === 1 ? one : many);

// Copy with links: [words](href), and the site's own inline markup (italics) inside the rest.
export const Linked = ({ text }) => {
  const parts = String(text).split(/(\[[^\]]+\]\([^)\s]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (m) return <a key={i} className="vc-link" href={m[2]}>{m[1]}</a>;
        return part ? <Fragment key={i}><Rich text={part} /></Fragment> : null;
      })}
    </>
  );
};

// The class of evidence behind a figure, as a small labelled badge.
export const Badge = ({ cls, children }) => <span className={cn('calc-badge', `is-${cls}`)}>{children || C.basis[cls]}</span>;

export const BasisKey = () => (
  <ul className="calc-key" aria-label={C.keyLabel}>
    {['pub', 'ven', 'asm', 'own'].map((cls) => (
      <li key={cls}>
        <Badge cls={cls} /> {C.basisMeaning[cls]}
      </li>
    ))}
  </ul>
);

// A number field that lets the visitor type freely (an empty or half-typed field counts as 0
// until it is finished) and shows the model's value again once focus leaves it.
const show = (v) => (Number.isInteger(v) ? String(v) : String(Math.round(v * 100) / 100));
const parse = (v) => {
  const n = parseFloat(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
};
export const NumberInput = ({ value, onValue, className, max, ...rest }) => {
  const [draft, setDraft] = useState(null);
  return (
    <input
      type="number"
      inputMode="decimal"
      min="0"
      max={max}
      className={cn('calc-num', className)}
      value={draft ?? show(value)}
      onFocus={() => setDraft(show(value))}
      onBlur={() => setDraft(null)}
      onChange={(e) => {
        setDraft(e.target.value);
        const n = parse(e.target.value);
        onValue(max !== undefined ? Math.min(Number(max), n) : n);
      }}
      {...rest}
    />
  );
};

// A pound rate: an editable field, or a derived figure shown in a dashed box.
export const RateInput = ({ value, onValue, label, disabled }) => (
  <div className={cn('calc-rate', disabled && 'is-derived')}>
    <span aria-hidden="true">£</span>
    <NumberInput value={value} onValue={onValue} step="0.01" aria-label={label} disabled={disabled} />
  </div>
);

// A slider with its value beside the label.
export const Slider = ({ id, label, hint, value, output, min, max, step = 1, onValue }) => (
  <div className="calc-field">
    <div className="calc-field-head">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{output}</output>
    </div>
    <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onValue(Number(e.target.value))} />
    {hint && <p className="calc-hint">{hint}</p>}
  </div>
);

// The starting points: a radio group set out as buttons.
export const StartingPoints = ({ name, legend, options, value, onChoose }) => (
  <fieldset className="calc-seg">
    <legend className="sr-only">{legend}</legend>
    {options.map(([key, label]) => (
      <label key={key}>
        <input type="radio" name={name} value={key} checked={value === key} onChange={() => onChoose(key)} />
        <span>{label}</span>
      </label>
    ))}
  </fieldset>
);

// A horizontal bar split by class, with its key.
const METER_ORDER = ['pub', 'ven', 'asm', 'own'];
export const BasisMeter = ({ parts, total, label }) => {
  const shown = total > 0 ? METER_ORDER.filter((k) => (parts[k] || 0) > 0.0001 * total) : [];
  const text = shown.length ? `${label}: ${shown.map((k) => `${C.basis[k]} ${pct((100 * parts[k]) / total)}`).join(', ')}` : C.nothingToShow;
  return (
    <>
      <div className="calc-meter" role="img" aria-label={text}>
        {shown.map((k) => <span key={k} className={`is-${k}`} style={{ width: `${((100 * parts[k]) / total).toFixed(2)}%` }} />)}
      </div>
      <ul className="calc-mkey" aria-hidden="true">
        {shown.length ? shown.map((k) => (
          <li key={k}><span className={cn('calc-sw', `is-${k}`)} />{C.basis[k]}: {pct((100 * parts[k]) / total)}</li>
        )) : <li>{C.nothingToShow}</li>}
      </ul>
    </>
  );
};

// A bar split by activity.
export const ActivityMeter = ({ values, total, label }) => {
  const shown = total > 0 ? Object.keys(C.activities).filter((a) => (values[a] || 0) > 0.0001 * total) : [];
  return (
    <>
      <div className="calc-meter" role="img" aria-label={shown.length ? `${label}: ${shown.map((a) => `${C.activities[a].name} ${gbp(values[a])}`).join(', ')}` : C.nothingToShow}>
        {shown.map((a) => <span key={a} className={`act-${a}`} style={{ width: `${((100 * values[a]) / total).toFixed(2)}%` }} />)}
      </div>
      <ul className="calc-mkey" aria-hidden="true">
        {Object.keys(C.activities).map((a) => (
          <li key={a}><span className={cn('calc-sw', `act-${a}`)} />{C.activities[a].name} {gbp(values[a] || 0)}</li>
        ))}
      </ul>
    </>
  );
};

// The timesheet: one square a day, or a block of days; five to a row.
export const Timesheet = ({ sheet, hoursPerDay, idPrefix }) => {
  const rows = [];
  for (let i = 0; i < sheet.squares.length; i += 5) rows.push(sheet.squares.slice(i, i + 5));
  const day = wk(hoursPerDay).replace(/\.0$/, '');
  const caption = sheet.unit === 1 ? fill(C.sheet.one, { day }) : fill(C.sheet.many, { n: sheet.unit, day });
  const label = fill(C.sheet.label, { days: Math.round(sheet.totalDays).toLocaleString('en-GB'), freed: Math.round(sheet.freedDays).toLocaleString('en-GB') });
  const present = Object.keys(C.activities).filter((a) => sheet.squares.some((s) => s.a === a));
  return (
    <section className="calc-block" aria-labelledby={`${idPrefix}-sheet-title`}>
      <h2 id={`${idPrefix}-sheet-title`}>{C.sheet.title}</h2>
      <p className="calc-sheet-caption">
        <span>{caption}</span>
        <span>{fill(C.sheet.total, { days: Math.round(sheet.totalDays).toLocaleString('en-GB') })}</span>
      </p>
      <div className="calc-days" role="img" aria-label={label}>
        {rows.map((row, i) => (
          <span key={i} className="calc-week">
            {row.map((s, j) => <span key={j} className={cn('calc-day', `act-${s.a}`, s.freed && 'is-freed')} />)}
          </span>
        ))}
      </div>
      <ul className="calc-mkey mt-3" aria-hidden="true">
        {present.map((a) => <li key={a}><span className={cn('calc-sw', `act-${a}`)} />{C.activities[a].short}</li>)}
        <li><span className="calc-sw is-hatch" />{C.sheet.freed}</li>
      </ul>
    </section>
  );
};

// A short summary for screen readers, announced once the visitor pauses.
export const LiveSummary = ({ text }) => {
  const [said, setSaid] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setSaid(text), 800);
    return () => clearTimeout(t);
  }, [text]);
  return <p className="sr-only" aria-live="polite">{said}</p>;
};

// The bar fixed to the foot of a narrow screen: the headline, and a way to the breakdown.
export const MobileBar = ({ label, value, targetId }) => (
  <div className="calc-mbar" aria-hidden="true">
    <p><span>{label}</span> <strong>{value}</strong></p>
    <button type="button" tabIndex={-1} onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
      {C.seeBreakdown}
    </button>
  </div>
);

// A table that may scroll sideways on a narrow screen: a named region that can take focus, so that
// it can be scrolled from the keyboard.
export const Scroll = ({ label, children }) => (
  <div className="calc-scroll" role="region" aria-label={fill(C.tableLabel, { title: label })} tabIndex={0}>
    {children}
  </div>
);

// The page's notes: how the estimate is built, and its sources.
export const CalcNotes = ({ method, sources, idPrefix }) => (
  <section className="calc-notes" aria-labelledby={`${idPrefix}-notes-title`}>
    <div>
      <h2 id={`${idPrefix}-notes-title`}>{method.title}</h2>
      <ol>{method.items.map((item) => <li key={item}><Linked text={item} /></li>)}</ol>
    </div>
    <div>
      <h2>{sources.title}</h2>
      <ol>{sources.items.map((item) => <li key={item}><Linked text={item} /></li>)}</ol>
    </div>
  </section>
);

// The low, central and high reductions, each with what its central figure rests on.
export const ReductionsTable = ({ state, R, dispatch, basisOf, perMeeting }) => (
  <div className="calc-scroll" role="region" aria-label={C.reductionColumns.join(', ')} tabIndex={0}>
    <table className="calc-table calc-reductions">
      <thead><tr>{C.reductionColumns.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
      <tbody>
        {ACTIVITIES.map((a) => {
          const name = C.activities[a].name;
          const key = basisOf(a);
          const b = C.reductionBasis[key];
          const locked = state.pubOnly && ['read', 'bund', 'meet'].includes(a);
          return (
            <tr key={a}>
              <td>{name}</td>
              {['lo', 'c', 'hi'].map((k) => (
                <td key={k}>
                  {k === 'c' && a === 'meet' && perMeeting ? (
                    <span className="calc-hint">{perMeeting}</span>
                  ) : (
                    <NumberInput
                      value={k === 'c' ? R[a].c : state.red[a][k]}
                      max={100}
                      step="0.1"
                      disabled={k === 'c' && locked}
                      aria-label={`${name}, ${C.caseNames[k]} case, per cent`}
                      onValue={(v) => dispatch({ type: 'red', act: a, k, value: v })}
                    />
                  )}
                </td>
              ))}
              <td className="calc-basis">
                {b.cls && <><Badge cls={b.cls} /><br /></>}
                {fill(b.text, { range: C.ranges[a] || '' })}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
