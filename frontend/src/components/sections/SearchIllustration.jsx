import { CONTEXT_LABEL, MATTER_RECORDS, SEARCH_ILLUSTRATION } from '@/content/marketing';
import { LiveFigure, Typed, keepDates, typedMs, useFigurePlay } from './illustrationKit';
import './search-illustration.css';

// A matching passage and the document it comes from (product reference PR-02). The query is typed
// in front of the reader, in quotation marks, in the title column beside why someone would look;
// the answer then arrives beside it, ranked by match strength: each result in turn, its rank and
// file record (name, folder and date) first, then the passage on a paper slip, where the match is
// marked as the opening illustration marks a found passage. Nothing counts, scores or times the
// search. The figure is mounted once; `play` lets two copies share one performance if ever needed.
//
// The sequence, in ms from the start (search-illustration.css sets the rhythm): the query is
// short, so it is typed at a deliberate pace, 16 characters a second after 360;
// then, 360 later, "Ranked by match strength" with its rule drawn beneath it; 440 after the label,
// the first result, and each later result 860 after the one before, its rule drawn above it as it
// comes: the rank and record, the slip 160 after them, and the match marked from 300 after the
// slip for 480. The last match is marked by typed + 360 + 440 + 860 + 160 + 300 + 480; the
// duration adds 300.
export const SEARCH_TYPING = { cps: 16, delay: 360 };
export const SEARCH_DURATION = typedMs(`“${SEARCH_ILLUSTRATION.query}”`, SEARCH_TYPING) + 360 + 440 + 860 + 160 + 300 + 480 + 300;

export const SearchIllustration = ({ id = 'search-illustration', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: SEARCH_DURATION });
  const S = SEARCH_ILLUSTRATION;
  const query = `“${S.query}”`;
  const ms = typedMs(query, SEARCH_TYPING);
  return (
    <LiveFigure id={id} className="search-illustration" title={S.title} caption={S.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--typed-ms': `${ms}ms` }}>
      <div className="search-head">
        <p className="live-prompt search-query">
          <span className="live-prompt-label">{S.queryLabel}</span>{' '}
          <Typed className="live-prompt-line search-query-line" text={query} play={play} {...SEARCH_TYPING} />
        </p>
        <p className="evidence-context search-context">
          <span className="evidence-context-label">{CONTEXT_LABEL}</span>{' '}
          <span className="evidence-context-text">{keepDates(S.context)}</span>
        </p>
      </div>
      <div className="live-output search-main">
        <h4 id={`${id}-rank`} className="live-output-label search-rank" data-appear style={{ '--i': 0 }}>{S.rankLabel}</h4>
        {/* The order is the ranking: the rank is set as a numeral for the eye, and the list gives it to a screen reader. */}
        <ol className="search-results" role="list" aria-labelledby={`${id}-rank`}>
          {S.results.map(({ record, before, match, after }, k) => {
            const source = MATTER_RECORDS[record];
            // The result's turn, on the item: its parts and the rule above it take it from there.
            return (
              <li key={source.document} className="search-result" style={{ '--i': k }}>
                <span className="search-result-rank" aria-hidden="true" data-appear>{k + 1}</span>
                <div className="search-result-record" data-appear>
                  <p className="search-result-name">{source.document}</p>
                  <p className="search-result-meta"><span>{source.folder}<span className="search-comma">,</span></span> <time dateTime={source.isoDate}>{keepDates(source.date)}</time></p>
                </div>
                <blockquote className="search-slip on-paper" data-appear>
                  <p>“{keepDates(before)}<mark className="search-match">{match}</mark>{keepDates(after)}”</p>
                </blockquote>
              </li>
            );
          })}
        </ol>
      </div>
    </LiveFigure>
  );
};
