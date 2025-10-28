import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useEditMode } from '@/context/EditModeContext';
import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { ValuePropositions } from '@/components/sections/ValuePropositions';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Benefits } from '@/components/sections/Benefits';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { EditToolbar } from '@/components/editor/EditToolbar';
import { AIAssistant } from '@/components/editor/AIAssistant';

export const LandingPage = () => {
  const { user } = useAuth();
  const { isEditMode } = useEditMode();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!localStorage.getItem('token'));
  }, []);

  const showToolbar = user || hasToken;

  return (
    <div className="relative">
      {showToolbar && <EditToolbar />}
      {isEditMode && <AIAssistant />}
      
      <Navigation />
      <main>
        <Hero />
        <ValuePropositions />
        <HowItWorks />
        <Benefits />
      </main>
      <SiteFooter />
    </div>
  );
};