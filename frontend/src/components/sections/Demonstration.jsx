import { DemoCTA } from '@/components/editorial/DemoCTA';
import { Gated } from '@/components/editorial/Gated';
import { BRAND_LINE, DEMONSTRATION } from '@/content/home';

// The closing invitation: a navy panel set into the parchment, with the email request.
export const Demonstration = () => (
  <section id="demonstration" aria-labelledby="demonstration-title" className="bg-parchment py-16 md:py-24 lg:py-32">
    <div className="container">
      <div className="on-ink relative overflow-hidden rounded-sm border border-[#1A3828] bg-[#0B2516] shadow-2xl">
        <div className="vc-rain" aria-hidden="true" />
        <div className="relative px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-20">
          <div className="double-rule is-brass mb-6 max-w-[8rem]" aria-hidden="true" />
          <p className="ch-note">{DEMONSTRATION.eyebrow}</p>
          <h2 id="demonstration-title" tabIndex={-1} className="mt-3 text-h2 font-medium outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azure-300 text-balance">
            {DEMONSTRATION.h2}
          </h2>
          <p className="mt-6 max-w-measure text-lead text-parchment/90">{DEMONSTRATION.body}</p>
          <Gated id={DEMONSTRATION.ownMaterialGate} block className="mt-4">
            <p className="max-w-measure text-body text-parchment/90">{DEMONSTRATION.ownMaterial}</p>
          </Gated>
          <DemoCTA placement="demonstration" section="demonstration" onInk withCopy microcopy={DEMONSTRATION.microcopy} className="mt-9" />
          <p className="mt-10 font-display text-[1.375rem] italic text-parchment">{BRAND_LINE}</p>
        </div>
      </div>
    </div>
  </section>
);
