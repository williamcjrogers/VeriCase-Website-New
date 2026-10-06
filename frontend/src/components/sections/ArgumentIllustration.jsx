import { Fragment } from 'react';
import { ARGUMENT_ILLUSTRATION } from '@/content/marketing';
import { LiveFigure, keepDates, useFigurePlay } from './illustrationKit';
import './argument-illustration.css';

// Argument: nothing is typed. The user's own drafted points, each citing its record, appear as a
// page of paper; then, in turn, each citation is marked in brass as the record it cites arrives
// beside it with a brass rule drawn down its edge. The marks and the rules stay. Two copies (in
// place and in the phone disclosure) share one performance through `play`.
//
// The sequence, in ms from the start (argument-illustration.css sets the rhythm): the page at
// 160, the records label at 960, then one turn of 800 for each record: its citation is marked,
// its slip appears 160 later and its rule is drawn from 280 to 760. The last rule is drawn by
// 160 + 4 * 800 + 760 = 4120; the duration adds 300.
export const ARGUMENT_DURATION = 4420;

// Turns 0 and 1 are the page and the records label; record k takes turn k + 2, and its citation
// in the page carries the same turn so the two are marked together.
const turn = (k) => k + 2;

export const ArgumentIllustration = ({ id = 'argument-illustration', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: ARGUMENT_DURATION });
  const A = ARGUMENT_ILLUSTRATION;
  return (
    <LiveFigure id={id} className="argument-illustration" title={A.title} caption={A.caption} play={play} playClass={playClass} figureRef={ref}>
      <div className="argument-stage">
        <p className="argument-page on-paper" data-appear style={{ '--i': 0 }}>
          {A.points.map((point, k) => (
            <Fragment key={A.sources[k].id}>
              {k > 0 && ' '}
              {keepDates(point)}{' '}
              <span className="argument-cite" style={{ '--i': turn(k) }}>({A.sources[k].document})</span>.
            </Fragment>
          ))}
        </p>
        <h4 className="live-output-label argument-records-label" data-appear style={{ '--i': 1 }}>{A.sourcesLabel}</h4>
        <ol className="argument-records" role="list">
          {A.sources.map((source, k) => (
            <li key={source.id} className="argument-record on-paper" data-appear style={{ '--i': turn(k) }}>
              <blockquote className="argument-quote">
                <p className="text-body">“{keepDates(source.excerpt)}”</p>
              </blockquote>
              <p className="argument-attribution text-small text-graphite">{source.document}, {keepDates(source.date)}</p>
            </li>
          ))}
        </ol>
      </div>
    </LiveFigure>
  );
};
