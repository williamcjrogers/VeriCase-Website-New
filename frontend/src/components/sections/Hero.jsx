import { COVER } from '@/content/home';

// Stub: replaced by the full cover (kinetic masthead and the Chronology Lens, Fig. 1).
export const Hero = () => (
  <section id="top" aria-labelledby="top-title" className="bg-parchment pb-16 pt-6 lg:pt-12">
    <div className="container">
      <p className="eyebrow">{COVER.eyebrow}</p>
      <h1 id="top-title" tabIndex={-1} className="mt-4 max-w-[18ch] text-display font-medium outline-none">
        {COVER.h1}
      </h1>
      <p className="mt-6 max-w-measure text-lead">{COVER.subhead}</p>
    </div>
  </section>
);
