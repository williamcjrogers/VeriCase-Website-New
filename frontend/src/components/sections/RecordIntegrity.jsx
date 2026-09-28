import { lazy } from 'react';
import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { Declaration } from '@/components/editorial/Declaration';
import { FailRecover } from '@/components/editorial/FailRecover';
import { Gated, isShown } from '@/components/editorial/Gated';
import { LazyMount } from '@/components/editorial/LazyMount';
import { DomainIcon } from '@/components/icons';
import { PositioningDiagram } from '@/components/mock/PositioningDiagram';
import { INTEGRITY } from '@/content/home';
import { HASH_CHECK, MANIFEST } from '@/content/matter/integrity';
import { cn } from '@/lib/utils';
import '@/components/integrity/integrity.css';

const HashCheck = lazy(() => import(/* webpackChunkName: "hash-check" */ '@/components/mock/HashCheck'));
const ManifestTable = lazy(() => import(/* webpackChunkName: "manifest" */ '@/components/mock/ManifestTable'));
// The frame reserves its figure's mounted height only while this shows (see integrity.css).
const skeleton = <div className="vc-skeleton absolute inset-0" aria-hidden="true" data-skeleton />;

// The controls behind the record, in a ruled list with their glyphs (never tiles). An item
// subject to an owner gate is marked on previews and removed if the gate is struck.
const Controls = ({ className }) => (
  <ul className={cn('ri-controls', className)} role="list">
    {INTEGRITY.controls
      .filter((c) => isShown(c.gate))
      .map((c) => {
        const body = (
          <>
            <p className="ri-control-title">{c.title}</p>
            <p className="ri-control-text">{c.text}</p>
          </>
        );
        return (
          <li key={c.title} className="ri-control">
            <DomainIcon name={c.icon} className="ri-control-icon" />
            {c.gate ? (
              <Gated id={c.gate} block>
                {body}
              </Gated>
            ) : (
              <div>{body}</div>
            )}
          </li>
        );
      })}
  </ul>
);

// Fig. 9: an ink panel holding the title, what a hash is, the instrument (which loads as it comes
// near) and the note, with the caption beneath the panel.
const HashPanel = ({ className }) => (
  <figure className={cn('ri-hash-fig', className)} aria-labelledby="ri-hash-caption" aria-describedby="ri-hash-intro">
    <div className="ri-panel on-ink">
      <h3 className="ri-panel-title">{HASH_CHECK.title}</h3>
      <p id="ri-hash-intro" className="ri-panel-intro">
        {HASH_CHECK.intro}
      </p>
      <LazyMount className="ri-hash-mount" skeleton={skeleton}>
        <HashCheck />
      </LazyMount>
      <p className="ri-panel-note">{HASH_CHECK.note}</p>
      <p className="ri-panel-meaning">{HASH_CHECK.meaning}</p>
    </div>
    <figcaption id="ri-hash-caption" className="ri-caption">
      {INTEGRITY.fig9Caption}
    </figcaption>
  </figure>
);

// Chapter VI: the original stays original. The controls beside a hash check the reader can
// break with one keystroke, the bundle manifest that records each digest, what we do not
// claim, and where VeriCase sits. Each figure's caption sits directly beneath it.
export const RecordIntegrity = () => (
  <section id="integrity" aria-labelledby="integrity-title" className="border-t border-rule bg-parchment py-16 md:py-24 lg:py-32">
    <div className="container">
      <ChapterHeader id="integrity" numeral={INTEGRITY.numeral} title={INTEGRITY.h2}>
        <p className="mt-5 max-w-measure text-lead text-ink">
          <Gated id={INTEGRITY.leadGate}>{INTEGRITY.lead}</Gated>
        </p>
      </ChapterHeader>

      <div className="mt-12 grid grid-cols-12 gap-x-6">
        <FailRecover fail={INTEGRITY.fail} recover={INTEGRITY.recover} className="col-span-12 lg:col-span-9 lg:col-start-3 xl:col-span-8 xl:col-start-3" />
      </div>

      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-24 lg:gap-y-14">
        <Controls className="col-span-12 md:col-span-10 lg:col-span-4 lg:col-start-3" />
        <HashPanel className="col-span-12 lg:col-span-6 lg:col-start-7" />
      </div>

      <div className="mt-16 grid grid-cols-12 gap-x-6 lg:mt-28">
        <div className="col-span-12 xl:col-span-10 xl:col-start-3">
          <figure aria-labelledby="ri-manifest-caption" aria-describedby="ri-manifest-line">
            <LazyMount className="ri-manifest-mount" skeleton={skeleton}>
              <ManifestTable />
            </LazyMount>
            <figcaption id="ri-manifest-caption" className="ri-caption">
              {INTEGRITY.fig10Caption}
            </figcaption>
          </figure>
          <p id="ri-manifest-line" className="ri-manifest-line">
            <Gated id={MANIFEST.hashGate}>{MANIFEST.line}</Gated>
          </p>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-12 gap-x-6 lg:mt-20">
        <Declaration label={INTEGRITY.declaration.label} className="col-span-12 lg:col-span-8 lg:col-start-3">
          {INTEGRITY.declaration.text}
        </Declaration>
      </div>

      <div className="mt-16 grid grid-cols-12 gap-x-6 lg:mt-28">
        <div className="col-span-12 lg:col-span-10 lg:col-start-3">
          <h3 className="text-h3 font-medium">{INTEGRITY.positioning.h3}</h3>
          <p id="ri-pos-text" className="mt-4 max-w-measure text-body text-ink">
            {INTEGRITY.positioning.text}
          </p>
          <figure className="ri-pos-fig" aria-labelledby="ri-pos-caption" aria-describedby="ri-pos-text">
            <PositioningDiagram />
            <figcaption id="ri-pos-caption" className="ri-caption">
              {INTEGRITY.fig11Caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
);
