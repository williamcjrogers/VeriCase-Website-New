import { useState } from 'react';
import { CaptionText } from '@/components/editorial/Figure';
import { LazyMount } from '@/components/editorial/LazyMount';
import { IS_PREVIEW } from '@/content/gates';
import { cn } from '@/lib/utils';

// A plate in a fixed aspect-ratio box. With an approved photograph (`src`), a lazy <picture>
// over a blurred placeholder. Without one, the plate's drawing (`drawing`, a lazy component from
// components/plates) loads as the box comes near, on a paper skeleton of the same size. With
// neither, the box keeps its size and, on previews only, shows a stand-in marked for gate G10;
// a production build never shows a stand-in.
export const Plate = ({
  src, // base path without width, e.g. '/media/plate-archive'
  drawing: Drawing,
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
  if (!src && !Drawing && !IS_PREVIEW) return null;
  const drawn = !src && Drawing;
  const set = (base, ws) => ws.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
  const style = { aspectRatio: ratio, ...(lqip ? { backgroundImage: `url(${lqip})`, backgroundSize: 'cover' } : {}) };
  return (
    <figure className={cn('m-0', className)}>
      <div
        className={cn('vc-plate relative overflow-hidden', drawn ? (onInk ? 'bg-transparent' : 'bg-paper') : 'bg-parchment-300', ratioMobile && 'vc-plate-art', frameClassName)}
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
        ) : drawn ? (
          <LazyMount className="absolute inset-0" rootMargin="400px 0px" skeleton={<div className="absolute inset-0" aria-hidden="true" />}>
            <Drawing label={alt} />
          </LazyMount>
        ) : (
          <div className="vc-plate-standin absolute inset-0" role="img" aria-label={alt} data-gate="G10" />
        )}
      </div>
      {caption && (
        <figcaption className={cn('mt-3 text-caption', onInk ? 'text-mist' : 'text-graphite', captionClassName)}>
          <CaptionText text={caption} />
        </figcaption>
      )}
    </figure>
  );
};
