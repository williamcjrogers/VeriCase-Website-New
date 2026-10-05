import { CLAIMS, IN_BRIEF } from '@/content/home';
import { ReportIllustration } from './ReportIllustration';
import { CapabilityFeatures } from './CapabilityDetails';
import { MobileDetails } from './MobileDetails';
import { DiscussionIllustration } from './DiscussionIllustration';
import { DraftingIllustration, DRAFTING_DURATION } from './DraftingIllustration';
import { useIllustrationPlay } from './illustrationKit';

export const SharedWorkspace = () => {
  // The in-place copy and the phone copy of the drafting figure share one performance.
  const drafting = useIllustrationPlay({ duration: DRAFTING_DURATION });
  return (
  <section id="worked-example" aria-labelledby="worked-example-title" className="clarity-section shared-workspace bg-parchment">
    <div className="container">
      {/* A group, not a second region: the section is already the "Develop the argument." landmark. */}
      <div id="claims" role="group" tabIndex={-1} aria-labelledby="worked-example-title" className="workspace-intro">
        <h2 id="worked-example-title" tabIndex={-1} className="clarity-heading">{CLAIMS.h2}</h2>
        <div>
          <p className="text-body max-w-measure">{CLAIMS.lead}</p>
          <p className="mt-4 text-body max-w-measure">{CLAIMS.recover}</p>
        </div>
      </div>
      <div className="claims-explanation">
        <CapabilityFeatures items={CLAIMS.items.filter((item) => item.title !== 'Discussion on the document')} label="Claims preparation capabilities" mobileLabel="Explore drafting tools" illustration={<DraftingIllustration id="drafting-illustration-phone" play={drafting} />} />
      </div>
      <div className="desktop-context"><DraftingIllustration play={drafting} /></div>
      <ReportIllustration />
      <div className="workspace-collaboration">
      <MobileDetails label="Working with your team">
      <div className="workspace-detail">
        <div>
          <h3 className="text-[1.625rem] leading-tight">{CLAIMS.collaborationHeading}</h3>
          <p className="mt-4 max-w-measure text-body">{CLAIMS.fail}</p>
          <p className="mt-4 max-w-measure text-body">{CLAIMS.items.find((item) => item.title === 'Discussion on the document').text}</p>
        </div>
        <div>
          <h3 className="text-[1.625rem] leading-tight">{IN_BRIEF.audience.label}</h3>
          <p className="mt-4 max-w-measure text-body">{IN_BRIEF.audience.text}</p>
        </div>
      </div>
      <DiscussionIllustration />
      </MobileDetails>
      </div>
    </div>
  </section>
  );
};
