import { ACTIVITY_EXAMPLE as L } from '@/content/examples';
import { useFigurePlay } from '../illustrationKit';
import { AppFrame, Badge } from './AppFrame';

// Activity Log: who did what, and when, row by row. After the kit's wait of 320 each row takes a
// turn of 300, the last settling 420 later; the duration adds 300.
export const ACTIVITY_DURATION = 320 + (L.rows.length - 1) * 300 + 420 + 300;

export const ActivityExample = ({ id = 'activity-example', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: ACTIVITY_DURATION });
  return (
    <AppFrame id={id} className="activity-example" title={L.title} view={L.view} caption={L.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--step': '300ms' }}>
      <h4 className="app-h">{L.heading}</h4>
      <p className="app-quiet" style={{ margin: '0.125rem 0 0' }}>{L.intro}</p>
      <div className="activity-wrap" style={{ marginTop: '0.875rem' }}>
        <table className="activity-table" style={{ marginTop: 0 }}>
          <thead>
            <tr>{L.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
          </thead>
          <tbody>
            {L.rows.map((r, k) => (
              <tr key={r.activity} data-appear style={{ '--i': k }}>
                <td>{r.activity}</td>
                <td><Badge>{r.type}</Badge></td>
                <td className="activity-when">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppFrame>
  );
};
