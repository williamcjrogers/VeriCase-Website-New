import { useId } from 'react';
import { ExhibitStamp } from '@/components/editorial/ExhibitStamp';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { BUNDLE, bundleRows, itemsLabel } from '@/content/matter/research';
import { fill } from '@/lib/format';
import { onSectionClick } from '@/lib/navigate';
import { UI } from '@/components/research/copy';

const [TAB, ITEM, EXHIBIT, DATE, DESCRIPTION] = BUNDLE.indexHeads;

// The bundle once created: the stamp (which also heads the section and takes focus), the cover
// sheet as a definition list, and the index numbered in bundle order. Every row sits at Tab 1.
// Below 768 px the index is a list of stacked cards rather than a table.
export function BundleIndex({ bundle, headingRef }) {
  const headingId = useId();
  const indexId = useId();
  const rows = bundleRows(bundle.items);

  return (
    <section aria-labelledby={headingId} className="rs-bundle">
      <h3 id={headingId} ref={headingRef} tabIndex={-1} className="rs-bundle-title">
        <ExhibitStamp stamp caps className="rs-bundle-stamp">
          {fill(BUNDLE.stamp, { items: itemsLabel(rows.length) })}
        </ExhibitStamp>
      </h3>

      <div className="rs-bundle-grid">
        <div>
          <p className="rs-label">{UI.cover}</p>
          <dl className="rs-cover">
            {BUNDLE.fields.map((f) => (
              <div key={f.key} className={f.key === 'title' ? 'rs-cover-row is-title' : 'rs-cover-row'}>
                <dt>{f.label}</dt>
                <dd>{bundle.fields[f.key]}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0">
          <p id={indexId} className="rs-label">
            {UI.index}
          </p>
          <table className="rs-index hidden md:table">
            <caption className="sr-only">{UI.index}</caption>
            <thead>
              <tr>
                {BUNDLE.indexHeads.map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.ev} className="rs-row" style={{ '--i': i }}>
                  <td className="mono">{r.tab}</td>
                  <td className="mono">{r.item}</td>
                  <td>
                    <EvidenceChip id={r.ev} list={bundle.items} />
                  </td>
                  <td className="whitespace-nowrap">{r.date}</td>
                  <td>{r.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ol role="list" aria-labelledby={indexId} className="rs-index-cards md:hidden">
            {rows.map((r, i) => (
              <li key={r.ev} className="rs-row" style={{ '--i': i }}>
                <dl>
                  <div>
                    <dt>{TAB}</dt>
                    <dd className="mono">{r.tab}</dd>
                  </div>
                  <div>
                    <dt>{ITEM}</dt>
                    <dd className="mono">{r.item}</dd>
                  </div>
                  <div>
                    <dt>{EXHIBIT}</dt>
                    <dd>
                      <EvidenceChip id={r.ev} list={bundle.items} />
                    </dd>
                  </div>
                  <div>
                    <dt>{DATE}</dt>
                    <dd>{r.date}</dd>
                  </div>
                  <div className="is-wide">
                    <dt>{DESCRIPTION}</dt>
                    <dd>{r.description}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="rs-manifest">
        <a href="#integrity" onClick={onSectionClick('integrity')} className="vc-link">
          {BUNDLE.manifestLink}
        </a>
      </p>
    </section>
  );
}
