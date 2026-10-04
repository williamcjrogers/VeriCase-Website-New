import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { ArgumentIllustration, ChronologyIllustration } from './EvidenceIllustrations';
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
    constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this); }
    observe() {}
    disconnect() {}
  };
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  delete global.IntersectionObserver;
});

// An IntersectionObserver entry for an element `height` px tall, `visible` px of it inside a
// viewport `viewport` px tall.
const entry = (visible, height, viewport = 800) => ({
  isIntersecting: visible > 0,
  intersectionRatio: visible / height,
  intersectionRect: { height: visible },
  rootBounds: { height: viewport },
});
const report = (e) => act(() => observers[0].callback([e]));

const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';

it.each([['chronology', ChronologyIllustration], ['argument', ArgumentIllustration]])('the %s illustration is labelled, inert and uses the records as the export cites them', (name, Illustration) => {
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
  // Every date is DD Month YYYY and is never split across lines.
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g'));
  expect(dates.length).toBeGreaterThan(0);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})\\u00a0\\d{4}$`));
});

it.each([['chronology', ChronologyIllustration], ['argument', ArgumentIllustration]])('the %s illustration plays once, only when enough of it is in view', (name, Illustration) => {
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

it('keeps the titles of a second copy distinct', () => {
  act(() => root.render(<><ChronologyIllustration /><ChronologyIllustration id="chronology-illustration-phone" /><ArgumentIllustration /><ArgumentIllustration id="argument-illustration-phone" /></>));
  const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
  expect(new Set(ids).size).toBe(ids.length);
  for (const figure of container.querySelectorAll('figure[aria-labelledby]')) expect(document.getElementById(figure.getAttribute('aria-labelledby'))).not.toBeNull();
});

it('cites a record after each point and keeps each attribution outside the quotation', () => {
  act(() => root.render(<ArgumentIllustration />));
  const text = container.querySelector('.evidence-argument-text').textContent.replace(/\u00a0/g, ' ');
  ARGUMENT_ILLUSTRATION.points.forEach((point, i) => expect(text).toContain(`${point} (${EVIDENCE_ILLUSTRATION[i].document}).`));
  const sources = container.querySelectorAll('.evidence-source');
  expect(sources).toHaveLength(EVIDENCE_ILLUSTRATION.length);
  sources.forEach((source, i) => {
    expect(source.querySelector('blockquote').textContent).toBe(`“${EVIDENCE_ILLUSTRATION[i].excerpt}”`.replace(/(\d{2}) (\w+) (\d{4})/g, '$1\u00a0$2\u00a0$3'));
    expect(source.querySelector('blockquote figcaption')).toBeNull();
    expect(source.querySelector(':scope > figcaption').textContent.replace(/\u00a0/g, ' ')).toBe(`${EVIDENCE_ILLUSTRATION[i].document}, ${EVIDENCE_ILLUSTRATION[i].date}`);
  });
});
