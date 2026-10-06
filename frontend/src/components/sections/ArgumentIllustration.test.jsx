import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { ARGUMENT_DURATION, ArgumentIllustration } from './ArgumentIllustration';
import { ARGUMENT_ILLUSTRATION, EVIDENCE_ILLUSTRATION } from '@/content/marketing';

// The checks every live illustration passes: labelled and captioned as fictional; inert apart from
// the replay control in its caption; no reference scheme, dashes or formats; dates as DD Month
// YYYY and never split; the whole text present from the start; one performance that starts in
// view, settles, and can be played again. Then the argument's own sequence: nothing is typed, the
// page comes first, and each citation takes the same turn as the record it cites.
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

const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';
const inView = (observer = observers[0]) => act(() => observer.callback([{ isIntersecting: true, intersectionRatio: 0.7, intersectionRect: { height: 400 }, rootBounds: { height: 800 } }]));
const text = (el = container) => el.textContent.replace(/ /g, ' ');
const turn = (el) => el.style.getPropertyValue('--i');

it('is labelled, captioned, inert and set in the fictional matter', () => {
  act(() => root.render(<ArgumentIllustration />));
  const figure = container.querySelector(':scope > figure.evidence-figure.live-figure');
  expect(figure.getAttribute('aria-labelledby')).toBe('argument-illustration-title');
  expect(container.querySelector('#argument-illustration-title').tagName).toBe('H3');
  expect(container.querySelector('#argument-illustration-title').textContent).toBe(ARGUMENT_ILLUSTRATION.title);
  expect(container.querySelector('.section-kicker').textContent).toBe('Illustration');
  expect(container.querySelector(':scope > figure > figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\./);
  // The replay control is the only control, and it lives in the caption.
  expect(container.querySelectorAll('button, a, input, select, textarea, [tabindex]:not(figure), [contenteditable]')).toHaveLength(1);
  expect(container.querySelector('figcaption > button.live-replay')).not.toBeNull();
  expect(container.querySelector('#notes')).toBeNull();
  expect(container.querySelector('.mono, code')).toBeNull();
  expect(text()).not.toMatch(/EV-\d|@\w|[\u2013\u2014]/);
  expect(text()).not.toMatch(/programme|delay analysis|\.pdf|\.docx|Word|PDF/i);
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g')) || [];
  expect(dates.length).toBeGreaterThan(0);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})\\u00a0\\d{4}$`));
  for (const source of EVIDENCE_ILLUSTRATION) expect(text()).toContain(`${source.document}, ${source.date}`);
});

it('sets the argument as a page citing each record, beside the records with each attribution outside its quotation', () => {
  act(() => root.render(<ArgumentIllustration />));
  // The page: every point, then its citation in brackets, then the full stop, in one paragraph on paper.
  const page = container.querySelector('.argument-stage > p.argument-page.on-paper');
  ARGUMENT_ILLUSTRATION.points.forEach((point, i) => expect(text(page)).toContain(`${point} (${EVIDENCE_ILLUSTRATION[i].document}).`));
  const cites = page.querySelectorAll('.argument-cite');
  expect(cites).toHaveLength(EVIDENCE_ILLUSTRATION.length);
  cites.forEach((cite, i) => expect(cite.textContent).toBe(`(${EVIDENCE_ILLUSTRATION[i].document})`));
  // The records: under their label, as a list that stays a list once restyled, each a paper slip.
  expect(container.querySelector('.argument-stage > h4.live-output-label').textContent).toBe(ARGUMENT_ILLUSTRATION.sourcesLabel);
  const list = container.querySelector('.argument-stage > ol.argument-records');
  expect(list.getAttribute('role')).toBe('list');
  const records = list.querySelectorAll(':scope > li.argument-record.on-paper');
  expect(records).toHaveLength(EVIDENCE_ILLUSTRATION.length);
  records.forEach((record, i) => {
    expect(text(record.querySelector('blockquote'))).toBe(`“${EVIDENCE_ILLUSTRATION[i].excerpt}”`);
    expect(record.querySelector('blockquote .argument-attribution, blockquote figcaption')).toBeNull();
    expect(text(record.querySelector(':scope > .argument-attribution'))).toBe(`${EVIDENCE_ILLUSTRATION[i].document}, ${EVIDENCE_ILLUSTRATION[i].date}`);
  });
  // Nothing is typed in this figure.
  expect(container.querySelector('.typed, .live-prompt')).toBeNull();
  expect(container.querySelector('figure').style.getPropertyValue('--typed-ms')).toBe('');
});

it('holds the whole argument from the start, then plays the page, the label and each record with its citation in turn', () => {
  jest.useFakeTimers();
  act(() => root.render(<ArgumentIllustration />));
  const figure = container.querySelector('figure');
  // Idle: the whole text is in the document (the script hides the parts until the figure plays).
  const complete = text();
  for (const point of ARGUMENT_ILLUSTRATION.points) expect(complete).toContain(point);
  for (const source of EVIDENCE_ILLUSTRATION) expect(complete).toContain(source.excerpt);
  expect(figure.classList.contains('is-in')).toBe(false);
  // The parts in their turns: the page, the records label, then one record a turn.
  const parts = [...container.querySelectorAll('[data-appear]')];
  expect(parts.map((part) => part.className.split(' ')[0])).toEqual(['argument-page', 'live-output-label', 'argument-record', 'argument-record', 'argument-record']);
  expect(parts.map(turn)).toEqual(['0', '1', '2', '3', '4']);
  // Each citation takes the same turn as the record it cites, so the two are marked together.
  const cites = [...container.querySelectorAll('.argument-cite')];
  const records = [...container.querySelectorAll('.argument-record')];
  cites.forEach((cite, i) => expect(turn(cite)).toBe(turn(records[i])));
  inView();
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(observers[0].disconnected).toBe(true);
  act(() => jest.advanceTimersByTime(ARGUMENT_DURATION - 100));
  expect(figure.classList.contains('is-settled')).toBe(false);
  act(() => jest.advanceTimersByTime(100));
  expect(figure.classList.contains('is-settled')).toBe(true);
  // Play again starts a fresh performance; leaving and re-entering the viewport does not.
  act(() => container.querySelector('.live-replay').click());
  expect(figure.classList.contains('is-settled')).toBe(false);
  expect(figure.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(ARGUMENT_DURATION));
  expect(figure.classList.contains('is-settled')).toBe(true);
  expect(observers).toHaveLength(1);
  // The whole text is still there once settled.
  expect(text()).toBe(complete);
});

it('shares one performance between its two copies', () => {
  jest.useFakeTimers();
  const { useIllustrationPlay } = require('./illustrationKit');
  const Pair = () => {
    const play = useIllustrationPlay({ duration: ARGUMENT_DURATION });
    return <><ArgumentIllustration play={play} /><ArgumentIllustration id="argument-illustration-phone" play={play} /></>;
  };
  act(() => root.render(<Pair />));
  const [first, second] = container.querySelectorAll('figure');
  inView(observers[0]);
  expect(first.classList.contains('is-in')).toBe(true);
  expect(second.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(ARGUMENT_DURATION));
  inView(observers[1]);
  for (const figure of [first, second]) expect(figure.classList.contains('is-settled')).toBe(true);
  const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
  expect(new Set(ids).size).toBe(ids.length);
  for (const figure of [first, second]) expect(document.getElementById(figure.getAttribute('aria-labelledby'))).not.toBeNull();
});
