import { COVER } from '@/content/home';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { HeroMotto } from './HeroMotto';
import { SearchExample } from './examples/SearchExample';

// The emphasised phrase keeps all but its first word together, so that browsers without balanced
// wrapping never leave "arguments." alone.
const [emphasisFirst, ...emphasisRest] = COVER.h1Emphasis.split(' ');

export const Hero = () => (
  <section id="top" aria-labelledby="top-title" className="clarity-hero hero-grid">
    <div className="container">
      <p className="section-kicker">{COVER.eyebrow}</p>
      {/* Two columns from 1024px: the heading, its lead and the demonstration action, and beside
          them the motto set as a card. On narrower screens they follow one another. */}
      <div className="clarity-hero-grid">
        <div className="hero-main">
          <h1 id="top-title" tabIndex={-1} className="clarity-title"><span>{COVER.h1Lead}</span> <em>{emphasisFirst} <span className="inline-block max-w-full">{emphasisRest.join(' ')}</span></em></h1>
          <p className="hero-lead">{COVER.lead}</p>
          <div className="hero-introduction">
            <DemoCTA placement="hero" section="top" className="hero-action" microcopy="By email. Please use sample material." />
          </div>
        </div>
        <div className="hero-side">
          <HeroMotto />
        </div>
      </div>
      <SearchExample className="hero-example" />
    </div>
  </section>
);
