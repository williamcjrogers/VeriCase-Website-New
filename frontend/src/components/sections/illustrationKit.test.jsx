import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { LiveFigure, Typed, keepDates, typedMs, useIllustrationPlay } from './illustrationKit';
import { typedSoFar } from './liveTestUtils';

let container;
let root;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  jest.useFakeTimers();
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

// A figure that has played once and settled, so that its replay control is shown.
let play;
const Harness = () => {
  play = useIllustrationPlay({ duration: 1000 });
  const playClass = [play.state !== 'idle' && 'is-in', play.state === 'settled' && 'is-settled'].filter(Boolean).join(' ');
  return (
    <LiveFigure id="kit-figure" title="A figure." caption="Illustrative figure." play={play} playClass={playClass}>
      <p><Typed text="ten weeks" play={play} /></p>
    </LiveFigure>
  );
};
const settle = () => act(() => jest.advanceTimersByTime(1000));

it('keeps keyboard focus with a replay started from the keyboard, then returns it to the control', () => {
  act(() => root.render(<Harness />));
  act(() => play.seen());
  settle();
  const figure = container.querySelector('figure');
  const button = figure.querySelector('figcaption > button.live-replay');
  // The figure takes focus only programmatically; the control names the figure it replays.
  expect(figure.getAttribute('tabindex')).toBe('-1');
  expect(button.getAttribute('aria-describedby')).toBe('kit-figure-title');
  button.focus();
  act(() => button.click());
  // While the performance plays, the control is hidden, so focus rests on the figure itself.
  expect(play.state).toBe('playing');
  expect(document.activeElement).toBe(figure);
  settle();
  expect(play.state).toBe('settled');
  expect(document.activeElement).toBe(button);
});

it('leaves focus alone when the replay was not started from the focused control, or focus has moved on', () => {
  act(() => root.render(<><Harness /><button type="button" id="elsewhere">Elsewhere</button></>));
  act(() => play.seen());
  settle();
  const figure = container.querySelector('figure');
  const button = figure.querySelector('.live-replay');
  const elsewhere = container.querySelector('#elsewhere');
  // A pointer press that does not focus the control (as in Safari) moves nothing.
  elsewhere.focus();
  act(() => button.click());
  expect(document.activeElement).toBe(elsewhere);
  settle();
  expect(document.activeElement).toBe(elsewhere);
  // Started from the keyboard, but the reader tabbed on during the performance: focus stays where they went.
  button.focus();
  act(() => button.click());
  expect(document.activeElement).toBe(figure);
  elsewhere.focus();
  settle();
  expect(document.activeElement).toBe(elsewhere);
});

it('types into a line that already holds the whole text, the untyped rest unseen', () => {
  act(() => root.render(<Harness />));
  act(() => play.seen());
  const typed = container.querySelector('.typed');
  const visual = typed.querySelector('.typed-visual');
  act(() => jest.advanceTimersByTime(16));
  // Partway: the visual copy still holds every character, so it wraps exactly as the whole line.
  act(() => jest.advanceTimersByTime(300));
  expect(typedSoFar(typed).length).toBeGreaterThan(0);
  expect(typedSoFar(typed).length).toBeLessThan('ten weeks'.length);
  expect(visual.textContent.replace(/\s/g, '')).toContain('tenweeks');
  expect(visual.querySelector('.typed-rest').textContent).toBe('ten weeks'.slice(typedSoFar(typed).length));
  // Done: no rest is left, and the whole line is read once, from the copy for assistive technology.
  settle();
  expect(typedSoFar(typed)).toBe('ten weeks');
  expect(visual.querySelector('.typed-rest')).toBeNull();
  expect(visual.getAttribute('aria-hidden')).toBe('true');
  expect(typed.querySelector('.typed-whole').textContent).toBe('ten weeks');
});

it('times typing from the text alone, and keeps dates and the bracket designation whole', () => {
  expect(typedMs('ten weeks')).toBe(240 + Math.ceil((9 * 1000) / 34));
  expect(typedMs('ten weeks', { cps: 16, delay: 360 })).toBe(360 + Math.ceil((9 * 1000) / 16));
  expect(keepDates('On 12 March 2025, bracket type B.')).toBe('On 12 March 2025, bracket type B.');
  // A type B elsewhere in a word is not touched.
  expect(keepDates('subtype Bravo')).toBe('subtype Bravo');
});
