import { ARGUMENT, CASE_ROOM, INTEGRITY, LENS_CHAPTER, RESEARCH, SOLUTION_CHAPTERS } from '@/content/home';
import { CALCULATOR_GATE, CALCULATOR_LINKS } from '@/content/calculatorLinks';
import { Gated } from '@/components/editorial/Gated';
import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { cn } from '@/lib/utils';
import { MobileDetails } from './MobileDetails';
import { Thread } from './Thread';
import { AnalysisExample } from './examples/AnalysisExample';
import { RebuttalExample } from './examples/RebuttalExample';
import { DraftingExample } from './examples/DraftingExample';
import { ActivityExample } from './examples/ActivityExample';
import { SearchExample } from './examples/SearchExample';

// Chapter leads and comparison recoveries keep the publication gate of the promise they carry.
// The issue/method form remains available to unnumbered source-review support.
export const SectionIntroduction = ({ id, kicker, h2, lead, leadGate, fail, recover, recoverGate, issue, method, methodGate, headingAs = 'h3', onInk = false, className, children }) => {
  const chapter = SOLUTION_CHAPTERS.find((item) => item.id === id);
  const Heading = headingAs;
  return (
    <div className={cn('capability-introduction', chapter && 'solution-chapter-introduction', className)}>
      {chapter ? <ChapterHeader id={id} numeral={chapter.numeral} label={chapter.label} title={h2} lead={lead} leadGate={leadGate} as={headingAs} onInk={onInk} className="solution-chapter-header" /> : (
        <>
          {kicker && <p className="section-kicker">{kicker}</p>}
          <Heading id={`${id}-title`} tabIndex={-1} className="clarity-heading">{h2}</Heading>
        </>
      )}
      {fail && recover && (
        <div className="solution-comparison">
          <div className="solution-comparison-fail">
            <h4 className="solution-comparison-label">Where the record fails</h4>
            <p>{fail}</p>
          </div>
          <div className="solution-comparison-recover">
            <h4 className="solution-comparison-label">Where VeriCase comes in</h4>
            <p>{recoverGate ? <Gated id={recoverGate}>{recover}</Gated> : recover}</p>
          </div>
        </div>
      )}
      {issue && <p className="section-issue">{issue}</p>}
      {method && <p className="section-method">{methodGate ? <Gated id={methodGate}>{method}</Gated> : method}</p>}
      {children}
    </div>
  );
};

// The steps on the thread. On phones they sit in a disclosure, which the section's phone copy of
// its illustration closes; elsewhere they stand beside or below the introduction.
export const CapabilityFeatures = ({ steps, label, mobileLabel = 'Explore the tools', leadIn, illustration, headingAs = 'h3' }) => (
  <MobileDetails label={mobileLabel}>
    <Thread steps={steps} label={label} leadIn={leadIn} headingAs={headingAs} className="solution-steps" />
    {illustration && <div className="mobile-context">{illustration}</div>}
  </MobileDetails>
);

// Search introduces the first chapter; supporting steps retain the ingestion workflow.
export const RecordExplanation = () => {
  const L = LENS_CHAPTER;
  return (
  <section id="chronology-lens" aria-labelledby="chronology-lens-title" className="clarity-section capability-explanation solution-chapter solution-surface-paper bg-paper">
    <div className="container">
      <div className="capability-explanation-grid">
        <SectionIntroduction id="chronology-lens" h2={L.h2} lead={L.lead} leadGate={L.leadGate} fail={L.fail} recover={L.recover} recoverGate={L.recoverGate} />
        <CapabilityFeatures steps={L.steps} label="Getting the evidence in" mobileLabel="How it goes in" leadIn={L.leadIn} headingAs="h4" />
      </div>
      <SearchExample headingAs="h4" showIntro={false} showOverview={false} />
    </div>
  </section>
  );
};

