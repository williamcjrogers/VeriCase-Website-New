import { useId } from 'react';
import { cn } from '@/lib/utils';

// Drawing primitives for the plates (docs/design/plates.md): a seeded generator, the sheet,
// hatching clipped to a shape, dimension strings, grid lines and bubbles, level datums, leaders,
// revision clouds and the title block. Coordinates are viewBox units; strokes do not scale.

// mulberry32: a small seeded generator, so that every render of a plate is identical.
export const rng = (seed) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Rounds to two decimals, to keep path data short.
export const r2 = (n) => Math.round(n * 100) / 100;

// The sheet: an inline SVG that fills the plate's aspect-ratio box. Text inside it is part of the
// image; the aria-label carries the description.
export const Sheet = ({ viewBox, label, className, children, sheet = true }) => {
  const [, , w, h] = viewBox.split(' ').map(Number);
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className={cn('dw', className)} preserveAspectRatio="xMidYMid meet" focusable="false">
      {sheet && <rect className="dw-sheet" x="0" y="0" width={w} height={h} />}
      {children}
    </svg>
  );
};

// Text in the drawing's mono face (or the display italic for titles).
export const T = ({ x, y, size = 12, anchor = 'start', className, children, rotate, weight }) => (
  <text
    x={r2(x)}
    y={r2(y)}
    fontSize={size}
    textAnchor={anchor}
    fontWeight={weight}
    transform={rotate ? `rotate(${rotate} ${r2(x)} ${r2(y)})` : undefined}
    className={cn('dw-t', className)}
  >
    {children}
  </text>
);

// Parallel hatch lines at `angle` degrees and `pitch` units, clipped to `d` (a path) or to a box.
export const Hatch = ({ d, box, angle = 45, pitch = 6, className = 'dw-hatch' }) => {
  const id = useId().replace(/:/g, '');
  const [x, y, w, h] = box;
  const rad = (angle * Math.PI) / 180;
  const diag = Math.hypot(w, h);
  const cx = x + w / 2;
  const cy = y + h / 2;
  const ux = Math.cos(rad);
  const uy = Math.sin(rad);
  let path = '';
  for (let s = -diag / 2; s <= diag / 2; s += pitch) {
    // A line through the box centre offset by s along the normal, long enough to cross the box.
    const px = cx - uy * s;
    const py = cy + ux * s;
    path += `M${r2(px - ux * diag)} ${r2(py - uy * diag)}L${r2(px + ux * diag)} ${r2(py + uy * diag)}`;
  }
  return (
    <g>
      <clipPath id={`h${id}`}>{d ? <path d={d} /> : <rect x={x} y={y} width={w} height={h} />}</clipPath>
      <path d={path} className={className} clipPath={`url(#h${id})`} />
    </g>
  );
};

// Concrete: a seeded stipple of points and small aggregate triangles, clipped to the shape.
export const Concrete = ({ d, box, seed = 7, density = 0.012, className = 'dw-hatch' }) => {
  const id = useId().replace(/:/g, '');
  const [x, y, w, h] = box;
  const rand = rng(seed);
  const n = Math.round(w * h * density);
  let dots = '';
  let aggregate = '';
  for (let i = 0; i < n; i += 1) {
    const px = x + rand() * w;
    const py = y + rand() * h;
    if (rand() < 0.14) {
      const s = 2.2 + rand() * 2.6;
      const a = rand() * Math.PI * 2;
      const pts = [0, 1, 2].map((k) => [px + Math.cos(a + (k * 2 * Math.PI) / 3) * s, py + Math.sin(a + (k * 2 * Math.PI) / 3) * s]);
      aggregate += `M${pts.map(([qx, qy]) => `${r2(qx)} ${r2(qy)}`).join('L')}Z`;
    } else {
      dots += `M${r2(px)} ${r2(py)}h0.01`;
    }
  }
  return (
    <g clipPath={`url(#c${id})`}>
      <clipPath id={`c${id}`}>{d ? <path d={d} /> : <rect x={x} y={y} width={w} height={h} />}</clipPath>
      <path d={dots} className={cn(className, 'dw-stipple')} />
      <path d={aggregate} className={className} />
    </g>
  );
};

