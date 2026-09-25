import { ArrowDown, TriangleAlert } from 'lucide-react';
import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { FailRecover } from '@/components/editorial/FailRecover';
import { Figure } from '@/components/editorial/Figure';
import { Gated } from '@/components/editorial/Gated';
import { NoteRef } from '@/components/editorial/NoteRef';
import { Plate } from '@/components/editorial/Plate';
import { Rich } from '@/components/editorial/Rich';
import { NoticeRuler } from '@/components/mock/NoticeRuler';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { CLOCK } from '@/content/home';
import { MEDIA } from '@/content/media';
import { STATS } from '@/content/stats';
import { onSectionClick } from '@/lib/navigate';
import { cn } from '@/lib/utils';
import '@/components/clock/clock.css';

const { matter, ruler, schedule, context, plate, next } = CLOCK;

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
    <article className="clk-cover border border-rule-strong/60 bg-paper px-6 pb-7 pt-8 shadow-paper sm:px-9 sm:pb-9 sm:pt-10">
      <p className="eyebrow">{matter.label}</p>
      <div className="mt-4 grid gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div>
          <h3 className="text-h3 font-medium text-navy">{matter.title}</h3>
          <p className="mt-4 text-body text-ink">
            <Rich text={matter.body} />
          </p>
        </div>
        <div className="border-t border-brass-400 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="font-mono text-label font-medium uppercase text-brass-700">{matter.issueLabel}</p>
          <p className="mt-3 font-display text-[1.25rem] leading-[1.5] text-navy">{matter.issue}</p>
        </div>
      </div>
      <p className="mt-7 border-t border-rule pt-4 text-caption text-graphite">{matter.foot}</p>
    </article>
  </Gated>
);