// Quick questions to the evidence (owner, 09 October 2026: with search, "a focal point ... an easy
// way to understand the system"): Executive Analysis as a short chat, first after the overview.
// Deep Research, the full report, now leads the bundle section it feeds.
export const EvidenceExplanation = () => (
    <section id="research" aria-labelledby="research-title" className="clarity-section capability-explanation research-section solution-chapter solution-surface-ivory bg-parchment">
      <div className="container capability-explanation-grid">
        <SectionIntroduction id="research" h2={RESEARCH.h2} lead={RESEARCH.lead} leadGate={RESEARCH.leadGate} fail={RESEARCH.fail} recover={RESEARCH.recover} recoverGate={RESEARCH.recoverGate} />
        <CapabilityFeatures steps={RESEARCH.steps} label="Asking your evidence" mobileLabel="How to ask" leadIn={RESEARCH.leadIn} headingAs="h4" />
      </div>
      <div className="container">
        <AnalysisExample headingAs="h4" />
        <Gated id={CALCULATOR_GATE} block>
          <aside className="calculator-aside" aria-labelledby="evidence-calculator-title">
            <p className="eyebrow">{CALCULATOR_LINKS.research.eyebrow}</p>
            <h4 id="evidence-calculator-title" className="calculator-aside-title">{CALCULATOR_LINKS.research.title}</h4>
            <p className="calculator-aside-text">{CALCULATOR_LINKS.research.text}</p>
            <a className="vc-link calculator-aside-link" href={CALCULATOR_LINKS.research.href}>{CALCULATOR_LINKS.research.link}</a>
          </aside>
        </Gated>
      </div>
    </section>
);

// Answering the other side (restored on the owner's word of 09 October 2026): the rebuttal, in place
// at every width, after the steps.
export const CaseExplanation = () => (
  <section id="case-room" aria-labelledby="case-room-title" className="clarity-section capability-explanation rebuttal-section solution-chapter solution-surface-ink">
    <div className="container">
      <div className="case-room-editorial-copy relative">
        <div className="case-room-texture" aria-hidden="true" />
        <div className="capability-explanation-grid">
          <SectionIntroduction id="case-room" h2={CASE_ROOM.h2} lead={CASE_ROOM.lead} leadGate={CASE_ROOM.leadGate} fail={CASE_ROOM.fail} recover={CASE_ROOM.recover} recoverGate={CASE_ROOM.recoverGate} onInk />
          <CapabilityFeatures steps={CASE_ROOM.steps} label="Answering and drafting" mobileLabel="How answering works" leadIn={CASE_ROOM.leadIn} headingAs="h4" />
        </div>
      </div>
      <RebuttalExample headingAs="h4" />
    </div>
  </section>
);

// Show drafting once, with a source for each paragraph. The bundle section demonstrates export.
export const ArgumentExplanation = () => (
  <section id="claims" aria-labelledby="claims-title" className="clarity-section capability-explanation solution-chapter solution-surface-paper bg-paper">
    <div className="container">
      <div className="capability-explanation-grid">
        <SectionIntroduction id="claims" h2={ARGUMENT.h2} lead={ARGUMENT.lead} leadGate={ARGUMENT.leadGate} />
        <CapabilityFeatures steps={ARGUMENT.steps} label="Claims preparation" mobileLabel="Explore drafting tools" leadIn={ARGUMENT.leadIn} headingAs="h4" />
      </div>
      <DraftingExample headingAs="h4" />
    </div>
  </section>
);

export const IntegrityExplanation = () => (
  <section id="integrity" aria-labelledby="integrity-title" className="clarity-section capability-explanation solution-support solution-surface-paper bg-paper">
    <div className="container">
      <div className="capability-explanation-grid">
        <SectionIntroduction id="integrity" h2={INTEGRITY.h2} issue={INTEGRITY.issue} method={INTEGRITY.method} methodGate={INTEGRITY.methodGate} />
        <CapabilityFeatures steps={INTEGRITY.steps} label="Source review and activity" mobileLabel="Explore source review" leadIn={INTEGRITY.leadIn} headingAs="h4" />
      </div>
      <ActivityExample headingAs="h4" contentHeadingAs="h5" />
      <div id="notes" role="region" className="workspace-detail capability-positioning" aria-labelledby="notes-title">
        <div>
          <h4 id="notes-title" tabIndex={-1} className="text-[1.625rem] leading-tight">{INTEGRITY.positioning.h3}</h4>
          <p className="mt-4 max-w-measure text-body">{INTEGRITY.positioning.text}</p>
        </div>
        <div>
          <h4 className="text-[1.625rem] leading-tight">{INTEGRITY.declaration.label}</h4>
          <p className="mt-4 max-w-measure text-body">{INTEGRITY.declaration.text}</p>
        </div>
      </div>
    </div>
  </section>
);
