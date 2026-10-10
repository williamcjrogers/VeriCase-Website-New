import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { COVER, LESSONS } from '@/content/home';
import { GATES } from '@/content/gates';
import { HeroMotto, LINE_AT, LINE_MS, WORD_AT, WORD_MS } from './HeroMotto';
import { Hero } from './Hero';
import { Lessons } from './Lessons';
import { DiscussionCostExample } from './DiscussionCostExample';

// The hero motto: the owner's timeline (06 October 2026), the whole text read once by assistive
// technology, every word and letter in the prerendered page, motion that is CSS alone, only when
// motion is welcome and never in print; and the passage it adapts, quoted in full beneath the
// opening exactly as checked against the book (docs/source-check-2026-09-25.md, item 10).
const { motto } = COVER;
const html = () => {
  const el = document.createElement('div');
  el.innerHTML = renderToString(<HeroMotto />);
  return el;
};

test('the reveal settles in under five seconds, with each word preceding the tagline', () => {
  expect(WORD_AT[0]).toBe(0);
  expect(WORD_AT[1]).toBeGreaterThan(WORD_AT[0] + WORD_MS);
  expect(WORD_AT[2]).toBeGreaterThan(WORD_AT[1] + WORD_MS);
  expect(LINE_AT[0]).toBeGreaterThan(WORD_AT[2] + WORD_MS);
  expect(LINE_AT[1] + LINE_MS).toBeLessThan(5000);
});

test('assistive technology reads the whole motto once; the copy that plays is hidden from it', () => {
  const el = html();
  expect(motto.whole).toBe(`“${motto.words.join(' ')} ${motto.brand}” - ${motto.lines.join(' ')}`);
  expect(motto.lines).toEqual(['Making Time Your Ally,', 'Not Your Enemy.']);
  expect(motto.words).toEqual(['Records,', 'records,']);
  expect(el.querySelector('.sr-only').textContent).toBe(motto.whole);
  const visual = el.querySelector('.hero-motto-visual');
  expect(visual.getAttribute('aria-hidden')).toBe('true');
  expect(visual.textContent).toBe(motto.whole);
  // Every word and letter is in the prerendered page from the start, holding its place.
  // In italic within quotation marks, the opening mark hung so that the words align.
  expect(visual.querySelector('.hero-motto-words').textContent).toBe(`“${motto.words.join(' ')} ${motto.brand}”`);
  expect([...visual.querySelectorAll('.hero-motto-line-row')].map((r) => r.textContent)).toEqual(motto.lines);
  expect(visual.querySelectorAll('.motto-word')).toHaveLength(3);
  expect(el.querySelector('.hero-motto').classList.contains('is-in-view')).toBe(false);
  expect(el.querySelector('button.motto-replay').textContent).toBe('Replay lettering');
});

test('the credit beneath the motto names Abrahamson and links to the passage in full', () => {
  expect(GATES.G11_attribution.status).toBe('confirmed');
  const source = html().querySelector('.hero-motto-source');
  expect(source.textContent).toContain('Max W. Abrahamson');
  expect(source.querySelector('a').getAttribute('href')).toBe('#lessons');
});

