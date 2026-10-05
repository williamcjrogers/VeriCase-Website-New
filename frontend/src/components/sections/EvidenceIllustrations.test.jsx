import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { ArgumentIllustration, ChronologyIllustration, useIllustrationPlay } from './EvidenceIllustrations';
import { ARGUMENT_ILLUSTRATION, EVIDENCE_ILLUSTRATION } from '@/content/marketing';

let container;
let root;
let observers;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  observers = [];
  global.IntersectionObserver = class {
    constructor(callback, options) { this.callback = callback; this.options = options; this.disconnected = false; observers.push(this); }
    observe() {}
    disconnect() { this.disconnected = true; }
  };
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  delete global.IntersectionObserver;
  jest.useRealTimers();
});

// An IntersectionObserver entry for an element `height` px tall, `visible` px of it inside a
// viewport `viewport` px tall.
const entry = (visible, height, viewport = 800) => ({
  isIntersecting: visible > 0,
  intersectionRatio: visible / height,
  intersectionRect: { height: visible },
  rootBounds: { height: viewport },
});
const report = (e, observer = observers[0]) => act(() => observer.callback([e]));

// Scrolls an element `height` px tall up through a viewport `viewport` px tall, 1 px at a time,
// calling back as a browser does: only when the share in view crosses one of the thresholds.
const scrollThrough = (observer, height, viewport, { rootBounds = true } = {}) => {
  const thresholds = [].concat(observer.options.threshold);
  let crossed = -1;
  for (let top = viewport; top >= -height && !observer.disconnected; top -= 1) {
    const visible = Math.max(0, Math.min(viewport, top + height) - Math.max(0, top));
    const ratio = visible / height;
    const now = thresholds.filter((t) => ratio >= t).length;
    if (now !== crossed) {
      crossed = now;
      act(() => observer.callback([{ isIntersecting: visible > 0, intersectionRatio: ratio, intersectionRect: { height: visible }, rootBounds: rootBounds ? { height: viewport } : null }]));
    }
  }
};

const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';

