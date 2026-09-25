import { cn } from '@/lib/utils';
import { MARK_PATH, MARK_VIEWBOX } from '@/components/brand/logoPaths';

// The logo's swoosh, used only where something has been checked: all sources linked,
// citations checked, hash match, reply accepted. `draw` reveals it left to right once.
export const VerificationTick = ({ className, draw = false, label, tone = 'azure' }) => {
  const fill = tone === 'ink' ? 'var(--vc-azure-300)' : tone === 'brass' ? 'var(--vc-brass-700)' : 'var(--vc-azure-700)';
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={cn('inline-block h-[1.1em] w-[1.1em] shrink-0 align-[-0.15em]', draw && 'vc-tick-draw', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
      focusable="false"
    >
      <path fill={fill} d={MARK_PATH} />
    </svg>
  );
};
