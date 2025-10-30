import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { EvidenceGap } from '@/components/sections/EvidenceGap';
import { Collaboration } from '@/components/sections/Collaboration';
import { Difference } from '@/components/sections/Difference';
import { ConstructionAddIn } from '@/components/sections/ConstructionAddIn';
import { EvidenceHub } from '@/components/sections/EvidenceHub';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Accessible } from '@/components/sections/Accessible';
import { SiteFooter } from '@/components/sections/SiteFooter';

export const LandingPage = () => {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <EvidenceGap />
        <Collaboration />
        <Difference />
        <ConstructionAddIn />
        <EvidenceHub />
        <HowItWorks />
        <Accessible />
      </main>
      <SiteFooter />
    </>
  );
};