import { CLAIMS } from '@/content/home';
import { CapabilityFeatures, SectionIntroduction } from './CapabilityDetails';
import { BundleExample } from './examples/BundleExample';

// One illustration shows the bundle and the report inside it, without repeating the report
// in a separate application window. The claims anchor belongs to ArgumentExplanation.
export const SharedWorkspace = () => (
  <section id="worked-example" aria-labelledby="worked-example-title" className="clarity-section capability-explanation shared-workspace solution-chapter solution-surface-paper bg-paper">
    <div className="container">
      <div className="capability-explanation-grid">
        <SectionIntroduction id="worked-example" h2={CLAIMS.h2} lead={CLAIMS.lead} leadGate={CLAIMS.leadGate} />
        <CapabilityFeatures steps={CLAIMS.steps} label="A report and its bundle" mobileLabel="How the bundle is built" leadIn={CLAIMS.leadIn} headingAs="h4" />
      </div>
      <BundleExample headingAs="h4" contentHeadingAs="h5" />
    </div>
  </section>
);
