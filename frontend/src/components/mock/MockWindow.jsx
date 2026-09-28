import { cn } from '@/lib/utils';

// An app-family window: a VeriCase-blue header strip with white text, a paper body, navy text
// and beige chips, so the illustrations read as the same family as the live product. No
// operating-system chrome: the strip carries the window's title and, at most, a reference.
export const MockWindow = ({ title, right, children, className, bodyClassName, dense = false }) => (
  <div className={cn('ph-no-capture overflow-hidden rounded-md border border-rule-strong/70 bg-paper shadow-paper', className)}>
    <div className={cn('flex items-center justify-between gap-3 bg-azure-500 px-4 text-white', dense ? 'h-9' : 'h-10')}>
      <span className="min-w-0 truncate text-[0.875rem] font-medium">{title}</span>
      {right && <span className="shrink-0 font-mono text-[0.75rem] text-white">{right}</span>}
    </div>
    <div className={cn('relative text-ink', bodyClassName)}>{children}</div>
  </div>
);
