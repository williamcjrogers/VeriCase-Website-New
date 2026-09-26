import { useId } from 'react';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { recordById } from '@/content/records';
import { WORKBENCH } from '@/content/matter/workbench';
import { CLAIMS_BUILDER } from '@/content/matter/claims';
import { formatDate } from '@/lib/format';

const B = CLAIMS_BUILDER;
const SOURCES = B.finder.map((s) => s.ev);
// What each suggestion says once the drafter has decided on it.
export const DECIDED = { inserted: `Cited at ${B.insertTarget}`, dismissed: 'Dismissed' };

// The evidence finder for the section being drafted. Each item is only a proposal: Insert
// citation puts it in the narrative, Dismiss sets it aside, and either can be undone.
export const EvidenceFinder = ({ decisions, onInsert, onDismiss, onUndo }) => {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id}>
      <h3 id={id} className="cb-label">
        {B.finderTitle}
      </h3>
      <ul className="cb-suggestions">
        {B.finder.map((s) => {
          const state = decisions[s.ev];
          return (
            <li key={s.ev} className="cb-sug" data-sug={s.ev} data-state={state || 'suggested'}>
              <p className="cb-sug-head">
                <span className="cb-suggested">{B.suggested}</span>
                {state && <span className="cb-decided">{DECIDED[state]}</span>}
              </p>
              <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <EvidenceChip id={s.ev} list={SOURCES} />
                <span className="cb-date">{formatDate(recordById(s.ev).date)}</span>
              </p>
              <p className="cb-sug-text">{s.text}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {state ? (
                  <button type="button" data-undo className="vc-btn vc-btn-quiet cb-btn -ml-2.5" aria-label={`${WORKBENCH.drawer.undo} ${s.ev}`} onClick={() => onUndo(s.ev)}>
                    {WORKBENCH.drawer.undo}
                  </button>
                ) : (
                  <>
                    <button type="button" data-insert className="vc-btn vc-btn-secondary cb-btn" aria-label={`${B.insert} ${s.ev}`} onClick={(e) => onInsert(s.ev, e.currentTarget)}>
                      {B.insert}
                    </button>
                    <button type="button" className="vc-btn vc-btn-quiet cb-btn" aria-label={`${B.dismiss} ${s.ev}`} onClick={() => onDismiss(s.ev)}>
                      {B.dismiss}
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
