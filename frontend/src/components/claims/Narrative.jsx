import { Fragment, useId } from 'react';
import { FileText } from 'lucide-react';
import { Gated, isShown } from '@/components/editorial/Gated';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { CLAIMS_BUILDER } from '@/content/matter/claims';

const [SECTION_N, ...SECTION_WORDS] = CLAIMS_BUILDER.section.split(' ');
const [EXPORT_LABEL, EXPORT_TEXT] = CLAIMS_BUILDER.exportBar.split(': ');
const TOKEN = /(\[\[ev:EV-\d{4}\]\])/;

// A paragraph's text with each [[ev:EV-0131]] as a citation chip. (Rich is not used here: this
// chunk importing it would pull the notes and the whole copy deck into the first chunk.)
const Cited = ({ text, list }) =>
  text.split(TOKEN).map((part, i) => {
    const m = part.match(/^\[\[ev:(EV-\d{4})\]\]$/);
    return m ? <EvidenceChip key={i} id={m[1]} list={list} /> : <Fragment key={i}>{part}</Fragment>;
  });

// The narrative for section 1.2, set as a pleading: paragraph numbers in the margin, the text in
// Newsreader, and each paragraph cited by exhibit reference. Citations the drafter inserts from
// the evidence finder are appended to the target paragraph, where the cursor stands.
export const Narrative = ({ inserted, cites }) => {
  const id = useId();
  return (
    <article aria-labelledby={id} className="cb-doc-wrap">
      <div className="cb-doc">
        <Gated id="G1_jct" block>
          <h3 id={id} className="cb-section">
            <span className="cb-section-n">{SECTION_N}</span>
            <span>{SECTION_WORDS.join(' ')}</span>
          </h3>
          {CLAIMS_BUILDER.paragraphs.map((p) => (
            <p key={p.n} className="cb-para">
              <span className="cb-num">{p.n}</span>
              <span className="min-w-0">
                <Cited text={p.text} list={cites} />
                {p.n === CLAIMS_BUILDER.insertTarget && (
                  <>
                    {inserted.map((ev) => (
                      <span key={ev} data-cite={ev} className="cb-new">
                        {' '}
                        <EvidenceChip id={ev} list={cites} />
                      </span>
                    ))}
                    <span className="cb-caret" aria-hidden="true" />
                  </>
                )}
              </span>
            </p>
          ))}
        </Gated>
      </div>
      {isShown('G5_claims') && (
        <Gated id="G5_claims" block className="cb-export">
          <FileText className="h-4 w-4 shrink-0 text-azure-700" strokeWidth={1.5} aria-hidden="true" />
          <p>
            <span className="cb-label">{EXPORT_LABEL}:</span> <span>{EXPORT_TEXT}</span>
          </p>
        </Gated>
      )}
    </article>
  );
};
