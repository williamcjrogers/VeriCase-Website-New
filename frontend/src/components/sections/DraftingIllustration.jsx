import { DRAFTING_ILLUSTRATION, EVIDENCE_ILLUSTRATION } from '@/content/marketing';
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

// Drafting: a claim section whose paragraphs each rest on a named record.
export const DraftingIllustration = ({ id = 'drafting-illustration' }) => (
  <Illustration id={id} className="drafting-illustration" title={DRAFTING_ILLUSTRATION.title} caption={DRAFTING_ILLUSTRATION.caption}>
    <div className="draft-head">
      <h4 className="capability-feature-title">{DRAFTING_ILLUSTRATION.sectionLabel}</h4>
      {/* A column label, not a heading: every paragraph already names its record. */}
      <p className="capability-feature-title draft-record-label" aria-hidden="true">{DRAFTING_ILLUSTRATION.recordsLabel}</p>
    </div>
    <ol className="draft-outline">
      {DRAFTING_ILLUSTRATION.paragraphs.map((paragraph, i) => (
        <li key={paragraph.n}>
          <p className="text-body">{paragraph.n} {keepDates(paragraph.text)}</p>
          <p className="text-small text-graphite">{attribution(EVIDENCE_ILLUSTRATION[i])}</p>
        </li>
      ))}
    </ol>
    <p className="evidence-gap text-small text-graphite">{DRAFTING_ILLUSTRATION.status}</p>
  </Illustration>
);

