import { Fragment } from 'react';
import { NoteRef } from '@/components/editorial/NoteRef';
import { Placeholder } from '@/components/editorial/Gated';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { keepDates } from '@/lib/format';

// Renders copy-deck strings with their inline markup:
//   [[note:n]] site note · [[ev:EV-0131]] citation chip · [[c:EV-0131]] numbered citation
//   (the number comes from `cites`, a map of exhibit to citation number) · **bold** · *italic* · {{TOKEN}}
const TOKEN = /(\[\[(?:note|ev|c):[^\]]+\]\]|\*\*[^*\n]+\*\*|\*[^*\n]+\*|\{\{[A-Z0-9_]+\}\})/g;

// Punctuation that must stay on the line of the chip before it (a line never starts ", and").
const TRAILING = /^[.,;:]/;

export function Rich({ text, cites, citeList, onInk = false }) {
  if (!text) return null;
  const parts = String(text).split(TOKEN);
  // A chip keeps the punctuation that follows it: move it from the next part into the chip's span.
  for (let i = 0; i < parts.length - 1; i += 1) {
    if (/^\[\[ev:EV-\d{4}\]\]$/.test(parts[i]) && TRAILING.test(parts[i + 1] || '')) {
      parts[i] = `${parts[i]}${parts[i + 1][0]}`;
      parts[i + 1] = parts[i + 1].slice(1);
    }
  }
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        let m = part.match(/^\[\[note:(\d+)\]\]$/);
        if (m) return <NoteRef key={i} n={Number(m[1])} onInk={onInk} />;
        m = part.match(/^\[\[ev:(EV-\d{4})\]\]([.,;:]?)$/);
        if (m && m[2])
          return (
            <span key={i} className="whitespace-nowrap">
              <EvidenceChip id={m[1]} list={citeList} />
              {m[2]}
            </span>
          );
        if (m) return <EvidenceChip key={i} id={m[1]} list={citeList} />;
        m = part.match(/^\[\[c:(EV-\d{4})\]\]$/);
        if (m) {
          const n = cites ? cites[m[1]] : undefined;
          return n ? <EvidenceChip key={i} id={m[1]} variant="superscript" n={n} list={citeList} /> : null;
        }
        m = part.match(/^\*\*([^*]+)\*\*$/);
        if (m) return <strong key={i}>{keepDates(m[1])}</strong>;
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
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1');
