import { cn } from '@/lib/utils';

// The calmest typographic moment on the page: a brass-bordered box, a mono label and
// Newsreader text. Used for "What we do not claim" and the declaration of interest.
export const Declaration = ({ label, children, className, onInk = false }) => (
  <aside className={cn('border border-brass-400 px-6 py-5 sm:px-8 sm:py-7', onInk ? 'bg-transparent' : 'bg-paper/60', className)} aria-label={label}>
    <p className="eyebrow">{label}</p>
    <p className={cn('mt-3 font-display text-[1.375rem] leading-[1.45]', onInk ? 'text-parchment' : 'text-navy')}>{children}</p>
  </aside>
);
