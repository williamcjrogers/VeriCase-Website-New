import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

// A muted, looping background film with a visible pause control. It loads only on wide
// screens, without reduced motion or Save-Data, and only when its band is near the viewport;
// otherwise the poster shows. A pause chosen by the visitor is kept when the band re-enters view.
export const AmbientVideo = ({ webm, mp4, poster, posterMobile, alt, labels, className, overlayClassName, children }) => {
  const wrap = useRef(null);
  const video = useRef(null);
  const [allowed, setAllowed] = useState(false);
  const [near, setNear] = useState(false);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData === true;
    setAllowed(Boolean((webm || mp4) && wide && !reduced && !saveData));
  }, [webm, mp4]);

  useEffect(() => {
    if (!allowed || !wrap.current) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
        const v = video.current;
        if (!v) return;
        if (e.isIntersecting && !userPaused.current) v.play().catch(() => {});
        if (!e.isIntersecting) v.pause();
      },
      { rootMargin: '600px 0px' }
    );
    io.observe(wrap.current);
    const onVis = () => {
      const v = video.current;
      if (!v) return;
      if (document.hidden) v.pause();
      else if (!userPaused.current) v.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [allowed]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
      setPaused(false);
    } else {
      userPaused.current = true;
      v.pause();
      setPaused(true);
    }
  };

  return (
    <div ref={wrap} className={cn('relative overflow-hidden', className)}>
      <picture>
        {posterMobile && <source media="(max-width: 767px)" srcSet={posterMobile} />}
        <img src={poster} alt={alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
      </picture>
      {allowed && near && (
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          loop
          preload="none"
          poster={poster}
          aria-hidden="true"
          onPlay={() => setPaused(false)}
        >
          {webm && <source src={webm} type="video/webm" />}
          {mp4 && <source src={mp4} type="video/mp4" />}
        </video>
      )}
      <div className={cn('absolute inset-0', overlayClassName)} aria-hidden="true" />
      <div className="relative">{children}</div>
      {allowed && near && labels && (
        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-4 left-4 z-10 inline-flex h-11 items-center gap-2 rounded-sm border border-mist/60 bg-ink-950/70 px-3 text-caption text-parchment backdrop-blur-sm hover:bg-ink-950/85"
        >
          {paused ? <Play className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" /> : <Pause className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />}
          {paused ? labels.play : labels.pause}
        </button>
      )}
    </div>
  );
};
