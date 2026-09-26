import { useId } from 'react';
import { cn } from '@/lib/utils';

// A figure: a prose summary for screen readers before the illustration, and a caption
// "Fig. n. … See note A." beneath it. The frame can hold a fixed ratio or a min-height.
export const Figure = ({ summary, caption, children, className, frameClassName, as: Tag = 'figure', labelledBy }) => {
  const uid = useId();
  const sumId = `${uid}-sum`;
  const capId = `${uid}-cap`;
  return (
    <Tag className={cn('m-0', className)} aria-labelledby={labelledBy || (caption ? capId : undefined)} aria-describedby={summary ? sumId : undefined}>
      {summary && (
        <p id={sumId} className="sr-only">
          {summary}
        </p>
      )}
      <div className={cn('relative', frameClassName)}>{children}</div>
      {caption && (
        <figcaption id={capId} className="mt-3 max-w-measure text-caption text-graphite">
          {caption}
        </figcaption>
      )}
    </Tag>
  );
};
