import { RESEARCH_ILLUSTRATION } from '@/content/marketing';
import { LiveFigure, Typed, keepDates, typedMs, useFigurePlay } from './illustrationKit';
import './research-illustration.css';

// Executive Analysis: a question put to the record, answered with the records behind it, then a
// follow-up that the record answers only in part, with the plain statement of what was not found.
// The first question is typed; its answer appears in turn; the follow-up is typed once the answer
// has settled, and its answer appears in turn after it.
//
// The sequence, at the kit's rhythm (live-figure.css): the question types (the kit's 240, then 34
// characters a second); after the kit's wait of 320 the answer's label and its two findings take a
// turn of 380 each, and the follow-up's label takes the fourth. The follow-up then types, starting
// 200 after that label's turn; its answer and the statement of what was not found take a turn of
// 380 each after the kit's wait, the last settling 420 later; the duration adds 300.
const R = RESEARCH_ILLUSTRATION;
const FIRST_MS = typedMs(R.question);
export const FOLLOW_UP_DELAY = FIRST_MS + 320 + 3 * 380 + 200;
const SECOND_MS = typedMs(R.followUp, { delay: FOLLOW_UP_DELAY });
export const RESEARCH_DURATION = SECOND_MS + 320 + 380 + 420 + 300;

const Source = ({ source }) => <p className="text-small text-graphite">{source.document}, {keepDates(source.date)}</p>;

export const ResearchIllustration = ({ id = 'research-illustration', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: RESEARCH_DURATION });
  return (
    <LiveFigure id={id} className="research-illustration" title={R.title} caption={R.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--typed-ms': `${FIRST_MS}ms` }}>
      <p className="live-mode">{R.mode}</p>
      <p className="live-prompt">
        <span className="live-prompt-label">{R.questionLabel}</span>
        <Typed className="live-prompt-line" text={R.question} play={play} />
      </p>
      <div className="live-output">
        <h4 className="live-output-label" data-appear style={{ '--i': 0 }}>{R.findingsLabel}</h4>
        <ol className="research-findings" role="list">
          {R.findings.map((finding, i) => (
            <li key={R.sources[i].id} className="on-paper" data-appear style={{ '--i': i + 1 }}>
              <p className="text-body">{keepDates(finding)}</p>
              <Source source={R.sources[i]} />
            </li>
          ))}
        </ol>
      </div>
      {/* The follow-up: its label takes the answer's next turn; its answer waits for its typing. */}
      <p className="live-prompt research-follow-up">
        <span className="live-prompt-label" data-appear style={{ '--i': R.findings.length + 1 }}>{R.followUpLabel}</span>
        <Typed className="live-prompt-line" text={R.followUp} play={play} delay={FOLLOW_UP_DELAY} />
      </p>
      <div className="live-output" style={{ '--typed-ms': `${SECOND_MS}ms` }}>
        <ol className="research-findings" role="list">
          <li className="on-paper" data-appear style={{ '--i': 0 }}>
            <p className="text-body">{keepDates(R.followUpFinding)}</p>
            <Source source={R.followUpSource} />
          </li>
        </ol>
        <p className="research-gap text-small" data-appear style={{ '--i': 1 }}>{R.gap}</p>
      </div>
    </LiveFigure>
  );
};
