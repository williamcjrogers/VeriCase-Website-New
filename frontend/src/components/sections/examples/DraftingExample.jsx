import { Download, FileText } from 'lucide-react';
import { DRAFTING_EXAMPLE as D } from '@/content/examples';
import { Typed, keepDates, typedMs, useFigurePlay } from '../illustrationKit';
import { AppButton, AppFrame } from './AppFrame';

// Drafting: the section heading types; each paragraph follows with the record it rests on, then the
// status and the export actions. After the kit's wait of 320 each paragraph and the foot take a
// turn of 380, the last settling 420 later; the duration adds 300.
const TYPED_MS = typedMs(D.section);
export const DRAFTING_DURATION = TYPED_MS + 320 + D.paragraphs.length * 380 + 420 + 300;

export const DraftingExample = ({ id = 'drafting-example', play: shared, headingAs = 'h3' }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: DRAFTING_DURATION });
  return (
    <AppFrame id={id} headingAs={headingAs} className="drafting-example" title={D.title} view={D.view} caption={D.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--typed-ms': `${TYPED_MS}ms` }}>
      <p className="app-quiet drafting-doc">{D.documentTitle}</p>
      <div className="drafting-sheet app-card">
        <span className="sr-only">{D.sectionLabel}: </span>
        <p className="drafting-section app-h"><Typed text={D.section} play={play} /></p>
        <ol className="drafting-paras" role="list">
          {D.paragraphs.map((p, k) => (
            <li key={p.n} data-appear style={{ '--i': k }}>
              <span className="drafting-n">{p.n}</span>
              <p className="drafting-text">{p.text}</p>
              <span className="drafting-source"><FileText aria-hidden="true" />{keepDates(p.source)}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="drafting-foot" data-appear style={{ '--i': D.paragraphs.length }}>
        <span className="app-quiet">{D.status}</span>
        <span className="app-row">{D.actions.map((a, k) => <AppButton key={a} icon={Download} primary={k === 0}>{a}</AppButton>)}</span>
      </div>
    </AppFrame>
  );
};
