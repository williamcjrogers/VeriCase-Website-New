import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { COVER } from '@/content/home';
import { Gated } from '@/components/editorial/Gated';
import { onSectionClick } from '@/lib/navigate';
import { useInViewOnce } from '@/hooks/useInViewOnce';

const { motto } = COVER;
export const WORD_AT = [0, 1050, 2100];
export const WORD_MS = 700;
export const LINE_AT = [3150, 3500];
export const LINE_MS = 850;

// Complete text is present before hydration. The ink reveal runs on first view or explicit
// replay, without changing layout. Reduced motion keeps the same composition fully visible.
export const HeroMotto = () => {
  const [ref, inView] = useInViewOnce({ threshold: 0.35 });
  const [fontsReady, setFontsReady] = useState(false);
  const [replay, setReplay] = useState(0);
  useEffect(() => {
    let active = true;
    const ready = () => { if (active) setFontsReady(true); };
    if (document.fonts?.ready) document.fonts.ready.then(ready, ready);
    else ready();
    return () => { active = false; };
  }, []);
  return (
    <div id="records-motto" ref={ref} className={`hero-motto${inView && fontsReady ? ' is-in-view' : ''}`}>
      <p className="hero-motto-text">
        <span className="sr-only">{motto.whole}</span>
        <span key={replay} className="hero-motto-visual" aria-hidden="true">
          <span className="hero-motto-words">
            <span className="motto-records">
              {motto.words.map((word, i) => (
                <span key={i}>
                  {i > 0 && ' '}
                  <span className="motto-word" style={{ '--at': `${WORD_AT[i]}ms` }}>
                    {i === 0 && <span className="motto-quote">{motto.open}</span>}{word}
                  </span>
                </span>
              ))}
            </span>{' '}
            <span className="motto-word motto-brand" style={{ '--at': `${WORD_AT[2]}ms` }}>{motto.brand}<span className="motto-quote">{motto.close}</span></span>
          </span>{' - '}
          <span className="hero-motto-line">
            {motto.lines.map((line, i) => (
              <span key={line}>{i > 0 && ' '}<span className="hero-motto-line-row" style={{ '--at': `${LINE_AT[i]}ms` }}>{line}</span></span>
            ))}
          </span>
        </span>
      </p>
      <div className="hero-motto-footer">
        <Gated id="G11_attribution" block className="hero-motto-source">
          <p>{motto.attribution} <a href="#lessons" onClick={onSectionClick('lessons')}>{motto.toPassage}</a></p>
        </Gated>
        <button type="button" className="motto-replay" onClick={() => setReplay((value) => value + 1)}><RotateCcw size={14} aria-hidden="true" />Replay lettering</button>
      </div>
    </div>
  );
};