// Insulation: the batt curve, a continuous loop pattern between two lines, clipped to the box.
export const Batt = ({ box, pitch = 14, className = 'dw-hatch', vertical = true }) => {
  const id = useId().replace(/:/g, '');
  const [x, y, w, h] = box;
  let d = '';
  if (vertical) {
    // Loops run down the height, spanning the width.
    const amp = w / 2;
    const cx = x + w / 2;
    for (let yy = y - pitch; yy < y + h + pitch; yy += pitch) {
      d += `M${r2(cx - amp)} ${r2(yy)}C${r2(cx - amp)} ${r2(yy + pitch * 0.55)} ${r2(cx + amp)} ${r2(yy - pitch * 0.05)} ${r2(cx + amp)} ${r2(yy + pitch * 0.5)}`;
      d += `M${r2(cx + amp)} ${r2(yy + pitch * 0.5)}C${r2(cx + amp)} ${r2(yy + pitch * 1.05)} ${r2(cx - amp)} ${r2(yy + pitch * 0.45)} ${r2(cx - amp)} ${r2(yy + pitch)}`;
    }
  } else {
    const amp = h / 2;
    const cy = y + h / 2;
    for (let xx = x - pitch; xx < x + w + pitch; xx += pitch) {
      d += `M${r2(xx)} ${r2(cy - amp)}C${r2(xx + pitch * 0.55)} ${r2(cy - amp)} ${r2(xx - pitch * 0.05)} ${r2(cy + amp)} ${r2(xx + pitch * 0.5)} ${r2(cy + amp)}`;
      d += `M${r2(xx + pitch * 0.5)} ${r2(cy + amp)}C${r2(xx + pitch * 1.05)} ${r2(cy + amp)} ${r2(xx + pitch * 0.45)} ${r2(cy - amp)} ${r2(xx + pitch)} ${r2(cy - amp)}`;
    }
  }
  return (
    <g>
      <clipPath id={`b${id}`}>
        <rect x={x} y={y} width={w} height={h} />
      </clipPath>
      <path d={d} className={className} clipPath={`url(#b${id})`} />
    </g>
  );
};

// Oblique 45 degree tick centred on (x, y).
const tick = (x, y, s = 5) => `M${r2(x - s)} ${r2(y + s)}L${r2(x + s)} ${r2(y - s)}`;

// A horizontal dimension string between x1 and x2 on the line y, with extension lines from the
// object at `from` (above or below the line). The value sits above the line, centred.
export const DimH = ({ x1, x2, y, from, text, size = 11, gap = 2, over = 3, className }) => {
  const dir = from > y ? 1 : -1; // extension lines run from the object towards the line
  const e1 = from - dir * gap;
  const e2 = y - dir * over;
  const d = `M${r2(x1)} ${r2(e1)}L${r2(x1)} ${r2(e2)}M${r2(x2)} ${r2(e1)}L${r2(x2)} ${r2(e2)}M${r2(x1 - 6)} ${r2(y)}L${r2(x2 + 6)} ${r2(y)}${tick(x1, y)}${tick(x2, y)}`;
  return (
    <g className={className}>
      <path d={d} className="dw-dim" />
      <T x={(x1 + x2) / 2} y={y - 4} size={size} anchor="middle" className="dw-t-dim">
        {text}
      </T>
    </g>
  );
};

// A vertical dimension string between y1 and y2 on the line x, extension lines from `from`.
export const DimV = ({ y1, y2, x, from, text, size = 11, gap = 2, over = 3, className }) => {
  const dir = from > x ? 1 : -1;
  const e1 = from - dir * gap;
  const e2 = x - dir * over;
  const d = `M${r2(e1)} ${r2(y1)}L${r2(e2)} ${r2(y1)}M${r2(e1)} ${r2(y2)}L${r2(e2)} ${r2(y2)}M${r2(x)} ${r2(y1 - 6)}L${r2(x)} ${r2(y2 + 6)}${tick(x, y1)}${tick(x, y2)}`;
  const my = (y1 + y2) / 2;
  return (
    <g className={className}>
      <path d={d} className="dw-dim" />
      <T x={x - 4} y={my} size={size} anchor="middle" rotate={-90} className="dw-t-dim">
        {text}
      </T>
    </g>
  );
};

// A grid line (chain line) with a bubble at one end.
export const GridLine = ({ x1, y1, x2, y2, label, r = 11, size = 11, at = 'start' }) => {
  const [bx, by] = at === 'start' ? [x1, y1] : [x2, y2];
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const [sx, sy] = at === 'start' ? [x1 + ux * r, y1 + uy * r] : [x1, y1];
  const [ex, ey] = at === 'start' ? [x2, y2] : [x2 - ux * r, y2 - uy * r];
  return (
    <g>
      <path d={`M${r2(sx)} ${r2(sy)}L${r2(ex)} ${r2(ey)}`} className="dw-grid" />
      <Bubble x={bx} y={by} r={r} label={label} size={size} />
    </g>
  );
};

export const Bubble = ({ x, y, r = 11, label, size = 11 }) => (
  <g>
    <circle cx={r2(x)} cy={r2(y)} r={r} className="dw-thin dw-bubble" />
    <T x={x} y={y + size * 0.36} size={size} anchor="middle">
      {label}
    </T>
  </g>
);

