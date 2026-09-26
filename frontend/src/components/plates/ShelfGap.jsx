import { Sheet, T, TitleBlock, Leader, r2 } from '@/components/plates/drawing';
import '@/components/plates/plates.css';

// The 404 plate: an elevation of one bay of archive shelving, measured as found. Seven box files
// for the sample matter should stand on the shelf, one a month; Box 16 is not there. Its outline is
// drawn where it should stand (the one element in issue), and the dimension string closes across
// the gap. The shelf is drawn in millimetres at K sheet units a millimetre.

const W = 600;
const H = 400;
const S = 17; // 10.1 px at the narrowest frame (358 px wide)
const K = 0.6;

// Millimetres.
const UPRIGHT = 30;
const CLEAR = 565; // between the uprights
const BOX_W = 75;
const BOX_H = 380;
const PITCH = 80; // 5 millimetres between boxes
const LIP = 40;

const BOXES = [
  { n: '13', month: 'December 2024' },
  { n: '14', month: 'January 2025' },
  { n: '15', month: 'February 2025' },
  { n: '16', missing: true },
  { n: '17', month: 'April 2025' },
  { n: '18', month: 'May 2025' },
  { n: '19', month: 'June 2025' },
];

// Placement on the sheet.
const X0 = 16; // outer face of the left upright
const TOP = 76; // tops of the boxes
const IN_L = X0 + UPRIGHT * K; // inner faces of the uprights
const IN_R = IN_L + CLEAR * K;
const SHELF = TOP + BOX_H * K; // top of the shelf
const LIP_B = SHELF + LIP * K;
const UP_T = 40; // the uprights run on beyond the view, cut by break lines
const UP_B = LIP_B + 12;

const boxX = (i) => IN_L + (5 + i * PITCH) * K;

// A break line across a member: a straight run with one zigzag at its middle.
const breakH = (x1, x2, y, z = 4) => {
  const m = (x1 + x2) / 2;
  return `M${r2(x1)} ${r2(y)}L${r2(m - z)} ${r2(y)}L${r2(m - z / 2)} ${r2(y - z * 1.6)}L${r2(m + z / 2)} ${r2(y + z * 1.6)}L${r2(m + z)} ${r2(y)}L${r2(x2)} ${r2(y)}`;
};

// Slots punched up the face of an upright, 6 by 12 millimetres at a 25 millimetre pitch.
const slots = (x) => {
  const cx = x + (UPRIGHT * K) / 2;
  const w = 6 * K;
  const h = 12 * K;
  let d = '';
  for (let y = UP_T + 9; y + h < UP_B - 8; y += 25 * K) {
    d += `M${r2(cx - w / 2)} ${r2(y)}H${r2(cx + w / 2)}V${r2(y + h)}H${r2(cx - w / 2)}Z`;
  }
  return d;
};

const tick = (x, y, s = 5) => `M${r2(x - s)} ${r2(y + s)}L${r2(x + s)} ${r2(y - s)}`;

