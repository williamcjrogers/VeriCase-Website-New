// Copy check for the site. Run with `yarn lint:copy` from the frontend directory; the build runs
// it again with `--built` over the prerendered HTML.
//
// It fails on em and en dashes, unsubstantiated or banned claims, American spellings, real
// matter names, malformed dates, unresolved note markers and dead or unsafe links. Open owner
// gates and {{TOKENS}} are listed on every run and fail the build when VERCEL_ENV=production.
// COPY_CHECK=warn reports every failure as a warning instead (for staging only).
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const BUILT = process.argv.includes('--built');
const PRODUCTION = (process.env.VERCEL_ENV || process.env.REACT_APP_VERCEL_ENV) === 'production';
const WARN_ONLY = process.env.COPY_CHECK === 'warn';

const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';

// Rules for all copy, applied to text (content files, and the rendered HTML with --built).
const TEXT_RULES = [
  { name: 'em dash', pattern: /—/g },
  { name: 'en dash', pattern: /–/g },
  { name: 'unresolved confirmation', pattern: /\[confirm\]/gi },
  { name: 'ISO 27001 claim', pattern: /ISO\s*\/?\s*(IEC\s*)?27001/gi },
  { name: 'blockchain claim', pattern: /blockchain/gi },
  { name: 'military-grade claim', pattern: /military[-\s]grade/gi },
  { name: 'admissibility claim', pattern: /\bcourt[-\s](ready|admissible)\b|\badmissible\b/gi },
  { name: 'CPR claim', pattern: /\bCPR\b/g },
  { name: 'outcome claim', pattern: /win your case|win more cases|irrefutable|bulletproof|\bguarantee/gi },
  { name: 'tamper-proof claim', pattern: /tamper[-\s]?proof/gi },
  { name: 'banned term', pattern: /\bproportionate\b|Microsoft 365|Office 365|delay analysis|critical path|\bGantt\b|defence bundle/gi },
  { name: 'banned term (programme)', pattern: /\bprogramm?e?s?\b/gi },
  { name: 'US spelling', pattern: /\b(organiz|categoriz|authoriz|recogniz|analyz|customiz|prioritiz|summariz|minimiz|maximiz|utiliz)\w*/gi },
  { name: 'US spelling', pattern: /\b(colors?|colored|centers?|centered|defense|catalog|behaviors?|favorite|honors?|labor)\b/gi },
  { name: 'date format (day must have two digits)', pattern: new RegExp(`\\b\\d (${MONTHS}) \\d{4}\\b`, 'g') },
  { name: 'date format (US order)', pattern: new RegExp(`\\b(${MONTHS}) \\d{1,2}, \\d{4}\\b`, 'g') },
  { name: 'date format (numeric)', pattern: /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g },
];

// Sentences that may use a banned word because they disclaim it.
const ALLOWED_SENTENCES = [/We do not describe VeriCase’s outputs as court-ready or admissible/];

// Terms that must not appear in the fictional sample matter (they belong to other forms).
const SAMPLE_RULES = [{ name: 'term from another contract form', pattern: /compensation event|\bEngineer\b|SI-017/g }];

