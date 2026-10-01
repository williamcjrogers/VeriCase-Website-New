import { DemoCTA } from '@/components/editorial/DemoCTA';
import { Gated } from '@/components/editorial/Gated';
import { DEMONSTRATION } from '@/content/home';

export const Demonstration = () => (
  <section id="demonstration" aria-labelledby="demonstration-title" className="clarity-section on-ink bg-[#0B2516]">
    <div className="container clarity-narrow">
      <h2 id="demonstration-title" tabIndex={-1} className="clarity-heading">{DEMONSTRATION.h2}</h2>
      <p className="mt-5 max-w-measure text-lead">{DEMONSTRATION.body}</p>
      <Gated id={DEMONSTRATION.ownMaterialGate} block className="mt-4">
        <p className="max-w-measure text-body">{DEMONSTRATION.ownMaterial}</p>
      </Gated>
      <DemoCTA placement="demonstration" section="demonstration" onInk withCopy microcopy={DEMONSTRATION.microcopy} className="mt-7" />
    </div>
  </section>
);
