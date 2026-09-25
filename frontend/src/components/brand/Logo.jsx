import { cn } from '@/lib/utils';
import { LOGO_AZURE_PATH, LOGO_NAVY_PATH, LOGO_VIEWBOX, MARK_PATH, MARK_VIEWBOX } from '@/components/brand/logoPaths';

// tone="positive": azure and navy on light grounds. tone="reversed": azure-300 and parchment on ink.
// `decorative` hides it from assistive technology where the enclosing link already names it.
export const Logo = ({ tone = 'positive', className, title = 'VeriCase', decorative = false }) => {
  const azure = tone === 'reversed' ? 'var(--vc-azure-300)' : 'var(--vc-azure-500)';
  const navy = tone === 'reversed' ? 'var(--vc-parchment)' : 'var(--vc-navy)';
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={cn('block h-auto', className)}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? 'true' : undefined}
      focusable="false"
    >
      <path fill={azure} d={LOGO_AZURE_PATH} />
      <path fill={navy} d={LOGO_NAVY_PATH} />
    </svg>
  );
};

// The swoosh "V" alone: the header mark below 360 px and the basis of the verification tick.
export const LogoMark = ({ className, title = 'VeriCase', decorative = false, color = 'var(--vc-azure-500)' }) => (
  <svg
    viewBox={MARK_VIEWBOX}
    className={cn('block', className)}
    role={decorative ? undefined : 'img'}
    aria-label={decorative ? undefined : title}
    aria-hidden={decorative ? 'true' : undefined}
    focusable="false"
  >
    <path fill={color} d={MARK_PATH} />
  </svg>
);
