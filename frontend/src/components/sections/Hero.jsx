import { Fragment } from 'react';
import { ArrowDown } from 'lucide-react';
import { BRAND_LINE, COVER, CTA_MICROCOPY } from '@/content/home';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { Sentences } from '@/components/editorial/Sentences';
import { Gated, isShown } from '@/components/editorial/Gated';
import { LensStage } from '@/components/lens/LensStage';
import { onSectionClick, sectionHref } from '@/lib/navigate';
import '@/components/lens/cover.css';

// Without JavaScript the masthead shows its squared final state. The slip selector matches the
// specificity of the start-state offsets in index.css (.slip:nth-of-type), so it wins on order.
const MASTHEAD_NOSCRIPT =
  '<style>.masthead .slip,.masthead .slip:nth-of-type(n){transform:none}.masthead .slip::before{opacity:0}.masthead-rule{transform:none}</style>';
const STRIP = COVER.strip.filter((s) => isShown(s.gate));

// The cover: the kinetic masthead (CSS only), what VeriCase is and for whom, the call to action
// and the fast path, the practitioner strip, and Fig. 1, the Chronology Lens. The masthead and
// the H1 are text at full opacity from first paint, so either can be the LCP element.
export const Hero = () => (
  <section id="top" aria-labelledby="top-title" className="bg-parchment pb-16 pt-6 md:pb-24 lg:pt-12">
    <div className="container">
      <p className="masthead -mx-[0.2em] px-[0.2em] font-display italic text-masthead text-azure-500 lg:-mt-[0.12em]">
        {COVER.masthead.map((word, i) => (
          <Fragment key={`${word}${i}`}>
            {i > 0 && ' '}
            <span className="slip" style={{ '--i': i }}>
              {word}
            </span>
          </Fragment>
        ))}
        <span className="masthead-lens" aria-hidden="true" />
        <span className="masthead-rule" aria-hidden="true" />
      </p>
      <noscript dangerouslySetInnerHTML={{ __html: MASTHEAD_NOSCRIPT }} />

      <div className="mt-4 grid grid-cols-12 gap-x-6 lg:-mt-1">
        <div className="col-span-12 lg:col-span-6 lg:row-start-1">
          <p className="ch-note">{COVER.eyebrow}</p>
          <h1 id="top-title" tabIndex={-1} className="mt-3 text-display font-medium outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azure-500">
            <Sentences text={COVER.h1} />
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
