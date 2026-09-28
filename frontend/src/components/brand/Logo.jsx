import { cn } from '@/lib/utils';
import { MARK_PATH, MARK_VIEWBOX } from '@/components/brand/logoPaths';

// tone="positive": azure and navy on light grounds. tone="reversed": azure-300 and parchment on ink.
// Served as an SVG file (public/logo-*.svg, traced from the brand PNG) so its paths stay out of
// the JavaScript bundle; the width and height attributes reserve its box before it loads.
// `decorative` hides it from assistive technology where the enclosing link already names it.
export const Logo = ({ tone = 'positive', className, title = 'VeriCase', decorative = false }) => (
  <img
    src={tone === 'reversed' ? '/logo-reversed.svg' : '/logo-positive.svg'}
    alt={decorative ? '' : title}
    width="3941"
    height="1121"
    decoding="async"
    className={cn('block h-auto', className)}
  />
);

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
