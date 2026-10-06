import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { DiscussionIllustration, DISCUSSION_DURATION } from './DiscussionIllustration';
import { DISCUSSION_ILLUSTRATION, EVIDENCE_ILLUSTRATION } from '@/content/marketing';
import { typedSoFar } from './liveTestUtils';

// The checks every live illustration passes: labelled and captioned as fictional; inert apart from
// the replay control in its caption; no reference scheme, dashes or formats; dates as DD Month
// YYYY and never split; the whole typed text present from the start; one performance that starts
// in view, settles, and can be played again. Then the discussion's own: the record is there from
// the start, the comments are a list of two under their label, by role and in order, the first
// typed in front of the reader and the reply arriving after it.
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
const plain = (s) => s.replace(/\u00a0/g, ' ');
const text = () => plain(container.textContent);
const D = DISCUSSION_ILLUSTRATION;
const record = EVIDENCE_ILLUSTRATION[D.recordIndex];
const [question, reply] = D.comments;

it('is labelled, captioned, inert and set in the fictional matter', () => {
  act(() => root.render(<DiscussionIllustration />));
  const figure = container.querySelector(':scope > figure.evidence-figure.live-figure.discussion-illustration');
  expect(figure.getAttribute('aria-labelledby')).toBe('discussion-illustration-title');
  expect(container.querySelector('#discussion-illustration-title').tagName).toBe('H3');
  expect(container.querySelector('#discussion-illustration-title').textContent).toBe(D.title);
  expect(container.querySelector('.section-kicker').textContent).toBe('Illustration');
  expect(container.querySelector(':scope > figure > figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\./);
  // The replay control is the only control, and it lives in the caption.
  expect(container.querySelectorAll('button, a, input, select, textarea, [tabindex]:not(figure), [contenteditable]')).toHaveLength(1);
  expect(container.querySelector('figcaption > button.live-replay')).not.toBeNull();
  expect(text()).not.toMatch(/EV-\d|@\w|[\u2013\u2014]/);
  expect(text()).not.toMatch(/programme|delay analysis|\.pdf|\.docx|Word|PDF/i);
  // Roles, not people: no mentions, notifications or avatars.
  expect(text()).not.toMatch(/mention|notif|avatar|unread|\bnew\b/i);
  expect(container.querySelectorAll('img, svg, [role="img"]')).toHaveLength(0);
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g')) || [];
  expect(dates.length).toBeGreaterThan(0);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})\\u00a0\\d{4}$`));
});

it('quotes the record, with its attribution outside the quoted words, from the start', () => {
  act(() => root.render(<DiscussionIllustration />));
  const slip = container.querySelector('.discussion-record');
  expect(slip.classList.contains('on-paper')).toBe(true);
  expect(plain(slip.querySelector('blockquote').textContent)).toBe(`“${record.excerpt}”`);
  expect(plain(slip.querySelector('blockquote + p').textContent)).toBe(`${record.document}, ${record.date}`);
  // Present in every frame: neither the record nor anything around it waits its turn.
  expect(slip.closest('[data-appear]')).toBeNull();
  expect(slip.querySelector('[data-appear]')).toBeNull();
});

it('keeps the comments as a list of two under their label, by role and in order', () => {
  act(() => root.render(<DiscussionIllustration />));
  const label = container.querySelector('h4.live-prompt-label');
  expect(label.textContent).toBe(D.commentsLabel);
  // The heading introduces the list, which follows it directly and is not labelled a second time.
  const list = container.querySelector('ol.discussion-thread');
  expect(list.getAttribute('role')).toBe('list');
  expect(label.nextElementSibling).toBe(list);
  expect(list.hasAttribute('aria-labelledby')).toBe(false);
  expect(list.hasAttribute('aria-label')).toBe(false);
  const items = list.querySelectorAll(':scope > li');
  expect(items).toHaveLength(2);
  // The first comment: its role, then the question, typed.
  expect(items[0].querySelector('.discussion-role').textContent).toBe(question.role);
  expect(items[0].querySelector('.typed .sr-only').textContent).toBe(question.text);
  // The reply: paper, its role, then its words (a sentence to a line; the words are unchanged).
  const paper = items[1].querySelector('.discussion-reply');
  expect(paper.classList.contains('on-paper')).toBe(true);
  expect(paper.querySelector('.discussion-role').textContent).toBe(reply.role);
  expect(plain(paper.querySelector('.discussion-reply-text').textContent)).toBe(reply.text);
  expect(paper.querySelectorAll('.discussion-sentence')).toHaveLength(2);
  // A paragraph reference stays with its number.
  expect(paper.querySelector('.discussion-reply-text').textContent).toContain('Paragraph\u00a04.2');
  // Only the reply waits its turn; the question's role is there as it is typed.
  const parts = container.querySelectorAll('[data-appear]');
  expect(parts).toHaveLength(1);
  expect(parts[0]).toBe(paper);
  expect(items[0].querySelector('[data-appear]')).toBeNull();
});

it('holds the whole question for assistive technology and types it only while playing', () => {
  jest.useFakeTimers();
  act(() => root.render(<DiscussionIllustration />));
  const figure = container.querySelector('figure');
  const typed = container.querySelector('.typed');
  expect(typed.querySelector('.sr-only').textContent).toBe(question.text);
  // Idle: the visual copy is complete (the script hides it until the figure plays).
  expect(typedSoFar(typed)).toBe(question.text);
  expect(figure.classList.contains('is-in')).toBe(false);
  inView();
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(observers[0].disconnected).toBe(true);
  act(() => jest.advanceTimersByTime(16));
  expect(typedSoFar(typed).length).toBeLessThan(question.text.length);
  expect(typed.classList.contains('is-typing')).toBe(true);
  // The reply waits for the typing: the figure carries the typing's length for the stylesheet.
  expect(figure.style.getPropertyValue('--typed-ms')).toBe(`${240 + Math.ceil((question.text.length * 1000) / 34)}ms`);
  // The performance settles at DISCUSSION_DURATION from its start, 16 of which have passed.
  act(() => jest.advanceTimersByTime(DISCUSSION_DURATION - 16 - 1));
  expect(figure.classList.contains('is-settled')).toBe(false);
  act(() => jest.advanceTimersByTime(1));
  expect(typedSoFar(typed)).toBe(question.text);
  expect(typed.classList.contains('is-typing')).toBe(false);
  expect(figure.classList.contains('is-settled')).toBe(true);
  // Play again starts a fresh performance; leaving and re-entering the viewport does not.
  act(() => container.querySelector('.live-replay').click());
  expect(figure.classList.contains('is-settled')).toBe(false);
  expect(figure.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(16));
  expect(typedSoFar(typed).length).toBeLessThan(question.text.length);
  expect(observers).toHaveLength(1);
});

it('lasts as long as its sequence, and no longer', () => {
  // The question is typed at the kit's pace (240 + 34 characters a second); then the pause before
  // the reply (440), the reply's turn (360) and its entrance (420); then the kit's margin of 300.
  const typing = 240 + Math.ceil((question.text.length * 1000) / 34);
  expect(DISCUSSION_DURATION).toBe(typing + 440 + 360 + 420 + 300);
});

it('shares one performance between two copies', () => {
  jest.useFakeTimers();
  const { useIllustrationPlay } = require('./illustrationKit');
  const Pair = () => {
    const play = useIllustrationPlay({ duration: DISCUSSION_DURATION });
    return <><DiscussionIllustration play={play} /><DiscussionIllustration id="discussion-illustration-phone" play={play} /></>;
  };
  act(() => root.render(<Pair />));
  const [first, second] = container.querySelectorAll(':scope > figure');
  inView(observers[0]);
  expect(first.classList.contains('is-in')).toBe(true);
  expect(second.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(DISCUSSION_DURATION));
  inView(observers[1]);
  for (const figure of [first, second]) expect(figure.classList.contains('is-settled')).toBe(true);
  const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
  expect(new Set(ids).size).toBe(ids.length);
  // Each copy is labelled by its own title.
  for (const figure of [first, second]) {
    expect(figure.querySelector(`#${figure.getAttribute('aria-labelledby')}`).textContent).toBe(D.title);
  }
});

it('ships no regular expression lookbehind, which Safari before 16.4 cannot parse', () => {
  // The production browser list includes iOS Safari 15; one lookbehind literal in this module
  // would stop the whole main bundle parsing there, and Babel does not transform it.
  const source = require('fs').readFileSync(require('path').join(__dirname, 'DiscussionIllustration.jsx'), 'utf8');
  expect(source).not.toMatch(/\(\?<[=!]/);
});
