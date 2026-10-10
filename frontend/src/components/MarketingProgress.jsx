import { useEffect } from 'react';
import { captureMarketingEvent, hasAnalyticsConsent } from '@/lib/analytics';

// Observe headings, not whole chapters: chapters can be taller than the viewport.
// Start fresh after consent; never replay a visitor's earlier, unconsented activity.
export const MarketingProgress = () => {
  useEffect(() => {
    let observer;
    const start = () => {
      observer?.disconnect();
      observer = undefined;
      if (!hasAnalyticsConsent() || typeof IntersectionObserver === 'undefined') return;
      const seen = new Set();
      const sections = new Map();
      document.querySelectorAll('main section[id][aria-labelledby]').forEach((section) => {
        const heading = section.getAttribute('aria-labelledby').split(/\s+/)
          .map((id) => document.getElementById(id))
          .find((element) => element?.matches('h1,h2,h3,h4,h5,h6') && element.closest('section[id]') === section);
        if (heading) sections.set(heading, section.id);
      });
      const current = new IntersectionObserver((entries) => {
        if (observer !== current || !hasAnalyticsConsent()) return;
        for (const entry of entries) {
          const section = sections.get(entry.target);
          if (entry.isIntersecting && section && !seen.has(section)) {
            seen.add(section);
            captureMarketingEvent('marketing_section_viewed', { section });
          }
        }
      }, { threshold: 1 });
      observer = current;
      sections.forEach((_, heading) => observer.observe(heading));
    };
    start();
    window.addEventListener('vc-consent-change', start);
    return () => {
      observer?.disconnect();
      observer = undefined;
      window.removeEventListener('vc-consent-change', start);
    };
  }, []);
  return null;
};
