import { lazy } from 'react';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { Gated } from '@/components/editorial/Gated';
import { Plate } from '@/components/editorial/Plate';
import { BRAND_LINE, DEMONSTRATION } from '@/content/home';
import { MEDIA, PLATE_NUMBERS } from '@/content/media';
import { fill } from '@/lib/format';

const BundlePlate = lazy(() => import(/* webpackChunkName: "plate-bundle" */ '@/components/plates/BundlePlate').then((m) => ({ default: m.BundlePlate })));

// The closing invitation: a navy panel set into the parchment, with the email request and,
// from 1024 px, the tabbed bundle beside it.
export const Demonstration = () => (
  <section id="demonstration" aria-labelledby="demonstration-title" className="bg-parchment py-16 md:py-24 lg:py-32">
    <div className="container">
      <div className="on-ink relative grid overflow-hidden rounded-sm border border-[#1A3828] bg-[#0B2516] shadow-2xl lg:grid-cols-12">
        <div className="vc-rain" aria-hidden="true" />
        <div className="relative px-6 py-12 sm:px-10 sm:py-14 lg:col-span-7 lg:px-14 lg:py-20">
          <div className="double-rule is-brass mb-6 max-w-[8rem]" aria-hidden="true" />
          <p className="ch-note">{DEMONSTRATION.eyebrow}</p>
          <h2 id="demonstration-title" tabIndex={-1} className="mt-3 text-h2 font-medium outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azure-300 text-balance">
            {DEMONSTRATION.h2}
          </h2>
          <p className="mt-6 max-w-measure text-lead text-parchment/90">{DEMONSTRATION.body}</p>
          <Gated id={DEMONSTRATION.ownMaterialGate} block className="mt-4">
            <p className="max-w-measure text-body text-parchment/90">{DEMONSTRATION.ownMaterial}</p>
          </Gated>
          <DemoCTA onInk withCopy microcopy={DEMONSTRATION.microcopy} className="mt-9" />
          <p className="mt-10 font-display text-[1.375rem] italic text-parchment">{BRAND_LINE}</p>
        </div>
        <div className="hidden p-6 lg:col-span-5 lg:flex lg:items-center lg:p-10 lg:pl-0">
          <Plate
            src={MEDIA.bundle.src}
            drawing={BundlePlate}
            lqip={MEDIA.bundle.lqip}
            ratio={MEDIA.bundle.ratio}
            sizes="(min-width: 1024px) 36vw, 0px"
            alt={MEDIA.bundle.src ? DEMONSTRATION.plate.alt : DEMONSTRATION.plate.drawn.alt}
            caption={fill(MEDIA.bundle.src ? DEMONSTRATION.plate.caption : DEMONSTRATION.plate.drawn.caption, { n: PLATE_NUMBERS.demonstration })}
            onInk
            className="w-full"
          />
        </div>
      </div>
    </div>
  </section>
);
