import '@/App.css';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { ValuePropositions } from '@/components/sections/ValuePropositions';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Benefits } from '@/components/sections/Benefits';
import { SiteFooter } from '@/components/sections/SiteFooter';

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Hero />
        <ValuePropositions />
        <HowItWorks />
        <Benefits />
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}

export default App;