// A level datum: a filled triangle on a short rule, and the level beside it.
export const Level = ({ x, y, label, size = 11, width = 70, align = 'right' }) => {
  const s = 6;
  const dir = align === 'right' ? 1 : -1;
  return (
    <g>
      <path d={`M${r2(x)} ${r2(y)}L${r2(x + dir * width)} ${r2(y)}`} className="dw-thin" />
      <path d={`M${r2(x - s)} ${r2(y - s * 1.2)}L${r2(x + s)} ${r2(y - s * 1.2)}L${r2(x)} ${r2(y)}Z`} className="dw-fill-line" />
      <T x={x + dir * 12} y={y - 5} size={size} anchor={align === 'right' ? 'start' : 'end'}>
        {label}
      </T>
    </g>
  );
};

// A leader from the object (a small dot) through its points, with its note at the far end.
export const Leader = ({ points, text, size = 11, lines, anchor = 'start', dy = 4, className }) => {
  const [[x0, y0]] = points;
  const [xn, yn] = points[points.length - 1];
  const rows = lines || [text];
  return (
    <g className={className}>
      <circle cx={r2(x0)} cy={r2(y0)} r="1.6" className="dw-fill-thin" />
      <path d={`M${points.map(([x, y]) => `${r2(x)} ${r2(y)}`).join('L')}`} className="dw-thin" />
      {rows.map((row, i) => (
        <T key={row} x={xn + (anchor === 'start' ? 5 : -5)} y={yn + dy + i * size * 1.35} size={size} anchor={anchor}>
          {row}
        </T>
      ))}
    </g>
  );
};

// A revision cloud: outward arcs round a rectangle, traversed clockwise.
export const cloudPath = (x, y, w, h, arc = 16) => {
  const side = (ax, ay, bx, by) => {
    const len = Math.hypot(bx - ax, by - ay);
    const n = Math.max(2, Math.round(len / arc));
    let d = '';
    for (let i = 1; i <= n; i += 1) {
      const px = ax + ((bx - ax) * i) / n;
      const py = ay + ((by - ay) * i) / n;
      const rad = (len / n) * 0.62;
      d += `A${r2(rad)} ${r2(rad)} 0 0 1 ${r2(px)} ${r2(py)}`;
    }
    return d;
  };
  return `M${r2(x)} ${r2(y)}${side(x, y, x + w, y)}${side(x + w, y, x + w, y + h)}${side(x + w, y + h, x, y + h)}${side(x, y + h, x, y)}Z`;
};

export const RevCloud = ({ x, y, w, h, arc, className }) => <path d={cloudPath(x, y, w, h, arc)} className={cn('dw-rev', className)} />;

// The revision triangle carrying its letter.
export const RevTriangle = ({ x, y, letter, s = 22, size = 11 }) => {
  const h = (s * Math.sqrt(3)) / 2;
  return (
    <g>
      <path d={`M${r2(x)} ${r2(y - (2 * h) / 3)}L${r2(x + s / 2)} ${r2(y + h / 3)}L${r2(x - s / 2)} ${r2(y + h / 3)}Z`} className="dw-rev dw-rev-tri" />
      <T x={x} y={y + h / 3 - s * 0.2} size={size} anchor="middle" className="dw-t-rev">
        {letter}
      </T>
    </g>
  );
};

// A title block: ruled rows of small-capital labels and values. `rows` is [{ label, value, h }]
// with an optional `title: true` row set in the display italic.
export const TitleBlock = ({ x, y, w, rows, size = 11, labelSize = 8.5, pad = 8 }) => {
  let cy = y;
  const parts = rows.map((row) => {
    const h = row.h || size * 3.1;
    const top = cy;
    cy += h;
    return (
      <g key={row.label}>
        <T x={x + pad} y={top + labelSize + pad * 0.6} size={labelSize} className="dw-t-label">
          {row.label}
        </T>
        {(Array.isArray(row.value) ? row.value : [row.value]).map((v, i) => (
          <T
            key={v}
            x={x + pad}
            y={top + labelSize + pad * 0.6 + (row.title ? size * 1.55 : size * 1.35) * (i + 1)}
            size={row.title ? size * 1.3 : size}
            className={row.title ? 'dw-t-title' : undefined}
          >
            {v}
          </T>
        ))}
        {top > y && <path d={`M${r2(x)} ${r2(top)}L${r2(x + w)} ${r2(top)}`} className="dw-thin" />}
      </g>
    );
  });
  return (
    <g>
      <rect x={r2(x)} y={r2(y)} width={r2(w)} height={r2(cy - y)} className="dw-line" />
      {parts}
    </g>
  );
};
