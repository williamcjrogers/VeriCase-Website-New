import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { COVER } from '@/content/home';
import { GATES } from '@/content/gates';
import { HeroMotto, LEAD_MS, PAUSES_MS, TYPE_FROM, WORD_AT, WORD_MS, keyTimes } from './HeroMotto';
import { Hero } from './Hero';

// The hero motto: the owner's timeline (06 October 2026), the whole text read once by assistive
// technology, every word and letter in the prerendered page, Abrahamson quoted exactly as checked
// against the book (docs/source-check-2026-09-25.md, item 10), and motion that is CSS alone, only
// when motion is welcome and never in print.
const { motto } = COVER;
const html = () => {
  const el = document.createElement('div');
  el.innerHTML = renderToString(<HeroMotto />);
  return el;
};

test('the timeline keeps the owner\'s pauses: two seconds, four seconds, then one before the typing', () => {
  expect(WORD_AT[0]).toBe(LEAD_MS);
  expect(WORD_AT[1] - (WORD_AT[0] + WORD_MS)).toBe(2000);
  expect(WORD_AT[2] - (WORD_AT[1] + WORD_MS)).toBe(4000);
  expect(TYPE_FROM - (WORD_AT[2] + WORD_MS)).toBe(1000);
  expect(PAUSES_MS).toEqual([2000, 4000, 1000]);
});

test('the line is typed patiently: one key at a time, never faster than ten a second', () => {
  const times = keyTimes(motto.line);
  expect(times).toHaveLength(motto.line.length);
  expect(times[0]).toBe(TYPE_FROM);
  times.slice(1).forEach((t, i) => expect(t - times[i]).toBeGreaterThanOrEqual(100));
  // A longer pause before the last word than between any two letters of a word.
  const last = motto.line.lastIndexOf(' ') + 1;
  const gaps = times.slice(1).map((t, i) => t - times[i]);
  expect(gaps[last - 1]).toBe(Math.max(...gaps));
});

test('assistive technology reads the whole motto once; the copy that plays is hidden from it', () => {
  const el = html();
  expect(motto.whole).toBe(`${motto.words.join(' ')} ${motto.brand} ${motto.line}.`);
  expect(el.querySelector('.sr-only').textContent).toBe(motto.whole);
  const visual = el.querySelector('.hero-motto-visual');
  expect(visual.getAttribute('aria-hidden')).toBe('true');
  // Every word and letter is in the prerendered page from the start, holding its place.
  expect(visual.querySelector('.hero-motto-words').textContent).toBe(`${motto.words.join(' ')} ${motto.brand}`);
  const keys = [...visual.querySelectorAll('.motto-key')];
  expect(keys.map((k) => k.textContent).join('')).toBe(motto.line);
  expect(keys[0].getAttribute('style')).toContain(`--d:${TYPE_FROM}ms`);
});

test('the source quotes Abrahamson exactly and names the book', () => {
  expect(GATES.G11_attribution.status).toBe('confirmed');
  const book = 'A party to a dispute, particularly if there is arbitration, will learn three lessons (often too late): the importance of records, the importance of records and the importance of records.';
  expect(book).toContain(motto.quote);
  const source = html().querySelector('.hero-motto-source');
  expect(source.textContent).toContain('Max W. Abrahamson');
  expect(source.textContent).toContain(`“${motto.quote}”.`);
  expect(source.querySelector('cite').textContent).toBe('Engineering Law and the I.C.E. Contracts');
});

test('the motto sits beside the heading, with the introduction after it', () => {
  const el = document.createElement('div');
  el.innerHTML = renderToString(<Hero />);
  const side = el.querySelector('.hero-side');
  expect(side.firstElementChild.className).toBe('hero-motto');
  expect(side.lastElementChild.className).toBe('hero-introduction');
  expect(el.querySelector('.clarity-hero-grid > div:first-child .section-kicker')).not.toBeNull();
});

test('the motion is CSS alone, only on screen when motion is welcome, and waits for the fonts', () => {
  const css = fs.readFileSync(path.join(__dirname, 'clarity.css'), 'utf8');
  const start = css.indexOf('@media screen and (prefers-reduced-motion: no-preference) {\n  .hero-motto');
  expect(start).toBeGreaterThan(-1);
  const block = css.slice(start, css.indexOf('\n}\n', start));
  expect(block).toMatch(/html:not\(\.fonts-ready\) \.hero-motto \*/);
  // Outside that block nothing about the motto is hidden: no animation, no zero opacity.
  const outside = css.replace(block, '');
  outside.split('\n').filter((l) => /hero-motto|motto-/.test(l) && !l.startsWith('@keyframes')).forEach((l) => {
    expect(l).not.toMatch(/animation:|opacity: 0/);
  });
  const index = fs.readFileSync(path.join(__dirname, '../../../public/index.html'), 'utf8');
  expect(index).toMatch(/<noscript><style>\.hero-motto \*[^<]*animation: none !important/);
});
