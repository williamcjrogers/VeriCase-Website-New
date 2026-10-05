import { useCallback, useEffect, useRef, useState } from 'react';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { cn } from '@/lib/utils';
import './live-figure.css';

// The live illustrations: fictional records on an ink panel, each playing one operation once when
// it comes into view. The reader sees the input typed in front of them and the answer appear; a
// "Play again" control replays it. Every frame carries the whole text (the typed line is complete
// for assistive technology from the start); reduced motion, print and pages without the script show
// the end state, so nothing essential depends on the motion.

export const reducedMotion = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// One performance for every copy of an illustration: whichever copy is seen first plays it once,
// and the others then show the end state. `run` counts performances, so a replay starts afresh.
export function useIllustrationPlay({ duration = 2500 } = {}) {
  const [play, setPlay] = useState({ state: 'idle', run: 0 });
  const seen = useCallback(() => setPlay((p) => (p.state === 'idle' ? { state: 'playing', run: p.run + 1 } : p)), []);
  const replay = useCallback(() => setPlay((p) => ({ state: 'playing', run: p.run + 1 })), []);
  useEffect(() => {
    if (play.state !== 'playing') return undefined;
    const timer = setTimeout(() => setPlay((p) => ({ ...p, state: 'settled' })), duration);
    return () => clearTimeout(timer);
  }, [play, duration]);
  return { state: play.state, run: play.run, seen, replay };
}

// The figure's classes: is-in once its sequence has started, is-settled once it has ended. The
// ref goes on the element whose share in view (`threshold`) starts the performance.
export function useFigurePlay(shared, { threshold = 0.6, duration = 2500 } = {}) {
  const own = useIllustrationPlay({ duration });
  const play = shared || own;
  const [ref, inView] = useInViewOnce({ threshold });
  const { seen } = play;
  useEffect(() => { if (inView) seen(); }, [inView, seen]);
  return [ref, cn(play.state !== 'idle' && 'is-in', play.state === 'settled' && 'is-settled'), play];
}

// Types `text` in front of the reader while the figure plays. Idle and settled figures hold the
// whole text, so the prerendered page and pages without the script are complete; before the
// figure plays, the script hides the typed copy (see live-figure.css). Returns how much of the text
// to show and how long the typing takes, for the sequence that follows it.
export function useTypewriter(text, play, { cps = 34, delay = 240 } = {}) {
  const [shown, setShown] = useState(text.length);
  const ms = delay + Math.ceil((text.length * 1000) / cps);
  const frame = useRef(0);
  useEffect(() => {
    if (play.state !== 'playing' || reducedMotion()) { setShown(text.length); return undefined; }
    setShown(0);
    const started = performance.now();
    const tick = () => {
      const next = Math.min(text.length, Math.max(0, Math.floor(((performance.now() - started - delay) * cps) / 1000)));
      setShown(next);
      if (next < text.length) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [text, play.state, play.run, cps, delay]);
  return { shown, ms, typing: play.state === 'playing' && shown < text.length };
}

// The typed line: the whole text, and the visual copy that is typed over it. The whole text is
// read by assistive technology and, unseen, holds the finished line's place (with room for the
// caret), so nothing around the line moves as it is typed; print shows it in place of the typed
// copy (live-figure.css).
export const Typed = ({ text, play, className, cps, delay }) => {
  const { shown, typing } = useTypewriter(text, play, { cps, delay });
  return (
    <span className={cn('typed', typing && 'is-typing', className)}>
      <span className="sr-only typed-whole">{text}<span className="typed-caret" /></span>
      <span className="typed-visual" aria-hidden="true">{text.slice(0, shown)}<span className="typed-caret" /></span>
    </span>
  );
};

// Shown once the performance has settled (and never under reduced motion): plays it again. Until
// then its place is held, unseen and unread, so the caption does not move when it appears.
export const Replay = ({ play, label = 'Play again' }) => (
  <button type="button" className="live-replay" onClick={play.replay}>{label}</button>
);

// The frame every live illustration shares: kicker, title, the stage, and a caption with the
// replay control. `titleTag` is a paragraph for the opening figure, which sits under the h1.
export const LiveFigure = ({ id, className, title, caption, play, playClass, figureRef, titleTag: Title = 'h3', style, children }) => (
  <figure ref={figureRef} className={cn('evidence-figure live-figure on-ink', className, playClass)} aria-labelledby={`${id}-title`} style={style}>
    <p className="section-kicker">Illustration</p>
    <Title id={`${id}-title`} className="evidence-figure-title font-display text-[1.625rem] leading-tight">{title}</Title>
    {children}
    <figcaption><span>{caption}</span><Replay play={play} /></figcaption>
  </figure>
);

export const keepDates = (text) => text.replace(/(\d{2}) ([A-Z][a-z]+) (\d{4})/g, '$1 $2 $3');