test('the passage is quoted word for word, with the added emphasis marked and the book cited', () => {
  const el = document.createElement('div');
  el.innerHTML = renderToString(<Lessons />);
  const book = 'A party to a dispute, particularly if there is arbitration, will learn three lessons (often too late): the importance of records, the importance of records and the importance of records. It is impossible to exaggerate the extent to which lawyers can find unexpected grounds, often quite real, on which to cast doubt on evidence if it is not backed by meticulously established records.';
  const quote = el.querySelector('blockquote p');
  expect(quote.textContent).toBe(`“${book}” [Emphasis added]`);
  expect(quote.querySelector('em').textContent).toBe('meticulously established records');
  expect(el.querySelector('figcaption cite').textContent).toBe('Engineering Law and the I.C.E. Contracts');
  expect(el.querySelector('figcaption').textContent).toContain('(first published in 1965)');
  expect([...quote.querySelectorAll('.lessons-stress')].map((part) => part.textContent)).toEqual([
    'the importance of records, the importance of records and the importance of records',
    'often quite real',
  ]);
  expect(el.querySelector('.lessons-label').textContent).toBe('THE REASON WE BUILT VERICASE');
  expect(el.querySelector('#lessons-title').textContent).toBe('Your case begins with the record.');
  expect(el.querySelector('.lessons-close').textContent).toBe('VeriCase exists so these lessons need not be learned the hard way.');
  expect(el.querySelector('#lessons-title').textContent).toBe(LESSONS.h2);
  expect(el.querySelector('#lessons').closest('details')).toBeNull();
  expect(el.querySelector('summary')).toBeNull();
  expect(html().querySelector('#lessons')).toBeNull();
});

test('the approved opening stands beside the original interactive correspondence illustration', () => {
  const el = document.createElement('div');
  el.innerHTML = renderToString(<Hero />);
  const side = el.querySelector('.clarity-hero-grid > .hero-side');
  expect(side.querySelector('.lens')).not.toBeNull();
  expect(side.querySelector('.lens').dataset.stage).toBe('0');
  expect(side.querySelectorAll('.lens-stop')).toHaveLength(6);
  expect(el.querySelector('.hero-action a[href^="mailto:"]').textContent).toContain('Request a demonstration');
  expect(el.querySelector(`a[href="#${COVER.heroSecondary.section}"]`).textContent).toBe(COVER.heroSecondary.label);
  const main = el.querySelector('.clarity-hero-grid > .hero-main');
  expect([...main.children].map((c) => c.className)).toEqual(['clarity-title', 'hero-lead', 'hero-outcome', 'hero-introduction']);
  // The existing kicker sits above both columns.
  expect(el.querySelector('.container > .section-kicker + .clarity-hero-grid')).not.toBeNull();
});

test('reduced motion and prerendered text remain visible without running the reveal', () => {
  const css = fs.readFileSync(path.join(__dirname, 'clarity.css'), 'utf8');
  const start = css.indexOf('@media screen and (prefers-reduced-motion: no-preference) {\n  .hero-motto');
  expect(start).toBeGreaterThan(-1);
  const block = css.slice(start, css.indexOf('\n}\n', start));
  expect(block).toContain('.hero-motto.is-in-view');
  const outside = css.replace(block, '');
  outside.split('\n').filter((l) => /hero-motto|motto-/.test(l) && !l.startsWith('@keyframes')).forEach((l) => {
    expect(l).not.toMatch(/animation:|opacity: 0/);
  });
});

test('discussion costs belong to collaboration, with their assumptions and calculator', () => {
  const el = document.createElement('div');
  el.innerHTML = renderToString(<Hero />);
  expect(el.querySelector('.discussion-cost-example')).toBeNull();
  el.innerHTML = renderToString(<DiscussionCostExample />);
  const example = el.querySelector('.discussion-cost-example');
  expect(example.textContent).toContain('not a measured saving');
  expect(example.querySelector('a[href="/notes#note-3"]')).not.toBeNull();
  expect(example.querySelector('a[href="/discussion-cost"]')).not.toBeNull();
  expect(example.querySelectorAll('dl dt')).toHaveLength(3);
  expect(example.querySelectorAll('dl dd')).toHaveLength(3);
});

test('the approved headline can wrap between words without nested spans that hide text in Safari', () => {
  const el = document.createElement('div');
  el.innerHTML = renderToString(<Hero />);
  const heading = el.querySelector('h1');
  expect(heading.textContent).toBe(COVER.h1);
  expect(heading.querySelector('em').children).toHaveLength(0);
  expect(heading.textContent).not.toContain('\u00a0');
});
