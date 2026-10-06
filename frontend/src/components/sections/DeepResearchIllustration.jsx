import { DEEP_RESEARCH_ILLUSTRATION } from '@/content/marketing';
import { LiveFigure, Typed, keepDates, typedMs, useFigurePlay } from './illustrationKit';
import './deep-research-illustration.css';

// Deep Research: one question, typed; then the report, as paper: its research angles, a section
// whose sentences each carry a superscript reference, and the evidence appendix those references
// point to; then the bundle built from that evidence, as downloaded: its title, its cover page and
// its contents in order. The bundle is an output, so it is shown as the downloaded bundle reads,
// not as the controls that build it, and the references are text, not links.
//
// The sequence, at the kit's rhythm (live-figure.css): the question types (the kit's 240, then 34
// characters a second); after the kit's wait of 320 the report's six parts take a turn of 420 each
// (label, title, angles, section, appendix, bundle), the bundle settling 420 after its turn; the
// duration adds 300.
const D = DEEP_RESEARCH_ILLUSTRATION;
const TYPED_MS = typedMs(D.question);
const STEP = 420;
export const DEEP_RESEARCH_PARTS = 6;
export const DEEP_RESEARCH_DURATION = TYPED_MS + 320 + (DEEP_RESEARCH_PARTS - 1) * STEP + 420 + 300;

export const DeepResearchIllustration = ({ id = 'deep-research-illustration', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: DEEP_RESEARCH_DURATION });
  return (
    <LiveFigure id={id} className="deep-research-illustration" title={D.title} caption={D.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--typed-ms': `${TYPED_MS}ms` }}>
      <p className="live-mode">{D.mode}</p>
      <p className="live-prompt">
        <span className="live-prompt-label">{D.questionLabel}</span>
        <Typed className="live-prompt-line" text={D.question} play={play} />
      </p>
      <div className="live-output deep-stage">
        <h4 className="live-output-label" data-appear style={{ '--i': 0 }}>{D.reportLabel}</h4>
        <article className="deep-report on-paper" aria-labelledby={`${id}-report-title`}>
          <p id={`${id}-report-title`} className="deep-report-title" data-appear style={{ '--i': 1 }}>{D.question}</p>
          <div className="deep-part" data-appear style={{ '--i': 2 }}>
            <h5 className="deep-heading">{D.anglesLabel}</h5>
            <ul className="deep-angles" role="list">
              {D.angles.map((angle) => <li key={angle}>{keepDates(angle)}</li>)}
            </ul>
          </div>
          <div className="deep-part" data-appear style={{ '--i': 3 }}>
            <h5 className="deep-heading">{D.sectionHeading}</h5>
            <p className="deep-text">
              {D.sentences.map((sentence, k) => (
                <span key={sentence}>
                  {k > 0 && ' '}
                  {keepDates(sentence)}
                  <sup className="deep-ref">
                    <span className="sr-only">(evidence </span>
                    {k + 1}
                    <span className="sr-only">)</span>
                  </sup>
                </span>
              ))}
            </p>
          </div>
          <div className="deep-part deep-appendix" data-appear style={{ '--i': 4 }}>
            <h5 className="deep-heading">{D.appendixLabel}</h5>
            <ol className="deep-appendix-list" role="list">
              {D.appendix.map((item, k) => (
                <li key={item.id}>
                  <span className="deep-appendix-n" aria-hidden="true">{k + 1}</span>
                  <span className="deep-appendix-entry">
                    <span className="deep-appendix-kind">{item.kind}</span>{' '}
                    <span className="deep-appendix-title">{item.document}</span>, <time dateTime={item.isoDate}>{keepDates(item.date)}</time>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </article>
        {/* The bundle, as downloaded: built from the appendix, its cover page first. */}
        <div className="deep-bundle on-paper" role="group" aria-labelledby={`${id}-bundle-title`} data-appear style={{ '--i': 5 }}>
          <p className="deep-bundle-label text-small text-graphite">{D.bundleLabel}</p>
          <p id={`${id}-bundle-title`} className="deep-bundle-title">{D.bundleTitle}</p>
          <ol className="deep-bundle-list" role="list">
            <li><span className="deep-bundle-tab" aria-hidden="true">1</span>{D.cover}</li>
            {D.appendix.map((item, k) => (
              <li key={item.id}><span className="deep-bundle-tab" aria-hidden="true">{k + 2}</span>{item.document}, {keepDates(item.date)}</li>
            ))}
          </ol>
          <p className="deep-bundle-format text-small text-graphite">{D.bundleFormat}</p>
        </div>
      </div>
    </LiveFigure>
  );
};
