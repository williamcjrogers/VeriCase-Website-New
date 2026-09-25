// Copy lint: fails on em dashes, unsubstantiated claims and US spellings.
// Run with `yarn lint:copy` from the frontend directory.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const targets = [join(root, 'src'), join(root, 'public', 'index.html')];
const skipDirs = [join(root, 'src', 'components', 'ui')];

const rules = [
  { name: 'em dash', pattern: /—/g },
  { name: 'ISO 27001 claim', pattern: /ISO\s*\/?\s*(IEC\s*)?27001/gi },
  { name: 'blockchain claim', pattern: /blockchain/gi },
  { name: 'military-grade claim', pattern: /military[-\s]grade/gi },
  { name: 'admissibility claim', pattern: /\b(court[-\s])?admissible\b/gi },
  { name: 'CPR compliance claim', pattern: /CPR[-\s]compliant/gi },
  { name: 'outcome guarantee', pattern: /win your case|win more cases|irrefutable|bulletproof/gi },
  { name: 'US spelling', pattern: /\b(organiz|categoriz|authoriz|recogniz|analyz|customiz|prioritiz)\w*/gi },
  { name: 'US spelling (defense)', pattern: /\bdefense\b/gi },
];

// Technical identifiers that must keep their standard spelling.
const allowed = new Set(['Authorization']);

const files = [];
const walk = (path) => {
  const stat = statSync(path);
  if (stat.isDirectory()) {
    if (skipDirs.includes(path)) return;
    readdirSync(path).forEach((entry) => walk(join(path, entry)));
  } else if (/\.(jsx?|html)$/.test(path)) {
    files.push(path);
  }
};
targets.forEach(walk);

let failures = 0;
for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, index) => {
    for (const rule of rules) {
      rule.pattern.lastIndex = 0;
      const match = rule.pattern.exec(line);
      if (match && !allowed.has(match[0])) {
        failures += 1;
        console.error(`${relative(root, file)}:${index + 1}  ${rule.name}: "${match[0]}"`);
      }
    }
  });
}

if (failures) {
  console.error(`\nCopy lint failed with ${failures} issue(s).`);
  process.exit(1);
}
console.log(`Copy lint passed (${files.length} files checked).`);
