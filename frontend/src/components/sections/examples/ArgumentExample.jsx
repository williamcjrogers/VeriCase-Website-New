import { Fragment } from 'react';
import { FileText } from 'lucide-react';
import { ARGUMENT_EXAMPLE as A } from '@/content/examples';
import { keepDates, useFigurePlay } from '../illustrationKit';
import { AppFrame } from './AppFrame';

// The argument: nothing is typed. The drafted points stand in the sheet, each citing its record;
// then, in turn, each citation is marked as the record it cites arrives beside it. After the kit's
// wait of 320 each record takes a turn of 600, the last settling 420 later; the duration adds 300.
const STEP = 600;
export const ARGUMENT_DURATION = 320 + (A.records.length - 1) * STEP + 420 + 300;

export const ArgumentExample = ({ id = 'argument-example', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: ARGUMENT_DURATION });
  return (
    <AppFrame id={id} className="argument-example" title={A.title} view={A.view} caption={A.caption} play={play} playClass={playClass} figureRef={ref}>
      <div className="argument-grid">
        <div className="argument-sheet app-card">
          <p className="app-h">{A.heading}</p>
          <p className="argument-text">
            {A.points.map((point, k) => (
              <Fragment key={A.records[k].document}>
                {k > 0 && ' '}
                {keepDates(point)}{' '}
                <mark className="app-found argument-cite" style={{ '--i': k, '--step': `${STEP}ms` }}>({A.records[k].document})</mark>.
              </Fragment>
            ))}
          </p>
        </div>
        <div>
          <span className="app-label">{A.recordsLabel}</span>
          <ol className="argument-records" role="list">
            {A.records.map((r, k) => (
              <li key={r.document} className="argument-record app-card" data-appear style={{ '--i': k, '--step': `${STEP}ms` }}>
                <p className="argument-quote">“{keepDates(r.excerpt)}”</p>
                <p className="argument-source app-quiet"><FileText aria-hidden="true" />{r.document}, {keepDates(r.date)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </AppFrame>
  );
};
