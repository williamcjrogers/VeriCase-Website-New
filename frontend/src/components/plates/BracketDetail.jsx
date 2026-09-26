import { Batt, Concrete, DimH, DimV, Hatch, Leader, Level, RevCloud, RevTriangle, Sheet, T, TitleBlock, r2 } from '@/components/plates/drawing';
import '@/components/plates/plates.css';

// Plate 1: detail 7 of the sample matter's façade drawings, a section at the slab edge through
// bracket type B, the element the instruction of 03 March 2025 (EV-0131) changed. The object is
// drawn once in millimetres (origin at the slab edge, at structural slab level; y runs down) and
// placed at a scale in each composition: the full sheet from 1024 px, the same sheet with fewer,
// larger notes from 768 px, and a portrait sheet with numbered item balloons on phones.

const DEFAULT_LABEL =
  'Illustrative drawing: a section through the slab edge of a residential frame, showing bracket type B, a stainless steel bracket fixed to the slab edge through the insulation to carry the rail and the rainscreen panel, with the bracket clouded as revision B.';

// Extents of the drawn region, in millimetres.
const X_MIN = -380;
const X_MAX = 245;
const Y_MIN = -150;
const Y_MAX = 370;

// The layers, outward from the slab edge (x = 0).
const INS = 150; // mineral wool insulation
const RAIL_WEB = [172, 222]; // T-rail web, beyond the cut
const FLANGE = [222, 225]; // T-rail flange, cut
const PANEL = [225, 237]; // rainscreen panel
const JOINT = [262, 270]; // open horizontal joint in the panel
const SFS = [-130, -115, -15, 0]; // plasterboard, stud zone, sheathing, slab edge
const SLAB = 250;

// The bracket: a wall plate on an isolator pad, and a projecting leg seen in elevation.
const PAD = { x: 0, w: 10, y: 45, h: 170 };
const PLATE = { x: 10, w: 5, y: 50, h: 160 };
const LEG = [
  [15, 50],
  [205, 50],
  [205, 115],
  [15, 210],
];
const ANCHORS = [85, 175];
const FIXINGS = [
  [188, 66],
  [188, 98],
];
const BARRIER = { x: 150, w: 45, strip: 4, y: 255, h: 30 };

// Maps millimetres to sheet units for a view placed with its slab-edge origin at (ox, oy).
const mapper = (ox, oy, k) => ({
  x: (mm) => ox + mm * k,
  y: (mm) => oy + mm * k,
  s: (mm) => mm * k,
});

// Break line: a straight run with one zigzag at its middle, across the cut end of a layer.
const breakH = (x1, x2, y, z = 7, at = (x1 + x2) / 2) => {
  const m = at;
  return `M${r2(x1)} ${r2(y)}L${r2(m - z)} ${r2(y)}L${r2(m - z / 2)} ${r2(y - z * 1.6)}L${r2(m + z / 2)} ${r2(y + z * 1.6)}L${r2(m + z)} ${r2(y)}L${r2(x2)} ${r2(y)}`;
};
const breakV = (x, y1, y2, z = 7) => {
  const m = (y1 + y2) / 2;
  return `M${r2(x)} ${r2(y1)}L${r2(x)} ${r2(m - z)}L${r2(x + z * 1.6)} ${r2(m - z / 2)}L${r2(x - z * 1.6)} ${r2(m + z / 2)}L${r2(x)} ${r2(m + z)}L${r2(x)} ${r2(y2)}`;
};

