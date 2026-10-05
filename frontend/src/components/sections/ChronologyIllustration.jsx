import { CHRONOLOGY_ILLUSTRATION, EVIDENCE_ILLUSTRATION, ILLUSTRATION_LABEL } from '@/content/marketing';
import { cn } from '@/lib/utils';
import { useFigurePlay } from './illustrationKit';

// In running text a date is never split across lines ("03 March 2025").
const keepDates = (text) => text.replace(/(\d{2}) ([A-Z][a-z]+) (\d{4})/g, '$1\u00a0$2\u00a0$3');
// In the chronology's narrow column only the day and month stay together, so that with larger text
// the year can move to the next line instead of being cut off.
const keepDayMonth = (text) => text.replace(/(\d{2}) ([A-Z][a-z]+) (\d{4})/g, '$1\u00a0$2 $3');

// The performance lasts this long; the section that mounts two copies shares one play of it.
export const CHRONOLOGY_DURATION = 2500;

const DocumentIcon = () => (
  <svg className="evidence-flow-icon" width="22" height="28" viewBox="0 0 26 32" fill="none" aria-hidden="true">
    <path d="M1 1h16l8 8v22H1zM17 1v8h8M6 15h14M6 20h14M6 25h9" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

// Each document beside one ruled record. Once in view, in date order, an arrow is drawn from each
// document to its dated entry, and the entry is marked on the record. The record stays drawn.
export const ChronologyIllustration = ({ id = 'chronology-illustration', play }) => {
  const [ref, playClass] = useFigurePlay(play);
  return (
    <figure className={cn('evidence-figure chronology-illustration', playClass)} aria-labelledby={`${id}-title`}>
      <div className="evidence-flow-head">
        <div>
          <p className="section-kicker">{ILLUSTRATION_LABEL}</p>
          <h3 id={`${id}-title`} className="evidence-figure-title text-[1.625rem] leading-tight">{CHRONOLOGY_ILLUSTRATION.title}</h3>
        </div>
        <h4 className="capability-feature-title">{CHRONOLOGY_ILLUSTRATION.recordLabel}</h4>
      </div>
      <ol ref={ref} className="evidence-flow">
        {EVIDENCE_ILLUSTRATION.map((source, i) => (
          <li key={source.id} style={{ '--i': i }}>
            <div className="evidence-flow-doc">
              <DocumentIcon />
              <p className="capability-feature-title text-navy">{source.document}</p>
            </div>
            <svg className="evidence-flow-arrow draw-x" width="28" height="12" viewBox="0 0 28 12" fill="none" aria-hidden="true">
              <path d="M0 6h26m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <div className="evidence-flow-entry">
              <time className="text-small text-graphite" dateTime={source.isoDate}>{keepDayMonth(source.date)}</time>
              <p className="capability-feature-title text-navy">{source.title}</p>
            </div>
          </li>
        ))}
      </ol>
      <figcaption>{CHRONOLOGY_ILLUSTRATION.caption}</figcaption>
    </figure>
  );
};

