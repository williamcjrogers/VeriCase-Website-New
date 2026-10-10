import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MarketingProgress } from './MarketingProgress';

let container;
let fixture;
let root;
let observers;
let originalObserver;

beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  originalObserver = global.IntersectionObserver;
  observers = [];
  global.IntersectionObserver = jest.fn((callback, options) => {
    const observer = { callback, options, observe: jest.fn(), disconnect: jest.fn() };
    observers.push(observer);
    return observer;
  });
  localStorage.clear();
  delete window.vcReadAnalyticsConsent;
  delete window.__vcConsentMemoryOnly;
  delete window.__vcConsent;
  window.__vcAnalyticsLoaded = true;
  window.posthog = { capture: jest.fn() };
  fixture = document.createElement('main');
  fixture.innerHTML = '<section id="top" aria-labelledby="top-title"><h1 id="top-title">Opening</h1><h2 id="extra-title">Supporting heading</h2></section><section id="platform" aria-labelledby="platform-title"><h2 id="platform-title">Solution</h2><section id="worked-example" aria-labelledby="bundle-label worked-example-title"><p id="bundle-label">Chapter III</p><h3 id="worked-example-title">Reports and bundles</h3><h4 id="bundle-example-title">Application example</h4></section><section id="collaboration" aria-labelledby="collaboration-title"><h3 id="collaboration-title">Working together</h3><h3 id="collaboration-detail">Supporting detail</h3></section><section id="claims" aria-labelledby="collaboration-title"></section></section>';
  container = document.createElement('div');
  document.body.append(fixture, container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  fixture.remove();
  localStorage.clear();
  delete window.posthog;
  delete window.__vcAnalyticsLoaded;
  global.IntersectionObserver = originalObserver;
  jest.restoreAllMocks();
});

const render = () => act(() => root.render(<MarketingProgress />));
const consent = (value) => {
  localStorage.setItem('vc-analytics-consent', value);
  act(() => window.dispatchEvent(new Event('vc-consent-change')));
};
const notify = (observer, ids, isIntersecting = true) => act(() => observer.callback(ids.map((id) => ({ target: document.getElementById(id), isIntersecting }))));

it('starts only after consent and observes each section\'s labelled heading, including nested h3s', () => {
  render();
  expect(observers).toHaveLength(0);
  consent('granted');
  expect(observers).toHaveLength(1);
  const observer = observers[0];
  expect(observer.options).toEqual({ threshold: 1 });
  expect(observer.observe.mock.calls.map(([heading]) => heading.id)).toEqual([
    'top-title', 'platform-title', 'worked-example-title', 'collaboration-title',
  ]);
  notify(observer, ['worked-example-title', 'collaboration-title']);
  expect(window.posthog.capture.mock.calls).toEqual([
    ['marketing_section_viewed', { section: 'worked-example' }],
    ['marketing_section_viewed', { section: 'collaboration' }],
  ]);
  notify(observer, ['worked-example-title', 'bundle-example-title', 'extra-title']);
  expect(window.posthog.capture).toHaveBeenCalledTimes(2);
  notify(observer, ['platform-title'], false);
  expect(window.posthog.capture).toHaveBeenCalledTimes(2);
});

it('disconnects on revocation, rejects stale callbacks and starts fresh on renewed consent', () => {
  localStorage.setItem('vc-analytics-consent', 'granted');
  render();
  const first = observers[0];
  notify(first, ['worked-example-title']);
  consent('denied');
  expect(first.disconnect).toHaveBeenCalledTimes(1);
  notify(first, ['collaboration-title']);
  expect(window.posthog.capture).toHaveBeenCalledTimes(1);
  consent('granted');
  expect(observers).toHaveLength(2);
  notify(first, ['collaboration-title']);
  expect(window.posthog.capture).toHaveBeenCalledTimes(1);
  notify(observers[1], ['worked-example-title']);
  expect(window.posthog.capture).toHaveBeenCalledTimes(2);
});

it('checks persisted withdrawal before receiving the consent event', () => {
  localStorage.setItem('vc-analytics-consent', 'granted');
  render();
  localStorage.setItem('vc-analytics-consent', 'denied');
  notify(observers[0], ['worked-example-title']);
  expect(window.posthog.capture).not.toHaveBeenCalled();
});

it('disconnects and removes its consent listener on unmount', () => {
  const remove = jest.spyOn(window, 'removeEventListener');
  localStorage.setItem('vc-analytics-consent', 'granted');
  render();
  const observer = observers[0];
  act(() => root.render(null));
  expect(observer.disconnect).toHaveBeenCalledTimes(1);
  expect(remove).toHaveBeenCalledWith('vc-consent-change', expect.any(Function));
  notify(observer, ['worked-example-title']);
  consent('granted');
  expect(window.posthog.capture).not.toHaveBeenCalled();
  expect(observers).toHaveLength(1);
});