// The object itself, in the given mapping. Returns only linework; notes are placed per sheet.
const Section = ({ m }) => {
  const { x, y, s } = m;
  const box = (x1, y1, x2, y2) => [x(x1), y(y1), s(x2 - x1), s(y2 - y1)];
  const rect = (x1, y1, x2, y2, className) => <rect x={r2(x(x1))} y={r2(y(y1))} width={r2(s(x2 - x1))} height={r2(s(y2 - y1))} className={className} />;
  const legPath = `M${LEG.map(([px, py]) => `${r2(x(px))} ${r2(y(py))}`).join('L')}Z`;
  const slabPath = `M${r2(x(X_MIN))} ${r2(y(0))}L${r2(x(0))} ${r2(y(0))}L${r2(x(0))} ${r2(y(SLAB))}L${r2(x(X_MIN))} ${r2(y(SLAB))}`;
  return (
    <g>
      {/* SFS infill wall above and below the slab: plasterboard, studs with insulation, sheathing. */}
      {[
        [Y_MIN, 0],
        [SLAB, Y_MAX],
      ].map(([a, b]) => (
        <g key={a}>
          <Batt box={box(SFS[1] + 12, a, SFS[2] - 12, b)} pitch={s(34)} />
          {rect(SFS[0], a, SFS[1], b, 'dw-fill-paper')}
          {rect(SFS[0], a, SFS[1], b, 'dw-line')}
          {rect(SFS[2], a, SFS[3], b, 'dw-line')}
          <path d={`M${r2(x(SFS[1]))} ${r2(y(a))}L${r2(x(SFS[1]))} ${r2(y(b))}`} className="dw-thin" />
        </g>
      ))}

      {/* The slab, cut, with its broken end. */}
      <Concrete box={box(X_MIN, 0, 0, SLAB)} seed={11} density={0.012 / (s(1) * s(1))} />
      <path d={slabPath} className="dw-cut" />
      <path d={breakV(x(X_MIN), y(-8), y(SLAB + 8), s(10))} className="dw-thin" />

      {/* External insulation, full height, and the open-state cavity barrier at the slab. */}
      <Batt box={box(0, Y_MIN, INS, Y_MAX)} pitch={s(38)} />
      <path d={`M${r2(x(INS))} ${r2(y(Y_MIN))}L${r2(x(INS))} ${r2(y(Y_MAX))}`} className="dw-line" />
      {rect(BARRIER.x, BARRIER.y, BARRIER.x + BARRIER.w, BARRIER.y + BARRIER.h, 'dw-fill-paper')}
      <Batt box={box(BARRIER.x, BARRIER.y, BARRIER.x + BARRIER.w, BARRIER.y + BARRIER.h)} pitch={s(12)} vertical={false} />
      {rect(BARRIER.x, BARRIER.y, BARRIER.x + BARRIER.w, BARRIER.y + BARRIER.h, 'dw-line')}
      {rect(BARRIER.x + BARRIER.w, BARRIER.y, BARRIER.x + BARRIER.w + BARRIER.strip, BARRIER.y + BARRIER.h, 'dw-fill-line')}

      {/* The rail: web beyond the cut (hidden), flange cut; then the panel with its open joint. */}
      <path d={`M${r2(x(RAIL_WEB[0]))} ${r2(y(Y_MIN))}L${r2(x(RAIL_WEB[0]))} ${r2(y(Y_MAX))}`} className="dw-hidden" />
      {rect(FLANGE[0], Y_MIN, FLANGE[1], Y_MAX, 'dw-fill-line')}
      {rect(PANEL[0], Y_MIN, PANEL[1], JOINT[0], 'dw-line')}
      {rect(PANEL[0], JOINT[1], PANEL[1], Y_MAX, 'dw-line')}
      <Hatch box={box(PANEL[0], Y_MIN, PANEL[1], JOINT[0])} pitch={s(7)} angle={-45} />
      <Hatch box={box(PANEL[0], JOINT[1], PANEL[1], Y_MAX)} pitch={s(7)} angle={-45} />

      {/* Bracket type B: pad, wall plate and projecting leg, over the insulation. */}
      {rect(PAD.x, PAD.y, PAD.x + PAD.w, PAD.y + PAD.h, 'dw-fill-paper')}
      <Hatch box={box(PAD.x, PAD.y, PAD.x + PAD.w, PAD.y + PAD.h)} pitch={s(4)} angle={90} />
      {rect(PAD.x, PAD.y, PAD.x + PAD.w, PAD.y + PAD.h, 'dw-line')}
      <path d={legPath} className="dw-fill-issue-tint" />
      <path d={legPath} className="dw-line dw-issue" />
      {rect(PLATE.x, PLATE.y, PLATE.x + PLATE.w, PLATE.y + PLATE.h, 'dw-fill-issue')}
      {ANCHORS.map((ay) => (
        <g key={ay}>
          <path d={`M${r2(x(-95))} ${r2(y(ay - 5))}L${r2(x(PAD.x))} ${r2(y(ay - 5))}M${r2(x(-95))} ${r2(y(ay + 5))}L${r2(x(PAD.x))} ${r2(y(ay + 5))}M${r2(x(-95))} ${r2(y(ay - 5))}L${r2(x(-95))} ${r2(y(ay + 5))}`} className="dw-hidden" />
          {rect(PLATE.x + PLATE.w, ay - 9, PLATE.x + PLATE.w + 7, ay + 9, 'dw-fill-line')}
        </g>
      ))}
      {FIXINGS.map(([fx, fy]) => (
        <g key={fy}>
          <circle cx={r2(x(fx))} cy={r2(y(fy))} r={r2(s(5))} className="dw-fill-paper" />
          <circle cx={r2(x(fx))} cy={r2(y(fy))} r={r2(s(5))} className="dw-line" />
          <path d={`M${r2(x(fx - 3.5))} ${r2(y(fy - 3.5))}L${r2(x(fx + 3.5))} ${r2(y(fy + 3.5))}M${r2(x(fx - 3.5))} ${r2(y(fy + 3.5))}L${r2(x(fx + 3.5))} ${r2(y(fy - 3.5))}`} className="dw-line" />
        </g>
      ))}

      {/* The cut ends of the wall build-up, above and below. */}
      <path d={breakH(x(SFS[0]), x(PANEL[1]), y(Y_MIN), s(9), x(-65))} className="dw-thin" />
      <path d={breakH(x(SFS[0]), x(PANEL[1]), y(Y_MAX), s(9), x(-65))} className="dw-thin" />
    </g>
  );
};

