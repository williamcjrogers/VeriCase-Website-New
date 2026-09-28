import { Rich } from '@/components/editorial/Rich';
import { Sentences } from '@/components/editorial/Sentences';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { CHAPTERS, END_MATTER } from '@/content/home';
import { cn } from '@/lib/utils';

const SECTIONS = [...CHAPTERS, ...END_MATTER];

// Section opener, set like a statute: a side note in the margin (the chapter's numeral, large and
// italic, over its title in italic) beside the H2 and the lead. Below 1024 px the side note sits
// on one line above the heading. The H2 is focusable, so the Contents sheet and back-links can
// move focus to it, and a title of several sentences is set one sentence per line. A double
// hairline draws once when the header enters view.
export const ChapterHeader = ({ id, numeral, title, lead, onInk = false, className, children }) => {
  const [ref, inView] = useInViewOnce({ threshold: 0.3 });
  const note = SECTIONS.find((s) => s.id === id)?.title;
  return (
    <header ref={ref} className={cn('relative grid grid-cols-12 gap-x-6', inView && 'is-in', className)}>
      <p className="ch-side col-span-12 lg:col-span-2">
        {numeral && (
          <>
            <span aria-hidden="true" className="ch-numeral">
              {numeral}
            </span>
            <span className="sr-only">Chapter {numeral}: </span>
          </>
        )}
        {note && <span className="ch-note">{note}</span>}
      </p>
      <div className="col-span-12 mt-5 lg:col-span-9 lg:col-start-3 lg:mt-0 xl:col-span-8 xl:col-start-3">
        <div className="double-rule draw-x mb-6 max-w-[8rem]" aria-hidden="true" />
        <h2
          id={id ? `${id}-title` : undefined}
          tabIndex={-1}
          className={cn(
            'text-h2 font-medium outline-none focus-visible:outline-2 focus-visible:outline-offset-4',
            onInk ? 'focus-visible:outline-azure-300' : 'focus-visible:outline-azure-500'
          )}
        >
          <Sentences text={title} />
        </h2>
        {lead && (
          <p className={cn('mt-5 max-w-measure text-lead', onInk ? 'text-parchment/90' : 'text-ink')}>
            <Rich text={lead} onInk={onInk} />
          </p>
        )}
        {children}
      </div>
    </header>
  );
};
