import { COVER } from '@/content/home';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { onSectionClick } from '@/lib/navigate';
import { LensStage } from '@/components/lens/LensStage';

// Keep the emphasis as plain text, with normal spaces so every word can wrap on phones.
// Nested inline-blocks previously hid "arguments." in Safari's gradient text rendering.
const heroSecondary = { label: COVER.heroSecondary.label, href: `#${COVER.heroSecondary.section}`, onClick: onSectionClick(COVER.heroSecondary.section) };

export const Hero = () => (
  <section id="top" aria-labelledby="top-title" className="clarity-hero hero-grid">
    <div className="container">
      <p className="section-kicker">{COVER.eyebrow}</p>
      {/* Keep the sales message first. The original interactive illustration follows at full
          width until there is enough room for readable correspondence beside the headline. */}
      <div className="clarity-hero-grid">
        <div className="hero-main">
          <h1 id="top-title" tabIndex={-1} className="clarity-title">
            <span>{COVER.h1Lead}</span>
            {' '}
            <em>{COVER.h1Emphasis}</em>
          </h1>
          <p className="hero-lead">{COVER.lead}</p>
          <p className="hero-outcome">{COVER.outcome}</p>
          <div className="hero-introduction">
            <DemoCTA placement="hero" section="top" className="hero-action" microcopy="" secondary={heroSecondary} />
          </div>
        </div>
        <div className="hero-side">
          <LensStage />
        </div>
      </div>
    </div>
  </section>
);
