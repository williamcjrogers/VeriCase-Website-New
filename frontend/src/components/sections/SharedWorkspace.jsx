import { CLAIMS } from '@/content/home';
import { CapabilityFeatures, SectionIntroduction } from './CapabilityDetails';
import { ReportExample } from './examples/ReportExample';
import { BundleExample } from './examples/BundleExample';

// A full report, then the bundle (owner, 06 and 09 October 2026): the Deep Research report, then
// the bundle built from it with the report on top, its PDF as downloaded. The claims anchor belongs
// to Develop the argument again (ArgumentExplanation).
export const SharedWorkspace = () => (
  <section id="worked-example" aria-labelledby="worked-example-title" className="clarity-section capability-explanation shared-workspace bg-parchment">
    <div className="container">
      <div className="capability-explanation-grid">
        <SectionIntroduction id="worked-example" h2={CLAIMS.h2} issue={CLAIMS.issue} method={CLAIMS.method} />
        <CapabilityFeatures steps={CLAIMS.steps} label="A report and its bundle" mobileLabel="How the bundle is built" leadIn={CLAIMS.leadIn} />
      </div>
      <ReportExample />
      <BundleExample />
    </div>
  </section>
);
