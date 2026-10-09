import { TriangleAlert } from 'lucide-react';
import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { FailRecover } from '@/components/editorial/FailRecover';
import { Gated } from '@/components/editorial/Gated';
import { NextLink } from '@/components/editorial/NextLink';
import { Rich } from '@/components/editorial/Rich';
import { NoticeRuler } from '@/components/mock/NoticeRuler';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { CLOCK } from '@/content/home';
import { cn } from '@/lib/utils';
import '@/components/clock/clock.css';

const { matter, ruler, schedule, next } = CLOCK;

// The time-bar marker: signal colour, always with a word and an icon.
const TimeBar = () => (
  <span className="clk-timebar">
    <TriangleAlert className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
    {schedule.timeBarLabel}
  </span>
);

// The file cover for the sample matter: parties, contract, the Change and the point in issue.
const MatterCard = () => (
  <Gated id={matter.gate} block>
    <article className="clk-cover on-paper relative rounded-sm border-2 border-[#E3B266]/40 bg-[#FAF8F5] px-6 pb-7 pt-7 shadow-2xl sm:px-9 sm:pb-9 sm:pt-8">
      {/* Precision corner crop brackets */}
      <div className="pointer-events-none absolute -left-1 -top-1 font-mono text-[0.75rem] font-bold text-[#E3B266]">⌜</div>
      <div className="pointer-events-none absolute -right-1 -top-1 font-mono text-[0.75rem] font-bold text-[#E3B266]">⌝</div>
      <div className="pointer-events-none absolute -bottom-1 -left-1 font-mono text-[0.75rem] font-bold text-[#E3B266]">⌞</div>
      <div className="pointer-events-none absolute -bottom-1 -right-1 font-mono text-[0.75rem] font-bold text-[#E3B266]">⌟</div>

      {/* Docket filing bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3.5">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-2 w-2 rounded-full bg-[#E3B266]" aria-hidden="true" />
          <p className="font-mono text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-navy">
            {matter.label}
          </p>
        </div>
        <p className="font-mono text-[0.6875rem] tracking-wider text-graphite">
          DOCKET: VC-2025-081 · REF: JCT-DB16
        </p>
      </div>

      <div className="mt-5 grid gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div>
          <h3 className="text-h3 font-medium text-navy">{matter.title}</h3>
          <p className="mt-4 text-body text-ink">
            <Rich text={matter.body} />
          </p>
        </div>
        <div className="border-t border-brass-400/80 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-label font-semibold uppercase text-brass-700">{matter.issueLabel}</span>
            <span className="inline-block rounded bg-[#E3B266]/15 px-1.5 py-0.5 font-mono text-[0.6875rem] font-medium text-brass-800">
              Condition Precedent
            </span>
          </div>
          <p className="mt-3 font-display text-[1.25rem] leading-[1.5] text-navy">{matter.issue}</p>
        </div>
      </div>
      <p className="mt-7 border-t border-rule pt-4 text-caption text-graphite">{matter.foot}</p>
    </article>
  </Gated>
);

// Schedule 1 on ink: styled for the unified dark green Chapter I.
const Schedule = () => {
  const [ref, inView] = useInViewOnce({ threshold: 0.2 });
  const [hPeriod, hProvision, hSummary] = schedule.heads;
  return (
    <Gated id={schedule.gate} block>
      <div ref={ref} className={cn('clk-rows', inView && 'is-in')}>
        <table className="hidden w-full border-collapse text-left md:table">
          <caption className="mb-6 text-left font-display text-h3 font-medium text-white">{schedule.title}</caption>
          <thead>
            <tr className="border-b border-[#E3B266]/40">
              <th scope="col" className="w-[17%] pb-3 pr-6 font-mono text-label font-medium uppercase text-brass-400">{hPeriod}</th>
              <th scope="col" className="w-[23%] pb-3 pr-6 font-mono text-label font-medium uppercase text-brass-400">{hProvision}</th>
              <th scope="col" className="pb-3 font-mono text-label font-medium uppercase text-brass-400">{hSummary}</th>
            </tr>
          </thead>
          <tbody>
            {schedule.rows.map((row, i) => (
              <tr key={row.provision} className="relative align-top">
                <th scope="row" className="relative py-5 pr-6 font-display text-[1.375rem] font-medium leading-tight text-white">
                  <span className="clk-row-rule absolute inset-x-0 top-0 h-px bg-[#E3B266]/30" style={{ transitionDelay: `${i * 60}ms` }} aria-hidden="true" />
                  {row.period}
                </th>
                <td className="relative py-5 pr-6">
                  <span className="clk-row-rule absolute inset-x-0 top-0 h-px bg-[#E3B266]/30" style={{ transitionDelay: `${i * 60}ms` }} aria-hidden="true" />
                  <span className="font-mono text-[0.8125rem] text-brass-400">{row.provision}</span>
                  {row.timeBar && (
                    <span className="mt-2 block">
                      <TimeBar />
                    </span>
                  )}
                </td>
                <td className="relative py-5 text-small text-[#E9E6DF]">
                  <span className="clk-row-rule absolute inset-x-0 top-0 h-px bg-[#E3B266]/30" style={{ transitionDelay: `${i * 60}ms` }} aria-hidden="true" />
                  <Rich text={row.summary} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="md:hidden">
          <h3 className="font-display text-h3 font-medium text-white">{schedule.title}</h3>
          <div className="mt-5 space-y-3">
            {schedule.rows.map((row) => (
              <dl key={row.provision} className="border-t border-[#E3B266]/30 pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <dt className="sr-only">{hPeriod}</dt>
                  <dd className="font-display text-[1.375rem] font-medium leading-tight text-white">{row.period}</dd>
                  {row.timeBar && (
                    <dd>
                      <TimeBar />
                    </dd>
                  )}
                </div>
                <dt className="sr-only">{hProvision}</dt>
                <dd className="mt-1 font-mono text-[0.8125rem] text-brass-400">{row.provision}</dd>
                <dt className="sr-only">{hSummary}</dt>
                <dd className="mt-2 pb-2 text-small text-[#E9E6DF]">
                  <Rich text={row.summary} />
                </dd>
              </dl>
            ))}
          </div>
        </div>
        <p className="mt-6 max-w-measure text-caption text-brass-400/80">{schedule.foot}</p>
      </div>
    </Gated>
  );
};

// Chapter I: the sample matter, the notice crux, the time limits and the sourced context.
// Rendered as a single cohesive dark forest green block with architectural hairlines and brass accents.
export const TheClock = () => (
  <section id="clock" aria-labelledby="clock-title" className="relative overflow-hidden bg-[#0F192F] text-[#FCFAF6] on-ink py-16 md:py-24 lg:py-32 border-y border-[#26324D]">
    <div className="vc-rain" aria-hidden="true" />
    <div className="container relative">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-label font-medium uppercase tracking-[0.14em] text-brass-400">
            PROJECT TIME · 2024 / 2025
          </span>
        </div>
        <span className="double-rule is-brass hidden flex-1 sm:block" aria-hidden="true" />
        <span className="font-mono text-[0.6875rem] tracking-wider text-brass-400/80">
          DOCKET NO. 001-A · EW-LON
        </span>
      </div>

      <ChapterHeader id="clock" numeral={CLOCK.numeral} title={CLOCK.h2} lead={CLOCK.lead} onInk={true} />

      <div className="mt-12 grid grid-cols-12 gap-x-6">
        <FailRecover fail={CLOCK.fail} recover={CLOCK.recover} onInk={true} className="col-span-12 lg:col-span-9 lg:col-start-3 xl:col-span-8 xl:col-start-3" />
      </div>

      {/* Docket Card 1: The Sample Matter */}
      <div className="mt-16 grid grid-cols-12 gap-x-6 md:mt-20">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3">
          <MatterCard />
        </div>
      </div>

      {/* Docket Card 2: The Notice Ruler (Figure 2) */}
      <div className="mt-10 grid grid-cols-12 gap-x-6 md:mt-14">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3">
          <article className="clk-cover on-paper relative rounded-sm border-2 border-[#E3B266]/40 bg-[#FAF8F5] px-6 pb-7 pt-7 shadow-2xl sm:px-9 sm:pb-9 sm:pt-8">
            {/* Precision corner crop brackets */}
            <div className="pointer-events-none absolute -left-1 -top-1 font-mono text-[0.75rem] font-bold text-[#E3B266]">⌜</div>
            <div className="pointer-events-none absolute -right-1 -top-1 font-mono text-[0.75rem] font-bold text-[#E3B266]">⌝</div>
            <div className="pointer-events-none absolute -bottom-1 -left-1 font-mono text-[0.75rem] font-bold text-[#E3B266]">⌞</div>
            <div className="pointer-events-none absolute -bottom-1 -right-1 font-mono text-[0.75rem] font-bold text-[#E3B266]">⌟</div>

            {/* Docket filing bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="inline-block h-2 w-2 rounded-full bg-[#E3B266]" aria-hidden="true" />
                <p className="font-mono text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-navy">
                  FIGURE 2 · THE NOTICE RULER
                </p>
              </div>
              <p className="font-mono text-[0.6875rem] tracking-wider text-graphite">
                35-DAY DISPUTE AXIS · MARCH TO APRIL 2025
              </p>
            </div>

            <h3 className="mt-6 font-display text-h3 font-medium text-navy">{ruler.title}</h3>
            <div className="mt-8">
              <Gated id={matter.gate} block>
                <NoticeRuler />
              </Gated>
            </div>
            <p className="mt-6 max-w-measure font-display text-[1.1875rem] italic leading-snug text-ink">{ruler.line}</p>
            <p className="mt-5 border-t border-rule pt-4 text-caption text-graphite">{ruler.caption}</p>
          </article>
        </div>
      </div>

      {/* Statutory Limits Schedule */}
      <div className="mt-16 grid grid-cols-12 gap-x-6 md:mt-20">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3">
          <Schedule />
          <NextLink href={next.href} label={next.label} className="mt-14 !text-[#E3B266] hover:!text-white" />
        </div>
      </div>
    </div>
  </section>
);
