import { Sheet, T, r2 } from '@/components/plates/drawing';
import '@/components/plates/plates.css';

// Plate 4: a measured valuation of the Change in the sample matter (bracket type B in place of
// type A, Levels 3 to 6, instructed on 03 March 2025, EV-0131), ruled the way a quantity surveyor
// rules a schedule by hand, then checked: a brass tick beside each extension and the total ringed.
// The type B supply line is the element in issue. Every extension and the total are exact.

const W = 400;
const H = 500;
const S = 13.5; // 10 px at the narrowest frame (299 px wide)
const P = 19; // line pitch

// Column rules (left edges) and text anchors, in sheet units. The browser snaps glyphs to whole
// pixels, so a mono advance renders at 0.88 to 1.11 of its nominal 0.6 em as the plate's width
// changes; every column keeps 3 units clear of its rules at the widest (9 units a character).
const C = { left: 10, desc: 48, qty: 180, unit: 213, rate: 253, amount: 304, right: 390 };
const A = { item: 28, desc: 51, qty: 210, unit: 233, rate: 301, amount: 370 };
const CH = 8.47; // the hanging bracket of a negative amount, at its usual width

const ITEMS = [
  { n: '1', desc: ['Bracket type B', '(stainless)'], qty: '480', rate: '34.60', amount: '£16,608', issue: true },
  { n: '2', desc: ['Omit type A', '(aluminium)'], qty: '480', rate: '14.40', amount: '£6,912', omit: true },
  { n: '3', desc: ['Thermal', 'isolator pads'], qty: '480', rate: '1.85', amount: '£888' },
  { n: '4', desc: ['Anchors to', 'slab edge'], qty: '960', rate: '2.35', amount: '£2,256' },
  { n: '5', desc: ['Fixing, extra', 'over type A'], qty: '480', rate: '4.75', amount: '£2,280' },
];
const TOTAL = '£15,120';

// A checker's tick: a short stroke down, a long stroke up, beside a figure on baseline b.
const tick = (x, b) => `M${r2(x)} ${r2(b - 4)}L${r2(x + 2.6)} ${r2(b - 0.8)}L${r2(x + 8.2)} ${r2(b - 8.8)}`;

// An ellipse as a path, so that the ring can be one stroke.
const ring = (cx, cy, rx, ry) => `M${r2(cx - rx)} ${r2(cy)}A${r2(rx)} ${r2(ry)} 0 1 0 ${r2(cx + rx)} ${r2(cy)}A${r2(rx)} ${r2(ry)} 0 1 0 ${r2(cx - rx)} ${r2(cy)}Z`;

