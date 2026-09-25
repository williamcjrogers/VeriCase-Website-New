import { useState } from 'react';
import { cn } from '@/lib/utils';

// A photographic plate: a <picture> in a fixed aspect-ratio box with a blurred placeholder
// behind it, lazy by default, captioned "Plate n. … Illustrative image (AI-generated)."
// Until an image is supplied (`src` omitted) the box keeps its size and shows a quiet stand-in.
export const Plate = ({
  src, // base path without width, e.g. '/media/plate-archive'
  widths = [640, 960, 1440],
  sizes = '100vw',
  ratio = '3 / 2',
  ratioMobile,
  mobileSrc,
  mobileWidths,
  alt,
  caption,
  priority = false,
  lqip,
  className,
  frameClassName,
  captionClassName,
  onInk = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const set = (base, ws) => ws.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
  const style = { aspectRatio: ratio, ...(lqip ? { backgroundImage: `url(${lqip})`, backgroundSize: 'cover' } : {}) };
  return (
    <figure className={cn('m-0', className)}>
      <div
        className={cn('vc-plate relative overflow-hidden bg-parchment-300', ratioMobile && 'vc-plate-art', frameClassName)}
        style={{ ...style, '--ratio-mobile': ratioMobile || ratio }}
      >
        {src ? (
          <picture>
            {mobileSrc && <source media="(max-width: 767px)" srcSet={set(mobileSrc, mobileWidths || [640, 960])} sizes="100vw" type="image/webp" />}
            <source srcSet={set(src, widths)} sizes={sizes} type="image/webp" />
            <img
              src={`${src}-${widths[Math.min(1, widths.length - 1)]}.webp`}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={() => setLoaded(true)}
              className={cn('absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-settle', loaded ? 'opacity-100' : 'opacity-0')}
            />
          </picture>
        ) : (
          <div className="vc-plate-standin absolute inset-0" role="img" aria-label={alt} />
        )}
      </div>
      {caption && <figcaption className={cn('mt-3 text-caption', onInk ? 'text-mist' : 'text-graphite', captionClassName)}>{caption}</figcaption>}
    </figure>
  );
};
