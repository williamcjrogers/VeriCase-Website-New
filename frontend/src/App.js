import '@/App.css';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { EvidenceGap } from '@/components/sections/EvidenceGap';
import { Difference } from '@/components/sections/Difference';
import { EvidenceHub } from '@/components/sections/EvidenceHub';
import { ConstructionAddIn } from '@/components/sections/ConstructionAddIn';
import { Accessible } from '@/components/sections/Accessible';
import { SiteFooter } from '@/components/sections/SiteFooter';

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Hero />
        <EvidenceGap />
        <Difference />
        <EvidenceHub />
        <ConstructionAddIn />
        <Accessible />
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}

export default App;