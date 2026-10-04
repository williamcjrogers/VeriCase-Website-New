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
    // threshold, so the share in view is checked here rather than assumed. A cross-origin frame
    // reports no root bounds, so the frame's own viewport stands in for them.
    const rootHeight = (e) => (e.rootBounds && e.rootBounds.height) || window.innerHeight;
    const seen = (e) => e.isIntersecting && (
      e.intersectionRatio + 0.001 >= threshold
      || e.intersectionRect.height + 1 >= threshold * rootHeight(e)
    );
    // Steps of 5% let an element taller than the viewport (at high zoom, for example) be checked
    // against the viewport as it scrolls in.
    const steps = Array.from({ length: 21 }, (_, i) => i / 20);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some(seen)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: [...new Set([...steps, threshold])].sort((a, b) => a - b), rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, inView]);

  return [ref, inView];
}
