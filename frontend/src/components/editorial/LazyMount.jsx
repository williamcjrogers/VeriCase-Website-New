import { Suspense, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Mounts heavy demonstrations only when they come within 600 px of the viewport, behind a
// skeleton of the same size, so nothing shifts when they arrive.
export const LazyMount = ({ children, minHeight, className, skeleton, rootMargin = '600px 0px' }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  const fallback = skeleton || <div className="vc-skeleton h-full w-full" aria-hidden="true" />;
  return (
    <div ref={ref} className={cn('relative', className)} style={minHeight ? { minHeight } : undefined}>
      {show ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
};
