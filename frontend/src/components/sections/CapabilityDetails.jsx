import { INTEGRITY, LENS_CHAPTER, RESEARCH } from '@/content/home';
import { CALCULATOR_GATE, CALCULATOR_LINKS } from '@/content/calculatorLinks';
import { Gated } from '@/components/editorial/Gated';
import { cn } from '@/lib/utils';
import { MobileDetails } from './MobileDetails';
import { Thread } from './Thread';
import { UploadExample } from './examples/UploadExample';
import { AnalysisExample } from './examples/AnalysisExample';
import { ReportExample } from './examples/ReportExample';
import { ActivityExample } from './examples/ActivityExample';

// Each capability section reads as a journey: its heading; the issue, the problem as the reader
// meets it in a dispute, set large; the method, what VeriCase does about it; the steps, marked on
// a brass thread; and a line that introduces the illustration, into which the thread runs on.
// Publication gates still govern each passage.
export const SectionIntroduction = ({ id, kicker, h2, issue, method, methodGate, className, children }) => (
  <div className={cn('capability-introduction', className)}>
    {kicker && <p className="section-kicker">{kicker}</p>}
    <h2 id={`${id}-title`} tabIndex={-1} className="clarity-heading">{h2}</h2>
    <p className="section-issue">{issue}</p>
    <p className="section-method">{methodGate ? <Gated id={methodGate}>{method}</Gated> : method}</p>
    {children}
  </div>
);

// The steps on the thread. On phones they sit in a disclosure, which the section's phone copy of
// its illustration closes; elsewhere they stand beside or below the introduction.
export const CapabilityFeatures = ({ steps, label, mobileLabel = 'Explore the tools', leadIn, illustration }) => (
  <MobileDetails label={mobileLabel}>
    <Thread steps={steps} label={label} leadIn={leadIn} />
    {illustration && <div className="mobile-context">{illustration}</div>}
  </MobileDetails>
);

// The lead-in promises a mailbox going in and coming out searchable: the upload example, in place
// at every width, after the steps. (The search itself is the opening example, under the heading.)
export const RecordExplanation = () => {
  const L = LENS_CHAPTER;
  return (
  <section id="chronology-lens" aria-labelledby="chronology-lens-title" className="clarity-section capability-explanation bg-paper">
    <div className="container">
      <div className="capability-explanation-grid">
        <SectionIntroduction id="chronology-lens" kicker="Preparation and chronology" h2={L.h2} issue={L.issue} method={L.method} />
        <CapabilityFeatures steps={L.steps} label="Ingestion and chronology capabilities" mobileLabel="Explore chronology tools" leadIn={L.leadIn} />
      </div>
      <UploadExample />
    </div>
  </section>
  );
};

// The research section shows both of the application's research functions, in place at every
// width and in the order its lead-in gives: Executive Analysis, then Deep Research. (The rebuttal
// section that followed was removed on 09 October 2026: not seen in the application.)
export const EvidenceExplanation = () => (
    <section id="research" aria-labelledby="research-title" className="clarity-section capability-explanation research-section bg-parchment">
      <div className="container capability-explanation-grid">
        <SectionIntroduction id="research" kicker="Evidence investigation" h2={RESEARCH.h2} issue={RESEARCH.issue} method={RESEARCH.method} />
        <CapabilityFeatures steps={RESEARCH.steps} label="Research process" mobileLabel="Explore the research process" leadIn={RESEARCH.leadIn} />
      </div>
      <div className="container">
        <AnalysisExample />
        <ReportExample />
        <Gated id={CALCULATOR_GATE} block>
          <aside className="calculator-aside" aria-labelledby="evidence-calculator-title">
            <p className="eyebrow">{CALCULATOR_LINKS.research.eyebrow}</p>
            <h3 id="evidence-calculator-title" className="calculator-aside-title">{CALCULATOR_LINKS.research.title}</h3>
            <p className="calculator-aside-text">{CALCULATOR_LINKS.research.text}</p>
            <a className="vc-link calculator-aside-link" href={CALCULATOR_LINKS.research.href}>{CALCULATOR_LINKS.research.link}</a>
          </aside>
        </Gated>
      </div>
    </section>
);

export const IntegrityExplanation = () => (
  <section id="integrity" aria-labelledby="integrity-title" className="clarity-section capability-explanation bg-paper">
    <div className="container">
      <div className="capability-explanation-grid">
        <SectionIntroduction id="integrity" h2={INTEGRITY.h2} issue={INTEGRITY.issue} method={INTEGRITY.method} methodGate={INTEGRITY.methodGate} />
        <CapabilityFeatures steps={INTEGRITY.steps} label="Source review and activity" mobileLabel="Explore source review" leadIn={INTEGRITY.leadIn} />
      </div>
      <ActivityExample />
      <div id="notes" role="region" className="workspace-detail capability-positioning" aria-labelledby="notes-title">
        <div>
          <h3 id="notes-title" tabIndex={-1} className="text-[1.625rem] leading-tight">{INTEGRITY.positioning.h3}</h3>
          <p className="mt-4 max-w-measure text-body">{INTEGRITY.positioning.text}</p>
        </div>
        <div>
          <h3 className="text-[1.625rem] leading-tight">{INTEGRITY.declaration.label}</h3>
          <p className="mt-4 max-w-measure text-body">{INTEGRITY.declaration.text}</p>
        </div>
      </div>
    </div>
  </section>
);
