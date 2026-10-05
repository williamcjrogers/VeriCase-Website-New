import { CONTEXT_LABEL, EVIDENCE_ILLUSTRATION, REPORT_ILLUSTRATION } from '@/content/marketing';
import { LiveFigure, keepDates, useFigurePlay } from './illustrationKit';
import './report-illustration.css';

// A report exported with its structure and sources (product reference PR-04). Nothing is typed:
// an export is produced, not written in front of the reader. The page lies on the panel as a
// blank sheet, with the next sheet beneath it, from the start; its content then comes out top to
// bottom in turn: the title, the heading, the paragraph (its citation underlined as a source link
// a beat later), the quotation (its brass rule drawn down beside it), the table's caption with its
// column heads, each row, and last the folio. It is an output, not a drafting screen, and names
// no file format; nothing in it is a control.
//
// The sequence, in ms from the start (report-illustration.css sets the rhythm): the title at 320,
// then one turn of 420 for each part below it; the folio, in the ninth turn, starts at
// 320 + 8 * 420 = 3680 and settles 420 later, at 4100; the duration adds 300.
export const REPORT_DURATION = 4400;

// The turns, top to bottom. The table's caption and its column heads share one turn; each row
// then takes its own, and the folio follows the last row.
const TITLE = 0;
const HEADING = 1;
const PARAGRAPH = 2;
const QUOTE = 3;
const TABLE = 4;
const row = (k) => TABLE + 1 + k;
const at = (turn) => ({ '--i': turn });

export const ReportIllustration = ({ id = 'report-illustration', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: REPORT_DURATION });
  const E = REPORT_ILLUSTRATION;
  const quoted = EVIDENCE_ILLUSTRATION[E.quoteSource];
  return (
    <LiveFigure id={id} className="report-illustration" title={E.title} caption={E.caption} play={play} playClass={playClass} figureRef={ref}>
      <p className="report-context"><span className="report-context-label">{CONTEXT_LABEL}</span> <span className="report-context-text">{E.context}</span></p>
      <div className="report-main">
        <div className="report-page on-paper" role="group" aria-label={E.pageName}>
          <p className="report-title" data-appear style={at(TITLE)}>{E.reportTitle.replace(/type B/g, 'type\u00a0B')}</p>
          <p className="report-heading" data-appear style={at(HEADING)}>{E.heading}</p>
          {/* The citation is a source link in the report, not a control here: nothing to focus. */}
          <p className="report-para" data-appear style={at(PARAGRAPH)}>
            {keepDates(E.paragraph)} (<span className="report-source">{E.source}<span className="sr-only">, {E.sourceNote}</span></span>).
          </p>
          <figure className="report-quote" data-appear style={at(QUOTE)}>
            <blockquote><p>“{keepDates(E.quote)}”</p></blockquote>
            <figcaption>{quoted.document}, {keepDates(quoted.date)}</figcaption>
          </figure>
          {/* Explicit roles keep the table a table where narrow pages stack its rows. */}
          <table className="report-table" role="table">
            <caption data-appear style={at(TABLE)}>{E.tableCaption}</caption>
            <thead role="rowgroup">
              <tr role="row" data-appear style={at(TABLE)}>{E.columns.map((column) => <th key={column} role="columnheader" scope="col">{column}</th>)}</tr>
            </thead>
            <tbody role="rowgroup">
              {E.rows.map((event, k) => (
                <tr key={event} role="row" data-appear style={at(row(k))}>
                  <td role="cell">{event}</td>
                  <td role="cell">{EVIDENCE_ILLUSTRATION[k].document}</td>
                  <td role="cell"><time dateTime={EVIDENCE_ILLUSTRATION[k].isoDate}>{keepDates(EVIDENCE_ILLUSTRATION[k].date)}</time></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="report-folio" data-appear style={at(row(E.rows.length))}>{E.folio.replace(/ /g, '\u00a0')}</p>
        </div>
      </div>
    </LiveFigure>
  );
};
