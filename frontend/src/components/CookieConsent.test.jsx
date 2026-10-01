import { saveConsent } from './CookieConsent';

beforeEach(() => {
  localStorage.clear();
  window.vcLoadAnalytics = jest.fn();
  window.__vcAnalyticsLoaded = true;
  window.posthog = { opt_in_capturing: jest.fn(), opt_out_capturing: jest.fn() };
});
afterEach(() => { delete window.__vcConsent; });

it('withdraws consent and supports granting it again in the same page', () => {
  saveConsent('denied');
  expect(window.posthog.opt_out_capturing).toHaveBeenCalled();
  saveConsent('granted');
  expect(localStorage.getItem('vc-analytics-consent')).toBe('granted');
  expect(window.posthog.opt_in_capturing).toHaveBeenCalledWith({ captureEventName: false });
});

it('retains a page-only choice when storage is unavailable', () => {
  const write = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage blocked'); });
  saveConsent('granted');
  expect(window.__vcConsent).toBe('granted');
  saveConsent('denied');
  expect(window.__vcConsent).toBe('denied');
  write.mockRestore();
});
