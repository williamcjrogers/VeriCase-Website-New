import { CASE_ROOM, INTEGRITY, LENS_CHAPTER, RESEARCH } from '@/content/home';
import { Gated } from '@/components/editorial/Gated';
import { cn } from '@/lib/utils';
import { SearchIllustration } from './SearchIllustration';
import { MobileDetails } from './MobileDetails';
import { Thread } from './Thread';
import { useIllustrationPlay } from './illustrationKit';
import { ArgumentIllustration, ARGUMENT_DURATION } from './ArgumentIllustration';
import { ChronologyIllustration } from './ChronologyIllustration';
import { RebuttalIllustration } from './RebuttalIllustration';
import { ResearchIllustration, RESEARCH_DURATION } from './ResearchIllustration';

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

// The lead-in promises the search, then the chronology, so both stand in place at every width, in
// that order, after the steps.
export const RecordExplanation = () => {
  const L = LENS_CHAPTER;
  return (
  <section id="chronology-lens" aria-labelledby="chronology-lens-title" className="clarity-section capability-explanation bg-paper">
    <div className="container">
      <div className="capability-explanation-grid">
        <SectionIntroduction id="chronology-lens" kicker="Preparation and chronology" h2={L.h2} issue={L.issue} method={L.method} />
        <CapabilityFeatures steps={L.steps} label="Ingestion and chronology capabilities" mobileLabel="Explore chronology tools" leadIn={L.leadIn} />
      </div>
      <SearchIllustration />
      <ChronologyIllustration />
    </div>
  </section>
  );
};

export const EvidenceExplanation = () => {
  const research = useIllustrationPlay({ duration: RESEARCH_DURATION });
  return (
  <>
    <section id="research" aria-labelledby="research-title" className="clarity-section capability-explanation research-section bg-parchment">
      <div className="container capability-explanation-grid">
        <SectionIntroduction id="research" kicker="Evidence investigation" h2={RESEARCH.h2} issue={RESEARCH.issue} method={RESEARCH.method} />
        <CapabilityFeatures steps={RESEARCH.steps} label="Research process" mobileLabel="Explore the research process" leadIn={RESEARCH.leadIn} illustration={<ResearchIllustration id="research-illustration-phone" play={research} />} />
      </div>
      <div className="container desktop-context"><ResearchIllustration play={research} /></div>
    </section>
    <section id="case-room" aria-labelledby="case-room-title" className="clarity-section capability-explanation rebuttal-section bg-parchment">
      <div className="container capability-explanation-grid">
        <SectionIntroduction id="case-room" h2={CASE_ROOM.h2} issue={CASE_ROOM.issue} method={CASE_ROOM.method} methodGate={CASE_ROOM.methodGate} />
        <div className="thread-column"><Thread steps={CASE_ROOM.steps} label="Testing an opposing account" leadIn={CASE_ROOM.leadIn} /></div>
      </div>
      <div className="container">
        <MobileDetails label="See an example">
          <RebuttalIllustration />
        </MobileDetails>
      </div>
    </section>
  </>
  );
};

export const IntegrityExplanation = () => {
  const argument = useIllustrationPlay({ duration: ARGUMENT_DURATION });
  return (
  <section id="integrity" aria-labelledby="integrity-title" className="clarity-section capability-explanation bg-paper">
    <div className="container">
      <div className="capability-explanation-grid">
        <SectionIntroduction id="integrity" h2={INTEGRITY.h2} issue={INTEGRITY.issue} method={INTEGRITY.method} methodGate={INTEGRITY.methodGate} />
        <CapabilityFeatures steps={INTEGRITY.steps} label="Source review" mobileLabel="Explore source review" leadIn={INTEGRITY.leadIn} illustration={<ArgumentIllustration id="argument-illustration-phone" play={argument} />} />
      </div>
      <div className="desktop-context"><ArgumentIllustration play={argument} /></div>
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
};