export const Valuation = ({
  label = 'Illustrative drawing: a valuation of the Change to bracket type B, Levels 3 to 6, in the fictional sample matter, ruled by hand as a schedule. Five items are priced by quantity, unit and rate: stainless brackets type B, the omission of aluminium brackets type A shown in brackets, thermal isolator pads, anchors, and extra labour to fix, for a total of £15,120. Each amount carries a checking tick and the total is ringed.',
}) => {
  // Vertical rhythm: text starts 21 units below a rule and stops 12 units above the next one.
  const HEAD_TOP = 24;
  const TITLE_B = HEAD_TOP + 25;
  const SUB_B = TITLE_B + 20;
  const HEAD_FOOT = SUB_B + 12;
  const TABLE_TOP = HEAD_FOOT + 2.5;
  const HEADER_B = TABLE_TOP + 21;
  const HEADER_FOOT = HEADER_B + 8;
  const first = HEADER_FOOT + 21;
  const rows = ITEMS.map((it, k) => ({ ...it, b1: first + k * 3 * P, b2: first + k * 3 * P + P }));
  const lastLine = rows[rows.length - 1].b2;
  const TABLE_FOOT = lastLine + 12;
  const TOTAL_B = TABLE_FOOT + 22;
  const NOTE_B = TOTAL_B + 38;

  // Column rules run from the header rule to the foot of the table; the header row is unboxed.
  let rules = '';
  [C.desc, C.qty, C.unit, C.rate, C.amount].forEach((x) => {
    rules += `M${x} ${HEADER_FOOT}V${TABLE_FOOT}`;
  });
  rules += `M${C.left} ${HEADER_FOOT}H${C.right}M${C.left} ${TABLE_FOOT}H${C.right}`;

  // Each tick sits just after its figure; after the closing bracket of the omission.
  let ticks = '';
  rows.forEach((row) => {
    ticks += tick(A.amount + (row.omit ? CH : 0) + 3.5, row.b2);
  });

  const text = (row) => (row.issue ? 'dw-t-issue' : 'dw-t-strong');

  return (
    <Sheet viewBox={`0 0 ${W} ${H}`} label={label}>
      {/* Head */}
      <path d={`M${C.left} ${HEAD_TOP}H${C.right}M${C.left} ${HEAD_FOOT}H${C.right}M${C.left} ${TABLE_TOP}H${C.right}`} className="dw-line" />
      <T x={C.left} y={TITLE_B} size={18} className="dw-t-title">
        Valuation of the Change: bracket type B
      </T>
      <T x={C.left} y={SUB_B} size={S}>
        Sample matter (fictional), VC-SAMPLE-01
      </T>

      {/* Table */}
      <path d={rules} className="dw-thin" />
      <T x={A.item} y={HEADER_B} size={S} anchor="middle">
        Item
      </T>
      <T x={A.desc} y={HEADER_B} size={S}>
        Description
      </T>
      <T x={A.qty} y={HEADER_B} size={S} anchor="end">
        Qty
      </T>
      <T x={A.unit} y={HEADER_B} size={S} anchor="middle">
        Unit
      </T>
      <T x={A.rate} y={HEADER_B} size={S} anchor="end">
        Rate
      </T>
      <T x={A.amount} y={HEADER_B} size={S} anchor="end">
        Amount
      </T>

      {rows.map((row) => (
        <g key={row.n}>
          <T x={A.item} y={row.b1} size={S} anchor="middle">
            {row.n}
          </T>
          <T x={A.desc} y={row.b1} size={S} className={text(row)}>
            {row.desc[0]}
          </T>
          <T x={A.desc} y={row.b2} size={S} className={text(row)}>
            {row.desc[1]}
          </T>
          <T x={A.qty} y={row.b2} size={S} anchor="end" className={text(row)}>
            {row.qty}
          </T>
          <T x={A.unit} y={row.b2} size={S} anchor="middle" className={text(row)}>
            nr
          </T>
          <T x={A.rate} y={row.b2} size={S} anchor="end" className={text(row)}>
            {row.rate}
          </T>
          <T x={A.amount} y={row.b2} size={S} anchor="end" className={text(row)}>
            {row.omit ? `(${row.amount}` : row.amount}
          </T>
          {row.omit && (
            <T x={A.amount + 0.3} y={row.b2} size={S} className={text(row)}>
              )
            </T>
          )}
        </g>
      ))}

      {/* Total, ringed by the checker */}
      <T x={A.desc} y={TOTAL_B} size={S} className="dw-t-strong">
        Total
      </T>
      <T x={A.amount} y={TOTAL_B} size={S} anchor="end" className="dw-t-strong">
        {TOTAL}
      </T>
      <path d={ticks} className="dw-rev" />
      <path d={ring(A.amount - 28.35, TOTAL_B - 4.7, 42, 12.5)} className="dw-rev" />

      {/* Foot */}
      <T x={C.left} y={NOTE_B} size={S}>
        Levels 3 to 6, as instructed on
      </T>
      <T x={C.left} y={NOTE_B + P} size={S}>
        03 March 2025 (EV-0131)
      </T>
    </Sheet>
  );
};
