import { COVER } from '@/content/home';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { HeroMotto } from './HeroMotto';
import { ReaderIllustration } from './ReaderIllustration';

// The italic line breaks after its first word ("Arguments / on the record."); the rest is kept
// together so that browsers without balanced wrapping never leave "record." alone.
const [emphasisFirst, ...emphasisRest] = COVER.h1Emphasis.split(' ');

export const Hero = () => (
  <section id="top" aria-labelledby="top-title" className="clarity-hero bg-parchment">
    <div className="container">
      {/* Two columns from 1024px: the kicker and heading; the motto opposite the kicker, with the
          introduction beneath it. On narrower screens the motto follows the introduction. */}
      <div className="clarity-hero-grid">
        <div>
          <p className="section-kicker">{COVER.eyebrow}</p>
          <h1 id="top-title" tabIndex={-1} className="clarity-title"><span>{COVER.h1Lead}</span> <em>{emphasisFirst} <span className="inline-block max-w-full">{emphasisRest.join(' ')}</span></em></h1>
        </div>
        <div className="hero-side">
          <HeroMotto />
          <div className="hero-introduction">
            <p className="clarity-lead">{COVER.subhead}</p>
            <DemoCTA placement="hero" section="top" className="hero-action mt-6" microcopy="By email. Please use sample material." />
          </div>
        </div>
      </div>
      <ReaderIllustration />
    </div>
  </section>
);
