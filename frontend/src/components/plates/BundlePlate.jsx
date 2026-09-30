import { Sheet, T, r2 } from '@/components/plates/drawing';
import { MATTER } from '@/content/records';
import { BUNDLE, bundleRows } from '@/content/matter/research';
import '@/components/plates/plates.css';

// Plate 4: the bundle for the sample matter, as Chapter III creates it. Elevations of the bound
// bundle (spine and front cover, third angle) with its six divider tabs on the fore-edge, and
// beside it the first page of the index, each row set level with its tab. Drawn on ink.

const ITEMS = ['EV-0131', 'EV-0138', 'EV-0139', 'EV-0144', 'EV-0147', 'EV-0151'];
const ROWS = bundleRows(ITEMS);
const ISSUE = ITEMS.indexOf('EV-0151');
const BUNDLE_DATE = BUNDLE.fields.find((f) => f.key === 'date').value;

const F = 21; // annotation: 10.3 px at 353 px wide
const F_TITLE = 27;
const CW = F * 0.6; // Plex Mono advance
const CAP = F * 0.35; // half the cap height, to centre a line of figures on a level
const FINE = { strokeWidth: 0.75 }; // secondary object lines
const S = 0.9; // viewBox units per millimetre

// The bundle, in millimetres: boards 303 x 216, spine 40, tabs standing 20 proud of the boards.
const BH = 303 * S;
const BW = 216 * S;
const BT = 40 * S;
const TP = 20 * S;
const JOINT = 9 * S; // the hinge groove, from the spine edge of the front board
const LABEL_H = 196; // the spine label

// Six tabs share the fore-edge from 10 mm below the head to 10 mm above the tail.
const PITCH = (283 * S) / 6;

// One datum carries the dimension lines and the index's top rule, and the dimension figures and
// the index caption sit on it alike. The heads take one row's depth; their lower rule is level
// with the first tab's slot.
const Y_TEXT = 52;
const Y_DATUM = Y_TEXT + 4;
const T0 = Y_DATUM + PITCH;
const YH = T0 - 10 * S; // head
const YT = YH + BH; // tail
const tabTop = (i) => T0 + i * PITCH + 1.2;
const tabBot = (i) => T0 + (i + 1) * PITCH - 1.2;

const GAP = 18; // between the views, and between the tabs and the index
const XS = 69; // spine view
const XF = XS + BT + GAP; // front view, spine edge
const XE = XF + BW; // fore-edge
const ML = XS - 22 - F * 0.7; // left margin, at the ink of the height figure

// The index: item, exhibit and date, each row level with its tab.
const XI = XE + TP + GAP;
const COL = [XI, XI + 4 * CW + 16, XI + 11 * CW + 32];
const XR = COL[2] + 13 * CW;

// The title strip.
const Y_STRIP = YT + 18;

const tabPath = (i) => {
  const t = tabTop(i);
  const b = tabBot(i);
  const r = 3.5;
  return `M${r2(XE)} ${r2(t)}H${r2(XE + TP - r)}A${r} ${r} 0 0 1 ${r2(XE + TP)} ${r2(t + r)}V${r2(b - r)}A${r} ${r} 0 0 1 ${r2(XE + TP - r)} ${r2(b)}H${r2(XE)}`;
};

const listed = ROWS.map((row) => `${row.ev} of ${row.date}`);
const issue = ROWS[ISSUE];
const LABEL =
  `Illustrative drawing: the bundle for the fictional sample matter ${MATTER.reference}, ${MATTER.title}, dated ${BUNDLE_DATE}. ` +
  `The bound bundle is drawn in spine and front elevation, 303 by 216 millimetres with a 40 millimetre spine labelled ${MATTER.reference}, ` +
  `and six divider tabs stand on its fore-edge. Beside it, the first page of the index sets each item level with its tab: Tab 1, items ${ROWS[0].item} to ${ROWS[ROWS.length - 1].item}, ` +
  `${listed.slice(0, -1).join(', ')} and ${listed[listed.length - 1]}. ` +
  `The tab for ${issue.ev}, the ${issue.description.charAt(0).toLowerCase()}${issue.description.slice(1)}, is picked out.`;

export const BundlePlate = ({ label = LABEL }) => (
  <Sheet viewBox="0 0 720 480" label={label} sheet={false}>
    {/* Spine elevation, its label reading from head to tail. */}
    <rect x={r2(XS)} y={r2(YH)} width={r2(BT)} height={r2(BH)} className="dw-line" />
    <rect x={r2(XS + 6)} y={r2(YH + (BH - LABEL_H) / 2)} width={r2(BT - 12)} height={LABEL_H} className="dw-line" style={FINE} />
    <T x={XS + BT / 2 - CAP} y={YH + BH / 2} size={F} anchor="middle" rotate={90} className="dw-t-strong">
      {MATTER.reference}
    </T>

    {/* Front elevation: the tabs standing proud of the fore-edge, the boards and the joint. */}
    <path d={`${tabPath(ISSUE)}Z`} className="dw-fill-issue" />
    <path d={ROWS.map((_, i) => (i === ISSUE ? '' : tabPath(i))).join('')} className="dw-line" />
    <rect x={r2(XF)} y={r2(YH)} width={r2(BW)} height={r2(BH)} className="dw-line" />
    <path d={`M${r2(XF + JOINT)} ${r2(YH)}V${r2(YT)}`} className="dw-line" style={FINE} />

    {/* The first page of the index. */}
    <T x={XI} y={Y_TEXT} size={F}>
      Index
    </T>
    <T x={XR} y={Y_TEXT} size={F} anchor="end">
      Tab 1
    </T>
    <path d={`M${r2(XI)} ${r2(Y_DATUM)}H${r2(XR)}M${r2(XI)} ${r2(T0)}H${r2(XR)}`} className="dw-line" />
    {['Item', 'Exhibit', 'Date'].map((h, c) => (
      <T key={h} x={COL[c]} y={(Y_DATUM + T0) / 2 + CAP} size={F}>
        {h}
      </T>
    ))}
    <path d={ROWS.map((_, i) => `M${r2(XI)} ${r2(T0 + (i + 1) * PITCH)}H${r2(XR)}`).join('')} className="dw-thin" />
    {ROWS.map((row, i) => {
      const y = (tabTop(i) + tabBot(i)) / 2 + CAP;
      return (
        <g key={row.ev}>
          <T x={COL[0]} y={y} size={F}>
            {row.item}
          </T>
          <T x={COL[1]} y={y} size={F} className="dw-t-strong">
            {row.ev}
          </T>
          <T x={COL[2]} y={y} size={F}>
            {row.date}
          </T>
        </g>
      );
    })}

    {/* Title strip. */}
    <path d={`M${r2(ML)} ${r2(Y_STRIP)}H${r2(XR)}`} className="dw-thin" />
    <T x={ML} y={Y_STRIP + 32} size={F_TITLE} className="dw-t-title">
      Bundle, {MATTER.reference}
    </T>
    <T x={XR} y={Y_STRIP + 32} size={F} anchor="end">
      {BUNDLE_DATE}
    </T>
    <T x={ML} y={Y_STRIP + 62} size={F}>
      {MATTER.title}
    </T>
  </Sheet>
);
