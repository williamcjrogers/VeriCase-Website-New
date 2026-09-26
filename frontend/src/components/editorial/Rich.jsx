import { Fragment } from 'react';
import { NoteRef } from '@/components/editorial/NoteRef';
import { Placeholder } from '@/components/editorial/Gated';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { keepDates } from '@/lib/format';

// Renders copy-deck strings with their inline markup:
//   [[note:n]] site note · [[ev:EV-0131]] citation chip · [[c:EV-0131]] numbered citation
//   (the number comes from `cites`, a map of exhibit to citation number) · *italic* · {{TOKEN}}
const TOKEN = /(\[\[(?:note|ev|c):[^\]]+\]\]|\*[^*\n]+\*|\{\{[A-Z0-9_]+\}\})/g;

export function Rich({ text, cites, citeList, onInk = false }) {
  if (!text) return null;
  const parts = String(text).split(TOKEN);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        let m = part.match(/^\[\[note:(\d+)\]\]$/);
        if (m) return <NoteRef key={i} n={Number(m[1])} onInk={onInk} />;
        m = part.match(/^\[\[ev:(EV-\d{4})\]\]$/);
        if (m) return <EvidenceChip key={i} id={m[1]} list={citeList} />;
        m = part.match(/^\[\[c:(EV-\d{4})\]\]$/);
        if (m) {
          const n = cites ? cites[m[1]] : undefined;
          return n ? <EvidenceChip key={i} id={m[1]} variant="superscript" n={n} list={citeList} /> : null;
        }
        m = part.match(/^\*([^*]+)\*$/);
        if (m) return <em key={i}>{keepDates(m[1])}</em>;
        m = part.match(/^\{\{([A-Z0-9_]+)\}\}$/);
        if (m) return <Placeholder key={i} token={m[1]} />;
        return <Fragment key={i}>{keepDates(part)}</Fragment>;
      })}
    </>
  );
}

// Plain text for aria-labels, meta tags and the copy check: markup stripped.
export const plainText = (text) =>
  String(text)
    .replace(/\[\[note:\d+\]\]/g, '')
    .replace(/\[\[(?:ev|c):(EV-\d{4})\]\]/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1');
