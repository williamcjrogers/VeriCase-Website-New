import { useEffect } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { EvidenceGap } from '@/components/sections/EvidenceGap';
import { Collaboration } from '@/components/sections/Collaboration';
import { Difference } from '@/components/sections/Difference';
import { EvidenceHub } from '@/components/sections/EvidenceHub';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Accessible } from '@/components/sections/Accessible';
import { SiteFooter } from '@/components/sections/SiteFooter';

export const LandingPage = () => {
  // Scroll to a section when arriving from another page with a hash, e.g. /#platform.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <EvidenceGap />
        <Collaboration />
        <Difference />
        <EvidenceHub />
        <HowItWorks />
        <Accessible />
      </main>
      <SiteFooter />
    </>
  );
};