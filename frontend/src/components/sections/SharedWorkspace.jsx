import { CLAIMS } from '@/content/home';
import { ReportIllustration } from './ReportIllustration';
import { CapabilityFeatures, SectionIntroduction } from './CapabilityDetails';
import { DraftingIllustration, DRAFTING_DURATION } from './DraftingIllustration';
import { useIllustrationPlay } from './illustrationKit';

export const SharedWorkspace = () => {
  // The in-place copy and the phone copy of the drafting figure share one performance.
  const drafting = useIllustrationPlay({ duration: DRAFTING_DURATION });
  return (
  <section id="worked-example" aria-labelledby="worked-example-title" className="clarity-section capability-explanation shared-workspace bg-parchment">
    <div className="container">
      {/* A group, not a second region: the section is already the "Develop the argument." landmark. */}
      <div id="claims" role="group" tabIndex={-1} aria-labelledby="worked-example-title" className="capability-explanation-grid">
        <SectionIntroduction id="worked-example" h2={CLAIMS.h2} issue={CLAIMS.issue} method={CLAIMS.method} />
        <CapabilityFeatures steps={CLAIMS.steps} label="Claims preparation capabilities" mobileLabel="Explore drafting tools" leadIn={CLAIMS.leadIn} illustration={<DraftingIllustration id="drafting-illustration-phone" play={drafting} />} />
      </div>
      <div className="desktop-context"><DraftingIllustration play={drafting} /></div>
      <ReportIllustration />
    </div>
  </section>
  );
};
