import { CLAIMS } from '@/content/home';
import { CapabilityFeatures, SectionIntroduction } from './CapabilityDetails';
import { BundleExample } from './examples/BundleExample';

// Bundles (owner, 09 October 2026), in the place the claims drafting section held: the bundle
// built from a Deep Research report, its PDF as downloaded. The section keeps its anchors
// (worked-example, and claims for links made before) so that links to it still land.
export const SharedWorkspace = () => (
  <section id="worked-example" aria-labelledby="worked-example-title" className="clarity-section capability-explanation shared-workspace bg-parchment">
    <div className="container">
      {/* A group, not a second region: the section is already the "Build the bundle." landmark. */}
      <div id="claims" role="group" tabIndex={-1} aria-labelledby="worked-example-title" className="capability-explanation-grid">
        <SectionIntroduction id="worked-example" h2={CLAIMS.h2} issue={CLAIMS.issue} method={CLAIMS.method} />
        <CapabilityFeatures steps={CLAIMS.steps} label="Building a bundle" mobileLabel="Explore bundles" leadIn={CLAIMS.leadIn} />
      </div>
      <BundleExample />
    </div>
  </section>
);
