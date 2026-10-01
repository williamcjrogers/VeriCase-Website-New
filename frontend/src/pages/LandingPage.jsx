import { MarketingProgress } from '@/components/MarketingProgress';
import { useEffect } from 'react';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { Hero } from '@/components/sections/Hero';
import { TheClock } from '@/components/sections/TheClock';
import { ChronologyLens } from '@/components/sections/ChronologyLens';
import { Research } from '@/components/sections/Research';
import { ClaimsBuilder } from '@/components/sections/ClaimsBuilder';
import { CaseRoom } from '@/components/sections/CaseRoom';
import { RecordIntegrity } from '@/components/sections/RecordIntegrity';
import { InBrief, Questions } from '@/components/sections/InBrief';
import { Founder } from '@/components/sections/Founder';
import { Demonstration } from '@/components/sections/Demonstration';
import { Notes } from '@/components/sections/Notes';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { SourceSheetProvider } from '@/components/mock/SourceSheet';
import { focusSection } from '@/lib/navigate';
import { LensStage } from '@/components/lens/LensStage';
import '@/components/lens/cover.css';
import '@/components/sections/clarity.css';

// The opening explains the product. The detailed working record is optional.
export const LandingPage = () => {
  // Arriving with a hash (for example /#research from another page): go to the section and
  // move focus to its heading.
  useEffect(() => {
    const followHash = () => {
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (id) requestAnimationFrame(() => focusSection(id, { smooth: false }));
    };
    followHash();
    window.addEventListener('hashchange', followHash);
    return () => window.removeEventListener('hashchange', followHash);
  }, []);

  return (
    <SourceSheetProvider>
      <MarketingProgress />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azure-500">
        <Hero />
        <InBrief />
        <section id="worked-example" aria-labelledby="worked-example-title" className="clarity-section bg-paper border-t border-rule">
          <div className="container">
            <h2 id="worked-example-title" tabIndex={-1} className="clarity-heading">Want to see more?</h2>
            <p className="mt-4 max-w-measure text-body">Explore a fictional construction dispute, from the first project email to a draft response. Open the example to inspect the documents and try the product illustrations.</p>
          </div>
          <details id="detailed-example" className="clarity-walkthrough mt-7">
            <summary className="container">
              Explore the worked example
              <small>A detailed, optional walkthrough of the chronology, evidence and claim preparation.</small>
            </summary>
            <div>
              <div className="container py-10">
                <p className="mb-6 max-w-measure text-body">In this fictional dispute, the parties disagree about when delay became apparent. Follow the correspondence to see how VeriCase helps a team examine the evidence.</p>
                <div className="max-w-[48rem]"><LensStage /></div>
              </div>
              <TheClock />
              <ChronologyLens />
              <CaseRoom />
              <Research />
              <ClaimsBuilder />
              <RecordIntegrity />
              <Notes />
            </div>
          </details>
        </section>
        <Founder />
        <Questions />
        <Demonstration />
      </main>
      <SiteFooter />
    </SourceSheetProvider>
  );
};
