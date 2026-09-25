import { cn } from '@/lib/utils';

// An exhibit reference in a brass-edged mono tab. `stamp` plays the stamp animation once;
// the text is written in sentence case and set in capitals only when `caps` is on.
export const ExhibitStamp = ({ children, stamp = false, caps = false, className }) => (
  <span className={cn('ev-stamp', stamp && 'stamp-in', caps && 'uppercase', className)}>{children}</span>
);
