import { EVIDENCE_ILLUSTRATION, RESEARCH_ILLUSTRATION } from '@/content/marketing';
import { LiveFigure, Typed, keepDates, useFigurePlay, useTypewriter } from './illustrationKit';
import './research-illustration.css';

// Research: the question is typed in front of the reader; the findings then appear in turn, each
// with the record behind it, and last the plain statement of what was not found. Two copies (in
// place and in the phone disclosure) share one performance through `play`.
export const RESEARCH_DURATION = 4600;

export const ResearchIllustration = ({ id = 'research-illustration', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: RESEARCH_DURATION });
  const R = RESEARCH_ILLUSTRATION;
  const { ms } = useTypewriter(R.question, play);
  return (
    <LiveFigure id={id} className="research-illustration" title={R.title} caption={R.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--typed-ms': `${ms}ms` }}>
      <p className="live-prompt">
        <span className="live-prompt-label">{R.questionLabel}</span>
        <Typed className="live-prompt-line" text={R.question} play={play} />
      </p>
      <div className="live-output">
        <h4 className="live-output-label" data-appear style={{ '--i': 0 }}>{R.findingsLabel}</h4>
        <ol className="research-findings">
          {R.findings.map((finding, i) => (
            <li key={EVIDENCE_ILLUSTRATION[i].id} className="on-paper" data-appear style={{ '--i': i + 1 }}>
              <p className="text-body">{keepDates(finding)}</p>
              <p className="text-small text-graphite">{EVIDENCE_ILLUSTRATION[i].document}, {keepDates(EVIDENCE_ILLUSTRATION[i].date)}</p>
            </li>
          ))}
        </ol>
        <p className="research-gap text-small" data-appear style={{ '--i': R.findings.length + 1 }}>{R.gap}</p>
      </div>
    </LiveFigure>
  );
};
