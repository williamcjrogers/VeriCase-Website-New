import { MarketingProgress } from '@/components/MarketingProgress';
import { useEffect } from 'react';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { Hero } from '@/components/sections/Hero';
import { TimeAdvantage } from '@/components/sections/TimeAdvantage';
import { SharedWorkspace } from '@/components/sections/SharedWorkspace';
import { RecordExplanation, EvidenceExplanation, IntegrityExplanation } from '@/components/sections/CapabilityDetails';
import { InBrief, Questions } from '@/components/sections/InBrief';
import { Founder } from '@/components/sections/Founder';
import { Demonstration } from '@/components/sections/Demonstration';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { focusSection } from '@/lib/navigate';
import '@/components/sections/clarity.css';

// A marketing page with static evidence illustrations. Product mock-ups remain separate.
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
    <>
      <MarketingProgress />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azure-500">
        <Hero />
        <TimeAdvantage />
        <InBrief />
        <RecordExplanation />
        <EvidenceExplanation />
        <SharedWorkspace />
        <IntegrityExplanation />
        <Founder />
        <Questions />
        <Demonstration />
      </main>
      <SiteFooter />
    </>
  );
};
