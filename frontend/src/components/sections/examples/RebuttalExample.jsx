import { Check, FileText, Pencil } from 'lucide-react';
import { REBUTTAL_EXAMPLE as R } from '@/content/examples';
import { keepDates, useFigurePlay } from '../illustrationKit';
import { AppButton, AppFrame, Badge } from './AppFrame';

const ACTION_ICONS = [Check, Pencil];

// Rebuttal: the other side's point, then each record set beside it with how it bears on the point,
// then the proposed reply for review. Nothing is typed: after the kit's wait of 320 each record and
// the reply take a turn of 420, the last settling 420 later; the duration adds 300.
export const REBUTTAL_DURATION = 320 + R.records.length * 420 + 420 + 300;

export const RebuttalExample = ({ id = 'rebuttal-example', play: shared, headingAs = 'h3' }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: REBUTTAL_DURATION });
  return (
    <AppFrame id={id} headingAs={headingAs} className="rebuttal-example" title={R.title} view={R.view} caption={R.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--step': '420ms' }}>
      <div className="rebuttal-point app-card">
        <span className="app-label">{R.documentLabel} · {R.pointLabel}</span>
        <p>{R.point}</p>
      </div>
      <span className="app-label rebuttal-records-label">{R.recordsLabel}</span>
      <ol className="rebuttal-records" role="list">
        {R.records.map((r, k) => (
          <li key={r.title} className="rebuttal-record app-card" data-appear style={{ '--i': k, '--step': '420ms' }}>
            <span className="app-icon-tile"><FileText aria-hidden="true" /></span>
            <div>
              <p className="rebuttal-record-title">{r.title} <span className="app-quiet">{keepDates(r.date)}</span></p>
              <p className="rebuttal-record-text">{r.text}</p>
            </div>
            <Badge tone={r.tone}>{r.relation}</Badge>
          </li>
        ))}
      </ol>
      <div className="rebuttal-reply app-card" data-appear style={{ '--i': R.records.length, '--step': '420ms' }}>
        <span className="app-label">{R.replyLabel}</span>
        <p>{keepDates(R.reply)}</p>
        <div className="rebuttal-reply-foot">
          <span className="app-quiet">{R.review}</span>
          <span className="app-row">{R.actions.map((a, k) => <AppButton key={a} icon={ACTION_ICONS[k]} primary={k === 0}>{a}</AppButton>)}</span>
        </div>
      </div>
    </AppFrame>
  );
};
