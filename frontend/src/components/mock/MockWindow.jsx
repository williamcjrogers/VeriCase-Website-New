import { cn } from '@/lib/utils';

// An app-family window: a VeriCase-blue header strip with white text, a paper body, navy text
// and beige chips, so the illustrations read as the same family as the live product.
export const MockWindow = ({ title, right, children, className, bodyClassName, dense = false }) => (
  <div className={cn('ph-no-capture overflow-hidden rounded-md border border-rule-strong/70 bg-paper shadow-paper', className)}>
    <div className={cn('flex items-center justify-between gap-3 bg-azure-500 px-4 text-white', dense ? 'h-9' : 'h-10')}>
      <div className="flex min-w-0 items-center gap-2">
        <span className="hidden gap-1.5 min-[360px]:flex" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/45" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </span>
        <span className="truncate text-[0.875rem] font-medium">{title}</span>
      </div>
      {right && <span className="shrink-0 font-mono text-[0.75rem] text-white">{right}</span>}
    </div>
    <div className={cn('relative text-ink', bodyClassName)}>{children}</div>
  </div>
);
