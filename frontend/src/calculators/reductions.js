import { near } from './rates';

// The reductions both calculators apply, in per cent: low, central and high. Discussing and
// finding earlier replies come from published research (McKinsey Global Institute, July 2012:
// 25% to 30% of time on email, 30% to 35% of time searching for information); the low figures are
// VeriCase discounts. Reading and bundling are VeriCase assumptions that no study measures, and
// meetings have only company and vendor figures, so by default the central case leaves all three
// out ("published research only"); the visitor can include them.
export const ACTIVITIES = ['email', 'search', 'meet', 'read', 'bund'];
export const RED_DEFAULT = {
  email: { lo: 15, c: 25, hi: 30 },
  search: { lo: 20, c: 30, hi: 35 },
  meet: { lo: 0, c: 0, hi: 18.9 },
  read: { lo: 0, c: 5, hi: 10 },
  bund: { lo: 0, c: 10, hi: 20 },
};
export const PUBLISHED_TOP = { email: 30, search: 35 };
export const VENDOR_TOP = 18.9;
export const ASSUMED = ['read', 'bund', 'meet'];

export const cloneReductions = () => JSON.parse(JSON.stringify(RED_DEFAULT));

// The reductions the central case uses.
export const effective = (red, pubOnly) =>
  pubOnly ? { ...red, ...Object.fromEntries(ASSUMED.map((a) => [a, { ...red[a], c: 0 }])) } : red;

// What a central reduction rests on: a key labelled in content/calculators.js.
export const basisOf = (act, c) => {
  if (c <= 0) return act === 'meet' ? 'noneMeasured' : act in PUBLISHED_TOP ? 'none' : 'noneAssumed';
  if (act in PUBLISHED_TOP) return c <= PUBLISHED_TOP[act] ? 'published' : 'abovePublished';
  if (act === 'meet') {
    if (near(c, 14)) return 'shopify';
    if (near(c, VENDOR_TOP)) return 'forrester';
    return c < VENDOR_TOP ? 'withinVendor' : 'aboveVendor';
  }
  return near(c, RED_DEFAULT[act].c) ? 'assumption' : 'yours';
};

// The class of evidence behind each key, for the badges and the meter.
export const BASIS_CLASS = {
  published: 'pub',
  abovePublished: 'own',
  shopify: 'ven',
  forrester: 'ven',
  withinVendor: 'ven',
  aboveVendor: 'own',
  assumption: 'asm',
  yours: 'own',
};

// Shares of an activity's freed value by class: a figure above a published range counts as
// published up to the top of the range and as the visitor's own above it.
export const splitOf = (act, c) => {
  if (c <= 0) return {};
  const within = (cls, top) => {
    const p = Math.min(c, top) / c;
    return p < 1 ? { [cls]: p, own: 1 - p } : { [cls]: 1 };
  };
  if (act in PUBLISHED_TOP) return within('pub', PUBLISHED_TOP[act]);
  if (act === 'meet') return within('ven', VENDOR_TOP);
  return near(c, RED_DEFAULT[act].c) ? { asm: 1 } : { own: 1 };
};
