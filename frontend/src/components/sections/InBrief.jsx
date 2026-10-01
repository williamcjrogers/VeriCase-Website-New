import * as Accordion from '@radix-ui/react-accordion';
import { Minus, Plus } from 'lucide-react';
import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { Gated, isShown } from '@/components/editorial/Gated';
import { Rich } from '@/components/editorial/Rich';
import { IN_BRIEF } from '@/content/home';
import { onSectionClick } from '@/lib/navigate';

// One ledger line, ruled like a table of provisions: the chapter's numeral, the capability, what it
// covers, and a link to the chapter that shows it. Below 768 px the text and link sit under the title.
const LedgerEntry = ({ entry }) => (
  <li className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-rule-strong/45 py-5 md:grid-cols-[3rem_12rem_minmax(0,1fr)_auto] md:gap-x-6 md:py-6">
    <span className="font-display text-[1.75rem] italic leading-none text-brass-700" aria-hidden="true">
      {entry.numeral}
    </span>
    <h3 className="font-display text-[1.3125rem] font-medium leading-snug text-navy">{entry.title}</h3>
    <p className="col-start-2 mt-1.5 max-w-measure text-body text-ink md:col-start-3 md:mt-0">{entry.text}</p>
    <a
      href={entry.href}
      onClick={onSectionClick(entry.href.slice(1))}
      className="col-start-2 mt-2 inline-flex min-h-[24px] items-center self-start justify-self-start whitespace-nowrap font-mono text-[0.75rem] font-medium uppercase tracking-[0.06em] text-azure-700 underline-offset-4 hover:text-navy hover:underline md:col-start-4 md:mt-1"
    >
      Read Chapter {entry.numeral}
      <span className="sr-only">: {entry.title}</span>
    </a>
  </li>
);

// A question with its answer kept in the document when closed, so it is read and indexed.
const Question = ({ item, index }) => (
  <Accordion.Item value={`q${index}`} className="border-b border-rule-strong/45">
    <Accordion.Header asChild>
      <h4>
        <Accordion.Trigger className="group flex min-h-[56px] w-full items-center justify-between gap-6 py-3 text-left font-display text-[1.25rem] font-medium leading-snug text-navy hover:text-azure-700">
          {item.q}
          <Plus className="h-5 w-5 shrink-0 text-azure-700 group-data-[state=open]:hidden" strokeWidth={1.5} aria-hidden="true" />
          <Minus className="hidden h-5 w-5 shrink-0 text-azure-700 group-data-[state=open]:block" strokeWidth={1.5} aria-hidden="true" />
        </Accordion.Trigger>
      </h4>
    </Accordion.Header>
    <Accordion.Content forceMount className="overflow-hidden data-[state=closed]:hidden data-[state=open]:animate-accordion-down">
      <p className="max-w-measure pb-6 pr-10 text-body text-ink">
        <Rich text={item.a} />
      </p>
    </Accordion.Content>
  </Accordion.Item>
);

// In brief: the fast path. Six ledger lines, the benchmarks, the audience and five questions.
export const InBrief = () => {
  const questions = IN_BRIEF.questions.filter((q) => isShown(q.gate));
  return (
    <section id="platform" aria-labelledby="platform-title" className="bg-parchment-300 py-16 md:py-24 lg:py-32">
      <div className="container">
        <ChapterHeader id="platform" title={IN_BRIEF.h2} lead={IN_BRIEF.sub} />

        <div className="mt-12 grid grid-cols-12 gap-x-6">
          <ol className="col-span-12 border-t border-rule-strong/45 lg:col-span-10 lg:col-start-3">
            {IN_BRIEF.ledger.map((entry) => (
              <LedgerEntry key={entry.title} entry={entry} />
            ))}
          </ol>

          <div className="col-span-12 mt-12 grid gap-8 border-y border-rule-strong/45 py-8 lg:col-span-10 lg:col-start-3 lg:grid-cols-2 lg:gap-12">
            <Gated id={IN_BRIEF.benchmarks.gate} block>
              <p className="max-w-measure text-body text-ink">
                <Rich text={IN_BRIEF.benchmarks.text} />
              </p>
            </Gated>
            <div>
              <p className="eyebrow">{IN_BRIEF.audience.label}</p>
              <p className="mt-3 max-w-measure font-display text-[1.25rem] leading-[1.5] text-navy">{IN_BRIEF.audience.text}</p>
            </div>
          </div>

          <div className="col-span-12 mt-12 lg:col-span-8 lg:col-start-3">
            <h3 className="font-display text-[1.3125rem] font-medium leading-snug text-navy">{IN_BRIEF.questionsLabel}</h3>
            <Accordion.Root type="multiple" className="mt-3 border-t border-rule-strong/45">
              {questions.map((item, i) =>
                item.gate ? (
                  <Gated key={item.q} id={item.gate} block>
                    <Question item={item} index={i} />
                  </Gated>
                ) : (
                  <Question key={item.q} item={item} index={i} />
                )
              )}
            </Accordion.Root>
          </div>

          <DemoCTA placement="platform" section="platform" className="col-span-12 mt-12 lg:col-span-8 lg:col-start-3" />
        </div>
      </div>
    </section>
  );
};
