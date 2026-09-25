import { LETTERED_NOTES, NOTES } from '@/content/notes';
import { NOTES_SECTION } from '@/content/home';
import { isShown, Placeholder } from '@/components/editorial/Gated';
import { backToText } from '@/components/editorial/NoteRef';

// Renders a note body, with any {{TOKEN}} shown as an owner placeholder.
const Body = ({ text }) =>
  String(text)
    .split(/(\{\{[A-Z0-9_]+\}\})/g)
    .map((part, i) => {
      const m = part.match(/^\{\{([A-Z0-9_]+)\}\}$/);
      return m ? <Placeholder key={i} token={m[1]} /> : <span key={i}>{part}</span>;
    });

// Numbered notes with back-links (each returns to the marker the reader came from), then the
// lettered notes that cover the page as a whole.
export const Notes = () => (
  <section id="notes" aria-labelledby="notes-title" className="bg-parchment-300 py-16 md:py-24">
    <div className="container">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-9 lg:col-start-3">
          <div className="double-rule mb-5 max-w-[8rem]" aria-hidden="true" />
          <h2 id="notes-title" tabIndex={-1} className="text-h2 font-medium outline-none">
            {NOTES_SECTION.heading}
          </h2>
          <p className="mt-4 max-w-measure text-small text-graphite">{NOTES_SECTION.intro}</p>
        </div>
      </div>

      <ol className="mt-10 grid gap-x-10 gap-y-0 lg:ml-[calc((100%+1.5rem)/12*2)] lg:grid-cols-2">
        {NOTES.filter((note) => isShown(note.gate)).map((note) => (
          <li
            key={note.n}
            id={`note-${note.n}`}
            tabIndex={-1}
            className="grid grid-cols-[2.25rem_1fr] gap-x-2 border-t border-rule-strong/40 py-4 outline-none focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <span className="mono pt-0.5 text-meta font-medium text-brass-700" aria-hidden="true">
              {note.n}.
            </span>
            <div className="min-w-0">
              <p className="sr-only">Note {note.n}.</p>
              <p className="font-display text-[1.0625rem] font-medium leading-snug text-navy">{note.title}</p>
              <p className="mt-1.5 text-caption text-ink">
                <Body text={note.body} />
              </p>
              <a
                href={`#${note.citedIn}`}
                onClick={(e) => {
                  e.preventDefault();
                  backToText(note.n);
                }}
                aria-label={`${NOTES_SECTION.back}, note ${note.n}`}
                className="mt-2 inline-flex min-h-[24px] items-center text-meta font-medium text-azure-700 underline underline-offset-2 hover:text-navy"
              >
                {NOTES_SECTION.back}
              </a>
            </div>
          </li>
        ))}
      </ol>

      <dl className="mt-10 grid gap-x-10 border-t border-rule-strong/60 pt-6 lg:ml-[calc((100%+1.5rem)/12*2)] lg:grid-cols-3">
        {LETTERED_NOTES.map((note) => (
          <div key={note.k} id={`note-${note.k.toLowerCase()}`} tabIndex={-1} className="py-3 outline-none">
            <dt className="font-display text-[1.0625rem] font-medium leading-snug text-navy">
              <span className="mono mr-2 text-meta text-brass-700">{note.k}.</span>
              {note.title}
            </dt>
            <dd className="mt-1.5 text-caption text-ink">{note.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
