// The Lens controller: stage arithmetic, easing, and the figure driven by keys, the rail, Play
// and Replay, the one-time glide and the live region, on a small copy of the markup.
import { bezier, mountLens, moveDuration, nextStop, playDuration, prevStop } from './lensController';
import { stageOf } from './lensStages';

const VALUE_TEXT = ['Stage 0', 'Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5'];
const MARKS = [6, 14, 24, 34, 44, 50, 56, 64, 72];

describe('stage arithmetic', () => {
  it('names a stage for each fifth of the field and stage 5 only at the end', () => {
    expect([0, 19.9, 20, 39.99, 40, 60, 80, 99.9, 100].map(stageOf)).toEqual([0, 0, 1, 1, 2, 3, 4, 4, 5]);
  });

  it('steps to the previous and next stop, treating a near miss as on the stop', () => {
    expect([prevStop(40), prevStop(47), prevStop(40.3), prevStop(0)]).toEqual([20, 40, 20, 0]);
    expect([nextStop(40), nextStop(47), nextStop(99.8), nextStop(100)]).toEqual([60, 60, 100, 100]);
  });

  it('keeps moves between 240 and 400 ms, and the glides at their stated lengths', () => {
    expect(moveDuration(40, 60)).toBe(240);
    expect(moveDuration(0, 100)).toBe(400);
    expect(playDuration(40)).toBe(2400);
    expect(playDuration(0)).toBe(3600);
  });

  it('eases from 0 to 1 without overshoot', () => {
    const ease = bezier([0.45, 0, 0.2, 1]);
    const samples = Array.from({ length: 21 }, (_, i) => ease(i / 20));
    expect(samples[0]).toBe(0);
    expect(samples[20]).toBe(1);
    samples.slice(1).forEach((v, i) => expect(v).toBeGreaterThanOrEqual(samples[i]));
  });
});

