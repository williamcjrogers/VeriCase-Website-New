#!/usr/bin/env node
// Builds the favicon and app icons from the genuine wordmark (public/logo-reversed.svg), so the
// icons always match it: parchment V, brass rule and C on the header's ink green.
//   public/favicon.svg, favicon.ico (16, 32, 48), favicon-32.png: the V alone, which stays legible
//     in a 16 px browser tab.
//   public/apple-touch-icon.png (180), icon-192.png, icon-512.png: the V | C monogram, full bleed,
//     inside the maskable safe zone (platforms round the corners themselves).
// Run by hand after changing the wordmark (it needs Playwright with Chromium, as render-og.mjs
// does; set PLAYWRIGHT_MODULE if it is not resolvable from here). The outputs are committed.
import { readFileSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = (name) => join(root, 'public', name);
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const INK = '#0B2516'; // --vc-ink, the header ground and the page's theme colour
const PARCHMENT = '#E8DCC8'; // the wordmark's "VERI"
const BRASS = '#C4A05A'; // the wordmark's rule and "CASE"

// The wordmark's first path is the V and its fifth the C; their boxes, measured in the
// wordmark's own units, place them.
const wordmark = readFileSync(pub('logo-reversed.svg'), 'utf8');
const paths = [...wordmark.matchAll(/<path[^>]* d="([^"]+)"/g)].map((m) => m[1]);
const [V, C] = [paths[0], paths[4]];
const V_BOX = { x: 47.64, y: 70.6, w: 48.82, h: 45.22 };
const C_X = 275.5;

// Tab icon: the V, with a brass rule beneath it, on a rounded square. A same-colour stroke
// carries the light serif at small sizes.
const tab = () => {
  const side = 72;
  const tx = (side - V_BOX.w) / 2 - V_BOX.x;
  const ty = 9.5 - V_BOX.y;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}">
<rect width="${side}" height="${side}" rx="13" fill="${INK}"/>
<path transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)})" d="${V}" fill="${PARCHMENT}" stroke="${PARCHMENT}" stroke-width="2.6" stroke-linejoin="round"/>
<rect x="18" y="58.5" width="36" height="4.5" fill="${BRASS}"/>
</svg>
`;
};

// App icon: V | C as in the wordmark (V 0 to 48.82, rule 57.8 to 60.2, C from 69.2), centred
// on a full-bleed square with the block inside the central 80% safe circle.
const app = () => {
  const side = 180;
  const blockWidth = 111.25;
  const centreY = 93.2;
  const tx = (side - blockWidth) / 2;
  const ty = side / 2 - centreY;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}">
<rect width="${side}" height="${side}" fill="${INK}"/>
<g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)})" stroke-linejoin="round">
<path transform="translate(${-V_BOX.x} 0)" d="${V}" fill="${PARCHMENT}" stroke="${PARCHMENT}" stroke-width="2.2"/>
<rect x="57.8" y="59.85" width="2.4" height="66.7" fill="${BRASS}"/>
<path transform="translate(${(69.2 - C_X).toFixed(2)} 0)" d="${C}" fill="${BRASS}" stroke="${BRASS}" stroke-width="2.2"/>
</g>
</svg>
`;
};

const browser = await chromium.launch();
const render = async (svg, size) => {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`);
  const png = await page.screenshot({ type: 'png', omitBackground: true });
  await page.close();
  return png;
};

// An ICO file that embeds PNG images (supported by every current browser).
const ico = (images) => {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, png }, i) => {
    const at = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, at);
    header.writeUInt8(size >= 256 ? 0 : size, at + 1);
    header.writeUInt16LE(1, at + 4);
    header.writeUInt16LE(32, at + 6);
    header.writeUInt32LE(png.length, at + 8);
    header.writeUInt32LE(offset, at + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.png)]);
};

const tabSvg = tab();
const appSvg = app();
writeFileSync(pub('favicon.svg'), tabSvg);
writeFileSync(pub('favicon-32.png'), await render(tabSvg, 32));
writeFileSync(pub('favicon.ico'), ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, png: await render(tabSvg, size) })))));
writeFileSync(pub('apple-touch-icon.png'), await render(appSvg, 180));
writeFileSync(pub('icon-192.png'), await render(appSvg, 192));
writeFileSync(pub('icon-512.png'), await render(appSvg, 512));
await browser.close();

for (const name of ['favicon.svg', 'favicon.ico', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png']) {
  console.log(`Wrote public/${name} (${(statSync(pub(name)).size / 1024).toFixed(1)} KB).`);
}
