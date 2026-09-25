// Fig. 1 controller, imported once the page is idle. It moves the lens by pointer, by the
// WAI-ARIA slider keys, by the stage rail and by one glide on first view, writing styles and
// data attributes directly: no React render happens per frame.
import { STOPS, stageOf } from '@/components/lens/lensStages';

// Cubic-bezier easing for the CSS tokens (settle and glide), solved by Newton's method with a
// bisection fallback.
export function bezier([x1, y1, x2, y2]) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (p) => {
    if (p <= 0) return 0;
    if (p >= 1) return 1;
    let t = p;
    for (let i = 0; i < 8; i += 1) {
      const err = sampleX(t) - p;
      const d = slopeX(t);
      if (Math.abs(err) < 1e-6) return sampleY(t);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    let lo = 0;
    let hi = 1;
    t = p;
    while (hi - lo > 1e-6) {
      if (sampleX(t) < p) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return sampleY(t);
  };
}

const SETTLE = bezier([0.2, 0, 0, 1]);
const GLIDE = bezier([0.45, 0, 0.2, 1]);

// The stop before or after a position; within half a percent of a stop counts as on it.
export const prevStop = (x) => [...STOPS].reverse().find((s) => s < x - 0.5) ?? 0;
export const nextStop = (x) => STOPS.find((s) => s > x + 0.5) ?? 100;

// A user move takes 240 ms for one stop, rising to 400 ms across the whole field.
export const moveDuration = (from, to) => Math.min(400, Math.max(240, 160 + 2.4 * Math.abs(to - from)));

// The one-time glide runs 40 to 100 in 2.4 s; Play keeps that pace; Replay is 3.6 s end to end.
export const playDuration = (from) => Math.min(3600, Math.max(600, (100 - from) * 40));

export function mountLens(fig, { valueText }) {
  const field = fig.querySelector('.lens-field');
  const ordered = field.querySelector('.lens-ordered');
  const raw = field.querySelector('.lens-raw');
  const track = field.querySelector('.lens-track');
  const chip = field.querySelector('.lens-stage-chip');
  const handle = fig.querySelector('.lens-handle');
  const play = fig.querySelector('.lens-play');
  const live = fig.querySelector('.lens-live');
  const rail = [...fig.querySelectorAll('.lens-rail [data-stop]')];
  const marks = [...fig.querySelectorAll('[data-t]')].map((el) => ({ el, t: Number(el.dataset.t), on: el.hasAttribute('data-processed') }));
  const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = reducedQuery.matches;

  let x = parseFloat(getComputedStyle(field).getPropertyValue('--lens-x')) || 0;
  let stage = -1;
  let ariaStage = -1;
  let raf = 0;
  let glide = null; // { from, to, start, duration, ease, kind: 'user' | 'quiet' | 'play' | 'auto' }
  let stepper = 0; // the interval of a stepped Play under reduced motion
  let drag = null;
  let held = false; // a keyboard or rail move has already set the slider to its destination
  let interacted = false;
  let autoTimer = 0;
  let autoDone = false;
  let inView = false;

  const setAria = (s) => {
    if (s === ariaStage) return;
    ariaStage = s;
    handle.setAttribute('aria-valuenow', String(s));
    handle.setAttribute('aria-valuetext', valueText[s]);
  };

  // Writes the lens position and everything that follows from it. The five consumers are written
  // directly: changing --lens-x on the field would restyle every item in it on every frame. An
  // item processed by a move (not by the prerendered state) is also marked fresh, which starts
  // its one-off effects.
  const apply = (nx) => {
    x = Math.max(0, Math.min(100, nx));
    const v = Math.round(x * 100) / 100;
    ordered.style.clipPath = `inset(0 ${Math.round((100 - x) * 100) / 100}% 0 0)`;
    raw.style.clipPath = `inset(0 0 0 ${v}%)`;
    track.style.transform = `translateX(${v}%)`;
    chip.style.setProperty('--lx', String(v));
    handle.style.setProperty('--lx', String(v));
    for (const m of marks) {
      const on = x >= m.t;
      if (on !== m.on) {
        m.on = on;
        m.el.toggleAttribute('data-processed', on);
        m.el.toggleAttribute('data-fresh', on);
      }
    }
    const s = stageOf(x);
    if (s !== stage) {
      stage = s;
      fig.dataset.stage = String(s);
      field.dataset.stage = String(s);
      rail.forEach((b) => (Number(b.dataset.stop) === STOPS[s] ? b.setAttribute('aria-current', 'step') : b.removeAttribute('aria-current')));
    }
    if (!held) setAria(s);
  };

  // Speaks the stage once a move has settled. A focused slider announces its own value, so the
  // live region stays silent then, and each change is spoken once.
  const announce = () => {
    if (document.activeElement === handle) return;
    live.textContent = '';
    requestAnimationFrame(() => {
      live.textContent = valueText[stage];
    });
  };

  // The Play control reads Pause while a glide plays, Replay at the end and Play otherwise.
  const setMode = (mode) => {
    play.dataset.mode = mode;
  };
  const restMode = () => setMode(x >= 100 ? 'replay' : 'play');

  const settle = (kind) => {
    held = false;
    setAria(stage);
    restMode();
    if (kind === 'user' || kind === 'play') announce();
  };

  const frame = (now) => {
    raf = 0;
    if (glide) {
      const p = glide.duration > 0 ? Math.min(1, (now - glide.start) / glide.duration) : 1;
      apply(glide.from + (glide.to - glide.from) * glide.ease(p));
      if (p >= 1) {
        const { kind } = glide;
        glide = null;
        settle(kind);
      }
    } else if (drag && drag.target != null) {
      // A grabbed band tracks the pointer exactly; a jump to a new spot catches up over a few frames.
      const gap = drag.target - x;
      apply(drag.mode === 'relative' || reduced || Math.abs(gap) < 0.05 ? drag.target : x + gap * 0.4);
    }
    if (glide || (drag && drag.target != null && Math.abs(drag.target - x) >= 0.05)) raf = requestAnimationFrame(frame);
  };
  const tick = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };
  const startGlide = (to, duration, ease, kind) => {
    glide = { from: x, to, start: performance.now(), duration, ease, kind };
    tick();
  };

  // Stops any glide or stepped play where it stands.
  const halt = () => {
    const playing = stepper || (glide && (glide.kind === 'play' || glide.kind === 'auto'));
    glide = null;
    if (stepper) {
      clearInterval(stepper);
      stepper = 0;
    }
    held = false;
    setAria(stage);
    if (playing) restMode();
  };

  // A move to a stop: a short glide, instant under reduced motion. The slider reports its
  // destination at once, so a focused screen reader hears one value, not each one passed.
  const moveTo = (to) => {
    halt();
    held = true;
    setAria(stageOf(to));
    if (reduced) {
      apply(to);
      settle('user');
    } else startGlide(to, moveDuration(x, to), SETTLE, 'user');
  };

  // Play and Replay: one glide to the end, or under reduced motion a step through each stop.
  const run = (kind) => {
    halt();
    setMode('pause');
    if (!reduced) {
      startGlide(100, kind === 'auto' ? 2400 : playDuration(x), GLIDE, kind);
      return;
    }
    stepper = setInterval(() => {
      apply(nextStop(x));
      if (x < 100) return;
      clearInterval(stepper);
      stepper = 0;
      settle('play');
    }, 700);
  };

  // The first real action on the figure ends the reduced-motion override (data-user).
  const interact = () => {
    if (interacted) return;
    interacted = true;
    fig.setAttribute('data-user', '');
  };

  // The one-time glide: only without reduced motion, while the page is visible, with half the
  // figure in view and before any interaction. It waits 800 ms, then runs from 40 to 100.
  const canAuto = () => !reduced && !interacted && !autoDone && inView && document.visibilityState === 'visible';
  const armAuto = () => {
    if (!canAuto()) {
      clearTimeout(autoTimer);
      autoTimer = 0;
      return;
    }
    if (autoTimer) return;
    autoTimer = setTimeout(() => {
      autoTimer = 0;
      if (!canAuto()) return;
      autoDone = true;
      run('auto');
    }, 800);
  };
  const cancelAuto = () => {
    autoDone = true;
    clearTimeout(autoTimer);
    autoTimer = 0;
    if (glide && glide.kind === 'auto') halt();
  };

  // Pointer: the whole field is the drag surface. Grabbing the band drags it; pressing elsewhere
  // sends the lens there. Touch waits for a horizontal move, so vertical scrolling passes through.
  const begin = (at) => {
    drag.mode = drag.near ? 'relative' : 'absolute';
    field.setAttribute('data-dragging', '');
    if (drag.mode === 'absolute') {
      drag.target = at;
      tick();
    }
  };
  const onPointerDown = (e) => {
    if (drag || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const rect = field.getBoundingClientRect();
    const at = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const near = Math.abs(((at - x) / 100) * rect.width) <= 24 || Boolean(e.target.closest('.lens-handle'));
    interact();
    halt();
    drag = { id: e.pointerId, rect, startX: e.clientX, startLens: x, startStage: stage, near, mode: e.pointerType === 'touch' ? 'pending' : null, target: null };
    try {
      field.setPointerCapture(e.pointerId);
    } catch (err) {
      // The pointer is already gone; the up and cancel handlers still end the drag.
    }
    if (drag.mode !== 'pending') begin(at);
  };
  const onPointerMove = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.startX;
    const at = ((e.clientX - drag.rect.left) / drag.rect.width) * 100;
    if (drag.mode === 'pending') {
      if (Math.abs(dx) < 6) return;
      begin(at);
    }
    drag.target = Math.max(0, Math.min(100, drag.mode === 'relative' ? drag.startLens + (dx / drag.rect.width) * 100 : at));
    tick();
  };
  const onPointerEnd = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag;
    drag = null;
    field.removeAttribute('data-dragging');
    if (field.hasPointerCapture?.(e.pointerId)) field.releasePointerCapture(e.pointerId);
    if (d.target == null) return;
    const kind = stageOf(d.target) !== d.startStage ? 'user' : 'quiet';
    if (!reduced && Math.abs(d.target - x) > 0.5) startGlide(d.target, 180, SETTLE, kind);
    else {
      apply(d.target);
      settle(kind);
    }
  };

  // Keyboard: the WAI-ARIA slider pattern on the handle.
  const onKeyDown = (e) => {
    let to;
    if (['ArrowLeft', 'ArrowDown', 'PageDown'].includes(e.key)) to = prevStop(x);
    else if (['ArrowRight', 'ArrowUp', 'PageUp'].includes(e.key)) to = nextStop(x);
    else if (e.key === 'Home') to = 0;
    else if (e.key === 'End') to = 100;
    else return;
    e.preventDefault();
    interact();
    moveTo(to);
  };

  const onRailClick = (e) => {
    interact();
    moveTo(Number(e.currentTarget.dataset.stop));
  };

  const onPlayClick = () => {
    const mode = play.dataset.mode;
    interact();
    cancelAuto();
    if (mode === 'pause') {
      halt();
      return;
    }
    if (x >= 100) {
      halt();
      apply(0);
    }
    run('play');
  };

  // Any pointer, key or focus on the figure, other than on the Play control, ends the autoplay.
  const onIntent = (e) => {
    if (!play.contains(e.target)) cancelAuto();
  };

  const onVisibility = () => {
    if (document.visibilityState !== 'visible') halt();
    armAuto();
  };
  const onReducedChange = () => {
    reduced = reducedQuery.matches;
    if (reduced) cancelAuto();
  };

  const io =
    typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(
          ([entry]) => {
            inView = entry.intersectionRatio >= 0.5;
            armAuto();
          },
          { threshold: [0, 0.5, 1] }
        );

  // Mount: match the controls to the stage actually rendered (stage 5 under reduced motion).
  apply(x);
  restMode();
  play.disabled = false;
  rail.forEach((b) => {
    b.disabled = false;
    b.addEventListener('click', onRailClick);
  });
  fig.setAttribute('data-ready', '');
  field.addEventListener('pointerdown', onPointerDown);
  field.addEventListener('pointermove', onPointerMove);
  field.addEventListener('pointerup', onPointerEnd);
  field.addEventListener('pointercancel', onPointerEnd);
  field.addEventListener('lostpointercapture', onPointerEnd);
  handle.addEventListener('keydown', onKeyDown);
  play.addEventListener('click', onPlayClick);
  fig.addEventListener('pointerdown', onIntent, true);
  fig.addEventListener('keydown', onIntent, true);
  fig.addEventListener('focusin', onIntent);
  document.addEventListener('visibilitychange', onVisibility);
  reducedQuery.addEventListener?.('change', onReducedChange);
  io?.observe(fig);

  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(autoTimer);
    clearInterval(stepper);
    io?.disconnect();
    rail.forEach((b) => b.removeEventListener('click', onRailClick));
    field.removeEventListener('pointerdown', onPointerDown);
    field.removeEventListener('pointermove', onPointerMove);
    field.removeEventListener('pointerup', onPointerEnd);
    field.removeEventListener('pointercancel', onPointerEnd);
    field.removeEventListener('lostpointercapture', onPointerEnd);
    handle.removeEventListener('keydown', onKeyDown);
    play.removeEventListener('click', onPlayClick);
    fig.removeEventListener('pointerdown', onIntent, true);
    fig.removeEventListener('keydown', onIntent, true);
    fig.removeEventListener('focusin', onIntent);
    document.removeEventListener('visibilitychange', onVisibility);
    reducedQuery.removeEventListener?.('change', onReducedChange);
  };
}
