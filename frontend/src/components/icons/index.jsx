// The twelve domain glyphs, drawn on a 24 px grid with 1.5 px strokes, round caps and no
// fills (a dot is a zero-length stroke). They appear only in ruled lists, never as tiles.
// Decorative by default; pass `title` when a glyph carries meaning on its own.

const Glyph = ({ title, className, size = 24, children, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    focusable="false"
    aria-hidden={title ? undefined : 'true'}
    role={title ? 'img' : undefined}
    {...rest}
  >
    {title && <title>{title}</title>}
    {children}
  </svg>
);

// An archive box with a letter inside: the record as it is kept.
export const EmailArchive = (props) => (
  <Glyph {...props}>
    <rect x="3" y="3.75" width="18" height="4.25" rx="1" />
    <path d="M4.5 8v11a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V8" />
    <rect x="8" y="11" width="8" height="5.5" rx="0.5" />
    <path d="m8.25 11.5 3.75 2.5 3.75-2.5" />
  </Glyph>
);

// Messages joined by their headers, with a reply branching from the second.
export const Thread = (props) => (
  <Glyph {...props}>
    <circle cx="6" cy="5" r="1.75" />
    <circle cx="6" cy="12" r="1.75" />
    <circle cx="13" cy="19" r="1.75" />
    <path d="M6 6.75v3.5M6 13.75v1.75a3.5 3.5 0 0 0 3.5 3.5h1.75" />
    <path d="M10 5h10M10 12h7M17 19h3" />
  </Glyph>
);

// What the author wrote, with the quoted history folded beneath it.
export const QuoteFold = (props) => (
  <Glyph {...props}>
    <path d="M4 5h16M4 9h12" />
    <rect x="4" y="13.5" width="10" height="5.5" rx="2.75" />
    <path d="M7 16.25h.01M9 16.25h.01M11 16.25h.01" />
    <path d="m16.75 15.25 1.75 1.75 1.75-1.75" />
  </Glyph>
);

// Two copies of one document: the second is set aside, the original retained.
export const NearDuplicate = (props) => (
  <Glyph {...props}>
    <path d="M9 17H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v3" />
    <rect x="9" y="7" width="11" height="14" rx="1" />
    <path d="M12 12.5c.8-.8 1.7-.8 2.5 0s1.7.8 2.5 0M12 16c.8-.8 1.7-.8 2.5 0s1.7.8 2.5 0" />
  </Glyph>
);

// A scanned page read into text.
export const OcrPage = (props) => (
  <Glyph {...props}>
    <path d="M3 7.5V4a1 1 0 0 1 1-1h3.5M16.5 3H20a1 1 0 0 1 1 1v3.5M21 16.5V20a1 1 0 0 1-1 1h-3.5M7.5 21H4a1 1 0 0 1-1-1v-3.5" />
    <path d="M7.5 8.5h9M7.5 12h9M7.5 15.5h5.5" />
  </Glyph>
);

// Another project's folder, taken out of the set.
export const ExcludedProject = (props) => (
  <Glyph {...props}>
    <path d="M3 18V6a1 1 0 0 1 1-1h4.6a1 1 0 0 1 .7.3L11 7h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
    <path d="M9.5 13h5" />
  </Glyph>
);

// The Lens band: scattered fragments on the left leave it in order on the right.
export const ChronologyLens = (props) => (
  <Glyph {...props}>
    <path d="M9 3.5v17M15 3.5v17M8 3.5h2M14 3.5h2M8 20.5h2M14 20.5h2" />
    <path d="m3 8 3.5-1M3.5 12.5l3 .5M3 17.25l3.5-1" />
    <path d="M11 7.5h2M11 12h2M11 16.5h2" />
    <path d="M17.5 7.5H21M17.5 12H21M17.5 16.5H21" />
  </Glyph>
);

// A Query Plan chip: a key above its value.
export const QueryChip = (props) => (
  <Glyph {...props}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M6.5 10h5M6.5 14h11" />
  </Glyph>
);

// A report whose statements carry citations.
export const CitedReport = (props) => (
  <Glyph {...props}>
    <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" />
    <path d="M14 3v5h5" />
    <path d="M8 12h4.5M8 15.5h8M8 19h5" />
    <circle cx="16.25" cy="11.5" r="1.25" />
  </Glyph>
);

// A bound bundle with tabbed dividers.
export const TabbedBundle = (props) => (
  <Glyph {...props}>
    <rect x="4" y="3" width="13" height="18" rx="1" />
    <path d="M7.5 3v18" />
    <path d="M17 5.5h2.25a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75H17M17 10.5h2.25a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75H17M17 15.5h2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75H17" />
  </Glyph>
);

// A claim and its reply, as a pair.
export const RebuttalPair = (props) => (
  <Glyph {...props}>
    <path d="M4 3h10a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H8.5l-3 2.5V10H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M20 13H10a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5.5l3 2.5V19H20a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z" />
    <path d="M6 6.5h6M12 16h6" />
  </Glyph>
);

// A seal carrying a hash: the original as received.
export const HashSeal = (props) => (
  <Glyph {...props}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="m10.75 7.75-1.25 8.5M15 7.75l-1.25 8.5M8.25 10.25h8M7.75 13.75h8" />
  </Glyph>
);

export const ICONS = {
  EmailArchive,
  Thread,
  QuoteFold,
  NearDuplicate,
  OcrPage,
  ExcludedProject,
  ChronologyLens,
  QueryChip,
  CitedReport,
  TabbedBundle,
  RebuttalPair,
  HashSeal,
};

// Looks up a glyph by the name used in the content files.
export const DomainIcon = ({ name, ...props }) => {
  const Icon = ICONS[name];
  return Icon ? <Icon {...props} /> : null;
};
