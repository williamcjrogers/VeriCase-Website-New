import { Fragment, useState } from 'react';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';
import { HASH_CHECK, MANIFEST, manifestRows } from '@/content/sampleMatter';
import { Gated } from '@/components/editorial/Gated';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { truncateHash } from '@/lib/format';
import '@/components/integrity/manifest.css';

const ROWS = manifestRows();
const EXHIBITS = ROWS.map((r) => r.ev);
const HASH_COLUMN = 4;

// A message ID or path that may break after a slash or a full stop and before an @, never
// in the middle of a word, so a narrow column still reads cleanly.
const Breakable = ({ text }) =>
  text
    .replace(/[/.]/g, '$&\n')
    .replace(/@/g, '\n@')
    .split('\n')
    .filter(Boolean)
    .map((part, i) => (
      <Fragment key={i}>
        {i > 0 && <wbr />}
        {part}
      </Fragment>
    ));

// Where the clipboard is unavailable, the digest is selected so it can be copied by hand.
const selectText = (el) => {
  if (!el) return;
  const range = document.createRange();
  range.selectNodeContents(el);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
};

// A digest: its first and last eight characters until the full value is asked for, with the
// toggle and a copy button. `layout` keeps the ids of the table and the cards apart.
const Digest = ({ row, full, onToggle, layout }) => {
  const id = `ri-digest-${layout}-${row.ev}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(row.hash);
      toast(MANIFEST.copied);
    } catch {
      if (!full) onToggle();
      requestAnimationFrame(() => selectText(document.getElementById(id)));
    }
  };
  const toggleLabel = full ? HASH_CHECK.hideFull : HASH_CHECK.showFull;
  return (
    <div className="ri-digest">
      <code id={id} className={full ? 'ri-digest-full' : undefined}>
        {full ? row.hash : truncateHash(row.hash)}
      </code>
      <span className="ri-digest-actions">
        <button type="button" className="ri-text-btn" onClick={onToggle} aria-label={`${toggleLabel}, ${row.ev}`}>
          {toggleLabel}
        </button>
        <button type="button" className="ri-icon-btn" onClick={copy} aria-label={`${MANIFEST.copy}, ${row.ev}`} title={MANIFEST.copy}>
          <Copy className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </span>
    </div>
  );
};

// The hash column's heading, marked on previews until the owner confirms what the hash covers.
const HashHead = () => <Gated id={MANIFEST.hashGate}>{MANIFEST.heads[HASH_COLUMN]}</Gated>;

// Fig. 10: an extract from the bundle manifest, in mono with tabular figures. A real table at
// 1024 px and above; below that (where six mono columns would break message IDs mid-word) each
// row is a card of terms and values, two to a row from 640 px, and digests wrap by character.
export const ManifestTable = () => {
  const [full, setFull] = useState({});
  const toggle = (ev) => () => setFull((f) => ({ ...f, [ev]: !f[ev] }));
  const heads = MANIFEST.heads;

  return (
    <div className="ri-manifest ph-no-capture">
      <table className="ri-manifest-table">
        <caption className="ri-manifest-caption">{MANIFEST.title}</caption>
        <thead>
          <tr>
            {heads.map((head, i) => (
              <th key={head} scope="col" className={`ri-col-${i}`}>
                {i === HASH_COLUMN ? <HashHead /> : head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.ev}>
              <th scope="row">{row.seq}</th>
              <td>
                <EvidenceChip id={row.ev} list={EXHIBITS} />
              </td>
              <td className="whitespace-nowrap">{row.date}</td>
              <td className="ri-wrap">
                <Breakable text={row.ref} />
              </td>
              <td>
                <Digest row={row} full={Boolean(full[row.ev])} onToggle={toggle(row.ev)} layout="table" />
              </td>
              <td className="ri-wrap">
                <Breakable text={row.path} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ri-manifest-cards">
        <p id="ri-manifest-cards-title" className="ri-manifest-caption">
          {MANIFEST.title}
        </p>
        <ol className="ri-cards" role="list" aria-labelledby="ri-manifest-cards-title">
          {ROWS.map((row) => (
            <li key={row.ev} className="ri-card">
              <dl>
                <div className="ri-card-seq">
                  <dt>{heads[0]}</dt>
                  <dd>{row.seq}</dd>
                </div>
                <div className="ri-card-exhibit">
                  <dt>{heads[1]}</dt>
                  <dd>
                    <EvidenceChip id={row.ev} list={EXHIBITS} />
                  </dd>
                </div>
                <div>
                  <dt>{heads[2]}</dt>
                  <dd>{row.date}</dd>
                </div>
                <div>
                  <dt>{heads[3]}</dt>
                  <dd className="ri-wrap">
                    <Breakable text={row.ref} />
                  </dd>
                </div>
                <div>
                  <dt>
                    <HashHead />
                  </dt>
                  <dd>
                    <Digest row={row} full={Boolean(full[row.ev])} onToggle={toggle(row.ev)} layout="card" />
                  </dd>
                </div>
                <div>
                  <dt>{heads[5]}</dt>
                  <dd className="ri-wrap">
                    <Breakable text={row.path} />
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

// Loaded lazily by its chapter (React.lazy needs a default export).
export default ManifestTable;
