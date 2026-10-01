import { captureMarketingEvent } from '@/lib/analytics';
import { lazy, useState } from 'react';
import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { FailRecover } from '@/components/editorial/FailRecover';
import { Figure } from '@/components/editorial/Figure';
import { Gated, isShown } from '@/components/editorial/Gated';
import { LazyMount } from '@/components/editorial/LazyMount';
import { NextLink } from '@/components/editorial/NextLink';
import { Plate } from '@/components/editorial/Plate';
import { FrameSkeleton } from '@/components/workbench/FrameSkeleton';
import { ChronologyLens as LensGlyph, EmailArchive, ExcludedProject, NearDuplicate, QuoteFold, Thread } from '@/components/icons';
import { CHAPTERS, LENS_CHAPTER as C } from '@/content/home';
import { MEDIA } from '@/content/media';
import { cn } from '@/lib/utils';

const ArchiveField = lazy(() => import(/* webpackChunkName: "plate-archive" */ '@/components/plates/ArchiveField').then((m) => ({ default: m.ArchiveField })));
const LensWorkbench = lazy(() => import(/* webpackChunkName: "workbench" */ '@/components/mock/LensWorkbench').then((m) => ({ default: m.LensWorkbench })));

// Create bundle in Fig. 3 points to the chapter where the bundle is made.
const research = CHAPTERS.find((ch) => ch.id === 'research');
const BUNDLE_LINK = { href: `#${research.id}`, label: `Chapter ${research.numeral}: ${research.title}` };

// One height per breakpoint for the workbench and its skeleton, so nothing moves when it loads.
// From 768 px the frame is fixed and the list scrolls inside it. Below 768 px the workbench takes
// its own height, which wraps with the width: each step is a least height, the tallest opening
// view in its range of widths (measured) plus 8 px, and the window fills it (grid), so the
// skeleton and the loaded figure are the same height. Show all and the drawer grow it; another
// view (File Manager, Table, a filter) marks the window wb-own and takes its own height.
const FIG_HEIGHT =
  'grid min-h-[1713px] min-[343px]:min-h-[1585px] min-[389px]:min-h-[1562px] min-[399px]:min-h-[1518px] min-[427px]:min-h-[1453px] min-[451px]:min-h-[1366px] min-[482px]:min-h-[1272px] min-[531px]:min-h-[1187px] sm:min-h-[1093px] has-[>.wb-own]:min-h-0 md:min-h-0 md:h-[740px] lg:h-[680px]';

// The domain glyphs this chapter's list names. (Imported by name: DomainIcon's lookup would bring
// all twelve glyphs into the first chunk.)
const GLYPHS = { EmailArchive, Thread, QuoteFold, NearDuplicate, ExcludedProject, ChronologyLens: LensGlyph };

// A glyph in the list's margin, by the name the copy deck gives it.
const Glyph = ({ name, active = false }) => {
  const Icon = GLYPHS[name];
  return Icon ? <Icon className={cn('absolute left-0 top-[1.375rem] transition-colors', active ? 'text-azure-700' : 'text-azure-700')} /> : null;
};

// The six operations as a ruled list, each with its domain glyph in the margin.
const Operations = ({ activeStep, onSelectStep }) => (
  <ul className="min-w-0 max-w-measure border-t border-rule" aria-label="Explore the chronology operations">
    {C.items.filter((item) => isShown(item.gate)).map((item, index) => (
      <li key={item.title} className="border-b border-rule">
        <button
          type="button"
          aria-pressed={activeStep === index}
          onClick={() => {
            onSelectStep(activeStep === index ? null : index);
            if (activeStep !== index) captureMarketingEvent('sample_interacted', { section: 'chronology-lens', interaction: 'chronology_spotlight' });
          }}
          className={cn(
            'relative block w-full min-w-0 rounded-sm py-5 pl-11 pr-2 text-left sm:pl-12 transition-colors',
            activeStep === index ? 'bg-parchment-300' : 'hover:bg-parchment-300/50'
          )}
        >
          <Glyph name={item.icon} active={activeStep === index} />
          <span className="block font-display text-[1.3125rem] font-medium leading-snug text-navy break-words">{item.title}</span>
          <span className="mt-1.5 block text-body text-ink">{item.gate ? <Gated id={item.gate}>{item.text}</Gated> : item.text}</span>
          {activeStep === index && <span className="mt-2 block text-caption font-medium text-azure-700">Shown in the illustration</span>}
        </button>
      </li>
    ))}
  </ul>
);

// Chapter II: ingestion, threading, quoted text and noise, then the Lens workbench (Fig. 3).
export const ChronologyLens = () => {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section id="chronology-lens" aria-labelledby="chronology-lens-title" className="bg-parchment py-16 md:py-24 lg:py-32">
      <div className="container">
        <ChapterHeader id="chronology-lens" numeral={C.numeral} title={C.h2} lead={C.lead} />

        <div className="mt-12 grid grid-cols-12 gap-x-6">
          <FailRecover fail={C.fail} recover={C.recover} recoverGate={C.recoverGate} className="col-span-12 lg:col-span-9 lg:col-start-3 xl:col-span-8 xl:col-start-3" />
        </div>

        <div className="mt-14 grid grid-cols-12 gap-x-4 lg:gap-x-8 items-start lg:mt-16">
          <div className="col-span-12 min-w-0 lg:col-span-5">
            <Operations activeStep={activeStep} onSelectStep={setActiveStep} />
          </div>
          <div className="col-span-12 mt-10 lg:col-span-7 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <Plate
                src={MEDIA.archiveAisle.src}
                drawing={ArchiveField}
                drawingProps={{ activeStep, onSelectStep: setActiveStep }}
                lqip={MEDIA.archiveAisle.lqip}
                ratio={MEDIA.archiveAisle.src ? MEDIA.archiveAisle.ratio : '400 / 556'}
                sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
                alt={MEDIA.archiveAisle.src ? C.plate.alt : C.plate.drawn.alt}
                caption={MEDIA.archiveAisle.src ? C.plate.caption : C.plate.drawn.caption}
                frameClassName="shadow-xl rounded-sm border border-rule/60"
              />
              <p className="mt-4 text-caption text-graphite sm:hidden">Six mailboxes, January 2024 to April 2025. The four highlighted exhibits concern the instruction on 03 March, the lead time on 12 March, delivery confirmation on 26 March and notice on 28 March 2025. Choose an operation above to highlight its place in the record.</p>
            </div>
          </div>
        </div>

      <div className="mt-16 grid grid-cols-12 gap-x-6 lg:mt-20">
        <Figure summary={C.fig.summary} caption={C.fig.caption} className="col-span-12 xl:col-span-10 xl:col-start-3">
          <LazyMount className={FIG_HEIGHT} skeleton={<FrameSkeleton />}>
            <LensWorkbench bundleLink={BUNDLE_LINK} />
          </LazyMount>
        </Figure>
      </div>

      <div className="mt-10 grid grid-cols-12 gap-x-6 lg:mt-12">
        <p className="col-span-12 lg:col-span-9 lg:col-start-3">
          <NextLink href={C.next.href} label={C.next.label} />
        </p>
      </div>
    </div>
  </section>
  );
};

