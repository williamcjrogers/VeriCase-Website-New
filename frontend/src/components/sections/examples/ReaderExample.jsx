import { FileText, Mail, Search } from 'lucide-react';
import { READER_EXAMPLE as R } from '@/content/examples';
import { cn } from '@/lib/utils';
import { Typed, keepDates, typedMs, useFigurePlay } from '../illustrationKit';
import { AppFrame } from './AppFrame';

// The reader: the evidence in date order down the side, one record selected; beside it the
// document with its file record. The find term types; the passage is then marked in the page and
// the line naming where it was found follows. After the typing and the kit's wait of 320, the mark
// and the line take a turn of 380 each, the last settling 420 later; the duration adds 300.
const TYPED_MS = typedMs(R.findTerm);
export const READER_DURATION = TYPED_MS + 320 + 380 + 420 + 300;

export const ReaderExample = ({ id = 'reader-example', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: READER_DURATION });
  const selected = R.records[R.selected];
  return (
    <AppFrame id={id} className="reader-example" title={R.title} view={R.view} caption={R.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--typed-ms': `${TYPED_MS}ms` }}>
      <div className="reader-grid">
        <div className="reader-list-wrap">
          <span className="app-label">{R.recordsLabel}</span>
          <ol className="reader-records" role="list">
            {R.records.map((r, i) => (
              <li key={r.document} className={cn('reader-record', i === R.selected && 'is-selected')} aria-current={i === R.selected ? 'true' : undefined}>
                <FileText aria-hidden="true" />
                <span className="reader-record-name">{r.document}</span>
                <span className="reader-record-meta">{keepDates(r.date)} · {r.folder}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="reader-doc app-card">
          <div className="reader-doc-head">
            <span className="app-icon-tile"><Mail aria-hidden="true" /></span>
            <h4 className="app-h">{selected.document}</h4>
          </div>
          <dl className="reader-details" aria-label={R.detailsLabel}>
            {R.details.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{keepDates(value)}</dd></div>)}
          </dl>
          <div className="reader-strip">
            <p className="reader-views"><span className="sr-only">Views: </span>{R.views.map((v, i) => <span key={v} className={cn(i === 0 && 'is-current')}>{v}</span>)}</p>
            <p className="reader-find"><Search aria-hidden="true" /><span className="sr-only">{R.findLabel}: </span><Typed text={R.findTerm} play={play} /></p>
          </div>
          <div className="reader-page">
            <dl className="reader-mailhead">
              {R.email.header.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{keepDates(value)}</dd></div>)}
            </dl>
            <p className="reader-body">
              {keepDates(R.email.before)}
              <mark className="app-found" style={{ '--i': 0 }}>{R.email.found}</mark>
              {R.email.after}
            </p>
            <p className="reader-found app-quiet" data-appear style={{ '--i': 1 }}>Found on {R.page.toLowerCase()}.</p>
          </div>
        </div>
      </div>
    </AppFrame>
  );
};
