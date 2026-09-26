import { useEffect, useRef } from 'react';
import { DAY_GRID } from '@/content/matter/caseroom';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';
import '@/components/caseroom/daygrid.css';

const MARKED = new Set(DAY_GRID.markers.map((m) => m.day));
const DAYS = Array.from({ length: 28 }, (_, i) => i + 1);
const EXTENSION = Array.from({ length: 14 }, (_, i) => i + 29);
// Each newly reached day fills 30 ms after the one before it.
const STEP_MS = 30;
// "Day 14 · 03 February 2026": the day and the date (joined by formatDate's no-break spaces) never
// break inside, and a line never starts with the middle dot.
const when = (m) => `Day\u00a0${m.day}\u00a0· ${formatDate(m.date)}`;

// Fig. 7, drawn: the 28 days from referral as four weeks of cells after a brass Day 0 marker,
// the key dates of the fictional timetable, and the extension to Day 42 in dashed outline. Cells
// fill in brass up to the station the reader has reached, in order, and never empty again. The
// drawing is decorative: the figure's text equivalent is a list in the chapter itself.
export const DayGrid = ({ reached }) => {
  const filled = useRef(reached);
  const from = filled.current;
  useEffect(() => {
    filled.current = reached;
  }, [reached]);

  return (
    <div className="cr-grid" aria-hidden="true">
      <div className="cr-days">
        <span className="cr-day0">0</span>
        {DAYS.map((d) => (
          <span
            key={d}
            className="cr-cell"
            data-on={d <= reached ? '' : undefined}
            data-n={MARKED.has(d) ? d : undefined}
            style={{ '--d': `${d > from && d <= reached ? (d - from - 1) * STEP_MS : 0}ms` }}
          >
            {MARKED.has(d) ? d : null}
          </span>
        ))}
      </div>
      <ul className="cr-legend">
        {DAY_GRID.markers.map((m) => (
          <li key={m.day} className={cn('cr-legend-item', m.day <= reached && 'is-on')}>
            <span className="cr-legend-when">{when(m)}</span>
            <span className="cr-legend-what">{m.label}</span>
          </li>
        ))}
      </ul>
      <div className="cr-days is-extension">
        {EXTENSION.map((d) => (
          <span key={d} className="cr-cell is-dashed">
            {d === EXTENSION[0] || d === EXTENSION[EXTENSION.length - 1] ? d : null}
          </span>
        ))}
      </div>
    </div>
  );
};

// Loaded lazily by its chapter (React.lazy needs a default export).
export default DayGrid;
