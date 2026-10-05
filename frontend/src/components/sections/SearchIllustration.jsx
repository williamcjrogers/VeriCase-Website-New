import { CONTEXT_LABEL, ILLUSTRATION_LABEL, MATTER_RECORDS, SEARCH_ILLUSTRATION } from '@/content/marketing';
import './search-illustration.css';

// A matching passage and the document it comes from (product reference PR-02): the query set as
// type, then each matching passage on a paper slip beside its file record (name, folder and
// date), strongest match first. The match is marked as the opening illustration marks a found
// passage. Still: it does not move.

const keepDates = (text) => text.replace(/(\d{2}) ([A-Z][a-z]+) (\d{4})/g, '$1 $2 $3');

export const SearchIllustration = ({ id = 'search-illustration' }) => {
  const S = SEARCH_ILLUSTRATION;
  return (
    <figure className="evidence-figure search-illustration" aria-labelledby={`${id}-title`}>
      <div className="search-split">
        <div className="search-head">
          <p className="section-kicker">{ILLUSTRATION_LABEL}</p>
          <h3 id={`${id}-title`} className="evidence-figure-title text-[1.625rem] leading-tight">{S.title}</h3>
          <p className="search-query"><span className="search-query-label">{S.queryLabel}</span> <span className="search-query-term">“{S.query}”</span></p>
          <p className="evidence-context"><span className="evidence-context-label">{CONTEXT_LABEL}</span> <span className="evidence-context-text">{keepDates(S.context)}</span></p>
        </div>
        <div className="search-main">
          <p id={`${id}-rank`} className="search-rank">{S.rankLabel}</p>
          <ol className="search-results" aria-labelledby={`${id}-rank`}>
            {S.results.map(({ record, before, match, after }) => {
              const source = MATTER_RECORDS[record];
              return (
                <li key={source.document} className="search-result">
                  <div className="search-result-record">
                    <p className="search-result-name">{source.document}</p>
                    <p className="search-result-meta"><span>{source.folder}<span className="search-comma">,</span></span> <time dateTime={source.isoDate}>{keepDates(source.date)}</time></p>
                  </div>
                  <blockquote className="search-slip"><p>“{keepDates(before)}<mark className="search-match">{match}</mark>{keepDates(after)}”</p></blockquote>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <figcaption>{S.caption}</figcaption>
    </figure>
  );
};
