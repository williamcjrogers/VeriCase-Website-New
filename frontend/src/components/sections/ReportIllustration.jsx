import { CONTEXT_LABEL, EVIDENCE_ILLUSTRATION, ILLUSTRATION_LABEL, REPORT_ILLUSTRATION } from '@/content/marketing';
import './report-illustration.css';

// A report exported with its structure and sources (product reference PR-04): one page of output
// with its title, a heading, a paragraph whose citation is a source link, a quotation kept distinct
// from the analysis with its attribution, and a table of events with their records. It is an
// output, not a drafting screen, and names no file format. Still: it does not move.

const keepDates = (text) => text.replace(/(\d{2}) ([A-Z][a-z]+) (\d{4})/g, '$1 $2 $3');

export const ReportIllustration = ({ id = 'report-illustration' }) => {
  const E = REPORT_ILLUSTRATION;
  const quoted = EVIDENCE_ILLUSTRATION[E.quoteSource];
  return (
    <figure className="evidence-figure report-illustration" aria-labelledby={`${id}-title`}>
      <div className="report-split">
        <div className="report-head">
          <p className="section-kicker">{ILLUSTRATION_LABEL}</p>
          <h3 id={`${id}-title`} className="evidence-figure-title text-[1.625rem] leading-tight">{E.title}</h3>
          <p className="evidence-context"><span className="evidence-context-label">{CONTEXT_LABEL}</span> <span className="evidence-context-text">{E.context}</span></p>
        </div>
        <div className="report-main">
          <div className="report-page" role="group" aria-label={E.pageName}>
            <p className="report-title">{E.reportTitle.replace(/type B/g, 'type\u00a0B')}</p>
            <p className="report-heading">{E.heading}</p>
            <p className="report-para">
              {keepDates(E.paragraph)} (<span className="report-source">{E.source}<span className="sr-only">, {E.sourceNote}</span></span>).
            </p>
            <figure className="report-quote">
              <blockquote><p>“{keepDates(E.quote)}”</p></blockquote>
              <figcaption>{quoted.document}, {keepDates(quoted.date)}</figcaption>
            </figure>
            {/* Explicit roles keep the table a table where phones stack its rows. */}
            <table className="report-table" role="table">
              <caption>{E.tableCaption}</caption>
              <thead role="rowgroup">
                <tr role="row">{E.columns.map((column) => <th key={column} role="columnheader" scope="col">{column}</th>)}</tr>
              </thead>
              <tbody role="rowgroup">
                {E.rows.map((event, i) => (
                  <tr key={event} role="row">
                    <td role="cell">{event}</td>
                    <td role="cell">{EVIDENCE_ILLUSTRATION[i].document}</td>
                    <td role="cell"><time dateTime={EVIDENCE_ILLUSTRATION[i].isoDate}>{keepDates(EVIDENCE_ILLUSTRATION[i].date)}</time></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="report-folio">{E.folio.replace(/ /g, ' ')}</p>
          </div>
        </div>
      </div>
      <figcaption>{E.caption}</figcaption>
    </figure>
  );
};