export const ShelfGap = ({
  label = 'Illustrative drawing: an elevation of a bay of archive shelving holding the box files for the fictional sample matter, Boxes 13 to 19, one a month from December 2024 to June 2025. Box 16 is not on the shelf: a dashed outline marks where it should stand, the gap is dimensioned at 85 millimetres, and the title block records the shelf as found.',
}) => {
  // Boxes: outlines, label panels, dividers and finger holes, gathered into a few paths.
  let outlines = '';
  let panels = '';
  let holes = '';
  const texts = [];
  const PANEL_T = TOP + 8;
  const PANEL_H = 182;
  BOXES.forEach((b, i) => {
    const x = boxX(i);
    const w = BOX_W * K;
    const cx = x + w / 2;
    if (b.missing) return;
    outlines += `M${r2(x)} ${r2(TOP)}H${r2(x + w)}V${r2(SHELF)}H${r2(x)}Z`;
    const px = x + 6;
    const pw = w - 12;
    panels += `M${r2(px)} ${r2(PANEL_T)}H${r2(px + pw)}V${r2(PANEL_T + PANEL_H)}H${r2(px)}ZM${r2(px)} ${r2(PANEL_T + 26)}H${r2(px + pw)}`;
    const hy = SHELF - 19;
    holes += `M${r2(cx - 7.5)} ${r2(hy)}A7.5 7.5 0 1 0 ${r2(cx + 7.5)} ${r2(hy)}A7.5 7.5 0 1 0 ${r2(cx - 7.5)} ${r2(hy)}Z`;
    holes += `M${r2(cx - 5)} ${r2(hy)}A5 5 0 1 0 ${r2(cx + 5)} ${r2(hy)}A5 5 0 1 0 ${r2(cx - 5)} ${r2(hy)}Z`;
    texts.push({ key: `n${b.n}`, x: cx, y: PANEL_T + 18.5, text: b.n, anchor: 'middle', className: 'dw-t-strong' });
    texts.push({ key: `m${b.n}`, x: cx + 4.25, y: PANEL_T + PANEL_H - 5, text: b.month, rotate: -90 });
  });

  // The missing box: its outline where it should stand.
  const gi = BOXES.findIndex((b) => b.missing);
  const gx = boxX(gi);
  const gw = BOX_W * K;
  const gc = gx + gw / 2;

  // Uprights and the shelf lip.
  const upL = X0;
  const upR = IN_R;
  const uw = UPRIGHT * K;
  const uprights = `M${r2(upL)} ${r2(UP_T)}V${r2(UP_B)}M${r2(upL + uw)} ${r2(UP_T)}V${r2(UP_B)}M${r2(upR)} ${r2(UP_T)}V${r2(UP_B)}M${r2(upR + uw)} ${r2(UP_T)}V${r2(UP_B)}`;
  const breaks = breakH(upL - 4, upL + uw + 4, UP_T) + breakH(upL - 4, upL + uw + 4, UP_B) + breakH(upR - 4, upR + uw + 4, UP_T) + breakH(upR - 4, upR + uw + 4, UP_B);

  // The dimension string across the bay, closing on the uprights: 240, 85, 240.
  const DIM_Y = TOP - 20;
  const stops = [IN_L, boxX(gi - 1) + gw, boxX(gi + 1), IN_R];
  let dim = `M${r2(stops[0])} ${r2(DIM_Y)}L${r2(stops[3])} ${r2(DIM_Y)}`;
  stops.forEach((x) => {
    dim += tick(x, DIM_Y);
  });
  [stops[1], stops[2]].forEach((x) => {
    dim += `M${r2(x)} ${r2(TOP - 2)}L${r2(x)} ${r2(DIM_Y - 3)}`;
  });
  const dimText = [
    [(stops[0] + stops[1]) / 2, '240'],
    [(stops[1] + stops[2]) / 2, '85'],
    [(stops[2] + stops[3]) / 2, '240'],
  ];

  // The title block stands beside the bay, from the tops of the boxes to the foot of the lip.
  const TB_X = upR + uw + 16;
  return (
    <Sheet viewBox={`0 0 ${W} ${H}`} label={label}>
      {/* Uprights, slotted, cut above and below the view */}
      <path d={uprights} className="dw-line" />
      <path d={slots(upL) + slots(upR)} className="dw-thin" />
      <path d={breaks} className="dw-thin" />

      {/* The shelf: its lip, carrying the matter reference */}
      <path d={`M${r2(IN_L)} ${r2(SHELF)}H${r2(IN_R)}V${r2(LIP_B)}H${r2(IN_L)}Z`} className="dw-line" />
      <T x={(IN_L + boxX(gi - 1) + gw) / 2} y={SHELF + (LIP * K) / 2 + 5.9} size={S} anchor="middle">
        VC-SAMPLE-01
      </T>

      {/* Box files */}
      <path d={outlines} className="dw-line" />
      <path d={panels} className="dw-thin" />
      <path d={holes} className="dw-thin" />
      {texts.map((t) => (
        <T key={t.key} x={t.x} y={t.y} size={S} anchor={t.anchor} rotate={t.rotate} className={t.className}>
          {t.text}
        </T>
      ))}

      {/* Box 16, where it should stand: three sides, on the shelf */}
      <path d={`M${r2(gx)} ${r2(SHELF)}V${r2(TOP)}H${r2(gx + gw)}V${r2(SHELF)}`} className="dw-hidden dw-issue" />

      {/* Dimensions */}
      <path d={dim} className="dw-dim" />
      {dimText.map(([x, t]) => (
        <T key={`${x}`} x={x} y={DIM_Y - 4} size={S} anchor="middle" className="dw-t-dim">
          {t}
        </T>
      ))}

      {/* The note */}
      <Leader
        points={[
          [gc, LIP_B],
          [gc, LIP_B + 32],
          [gc + 12, LIP_B + 32],
        ]}
        text="Box 16: not on the shelf"
        size={S}
        dy={S * 0.34}
      />

      <TitleBlock
        x={TB_X}
        y={TOP}
        w={W - 16 - TB_X}
        size={S}
        labelSize={S}
        pad={10}
        rows={[
          { label: 'Drawing', value: 'Archive shelf', title: true, h: LIP_B - TOP - 3 * 62 },
          { label: 'Contents', value: 'Boxes 13 to 19', h: 62 },
          { label: 'Status', value: 'As found', h: 62 },
          { label: 'Scale', value: '1:10', h: 62 },
        ]}
      />
    </Sheet>
  );
};
