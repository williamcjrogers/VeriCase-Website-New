import { Fragment } from 'react';
import { ARGUMENT_ILLUSTRATION, CHRONOLOGY_ILLUSTRATION, EVIDENCE_ILLUSTRATION, ILLUSTRATION_LABEL } from '@/content/marketing';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { cn } from '@/lib/utils';

// Illustrations, not application captures: fictional records set in the page's own type roles, with
// no simulated controls. Each plays one operation once when it comes into view (see clarity.css).
// All text is readable in every frame; reduced motion, print and pages without JavaScript show the
// end state. A section mounts each one twice, in place and inside its phone disclosure, so `id`
// keeps the two titles distinct.

// A date is never split across lines ("03 March 2025").
const keepDates = (text) => text.replace(/(\d{2}) ([A-Z][a-z]+) (\d{4})/g, '$1\u00a0$2\u00a0$3');

const DocumentIcon = () => (
  <svg className="evidence-flow-icon" width="22" height="28" viewBox="0 0 26 32" fill="none" aria-hidden="true">
    <path d="M1 1h16l8 8v22H1zM17 1v8h8M6 15h14M6 20h14M6 25h9" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

// Each document beside one ruled record. Once in view, in date order, an arrow is drawn from each
// document to its dated entry, and the entry is marked on the record. The record stays drawn.
export const ChronologyIllustration = ({ id = 'chronology-illustration' }) => {
  const [ref, inView] = useInViewOnce({ threshold: 0.6 });
  return (
    <figure className={cn('evidence-figure chronology-illustration', inView && 'is-in')} aria-labelledby={`${id}-title`}>
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
              <time className="text-small text-graphite" dateTime={source.isoDate}>{keepDates(source.date)}</time>
              <p className="capability-feature-title text-navy">{source.title}</p>
            </div>
          </li>
        ))}
      </ol>
      <figcaption>{CHRONOLOGY_ILLUSTRATION.caption}</figcaption>
    </figure>
  );
};

// The point beside the records it cites. Once in view, in turn, each citation and its record are
// highlighted together and a brass rule is drawn beside the record. The rules stay drawn.
export const ArgumentIllustration = ({ id = 'argument-illustration' }) => {
  const [ref, inView] = useInViewOnce({ threshold: 0.6 });
  return (
    <figure className={cn('evidence-figure argument-illustration', inView && 'is-in')} aria-labelledby={`${id}-title`}>
      <div className="evidence-argument">
        <p className="section-kicker">{ILLUSTRATION_LABEL}</p>
        <h3 id={`${id}-title`} className="evidence-figure-title text-[1.625rem] leading-tight">{ARGUMENT_ILLUSTRATION.title}</h3>
        <p className="evidence-argument-text text-body">
          {ARGUMENT_ILLUSTRATION.points.map((point, i) => (
            <Fragment key={EVIDENCE_ILLUSTRATION[i].id}>
              {i > 0 && ' '}
              {keepDates(point)}{' '}
              <span className="evidence-cite" style={{ '--i': i }}>({EVIDENCE_ILLUSTRATION[i].document})</span>.
            </Fragment>
          ))}
        </p>
      </div>
      <div ref={ref} className="evidence-sources">
        <h4 className="capability-feature-title">{ARGUMENT_ILLUSTRATION.sourcesLabel}</h4>
        {EVIDENCE_ILLUSTRATION.map((source, i) => (
          <figure className="evidence-source" key={source.id} style={{ '--i': i }}>
            <blockquote>
              <p className="text-body">“{keepDates(source.excerpt)}”</p>
            </blockquote>
            <figcaption className="text-small text-graphite">{source.document}, {keepDates(source.date)}</figcaption>
          </figure>
        ))}
      </div>
      <figcaption>{ARGUMENT_ILLUSTRATION.caption}</figcaption>
    </figure>
  );
};
