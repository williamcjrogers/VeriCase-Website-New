// Exercise the actual shipped bootstrap, with its network insertion isolated from the test.
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { runInNewContext } from 'vm';

const html = readFileSync(resolve(__dirname, '../../public/index.html'), 'utf8');
const bootstrap = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).find((s) => s.includes('posthog.init'));
const start = (consent = null) => {
  const requests = [];
  const storage = { consent };
  const listeners = {};
  const context = {
    document: { createElement: () => ({}), getElementsByTagName: () => [{ parentNode: { insertBefore: (script) => requests.push(script.src) } }] },
    localStorage: { getItem: () => storage.consent },
    addEventListener: (name, fn) => { listeners[name] = fn; },
    dispatchEvent: jest.fn(), Event,
    location: { pathname: '/' }, URL,
  };
  context.window = context;
  runInNewContext(bootstrap, context);
  return { context, requests, storage, listeners };
};

it.each([null, 'denied'])('makes no analytics request with consent %s', (consent) => {
  const { context, requests } = start(consent);
  context.vcLoadAnalytics();
  expect(requests).toEqual([]);
});
it('loads once after consent with automatic capture and recording disabled', () => {
  const { context, requests, storage } = start();
  storage.consent = 'granted';
  context.__vcConsent = 'granted';
  context.vcLoadAnalytics();
  context.vcLoadAnalytics();
  expect(requests).toHaveLength(1);
  const config = context.posthog._i[0][1];
  expect(config).toMatchObject({ autocapture: false, capture_pageview: false, capture_pageleave: false, disable_session_recording: true });
});
it('does not activate capturing if consent was withdrawn while the SDK loaded', () => {
  const { context, storage } = start('granted');
  const config = context.posthog._i[0][1];
  context.__vcConsent = 'denied';
  storage.consent = 'denied';
  const client = { opt_out_capturing: jest.fn(), opt_in_capturing: jest.fn(), capture: jest.fn() };
  config.loaded(client);
  expect(client.opt_out_capturing).toHaveBeenCalled();
  expect(client.capture).not.toHaveBeenCalled();
  expect(config.before_send({ event: 'sample_interacted', properties: {} })).toBeNull();
});
it('removes stored profile values and URL details from event properties', () => {
  const { context } = start('granted');
  const config = context.posthog._i[0][1];
  const out = config.before_send({ event: 'sample_interacted', uuid: 'event-id', properties: { token: 'phc_public_project_key', '$process_person_profile': false, section: 'top', distinct_id: 'anonymous', '$current_url': 'https://example.com/private?email=someone#private', '$set': { '$initial_current_url': 'private' }, utm_campaign: 'private', email: 'private' } });
  expect(out.uuid).toBe('event-id');
  expect(out.properties).toEqual({ token: 'phc_public_project_key', '$process_person_profile': false, section: 'top', distinct_id: 'anonymous', '$current_url': 'https://veri-case.com/' });
});

it('honours withdrawal in another tab while this tab is loading the SDK', () => {
  const { context, storage, listeners } = start('granted');
  const config = context.posthog._i[0][1];
  // Another tab writes denial. This tab still has its old cache and no storage event yet.
  storage.consent = 'denied';
  const client = { opt_out_capturing: jest.fn(), opt_in_capturing: jest.fn(), capture: jest.fn() };
  config.loaded(client);
  expect(client.opt_in_capturing).not.toHaveBeenCalled();
  expect(client.capture).not.toHaveBeenCalled();
  expect(config.before_send({ event: 'sample_interacted', properties: {} })).toBeNull();
  context.posthog = client;
  listeners.storage({ key: 'vc-analytics-consent', newValue: 'denied' });
  expect(client.opt_out_capturing).toHaveBeenCalled();
  expect(context.dispatchEvent).toHaveBeenCalled();
});

it('retains the current page choice when consent storage is unavailable', () => {
  const { context } = start();
  context.__vcConsentMemoryOnly = true;
  context.__vcConsent = 'granted';
  context.vcLoadAnalytics();
  const config = context.posthog._i[0][1];
  const client = { opt_out_capturing: jest.fn(), opt_in_capturing: jest.fn(), capture: jest.fn() };
  config.loaded(client);
  expect(client.opt_in_capturing).toHaveBeenCalled();
  context.__vcConsent = 'denied';
  expect(config.before_send({ event: 'sample_interacted', properties: {} })).toBeNull();
});
