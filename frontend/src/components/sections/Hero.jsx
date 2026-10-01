import { COVER, CTA_MICROCOPY } from '@/content/home';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { ChronologyIllustration } from './EvidenceIllustrations';
import { onSectionClick } from '@/lib/navigate';

export const Hero = () => (
    <section id="top" aria-labelledby="top-title" className="clarity-hero bg-parchment">
      <div className="container clarity-hero-grid">
        <div>
          <h1 id="top-title" tabIndex={-1} className="clarity-title">{COVER.h1}</h1>
          <p className="clarity-lead mt-6">{COVER.subhead}</p>
          <p className="mt-4 max-w-measure text-body text-graphite">{COVER.audience}</p>
          <DemoCTA placement="hero" section="top" className="mt-7" microcopy={CTA_MICROCOPY} />
          <a href="#platform" onClick={onSectionClick('platform')} className="clarity-link mt-3">See how it works</a>
        </div>
        <ChronologyIllustration />
      </div>
    </section>
);
