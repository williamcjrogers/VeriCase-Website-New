import { useEffect, useState } from 'react';

// The id of the section currently under the reading line (just below the sticky header).
export function useActiveSection(ids, { enabled = true } = {}) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') {
      setActive(null);
      return undefined;
    }
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    setActive(null);
    if (!els.length) return undefined;
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const intersecting = els.filter((el) => visible.get(el.id));
        // A containing section (such as platform) is a fallback. Keep the caller's order
        // when unrelated sections share the reading line, regardless of callback order.
        const current = intersecting.find((el) => !intersecting.some((other) => other !== el && el.contains(other)));
        setActive(current?.id || null);
      },
      // A thin band 30% down the viewport acts as the reading line.
      { rootMargin: '-30% 0px -69% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, enabled]);

  return active;
}
