import { useInViewOnce } from '@/hooks/useInViewOnce';
import { onSectionClick } from '@/lib/navigate';
import { RESEARCH_SOURCES, SUPPORTING_RESEARCH, UNUSED_DATA_SOURCE } from '@/content/researchSources';

const ResearchReference = ({ number, value, unit }) => (
  <a id={`research-ref-${number}`} className="record-context-source" tabIndex={0} href={`#research-source-${number}`} onClick={onSectionClick(`research-source-${number}`)} aria-label={`Source ${number} for ${value} ${unit}`} role="doc-noteref">[{number}]</a>
);

// The final figure is always available to assistive technology and in the static page.
// Decorative digit reels turn upwards once on entry, without changing the measured value.
export const ResearchFigure = ({ value, unit, sourceNumber }) => {
  const [ref, inView] = useInViewOnce({ threshold: 0.7 });
  return (
    <p ref={ref} className={`record-context-number${inView ? ' is-in-view' : ''}`}>
      <span className="sr-only">{value} </span>
      <span className="stat-digits" aria-hidden="true">
        {[...value].map((character, i) => /\d/.test(character) ? (
          <span key={i} className="stat-digit">
            <span className="stat-reel" style={{ '--digit-delay': `${i * 70}ms` }}>
              {[...'0123456789', character].map((digit, row) => <span key={row}>{digit}</span>)}
            </span>
          </span>
        ) : <span key={i} className="stat-punctuation">{character}</span>)}
      </span>
      {sourceNumber && (
        <ResearchReference number={sourceNumber} value={value} unit={unit} />
      )}
      <span className="record-context-unit">{unit}</span>
    </p>
  );
};

// Keep the dated unused-data statement separate from the three dispute-study figures.
export const RecordContext = () => (
  <aside className="record-context" aria-labelledby="record-context-title">
    <div className="record-context-intro">
      <h2 id="record-context-title">What goes unread<br /> can change the case.</h2>
    </div>
    <div className="record-context-unused">
      <p className="record-context-unused-value">
        <strong>{UNUSED_DATA_SOURCE.value}</strong>
        <ResearchReference {...UNUSED_DATA_SOURCE} />
      </p>
      <div className="record-context-unused-copy">
        <p className="record-context-unused-label">{UNUSED_DATA_SOURCE.unit}</p>
        <p className="record-context-unused-attribution">{UNUSED_DATA_SOURCE.attribution}</p>
      </div>
    </div>
    <div className="record-context-figures">
      {RESEARCH_SOURCES.map((source) => (
        <div className="record-context-fact" key={source.number}>
          <ResearchFigure value={source.value} unit={source.unit} sourceNumber={source.number} />
        </div>
      ))}
    </div>
  </aside>
);

export const ResearchSources = () => (
  <section id="research-sources" className="research-sources" aria-labelledby="research-sources-title">
    <div className="container research-sources-inner">
      <h2 id="research-sources-title" tabIndex={-1}>Research sources</h2>
      <div>
        <p className="research-sources-note">These sources describe construction disputes and project information. They do not measure VeriCase results or savings.</p>
        <ol className="research-sources-list">
          {[...RESEARCH_SOURCES, UNUSED_DATA_SOURCE].map((source) => (
            <li id={`research-source-${source.number}`} key={source.number} tabIndex={-1}>
              <a href={source.url}>{source.citation}</a>
              <p>{source.context} {source.scope}</p>
              {source.relatedSources && (
                <p>Earlier sources: {source.relatedSources.map((related, index) => (
                  <span key={related.url}>{index > 0 && '; '}<a href={related.url}>{related.label}</a></span>
                ))}.</p>
              )}
              <a className="research-source-return" href={`#research-ref-${source.number}`} onClick={onSectionClick(`research-ref-${source.number}`)} aria-label={`Return to statistic ${source.number}`} role="doc-backlink">Back to figure {source.number}</a>
            </li>
          ))}
        </ol>
        <details className="record-context-research">
          <summary>Read the wider research: queries, rework and decisions</summary>
          <div className="record-context-research-body">
            {SUPPORTING_RESEARCH.map((source) => (
              <article key={source.number}>
                <h3>{source.value} {source.unit}</h3>
                <p>{source.context}</p>
                <p className="record-context-scope">{source.scope}</p>
                <a href={source.url}>{source.citation}</a>
              </article>
            ))}
            <article>
              <h3>1,083,807 requests for information. 1,362 projects.</h3>
              <p>Navigant’s 2013 analysis of Aconex records found an average of about 796 RFIs per project.</p>
              <p className="record-context-scope">Projects began between 2001 and 2012; each had at least 100 RFIs. Around 79% were in Australia and New Zealand.</p>
              <a href="https://www.cmaanet.org/sites/default/files/2018-04/NCF%20IMPACT%20%26%20CONTROL%20OF%20RFIs%20ON%20CONSTRUCTION%20PROJECTS.pdf">Navigant Construction Forum, April 2013, p. 5</a>
            </article>
            <article>
              <h3>48% of US rework attributed to poor data and miscommunication.</h3>
              <p>The 2018 PlanGrid / FMI research used respondents’ estimates to model the impact of disconnected information.</p>
              <p className="record-context-scope">A vendor-sponsored US estimate, not a measured cause across every project.</p>
              <a href="https://www.autodesk.com/blogs/construction/construction-disconnected-fmi-report/">PlanGrid / FMI, Construction Disconnected, 2018</a>
            </article>
            <article>
              <h3>One in three poor decisions attributed to bad data.</h3>
              <p>Autodesk / FMI’s global research linked poor decisions to inaccurate, incomplete or inconsistent project information.</p>
              <p className="record-context-scope">Vendor-sponsored research published in 2021, surveying over 3,900 leaders. This estimate underpins the report’s modelled rework costs.</p>
              <a href="https://constructioncloud.autodesk.com/rs/572-JSV-775/images/harnessing_the_data_advantage_in_construction_fmi_apac.pdf">Autodesk / FMI, Harnessing the Data Advantage, pp. 14 and 15</a>
            </article>
          </div>
        </details>
      </div>
    </div>
  </section>
);
