import { Download, Eye, Package } from 'lucide-react';
import { REPORT_EXAMPLE as R } from '@/content/examples';
import { Typed, keepDates, typedMs, useFigurePlay } from '../illustrationKit';
import { AppButton, AppFrame, Badge } from './AppFrame';

const ACTION_ICONS = [Download, Eye, Package];

// Research, Deep Research: the question types; its checks follow as tiles (sources cited,
// evidence analysed, validation), then the actions, then the report as a sheet. After the kit's
// wait of 320 the tiles, the actions and the sheet take a turn of 420 each, the last settling 420
// later; the duration adds 300.
const TYPED_MS = typedMs(R.question);
export const REPORT_DURATION = TYPED_MS + 320 + 2 * 420 + 420 + 300;

export const ReportExample = ({ id = 'report-example', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: REPORT_DURATION });
  return (
    <AppFrame id={id} className="report-example" title={R.title} view={R.view} caption={R.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--typed-ms': `${TYPED_MS}ms`, '--step': '420ms' }}>
      <Badge tone="azure">{R.mode}</Badge>
      <p className="report-question"><span className="sr-only">Question: </span><Typed text={R.question} play={play} /></p>
      <dl className="report-stats" data-appear style={{ '--i': 0, '--step': '420ms' }}>
        {R.stats.map((s) => (
          <div key={s.label} className="report-stat app-card">
            <dt>{s.label}</dt>
            <dd>{s.badge ? <Badge tone="good">{s.value}</Badge> : s.value}</dd>
          </div>
        ))}
      </dl>
      <p className="report-actions app-row" data-appear style={{ '--i': 1, '--step': '420ms', margin: '0.875rem 0 0' }}>
        {R.actions.map((a, k) => <AppButton key={a} icon={ACTION_ICONS[k]} primary={k === 0}>{a}</AppButton>)}
      </p>
      <article className="report-sheet app-card" aria-labelledby={`${id}-sheet`} data-appear style={{ '--i': 2, '--step': '420ms' }}>
        <h4 id={`${id}-sheet`} className="report-sheet-title">{R.reportTitle}: {R.question}</h4>
        <h5>{R.summaryHeading}</h5>
        <p>{keepDates(R.summary)}</p>
        <h5>{R.anglesHeading}</h5>
        <ul>
          {R.angles.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </article>
    </AppFrame>
  );
};
