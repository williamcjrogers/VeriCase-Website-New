import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { COOKIE_BAR } from '@/content/home';

export const CONSENT_KEY = 'vc-analytics-consent';

const readConsent = () => {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch (e) {
    return null;
  }
};

export const saveConsent = (value) => {
  window.__vcConsent = value;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.__vcConsentMemoryOnly = false;
  } catch (e) {
    // Storage unavailable: the choice applies to this page view only.
    window.__vcConsentMemoryOnly = true;
  }
  if (value === 'granted' && typeof window.vcLoadAnalytics === 'function') {
    if (window.__vcAnalyticsLoaded) window.posthog?.opt_in_capturing?.({ captureEventName: false });
    window.vcLoadAnalytics();
  }
  if (value === 'denied' && window.posthog && typeof window.posthog.opt_out_capturing === 'function' && window.__vcAnalyticsLoaded) {
    window.posthog.opt_out_capturing();
  }
  window.dispatchEvent(new Event('vc-consent-change'));
};

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// A non-modal paper bar fixed to the bottom edge, asking whether analytics cookies may be used.
// It mounts only after hydration, so it is never in the prerendered page. While it is open it
// publishes its height as --consent-h, which the page uses for scroll padding and a matching
// bottom padding, so nothing focused is ever hidden behind it.
export const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const bar = useRef(null);
  const detailsId = useId();

  useEffect(() => {
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener('vc-open-cookie-settings', reopen);
    return () => window.removeEventListener('vc-open-cookie-settings', reopen);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    if (!open || !bar.current) {
      root.style.removeProperty('--consent-h');
      return undefined;
    }
    const set = () => root.style.setProperty('--consent-h', `${Math.ceil(bar.current.getBoundingClientRect().height)}px`);
    set();
    if (typeof ResizeObserver === 'undefined') return () => root.style.removeProperty('--consent-h');
    const ro = new ResizeObserver(set);
    ro.observe(bar.current);
    return () => {
      ro.disconnect();
      root.style.removeProperty('--consent-h');
    };
  }, [open]);

  if (!open) return null;

  const choose = (value) => {
    saveConsent(value);
    setDetails(false);
    setOpen(false);
  };

  return (
    <section
      ref={bar}
      role="region"
      aria-label={COOKIE_BAR.region}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-rule-strong bg-paper text-ink shadow-[0_-12px_32px_-20px_rgba(26,37,80,0.35)]"
      data-testid="cookie-consent"
    >
      <div className="container flex flex-col gap-2.5 py-2.5 lg:flex-row lg:items-center lg:gap-6 lg:py-2">
        <p className="text-caption leading-[1.45] lg:flex-1">
          <span className="mr-2 inline-block font-medium text-brass-700">{COOKIE_BAR.label}</span>
          {COOKIE_BAR.text}{' '}
          <button
            type="button"
            aria-expanded={details}
            aria-controls={detailsId}
            onClick={() => setDetails((d) => !d)}
            className="inline-flex min-h-[24px] items-center font-medium text-azure-700 underline underline-offset-2 hover:text-navy lg:hidden"
          >
            {details ? COOKIE_BAR.hide : COOKIE_BAR.details}
          </button>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-expanded={details}
            aria-controls={detailsId}
            onClick={() => setDetails((d) => !d)}
            className="vc-btn vc-btn-quiet hidden lg:inline-flex"
          >
            {details ? COOKIE_BAR.hide : COOKIE_BAR.details}
          </button>
          <button type="button" onClick={() => choose('granted')} className="vc-btn vc-btn-secondary min-h-[44px] flex-1 lg:w-[11.5rem] lg:flex-none">
            {COOKIE_BAR.allow}
          </button>
          <button type="button" onClick={() => choose('denied')} className="vc-btn vc-btn-secondary min-h-[44px] flex-1 lg:w-[11.5rem] lg:flex-none">
            {COOKIE_BAR.reject}
          </button>
        </div>
      </div>
      <div id={detailsId} hidden={!details} className="border-t border-rule">
        <div className="container max-h-[40vh] overflow-y-auto py-4">
          <h2 className="font-display text-[1.25rem] font-medium text-navy">{COOKIE_BAR.detailsTitle}</h2>
          <p className="mt-2 max-w-measure text-caption text-ink">{COOKIE_BAR.detailsBody}</p>
          <a href="/cookies" className="vc-link mt-2 inline-flex min-h-[24px] items-center text-caption font-medium">
            {COOKIE_BAR.link}
          </a>
        </div>
      </div>
    </section>
  );
};
