import { Suspense, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Mounts heavy demonstrations only when they come within 600 px of the viewport, behind a
// skeleton of the same size, so nothing shifts when they arrive. Printing mounts every figure
// at once (and print media mounts them from the start), so a saved PDF never shows a skeleton.
export const LazyMount = ({ children, minHeight, className, skeleton, rootMargin = '600px 0px' }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(
    () => typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('print').matches
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return undefined;
    const print = typeof window.matchMedia === 'function' ? window.matchMedia('print') : null;
    const mountForPrint = () => setShow(true);
    const onPrintChange = (e) => {
      if (e.matches) mountForPrint();
    };
    window.addEventListener('beforeprint', mountForPrint);
    if (print && typeof print.addEventListener === 'function') print.addEventListener('change', onPrintChange);
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return () => {
        window.removeEventListener('beforeprint', mountForPrint);
        if (print && typeof print.removeEventListener === 'function') print.removeEventListener('change', onPrintChange);
      };
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
    return () => {
      io.disconnect();
      window.removeEventListener('beforeprint', mountForPrint);
      if (print && typeof print.removeEventListener === 'function') print.removeEventListener('change', onPrintChange);
    };
  }, [rootMargin, show]);

  const fallback = skeleton || <div className="vc-skeleton h-full w-full" aria-hidden="true" />;
  return (
    <div ref={ref} className={cn('relative', className)} style={minHeight ? { minHeight } : undefined}>
      {show ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
};
