import { cn } from '@/lib/utils';


// tone="positive": azure and navy on light grounds. tone="reversed": azure-300 and parchment on ink.
// Served as an SVG file (public/logo-*.svg, traced from the brand PNG) so its paths stay out of
// the JavaScript bundle; the width and height attributes reserve its box before it loads.
// `decorative` hides it from assistive technology where the enclosing link already names it.
export const Logo = ({ tone = 'positive', className, title = 'VeriCase', decorative = false }) => (
  <img
    src={tone === 'reversed' ? '/logo-reversed.svg' : '/logo-positive.svg'}
    alt={decorative ? '' : title}
    width="408"
    height="83"
    decoding="async"
    className={cn('block h-auto', className)}
  />
);

export const LogoMark = ({ className, title = 'VeriCase', decorative = false, color = 'currentColor' }) => (
  <svg
    viewBox="0 0 24 32"
    className={cn('block', className)}
    role={decorative ? undefined : 'img'}
    aria-label={decorative ? undefined : title}
    aria-hidden={decorative ? 'true' : undefined}
    focusable="false"
  >
    <text x="2" y="24" fontFamily="Newsreader, Georgia, serif" fontSize="24" fill={color}>V</text>
  </svg>
);
