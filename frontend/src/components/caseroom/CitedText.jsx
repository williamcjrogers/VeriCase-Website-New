import { Fragment } from 'react';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { diffTokens } from '@/components/integrity/diff';
import { citationsIn, isKnownRecord } from '@/components/caseroom/scottModel';
import { keepDates } from '@/lib/format';

// A citation with the punctuation straight after it ("[EV-0151]."), which is one token.
const CITE = /(\[EV-\d{4}\][.,;:]*)/;
const CITE_PARTS = /^\[(EV-\d{4})\]([.,;:]*)$/;
// Punctuation standing on its own at the start or the end of a marked run.
const LEAD = /^[.,;:]+(?:\s+|$)/;
const TAIL = /\s+[.,;:]+$/;

// Text in parts: prose ({ text }), and citations with the punctuation after them ({ id, punct }).
export const citeParts = (text) =>
  String(text)
    .split(CITE)
    .filter(Boolean)
    .map((part) => {
      const m = part.match(CITE_PARTS);
      return m ? { id: m[1], punct: m[2] } : { text: part };
    });

// A chip that opens its source; a look-alike that is not a button (`inert`, for the
// strike-through overlay); or plain mono text for a record the matter does not hold.
const Chip = ({ id, list, inert }) => {
  if (inert) return <span className="ev-chip">[{id}]</span>;
  if (!isKnownRecord(id)) return <span className="font-mono">[{id}]</span>;
  return <EvidenceChip id={id} list={list} />;
};

// Prose with its dates kept whole, and each citation kept on one line with its punctuation. The
// punctuation after a closing citation is set apart (`cr-cite-end`), so that the strike-through
// drawn over a rejected reply stops at the chip instead of striking a lone full stop.
const Parts = ({ parts, list, inert }) =>
  parts.map((p, i) =>
    p.id ? (
      <span key={i} className="cr-cite">
        <Chip id={p.id} list={list} inert={inert} />
        {p.punct && (i === parts.length - 1 ? <span className="cr-cite-end">{p.punct}</span> : p.punct)}
      </span>
    ) : (
      <Fragment key={i}>{keepDates(p.text)}</Fragment>
    )
  );

// Reply text with each [EV-nnnn] set as a citation chip that opens its source (previous and next
// move through `list`, the reply's citations). `inert` draws look-alike chips that are not buttons,
// for the strike-through overlay, which must match the text's layout exactly.
export function CitedText({ text, list, inert = false }) {
  return <Parts parts={citeParts(text)} list={list || citationsIn(text)} inert={inert} />;
}

// Words with the spaces between them, so that the comparison is by word and spacing never splits
// a run. A date is one word: its parts are joined by no-break spaces first.
const words = (text) => keepDates(text).split(/[^\S\u00a0]+/).filter(Boolean);

// One side of a redline: on the "after" side inserted words are underlined, on the "before" side
// deleted words are struck through. Citations stay live inside the marked runs. A mark starts and
// ends on a word or a chip, never on bare punctuation: punctuation standing alone at either end
// of a run is set outside the mark, and so is the punctuation after a run's closing chip, which
// stays on the chip's line.
export function Redline({ before, after, side }) {
  const keep = side === 'after' ? 'insert' : 'delete';
  const Mark = side === 'after' ? 'ins' : 'del';
  const markClass = side === 'after' ? 'cr-ins' : 'cr-del';
  const list = citationsIn(side === 'after' ? after : before);
  const runs = diffTokens(words(before), words(after)).filter((op) => op.type === 'equal' || op.type === keep);
  return runs.map((run, i) => {
    const text = run.tokens.join(' ');
    const gap = i < runs.length - 1 ? ' ' : '';
    if (run.type === 'equal') {
      return (
        <Fragment key={i}>
          <CitedText text={text} list={list} />
          {gap}
        </Fragment>
      );
    }
    const lead = text.match(LEAD)?.[0] || '';
    const trail = text.slice(lead.length).match(TAIL)?.[0] || '';
    const parts = citeParts(text.slice(lead.length, text.length - trail.length));
    const last = parts[parts.length - 1];
    const closing = last && last.id && last.punct ? parts.pop() : null;
    return (
      <Fragment key={i}>
        {lead}
        {parts.length > 0 && (
          <Mark className={markClass}>
            <Parts parts={parts} list={list} />
          </Mark>
        )}
        {closing && (
          <span className="cr-cite">
            <Mark className={markClass}>
              <Chip id={closing.id} list={list} />
            </Mark>
            {closing.punct}
          </span>
        )}
        {trail}
        {gap}
      </Fragment>
    );
  });
}
