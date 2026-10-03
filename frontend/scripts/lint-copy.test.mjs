import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = fileURLToPath(new URL('..', import.meta.url));

test('the approved sector list does not exempt restricted names elsewhere', () => {
  const fixtureDir = mkdtempSync(join(root, 'src/content/copy-check-fixture-'));
  const sectorList = 'water, power, rail, highways, infrastructure and residential sectors';
  try {
    for (const [copy, allowed] of [
      [`Experience across the ${sectorList}.`, true],
      ['Highways', false],
      ['Experience across rail, highways and residential sectors.', false],
      [`Experience across the ${sectorList}. Highways`, false],
    ]) {
      writeFileSync(join(fixtureDir, 'copy.json'), JSON.stringify({ copy }));
      const result = spawnSync(process.execPath, ['scripts/lint-copy.mjs'], {
        cwd: root,
        encoding: 'utf8',
        env: { ...process.env, COPY_CHECK: '', VERCEL_ENV: 'production' },
      });
      assert.equal(result.status, allowed ? 0 : 1, result.stdout + result.stderr);
      if (!allowed) assert.match(result.stderr, /restricted name/);
    }
  } finally {
    rmSync(fixtureDir, { recursive: true, force: true });
  }
});

test('rejects superseded promises while allowing qualified construction-task copy', () => {
  const fixtureDir = mkdtempSync(join(root, 'src/content/copy-check-fixture-'));
  try {
    for (const [copy, rule] of [
      ['We reconstruct truth.', 'truth guarantee'],
      ['Forensic-grade AI turns records into winning strategies.', 'outcome claim'],
      ['There is a gold rush around AI.', 'fear-based urgency'],
      ['VeriCase does that not in days, weeks, or months, but in minutes.', 'unsubstantiated speed claim'],
      ['Immutable originals with WORM storage.', 'immutable storage claim'],
      ['We do not describe VeriCase’s outputs as court-ready or admissible, but we guarantee victory.', 'outcome claim'],
    ]) {
      writeFileSync(join(fixtureDir, 'copy.json'), JSON.stringify({ copy }));
      const result = spawnSync(process.execPath, ['scripts/lint-copy.mjs'], {
        cwd: root, encoding: 'utf8', env: { ...process.env, COPY_CHECK: '', VERCEL_ENV: 'production' },
      });
      assert.equal(result.status, 1, result.stdout + result.stderr);
      assert.ok(result.stderr.includes(rule), result.stdout + result.stderr);
    }
    writeFileSync(join(fixtureDir, 'copy.json'), JSON.stringify({ copy: 'Build your construction case from the evidence. Review the sources and approve the claim or response before it is issued.' }));
    const result = spawnSync(process.execPath, ['scripts/lint-copy.mjs'], {
      cwd: root, encoding: 'utf8', env: { ...process.env, COPY_CHECK: '', VERCEL_ENV: 'production' },
    });
    assert.equal(result.status, 0, result.stdout + result.stderr);
  } finally {
    rmSync(fixtureDir, { recursive: true, force: true });
  }
});
