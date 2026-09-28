import { useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { noteByNumber } from '@/content/notes';
import { NOTES_SECTION } from '@/content/home';
import { Placeholder } from '@/components/editorial/Gated';
import { cn } from '@/lib/utils';

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Moves the reader to note n in the Notes panel, focuses it and flashes it briefly.
export function goToNote(n, fromEl) {
  const target = document.getElementById(`note-${n}`);
  if (!target) return;
  if (fromEl) window.__vcLastNoteRef = { n, el: fromEl };
  target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  target.focus({ preventScroll: true });
  target.classList.remove('note-flash');
  // Restart the animation on repeat visits.
  void target.offsetWidth; // eslint-disable-line no-void
  target.classList.add('note-flash');
}

// Returns the reader from note n to where it was cited (the last marker used, else the first).
export function backToText(n) {
  const last = window.__vcLastNoteRef;
  const el = last && last.n === n && document.body.contains(last.el) ? last.el : document.querySelector(`[data-note-ref="${n}"]`);
  if (!el) return;
  el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });
  el.focus({ preventScroll: true });
}

// Renders the note body, with any {{TOKEN}} shown as an owner placeholder.
const NoteBody = ({ text }) =>
  String(text)
    .split(/(\{\{[A-Z0-9_]+\}\})/g)
    .map((part, i) => {
      const m = part.match(/^\{\{([A-Z0-9_]+)\}\}$/);
      return m ? <Placeholder key={i} token={m[1]} /> : <span key={i}>{part}</span>;
    });

// A brass superscript that opens its note in a Popover (click or Enter; Escape closes it).
// Without JavaScript it is a plain link to the note.
export const NoteRef = ({ n, onInk = false }) => {
  const note = noteByNumber(n);
  const [open, setOpen] = useState(false);
  const leaving = useRef(false);
  const triggerRef = useRef(null);
  if (!note) throw new Error(`Unknown note ${n}`);

  return (
    <sup className="vc-sup">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <a
            ref={triggerRef}
            href={`#note-${n}`}
            data-note-ref={n}
            className={cn('superscript-ref is-note', onInk && 'on-ink-ref')}
            aria-label={`Note ${n}`}
            onClick={(e) => {
              e.preventDefault();
              setOpen((o) => !o);
            }}
          >
            {n}
          </a>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={6}
          className="vc-note-pop w-[min(22rem,calc(100vw-2rem))] rounded-md border-rule-strong bg-paper p-4 text-ink shadow-lift"
          onCloseAutoFocus={(e) => {
            if (leaving.current) {
              e.preventDefault();
              leaving.current = false;
            }
          }}
        >
          <p className="eyebrow">Note {n}</p>
          <p className="mt-2 font-display text-[1.0625rem] font-medium leading-snug text-navy">{note.title}</p>
          <p className="mt-2 text-caption text-graphite">
            <NoteBody text={note.body} />
          </p>
          <a
            href={`#note-${n}`}
            className="mt-3 inline-block text-caption font-medium text-azure-700 underline underline-offset-2"
            onClick={(e) => {
              e.preventDefault();
              leaving.current = true;
              setOpen(false);
              requestAnimationFrame(() => goToNote(n, triggerRef.current));
            }}
          >
            {NOTES_SECTION.readInNotes}
          </a>
        </PopoverContent>
      </Popover>
    </sup>
  );
};