// Real matter, party and place names, held only as SHA-256 digests of the lowercase term so
// that the list itself is not published. Matched against every one, two and three word run.
const RESTRICTED = new Set([
  '6087ced027db3b28f38f27ee3e5e11ef2db00dc92e5c37b3fa2dbdf3c74b8c80',
  '615d28b7e1e9972731398aa24c36c645742491c0257ed9ac07355c59b9c3fa05',
  'c07fe177648809976c2eadcaaf7c4838355bb8aec9c88871e82cb079f785a871',
  '210445c32810159ad8b122e451b0088d2c4cc57d276946b40598a60c103a1fb6',
  '109365b01efffdb2148d09894c44efe1c5591391090591ca461ddfa050d414f7',
  '1887ba32a3e78540206c3302c8ac29851839378e795a7621bf4733f27cfef0ef',
  'dffc504aa55359b9265cbebe1e4032fe600b64475ae3fd29c07d23223334d0af',
  '2f6fbd00c104a023bc2422af40307a55c49d2580e59e3ac0b02168c4ce6d8393',
  'ae7d3c450326479f9374d4420afdd69c9d947c4a43a4fabc1b109e6df490c3f4',
  '5f8634ac921bb868d93bf72075d0d6edfd942bf467843c9713edcdb104fe4363',
  '2607e6d740c717485dccf1e006f292d3edac0ace71372dd3f754d776c6dc18e2',
  'c28d7c3d34ac4f4888c71f83f25b99919a9ee3ff7b7bcce268aec3d38ed112f0',
  '5fa896b2fbacdfc6676d6e4f53028a9cc4b215ba7bfa9f341a4b5029e97d711f',
  'e3eccd73f58b5831353be45e64ef68f5a3b9bd5f5d2d4eddd11f4a45e96f88fb',
  '409e364456fa93642cd24878f532fffe31e3aae5944d04239a7d023e66ebdbe3',
  '6f9494cacb5e56f90979cff747c2316bbfdf5878f8208ff8655444763cceaf06',
  '93b76c733a7440674066e8e2d4345de9e2ec1380abe5874ba0a4c839581d8311',
  '6d36bcf63879d4106d2a9831e36bddfa249327a4258f173e567e719755d49c04',
  '069df57a3a645590c8bd00dfffb2bd94969c691857a20c7936a5e06fa122a8f3',
]);

const failures = [];
const warnings = [];
const fail = (where, message) => failures.push(`${where}  ${message}`);
const warn = (where, message) => warnings.push(`${where}  ${message}`);

const sha = (s) => createHash('sha256').update(s).digest('hex');
const restrictedIn = (text) => {
  const words = text.toLowerCase().normalize('NFC').split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  for (let i = 0; i < words.length; i += 1) {
    for (let n = 1; n <= 3 && i + n <= words.length; n += 1) {
      const run = words.slice(i, i + n).join(' ');
      if (RESTRICTED.has(sha(run))) return run.replace(/\S/g, (c, k) => (k === 0 ? c : '•'));
    }
  }
  return null;
};

const applyRules = (where, text, rules) => {
  for (const rule of rules) {
    rule.pattern.lastIndex = 0;
    let m;
    while ((m = rule.pattern.exec(text))) {
      const start = Math.max(0, text.lastIndexOf('.', m.index) + 1);
      const end = text.indexOf('.', m.index);
      const sentence = text.slice(start, end < 0 ? undefined : end + 1);
      if (!ALLOWED_SENTENCES.some((a) => a.test(sentence))) fail(where, `${rule.name}: "${m[0]}"`);
    }
  }
};

const walk = (dir, test, skip = []) => {
  const out = [];
  const visit = (p) => {
    if (skip.includes(p)) return;
    const st = statSync(p);
    if (st.isDirectory()) readdirSync(p).forEach((e) => visit(join(p, e)));
    else if (test(p)) out.push(p);
  };
  visit(dir);
  return out;
};

// Text inside string literals only, so that class names and identifiers are never read as copy.
const stringsOf = (source) => {
  const out = [];
  const re = /'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g;
  let m;
  while ((m = re.exec(source))) {
    const line = source.slice(0, m.index).split('\n').length;
    out.push({ line, text: (m[1] ?? m[2] ?? m[3]).replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\\(.)/g, '$1') });
  }
  return out;
};

// ---- Gates, tokens and notes (read from the content files) ---------------------------------
const gatesSource = readFileSync(join(root, 'src/content/gates.js'), 'utf8');
const GATES = [...gatesSource.matchAll(/^\s*(\w+):\s*\{\s*status:\s*'(open|confirmed|struck)',\s*gate:\s*'(G\d+)',\s*label:\s*'((?:[^'\\]|\\.)*)'(?:,\s*tokens:\s*\[([^\]]*)\])?/gm)].map((m) => ({
  id: m[1],
  status: m[2],
  gate: m[3],
  label: m[4],
  tokens: [...(m[5] || '').matchAll(/'([A-Z0-9_]+)'/g)].map((t) => t[1]),
}));
// Placeholders held by a struck item are never rendered, so they do not block a production build.
const HELD_TOKENS = new Set(GATES.filter((g) => g.status === 'struck').flatMap((g) => g.tokens));
const notesSource = readFileSync(join(root, 'src/content/notes.js'), 'utf8');
const NOTE_NUMBERS = new Set([...notesSource.matchAll(/\bn:\s*(\d+)/g)].map((m) => Number(m[1])));

