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
const skeleton = <div className="vc-skeleton absolute inset-0" aria-hidden="true" />;

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

// Fig. 9 in an ink panel: the title, what a hash is and the note are part of the page; the
// instrument itself loads as it comes near.
const HashPanel = ({ className }) => (
  <figure className={cn('ri-panel on-ink', className)} aria-labelledby="ri-hash-title" aria-describedby="ri-hash-intro">
    <p className="ri-fig-label">Fig. 9</p>
    <h3 id="ri-hash-title" className="ri-panel-title">
      {HASH_CHECK.title}
    </h3>
    <p id="ri-hash-intro" className="ri-panel-intro">
      {HASH_CHECK.intro}
    </p>
    <LazyMount className="ri-hash-mount" skeleton={skeleton}>
      <HashCheck />
    </LazyMount>
    <p className="ri-panel-note">{HASH_CHECK.note}</p>
    <p className="ri-panel-meaning">{HASH_CHECK.meaning}</p>
  </figure>
);

// Chapter VI: the original stays original. The controls beside a hash check the reader can
// break with one keystroke, the bundle manifest that records each digest, what we do not
// claim, and where VeriCase sits.
export const RecordIntegrity = () => (
  <section id="integrity" aria-labelledby="integrity-title" className="bg-parchment py-16 md:py-24 lg:py-32">
    <div className="container">
      <ChapterHeader id="integrity" numeral={INTEGRITY.numeral} eyebrow={INTEGRITY.eyebrow} title={INTEGRITY.h2}>
        <p className="mt-5 max-w-measure text-lead text-ink">
          <Gated id={INTEGRITY.leadGate}>{INTEGRITY.lead}</Gated>
        </p>
      </ChapterHeader>

      <div className="mt-12 grid grid-cols-12 gap-x-6">
        <FailRecover fail={INTEGRITY.fail} recover={INTEGRITY.recover} className="col-span-12 lg:col-span-9 lg:col-start-3 xl:col-span-8 xl:col-start-3" />
      </div>

      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-14 lg:mt-24">
        <Controls className="col-span-12 md:col-span-10 lg:col-span-4 lg:col-start-3" />
        <HashPanel className="col-span-12 lg:col-span-6 lg:col-start-7" />
      </div>

      <figure className="mt-20 grid grid-cols-12 gap-x-6 lg:mt-28" aria-labelledby="ri-fig10-label" aria-describedby="ri-manifest-line">
        <p id="ri-fig10-label" className="ri-fig-label ri-margin-label-xl col-span-12 mb-4 xl:col-span-2 xl:mb-0">
          Fig. 10
        </p>
        <div className="col-span-12 xl:col-span-10">
          <LazyMount className="ri-manifest-mount" skeleton={skeleton}>
            <ManifestTable />
          </LazyMount>
          <p id="ri-manifest-line" className="ri-manifest-line">
            <Gated id={MANIFEST.hashGate}>{MANIFEST.line}</Gated>
          </p>
        </div>
      </figure>

      <div className="mt-16 grid grid-cols-12 gap-x-6 lg:mt-20">
        <Declaration label={INTEGRITY.declaration.label} className="col-span-12 lg:col-span-8 lg:col-start-3">
          {INTEGRITY.declaration.text}
        </Declaration>
      </div>

      <figure className="mt-20 grid grid-cols-12 gap-x-6 lg:mt-28" aria-labelledby="ri-pos-title" aria-describedby="ri-pos-text">
        <p className="ri-fig-label ri-margin-label col-span-12 mb-4 lg:col-span-2 lg:mb-0">Fig. 11</p>
        <div className="col-span-12 lg:col-span-10">
          <h3 id="ri-pos-title" className="text-h3 font-semibold">
            {INTEGRITY.positioning.h3}
          </h3>
          <p id="ri-pos-text" className="mt-4 max-w-measure text-body text-ink">
            {INTEGRITY.positioning.text}
          </p>
          <PositioningDiagram />
        </div>
      </figure>

      <div className="mt-12 grid grid-cols-12 gap-x-6">
        <p className="ri-caption col-span-12 lg:col-span-8 lg:col-start-3">{INTEGRITY.caption}</p>
      </div>
    </div>
  </section>
);
