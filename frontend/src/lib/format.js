// Dates are always DD Month YYYY, in British English.
const DATE = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });
const TIME = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' });

// Accepts an ISO date or date-time string ("2025-03-12" or "2025-03-12T16:42").
export const formatDate = (iso) => DATE.format(new Date(iso.length === 10 ? `${iso}T00:00:00Z` : `${iso}:00Z`));
export const formatTime = (iso) => TIME.format(new Date(`${iso}:00Z`));

// "a1b2c3d4…e5f6a7b8": first eight and last eight characters of a digest.
export const truncateHash = (hex) => (hex && hex.length > 20 ? `${hex.slice(0, 8)}…${hex.slice(-8)}` : hex);

// Singular and plural from a count: plural(1, 'finding') -> "1 finding".
export const plural = (n, word, many = `${word}s`) => `${n} ${n === 1 ? word : many}`;

// Fill "{n}" style templates from an object of values.
export const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, k) => (k in values ? String(values[k]) : `{${k}}`));
