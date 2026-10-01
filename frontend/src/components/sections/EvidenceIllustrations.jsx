import { Fragment } from 'react';
import { EVIDENCE_ILLUSTRATION } from '@/content/marketing';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { cn } from '@/lib/utils';

// Semantic documents with no simulated software controls. Motion is procedure and plays once:
// each document is filed into the chronology in date order (CSS only, see clarity.css), and
// each citation in the argument draws to its source when the figure comes into view. Every
// state is readable, and reduced motion shows the final state from first paint.
export const ChronologyIllustration = () => (
  <figure className="evidence-figure chronology-illustration" aria-labelledby="chronology-illustration-title">
    <h2 id="chronology-illustration-title" className="evidence-figure-title">From documents to chronology.</h2>
    <div className="evidence-documents" aria-label="Three source documents">
      {EVIDENCE_ILLUSTRATION.map((source, i) => (
        <div className="evidence-document" key={source.id} style={{ '--i': i }}>
          <svg width="26" height="32" viewBox="0 0 26 32" fill="none" aria-hidden="true">
            <path d="M1 1h16l8 8v22H1zM17 1v8h8M6 15h14M6 20h14M6 25h9" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <p>{source.document}</p>
        </div>
      ))}
    </div>
    <p className="evidence-order-label">One record, in date order</p>
    <ol className="evidence-chronology">
      {EVIDENCE_ILLUSTRATION.map((source, i) => (
        <li key={source.id} style={{ '--i': i }}>
          <time dateTime={source.isoDate}>{source.date}</time>
          <div><p>{source.title}</p><span>{source.id}</span></div>
        </li>
      ))}
    </ol>
    <figcaption>Illustrative chronology from a fictional construction matter.</figcaption>
  </figure>
);

export const ArgumentIllustration = () => {
  const [ref, inView] = useInViewOnce({ threshold: 0.35 });
  const last = EVIDENCE_ILLUSTRATION.length - 1;
  return (
    <figure ref={ref} className={cn('evidence-figure argument-illustration', inView && 'is-in')} aria-labelledby="argument-illustration-title">
      <div className="evidence-argument">
        <h3 id="argument-illustration-title" className="evidence-figure-title">An argument with its sources.</h3>
        <p className="evidence-argument-text">The change was instructed on 03 March. The ten-week lead time was recorded on 12 March. Delivery was confirmed on 26 March for the week commencing 19 May 2025.</p>
        <p className="text-small text-azure-700">
          Supported by{' '}
          {EVIDENCE_ILLUSTRATION.map((source, i) => (
            <Fragment key={source.id}>
              {i === 0 ? '' : i === last ? ' and ' : ', '}
              <span className="evidence-cite" style={{ '--i': i }}>{source.id}</span>
            </Fragment>
          ))}
          .
        </p>
      </div>
      <div className="evidence-sources">
        <h4 className="text-body font-medium">Supporting records</h4>
        {EVIDENCE_ILLUSTRATION.map((source, i) => (
          <blockquote className="evidence-source" key={source.id} style={{ '--i': i }}>
            <p>“{source.excerpt}”</p>
            <footer>{source.document}, {source.date}<span>{source.id}</span></footer>
          </blockquote>
        ))}
      </div>
      <figcaption id="notes" tabIndex={-1}>The documents and argument shown here are fictional. The source references connect each point to the record behind it.</figcaption>
    </figure>
  );
};
