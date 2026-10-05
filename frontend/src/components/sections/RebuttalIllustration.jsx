import { EVIDENCE_ILLUSTRATION, REBUTTAL_ILLUSTRATION } from '@/content/marketing';
import { ILLUSTRATION_LABEL } from '@/content/marketing';
import { cn } from '@/lib/utils';

const keepDates = (text) => text.replace(/(\d{2}) ([A-Z][a-z]+) (\d{4})/g, '$1\u00a0$2\u00a0$3');

// The four static illustrations below show capabilities that no application capture shows. They
// share one frame and the page's type roles, and they do not move.
const Illustration = ({ id, className, title, caption, children }) => (
  <figure className={cn('evidence-figure', className)} aria-labelledby={`${id}-title`}>
    <p className="section-kicker">{ILLUSTRATION_LABEL}</p>
    <h3 id={`${id}-title`} className="evidence-figure-title text-[1.625rem] leading-tight">{title}</h3>
    {children}
    <figcaption>{caption}</figcaption>
  </figure>
);

// A quoted record with its attribution outside the quoted words, as in the argument illustration.
// Anything said about the record (its relation to an assertion) belongs to the caption.
const QuotedRecord = ({ source, children }) => (
  <figure className="evidence-source">
    <blockquote>
      <p className="text-body">“{keepDates(source.excerpt)}”</p>
    </blockquote>
    <figcaption className="text-small text-graphite">{source.document}, {keepDates(source.date)}{children}</figcaption>
  </figure>
);

const attribution = (source) => `${source.document}, ${keepDates(source.date)}`;

// The opposing account: the assertion and the record on facing pages, then a proposed reply that
// the team reviews. Relations are stated in words, never in colour.
export const RebuttalIllustration = ({ id = 'rebuttal-illustration' }) => (
  <Illustration id={id} className="rebuttal-illustration" title={REBUTTAL_ILLUSTRATION.title} caption={REBUTTAL_ILLUSTRATION.caption}>
    <div className="rebuttal-pair">
      <div>
        <h4 className="capability-feature-title">{REBUTTAL_ILLUSTRATION.assertionLabel}</h4>
        <blockquote className="evidence-assertion">
          <p className="text-body">“{keepDates(REBUTTAL_ILLUSTRATION.assertion)}”</p>
        </blockquote>
      </div>
      <div>
        <h4 className="capability-feature-title">{REBUTTAL_ILLUSTRATION.recordsLabel}</h4>
        {REBUTTAL_ILLUSTRATION.records.map(({ index, relation }) => (
          <QuotedRecord key={EVIDENCE_ILLUSTRATION[index].id} source={EVIDENCE_ILLUSTRATION[index]}>
            <span className="evidence-relation">{relation}</span>
          </QuotedRecord>
        ))}
      </div>
    </div>
    <div className="evidence-reply">
      <h4 className="capability-feature-title">{REBUTTAL_ILLUSTRATION.replyLabel}</h4>
      <p className="text-body">
        {keepDates(REBUTTAL_ILLUSTRATION.reply)}{' '}
        <span className="whitespace-nowrap">({EVIDENCE_ILLUSTRATION[REBUTTAL_ILLUSTRATION.replySource].document})</span>.
      </p>
    </div>
  </Illustration>
);

