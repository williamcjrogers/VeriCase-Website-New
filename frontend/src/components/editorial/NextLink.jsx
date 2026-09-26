import { ArrowDown } from 'lucide-react';
import { onSectionClick } from '@/lib/navigate';
import { cn } from '@/lib/utils';

// The link at the foot of a chapter to the one that follows: a mono label with a down arrow.
// `href` is the in-page anchor ("#research"); the click moves focus to that section.
export const NextLink = ({ href, label, className }) => (
  <a
    href={href}
    onClick={onSectionClick(href.slice(1))}
    className={cn(
      'inline-flex min-h-[44px] items-center gap-2 font-mono text-meta font-medium uppercase tracking-[0.06em] text-azure-700 hover:text-navy',
      className
    )}
  >
    <ArrowDown className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
    {label}
  </a>
);