// Schedule 1 as a real table from 768 px, and as stacked cards below.
const Schedule = () => {
  const [ref, inView] = useInViewOnce({ threshold: 0.2 });
  const [hPeriod, hProvision, hSummary] = schedule.heads;
  return (
    <Gated id={schedule.gate} block>
      <div ref={ref} className={cn('clk-rows', inView && 'is-in')}>
        <table className="hidden w-full border-collapse text-left md:table">
          <caption className="mb-6 text-left font-display text-h3 font-medium text-navy">{schedule.title}</caption>
          <thead>
            <tr className="border-b border-navy">
              <th scope="col" className="w-[17%] pb-3 pr-6 font-mono text-label font-medium uppercase text-graphite">{hPeriod}</th>
              <th scope="col" className="w-[23%] pb-3 pr-6 font-mono text-label font-medium uppercase text-graphite">{hProvision}</th>
              <th scope="col" className="pb-3 font-mono text-label font-medium uppercase text-graphite">{hSummary}</th>
            </tr>
          </thead>
          <tbody>
            {schedule.rows.map((row, i) => (
              <tr key={row.provision} className="relative align-top">
                <th scope="row" className="relative py-5 pr-6 font-display text-[1.375rem] font-medium leading-tight text-navy">
                  <span className="clk-row-rule absolute inset-x-0 top-0 h-px bg-rule-strong/50" style={{ transitionDelay: `${i * 60}ms` }} aria-hidden="true" />
                  {row.period}
                </th>
                <td className="relative py-5 pr-6">
                  <span className="clk-row-rule absolute inset-x-0 top-0 h-px bg-rule-strong/50" style={{ transitionDelay: `${i * 60}ms` }} aria-hidden="true" />
                  <span className="font-mono text-[0.8125rem] text-ink">{row.provision}</span>
                  {row.timeBar && (
                    <span className="mt-2 block">
                      <TimeBar />
                    </span>
                  )}
                </td>
                <td className="relative py-5 text-small text-ink">
                  <span className="clk-row-rule absolute inset-x-0 top-0 h-px bg-rule-strong/50" style={{ transitionDelay: `${i * 60}ms` }} aria-hidden="true" />
                  <Rich text={row.summary} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="md:hidden">
          <h3 className="font-display text-h3 font-medium text-navy">{schedule.title}</h3>
          <div className="mt-5 space-y-3">
            {schedule.rows.map((row) => (
              <dl key={row.provision} className="border-t border-rule-strong/50 pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <dt className="sr-only">{hPeriod}</dt>
                  <dd className="font-display text-[1.375rem] font-medium leading-tight text-navy">{row.period}</dd>
                  {row.timeBar && (
                    <dd>
                      <TimeBar />
                    </dd>
                  )}
                </div>
                <dt className="sr-only">{hProvision}</dt>
                <dd className="mt-1 font-mono text-[0.8125rem] text-ink">{row.provision}</dd>
                <dt className="sr-only">{hSummary}</dt>
                <dd className="mt-2 pb-2 text-small text-ink">
                  <Rich text={row.summary} />
                </dd>
              </dl>
            ))}
          </div>
        </div>
        <p className="mt-6 max-w-measure text-caption text-graphite">{schedule.foot}</p>
      </div>
    </Gated>
  );
};

// Chapter I: the sample matter, the notice crux, the time limits and the sourced context.
export const TheClock = () => (
  <section id="clock" aria-labelledby="clock-title" className="bg-parchment">
    <Plate
      src={MEDIA.residentialFrame.src}
      mobileSrc={MEDIA.residentialFrame.mobileSrc}
      lqip={MEDIA.residentialFrame.lqip}
      ratio={MEDIA.residentialFrame.ratio}
      ratioMobile={MEDIA.residentialFrame.ratioMobile}
      widths={[960, 1440, 1920]}
      sizes="100vw"
      alt={plate.alt}
      caption={plate.caption}
      captionClassName="container mt-3"
    />

    <div className="container pb-16 pt-16 md:pb-24 md:pt-24 lg:pt-28">
      <ChapterHeader id="clock" numeral={CLOCK.numeral} eyebrow={CLOCK.eyebrow} title={CLOCK.h2} lead={CLOCK.lead} />

      <div className="mt-12 grid grid-cols-12 gap-x-6">
        <FailRecover fail={CLOCK.fail} recover={CLOCK.recover} className="col-span-12 lg:col-span-9 lg:col-start-3 xl:col-span-8 xl:col-start-3" />
      </div>

      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-20">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3">
          <MatterCard />
        </div>
        <div className="col-span-12 lg:col-span-10 lg:col-start-3">
          <Figure caption={ruler.caption} className="border-y border-rule-strong/40 py-8">
            <h3 className="font-display text-h3 font-medium text-navy">{ruler.title}</h3>
            <div className="mt-8">
              <Gated id={matter.gate} block>
                <NoticeRuler />
              </Gated>
            </div>
            <p className="mt-6 max-w-measure font-display text-[1.1875rem] italic leading-snug text-ink">{ruler.line}</p>
          </Figure>
        </div>
      </div>
    </div>

    <div className="bg-parchment-300 py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <Schedule />
          </div>
        </div>
      </div>
    </div>

    <div className="container py-16 md:py-24">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3">
          <h3 className="eyebrow">{context.heading}</h3>
          <Gated id="G3_stats" block>
            <ul className="mt-6 grid gap-8 md:grid-cols-3 md:gap-6">
              {context.keys.map((key) => {
                const s = STATS[key];
                return (
                  <li key={key} className="border-t border-navy pt-5">
                    <p className="font-display text-stat font-medium text-navy">{s.figure}</p>
                    <p className="mt-3 text-small text-ink">
                      <Rich text={s.label} />
                      <NoteRef n={s.noteNumber} />
                    </p>
                  </li>
                );
              })}
            </ul>
          </Gated>
          <a
            href={next.href}
            onClick={onSectionClick(next.href.slice(1))}
            className="mt-14 inline-flex min-h-[44px] items-center gap-2 font-mono text-meta font-medium uppercase tracking-[0.06em] text-azure-700 hover:text-navy"
          >
            <ArrowDown className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {next.label}
          </a>
        </div>
      </div>
    </div>
  </section>
);