const report = (where, message) => (PRODUCTION ? fail : warn)(where, message);

if (!BUILT) {
  const contentDir = join(root, 'src/content');
  const contentFiles = walk(contentDir, (p) => /\.(js|json)$/.test(p) && !/\.test\.js$/.test(p));
  const codeFiles = walk(join(root, 'src'), (p) => /\.(js|jsx)$/.test(p), [join(root, 'src/components/ui'), contentDir]);
  const tokens = new Map();
  const cited = new Set();

  for (const file of contentFiles) {
    const rel = relative(root, file);
    const source = readFileSync(file, 'utf8');
    const strings = file.endsWith('.json')
      ? [...JSON.stringify(JSON.parse(source)).matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => ({ line: 0, text: JSON.parse(`"${m[1]}"`) }))
      : stringsOf(source);
    const sample = /sampleEvidence\.json$|sampleMatter\.js$/.test(file);
    for (const { line, text } of strings) {
      const where = line ? `${rel}:${line}` : rel;
      applyRules(where, text, sample ? [...TEXT_RULES, ...SAMPLE_RULES] : TEXT_RULES);
      const hit = restrictedIn(text);
      if (hit) fail(where, `restricted name: "${hit}"`);
      for (const t of text.matchAll(/\{\{([A-Z0-9_]+)\}\}/g)) tokens.set(t[1], where);
      for (const n of text.matchAll(/\[\[note:(\d+)\]\]/g)) cited.add(Number(n[1]));
    }
  }

  for (const file of [...codeFiles, join(root, 'public/index.html')]) {
    const rel = relative(root, file);
    const source = readFileSync(file, 'utf8');
    source.split('\n').forEach((line, i) => {
      if (/[–—]/.test(line)) fail(`${rel}:${i + 1}`, 'em or en dash');
      if (/href=["']#["']/.test(line)) fail(`${rel}:${i + 1}`, 'link to "#"');
      if (/[?&](token|access_token|auth)=/i.test(line)) fail(`${rel}:${i + 1}`, 'token in a URL');
      const us = /\b(organiz|categoriz|recogniz|analyz|customiz|prioritiz)\w*/i.exec(line);
      if (us) fail(`${rel}:${i + 1}`, `US spelling: "${us[0]}"`);
      const hit = restrictedIn(line);
      if (hit) fail(`${rel}:${i + 1}`, `restricted name: "${hit}"`);
    });
    for (const n of source.matchAll(/<NoteRef\s+n=\{(\d+)\}/g)) cited.add(Number(n[1]));
  }

  // The plates draw their own text and load lazily, so the rendered-HTML check never sees it: the
  // copy rules, and the sample matter's own rules, apply to their sources in full (comments aside).
  for (const file of walk(join(root, 'src/components/plates'), (p) => /\.(js|jsx)$/.test(p))) {
    const rel = relative(root, file);
    const source = readFileSync(file, 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ''))
      .replace(/(^|[^:])\/\/.*$/gm, '$1');
    source.split('\n').forEach((line, i) => applyRules(`${rel}:${i + 1}`, line, [...TEXT_RULES, ...SAMPLE_RULES]));
  }

  for (const n of cited) if (!NOTE_NUMBERS.has(n)) fail('src/content/notes.js', `note ${n} is cited but does not exist`);
  for (const [token, where] of tokens) if (!HELD_TOKENS.has(token)) report(where, `owner to supply {{${token}}}`);
  for (const g of GATES.filter((x) => x.status === 'open')) report('src/content/gates.js', `open gate ${g.gate} (${g.id}): ${g.label}`);
} else {
  // ---- The prerendered pages -----------------------------------------------------------------
  const pages = ['build/index.html', 'build/404.html'];
  for (const page of pages) {
    const file = join(root, page);
    if (!existsSync(file)) {
      fail(page, 'missing (the prerender did not run)');
      continue;
    }
    const html = readFileSync(file, 'utf8');
    const rootMatch = html.match(/<div id="root"[^>]*>([\s\S]*)<\/div>\s*<script>/);
    if (!rootMatch || !/data-prerendered=/.test(html)) {
      fail(page, 'no prerendered markup in #root');
      continue;
    }
    const body = rootMatch[1];
    const decode = (s) =>
      s
        .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
        .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
        .replace(/&quot;/g, '"')
        .replace(/&apos;|&#x27;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&');
    const attrs = [...body.matchAll(/\s(?:alt|aria-label|title|placeholder)="([^"]*)"/g)].map((m) => decode(m[1]));
    const text = decode(body.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
    const corpus = `${text} ${attrs.join(' . ')}`;
    applyRules(page, corpus, TEXT_RULES);
    const hit = restrictedIn(corpus);
    if (hit) fail(page, `restricted name: "${hit}"`);
    if (/\{\{[A-Z0-9_]+\}\}/.test(corpus)) fail(page, 'raw {{TOKEN}} in the rendered text');
    const placeholders = [...new Set([...text.matchAll(/Owner to supply: ([a-z0-9 ]+)/g)].map((m) => m[1].trim()))];
    for (const p of placeholders) report(page, `owner to supply: ${p}`);
    if (/data-gate=/.test(body)) report(page, 'open gates are marked on the page (preview build)');

    // Links
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    const onHome = page === 'build/index.html';
    for (const m of body.matchAll(/<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)) {
      const href = decode(m[1]);
      const label = decode(m[2].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
      if (href === '#' || href === '') fail(page, `empty link "${label}"`);
      if (/[?&](token|access_token|auth)=/i.test(href)) fail(page, `token in a URL: ${href}`);
      if (href === '/privacy') fail(page, 'link to /privacy while the privacy page is off');
      if (href.startsWith('#') && href !== '#main') {
        if (!onHome) fail(page, `in-page anchor ${href} off the home page (use /${href})`);
        else if (!ids.has(href.slice(1))) fail(page, `dead anchor ${href}`);
      }
      if (href.startsWith('mailto:enquiries@veri-case.com?subject=') && label !== 'Book a demonstration') {
        fail(page, `demonstration link reads "${label}", not "Book a demonstration"`);
      }
      if (label === 'Sign in' && href !== 'https://app.veri-case.com/ui/login.html') fail(page, `Sign in points to ${href}`);
    }
    // As registered at Companies House (company 16562435); 14789532 belongs to another company.
    if (!text.includes('VeriCase Ltd is registered in England and Wales (company number 16562435). Registered office: 85 Great Portland Street, London, England, W1W 7LT.')) {
      fail(page, 'the footer legal line does not match section 3.14');
    }
    if (!text.includes('The Chronology Lens™ is a trade mark of VeriCase Ltd. VeriCase is software and does not give legal advice. Illustrations on this site use a fictional matter.')) {
      fail(page, 'the footer trade mark line does not match section 3.14');
    }
    if (/VAT/i.test(text)) fail(page, 'a VAT line is present');
  }
}

for (const w of warnings) console.warn(`warning  ${w}`);
if (failures.length && !WARN_ONLY) {
  for (const f of failures) console.error(`error    ${f}`);
  console.error(`\nCopy check failed with ${failures.length} issue(s)${PRODUCTION ? ' (production build)' : ''}.`);
  process.exit(1);
}
for (const f of failures) console.warn(`warning  ${f}`);
console.log(`Copy check passed${BUILT ? ' on the prerendered pages' : ''}, with ${warnings.length + (WARN_ONLY ? failures.length : 0)} warning(s).`);
