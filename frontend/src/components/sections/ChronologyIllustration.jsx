import { CHRONOLOGY_ILLUSTRATION } from '@/content/marketing';
import { LiveFigure, keepDates, useFigurePlay } from './illustrationKit';
import './chronology-illustration.css';

// From documents to chronology: nothing is typed (documents are not typed), so the figure plays
// as soon as it is seen. The three documents land on the panel one by one, as paper; the record
// then opens (its label, and its brass rule drawn down); and in date order an arrow is drawn from
// each document to its dated entry, which appears and is marked on the rule. Two copies (in place
// and in the phone disclosure) share one performance through `play`.
//
// The timeline lives in chronology-illustration.css (--chronology-arrow, --chronology-entry and
// --chronology-turn): the last entry settles at 1950 + 320 + 2 x 720 + 420 = 4130ms, and the
// performance ends 300ms later. ChronologyIllustration.test.jsx reads the stylesheet and holds the
// two in step.
export const CHRONOLOGY_DURATION = 4430;

const DocumentIcon = () => (
  <svg className="chronology-doc-icon" width="22" height="28" viewBox="0 0 26 32" fill="none" aria-hidden="true">
    <path d="M1 1h16l8 8v22H1zM17 1v8h8M6 15h14M6 20h14M6 25h9" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export const ChronologyIllustration = ({ id = 'chronology-illustration', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: CHRONOLOGY_DURATION });
  const C = CHRONOLOGY_ILLUSTRATION;
  return (
    <LiveFigure id={id} className="chronology-illustration" title={C.title} caption={C.caption} play={play} playClass={playClass} figureRef={ref}>
      <div className="chronology-head">
        <h4 id={`${id}-record`} className="live-output-label chronology-record-label" data-appear style={{ '--i': 0 }}>{C.recordLabel}</h4>
      </div>
      {/* The list is restyled (no markers), so its role is explicit; the record's label names it. */}
      <ol className="chronology-flow" role="list" aria-labelledby={`${id}-record`}>
        {C.sources.map((source, i) => (
          // --i on the item gives its document, arrow, node and entry their turn.
          <li key={source.id} style={{ '--i': i }}>
            <div className="chronology-doc on-paper" data-appear>
              <DocumentIcon />
              <p className="chronology-doc-name text-navy">{source.document}</p>
            </div>
            <span className="chronology-arrow" aria-hidden="true"><span className="chronology-arrow-shaft" /><span className="chronology-arrow-head" /></span>
            <div className="chronology-entry">
              <div className="chronology-entry-text" data-appear>
                <time className="chronology-date text-small text-graphite" dateTime={source.isoDate}>{keepDates(source.date)}</time>
                <p className="chronology-entry-title">{source.title}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </LiveFigure>
  );
};
