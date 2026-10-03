import { CASE_ROOM, INTEGRITY, LENS_CHAPTER, RESEARCH } from '@/content/home';
import { Gated, isShown } from '@/components/editorial/Gated';
import { ProductFigure } from './ProductFigure';

// Capability detail remains visible. Publication gates still govern each passage.
export const CapabilityFeatures = ({ items, label }) => (
  <ul className="capability-features" aria-label={label}>
    {items.filter((item) => isShown(item.gate)).map((item) => (
      <li key={item.title}>
        <h3 className="capability-feature-title">{item.title}</h3>
        <p className="text-body mt-2">{item.gate ? <Gated id={item.gate}>{item.text}</Gated> : item.text}</p>
      </li>
    ))}
  </ul>
);

export const RecordExplanation = () => (
  <section id="chronology-lens" aria-labelledby="chronology-lens-title" className="clarity-section capability-explanation bg-paper">
    <div className="container">
      <p className="section-kicker">Preparation and chronology</p>
      <div className="capability-explanation-grid">
      <div className="capability-introduction">
        <h2 id="chronology-lens-title" tabIndex={-1} className="clarity-heading">{LENS_CHAPTER.h2}</h2>
        <p className="mt-5 text-body">{LENS_CHAPTER.lead}</p>
        <p className="mt-4 text-body">{LENS_CHAPTER.fail}</p>
        <p className="mt-4 text-body"><Gated id={LENS_CHAPTER.recoverGate}>{LENS_CHAPTER.recover}</Gated></p>
      </div>
      <CapabilityFeatures items={LENS_CHAPTER.items} label="Ingestion and chronology capabilities" />
      </div>
      <ProductFigure kind="search" />
    </div>
  </section>
);

export const EvidenceExplanation = () => (
  <>
    <section id="research" aria-labelledby="research-title" className="clarity-section capability-explanation research-section bg-parchment">
      <div className="container capability-explanation-grid">
        <div className="capability-introduction">
          <p className="section-kicker">Research with a route back to the record</p>
          <h2 id="research-title" tabIndex={-1} className="clarity-heading">{RESEARCH.h2}</h2>
          <p className="mt-5 text-body">{RESEARCH.lead}</p>
          <p className="mt-4 text-body">{RESEARCH.fail}</p>
          <p className="mt-4 text-body">{RESEARCH.recover}</p>
        </div>
        <ol className="research-explanation-steps" aria-label="Research process">
          {RESEARCH.steps.map((step) => (
            <li key={step.n}>
              <h3>{step.title}</h3>
              <p className="text-body mt-2">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
    <section id="case-room" aria-labelledby="case-room-title" className="clarity-section capability-explanation rebuttal-section bg-parchment">
      <div className="container capability-explanation-grid">
        <div className="capability-introduction">
          <h2 id="case-room-title" tabIndex={-1} className="clarity-heading">{CASE_ROOM.h2}</h2>
          <p className="mt-5 text-body"><Gated id={CASE_ROOM.leadGate}>{CASE_ROOM.lead}</Gated></p>
        </div>
        <div className="rebuttal-explanation">
          <p className="text-body">{CASE_ROOM.fail}</p>
          {CASE_ROOM.recover && <p className="mt-4 text-body">{CASE_ROOM.recover}</p>}
        </div>
      </div>
    </section>
  </>
);

export const IntegrityExplanation = () => (
  <section id="integrity" aria-labelledby="integrity-title" className="clarity-section capability-explanation bg-paper">
    <div className="container">
      <div className="capability-explanation-grid">
        <div className="capability-introduction">
          <h2 id="integrity-title" tabIndex={-1} className="clarity-heading">{INTEGRITY.h2}</h2>
          <p className="mt-5 text-body"><Gated id={INTEGRITY.leadGate}>{INTEGRITY.lead}</Gated></p>
          {INTEGRITY.fail && <p className="mt-4 text-body">{INTEGRITY.fail}</p>}
          {INTEGRITY.recover && <p className="mt-4 text-body">{INTEGRITY.recover}</p>}
        </div>
        <CapabilityFeatures items={INTEGRITY.controls} label="Integrity and access controls" />
      </div>
      <div id="notes" role="region" className="workspace-detail capability-positioning" aria-labelledby="notes-title">
        <div>
          <h3 id="notes-title" tabIndex={-1} className="text-[1.625rem] leading-tight">{INTEGRITY.positioning.h3}</h3>
          <p className="mt-4 max-w-measure text-body">{INTEGRITY.positioning.text}</p>
        </div>
        <div>
          <h3 className="text-[1.625rem] leading-tight">{INTEGRITY.declaration.label}</h3>
          <p className="mt-4 max-w-measure text-body">{INTEGRITY.declaration.text}</p>
        </div>
      </div>
    </div>
  </section>
);
