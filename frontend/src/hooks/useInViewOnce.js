import { useEffect, useRef, useState } from 'react';

// True once at least `threshold` of the element is in view, or once the element fills that share
// of the viewport (an element taller than the viewport may never reach a large threshold). Fires
// once and disconnects. Where IntersectionObserver is missing, it reports true at once so nothing
// stays hidden.
export function useInViewOnce({ threshold = 0.2, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    // Some browsers report an entry as soon as an edge enters the viewport, whatever the
    // threshold, so the share in view is checked here rather than assumed.
    const seen = (e) => e.isIntersecting && (
      e.intersectionRatio + 0.001 >= threshold
      || (e.rootBounds && e.rootBounds.height > 0 && e.intersectionRect.height + 1 >= threshold * e.rootBounds.height)
    );
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some(seen)) {
          setInView(true);
          io.disconnect();
        }
      },
      // Intermediate steps let a tall element be checked against the viewport as it scrolls in.
      { threshold: [...new Set([0, 0.25, 0.5, threshold, 0.75, 1])].sort((a, b) => a - b), rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, inView]);

  return [ref, inView];
}
