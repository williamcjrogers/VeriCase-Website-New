import { COVER } from '@/content/home';
import { Gated } from '@/components/editorial/Gated';

const { motto } = COVER;

// The motto's timeline, in milliseconds from the moment the fonts are ready (the owner's
// direction, 06 October 2026): "Records,", a two-second pause, "records,", four seconds in which a
// third "records" is expected, "VeriCase.", a second's pause, and then the line typed patiently
// beneath it. Each word takes WORD_MS to settle; each pause runs from one word settling to the
// next beginning. The motion is CSS (clarity.css), so the prerendered page plays it at once.
export const LEAD_MS = 400;
export const WORD_MS = 600;
export const PAUSES_MS = [2000, 4000, 1000];
export const WORD_AT = [
  LEAD_MS,
  LEAD_MS + WORD_MS + PAUSES_MS[0],
  LEAD_MS + 2 * WORD_MS + PAUSES_MS[0] + PAUSES_MS[1],
];
export const TYPE_FROM = WORD_AT[2] + WORD_MS + PAUSES_MS[2];

// Patient typing: an unhurried key, a little longer after each space and longer again before the
// last word, with a fixed, slight unevenness so that it reads as a hand rather than a machine. The
// times are fixed, so the prerendered page and the app agree.
const KEY_MS = 125;
const UNEVEN_MS = [0, 30, -15, 40, -10, 15, 50, -20];
const AFTER_SPACE_MS = 120;
const BEFORE_LAST_WORD_MS = 300;

export const keyTimes = (text, from = TYPE_FROM) => {
  const lastSpace = text.lastIndexOf(' ');
  const times = [];
  let t = from;
  for (let i = 0; i < text.length; i += 1) {
    times.push(t);
    t += KEY_MS + UNEVEN_MS[i % UNEVEN_MS.length];
    if (text[i] === ' ') t += AFTER_SPACE_MS;
    if (i === lastSpace) t += BEFORE_LAST_WORD_MS;
  }
  return times;
};

const ms = (n) => `${n}ms`;

// The motto opposite the kicker, with its source beneath. Assistive technology reads the whole
// motto once; the copy that plays is hidden from it, and every word and letter of that copy holds
// its place from the start, so nothing around it moves.
export const HeroMotto = () => {
  const times = keyTimes(motto.line);
  const typedEnd = times[times.length - 1];
  return (
    <div className="hero-motto" style={{ '--caret-from': ms(WORD_AT[2] + WORD_MS), '--typed-end': ms(typedEnd) }}>
      <p className="hero-motto-text font-display">
        <span className="sr-only">{motto.whole}</span>
        <span className="hero-motto-visual" aria-hidden="true">
          <span className="hero-motto-words">
            {motto.words.map((word, i) => (
              <span key={word}>
                <span className="motto-word" style={{ '--at': ms(WORD_AT[i]) }}>{word}</span>{' '}
              </span>
            ))}
            <span className="motto-word motto-brand" style={{ '--at': ms(WORD_AT[2]) }}>{motto.brand}</span>
          </span>
          <span className="hero-motto-line">
            {[...motto.line].map((key, i) => (
              <span key={i} className="motto-key" style={{ '--d': ms(times[i]), '--w': ms((times[i + 1] ?? times[i]) - times[i]) }}>{key}</span>
            ))}
          </span>
        </span>
      </p>
      <Gated id="G11_attribution" block className="hero-motto-source">
        <p>{motto.attribution} “{motto.quote}”.</p>
        <p className="hero-motto-cite"><cite>{motto.source}</cite> {motto.sourceNote}</p>
      </Gated>
    </div>
  );
};
