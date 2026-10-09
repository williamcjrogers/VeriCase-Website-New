import { Check, X } from 'lucide-react';
import { DIFFERENCE as D } from '@/content/home';

// The difference: what VeriCase does that files and spreadsheets do not, as a table in the
// reference's manner (a rounded card, the header row on warm grey, alternate rows tinted, a grey
// cross and a blue tick). The marks are read out as words.
export const Difference = () => (
  <section id="difference" aria-labelledby="difference-title" className="clarity-section difference bg-paper">
    <div className="container">
      <div className="difference-head">
        <p className="section-kicker">{D.kicker}</p>
        <h2 id="difference-title" tabIndex={-1} className="clarity-heading">{D.h2Lead} <span className="text-gradient">{D.h2Emphasis}</span></h2>
      </div>
      <div className="difference-card">
        <table className="difference-table">
          <thead>
            <tr>{D.columns.map((c, i) => <th key={c} scope="col" className={i === 2 ? 'is-us' : undefined}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {D.rows.map((row) => (
              <tr key={row}>
                <th scope="row">{row}</th>
                <td><span className="difference-no"><X aria-hidden="true" /><span className="sr-only">{D.no}</span></span></td>
                <td><span className="difference-yes"><Check aria-hidden="true" /><span className="sr-only">{D.yes}</span></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);