// Item notes, keyed so the sheets can place them. `issue` marks the one element in issue.
const NOTES = {
  panel: { at: [231, -100], text: 'Rainscreen panel, 12' },
  insulation: { at: [70, -95], text: 'Mineral wool insulation, 150' },
  rail: { at: [223.5, -40], text: 'Vertical T-rail, aluminium' },
  bracket: { at: [120, 70], text: 'Bracket type B, stainless steel', issue: true },
  fixings: { at: [188, 98], text: 'Screw fixings, bracket to rail' },
  barrier: { at: [172, 270], text: 'Open-state cavity barrier' },
  pad: { at: [5, 190], text: 'Thermal isolator pad' },
  anchor: { at: [-60, 175], text: 'Anchors to slab edge' },
  slab: { at: [-200, 205], text: 'Concrete slab, 250' },
  sfs: { at: [-70, -110], text: 'SFS infill wall' },
};

const REVISIONS = [
  { rev: 'A', date: '14 January 2025', text: ['For construction'] },
  { rev: 'B', date: '05 March 2025', text: ['Bracket type B to Levels 3 to 6,', 'as instructed on 03 March 2025'] },
];

// A leader note: dot at the object, an elbow, then the note (azure for the element in issue).
const Note = ({ m, note, to, elbowX, size, anchor = 'start', lines }) => {
  const [tx, ty] = [m.x(note.at[0]), m.y(note.at[1])];
  const [nx, ny] = to;
  return (
    <Leader
      points={[
        [tx, ty],
        [elbowX, ny],
        [nx, ny],
      ]}
      lines={lines || [note.text]}
      size={size}
      anchor={anchor}
      dy={size * 0.34}
      className={note.issue ? 'dw-note-issue' : undefined}
    />
  );
};

// Mono advance is 0.6 em, so a note's width is known before it renders.
const noteWidth = (text, size) => text.length * size * 0.6;
const LeftNote = ({ m, note, left, ny, size }) => {
  const end = left + noteWidth(note.text, size) + 8;
  return <Note m={m} note={note} to={[end + 5, ny]} elbowX={end + 22} size={size} anchor="end" />;
};

