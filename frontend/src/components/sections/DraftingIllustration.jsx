import { DRAFTING_ILLUSTRATION, EVIDENCE_ILLUSTRATION } from '@/content/marketing';
import { LiveFigure, Typed, keepDates, useFigurePlay, useTypewriter } from './illustrationKit';
import './drafting-illustration.css';

// Drafting: the section heading is typed in front of the reader; a blank page then lies on the
// panel and the section is written onto it one numbered paragraph at a time, each paragraph's
// record cited a beat later in the margin beside it; last, the status of the draft beneath the
// page. Two copies (in place and in the phone disclosure) share one performance through `play`.
//
// The sequence, in ms from the start (drafting-illustration.css sets the rhythm): the heading
// types for --typed-ms (976 at the kit's rate, for 25 characters); the page and the margin's
// label appear at +320; then one turn of 640 for each paragraph, its record arriving 240 later;
// then the status line, in the turn after the last paragraph. Each part settles 420 after it
// starts, so the last settles at 976 + 320 + 4 * 640 + 420 = 4276; the duration adds 300.
export const DRAFTING_DURATION = 4576;

// The prompt's label; the heading typed under it is the section's heading from the content file.
export const HEADING_LABEL = 'Section heading';

// Turn 0 is the page and the margin's label; paragraph k and its record take turn k + 1; the
// status line takes the turn after the last paragraph.
const turn = (k) => k + 1;

export const DraftingIllustration = ({ id = 'drafting-illustration', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: DRAFTING_DURATION });
  const D = DRAFTING_ILLUSTRATION;
  const { ms } = useTypewriter(D.sectionLabel, play);
  return (
    <LiveFigure id={id} className="drafting-illustration" title={D.title} caption={D.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--typed-ms': `${ms}ms` }}>
      <p className="live-prompt">
        <span className="live-prompt-label">{HEADING_LABEL}</span>
        <Typed className="live-prompt-line" text={D.sectionLabel} play={play} />
      </p>
      <div className="live-output drafting-output">
        {/* A column label over the margin, not a heading: every paragraph already names its record. */}
        <p className="live-output-label drafting-record-label" aria-hidden="true" data-appear style={{ '--i': 0 }}>{D.recordsLabel}</p>
        {/* The page: paper under the paragraphs, which are written onto it in turn. */}
        <div className="drafting-page on-paper" aria-hidden="true" data-appear style={{ '--i': 0 }} />
        <ol className="drafting-paragraphs" role="list">
          {D.paragraphs.map((paragraph, k) => (
            <li key={paragraph.n} className="drafting-paragraph">
              <p className="drafting-text" data-appear style={{ '--i': turn(k) }}>
                <span className="drafting-n">{paragraph.n}</span>{' '}
                <span className="drafting-body">{keepDates(paragraph.text)}</span>
              </p>
              <p className="drafting-record" data-appear style={{ '--i': turn(k) }}>{EVIDENCE_ILLUSTRATION[k].document}, {keepDates(EVIDENCE_ILLUSTRATION[k].date)}</p>
            </li>
          ))}
        </ol>
        <p className="drafting-status" data-appear style={{ '--i': turn(D.paragraphs.length) }}>{D.status}</p>
      </div>
    </LiveFigure>
  );
};
