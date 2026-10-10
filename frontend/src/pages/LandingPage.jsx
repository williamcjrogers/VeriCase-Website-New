import { MarketingProgress } from '@/components/MarketingProgress';
import { useEffect } from 'react';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { Hero } from '@/components/sections/Hero';
import { RecordContext, ResearchSources } from '@/components/sections/RecordContext';
import { HeroMotto } from '@/components/sections/HeroMotto';
import { Lessons } from '@/components/sections/Lessons';
import { TimeAdvantage } from '@/components/sections/TimeAdvantage';
import { SharedWorkspace } from '@/components/sections/SharedWorkspace';
import { Collaboration, CollaborationAudience } from '@/components/sections/Collaboration';
import { InBrief, Questions } from '@/components/sections/InBrief';
import { Founder } from '@/components/sections/Founder';
import { Demonstration } from '@/components/sections/Demonstration';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { SourceSheetProvider } from '@/components/mock/SourceSheet';
import { RecordExplanation, EvidenceExplanation, CaseExplanation, ArgumentExplanation, IntegrityExplanation } from '@/components/sections/CapabilityDetails';
import { focusSection } from '@/lib/navigate';
import '@/components/sections/clarity.css';

// Product views use unchanged application captures with synthetic records.
export const LandingPage = () => {
  // Printed copies include research, profiles and answers, then restore the reader's disclosures.
  useEffect(() => {
    let before = null;
    const openForPrint = () => {
      if (before) return;
      before = new Map([...document.querySelectorAll('#about details, #questions details, .record-context-research')]
        .map((details) => [details, details.open]));
      before.forEach((_, details) => { details.open = true; });
    };
    const restore = () => {
      before?.forEach((open, details) => { details.open = open; });
      before = null;
    };
    window.addEventListener('beforeprint', openForPrint);
    window.addEventListener('afterprint', restore);
    return () => {
      restore();
      window.removeEventListener('beforeprint', openForPrint);
      window.removeEventListener('afterprint', restore);
    };
  }, []);

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
        <div className="container"><HeroMotto /></div>
        <Lessons />
        <TimeAdvantage />
        <div className="container"><RecordContext /></div>
        <InBrief>
          <RecordExplanation />
          <EvidenceExplanation />
          <SharedWorkspace />
          <CaseExplanation />
          <ArgumentExplanation />
          <Collaboration />
          <IntegrityExplanation />
        </InBrief>
        <CollaborationAudience />
        <Founder />
        <Questions />
        <Demonstration />
        <ResearchSources />
      </main>
      <SiteFooter />
    </SourceSheetProvider>
  );
};
