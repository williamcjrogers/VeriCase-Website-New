import { metadataForPath } from './pageMetadata';
import { DEMO_MAILTO, SIGN_IN_URL } from './site';

it('keeps page-specific canonicals and leaves unknown routes without a canonical', () => {
  expect(metadataForPath('/').url).toBe('https://veri-case.com/');
  expect(metadataForPath('/cookies/').url).toBe('https://veri-case.com/cookies');
  expect(metadataForPath('/missing').url).toBeNull();
  expect(metadataForPath('/missing').title).toMatch(/Page not found/);
});

it('identifies the construction market and AI-assisted case preparation without outcome guarantees', () => {
  const home = metadataForPath('/');
  expect(home.description).toContain('construction claims and disputes');
  expect(home.description).toContain('AI-assisted investigation');
  expect(home.description).toContain('chronology and drafting');
  expect(home.description).not.toMatch(/winning|reconstruct truth|guarantee|in minutes/i);
});

it('offers a demonstration email without requesting confidential matter details', () => {
  const url = new URL(DEMO_MAILTO);
  expect(url.protocol).toBe('mailto:');
  expect(url.pathname).toBe('enquiries@veri-case.com');
  expect(url.searchParams.get('subject')).toBe('VeriCase demonstration request');
  expect(url.searchParams.get('body')).toContain('Please do not include confidential details of a live matter.');
  expect(url.searchParams.get('body')).toContain('Areas of interest (optional):');
});

it('uses the existing public VeriCase sign-in route', () => {
  expect(SIGN_IN_URL).toBe('https://app.veri-case.com/login');
});
