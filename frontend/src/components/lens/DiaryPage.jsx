// Stand-in for the EV-0144 scan (HF-09 is not yet approved): a ruled site-diary page on a
// scanner bed, with loose ballpoint strokes that read as handwriting but spell nothing, and a
// pencil sketch of an L-shaped bracket in the margin. The strokes come from a fixed seed, so the
// prerendered and hydrated markup are identical.

const LINE_GAP = 8.2;
const FIRST_LINE = 36;
const WRITTEN = [0.92, 0.78, 0.97, 0.64, 0.88, 0.95, 0.52, 0.8, 0.34];

// A small deterministic generator (a linear congruential sequence) for the stroke variation.
const seeded = (seed) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const f = (n) => n.toFixed(1);

// One line of cursive-like humps and loops along a baseline, broken into words.
function scribble(y, start, end, rand) {
  let x = start + rand() * 2;
  let d = '';
  while (x < end - 4) {
    const letters = 2 + Math.floor(rand() * 5);
    d += `M${f(x)} ${f(y)}`;
    for (let i = 0; i < letters && x < end; i += 1) {
      const w = 1.9 + rand() * 1.4;
      const tall = rand() > 0.82;
      const drop = !tall && rand() > 0.9;
      const h = tall ? 4.8 + rand() * 1.2 : 2.1 + rand() * 0.9;
      const lean = 0.5 + rand() * 0.5;
      d += `q${f(lean)} ${f(-h * 1.1)} ${f(w * 0.55)} ${f(-h)}q${f(w * 0.3)} ${f(h * 0.2)} ${f(w * 0.45)} ${f(h)}`;
      if (drop) d += `q${f(0.4)} ${f(3.2)} ${f(-0.9)} ${f(2.4)}q${f(0.4)} ${f(-1.6)} ${f(1.1)} ${f(-2.4)}`;
      x += w;
    }
    x += 2.6 + rand() * 2.2;
  }
  return d;
}

const rand = seeded(20250321);
const LINES = WRITTEN.map((share, i) => {
  const y = FIRST_LINE + i * LINE_GAP - 1.2;
  const end = 25 + share * 80;
  return { y, end, d: scribble(y, 25, end, rand) };
});
const DATE_MARK = scribble(18.4, 85, 105, seeded(2103));
const RULES = Array.from({ length: 14 }, (_, i) => FIRST_LINE + i * LINE_GAP);

export const DiaryPage = () => (
  <svg viewBox="0 0 120 160" className="diary" focusable="false" aria-hidden="true">
    <rect width="120" height="160" className="diary-bed" />
    <g transform="rotate(-0.8 60 80)">
      <rect x="6" y="5" width="108" height="150" className="diary-page" />
      <rect x="82" y="11" width="26" height="10" className="diary-box" />
      <path d={RULES.map((y) => `M12 ${f(y)}H108`).join('')} className="diary-rules" />
      <path d="M21 28V151" className="diary-margin" />
      <g className="diary-ocr">
        {LINES.map((l) => (
          <rect key={l.y} x="23.5" y={f(l.y - 6.2)} width={f(l.end - 22)} height="7.4" />
        ))}
      </g>
      <path d={LINES.map((l) => l.d).join('') + DATE_MARK} className="diary-ink" />
      <path d="M30 116v22h15M33 116v19h12M45 135v3M38.5 129.5a1.4 1.4 0 1 0 0.1 0M27 142h21" className="diary-pencil" />
    </g>
  </svg>
);
