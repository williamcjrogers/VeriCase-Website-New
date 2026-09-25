import { Fragment } from 'react';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { diffTokens } from '@/components/integrity/diff';
import { citationsIn, isKnownRecord } from '@/components/caseroom/scottModel';

const REF = /(\[EV-\d{4}\])/;

// Reply text with each [EV-nnnn] set as a citation chip that opens its source (previous and next
// move through `list`, the reply's citations). A reference to a record the matter does not hold
// stays as plain mono text. `inert` draws look-alike chips that are not buttons, for the
// strike-through overlay, which must match the text's layout exactly.
export function CitedText({ text, list, inert = false }) {
  const cited = list || citationsIn(text);
  return String(text)
    .split(REF)
    .map((part, i) => {
      if (!part) return null;
      const m = part.match(/^\[(EV-\d{4})\]$/);
      if (!m) return <Fragment key={i}>{part}</Fragment>;
      if (inert) return <span key={i} className="ev-chip">[{m[1]}]</span>;
      if (!isKnownRecord(m[1])) return <span key={i} className="font-mono">{part}</span>;
      return <EvidenceChip key={i} id={m[1]} list={cited} />;
    });
}

// Words with their trailing space, so that the comparison is by word and spacing never splits a run.
const words = (text) => (String(text).match(/\S+\s*/g) || []).map((w) => w.trimEnd());

// One side of a redline: on the "after" side inserted words are underlined, on the "before" side
// deleted words are struck through. Citations stay live inside the marked runs.
export function Redline({ before, after, side }) {
  const keep = side === 'after' ? 'insert' : 'delete';
  const Mark = side === 'after' ? 'ins' : 'del';
  const list = citationsIn(side === 'after' ? after : before);
  const runs = diffTokens(words(before), words(after)).filter((op) => op.type === 'equal' || op.type === keep);
  return runs.map((run, i) => {
    const text = run.tokens.join(' ');
    const gap = i < runs.length - 1 ? ' ' : '';
    return (
      <Fragment key={i}>
        {run.type === 'equal' ? (
          <CitedText text={text} list={list} />
        ) : (
          <Mark className={side === 'after' ? 'cr-ins' : 'cr-del'}>
            <CitedText text={text} list={list} />
          </Mark>
        )}
        {gap}
      </Fragment>
    );
  });
}
