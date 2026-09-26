import { DemoCTA } from '@/components/editorial/DemoCTA';
import { Gated } from '@/components/editorial/Gated';
import { Plate } from '@/components/editorial/Plate';
import { BRAND_LINE, DEMONSTRATION } from '@/content/home';
import { MEDIA, PLATE_NUMBERS } from '@/content/media';
import { fill } from '@/lib/format';

// The closing invitation: a navy panel set into the parchment, with the email request and,
// from 1024 px, the tabbed bundle beside it.
export const Demonstration = () => (
  <section id="demonstration" aria-labelledby="demonstration-title" className="bg-parchment py-16 md:py-24 lg:py-32">
    <div className="container">
      <div className="on-ink grid overflow-hidden rounded-md bg-navy lg:grid-cols-12">
        <div className="px-6 py-12 sm:px-10 sm:py-14 lg:col-span-7 lg:px-14 lg:py-20">
          <div className="double-rule is-brass mb-6 max-w-[8rem]" aria-hidden="true" />
          <p className="ch-note">{DEMONSTRATION.eyebrow}</p>
          <h2 id="demonstration-title" tabIndex={-1} className="mt-3 text-h2 font-medium outline-none text-balance">
            {DEMONSTRATION.h2}
          </h2>
          <p className="mt-6 max-w-measure text-lead text-parchment/90">{DEMONSTRATION.body}</p>
          <Gated id={DEMONSTRATION.ownMaterialGate} block className="mt-4">
            <p className="max-w-measure text-body text-parchment/90">{DEMONSTRATION.ownMaterial}</p>
          </Gated>
          <DemoCTA onInk withCopy microcopy={DEMONSTRATION.microcopy} className="mt-9" />
          <p className="mt-10 font-display text-[1.375rem] italic text-parchment">{BRAND_LINE}</p>
        </div>
        <div className="hidden p-6 lg:col-span-5 lg:block lg:p-10 lg:pl-0">
          <Plate
            src={MEDIA.bundle.src}
            lqip={MEDIA.bundle.lqip}
            ratio={MEDIA.bundle.ratio}
            sizes="(min-width: 1024px) 36vw, 0px"
            alt={DEMONSTRATION.plate.alt}
            caption={fill(DEMONSTRATION.plate.caption, { n: PLATE_NUMBERS.demonstration })}
            onInk
            className="lg:mt-10"
          />
        </div>
      </div>
    </div>
  </section>
);
