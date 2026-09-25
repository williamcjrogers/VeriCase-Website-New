import { diffTokens } from './diff';

// The two sides a diff describes: equal and deleted tokens give the old text, equal and
// inserted tokens the new one.
const sides = (ops) => ({
  before: ops.filter((o) => o.type !== 'insert').flatMap((o) => o.tokens).join(''),
  after: ops.filter((o) => o.type !== 'delete').flatMap((o) => o.tokens).join(''),
});
const chars = (s) => Array.from(s);
const text = 'Stainless brackets are ten weeks from order. Cladding to Levels 3 to 6 cannot start until they arrive.';

describe('diffTokens', () => {
  it('reports identical input as one equal run', () => {
    expect(diffTokens(chars(text), chars(text))).toEqual([{ type: 'equal', tokens: chars(text) }]);
  });

  it('isolates a single inserted, deleted or replaced character', () => {
    const inserted = diffTokens(chars(text), chars(text.replace('order.', 'order!.')));
    expect(inserted.filter((o) => o.type !== 'equal')).toEqual([{ type: 'insert', tokens: ['!'] }]);
    const deleted = diffTokens(chars(text), chars(text.replace('ten', 'tn')));
    expect(deleted.filter((o) => o.type !== 'equal')).toEqual([{ type: 'delete', tokens: ['e'] }]);
    const replaced = diffTokens(chars(text), chars(text.replace('ten', 'tan')));
    expect(replaced.filter((o) => o.type !== 'equal').map((o) => [o.type, o.tokens.join('')])).toEqual([
      ['delete', 'e'],
      ['insert', 'a'],
    ]);
  });

  it('reads a replaced word as one change, not an interleave', () => {
    const ops = diffTokens(chars('the supplier has'), chars('the builder has'));
    expect(ops.map((o) => [o.type, o.tokens.join('')])).toEqual([
      ['equal', 'the '],
      ['delete', 'suppli'],
      ['insert', 'build'],
      ['equal', 'er has'],
    ]);
  });

  it('reports a rewrite as one replacement', () => {
    const ops = diffTokens(chars(`${text} A`), chars('Nothing of the original remains here, not one line of it. A'));
    expect(ops.map((o) => o.type)).toEqual(['delete', 'insert', 'equal']);
  });

  it('replaces a middle too large to compare', () => {
    const ops = diffTokens(chars('abc'), chars('xyz'), 4);
    expect(ops.map((o) => o.type)).toEqual(['delete', 'insert']);
  });

  it('always describes both sides exactly', () => {
    let seed = 7;
    const rnd = (n) => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed % n;
    };
    for (let run = 0; run < 200; run += 1) {
      const a = chars(text);
      const b = [...a];
      for (let edits = 1 + rnd(4); edits > 0; edits -= 1) {
        const at = rnd(b.length);
        if (rnd(2)) b.splice(at, 1 + rnd(3));
        else b.splice(at, 0, ...chars('xyz').slice(0, 1 + rnd(3)));
      }
      expect(sides(diffTokens(a, b))).toEqual({ before: a.join(''), after: b.join('') });
    }
  });
});
