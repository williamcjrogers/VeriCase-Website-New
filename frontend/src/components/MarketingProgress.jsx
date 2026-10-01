import { useEffect } from 'react';
import { captureMarketingEvent, hasAnalyticsConsent } from '@/lib/analytics';

// Observe headings, not whole chapters: chapters can be taller than the viewport.
// Start fresh after consent; never replay a visitor's earlier, unconsented activity.
export const MarketingProgress = () => {
  useEffect(() => {
    let observer;
    const start = () => {
      observer?.disconnect();
      if (!hasAnalyticsConsent() || typeof IntersectionObserver === 'undefined') return;
      const seen = new Set();
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const section = entry.target.closest('section[id]')?.id;
          if (entry.isIntersecting && section && !seen.has(section)) {
            seen.add(section);
            captureMarketingEvent('marketing_section_viewed', { section });
          }
        }
      }, { threshold: 1 });
      document.querySelectorAll('main section[id] h1, main section[id] h2').forEach((heading) => observer.observe(heading));
    };
    start();
    window.addEventListener('vc-consent-change', start);
    return () => {
      observer?.disconnect();
      window.removeEventListener('vc-consent-change', start);
    };
  }, []);
  return null;
};
