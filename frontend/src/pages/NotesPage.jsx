import { SiteHeader } from '@/components/sections/SiteHeader';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { Gated, isShown } from '@/components/editorial/Gated';
import { NoteBody } from '@/components/editorial/NoteBody';
import { NOTES_PAGE, NOTES_SECTION } from '@/content/home';
import { noteByNumber } from '@/content/notes';
import './notes-page.css';

// Notes and sources: the full notes behind the figures on the home page, on a page of their own.
// A marker in the text opens its note in a pop-up and links here (/notes#note-n); each note links
// back to the section that cites it.
export const NotesPage = () => (
  <>
    <SiteHeader />
    <main id="main" tabIndex={-1} className="notes-page bg-parchment outline-none">
      <article className="container py-16 md:py-24">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <div className="double-rule mb-5 max-w-[8rem]" aria-hidden="true" />
            <p className="eyebrow">{NOTES_PAGE.eyebrow}</p>
            <h1 className="mt-4 text-h2 font-medium">{NOTES_PAGE.h1}</h1>
            <p className="mt-6 max-w-measure text-lead text-ink">{NOTES_PAGE.intro}</p>

            {NOTES_PAGE.groups.map((group) => {
              const notes = group.notes.map(noteByNumber).filter((note) => note && isShown(note.gate));
              if (!notes.length) return null;
              return (
                <section key={group.id} className="notes-group" aria-labelledby={`notes-${group.id}-title`}>
                  <p className="notes-group-kicker">{group.kicker}</p>
                  <h2 id={`notes-${group.id}-title`} className="notes-group-title">{group.title}</h2>
                  <ol className="notes-list" role="list">
                    {notes.map((note) => (
                      <li key={note.n} id={`note-${note.n}`} className="notes-item">
                        <span className="notes-n" aria-hidden="true">{note.n}</span>
                        <div className="min-w-0">
                          <p className="sr-only">Note {note.n}.</p>
                          <Gated id={note.gate} block>
                            <h3 className="notes-title">{note.title}</h3>
                            <NoteBody body={note.body} className="notes-body" gap="" />
                          </Gated>
                          <a href={`/#${group.id}`} className="notes-back" aria-label={`${NOTES_SECTION.back}, note ${note.n}`}>
                            {NOTES_SECTION.back}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              );
            })}
          </div>
        </div>
      </article>
    </main>
    <SiteFooter />
  </>
);
