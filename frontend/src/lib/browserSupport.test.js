import fs from 'fs';
import path from 'path';

// Safari before 16.4 cannot parse a regular expression with a lookbehind, and one such pattern
// anywhere in the bundle stops the whole page from running there. The shipped source must not
// use one; tests, which never ship, may.
const SRC = path.join(__dirname, '..');
const LOOKBEHIND = new RegExp(['\\(\\?<=', '\\(\\?<!'].join('|'));

const shipped = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  if (entry.isDirectory()) return shipped(full);
  return /\.(js|jsx|mjs)$/.test(entry.name) && !/\.test\.(js|jsx)$/.test(entry.name) && entry.name !== 'setupTests.js' ? [full] : [];
});

it('ships no regular expression with a lookbehind', () => {
  const files = shipped(SRC);
  expect(files.length).toBeGreaterThan(20);
  const offending = files.filter((file) => LOOKBEHIND.test(fs.readFileSync(file, 'utf8'))).map((file) => path.relative(SRC, file));
  expect(offending).toEqual([]);
});
