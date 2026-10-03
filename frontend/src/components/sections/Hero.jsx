import { COVER, CTA_MICROCOPY } from '@/content/home';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { onSectionClick } from '@/lib/navigate';
import { ProductFigure } from './ProductFigure';

export const Hero = () => (
  <section id="top" aria-labelledby="top-title" className="clarity-hero bg-parchment">
    <div className="container">
      <p className="section-kicker">{COVER.eyebrow}</p>
      <div className="clarity-hero-grid">
        <div>
          <h1 id="top-title" tabIndex={-1} className="clarity-title">{COVER.h1Lead} <em>{COVER.h1Emphasis}</em></h1>
          <p className="hero-audience">{COVER.audience}</p>
        </div>
        <div className="hero-introduction">
          <p className="clarity-lead">{COVER.subhead}</p>
          <p className="hero-proof">{COVER.practitionerProof}</p>
          <DemoCTA placement="hero" section="top" className="mt-6" microcopy={CTA_MICROCOPY} />
          <a href="#platform" onClick={onSectionClick('platform')} className="clarity-link mt-3">{COVER.fastPath} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <ProductFigure kind="reader" priority />
    </div>
  </section>
);
