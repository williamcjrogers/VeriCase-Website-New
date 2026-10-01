import { captureMarketingEvent } from './analytics';

beforeEach(() => {
  localStorage.clear();
  delete window.__vcConsent;
  delete window.__vcConsentMemoryOnly;
  delete window.vcReadAnalyticsConsent;
  window.__vcAnalyticsLoaded = true;
  window.posthog = { capture: jest.fn() };
});
it('does not capture or queue intent before consent or after withdrawal', () => {
  captureMarketingEvent('demonstration_email_clicked', { placement: 'hero', section: 'top' });
  window.__vcConsent = 'denied';
  localStorage.setItem('vc-analytics-consent', 'denied');
  captureMarketingEvent('sample_interacted', { section: 'research', interaction: 'source_opened' });
  expect(window.posthog.capture).not.toHaveBeenCalled();
});
it.each(['demonstration_email_clicked', 'demonstration_email_copied', 'sample_interacted', 'marketing_section_viewed'])('captures %s with fixed identifiers only', (event) => {
  window.__vcConsent = 'granted';
  localStorage.setItem('vc-analytics-consent', 'granted');
  captureMarketingEvent(event, { placement: 'hero', section: 'top', interaction: 'source_opened', text: 'Private matter', email: 'a@example.com' });
  expect(window.posthog.capture).toHaveBeenCalledWith(event, { placement: 'hero', section: 'top', interaction: 'source_opened' });
});
it('rejects unexpected event names and arbitrary identifier values', () => {
  window.__vcConsent = 'granted';
  localStorage.setItem('vc-analytics-consent', 'granted');
  captureMarketingEvent('booking_completed', { section: 'top' });
  expect(window.posthog.capture).not.toHaveBeenCalled();
  captureMarketingEvent('sample_interacted', { section: 'Private matter', interaction: 'source_opened' });
  expect(window.posthog.capture).toHaveBeenCalledWith('sample_interacted', { interaction: 'source_opened' });
});

it('checks persisted withdrawal before capture even with a stale consent cache', () => {
  window.__vcConsent = 'granted';
  localStorage.setItem('vc-analytics-consent', 'denied');
  captureMarketingEvent('demonstration_email_clicked', { placement: 'hero', section: 'top' });
  expect(window.posthog.capture).not.toHaveBeenCalled();
});
