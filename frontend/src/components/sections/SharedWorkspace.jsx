import { CLAIMS, IN_BRIEF } from '@/content/home';
import { ArgumentIllustration } from './EvidenceIllustrations';

export const SharedWorkspace = () => (
  <section id="worked-example" aria-labelledby="worked-example-title" className="clarity-section shared-workspace bg-parchment">
    <div className="container">
      <div className="workspace-intro">
        <h2 id="worked-example-title" tabIndex={-1} className="clarity-heading">{CLAIMS.h2}</h2>
        <div>
          <p className="text-body max-w-measure">{CLAIMS.lead}</p>
          <p className="mt-4 text-body max-w-measure">{CLAIMS.recover}</p>
        </div>
      </div>
      <ArgumentIllustration />
      <div className="workspace-detail">
        <div>
          <h3 className="text-[1.625rem] leading-tight">One workspace for the whole team.</h3>
          <p className="mt-4 max-w-measure text-body">{CLAIMS.fail}</p>
          <p className="mt-4 max-w-measure text-body">{CLAIMS.items.find((item) => item.title === 'Discussion on the document').text}</p>
          <p className="mt-4 max-w-measure text-body">{CLAIMS.items.find((item) => item.title === 'Heads of Claim').text}</p>
        </div>
        <div>
          <h3 className="text-[1.625rem] leading-tight">{IN_BRIEF.audience.label}</h3>
          <p className="mt-4 max-w-measure text-body">{IN_BRIEF.audience.text}</p>
        </div>
      </div>
    </div>
  </section>
);
