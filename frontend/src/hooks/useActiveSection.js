import { useEffect, useState } from 'react';

// The id of the section currently under the reading line (just below the sticky header).
export function useActiveSection(ids, { enabled = true } = {}) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return undefined;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const current = ids.find((id) => visible.get(id));
        setActive(current || null);
      },
      // A thin band 30% down the viewport acts as the reading line.
      { rootMargin: '-30% 0px -69% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, enabled]);

  return active;
}
