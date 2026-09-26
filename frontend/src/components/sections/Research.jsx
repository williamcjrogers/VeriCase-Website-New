import { lazy } from 'react';
import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { FailRecover } from '@/components/editorial/FailRecover';
import { Figure } from '@/components/editorial/Figure';
import { LazyMount } from '@/components/editorial/LazyMount';
import { CitedReport, QueryChip, TabbedBundle } from '@/components/icons';
import { CTA_MICROCOPY_SHORT, RESEARCH } from '@/content/home';

// The demonstration (Fig. 4) is its own chunk, fetched when it comes within 600 px of view.
const ResearchDemo = lazy(() => import(/* webpackChunkName: "research-demo" */ '@/components/research/ResearchDemo'));

const STEP_ICONS = [QueryChip, CitedReport, TabbedBundle];

// Ask, cite, bundle: the three steps as a ruled list, in a row from 768 px.
const Steps = () => (
  <ol role="list" className="col-span-12 grid gap-y-8 md:grid-cols-3 md:gap-x-8 lg:col-span-10 lg:col-start-3">
    {RESEARCH.steps.map((step, i) => {
      const Icon = STEP_ICONS[i];
      return (
        <li key={step.n} className="border-t border-rule-strong/40 pt-5">
          <Icon className="h-6 w-6 text-azure-700" />
          <h3 className="mt-4 flex items-baseline gap-2.5 font-display text-[1.3125rem] font-medium leading-snug text-navy">
            <span className="font-mono text-[0.875rem] font-medium text-brass-700">
              {step.n}
              <span className="sr-only">.</span>
            </span>{' '}
            {step.title}
          </h3>
          <p className="mt-2 max-w-[40ch] text-body text-ink">{step.text}</p>
        </li>
      );
    })}
  </ol>
);

// Holds the demonstration's place at its measured default height per breakpoint (phones get
// three steps of their own, since the report's text wraps most there), so little shifts when
// it arrives.
const DemoSkeleton = () => (
  <div
    aria-hidden="true"
    className="vc-skeleton h-[3150px] min-[360px]:h-[2870px] min-[390px]:h-[2700px] min-[430px]:h-[2300px] sm:h-[1880px] md:h-[1600px] lg:h-[1560px] xl:h-[1526px]"
  />
);

// Chapter III, the centrepiece: ask the sample matter a question, correct how it was understood,
// read the cited report, open each source and bundle what was cited. Then the call to action.
export const Research = () => (
  <section id="research" aria-labelledby="research-title" className="border-t border-rule bg-paper">
    <div className="container py-16 md:py-24 lg:py-32">
      <ChapterHeader id="research" numeral={RESEARCH.numeral} title={RESEARCH.h2} lead={RESEARCH.lead} />

      <div className="mt-12 grid grid-cols-12 gap-x-6">
        <FailRecover className="col-span-12 lg:col-span-9 lg:col-start-3 xl:col-span-8 xl:col-start-3" fail={RESEARCH.fail} recover={RESEARCH.recover} />
      </div>

      <div className="mt-14 grid grid-cols-12 gap-x-6 md:mt-16">
        <Steps />
      </div>

      <div className="mt-16 grid grid-cols-12 gap-x-6 md:mt-20">
        <Figure className="col-span-12 lg:col-span-10 lg:col-start-3" summary={RESEARCH.fig.summary} caption={RESEARCH.fig.caption}>
          <LazyMount skeleton={<DemoSkeleton />}>
            <ResearchDemo />
          </LazyMount>
        </Figure>
      </div>
    </div>

    <div className="border-t border-rule bg-parchment-300">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12 lg:col-span-10 lg:col-start-3">
            <p className="max-w-[30ch] font-display text-[1.5rem] leading-[1.3] text-navy md:text-[1.75rem]">{RESEARCH.cta.line}</p>
            <DemoCTA microcopy={CTA_MICROCOPY_SHORT} className="md:max-w-[21rem] md:shrink-0" />
          </div>
        </div>
      </div>
    </div>
  </section>
);
