import { useId, useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { noteByNumber } from '@/content/notes';
import { NOTES_SECTION } from '@/content/home';
import { NoteBody } from '@/components/editorial/NoteBody';
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

// A brass superscript that opens its note in a Popover (click or Enter; Escape closes it). A note of
// several paragraphs shows its first, then continues in Notes; on a short window the pop-up scrolls.
// Without JavaScript it is a plain link to the note.
export const NoteRef = ({ n, onInk = false }) => {
  const note = noteByNumber(n);
  const [open, setOpen] = useState(false);
  const leaving = useRef(false);
  const triggerRef = useRef(null);
  const linkRef = useRef(null);
  const titleId = useId();
  if (!note) throw new Error(`Unknown note ${n}`);
  // A long note opens with its first paragraph here and continues in Notes.
  const [lead, ...rest] = [].concat(note.body);

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
          aria-labelledby={titleId}
          className="vc-note-pop max-h-[min(32rem,var(--radix-popover-content-available-height))] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-md border-rule-strong bg-paper p-4 text-ink shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-500"
          // The pop-up is placed at the end of the page, so Tab out of it would jump to the footer.
          // Shift+Tab anywhere in it, or Tab from its link, closes it instead, and focus returns to
          // the marker, from which the reader carries on through the text.
          onKeyDown={(e) => {
            if (e.key === 'Tab' && (e.shiftKey || e.target === linkRef.current)) {
              e.preventDefault();
              setOpen(false);
            }
          }}
          onCloseAutoFocus={(e) => {
            if (leaving.current) {
              e.preventDefault();
              leaving.current = false;
            }
          }}
        >
          <p className="eyebrow">Note {n}</p>
          <p id={titleId} className="mt-2 font-display text-[1.0625rem] font-medium leading-snug text-navy">{note.title}</p>
          <div className="mt-2">
            <NoteBody body={lead} className="text-caption text-graphite" />
          </div>
          <a
            ref={linkRef}
            href={`#note-${n}`}
            className="mt-2 inline-flex min-h-6 items-center text-caption font-medium text-azure-700 underline underline-offset-2"
            onClick={(e) => {
              e.preventDefault();
              leaving.current = true;
              setOpen(false);
              requestAnimationFrame(() => goToNote(n, triggerRef.current));
            }}
          >
            {rest.length ? NOTES_SECTION.continueInNotes : NOTES_SECTION.readInNotes}
          </a>
        </PopoverContent>
      </Popover>
    </sup>
  );
};
