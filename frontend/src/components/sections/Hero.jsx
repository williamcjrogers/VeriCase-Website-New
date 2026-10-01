import { COVER, CTA_MICROCOPY } from '@/content/home';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { useSourceSheet } from '@/components/mock/SourceSheet';
import { onSectionClick } from '@/lib/navigate';

export const Hero = () => {
  const { open } = useSourceSheet();
  return (
    <section id="top" aria-labelledby="top-title" className="clarity-hero bg-parchment">
      <div className="container clarity-hero-grid">
        <div>
          <h1 id="top-title" tabIndex={-1} className="clarity-title">{COVER.h1}</h1>
          <p className="clarity-lead mt-6">{COVER.subhead}</p>
          <p className="mt-4 max-w-measure text-body text-graphite">{COVER.audience}</p>
          <DemoCTA placement="hero" section="top" className="mt-7" microcopy={CTA_MICROCOPY} />
          <a href="#platform" onClick={onSectionClick('platform')} className="clarity-link mt-3">See how it works</a>
        </div>
        <aside className="clarity-example" aria-labelledby="simple-example-title">
          <p className="text-small text-graphite">A simple example using fictional emails</p>
          <h2 id="simple-example-title" className="mt-5 text-[1.75rem] leading-tight">When was the delivery date confirmed?</h2>
          <div className="clarity-answer">
            <p className="text-body">On <strong>26 March 2025</strong>. An email confirmed delivery for the week commencing 19 May 2025.</p>
            <button type="button" onClick={(event) => open('EV-0147', ['EV-0147'], event.currentTarget)} className="clarity-link mt-3">
              Read the source email
            </button>
          </div>
          <p className="mt-6 text-small text-graphite">An answer you can check against the original document. Your team decides what it means for the case.</p>
        </aside>
      </div>
    </section>
  );
};
