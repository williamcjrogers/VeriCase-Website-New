import { COVER } from '@/content/home';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { HeroMotto } from './HeroMotto';
import { SearchExample } from './examples/SearchExample';

// The italic line breaks after its first word ("Arguments / on the record."); the rest is kept
// together so that browsers without balanced wrapping never leave "record." alone.
const [emphasisFirst, ...emphasisRest] = COVER.h1Emphasis.split(' ');

export const Hero = () => (
  <section id="top" aria-labelledby="top-title" className="clarity-hero bg-parchment">
    <div className="container">
      <p className="section-kicker">{COVER.eyebrow}</p>
      {/* Two columns from 1024px: the heading, and the motto level with its first line, with the
          demonstration action beneath the motto. On narrower screens they follow one another. */}
      <div className="clarity-hero-grid">
        <div>
          <h1 id="top-title" tabIndex={-1} className="clarity-title"><span>{COVER.h1Lead}</span> <em>{emphasisFirst} <span className="inline-block max-w-full">{emphasisRest.join(' ')}</span></em></h1>
        </div>
        <div className="hero-side">
          <HeroMotto />
          <div className="hero-introduction">
            <DemoCTA placement="hero" section="top" className="hero-action" microcopy="By email. Please use sample material." />
          </div>
        </div>
      </div>
      <SearchExample className="hero-example" />
    </div>
  </section>
);
