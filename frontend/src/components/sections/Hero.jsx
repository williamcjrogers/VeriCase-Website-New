import { COVER } from '@/content/home';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { onSectionClick } from '@/lib/navigate';
import { HeroMotto } from './HeroMotto';
import { SearchExample } from './examples/SearchExample';

// The emphasised phrase keeps all but its first word together with no-break spaces, so that
// browsers without balanced wrapping never leave its last word alone. It is plain text: Safari
// does not paint the gradient text of an inline-block inside it, which hid "arguments." on iPhone.
const [emphasisFirst, ...emphasisRest] = COVER.h1Emphasis.split(' ');
const heroSecondary = { label: COVER.heroSecondary.label, href: `#${COVER.heroSecondary.section}`, onClick: onSectionClick(COVER.heroSecondary.section) };

export const Hero = () => (
  <section id="top" aria-labelledby="top-title" className="clarity-hero hero-grid">
    <div className="container">
      <p className="section-kicker">{COVER.eyebrow}</p>
      {/* Two columns from 1024px: the heading, its lead and the demonstration action, and beside
          them the motto set as a card. On narrower screens they follow one another. */}
      <div className="clarity-hero-grid">
        <div className="hero-main">
          <h1 id="top-title" tabIndex={-1} className="clarity-title"><span>{COVER.h1Lead}</span> <em>{emphasisFirst} {emphasisRest.join('\u00a0')}</em></h1>
          <p className="hero-lead">{COVER.lead}</p>
          <div className="hero-introduction">
            <DemoCTA placement="hero" section="top" className="hero-action" microcopy={COVER.heroMicrocopy} secondary={heroSecondary} />
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
