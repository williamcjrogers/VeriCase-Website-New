// Only fixed, non-personal identifiers leave the marketing site. Never pass source text,
// search input, email addresses or URLs to this interface. Events measure intent, not bookings.
const EVENTS = new Set(['demonstration_email_clicked', 'demonstration_email_copied', 'sample_interacted', 'marketing_section_viewed']);
const VALUES = {
  placement: new Set(['header', 'contents', 'hero', 'case-room', 'research', 'platform', 'demonstration', 'footer', 'not-found']),
  section: new Set(['top', 'clock', 'chronology-lens', 'case-room', 'research', 'claims', 'integrity', 'platform', 'about', 'demonstration', 'notes', 'worked-example', 'questions', 'cookies', 'not-found']),
  interaction: new Set(['source_opened', 'chronology_spotlight']),
};

export function hasAnalyticsConsent() {
  if (typeof window === 'undefined') return false;
  if (window.vcReadAnalyticsConsent) return window.vcReadAnalyticsConsent();
  if (window.__vcConsentMemoryOnly) return window.__vcConsent === 'granted';
  try { return window.localStorage.getItem('vc-analytics-consent') === 'granted'; }
  catch { return window.__vcConsent === 'granted'; }
}

export function captureMarketingEvent(event, properties = {}) {
  if (!EVENTS.has(event) || !hasAnalyticsConsent() || !window.__vcAnalyticsLoaded) return;
  const safe = {};
  for (const [key, allowed] of Object.entries(VALUES)) {
    if (allowed.has(properties[key])) safe[key] = properties[key];
  }
  window.posthog?.capture?.(event, safe);
}

export function trackDemonstration(placement, section, copied = false) {
  captureMarketingEvent(copied ? 'demonstration_email_copied' : 'demonstration_email_clicked', { placement, section });
}