// The chronology's narrow column lets a year wrap; running text never splits a date.
it.each([['chronology', ChronologyIllustration, ' '], ['argument', ArgumentIllustration, ' ']])('the %s illustration is labelled, inert and uses the records as the export cites them', (name, Illustration, yearSeparator) => {
  act(() => root.render(<Illustration />));
  const figure = container.querySelector('figure');
  expect(figure.getAttribute('aria-labelledby')).toBe(`${name}-illustration-title`);
  expect(container.querySelector(`#${name}-illustration-title`).tagName).toBe('H3');
  expect(container.querySelector('.section-kicker').textContent).toBe('Illustration');
  expect(container.querySelector(':scope > figure > figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\./);
  // No simulated controls, no claim on the page's #notes destination, no invented reference scheme.
  expect(container.querySelectorAll('button, a, [tabindex]')).toHaveLength(0);
  expect(container.querySelector('#notes')).toBeNull();
  expect(container.textContent).not.toMatch(/EV-\d/);
  expect(container.querySelector('.mono, code')).toBeNull();
  for (const source of EVIDENCE_ILLUSTRATION) expect(container.textContent).toContain(source.document);
  // Every date is DD Month YYYY, and the day and month are never split across lines.
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g'));
  expect(dates.length).toBeGreaterThan(0);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})${yearSeparator}\\d{4}$`));
});

it.each([['chronology', ChronologyIllustration], ['argument', ArgumentIllustration]])('the %s illustration starts only when enough of it is in view', (name, Illustration) => {
  act(() => root.render(<Illustration />));
  const figure = container.querySelector('figure');
  // An edge entering the viewport (reported early by some browsers) does not start it.
  report(entry(20, 400));
  expect(figure.classList.contains('is-in')).toBe(false);
  report(entry(260, 400));
  expect(figure.classList.contains('is-in')).toBe(true);
});

it('starts an illustration taller than the viewport once it fills most of the viewport', () => {
  act(() => root.render(<ArgumentIllustration />));
  const figure = container.querySelector('figure');
  // 400% zoom: a 316 px block in a 180 px viewport can never be 60% in view.
  report(entry(90, 316, 180));
  expect(figure.classList.contains('is-in')).toBe(false);
  report(entry(170, 316, 180));
  expect(figure.classList.contains('is-in')).toBe(true);
});

// Records about two viewports tall, as at 400% zoom on a short laptop screen: with coarse
// threshold steps no callback ever arrives while the record fills enough of the viewport.
it.each([[328, 159], [353, 159], [353, 180], [305, 150]])('starts when a %i px record scrolls through a %i px viewport', (height, viewport) => {
  act(() => root.render(<ChronologyIllustration />));
  scrollThrough(observers[0], height, viewport);
  expect(container.querySelector('figure').classList.contains('is-in')).toBe(true);
});

it('falls back to the window height when the browser reports no root bounds (a cross-origin frame)', () => {
  const original = window.innerHeight;
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 159 });
  try {
    act(() => root.render(<ArgumentIllustration />));
    scrollThrough(observers[0], 353, 159, { rootBounds: false });
    expect(container.querySelector('figure').classList.contains('is-in')).toBe(true);
  } finally {
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: original });
  }
});

it('plays once: it stops observing, and leaving and re-entering the viewport changes nothing', () => {
  act(() => root.render(<ChronologyIllustration />));
  const figure = container.querySelector('figure');
  report(entry(300, 400));
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(observers[0].disconnected).toBe(true);
  report(entry(0, 400));
  report(entry(400, 400));
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(observers).toHaveLength(1);
});

it('settles once the sequence has ended, so nothing replays when it is shown again', () => {
  jest.useFakeTimers();
  act(() => root.render(<ArgumentIllustration />));
  const figure = container.querySelector('figure');
  report(entry(300, 400));
  expect(figure.classList.contains('is-settled')).toBe(false);
  act(() => jest.advanceTimersByTime(2400));
  expect(figure.classList.contains('is-settled')).toBe(false);
  act(() => jest.advanceTimersByTime(100));
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(figure.classList.contains('is-settled')).toBe(true);
});

it('shares one performance between the two copies: the copy seen later shows the end state', () => {
  jest.useFakeTimers();
  const Pair = () => {
    const play = useIllustrationPlay();
    return <><ChronologyIllustration play={play} /><ChronologyIllustration id="chronology-illustration-phone" play={play} /></>;
  };
  act(() => root.render(<Pair />));
  const [first, second] = container.querySelectorAll('figure');
  report(entry(300, 400), observers[0]);
  expect(first.classList.contains('is-in')).toBe(true);
  expect(second.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(2500));
  // The second copy comes into view (after a rotation, say) and does not start the sequence again.
  report(entry(300, 400), observers[1]);
  for (const figure of [first, second]) expect(figure.classList.contains('is-settled')).toBe(true);
});

it('keeps the titles of a second copy distinct', () => {
  act(() => root.render(<><ChronologyIllustration /><ChronologyIllustration id="chronology-illustration-phone" /><ArgumentIllustration /><ArgumentIllustration id="argument-illustration-phone" /></>));
  const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
  expect(new Set(ids).size).toBe(ids.length);
  for (const figure of container.querySelectorAll('figure[aria-labelledby]')) expect(document.getElementById(figure.getAttribute('aria-labelledby'))).not.toBeNull();
});

it('cites a record after each point and keeps each attribution outside the quotation', () => {
  act(() => root.render(<ArgumentIllustration />));
  const text = container.querySelector('.evidence-argument-text').textContent.replace(/ /g, ' ');
  ARGUMENT_ILLUSTRATION.points.forEach((point, i) => expect(text).toContain(`${point} (${EVIDENCE_ILLUSTRATION[i].document}).`));
  const sources = container.querySelectorAll('.evidence-source');
  expect(sources).toHaveLength(EVIDENCE_ILLUSTRATION.length);
  sources.forEach((source, i) => {
    expect(source.querySelector('blockquote').textContent).toBe(`“${EVIDENCE_ILLUSTRATION[i].excerpt}”`.replace(/(\d{2}) (\w+) (\d{4})/g, '$1 $2 $3'));
    expect(source.querySelector('blockquote figcaption')).toBeNull();
    expect(source.querySelector(':scope > figcaption').textContent.replace(/ /g, ' ')).toBe(`${EVIDENCE_ILLUSTRATION[i].document}, ${EVIDENCE_ILLUSTRATION[i].date}`);
  });
});