// The full sheet (from 768 px): 1680 x 720, with the full notes from 1024 px and a sparser set
// between 768 and 1023 px.
const Wide = ({ label }) => {
  const k = 1;
  const m = mapper(470, 222, k);
  const top = m.y(Y_MIN);
  const bottom = m.y(Y_MAX);
  const S = 17; // text at 10 px or more from 1024 px (scale 0.61)
  const L = 22.5; // text at 10 px or more from 768 px (scale 0.457)
  const cloud = { x: m.x(-8), y: m.y(32), w: m.s(228), h: m.s(196) };
  return (
    <Sheet viewBox="0 0 1680 720" label={label} className="dw-d">
      <rect x="18" y="18" width="1644" height="684" className="dw-line" />
      <Section m={m} />
      <RevCloud x={cloud.x} y={cloud.y} w={cloud.w} h={cloud.h} arc={22} />

      {/* From 1024 px: the full notes, the dimensions, the level and the view title. */}
      <g className="dw-wide">
        <RevTriangle x={m.x(PANEL[1]) + 30} y={cloud.y - 14} letter="B" size={S} />
        <DimH x1={m.x(0)} x2={m.x(INS)} y={top - 26} from={top} text="150" size={S} />
        <DimH x1={m.x(INS)} x2={m.x(PANEL[1])} y={top - 26} from={top} text="87" size={S} />
        <DimV y1={m.y(0)} y2={m.y(SLAB)} x={m.x(X_MIN) - 34} from={m.x(X_MIN)} text="250" size={S} />
        <Level x={m.x(-366)} y={m.y(0)} width={120} label="Level 3, SSL +9.450" size={S} />
        <LeftNote m={m} note={NOTES.sfs} left={m.x(-366)} ny={m.y(-118)} size={S} />
        <LeftNote m={m} note={NOTES.slab} left={m.x(-366)} ny={m.y(284)} size={S} />
        <LeftNote m={m} note={NOTES.anchor} left={m.x(-366)} ny={m.y(318)} size={S} />
        <LeftNote m={m} note={NOTES.pad} left={m.x(-366)} ny={m.y(352)} size={S} />
        {[
          [NOTES.panel, -122],
          [NOTES.insulation, -86],
          [NOTES.rail, -50],
          [NOTES.bracket, 46],
          [NOTES.fixings, 112],
          [NOTES.barrier, 280],
        ].map(([note, ny]) => (
          <Note key={note.text} m={m} note={note} to={[m.x(330), m.y(ny)]} elbowX={m.x(300)} size={S} />
        ))}
        <circle cx={m.x(-352)} cy={bottom + 58} r="16" className="dw-line" />
        <T x={m.x(-352)} y={bottom + 64} size={S} anchor="middle" className="dw-t-strong">
          7
        </T>
        <T x={m.x(-326)} y={bottom + 54} size={S} className="dw-t-strong">
          Section at slab edge, Levels 3 to 6
        </T>
        <T x={m.x(-326)} y={bottom + 78} size={S}>
          Scale 1:5, dimensions in millimetres
        </T>

        {/* Revision table and title block. */}
        <T x={1236} y={70} size={16.5} className="dw-t-label">
          Revisions
        </T>
        <path d="M1236 82L1636 82" className="dw-thin" />
        {REVISIONS.map((r, i) => (
          <g key={r.rev}>
            <T x={1236} y={108 + i * 58} size={S} className={r.rev === 'B' ? 'dw-t-rev' : undefined}>
              {r.rev}
            </T>
            <T x={1262} y={108 + i * 58} size={S}>
              {r.date}
            </T>
            {r.text.map((line, j) => (
              <T key={line} x={1262} y={130 + i * 58 + j * 22} size={S} className="dw-t-strong">
                {line}
              </T>
            ))}
          </g>
        ))}
        <TitleBlock
          x={1236}
          y={300}
          w={400}
          size={S}
          labelSize={16.5}
          rows={[
            { label: 'Project', value: ['Sample matter (fictional)', 'VC-SAMPLE-01'], h: 86 },
            { label: 'Drawing', value: ['Façade bracket, type B'], title: true, h: 72 },
            { label: 'Number', value: 'SM-FAC-DR-0107', h: 60 },
            { label: 'Scale and revision', value: '1:5 at A3, revision B', h: 60 },
            { label: 'Status', value: 'For construction', h: 60 },
          ]}
        />
      </g>

      {/* From 768 to 1023 px: four notes, the revision and the drawing's name. */}
      <g className="dw-mid">
        <RevTriangle x={m.x(PANEL[1]) + 34} y={cloud.y + 2} letter="B" size={L} />
        <LeftNote m={m} note={{ ...NOTES.slab, text: 'Concrete slab' }} left={m.x(-366)} ny={m.y(300)} size={L} />
        {[
          [NOTES.panel, -110],
          [NOTES.insulation, -40],
          [NOTES.bracket, 60],
          [NOTES.barrier, 270],
        ].map(([note, ny]) => (
          <Note key={note.text} m={m} note={note} to={[m.x(330), m.y(ny)]} elbowX={m.x(300)} size={L} />
        ))}
        <TitleBlock
          x={1236}
          y={420}
          w={400}
          size={L}
          labelSize={L}
          rows={[
            { label: 'Drawing', value: ['Façade bracket, type B'], title: true, h: 98 },
            { label: 'Number', value: 'SM-FAC-DR-0107, rev. B', h: 84 },
          ]}
        />
      </g>
    </Sheet>
  );
};

