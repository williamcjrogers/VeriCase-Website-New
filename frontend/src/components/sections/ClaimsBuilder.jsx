import { lazy } from 'react';
import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { FailRecover } from '@/components/editorial/FailRecover';
import { Figure } from '@/components/editorial/Figure';
import { Gated, isShown } from '@/components/editorial/Gated';
import { LazyMount } from '@/components/editorial/LazyMount';
import { FrameSkeleton } from '@/components/workbench/FrameSkeleton';
import { DISCUSSION_ID } from '@/components/claims/ids';
import { CLAIMS as C } from '@/content/home';
import { DISCUSSION } from '@/content/matter/discussion';

// Both figures load from one chunk, only as they come near the viewport.
const ClaimsBuilderMock = lazy(() => import(/* webpackChunkName: "claims" */ '@/components/mock/ClaimsBuilderMock').then((m) => ({ default: m.ClaimsBuilderMock })));
const DiscussionMock = lazy(() => import(/* webpackChunkName: "claims" */ '@/components/mock/DiscussionMock').then((m) => ({ default: m.DiscussionMock })));

// Heights per breakpoint. The builder's is fixed. The discussion's wraps with the width, so its
// height is reserved only while the skeleton shows (at the size it takes on a 390 px phone and
// the narrowest width of each larger breakpoint), and then it takes its own height.
const BUILDER_HEIGHT = 'h-[800px] md:h-[608px] lg:h-[660px]';
const DISCUSSION_HEIGHT = 'has-[>[data-skeleton]]:min-h-[927px] sm:has-[>[data-skeleton]]:min-h-[677px] md:has-[>[data-skeleton]]:min-h-[518px] lg:has-[>[data-skeleton]]:min-h-[387px]';
// Labels the builder takes from the copy deck (passed in, so its chunk does not import it).
const LABELS = { tree: C.items[0].title, tabs: 'Claims builder' };

// The five capabilities as a two-column schedule: the name, then what it does.
const Schedule = () => (
  <dl className="border-t border-rule">
    {C.items
      .filter((item) => isShown(item.gate))
      .map((item) => (
        <div key={item.title} className="grid gap-x-8 gap-y-1.5 border-b border-rule py-5 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
          <dt className="font-display text-[1.3125rem] font-medium leading-snug text-navy">{item.title}</dt>
          <dd className="max-w-measure text-body text-ink">{item.gate ? <Gated id={item.gate}>{item.text}</Gated> : item.text}</dd>
        </div>
      ))}
  </dl>
);

// Chapter IV: Heads of Claim, a narrative cited as it is written, the evidence finder (Fig. 5),
// and a discussion anchored to the document it concerns (Fig. 6). The discussion's frame is
// here from the first paint, so "Go to Discussion" in Chapter II always has somewhere to go.
export const ClaimsBuilder = () => (
  <section id="claims" aria-labelledby="claims-title" className="bg-parchment py-16 md:py-24 lg:py-32">
    <div className="container">
      <ChapterHeader id="claims" numeral={C.numeral} title={C.h2} lead={C.lead} />

      <div className="mt-12 grid grid-cols-12 gap-x-6">
        <FailRecover fail={C.fail} recover={C.recover} className="col-span-12 lg:col-span-9 lg:col-start-3 xl:col-span-8 xl:col-start-3" />
      </div>

      <div className="mt-14 grid grid-cols-12 gap-x-6 lg:mt-16">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3 xl:col-span-9 xl:col-start-3">
          <Schedule />
        </div>
      </div>

      <div className="mt-16 grid grid-cols-12 gap-x-6 lg:mt-20">
        <div className="col-span-12 xl:col-span-10 xl:col-start-3">
          <Figure summary={C.fig.summary} caption={C.fig.caption}>
            <LazyMount className={BUILDER_HEIGHT} skeleton={<FrameSkeleton />}>
              <ClaimsBuilderMock labels={LABELS} />
            </LazyMount>
          </Figure>
          <Figure summary={C.discussionFig.summary} caption={C.discussionFig.caption} className="mt-12 lg:mt-16">
            <div id={DISCUSSION_ID} role="group" aria-label={DISCUSSION.heading} className="outline-none">
              <LazyMount className={DISCUSSION_HEIGHT} skeleton={<FrameSkeleton />}>
                <DiscussionMock />
              </LazyMount>
            </div>
          </Figure>
        </div>
      </div>
    </div>
  </section>
);
