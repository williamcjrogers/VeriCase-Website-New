import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { ArchiveField } from './ArchiveField';

let host, root, observe, mediaChange, media;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  jest.useFakeTimers();
  media = { matches: false, addEventListener: (_, fn) => { mediaChange = fn; }, removeEventListener: () => {} };
  window.matchMedia = () => media;
  global.IntersectionObserver = class {
    constructor(fn) { observe = fn; }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  SVGElement.prototype.pauseAnimations = jest.fn();
  SVGElement.prototype.unpauseAnimations = jest.fn();
  Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' });
  host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);
  act(() => root.render(<ArchiveField />));
});
afterEach(() => {
  act(() => root.unmount());
  host.remove();
  jest.useRealTimers();
});
const enter = (isIntersecting) => act(() => observe([{ isIntersecting, intersectionRatio: isIntersecting ? 1 : 0 }]));
const click = (label) => act(() => host.querySelector(`[aria-label="${label}"]`).click());

it('freezes the SVG timeline and status timer on pause, then resumes', () => {
  enter(true);
  expect(host.firstChild.dataset.playing).toBe('true');
  const beam = host.querySelector('.anim-scan-beam');
  expect(beam).not.toBeNull();
  click('Pause scan');
  expect(host.querySelector('.anim-scan-beam')).toBe(beam);
  expect(host.firstChild.dataset.playing).toBe('false');
  expect(SVGElement.prototype.pauseAnimations).toHaveBeenCalled();
  const paused = host.textContent;
  act(() => jest.advanceTimersByTime(6000));
  expect(host.textContent).toBe(paused);
  click('Resume scan');
  expect(host.querySelector('.anim-scan-beam')).toBe(beam);
  expect(host.firstChild.dataset.playing).toBe('true');
  expect(SVGElement.prototype.unpauseAnimations).toHaveBeenCalled();
});

it('suspends every animation offscreen and in a hidden document', () => {
  enter(true);
  enter(false);
  expect(host.firstChild.dataset.playing).toBe('false');
  enter(true);
  Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' });
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(host.firstChild.dataset.playing).toBe('false');
});

it('keeps the presentation static for reduced motion, including replay', () => {
  enter(true);
  media.matches = true;
  act(() => mediaChange());
  expect(host.firstChild.dataset.playing).toBe('false');
  click('Reset illustration');
  expect(host.firstChild.dataset.playing).toBe('false');
  expect(host.textContent).toContain('Static');
});
