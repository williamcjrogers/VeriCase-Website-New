import fs from 'fs';
import path from 'path';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { LanesIllustration, LANES_DURATION, audienceOf } from './LanesIllustration';
import { EVIDENCE_ILLUSTRATION, LANES_ILLUSTRATION } from '@/content/marketing';

// The checks every live illustration passes: labelled and captioned as fictional; inert apart from
// the replay control in its caption; no reference scheme, dashes or formats; dates as DD Month
// YYYY and never split; the whole text present from the start; one performance that starts in
// view, settles, and can be played again. Then the lanes' own (owner, 06 October 2026): one
// record, each lane naming its audience by role, and every comment written by someone in it.
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
const turn = (el) => Number(el.style.getPropertyValue('--i'));

it('is labelled, captioned, inert and set in the fictional matter', () => {
  act(() => root.render(<LanesIllustration />));
  const figure = container.querySelector(':scope > figure.evidence-figure.live-figure');
  expect(figure.classList.contains('lanes-illustration')).toBe(true);
  expect(figure.getAttribute('aria-labelledby')).toBe('lanes-illustration-title');
  expect(container.querySelector('#lanes-illustration-title').tagName).toBe('H3');
  expect(container.querySelector('#lanes-illustration-title').textContent).toBe(LANES_ILLUSTRATION.title);
  expect(container.querySelector('.section-kicker').textContent).toBe('Illustration');
  expect(container.querySelector(':scope > figure > figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\./);
  // The replay control is the only control, and it lives in the caption.
  expect(container.querySelectorAll('button, a, input, select, textarea, [tabindex]:not(figure), [contenteditable]')).toHaveLength(1);
  expect(container.querySelector('figcaption > button.live-replay')).not.toBeNull();
  // Roles, not people: no reference scheme, mentions, dashes, formats or banned terms.
  expect(text()).not.toMatch(/EV-\d|@\w|[\u2013\u2014]/);
  expect(text()).not.toMatch(/programme|delay analysis|critical path|privilege|CPR|\.pdf|\.docx/i);
  // Lanes organise the discussion; the figure claims nothing about who may read one.
  expect(text()).not.toMatch(/seen only|only by|who sees|visible to|confidential/i);
  // Every date is DD Month YYYY and never split across lines.
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g')) || [];
  expect(dates.length).toBeGreaterThan(0);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})\\u00a0\\d{4}$`));
  // The record is the lead-time email, quoted and cited as the export cites one.
  const record = EVIDENCE_ILLUSTRATION.find((source) => source.id === LANES_ILLUSTRATION.record);
  const paper = container.querySelector('.lanes-record');
  expect(paper.classList.contains('on-paper')).toBe(true);
  expect(text(paper.querySelector('blockquote'))).toBe(`“${record.excerpt}”`);
  expect(text(paper.querySelector('.lanes-attribution'))).toBe(`${record.document}, ${record.date}`);
});

it('names each lane’s participants by role, and every comment is written by one of them', () => {
  act(() => root.render(<LanesIllustration />));
  const lanes = container.querySelectorAll('ol.lanes > li.lane');
  expect(container.querySelector('ol.lanes').getAttribute('role')).toBe('list');
  expect(lanes).toHaveLength(LANES_ILLUSTRATION.lanes.length);
  LANES_ILLUSTRATION.lanes.forEach((lane, i) => {
    expect(lanes[i].querySelector('.lane-name').textContent).toBe(lane.name);
    expect(lanes[i].querySelector('.lane-audience').textContent).toBe(`${LANES_ILLUSTRATION.audienceLead} the ${audienceOf(lane.audience)}.`);
    // The comments are a list named by their lane.
    const comments = lanes[i].querySelector('ul.lane-comments');
    expect(comments.getAttribute('aria-labelledby')).toBe(lanes[i].querySelector('.lane-name').id);
    const items = comments.querySelectorAll(':scope > li.lane-comment.on-paper');
    expect(items).toHaveLength(lane.comments.length);
    lane.comments.forEach((comment, k) => {
      expect(lane.audience).toContain(comment.role);
      expect(items[k].querySelector('.lane-role').textContent).toBe(comment.role);
      expect(text(items[k].querySelector('.lane-text'))).toBe(comment.text);
    });
  });
  // No lane holds everyone: each lane's participants are fewer than the whole cast.
  const everyone = new Set(LANES_ILLUSTRATION.lanes.flatMap((lane) => lane.audience));
  for (const lane of LANES_ILLUSTRATION.lanes) expect(lane.audience.length).toBeLessThan(everyone.size);
  expect(audienceOf(['Solicitor', 'Counsel'])).toBe('solicitor and counsel');
  expect(audienceOf(['Project manager', 'Commercial manager', 'Solicitor'])).toBe('project manager, commercial manager and solicitor');
});

it('opens the lanes in turn after the label, and lasts as long as its sequence', () => {
  act(() => root.render(<LanesIllustration />));
  expect(turn(container.querySelector('.lanes-label'))).toBe(0);
  expect([...container.querySelectorAll('li.lane')].map(turn)).toEqual([1, 2, 3]);
  // Nothing is typed: the figure shows how the discussion is organised, not someone writing.
  expect(container.querySelector('.typed')).toBeNull();
  const css = fs.readFileSync(path.join(__dirname, 'lanes-illustration.css'), 'utf8');
  const after = Number(css.match(/--lanes-after:\s*(\d+)ms/)[1]);
  const step = Number(css.match(/--lanes-step:\s*(\d+)ms/)[1]);
  const last = Math.max(...[...container.querySelectorAll('[data-appear]')].map(turn));
  expect(LANES_DURATION).toBe(after + last * step + 420 + 300);
  // Hidden or undrawn only with the script, on screen, when motion is welcome; never in print.
  const hiding = css.slice(css.indexOf('@media screen and (prefers-reduced-motion: no-preference)'));
  expect(hiding).toMatch(/\.js \.lanes-illustration:not\(\.is-in\) \.lanes::before \{ transform: scaleX\(0\); \}/);
  expect(css.slice(0, css.indexOf('@media screen and (prefers-reduced-motion: no-preference)'))).not.toMatch(/scaleX\(0\)/);
});

it('plays once when it comes into view, settles, and plays again on request', () => {
  jest.useFakeTimers();
  act(() => root.render(<LanesIllustration />));
  const figure = container.querySelector('figure');
  expect(figure.classList.contains('is-in')).toBe(false);
  inView();
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(figure.classList.contains('is-settled')).toBe(false);
  act(() => jest.advanceTimersByTime(LANES_DURATION));
  expect(figure.classList.contains('is-settled')).toBe(true);
  act(() => container.querySelector('.live-replay').click());
  expect(figure.classList.contains('is-settled')).toBe(false);
  act(() => jest.advanceTimersByTime(LANES_DURATION));
  expect(figure.classList.contains('is-settled')).toBe(true);
});
