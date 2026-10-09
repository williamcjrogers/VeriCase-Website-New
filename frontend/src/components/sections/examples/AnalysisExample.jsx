import { FileText } from 'lucide-react';
import { ANALYSIS_EXAMPLE as A } from '@/content/examples';
import { Typed, keepDates, typedMs, useFigurePlay } from '../illustrationKit';
import { AppButton, AppFrame } from './AppFrame';

// Research, Executive Analysis: the question types into the user's bubble; the answer follows,
// then its supporting evidence, its confidence score (the meter filling once) and the sources
// behind it. After the kit's wait of 320 the four parts take a turn of 380 each, the last settling
// 420 later; the duration adds 300 (and the meter's 900 fill sits inside it).
const TYPED_MS = typedMs(A.question);
export const ANALYSIS_DURATION = TYPED_MS + 320 + 3 * 380 + 900 + 300;

export const AnalysisExample = ({ id = 'analysis-example', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: ANALYSIS_DURATION });
  return (
    <AppFrame id={id} className="analysis-example" title={A.title} view={A.view} caption={A.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--typed-ms': `${TYPED_MS}ms` }}>
      <div className="chat-head">
        <p className="app-h">{A.mode}</p>
        <p className="app-quiet" style={{ margin: 0 }}>{A.scope}</p>
      </div>
      <ol className="chat-log" role="list">
        <li className="chat-ask">
          <span className="sr-only">Question: </span>
          <Typed text={A.question} play={play} />
        </li>
        <li className="chat-answer app-card">
          <span className="sr-only">Answer: </span>
          <p data-appear style={{ '--i': 0 }}>{keepDates(A.answer)}</p>
          <div className="chat-part" data-appear style={{ '--i': 1 }}>
            <span className="app-label">{A.evidenceLabel}</span>
            <ul className="chat-evidence">
              {A.evidence.map((e) => <li key={e}>{keepDates(e)}</li>)}
            </ul>
          </div>
          <div className="chat-part" data-appear style={{ '--i': 2 }}>
            <span className="app-label">{A.confidenceLabel}</span>
            <div className="chat-score">
              <span className="chat-score-value">{A.confidence}/100</span>
              <span className="chat-meter" aria-hidden="true"><span style={{ width: `${A.confidence}%` }} /></span>
            </div>
            <p className="chat-score-note">{A.confidenceNote}</p>
          </div>
          <div className="chat-sources" data-appear style={{ '--i': 3 }}>
            <AppButton icon={FileText}>{A.sources}</AppButton>
          </div>
        </li>
      </ol>
    </AppFrame>
  );
};
