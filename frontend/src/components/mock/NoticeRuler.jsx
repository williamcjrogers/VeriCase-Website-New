import { Fragment } from 'react';
import { useSourceSheet } from '@/components/mock/SourceSheet';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { CLOCK } from '@/content/home';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

const { ruler } = CLOCK;
const START = Date.UTC(2025, 2, 1); // 01 March 2025, the first tick
const DAYS = 35; // 01 March to 04 April 2025
const PAD = 3; // per cent of the axis kept clear at each end
const EVIDENCE = ruler.pins.map((p) => p.ev);

const dayIndex = (iso) => Math.round((Date.parse(`${iso}T00:00:00Z`) - START) / 86400000);
const xOf = (i) => PAD + (i / (DAYS - 1)) * (100 - 2 * PAD);
const MONDAYS = Array.from({ length: DAYS }, (_, i) => i).filter((i) => new Date(START + i * 86400000).getUTCDay() === 1);
const dayMonth = (i) => formatDate(new Date(START + i * 86400000).toISOString().slice(0, 10)).replace(/\s\d{4}$/, '');
// Keeps a clause reference on one line when a label wraps ("clause 2.24").
const keepRefs = (s) => s.replace(/(clause|cl|s) (\d)/g, '$1\u00a0$2');

// Day ticks, longer on Mondays. Decorative: the pins carry the information.
const Ticks = () => (
  <svg className="clk-ticks" viewBox="0 0 1000 16" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    {Array.from({ length: DAYS }, (_, i) => {
      const x = xOf(i) * 10;
      const monday = MONDAYS.includes(i);
      return <line key={i} x1={x} x2={x} y1={monday ? 1 : 5} y2={monday ? 15 : 11} stroke={monday ? 'var(--vc-navy)' : 'var(--vc-rule-strong)'} strokeWidth="1" vectorEffect="non-scaling-stroke" />;
    })}
  </svg>
);

const Brackets = ({ mini }) =>
  ruler.brackets.map((b) => {
    const from = xOf(dayIndex(b.from));
    const to = xOf(dayIndex(b.to));
    const dashed = b.style === 'dashed';
    const top = mini ? (dashed ? 58 : 40) : dashed ? 44 : 18;
    const labelStyle = dashed
      ? { top: top - 12, left: mini ? undefined : `calc(${to}% + 10px)`, right: mini ? `calc(${100 - from}% + 8px)` : undefined }
      : { top: top - 20, left: `${(from + to) / 2}%`, transform: 'translateX(-50%)' };
    return (
      <Fragment key={b.label}>
        <span className={cn('clk-bracket', dashed && 'is-dashed')} style={{ top, left: `${from}%`, width: `${to - from}%` }} aria-hidden="true" />
        <span className="clk-bracket-label clk-fade" style={labelStyle} aria-hidden="true">
          {b.label}
        </span>
      </Fragment>
    );
  });

// Fig. 2: the four dated events of the sample matter on a 35-day axis, with the two periods
// that matter to the notice. Each event opens its source. Dates only; no analysis of delay.
export const NoticeRuler = () => {
  const sheet = useSourceSheet();
  const [ref, inView] = useInViewOnce({ threshold: 0.35 });
  const open = (ev) => (e) => sheet.open(ev, EVIDENCE, e.currentTarget);

  return (
    <div ref={ref} className={cn('clk-draw', inView && 'is-in')}>
      {/* 768 px and above: the labelled ruler. */}
      <div className="clk-ruler hidden md:block">
        <p className="clk-axis-title">{ruler.axisTitle}</p>
        <div className="clk-axis" aria-hidden="true" />
        <Ticks />
        {MONDAYS.map((i) => (
          <span key={i} className="clk-monday" style={{ left: `${xOf(i)}%` }} aria-hidden="true">
            {dayMonth(i)}
          </span>
        ))}
        <Brackets />
        <ol aria-label={ruler.title}>
          {ruler.pins.map((p, k) => {
            const x = xOf(dayIndex(p.date));
            const above = k % 2 === 0;
            const right = k >= 2;
            return (
              <li key={p.ev} className="clk-fade">
                <span className="clk-dot" style={{ left: `${x}%` }} aria-hidden="true" />
                <span className={cn('clk-stem', above ? 'is-above' : 'is-below')} style={{ left: `${x}%` }} aria-hidden="true" />
                <button
                  type="button"
                  onClick={open(p.ev)}
                  className={cn('clk-pin', above ? 'is-above' : 'is-below', right && 'is-right')}
                  style={{ left: right ? `calc(${x}% + 0.45rem)` : `calc(${x}% - 0.45rem)` }}
                >
                  <span className="block font-mono text-[0.6875rem] leading-4 text-graphite">{formatDate(p.date)}</span>
                  <span className="block text-[0.875rem] font-medium leading-5 text-navy">{keepRefs(p.label)}</span>
                  <span className="block font-mono text-[0.75rem] leading-4 text-azure-700 underline decoration-azure-700/40 underline-offset-2">{p.ev}</span>
                  {p.flag && <span className="mt-0.5 block font-display text-[0.875rem] italic leading-5 text-ink">{p.flag}</span>}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Below 768 px: numbered markers on a compact axis, and the events listed beneath. */}
      <div className="md:hidden">
        <div className="clk-mini">
          <p className="clk-axis-title">{ruler.axisTitle}</p>
          <div className="clk-axis" aria-hidden="true" />
          <Ticks />
          {MONDAYS.map((i) => (
            <span key={i} className="clk-monday" style={{ left: `${xOf(i)}%` }} aria-hidden="true">
              {dayMonth(i)}
            </span>
          ))}
          <Brackets mini />
          {ruler.pins.map((p, k) => (
            <span key={p.ev} className="clk-num" style={{ left: `${xOf(dayIndex(p.date))}%` }} aria-hidden="true">
              {k + 1}
            </span>
          ))}
        </div>
        <ol aria-label={ruler.title} className="mt-4 divide-y divide-rule border-y border-rule">
          {ruler.pins.map((p, k) => (
            <li key={p.ev}>
              <button type="button" onClick={open(p.ev)} className="grid w-full grid-cols-[1.75rem_1fr] gap-x-2 py-3 text-left hover:bg-azure-50">
                <span className="mt-0.5 grid h-[17px] w-[17px] place-items-center rounded-full bg-navy font-mono text-[0.625rem] font-medium text-white" aria-hidden="true">
                  {k + 1}
                </span>
                <span>
                  <span className="block font-mono text-[0.75rem] text-graphite">{formatDate(p.date)}</span>
                  <span className="block text-[0.9375rem] font-medium text-navy">{keepRefs(p.label)}</span>
                  <span className="mt-0.5 block text-[0.8125rem]">
                    <span className="font-mono text-azure-700 underline decoration-azure-700/40 underline-offset-2">{p.ev}</span>
                    {p.flag && <span className="ml-2 font-display text-[0.9375rem] italic text-ink">{p.flag}</span>}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
