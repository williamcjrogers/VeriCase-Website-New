import { Download, FileText } from 'lucide-react';
import { EXPORT_EXAMPLE as E } from '@/content/examples';
import { keepDates, useFigurePlay } from '../illustrationKit';
import { AppButton, AppFrame } from './AppFrame';

// The exported report: nothing is typed. The page comes out top to bottom: the title and heading,
// the paragraph with its source link, the quotation, the table (caption and heads, then each row),
// and the folio. After the kit's wait of 320 each part takes a turn of 300, the last settling 420
// later; the duration adds 300.
const STEP = 300;
const PARTS = 4 + E.rows.length + 1;
export const EXPORT_DURATION = 320 + (PARTS - 1) * STEP + 420 + 300;

export const ExportExample = ({ id = 'export-example', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: EXPORT_DURATION });
  const at = (i) => ({ '--i': i, '--step': `${STEP}ms` });
  return (
    <AppFrame id={id} className="export-example" title={E.title} view={E.view} caption={E.caption} play={play} playClass={playClass} figureRef={ref}>
      <div className="export-head">
        <p className="app-quiet" style={{ margin: 0 }}>{E.context}</p>
        <AppButton icon={Download} primary>{E.file}</AppButton>
      </div>
      <article className="export-page app-card" aria-label={`${E.reportTitle}, exported page`}>
        <p className="export-title" data-appear style={at(0)}>{E.reportTitle}</p>
        <p className="export-heading" data-appear style={at(1)}>{E.heading}</p>
        <p className="export-para" data-appear style={at(2)}>
          {keepDates(E.paragraph)} (<span className="export-source"><FileText aria-hidden="true" />{E.source}</span>).
        </p>
        <blockquote className="export-quote" data-appear style={at(3)}>
          <p>“{keepDates(E.quote)}”</p>
          <footer>{keepDates(E.quoteSource)}</footer>
        </blockquote>
        <table className="export-table" role="table">
          <caption data-appear style={at(4)}>{E.tableCaption}</caption>
          <thead role="rowgroup">
            <tr role="row" data-appear style={at(4)}>{E.columns.map((c) => <th key={c} role="columnheader" scope="col">{c}</th>)}</tr>
          </thead>
          <tbody role="rowgroup">
            {E.rows.map((row, k) => (
              <tr key={row[1]} role="row" data-appear style={at(5 + k)}>
                {row.map((cell) => <td key={cell} role="cell">{keepDates(cell)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="export-folio" data-appear style={at(5 + E.rows.length)}>{E.folio}</p>
      </article>
    </AppFrame>
  );
};
