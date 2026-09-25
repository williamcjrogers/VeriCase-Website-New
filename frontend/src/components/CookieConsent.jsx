import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export const CONSENT_KEY = 'vc-analytics-consent';

const readConsent = () => {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch (e) {
    return null;
  }
};

export const saveConsent = (value) => {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch (e) {
    // Storage unavailable: the choice applies to this page view only.
  }
  if (value === 'granted' && typeof window.vcLoadAnalytics === 'function') {
    window.vcLoadAnalytics();
  }
  if (value === 'denied' && window.posthog && typeof window.posthog.opt_out_capturing === 'function' && window.__vcAnalyticsLoaded) {
    window.posthog.opt_out_capturing();
  }
};

// Non-modal notice asking whether analytics cookies may be used.
export const CookieConsent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener('vc-open-cookie-settings', reopen);
    return () => window.removeEventListener('vc-open-cookie-settings', reopen);
  }, []);

  if (!open) return null;

  const choose = (value) => {
    saveConsent(value);
    setOpen(false);
  };

  return (
    <section
      role="region"
      aria-label="Cookie choices"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-[60] rounded-xl border border-gray-200 bg-white p-5 shadow-xl"
      data-testid="cookie-consent"
    >
      <h2 className="text-base font-bold text-gray-900">Analytics cookies</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        We would like to use PostHog analytics cookies to understand how this site is used, so that we can improve it. They are off unless you allow them. You can change your choice at any time from Cookies in the footer.
      </p>
      <div className="mt-4 flex gap-3">
        <Button size="sm" className="flex-1 bg-teal-700 hover:bg-teal-800 text-white" onClick={() => choose('granted')}>
          Allow analytics
        </Button>
        <Button size="sm" variant="outline" className="flex-1" onClick={() => choose('denied')}>
          Reject analytics
        </Button>
      </div>
      <a href="/cookies" className="mt-3 inline-block text-xs text-gray-600 underline">
        Read the cookie notice
      </a>
    </section>
  );
};
