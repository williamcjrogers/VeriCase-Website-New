import { FileText } from 'lucide-react';
import { ANALYSIS_EXAMPLE as A } from '@/content/examples';
import { Typed, keepDates, typedMs, useFigurePlay } from '../illustrationKit';
import { AppButton, AppFrame } from './AppFrame';

// Research, Executive Analysis, as a quick chat: the first question types into the user's bubble
// and its answer follows; after a beat the follow-up types, then its answer, its supporting
// evidence, its confidence score (the meter filling once) and the sources behind it. The first
// answer appears 320 after the first question; the follow-up's bubble 620 after that, and it
// starts typing 200 later; the last answer's four parts take a turn of 380 each from 320 after the
// follow-up ends. The duration adds the meter's 900 fill and 300.
const [FIRST, SECOND] = A.turns;
const FIRST_MS = typedMs(FIRST.question);
const SECOND_DELAY = FIRST_MS + 320 + 820;
const SECOND_MS = typedMs(SECOND.question, { delay: SECOND_DELAY });
export const ANALYSIS_DURATION = SECOND_MS + 320 + 3 * 380 + 900 + 300;

export const AnalysisExample = ({ id = 'analysis-example', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: ANALYSIS_DURATION });
  // The last answer's parts wait for the follow-up, measured from the first question's end.
  const later = (i) => ({ '--i': i, '--after': `${SECOND_MS - FIRST_MS + 320}ms` });
  return (
    <AppFrame id={id} className="analysis-example" title={A.title} view={A.view} caption={A.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--typed-ms': `${FIRST_MS}ms` }}>
      <div className="chat-head">
        <p className="app-h">{A.mode}</p>
        <p className="app-quiet" style={{ margin: 0 }}>{A.scope}</p>
      </div>
      <ol className="chat-log" role="list">
        <li className="chat-ask">
          <span className="sr-only">Question: </span>
          <Typed text={FIRST.question} play={play} />
        </li>
        <li className="chat-answer app-card" data-appear style={{ '--i': 0 }}>
          <span className="sr-only">Answer: </span>
          <p>{keepDates(FIRST.answer)}</p>
        </li>
        <li className="chat-ask" data-appear style={{ '--i': 0, '--after': '940ms' }}>
          <span className="sr-only">Question: </span>
          <Typed text={SECOND.question} play={play} delay={SECOND_DELAY} />
        </li>
        <li className="chat-answer app-card" data-appear style={later(0)}>
          <span className="sr-only">Answer: </span>
          <p>{keepDates(SECOND.answer)}</p>
          <div className="chat-part" data-appear style={later(1)}>
            <span className="app-label">{A.evidenceLabel}</span>
            <ul className="chat-evidence">
              {A.evidence.map((e) => <li key={e}>{keepDates(e)}</li>)}
            </ul>
          </div>
          <div className="chat-part" data-appear style={later(2)}>
            <span className="app-label">{A.confidenceLabel}</span>
            <div className="chat-score">
              <span className="chat-score-value">{A.confidence}/100</span>
              <span className="chat-meter" aria-hidden="true"><span style={{ width: `${A.confidence}%` }} /></span>
            </div>
            <p className="chat-score-note">{A.confidenceNote}</p>
          </div>
          <div className="chat-sources" data-appear style={later(3)}>
            <AppButton icon={FileText}>{A.sources}</AppButton>
          </div>
        </li>
      </ol>
    </AppFrame>
  );
};
