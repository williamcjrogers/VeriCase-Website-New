import { MessageSquareText, Package } from 'lucide-react';
import { COVER } from '@/content/home';
import { Gated } from '@/components/editorial/Gated';
import { onSectionClick } from '@/lib/navigate';

const { motto } = COVER;

// The motto's timeline, in milliseconds from the moment the fonts are ready (the owner's
// direction, 06 October 2026, with each pause shortened to a second and the whole sped up the same
// day): "Records,", a pause, "records,", a pause in which a third "records" is expected,
// "VeriCase.", a pause, and then the two lines typed beneath it. Each word takes WORD_MS to settle;
// each pause runs from one word settling to the next beginning. The motion is CSS (clarity.css), so
// the prerendered page plays it at once.
export const LEAD_MS = 300;
export const WORD_MS = 450;
export const PAUSES_MS = [1000, 1000, 1000];
export const WORD_AT = [
  LEAD_MS,
  LEAD_MS + WORD_MS + PAUSES_MS[0],
  LEAD_MS + 2 * WORD_MS + PAUSES_MS[0] + PAUSES_MS[1],
];
export const TYPE_FROM = WORD_AT[2] + WORD_MS + PAUSES_MS[2];

// Brisk typing: a quick key, a beat after each space and a longer one where the first line ends,
// with a fixed, slight unevenness so that it reads as a hand rather than a machine. The times are
// fixed, so the prerendered page and the app agree. `lines` are typed one after the other.
const KEY_MS = 62;
const UNEVEN_MS = [0, 14, -8, 18, -5, 8, 22, -10];
const AFTER_SPACE_MS = 45;
const BETWEEN_LINES_MS = 380;

export const keyTimes = (lines, from = TYPE_FROM) => {
  const times = [];
  let t = from;
  let n = 0;
  lines.forEach((line, l) => {
    if (l > 0) t += BETWEEN_LINES_MS;
    for (const key of line) {
      times.push(t);
      t += KEY_MS + UNEVEN_MS[n % UNEVEN_MS.length];
      if (key === ' ') t += AFTER_SPACE_MS;
      n += 1;
    }
  });
  return times;
};

const ms = (n) => `${n}ms`;

// The motto opposite the kicker, with its source beneath and a link to the passage in full. Assistive technology reads the whole
// motto once; the copy that plays is hidden from it, and every word and letter of that copy holds
// its place from the start, so nothing around it moves.
export const HeroMotto = () => {
  const times = keyTimes(motto.lines);
  const typedEnd = times[times.length - 1];
  return (
    <div className="hero-motto motto-card" style={{ '--caret-from': ms(WORD_AT[2] + WORD_MS), '--typed-end': ms(typedEnd) }}>
      {/* A window like the app's: its bar, then the motto on a blue panel and the line typed
          beneath it on the white card (owner, 09 October 2026: the plain motto looked "extremely
          basic"). */}
      <div className="motto-card-bar" aria-hidden="true">
        <span className="app-dots"><span /><span /><span /></span>
        <span className="motto-card-label">{motto.label}</span>
      </div>
      <p className="hero-motto-text">
        <span className="sr-only">{motto.whole}</span>
        <span className="hero-motto-visual" aria-hidden="true">
          <span className="hero-motto-words">
            <span className="motto-line">
              {motto.words.map((word, i) => (
                <span key={i}>
                  <span className="motto-word" style={{ '--at': ms(WORD_AT[i]) }}>
                    {i === 0 && <span className="motto-quote motto-quote-open">{motto.open}</span>}{word}
                  </span>
                  {i < motto.words.length - 1 ? ' ' : null}
                </span>
              ))}
            </span>
            {' '}
            <span className="motto-word motto-word-last" style={{ '--at': ms(WORD_AT[2]) }}>
              <span className="motto-brand">{motto.brand}</span><span className="motto-quote">{motto.close}</span>
            </span>
          </span>
          <span className="hero-motto-line">
            {motto.lines.map((line, l) => {
              const start = motto.lines.slice(0, l).join('').length;
              return (
                <span key={line} className="hero-motto-line-row">
                  {[...line].map((key, k) => {
                    const i = start + k;
                    return <span key={i} className="motto-key" style={{ '--d': ms(times[i]), '--w': ms((times[i + 1] ?? times[i]) - times[i]) }}>{key}</span>;
                  })}
                </span>
              );
            })}
          </span>
        </span>
      </p>
      <span className="motto-chip motto-chip-answer" aria-hidden="true">
        <span className="motto-chip-tile"><MessageSquareText size={18} strokeWidth={2} /></span>
        <span><strong>{motto.chips[0].title}</strong><small>{motto.chips[0].text}</small></span>
      </span>
      <span className="motto-chip motto-chip-bundle" aria-hidden="true">
        <span className="motto-chip-tile is-copper"><Package size={18} strokeWidth={2} /></span>
        <span><strong>{motto.chips[1].title}</strong><small>{motto.chips[1].text}</small></span>
      </span>
      <Gated id="G11_attribution" block className="hero-motto-source">
        <p>{motto.attribution} <a href="#lessons" onClick={onSectionClick('lessons')}>{motto.toPassage}</a></p>
      </Gated>
    </div>
  );
};
