import { MATTER_RECORDS, READER_ILLUSTRATION } from '@/content/marketing';
import { cn } from '@/lib/utils';
import { LiveFigure, Typed, keepDates, useFigurePlay, useTypewriter } from './illustrationKit';
import './reader-illustration.css';

// The opening illustration: a document read beside its file record (product reference PR-03),
// drawn as a plate in an expert's report and laid on the ink panel as paper. In the margins, in
// brass italic, four notes name what each part is, each joined by a hairline leader to the part it
// names. Nothing is a control. The find term is typed after "Find in document:" in front of the
// reader; the passage is then marked in the page from left to right, the sideline rises beside it,
// the leader draws out from the sideline and its note appears at the end of it. Reduced motion,
// print and pages without the script show the page marked and annotated.
//
// The sequence, in ms from the start (reader-illustration.css sets the rhythm): the find term
// types for T = 829 (the kit's 240, then twenty characters at 34 a second); the mark is drawn from
// T + 300 to T + 950; the sideline rises from T + 950 to T + 1210; the leader draws from T + 1200
// to T + 1620; the note appears from T + 1500 to T + 1920. The duration adds 300.
export const READER_DURATION = 3050;

// A marginal note, in reading order directly after the part it names. `joined` notes continue a
// run or a sideline, so they end without a dot of their own.
const Note = ({ side, joined, children }) => (
  <span className={cn('reader-note', `reader-note-${side}`, joined && 'reader-note-joined')}>{children}</span>
);

export const ReaderIllustration = ({ id = 'reader-illustration', play: shared }) => {
  // The moment starts when the page itself is all but wholly in view, not when the figure's top edge is.
  const [ref, playClass, play] = useFigurePlay(shared, { threshold: 0.95, duration: READER_DURATION });
  const R = READER_ILLUSTRATION;
  const selected = MATTER_RECORDS[R.selected];
  const { ms } = useTypewriter(R.findTerm, play);
  return (
    // A paragraph names the figure, not a heading: it sits directly under the h1 and takes its name from it.
    <LiveFigure id={id} className="reader-illustration" title={R.title} caption={R.caption} play={play} playClass={playClass} titleTag="p" style={{ '--typed-ms': `${ms}ms` }}>
      <div className="reader-plate on-paper">
        <div className="reader-records">
          <p className="reader-records-label" aria-hidden="true">{R.recordsLabel}</p>
          <ol className="reader-list" aria-label={R.recordsName}>
            {MATTER_RECORDS.map((record, i) => (
              <li
                key={record.document}
                className={cn('reader-row', i === R.selected && 'is-selected', (i > R.selected || i < R.selected - 2) && 'reader-row-far')}
                aria-current={i === R.selected ? 'true' : undefined}
              >
                <span className="reader-row-name">{record.document}</span>
                <span className="reader-row-meta">
                  <time dateTime={record.isoDate}>{keepDates(record.date)}</time>
                  <span className="reader-row-folder">{record.folder}</span>
                </span>
                {i === R.selected && <Note side="left">{R.notes.selected}</Note>}
              </li>
            ))}
          </ol>
        </div>
        <div className="reader-pane">
          <div className="reader-head">
            <p className="reader-doc-title">{selected.document}</p>
            <div className="reader-reach">
              <dl className="reader-details">
                {R.details.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{keepDates(value)}</dd></div>)}
              </dl>
              <span className="reader-run" aria-hidden="true" />
              <Note side="right" joined>{R.notes.details}</Note>
            </div>
          </div>
          {/* The reader's views, as type with the current one in ink, then the find term, typed. */}
          <div className="reader-strip">
            <p className="reader-views"><span className="sr-only">Views: </span>{R.views.map((view, i) => <span key={view} className={cn(i === 0 && 'is-current')}>{view}</span>)}</p>
            <p className="reader-find">
              <span className="reader-find-input">{R.findLabel}: <span className="reader-find-field"><Typed className="reader-find-term" text={R.findTerm} play={play} /></span></span>
              <span className="reader-find-page">{R.page.replace(/ /g, ' ')}</span>
            </p>
          </div>
          <div className="reader-desk">
            <div ref={ref} className="reader-page" role="group" aria-label={`${selected.document}, original page`}>
              <Note side="right">{R.notes.page}</Note>
              <dl className="reader-mailhead">
                {R.email.header.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{keepDates(value)}</dd></div>)}
              </dl>
              <p className="reader-body">
                {keepDates(R.email.before)}
                <mark className="reader-found">{R.email.found}</mark>
                {/* A sideline in the page's margin, level with the marked line; its note, the answer, appears
                    at the end of the leader and is read out below. */}
                <span className="reader-pin" aria-hidden="true"><Note side="right" joined><span className="reader-note-text" data-appear style={{ '--i': 0 }}>{R.notes.found}</span></Note></span>
                {keepDates(R.email.after)}
              </p>
              {/* Read out in place of the sideline's note; on phones it is the note, shown below the text. */}
              <p className="reader-found-note sr-only" data-appear style={{ '--i': 0 }}>{R.notes.found}: “{R.email.found}”.</p>
            </div>
          </div>
        </div>
      </div>
    </LiveFigure>
  );
};
