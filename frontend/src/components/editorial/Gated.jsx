import { GATES, IS_PREVIEW } from '@/content/gates';
import { cn } from '@/lib/utils';

// Renders children unless the gate is struck. On previews, open gates are marked in place so the
// owner can review them in context; a production build with an open gate fails (lint-copy).
export const Gated = ({ id, children, as: Tag = 'span', className, block = false }) => {
  const g = GATES[id];
  if (!g) throw new Error(`Unknown gate: ${id}`);
  if (g.status === 'struck') return null;
  if (g.status === 'confirmed' || !IS_PREVIEW) return block ? <div className={className}>{children}</div> : <>{children}</>;
  const Wrap = block ? 'div' : Tag;
  return (
    <Wrap className={cn('vc-gate', block && 'vc-gate-block', className)} data-gate={g.gate} title={`Owner to confirm (${g.gate}): ${g.label}`}>
      {children}
      <span className="vc-gate-tag" aria-hidden="true">{g.gate}</span>
    </Wrap>
  );
};

export const isShown = (id) => !id || GATES[id]?.status !== 'struck';

// {{TOKEN}}: owner-supplied text. Visible on previews, and it blocks a production build.
export const Placeholder = ({ token }) => (
  <span className="vc-placeholder" data-token={token}>
    {`Owner to supply: ${token.replace(/_/g, ' ').toLowerCase()}`}
  </span>
);
