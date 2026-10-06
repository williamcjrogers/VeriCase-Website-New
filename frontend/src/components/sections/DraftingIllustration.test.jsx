import fs from 'fs';
import path from 'path';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { DRAFTING_DURATION, DraftingIllustration } from './DraftingIllustration';
import { DRAFTING_ILLUSTRATION, EVIDENCE_ILLUSTRATION } from '@/content/marketing';
import { typedSoFar } from './liveTestUtils';

// The checks every live illustration passes: labelled and captioned as fictional; inert apart from
// the replay control in its caption; no reference scheme, dashes or formats; dates as DD Month
// YYYY and never split; the whole typed text present from the start; one performance that starts
// in view, settles, and can be played again. Then the drafting figure's own sequence: the section
// heading is typed, the page and the margin's label come first, each numbered paragraph takes a
// turn with the record it rests on (its leader drawn as the record appears), and the status line
// comes last; and its stylesheet: the duration follows from its rhythm, and everything it hides or
// undraws is hidden only by the script, only when motion is welcome, and never in print.
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
  global.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16);
  global.cancelAnimationFrame = (id) => clearTimeout(id);
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
  act(() => root.render(<DraftingIllustration />));
  const figure = container.querySelector(':scope > figure.evidence-figure.live-figure');
  expect(figure.getAttribute('aria-labelledby')).toBe('drafting-illustration-title');
  expect(container.querySelector('#drafting-illustration-title').tagName).toBe('H3');
  expect(container.querySelector('#drafting-illustration-title').textContent).toBe(DRAFTING_ILLUSTRATION.title);
  expect(container.querySelector('.section-kicker').textContent).toBe('Illustration');
  expect(container.querySelector(':scope > figure > figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\./);
  // The replay control is the only control, and it lives in the caption.
  expect(container.querySelectorAll('button, a, input, select, textarea, [tabindex]:not(figure), [contenteditable]')).toHaveLength(1);
  expect(container.querySelector('figcaption > button.live-replay')).not.toBeNull();
  expect(container.querySelector('.mono, code')).toBeNull();
  expect(text()).not.toMatch(/EV-\d|@\w|[\u2013\u2014]/);
  // No file format, count, processing state or timing anywhere: the draft is for review before export.
  expect(text()).not.toMatch(/programme|delay analysis|\.pdf|\.docx|Word|PDF|\bexported\b|\d+ (records|documents|sources)|generat|loading|per cent|%/i);
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g')) || [];
  expect(dates.length).toBeGreaterThan(0);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})\\u00a0\\d{4}$`));
  for (const source of EVIDENCE_ILLUSTRATION) expect(text()).toContain(`${source.document}, ${source.date}`);
});

it('types the section heading, then sets the section as numbered paragraphs on one page, each with its record beside it, and the status last', () => {
  act(() => root.render(<DraftingIllustration />));
  // The input: the section heading under its label, typed.
  const prompt = container.querySelector('figure > p.live-prompt');
  expect(prompt.querySelector('.live-prompt-label').textContent).toBe(DRAFTING_ILLUSTRATION.sectionHeadingLabel);
  expect(prompt.querySelector('.typed.live-prompt-line .sr-only').textContent).toBe(DRAFTING_ILLUSTRATION.sectionLabel);
  // The answer: the margin's label (a column label, hidden from assistive technology, since every
  // paragraph names its record), the page as paper (decorative), the paragraphs and the status.
  const output = container.querySelector('figure > .live-output.drafting-output');
  const label = output.querySelector(':scope > p.live-output-label.drafting-record-label');
  expect(label.textContent).toBe(DRAFTING_ILLUSTRATION.recordsLabel);
  expect(label.getAttribute('aria-hidden')).toBe('true');
  const page = output.querySelector(':scope > .drafting-page.on-paper');
  expect(page.getAttribute('aria-hidden')).toBe('true');
  expect(page.textContent).toBe('');
  const list = output.querySelector(':scope > ol.drafting-paragraphs');
  expect(list.getAttribute('role')).toBe('list');
  const items = list.querySelectorAll(':scope > li.drafting-paragraph');
  expect(items).toHaveLength(DRAFTING_ILLUSTRATION.paragraphs.length);
  expect(items).toHaveLength(EVIDENCE_ILLUSTRATION.length);
  items.forEach((item, i) => {
    const paragraph = DRAFTING_ILLUSTRATION.paragraphs[i];
    const p = item.querySelector(':scope > p.drafting-text');
    expect(p.querySelector('.drafting-n').textContent).toBe(paragraph.n);
    expect(text(p)).toBe(`${paragraph.n} ${paragraph.text}`);
    // The record it rests on, cited by document and date, is the next thing read.
    const record = item.querySelector(':scope > p.drafting-record');
    expect(p.nextElementSibling).toBe(record);
    expect(text(record)).toBe(`${EVIDENCE_ILLUSTRATION[i].document}, ${EVIDENCE_ILLUSTRATION[i].date}`);
    // The document and its date are set apart (the margin sets the document brighter), and the
    // date never splits across lines.
    expect(record.querySelector('.drafting-record-doc').textContent).toBe(`${EVIDENCE_ILLUSTRATION[i].document},`);
    expect(record.querySelector('.drafting-record-date').textContent).toBe(EVIDENCE_ILLUSTRATION[i].date.replace(/ /g, ' '));
  });
  const status = output.querySelector(':scope > p.drafting-status');
  expect(status.textContent).toBe(DRAFTING_ILLUSTRATION.status);
  expect(list.nextElementSibling).toBe(status);
  // Nothing about the draft is said that the content file does not say.
  expect(text(output)).toBe([DRAFTING_ILLUSTRATION.recordsLabel, ...DRAFTING_ILLUSTRATION.paragraphs.map((paragraph, i) => `${paragraph.n} ${paragraph.text}${EVIDENCE_ILLUSTRATION[i].document}, ${EVIDENCE_ILLUSTRATION[i].date}`), DRAFTING_ILLUSTRATION.status].join(''));
});

it('holds the whole heading for assistive technology and types it only while playing', () => {
  jest.useFakeTimers();
  act(() => root.render(<DraftingIllustration />));
  const figure = container.querySelector('figure');
  const typed = container.querySelector('.typed');
  expect(typed.querySelector('.sr-only').textContent).toBe(DRAFTING_ILLUSTRATION.sectionLabel);
  // Idle: the visual copy is complete (the script hides it until the figure plays).
  expect(typedSoFar(typed)).toBe(DRAFTING_ILLUSTRATION.sectionLabel);
  expect(figure.classList.contains('is-in')).toBe(false);
  inView();
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(observers[0].disconnected).toBe(true);
  act(() => jest.advanceTimersByTime(16));
  expect(typedSoFar(typed).length).toBeLessThan(DRAFTING_ILLUSTRATION.sectionLabel.length);
  expect(typed.classList.contains('is-typing')).toBe(true);
  expect(figure.style.getPropertyValue('--typed-ms')).toBe('976ms');
  act(() => jest.advanceTimersByTime(DRAFTING_DURATION - 116));
  expect(typedSoFar(typed)).toBe(DRAFTING_ILLUSTRATION.sectionLabel);
  expect(figure.classList.contains('is-settled')).toBe(false);
  act(() => jest.advanceTimersByTime(100));
  expect(figure.classList.contains('is-settled')).toBe(true);
  // Play again starts a fresh performance; leaving and re-entering the viewport does not.
  act(() => container.querySelector('.live-replay').click());
  expect(figure.classList.contains('is-settled')).toBe(false);
  expect(figure.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(16));
  expect(typedSoFar(typed).length).toBeLessThan(DRAFTING_ILLUSTRATION.sectionLabel.length);
  act(() => jest.advanceTimersByTime(DRAFTING_DURATION));
  expect(typedSoFar(typed)).toBe(DRAFTING_ILLUSTRATION.sectionLabel);
  expect(figure.classList.contains('is-settled')).toBe(true);
  expect(observers).toHaveLength(1);
});

it('holds the whole section from the start and gives the page and label the first turn, each paragraph and its record one turn, and the status the last', () => {
  jest.useFakeTimers();
  act(() => root.render(<DraftingIllustration />));
  const figure = container.querySelector('figure');
  // Idle: the whole text is in the document (the script hides the parts until the figure plays).
  const complete = text();
  for (const paragraph of DRAFTING_ILLUSTRATION.paragraphs) expect(complete).toContain(`${paragraph.n} ${paragraph.text}`);
  expect(complete).toContain(DRAFTING_ILLUSTRATION.status);
  // The parts in their turns: the label and the page together, then one paragraph and its record
  // a turn (the record's beat after its paragraph is set in the figure's CSS), then the status.
  const parts = [...container.querySelectorAll('[data-appear]')];
  expect(parts.map((part) => part.className.split(' ').find((name) => name.startsWith('drafting-')))).toEqual([
    'drafting-record-label', 'drafting-page',
    'drafting-text', 'drafting-record', 'drafting-text', 'drafting-record', 'drafting-text', 'drafting-record',
    'drafting-status',
  ]);
  expect(parts.map(turn)).toEqual(['0', '0', '1', '1', '2', '2', '3', '3', '4']);
  // Every part waits for the typing, and nothing in the figure plays by any other route.
  expect(figure.style.getPropertyValue('--typed-ms')).toMatch(/^\d+ms$/);
  expect(container.querySelectorAll('[data-appear]')).toHaveLength(2 + 2 * DRAFTING_ILLUSTRATION.paragraphs.length + 1);
  inView();
  act(() => jest.advanceTimersByTime(DRAFTING_DURATION));
  expect(figure.classList.contains('is-settled')).toBe(true);
  // The whole text is still there once settled.
  expect(text()).toBe(complete);
});

it('shares one performance between its two copies', () => {
  jest.useFakeTimers();
  const { useIllustrationPlay } = require('./illustrationKit');
  const Pair = () => {
    const play = useIllustrationPlay({ duration: DRAFTING_DURATION });
    return <><DraftingIllustration play={play} /><DraftingIllustration id="drafting-illustration-phone" play={play} /></>;
  };
  act(() => root.render(<Pair />));
  const [first, second] = container.querySelectorAll('figure');
  inView(observers[0]);
  expect(first.classList.contains('is-in')).toBe(true);
  expect(second.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(DRAFTING_DURATION));
  inView(observers[1]);
  for (const figure of [first, second]) expect(figure.classList.contains('is-settled')).toBe(true);
  const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
  expect(new Set(ids).size).toBe(ids.length);
  for (const figure of [first, second]) expect(document.getElementById(figure.getAttribute('aria-labelledby'))).not.toBeNull();
});

// The figure's stylesheet as rules, each with the media queries it sits in (comments removed).
const css = fs.readFileSync(path.join(__dirname, 'drafting-illustration.css'), 'utf8');
const kit = fs.readFileSync(path.join(__dirname, 'live-figure.css'), 'utf8');
const rules = (source) => {
  const out = [];
  const walk = (s, media) => {
    let i = 0;
    while (i < s.length) {
      const open = s.indexOf('{', i);
      if (open < 0) break;
      const prelude = s.slice(i, open).trim();
      let depth = 1;
      let j = open + 1;
      while (depth && j < s.length) { if (s[j] === '{') depth += 1; else if (s[j] === '}') depth -= 1; j += 1; }
      const body = s.slice(open + 1, j - 1);
      if (prelude.startsWith('@media')) walk(body, [...media, prelude]);
      else if (!prelude.startsWith('@keyframes')) out.push({ media: media.join(' '), selector: prelude, body });
      i = j;
    }
  };
  walk(source.replace(/\/\*[\s\S]*?\*\//g, ''), []);
  return out;
};
const ms = (source, name) => Number(source.match(new RegExp(`${name}:\\s*(\\d+)ms`))[1]);

it('sets its duration from the rhythm in its stylesheet, the first paragraph waiting for the page to settle', () => {
  act(() => root.render(<DraftingIllustration />));
  const figure = container.querySelector('figure');
  const typed = parseInt(figure.style.getPropertyValue('--typed-ms'), 10);
  const lead = ms(css, '--drafting-lead');
  const step = ms(css, '--drafting-step');
  const beat = ms(css, '--drafting-beat');
  const settle = 420;
  const last = Math.max(...[...container.querySelectorAll('[data-appear]')].map((part) => Number(turn(part))));
  // The status line is the last part: it starts in its turn, settles, and the performance ends 300ms later.
  expect(DRAFTING_DURATION).toBe(typed + lead + last * step + settle + 300);
  // The page (the kit's own wait, turn 0) has settled before the first paragraph is written on it.
  expect(ms(kit, '--after') + settle).toBeLessThanOrEqual(lead + step);
  // Each record arrives half a turn after its paragraph, and the last record's leader is drawn
  // before the status line has settled.
  expect(beat * 2).toBe(step);
  const leader = Number(css.match(/animation:\s*drafting-leader (\d+)ms/)[1]);
  expect(lead + beat + (last - 1) * step + leader).toBeLessThan(lead + last * step + settle);
});

it('hides or undraws nothing except with the script and when motion is welcome, and prints whole', () => {
  const all = rules(css);
  // Whatever is hidden or undrawn before the figure plays is hidden by the script only, on screen
  // only, and only when motion is welcome; the settled figure, reduced motion, print and pages
  // without the script show the end state.
  const hiding = all.filter((rule) => /opacity:\s*0(?![.\d])|visibility:\s*hidden|scaleX\(0\)/.test(rule.body) && !/@media print/.test(rule.media));
  expect(hiding.length).toBeGreaterThan(0);
  for (const rule of hiding) {
    expect(rule.selector).toMatch(/^\.js /);
    expect(rule.media).toMatch(/screen and \(prefers-reduced-motion: no-preference\)/);
  }
  // Motion runs only while the figure plays, and only when motion is welcome; nothing loops.
  const moving = all.filter((rule) => /animation:/.test(rule.body));
  expect(moving.length).toBeGreaterThan(0);
  for (const rule of moving) {
    expect(rule.selector).toMatch(/\.is-in:not\(\.is-settled\)/);
    expect(rule.media).toMatch(/prefers-reduced-motion: no-preference/);
    expect(rule.body).not.toMatch(/infinite/);
  }
  // The kit holds the replay control's place while the figure plays, so nothing moves when it
  // appears, and prints each typed line whole: the whole line is shown, the typed copy not.
  const shared = rules(kit);
  expect(shared.some((rule) => /^\.js \.live-figure:not\(\.is-settled\) \.live-replay$/.test(rule.selector) && /screen and \(prefers-reduced-motion: no-preference\)/.test(rule.media) && /visibility:\s*hidden/.test(rule.body) && /display:\s*inline-block/.test(rule.body))).toBe(true);
  const print = shared.filter((rule) => /@media print/.test(rule.media));
  expect(print.some((rule) => /^\.typed > \.typed-whole$/.test(rule.selector) && /opacity:\s*1/.test(rule.body))).toBe(true);
  expect(print.some((rule) => /^\.typed > \.typed-visual$/.test(rule.selector) && /visibility:\s*hidden/.test(rule.body))).toBe(true);
  // The figure overrides neither.
  expect(all.some((rule) => /live-replay|\.typed\b/.test(rule.selector))).toBe(false);
  // The caption keeps the kit's colours on screen and in print.
  expect(all.some((rule) => /figcaption/.test(rule.selector))).toBe(false);
});
