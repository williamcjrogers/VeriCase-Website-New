import { useEffect } from 'react';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { Hero } from '@/components/sections/Hero';
import { TheClock } from '@/components/sections/TheClock';
import { ChronologyLens } from '@/components/sections/ChronologyLens';
import { Research } from '@/components/sections/Research';
import { ClaimsBuilder } from '@/components/sections/ClaimsBuilder';
import { CaseRoom } from '@/components/sections/CaseRoom';
import { RecordIntegrity } from '@/components/sections/RecordIntegrity';
import { InBrief } from '@/components/sections/InBrief';
import { Founder } from '@/components/sections/Founder';
import { Demonstration } from '@/components/sections/Demonstration';
import { Notes } from '@/components/sections/Notes';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { SourceSheetProvider } from '@/components/mock/SourceSheet';
import { focusSection } from '@/lib/navigate';

// The home page: a cover, six chapters and the end matter. CookieConsent and the Toaster are
// mounted once in App.js.
export const LandingPage = () => {
  // Arriving with a hash (for example /#research from another page): go to the section and
  // move focus to its heading.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) requestAnimationFrame(() => focusSection(id, { smooth: false }));
  }, []);

  return (
    <SourceSheetProvider>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <TheClock />
        <ChronologyLens />
        <Research />
        <ClaimsBuilder />
        <CaseRoom />
        <RecordIntegrity />
        <InBrief />
        <Founder />
        <Demonstration />
        <Notes />
      </main>
      <SiteFooter />
    </SourceSheetProvider>
  );
};
