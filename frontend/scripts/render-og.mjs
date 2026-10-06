#!/usr/bin/env node
// Renders og/og.html to public/og-card.png at 1200 x 630 for Open Graph and Twitter cards.
// Run by hand after changing the card (it needs a Playwright install with Chromium; set
// PLAYWRIGHT_MODULE to its path if it is not resolvable from here). The PNG is committed, so the
// site build does not depend on a browser.
import { statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(join(root, 'og', 'og.html')).href, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
// A new file name makes social platforms fetch the card again instead of showing a cached copy.
const out = join(root, 'public', 'og-card.png');
await page.screenshot({ path: out, type: 'png' });
await browser.close();
console.log(`Wrote public/og-card.png (${(statSync(out).size / 1024).toFixed(0)} KB).`);
