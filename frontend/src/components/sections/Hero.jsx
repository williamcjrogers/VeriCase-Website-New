import { COVER } from '@/content/home';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { ProductFigure } from './ProductFigure';

// The italic line breaks after its first word ("Arguments / on the record."); the rest is kept
// together so that browsers without balanced wrapping never leave "record." alone.
const [emphasisFirst, ...emphasisRest] = COVER.h1Emphasis.split(' ');

export const Hero = () => (
  <section id="top" aria-labelledby="top-title" className="clarity-hero bg-parchment">
    <div className="container">
      <p className="section-kicker">{COVER.eyebrow}</p>
      <div className="clarity-hero-grid">
        <div>
          <h1 id="top-title" tabIndex={-1} className="clarity-title"><span>{COVER.h1Lead}</span> <em>{emphasisFirst} <span className="whitespace-nowrap">{emphasisRest.join(' ')}</span></em></h1>
        </div>
        <div className="hero-introduction">
          <p className="clarity-lead">{COVER.subhead}</p>
          <DemoCTA placement="hero" section="top" className="hero-action mt-6" microcopy="By email. Please use sample material." />
        </div>
      </div>
      <ProductFigure kind="reader" priority />
    </div>
  </section>
);
