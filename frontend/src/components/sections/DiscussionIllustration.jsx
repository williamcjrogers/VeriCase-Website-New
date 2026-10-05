import { DISCUSSION_ILLUSTRATION, EVIDENCE_ILLUSTRATION } from '@/content/marketing';
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

// Discussion: comments kept with the record they concern. Roles, not people; no mentions or
// notifications.
export const DiscussionIllustration = ({ id = 'discussion-illustration' }) => (
  <Illustration id={id} className="discussion-illustration" title={DISCUSSION_ILLUSTRATION.title} caption={DISCUSSION_ILLUSTRATION.caption}>
    <div className="discussion-body">
      <QuotedRecord source={EVIDENCE_ILLUSTRATION[DISCUSSION_ILLUSTRATION.recordIndex]} />
      <div>
        <h4 className="capability-feature-title">{DISCUSSION_ILLUSTRATION.commentsLabel}</h4>
        <ol className="evidence-thread">
          {DISCUSSION_ILLUSTRATION.comments.map((comment) => (
            <li key={comment.role}>
              <p className="text-small text-graphite">{comment.role}</p>
              <p className="text-body">{comment.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </Illustration>
);
