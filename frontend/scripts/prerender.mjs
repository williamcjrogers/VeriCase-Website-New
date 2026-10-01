#!/usr/bin/env node
// Postbuild: renders the home page into build/index.html and the 404 page into build/404.html,
// so that the argument, the figure summaries and the first viewport arrive as HTML. It uses
// esbuild and react-dom/server (no browser), with the same REACT_APP_* values as the CRA build.
// The client hydrates this markup (src/index.js); public/index.html clears it first on any
// address it does not belong to.
import { build } from 'esbuild';
import dotenv from 'dotenv';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = join(root, 'build');
const src = join(root, 'src');

// The same environment files, in the same order of precedence, as react-scripts build.
const env = {};
for (const file of ['.env', '.env.production', '.env.local', '.env.production.local']) {
  const p = join(root, file);
  if (existsSync(p)) Object.assign(env, dotenv.parse(readFileSync(p)));
}
for (const [k, v] of Object.entries(process.env)) if (k.startsWith('REACT_APP_')) env[k] = v;
const define = { 'process.env.NODE_ENV': '"production"', 'process.env': '{}' };
for (const [k, v] of Object.entries(env)) if (k.startsWith('REACT_APP_')) define[`process.env.${k}`] = JSON.stringify(v);

const out = join(buildDir, '.prerender', 'entry.cjs');
await build({
  entryPoints: [join(root, 'scripts', 'prerender-entry.jsx')],
  outfile: out,
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node18',
  jsx: 'automatic',
  loader: { '.js': 'jsx', '.css': 'empty', '.png': 'empty', '.jpg': 'empty', '.svg': 'empty', '.webp': 'empty' },
  define,
  logLevel: 'warning',
  plugins: [
    {
      name: 'alias-at',
      setup(b) {
        b.onResolve({ filter: /^@\// }, (args) => b.resolve(`./${args.path.slice(2)}`, { resolveDir: src, kind: args.kind }));
      },
    },
  ],
});

const entry = createRequire(import.meta.url)(out);
const template = readFileSync(join(buildDir, 'index.html'), 'utf8');
if (template.includes('<div id="root" data-prerendered')) throw new Error('build/index.html is already prerendered; run the CRA build first.');
if (!template.includes('<div id="root"></div>')) throw new Error('build/index.html has no empty #root to fill.');

// Keep the inline route list in public/index.html in step with KNOWN_ROUTES in App.js.
const known = readFileSync(join(root, 'public', 'index.html'), 'utf8').match(/var known = (\[[^\]]*\])/);
const inline = known ? JSON.parse(known[1]) : [];
const expected = [...new Set(entry.KNOWN_ROUTES.map((r) => r.toLowerCase()))];
if (expected.some((r) => !inline.includes(r)) || inline.some((r) => !expected.includes(r))) {
  throw new Error(`public/index.html lists routes ${JSON.stringify(inline)}, but App.js has ${JSON.stringify(expected)}.`);
}

const ld = entry
  .jsonLd()
  .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
  .join('');

const fill = (html, marker) => template.replace('<div id="root"></div>', `<div id="root" data-prerendered="${marker}">${html}</div>`);

const withMetadata = (html, path) => {
  const meta = entry.metadataForPath(path);
  const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  let result = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(meta.title)}</title>`);
  for (const [name, content] of [['description', meta.description], ['twitter:title', meta.title], ['twitter:description', meta.description]]) {
    result = result.replace(new RegExp(`<meta name="${name}"[^>]*>`), `<meta name="${name}" content="${escape(content)}"/>`);
  }
  for (const [name, content] of [['og:title', meta.title], ['og:description', meta.description]]) {
    result = result.replace(new RegExp(`<meta property="${name}"[^>]*>`), `<meta property="${name}" content="${escape(content)}"/>`);
  }
  result = result.replace(/<link rel="canonical"[^>]*>/, meta.url ? `<link rel="canonical" href="${meta.url}"/>` : '<meta name="robots" content="noindex"/>');
  return result.replace(/<meta property="og:url"[^>]*>/, meta.url ? `<meta property="og:url" content="${meta.url}"/>` : '');
};

const home = withMetadata(fill(entry.render('/'), '/'), '/').replace('</head>', `${ld}</head>`);
writeFileSync(join(buildDir, 'index.html'), home);
const cookies = withMetadata(fill(entry.render('/cookies'), '/cookies'), '/cookies');
writeFileSync(join(buildDir, 'cookies.html'), cookies);
const notFound = withMetadata(fill(entry.render('/__vc-not-found__'), '*'), '*');
writeFileSync(join(buildDir, '404.html'), notFound);

rmSync(join(buildDir, '.prerender'), { recursive: true, force: true });
const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(1)} KB`;
console.log(`Prerendered build/index.html (${kb(home)}) build/cookies.html and build/404.html (${kb(notFound)}).`);
