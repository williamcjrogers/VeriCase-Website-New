import { CircleCheck, Download, FileText, GripVertical, Mail } from 'lucide-react';
import { BUNDLE_EXAMPLE as B } from '@/content/examples';
import { cn } from '@/lib/utils';
import { keepDates, useFigurePlay } from '../illustrationKit';
import { AppButton, AppFrame, Badge } from './AppFrame';

// Bundles: built from a Deep Research report, the report on top of the evidence it cites. The
// contents in order (the cover page fixed first), the PDF settings and the cover page
// beside them, the download, ready, and the PDF as it reads: cover sheet, index, and an item. After the kit's wait of 320 each item, then the settings,
// then the download take a turn of 300, the last settling 420 later; the duration adds 300.
const PARTS = B.items.length + 3;
export const BUNDLE_DURATION = 320 + (PARTS - 1) * 300 + 420 + 300;

export const BundleExample = ({ id = 'bundle-example', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: BUNDLE_DURATION });
  return (
    <AppFrame id={id} className="bundle-example" title={B.title} view={B.view} caption={B.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--step': '300ms' }}>
      <div className="bundle-head">
        <h4 className="app-h">{B.bundleTitle}</h4>
        <Badge tone="azure">{B.source}</Badge>
        <AppButton icon={Download} primary>Download</AppButton>
      </div>
      <p className="bundle-auto app-quiet" style={{ margin: '0.375rem 0 0' }}>{B.auto}</p>
      <div className="bundle-grid">
        <div>
          <span className="app-label">{B.contentsLabel}</span>
          <ol className="bundle-list" role="list">
            <li className="bundle-item is-cover app-card">
              <span className="bundle-n" aria-hidden="true">1</span>
              <FileText aria-hidden="true" />
              <span className="bundle-item-title">{B.cover}</span>
              <Badge>{B.fixed}</Badge>
            </li>
            {B.items.map((item, k) => (
              <li key={item.title} className="bundle-item app-card" data-appear style={{ '--i': k }}>
                <span className="bundle-n" aria-hidden="true">{k + 2}</span>
                <GripVertical className="bundle-grip" aria-hidden="true" />
                <span className="bundle-item-title">{item.title}<span className="bundle-item-sub">{keepDates(item.sub)}</span></span>
                <Badge tone={item.kind === 'Report' ? 'azure' : undefined}>{item.kind === 'Email' ? <><Mail aria-hidden="true" style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />Email</> : item.kind}</Badge>
              </li>
            ))}
          </ol>
        </div>
        <div className="bundle-side">
          <div className="bundle-panel app-card" data-appear style={{ '--i': B.items.length }}>
            <span className="app-label">{B.settingsLabel}</span>
            <p className="bundle-toggle" style={{ margin: '0.5rem 0 0' }}>{B.coverToggle}<span className="bundle-switch" aria-label="On" role="img" /></p>
            <p style={{ margin: '0.625rem 0 0' }}>{B.numberingLabel}</p>
            <ul className="bundle-numbering" role="list">
              {B.numbering.map((n, k) => <li key={n} className={cn(k === 0 && 'is-current')} aria-current={k === 0 ? 'true' : undefined}>{n}</li>)}
            </ul>
            <span className="app-label" style={{ marginTop: '0.75rem' }}>{B.coverLabel}</span>
            <dl className="bundle-cover">
              {B.coverFields.map(([k, v]) => <div key={k} style={{ display: 'contents' }}><dt>{k}</dt><dd>{keepDates(v)}</dd></div>)}
            </dl>
          </div>
          <p className="bundle-ready app-card" data-appear style={{ '--i': B.items.length + 1, margin: 0 }}>
            <CircleCheck aria-hidden="true" />
            <span><strong>{B.ready}</strong><span className="bundle-ready-file">{B.file}</span></span>
          </p>
        </div>
      </div>
      <div className="bundle-pdf" role="group" aria-labelledby={`${id}-pdf`} data-appear style={{ '--i': B.items.length + 2 }}>
        <span id={`${id}-pdf`} className="app-label">{B.pdfLabel}</span>
        <ol className="bundle-pages" role="list">
          <li className="bundle-page">
            <span className="bundle-page-kicker">{B.pdfCover.kicker}</span>
            <span className="bundle-page-title">{B.bundleTitle}</span>
            <dl>{B.pdfCover.fields.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <span className="bundle-page-n">1</span>
          </li>
          <li className="bundle-page">
            <span className="bundle-page-title">{B.pdfIndex.title}</span>
            <table className="bundle-index">
              <thead><tr>{B.pdfIndex.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
              <tbody>
                {B.items.map((item, k) => (
                  <tr key={item.title}><td>{k + 1}</td><td>{item.title}</td><td>{item.sub.replace(/^Deep Research, /, '')}</td><td>{3 + k * 4}</td></tr>
                ))}
              </tbody>
            </table>
            <span className="bundle-page-n">2</span>
          </li>
          <li className="bundle-page">
            <span className="bundle-page-kicker">{B.pdfItem.kicker}</span>
            <span className="bundle-page-title">{B.items[2].title}</span>
            <dl>{B.pdfItem.fields.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <span className="bundle-page-n">11</span>
          </li>
        </ol>
      </div>
    </AppFrame>
  );
};
