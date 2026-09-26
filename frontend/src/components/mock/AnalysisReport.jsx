import { Fragment, useId } from 'react';
import { EyeOff, FileDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Gated, isShown } from '@/components/editorial/Gated';
import { VerificationTick } from '@/components/editorial/VerificationTick';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { CreateBundleDialog } from '@/components/mock/CreateBundleDialog';
import { REPORT } from '@/content/matter/research';
import { UI, badgeLine, hiddenLine } from '@/components/research/copy';

const ms = (n) => ({ '--d': `${n}ms` });

// A word and the superscript citations that follow it, held together on one line so that a
// citation never starts a line on its own. Adjacent citations are parted by a thin space.
const Cited = ({ word, ids, numbers, list, className }) => (
  <span className="rs-glue">
    {word}
    {ids.map((id, i) => (
      <Fragment key={id}>
        {i > 0 && '\u2009'}
        <EvidenceChip id={id} variant="superscript" n={numbers[id]} list={list} className={className} />
      </Fragment>
    ))}
  </span>
);

// A prepared summary: text with [[c:EV-nnnn]] markers, each rendered as the numbered citation of
// that record in this report. (Rich does the same, but pulling it into this chunk would
// deoptimise the shared copy modules in the initial bundle.)
const GROUP = /([^\s[]*)((?:\[\[c:EV-\d{4}\]\])+)/g;
const Summary = ({ text, numbers, list }) => {
  const out = [];
  let last = 0;
  for (const m of text.matchAll(GROUP)) {
    out.push(text.slice(last, m.index));
    const ids = m[2].match(/EV-\d{4}/g);
    out.push(<Cited key={m.index} word={m[1]} ids={ids} numbers={numbers} list={list} />);
    last = m.index + m[0].length;
  }
  out.push(text.slice(last));
  return out;
};

// A finding's text, with its last word kept beside its citation.
const Finding = ({ finding, list }) => {
  const at = finding.text.search(/\S+$/);
  return (
    <>
      {finding.text.slice(0, at)}
      <Cited word={finding.text.slice(at)} ids={[finding.ev]} numbers={{ [finding.ev]: finding.n }} list={list} className="rs-cite" />
    </>
  );
};

// Download PDF: in the demonstration it explains itself and creates nothing.
function DownloadPdf() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="vc-btn vc-btn-secondary">
          <FileDown className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          {REPORT.downloadPdf}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        collisionPadding={16}
        aria-label={REPORT.downloadPdf}
        className="ph-no-capture w-[min(20rem,calc(100vw-2rem))] rounded-md border-rule-strong bg-paper p-4 text-caption text-ink shadow-lift"
      >
        {REPORT.downloadNote}
      </PopoverContent>
    </Popover>
  );
}

// One stat card in the report header. A changed value fades in, so a re-run reads as one.
const Stat = ({ label, value, className, children }) => (
  <div className={className ? `rs-stat ${className}` : 'rs-stat'}>
    <dt>{label}</dt>
    <dd key={value} className="rs-enter">
      {children || value}
    </dd>
  </div>
);

// Before a broad question has run there is no report yet: the sheet waits, empty.
export const ReportPending = () => (
  <div className="rs-report rs-report-pending">
    <p className="rs-report-head">{REPORT.title}</p>
    <p className="rs-pending-text">{UI.pending}</p>
  </div>
);

// The VeriCase Analysis Report: a paper document with a blue header, stat cards, a summary and
// numbered findings whose superscript citations open their sources. The sequence (sheet and
// header, cards, findings, then each finding's citation) plays after `start` ms when the figure
// is in view. On a re-run (`enter` off) the sheet stays and only its contents replay.
export function AnalysisReport({ report, start = 0, enter = true, playing, bundle }) {
  const titleId = useId();
  const summaryId = useId();
  const findingsId = useId();
  const hiddenId = useId();
  const cites = report.findings.map((f) => f.ev);
  const first = start + 360;
  const after = first + 200 + report.findings.length * 80;

  return (
    <article aria-labelledby={titleId} className={enter ? 'rs-report rs-seq' : 'rs-report'} style={ms(start)}>
      <header className="rs-report-head">
        <h3 id={titleId}>{REPORT.title}</h3>
        <span className="rs-runline" style={ms(start + 120)} aria-hidden="true" />
      </header>
      <div className="rs-report-body">
        <p className="rs-generated rs-seq" style={ms(start + 60)}>
          {REPORT.generated}
        </p>

        <dl className="rs-stats rs-seq" style={{ ...ms(start + 140), '--tick': `${after + 160}ms` }}>
          <Stat label={REPORT.cards.cited} value={report.cited} />
          <Stat label={REPORT.cards.analysed} value={report.analysed} />
          {isShown(REPORT.badgeGate) && (
            <Stat label={REPORT.cards.validation} value={`valid-${report.cited}`} className="rs-valid">
              <Gated id={REPORT.badgeGate} block>
                <span className="rs-valid-state">
                  <VerificationTick draw={playing} className="rs-valid-tick" />
                  {REPORT.cards.passed}
                </span>
                <span className="rs-valid-line">{badgeLine(report.cited)}</span>
              </Gated>
            </Stat>
          )}
        </dl>

        <section aria-labelledby={summaryId} className="rs-section rs-seq" style={ms(start + 240)}>
          <h4 id={summaryId} className="rs-label">
            {UI.summary}
          </h4>
          {report.summary ? (
            <p className="rs-summary">
              <Summary text={report.summary} numbers={report.numbers} list={cites} />
            </p>
          ) : (
            <p className="rs-summary-none">{REPORT.notRegenerated}</p>
          )}
        </section>

        <section aria-labelledby={findingsId} className="rs-section">
          <h4 id={findingsId} className="rs-label rs-seq" style={ms(first - 40)}>
            {UI.findings}
          </h4>
          {report.findings.length > 0 && (
            <ol role="list" className="rs-findings">
              {report.findings.map((f, i) => (
                <li key={f.ev} className="rs-finding rs-seq" style={ms(first + i * 80)}>
                  <span className="rs-fn">{f.n}</span>
                  <p className="rs-finding-text">
                    <Finding finding={f} list={cites} />
                  </p>
                </li>
              ))}
            </ol>
          )}
          {report.hiddenText && (
            <p id={hiddenId} className="rs-hidden rs-seq" style={ms(after)}>
              <EyeOff className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              <span>{hiddenLine(report)}</span>
            </p>
          )}
        </section>

        <p className="rs-limits rs-seq" style={ms(after + 40)}>
          {REPORT.limits}
        </p>

        <div className="rs-actions rs-seq" style={ms(after + 100)}>
          <DownloadPdf />
          <CreateBundleDialog {...bundle} count={report.cited} describedBy={report.cited ? undefined : hiddenId} />
        </div>
      </div>
    </article>
  );
}
