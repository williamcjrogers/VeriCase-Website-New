import { ILLUSTRATION_LABEL, MATTER_RECORDS, READER_ILLUSTRATION } from '@/content/marketing';
import { cn } from '@/lib/utils';
import { useFigurePlay } from './EvidenceIllustrations';
import './reader-illustration.css';

// The opening illustration: a document read beside its file record (product reference PR-03),
// drawn as a figure in an expert's report. The workspace is a quiet line drawing in the page's
// own type; over it, in brass italic, four marginal notes name what each part is, each joined by a
// hairline leader to the part it names. Nothing is a control. Once the figure is in view the
// passage found in the document is marked once (see reader-illustration.css); reduced motion,
// print and pages without JavaScript show it marked.

const keepDates = (text) => text.replace(/(\d{2}) ([A-Z][a-z]+) (\d{4})/g, '$1 $2 $3');

// A marginal note, in reading order directly after the part it names. `joined` notes continue a
// run or a sideline, so they end without a dot of their own.
const Note = ({ side, joined, hidden, children }) => (
  <span className={cn('reader-note', `reader-note-${side}`, joined && 'reader-note-joined')} aria-hidden={hidden || undefined}>{children}</span>
);

export const ReaderIllustration = ({ id = 'reader-illustration' }) => {
  const [ref, playClass] = useFigurePlay();
  const R = READER_ILLUSTRATION;
  const selected = MATTER_RECORDS[R.selected];
  return (
    <figure ref={ref} className={cn('evidence-figure reader-illustration', playClass)} aria-labelledby={`${id}-title`}>
      <p className="section-kicker">{ILLUSTRATION_LABEL}</p>
      {/* A paragraph, not a heading: the figure sits directly under the h1 and takes its name from it. */}
      <p id={`${id}-title`} className="evidence-figure-title font-display text-[1.625rem] leading-tight">{R.title}</p>
      <div className="reader-plate">
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
          {/* The reader's views, as type: the current one in ink, the rest in graphite. */}
          <p className="reader-views"><span className="sr-only">Views: </span>{R.views.map((view, i) => <span key={view} className={cn(i === 0 && 'is-current')}>{view}</span>)}</p>
          <div className="reader-desk">
            <p className="reader-find">
              <span>{R.findLabel}: <span className="reader-find-term">{R.findTerm}</span></span>
              <span className="reader-find-page">{R.page.replace(/ /g, ' ')}</span>
            </p>
            <div className="reader-page" role="group" aria-label={`${selected.document}, original page`}>
              <Note side="right">{R.notes.page}</Note>
              <dl className="reader-mailhead">
                {R.email.header.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{keepDates(value)}</dd></div>)}
              </dl>
              <p className="reader-body">
                {keepDates(R.email.before)}
                <mark className="reader-found">{R.email.found}</mark>
                {/* A sideline in the page's margin, level with the marked line; its note is read out below. */}
                <span className="reader-pin" aria-hidden="true"><Note side="right" joined>{R.notes.found}</Note></span>
                {keepDates(R.email.after)}
              </p>
              {/* Read out in place of the sideline's note; on phones it is the note, shown below the text. */}
              <p className="reader-found-note sr-only">{R.notes.found}: “{R.email.found}”.</p>
            </div>
          </div>
        </div>
      </div>
      <figcaption>{R.caption}</figcaption>
    </figure>
  );
};