describe('mountLens', () => {
  let reduced;
  let observers;
  let destroy;

  const build = () => {
    document.body.innerHTML = `
      <figure class="lens" data-stage="2">
        <div class="lens-field" data-stage="2">
          <div class="lens-ordered"></div>
          <div class="lens-raw">${MARKS.map((m) => `<span data-t="${m}"${m <= 40 ? ' data-processed' : ''}></span>`).join('')}</div>
          <div class="lens-track">
            <span class="lens-stage-chip"></span>
            <div class="lens-handle" role="slider" tabindex="0" aria-valuenow="2"></div>
          </div>
        </div>
        <div class="lens-rail">
          ${[0, 20, 40, 60, 80, 100].map((s) => `<button type="button" data-stop="${s}" disabled></button>`).join('')}
          <button type="button" class="lens-play" data-mode="play" disabled></button>
        </div>
        <p class="lens-live"></p>
      </figure>`;
    const fig = document.querySelector('.lens');
    destroy = mountLens(fig, { valueText: VALUE_TEXT });
    return {
      fig,
      handle: fig.querySelector('.lens-handle'),
      play: fig.querySelector('.lens-play'),
      live: fig.querySelector('.lens-live'),
      stop: (s) => fig.querySelector(`[data-stop="${s}"]`),
      processed: () => [...fig.querySelectorAll('[data-t]')].filter((el) => el.hasAttribute('data-processed')).length,
    };
  };
  const key = (el, k) => el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));

  beforeEach(() => {
    jest.useFakeTimers();
    reduced = true;
    observers = [];
    window.matchMedia = () => ({ matches: reduced, addEventListener() {}, removeEventListener() {} });
    window.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16);
    window.cancelAnimationFrame = (id) => clearTimeout(id);
    window.IntersectionObserver = class {
      constructor(cb) {
        this.cb = cb;
        observers.push(this);
      }
      observe() {}
      disconnect() {}
    };
    jest.spyOn(window, 'getComputedStyle').mockImplementation(() => ({ getPropertyValue: () => (reduced ? '100%' : '40%') }));
  });

  afterEach(() => {
    if (destroy) destroy();
    destroy = null;
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('matches the controls to the stage rendered (stage 5 under reduced motion)', () => {
    const { fig, handle, play, stop, processed } = build();
    expect(handle.getAttribute('aria-valuenow')).toBe('5');
    expect(handle.getAttribute('aria-valuetext')).toBe('Stage 5');
    expect(fig.dataset.stage).toBe('5');
    expect(stop(100).getAttribute('aria-current')).toBe('step');
    expect(play.disabled).toBe(false);
    expect(play.dataset.mode).toBe('replay');
    expect(processed()).toBe(MARKS.length);
    expect(fig.hasAttribute('data-ready')).toBe(true);
    expect(fig.hasAttribute('data-user')).toBe(false);
  });

  it('follows the slider keys, and marks the figure as touched by the visitor', () => {
    const { fig, handle, stop, processed } = build();
    handle.focus();
    key(handle, 'Home');
    expect(handle.getAttribute('aria-valuenow')).toBe('0');
    expect(processed()).toBe(0);
    expect(fig.hasAttribute('data-user')).toBe(true);
    expect(fig.querySelector('.lens-raw').style.clipPath).toBe('inset(0 0 0 0%)');
    expect(fig.querySelector('.lens-track').style.transform).toBe('translateX(0%)');
    key(handle, 'ArrowRight');
    key(handle, 'PageUp');
    expect(handle.getAttribute('aria-valuenow')).toBe('2');
    expect(stop(40).getAttribute('aria-current')).toBe('step');
    expect(stop(0).hasAttribute('aria-current')).toBe(false);
    key(handle, 'ArrowDown');
    expect(handle.getAttribute('aria-valuenow')).toBe('1');
    key(handle, 'End');
    expect(handle.getAttribute('aria-valuenow')).toBe('5');
    expect(processed()).toBe(MARKS.length);
  });

  it('leaves the live region to the focused slider, and speaks for the rail', () => {
    const { handle, live, stop } = build();
    handle.focus();
    key(handle, 'Home');
    jest.advanceTimersByTime(50);
    expect(live.textContent).toBe('');
    stop(60).focus();
    stop(60).click();
    jest.advanceTimersByTime(50);
    expect(live.textContent).toBe('Stage 3');
    expect(handle.getAttribute('aria-valuenow')).toBe('3');
  });

  it('replays stop by stop under reduced motion, with Pause while it runs', () => {
    const { play, handle, live } = build();
    play.click();
    expect(handle.getAttribute('aria-valuenow')).toBe('0');
    expect(play.dataset.mode).toBe('pause');
    jest.advanceTimersByTime(1400);
    expect(handle.getAttribute('aria-valuenow')).toBe('2');
    play.click();
    expect(play.dataset.mode).toBe('play');
    jest.advanceTimersByTime(3000);
    expect(handle.getAttribute('aria-valuenow')).toBe('2');
    play.click();
    jest.advanceTimersByTime(2100 + 50);
    expect(handle.getAttribute('aria-valuenow')).toBe('5');
    expect(play.dataset.mode).toBe('replay');
    expect(live.textContent).toBe('Stage 5');
  });

  it('glides once when half in view, and stops for the visitor', () => {
    reduced = false;
    const { fig, play, handle } = build();
    expect(handle.getAttribute('aria-valuenow')).toBe('2');
    observers[0].cb([{ intersectionRatio: 0.6 }]);
    jest.advanceTimersByTime(799);
    expect(play.dataset.mode).toBe('play');
    jest.advanceTimersByTime(1 + 1200);
    expect(play.dataset.mode).toBe('pause');
    fig.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(play.dataset.mode).toBe('play');
    const stage = handle.getAttribute('aria-valuenow');
    jest.advanceTimersByTime(3000);
    expect(handle.getAttribute('aria-valuenow')).toBe(stage);
    observers[0].cb([{ intersectionRatio: 1 }]);
    jest.advanceTimersByTime(3000);
    expect(play.dataset.mode).toBe('play');
  });

  it('runs no glide under reduced motion', () => {
    const { play } = build();
    observers[0].cb([{ intersectionRatio: 1 }]);
    jest.advanceTimersByTime(4000);
    expect(play.dataset.mode).toBe('replay');
  });

  it('lets go of the figure when unmounted', () => {
    const { handle } = build();
    destroy();
    destroy = null;
    key(handle, 'Home');
    expect(handle.getAttribute('aria-valuenow')).toBe('5');
  });
});
