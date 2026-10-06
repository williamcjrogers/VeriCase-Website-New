import { noteByNumber } from '@/content/notes';
import { NOTES_SECTION } from '@/content/home';
import { Gated, isShown } from '@/components/editorial/Gated';
import { backToText } from '@/components/editorial/NoteRef';
import { NoteBody } from '@/components/editorial/NoteBody';
import { cn } from '@/lib/utils';

// A section's own numbered notes, where the page has no Notes panel of its own: each marker in the
// section opens its note in place and links here, and each note links back to its marker. A note of
// several paragraphs takes the full width on wide screens.
export const SectionNotes = ({ numbers, sectionId }) => {
  const notes = numbers.map(noteByNumber).filter((note) => note && isShown(note.gate));
  if (!notes.length) return null;
  return (
    <div className="section-notes">
      <h3 className="section-notes-title">{NOTES_SECTION.heading}</h3>
      <ol className="section-notes-list" role="list">
        {notes.map((note) => (
          <li key={note.n} id={`note-${note.n}`} tabIndex={-1} className={cn('section-note', [].concat(note.body).length > 1 && 'is-long')}>
            <span className="section-note-n" aria-hidden="true">{note.n}.</span>
            <div className="min-w-0">
              <p className="sr-only">Note {note.n}.</p>
              <Gated id={note.gate} block>
                <p className="section-note-title">{note.title}</p>
                <div className="section-note-text">
                  <NoteBody body={note.body} className="section-note-body" gap="" />
                </div>
              </Gated>
              <a
                href={`#${sectionId || note.citedIn}`}
                onClick={(e) => {
                  e.preventDefault();
                  backToText(note.n);
                }}
                aria-label={`${NOTES_SECTION.back}, note ${note.n}`}
                className="section-note-back"
              >
                {NOTES_SECTION.back}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
