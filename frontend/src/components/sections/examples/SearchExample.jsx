import { FileSpreadsheet, FileText, Mail, Paperclip, Search, X } from 'lucide-react';
import { SEARCH_EXAMPLE as S } from '@/content/examples';
import { Typed, typedMs, useFigurePlay } from '../illustrationKit';
import { AppFrame } from './AppFrame';

// Chronology Lens: a term typed into the search; it becomes a chip, the count appears, and the
// matching emails follow in date order, each with the passage found inside its attachment. The
// term types (the kit's 240, then 34 characters a second); after the kit's wait of 320 the chip
// and count, then each card, take a turn of 380; the last settles 420 later; the duration adds 300.
const TYPED_MS = typedMs(S.term);
export const SEARCH_DURATION = TYPED_MS + 320 + S.results.length * 380 + 420 + 300;

const fileIcon = (name) => (/\.xlsx$/.test(name) ? FileSpreadsheet : FileText);

export const SearchExample = ({ id = 'search-example', play: shared, className }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: SEARCH_DURATION });
  return (
    <AppFrame id={id} className={['search-example', className].filter(Boolean).join(' ')} title={S.title} view={S.view} caption={S.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--typed-ms': `${TYPED_MS}ms` }}>
      <div className="search-bar">
        <p className="search-box" style={{ margin: 0 }}>
          <Search aria-hidden="true" />
          <span className="sr-only">Searched for: </span>
          <Typed text={S.term} play={play} />
        </p>
        <span className="search-chip" data-appear style={{ '--i': 0 }} aria-hidden="true">{S.term}<X /></span>
      </div>
      <p className="search-meta" data-appear style={{ '--i': 0 }}><strong>{S.count}</strong><span>{S.order}</span></p>
      <ol className="search-results" role="list">
        {S.results.map((r, k) => {
          const Icon = fileIcon(r.foundIn);
          return (
            <li key={r.subject} className="search-card app-card" data-appear style={{ '--i': k + 1 }}>
              <div className="search-card-head">
                <span className="app-icon-tile"><Mail aria-hidden="true" /></span>
                <span className="search-card-date">{r.date}</span>
                <span className="search-card-subject">{r.subject}</span>
                <span className="search-card-parties">From {r.from} to {r.to}</span>
              </div>
              <div className="search-found">
                <p className="search-found-in" style={{ margin: 0 }}><Icon aria-hidden="true" />Found in: {r.foundIn}</p>
                <p className="search-found-text">{r.before}<mark className="app-hit">{S.term}</mark>{r.after}</p>
              </div>
              {r.attachments.map((a) => (
                <p key={a.name} className="search-attachment" style={{ margin: '0.5rem 0 0' }}><Paperclip aria-hidden="true" />{a.name}<span className="app-quiet">{a.size}</span></p>
              ))}
            </li>
          );
        })}
      </ol>
    </AppFrame>
  );
};
