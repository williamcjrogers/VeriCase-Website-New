import { EVIDENCE_ILLUSTRATION } from '@/content/marketing';

// Static, semantic documents. These figures have no simulated software controls.
export const ChronologyIllustration = () => (
  <figure className="evidence-figure chronology-illustration" aria-labelledby="chronology-illustration-title">
    <h2 id="chronology-illustration-title" className="evidence-figure-title">From documents to chronology.</h2>
    <ol className="evidence-flow">
      {EVIDENCE_ILLUSTRATION.map((source) => (
        <li key={source.id}>
          <div className="evidence-flow-doc">
            <svg width="26" height="32" viewBox="0 0 26 32" fill="none" aria-hidden="true">
              <path d="M1 1h16l8 8v22H1zM17 1v8h8M6 15h14M6 20h14M6 25h9" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <div>
              <p className="evidence-flow-doc-name">{source.document}</p>
              <p className="evidence-flow-doc-excerpt">&ldquo;{source.excerpt}&rdquo;</p>
            </div>
          </div>
          <svg className="evidence-flow-arrow" width="44" height="16" viewBox="0 0 44 16" fill="none" aria-hidden="true">
            <path d="M0 8h40m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <div className="evidence-flow-entry">
            <time dateTime={source.isoDate}>{source.date}</time>
            <p>{source.title}</p>
            <span>{source.id}</span>
          </div>
        </li>
      ))}
    </ol>
    <figcaption>Illustrative chronology from a fictional construction matter.</figcaption>
  </figure>
);

import { useSourceSheet } from '@/components/mock/SourceSheet';

export const ArgumentIllustration = () => {
  const { open } = useSourceSheet();
  return (
    <figure className="evidence-figure argument-illustration" aria-labelledby="argument-illustration-title">
      <div className="evidence-argument">
        <h3 id="argument-illustration-title" className="evidence-figure-title">An argument with its sources.</h3>
        <p className="evidence-argument-text">The change was instructed on 03 March. The ten-week lead time was recorded on 12 March. Delivery was confirmed on 26 March for the week commencing 19 May 2025.</p>
        <p className="text-small text-azure-700 mt-2">
          Supported by{' '}
          <button type="button" onClick={(e) => open('EV-0131', ['EV-0131'], e.currentTarget)} className="ev-chip mr-1">EV-0131</button>,{' '}
          <button type="button" onClick={(e) => open('EV-0138', ['EV-0138'], e.currentTarget)} className="ev-chip mr-1">EV-0138</button> and{' '}
          <button type="button" onClick={(e) => open('EV-0147', ['EV-0147'], e.currentTarget)} className="ev-chip">EV-0147</button>.
        </p>
      </div>
      <div className="evidence-sources">
        <h4 className="text-body font-medium">Supporting records</h4>
        {EVIDENCE_ILLUSTRATION.map((source) => (
          <blockquote className="evidence-source" key={source.id}>
            <p>“{source.excerpt}”</p>
            <footer>{source.document}, {source.date}<span>{source.id}</span></footer>
          </blockquote>
        ))}
      </div>
      <figcaption id="notes" tabIndex={-1}>The documents and argument shown here are fictional. The source references connect each point to the record behind it.</figcaption>
    </figure>
  );
};
