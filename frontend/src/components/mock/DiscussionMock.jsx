import { Fragment } from 'react';
import { MockWindow } from '@/components/mock/MockWindow';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { DISCUSSION as D, WORKBENCH, addressLabel, recordById } from '@/content/sampleMatter';
import { formatDate } from '@/lib/format';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { cn } from '@/lib/utils';
import { DISCUSSION_ID } from '@/components/claims/ids';

const doc = recordById(D.doc);
const [, docParties, docDate] = D.header.split(' · ');
const EV = /(EV-\d{4})/;
const CITED = [D.doc, ...new Set(D.comments.flatMap((c) => c.text.match(new RegExp(EV, 'g')) || []))];
const HEAD = 'flex min-h-[3.25rem] flex-wrap items-center gap-x-2 gap-y-1 px-4 py-2 sm:px-5';

// Comment text, with any exhibit reference as a chip that opens its source.
const WithChips = ({ text }) =>
  text.split(EV).map((part, i) => (EV.test(part) ? <EvidenceChip key={i} id={part} list={CITED} /> : <Fragment key={i}>{part}</Fragment>));

// Fig. 6: a discussion among the legal team, anchored to the document it concerns. One brass
// rule joins the document's header to the discussion's heading, and draws once in view.
// Participants appear by role only: initials in a square, never a face.
export const DiscussionMock = () => {
  const [ref, inView] = useInViewOnce({ threshold: 0.3 });
  return (
    <MockWindow title={WORKBENCH.window} right={<span className="hidden text-white sm:inline">Fig. 6</span>} className="cb-root">
      <div ref={ref} className={cn('relative grid md:grid-cols-2', inView && 'is-in')}>
        <span aria-hidden="true" className="draw-x absolute inset-x-0 top-[3.25rem] z-[1] hidden h-px bg-brass-400 duration-300 md:block" />

        <article aria-label={D.header} className="border-b border-rule bg-white md:border-b-0 md:border-r">
          <p className={HEAD}>
            <EvidenceChip id={D.doc} list={CITED} />
            <span className="text-meta text-graphite">{docParties}</span>
            <span className="font-mono text-meta text-graphite">{docDate}</span>
          </p>
          <dl className="border-t border-rule px-4 pt-3 text-meta sm:px-5 md:border-t-0">
            {[
              ['From', addressLabel(doc.from)],
              ['To', doc.to.map(addressLabel).join('; ')],
              ['Date', `${formatDate(doc.date)}, ${doc.time}`],
              ['Subject', doc.subject],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-2 py-0.5">
                <dt className="font-mono text-label uppercase text-graphite">{k}</dt>
                <dd className="min-w-0 break-words text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="px-4 pb-6 pt-4 font-display text-[1.125rem] leading-relaxed text-ink sm:px-5">{doc.authored}</p>
        </article>

        <div className="bg-paper">
          <div className={HEAD}>
            <h3 id={`${DISCUSSION_ID}-title`} tabIndex={-1} className="font-mono text-label font-medium uppercase text-navy outline-none">
              {D.heading}
            </h3>
          </div>
          <ol aria-labelledby={`${DISCUSSION_ID}-title`} className="mx-4 mb-5 mt-1 space-y-5 border-l border-brass-400 pl-4 pt-3 sm:mx-5 md:mx-0 md:border-l-0 md:px-5">
            {D.comments.map((c) => (
              <li key={c.when} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3">
                <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center border border-rule-strong bg-paper font-mono text-label font-medium text-navy">
                  {c.initials}
                </span>
                <div className="min-w-0">
                  <p className="flex flex-wrap items-baseline gap-x-2 text-meta">
                    <span className="font-medium text-navy">{c.role}</span>
                    <span className="font-mono text-graphite">{c.when}</span>
                  </p>
                  <p className="mt-1 text-small text-ink">
                    {c.mention && <span className="mr-1 inline-flex rounded-sm border border-rule-strong bg-parchment-300 px-1.5 text-meta font-medium text-navy">{c.mention}</span>}
                    {c.quote && <span className="font-display text-[1.0625rem] italic text-navy">{c.quote}</span>} <WithChips text={c.text} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </MockWindow>
  );
};
