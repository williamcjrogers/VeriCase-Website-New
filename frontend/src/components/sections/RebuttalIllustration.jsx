import { EVIDENCE_ILLUSTRATION, REBUTTAL_ILLUSTRATION } from '@/content/marketing';
import { LiveFigure, Typed, keepDates, typedMs, useFigurePlay } from './illustrationKit';
import './rebuttal-illustration.css';

// The opposing account: the assertion is typed in front of the reader, in quotation marks, on the
// left-hand page; the record then answers on the facing page, each quoted record arriving as paper
// with its attribution, and its bearing on the assertion stated in words beneath it; last, the
// proposed reply arrives below as a drafted sheet, marked for review. Relations are stated in
// words, never in colour. The figure is mounted once, inside the phone disclosure that wider
// screens keep open, so `play` is only passed when two copies must share one performance.
//
// The sequence, in ms from the start (rebuttal-illustration.css sets the rhythm): the assertion is
// typed by 2623 (81 characters at the kit's pace); then, 320 later, "The record"; then one turn of
// 480 for each record, its slip first and its relation 240 after it; then the reply's label and,
// 240 after it, the reply. The reply appears at 2623 + 320 + 3 * 480 + 240 = 4623 and has settled
// 420 later, at 5043; the duration adds 300.
export const REBUTTAL_DURATION = 5350;

// Turn 0 is the records label; record k takes turn k + 1 with its relation; the reply takes the
// turn after the last record.
const turn = (k) => k + 1;

export const RebuttalIllustration = ({ id = 'rebuttal-illustration', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: REBUTTAL_DURATION });
  const R = REBUTTAL_ILLUSTRATION;
  const assertion = `“${keepDates(R.assertion)}”`;
  const ms = typedMs(assertion);
  const replyTurn = turn(R.records.length);
  return (
    <LiveFigure id={id} className="rebuttal-illustration" title={R.title} caption={R.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--typed-ms': `${ms}ms` }}>
      <div className="rebuttal-pages">
        <p className="live-prompt rebuttal-assertion">
          <span className="live-prompt-label">{R.assertionLabel}</span>
          <Typed className="live-prompt-line" text={assertion} play={play} />
        </p>
        <div className="live-output rebuttal-records-page">
          <h4 className="live-output-label rebuttal-records-label" data-appear style={{ '--i': 0 }}>{R.recordsLabel}</h4>
          <ol className="rebuttal-records" role="list">
            {R.records.map(({ index, relation }, k) => {
              const source = EVIDENCE_ILLUSTRATION[index];
              return (
                <li key={source.id} className="rebuttal-record">
                  <div className="rebuttal-slip on-paper" data-appear style={{ '--i': turn(k) }}>
                    <blockquote className="rebuttal-quote">
                      <p className="text-body">“{keepDates(source.excerpt)}”</p>
                    </blockquote>
                    <p className="rebuttal-attribution text-small text-graphite">{source.document}, {keepDates(source.date)}</p>
                  </div>
                  <p className="rebuttal-relation" data-appear style={{ '--i': turn(k) }}>{relation}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <div className="live-output rebuttal-reply">
        <h4 className="live-output-label rebuttal-reply-label" data-appear style={{ '--i': replyTurn }}>{R.replyLabel}</h4>
        <p className="rebuttal-reply-page on-paper" data-appear style={{ '--i': replyTurn }}>
          {keepDates(R.reply)}{' '}
          <span className="rebuttal-cite">({EVIDENCE_ILLUSTRATION[R.replySource].document})</span>.
        </p>
      </div>
    </LiveFigure>
  );
};
