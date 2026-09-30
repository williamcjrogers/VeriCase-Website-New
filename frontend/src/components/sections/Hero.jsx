import { ArrowDown } from 'lucide-react';
import { BRAND_LINE, COVER, CTA_MICROCOPY } from '@/content/home';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { Sentences } from '@/components/editorial/Sentences';
import { Gated, isShown } from '@/components/editorial/Gated';
import { LensStage } from '@/components/lens/LensStage';
import { onSectionClick, sectionHref } from '@/lib/navigate';
import '@/components/lens/cover.css';

const STRIP = COVER.strip.filter((s) => isShown(s.gate));

// The cover: the kinetic masthead (CSS only), what VeriCase is and for whom, the call to action
// and the fast path, the practitioner strip, and Fig. 1, the Chronology Lens. The masthead and
// the H1 are text at full opacity from first paint, so either can be the LCP element.
export const Hero = () => (
  <section id="top" aria-labelledby="top-title" className="bg-parchment pb-16 pt-8 md:pb-24 lg:pt-14">
    <div className="container">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-6 lg:row-start-1">
          <p className="ch-note cover-statement">{COVER.eyebrow}</p>
          <h1 id="top-title" tabIndex={-1} className="mt-3 text-display font-medium text-navy outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azure-500">
            {COVER.h1.includes('RECORDS') ? (
              <>
                {COVER.h1.split('RECORDS')[0]}
                <span className="font-semibold text-azure-500 tracking-wide">RECORDS</span>
                {COVER.h1.split('RECORDS')[1]}
              </>
            ) : (
              <Sentences text={COVER.h1} />
            )}
          </h1>
          <p className="mt-4 max-w-measure text-lead text-ink lg:mt-5">{COVER.subhead}</p>
          <p className="cover-brand mt-4 lg:mt-5">{BRAND_LINE}</p>
          <DemoCTA withCopy className="mt-5 lg:mt-7" microcopy={CTA_MICROCOPY} />
          <a href={sectionHref('platform', true)} onClick={onSectionClick('platform')} className="cover-fast mt-2">
            <ArrowDown className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {COVER.fastPath}
          </a>
        </div>

        <dl className="cover-strip col-span-12 mt-10 lg:row-start-2 lg:mt-14" style={{ '--cols': STRIP.length }}>
          {STRIP.map((s) => (
            <div key={s.label} className="cover-strip-item">
              <dt className="eyebrow">{s.label}</dt>
              <dd>{s.gate ? <Gated id={s.gate}>{s.text}</Gated> : s.text}</dd>
            </div>
          ))}
        </dl>

        <div className="cover-lens col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-0">
          <LensStage />
        </div>
      </div>
    </div>
  </section>
);
