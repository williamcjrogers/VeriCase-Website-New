import { Rich } from '@/components/editorial/Rich';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { cn } from '@/lib/utils';

// Chapter opener: a large italic roman numeral in the margin, the eyebrow in mono, the H2
// (focusable, so the Contents sheet and back-links can move focus to it) and the lead.
// A double hairline draws once when the header enters view.
export const ChapterHeader = ({ id, numeral, eyebrow, title, lead, onInk = false, className, children }) => {
  const [ref, inView] = useInViewOnce({ threshold: 0.3 });
  return (
    <header ref={ref} className={cn('relative grid grid-cols-12 gap-x-6', inView && 'is-in', className)}>
      {numeral ? (
        <span
          aria-hidden="true"
          className={cn(
            'col-span-12 font-display text-numeral italic leading-none lg:col-span-2 lg:-mt-3 lg:text-right',
            onInk ? 'text-brass-400' : 'text-brass-700'
          )}
        >
          {numeral}
        </span>
      ) : (
        <span aria-hidden="true" className="hidden lg:col-span-2 lg:block" />
      )}
      <div className="col-span-12 mt-4 lg:col-span-9 lg:col-start-3 lg:mt-0 xl:col-span-8 xl:col-start-3">
        <div className="double-rule draw-x mb-5 max-w-[8rem]" aria-hidden="true" />
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id ? `${id}-title` : undefined} tabIndex={-1} className="mt-3 text-h2 font-medium outline-none text-balance">
          {title}
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