// The portrait sheet (below 768 px): 640 x 800. Numbered balloons on the drawing, and a key.
const KEY = ['panel', 'insulation', 'bracket', 'barrier', 'slab'];
const BALLOONS = {
  panel: [300, -105],
  insulation: [80, -118],
  bracket: [300, 100],
  barrier: [300, 285],
  slab: [-250, -60],
};

const Portrait = ({ label }) => {
  const k = 0.8;
  const m = mapper(348, 170, k);
  const S = 20; // 10 px at 320 px wide (scale 0.5)
  const cloud = { x: m.x(-8), y: m.y(32), w: m.s(228), h: m.s(196) };
  return (
    <Sheet viewBox="0 0 640 800" label={label} className="dw-m">
      <rect x="12" y="12" width="616" height="776" className="dw-line" />
      <Section m={m} />
      <RevCloud x={cloud.x} y={cloud.y} w={cloud.w} h={cloud.h} arc={18} />
      <RevTriangle x={m.x(PANEL[1]) + 26} y={cloud.y + 20} letter="B" size={S} />
      {KEY.map((key, i) => {
        const [bx, by] = BALLOONS[key];
        const [tx, ty] = NOTES[key].at;
        const cx = m.x(bx);
        const cy = m.y(by);
        const dx = m.x(tx) - cx;
        const dy = m.y(ty) - cy;
        const len = Math.hypot(dx, dy) || 1;
        return (
          <g key={key} className={NOTES[key].issue ? 'dw-note-issue' : undefined}>
            <path d={`M${r2(cx + (dx / len) * 14)} ${r2(cy + (dy / len) * 14)}L${r2(m.x(tx))} ${r2(m.y(ty))}`} className="dw-thin" />
            <circle cx={r2(m.x(tx))} cy={r2(m.y(ty))} r="1.8" className="dw-fill-thin" />
            <circle cx={r2(cx)} cy={r2(cy)} r="14" className="dw-fill-paper" />
            <circle cx={r2(cx)} cy={r2(cy)} r="14" className="dw-thin" />
            <T x={cx} y={cy + 7} size={S} anchor="middle" className="dw-t-strong">
              {i + 1}
            </T>
          </g>
        );
      })}
      {KEY.map((key, i) => (
        <g key={key}>
          <T x={36} y={534 + i * 30} size={S} className="dw-t-strong">
            {i + 1}
          </T>
          <T x={64} y={534 + i * 30} size={S} className={NOTES[key].issue ? 'dw-t-issue' : undefined}>
            {NOTES[key].text}
          </T>
        </g>
      ))}
      <path d="M12 692L628 692" className="dw-thin" />
      <T x={36} y={724} size={22} className="dw-t-title">
        Façade bracket, type B
      </T>
      <T x={36} y={756} size={S}>
        SM-FAC-DR-0107, rev. B, 1:5
      </T>
    </Sheet>
  );
};

export const BracketDetail = ({ label = DEFAULT_LABEL }) => (
  <>
    <Wide label={label} />
    <Portrait label={label} />
  </>
);
