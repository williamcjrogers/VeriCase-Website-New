// Joins edits separated only by a short run of unchanged tokens (no longer than the edit on either
// side), so that a rewritten word reads as one change and not as an interleave of coincidental
// matches. This is the semantic rule of diff-match-patch, in its simplest form.
function absorbShortEqualities(ops) {
  const segments = [];
  ops.forEach((op) => {
    const last = segments[segments.length - 1];
    if (op.type === 'equal') segments.push({ eq: op.tokens });
    else if (last && !last.eq) last[op.type === 'delete' ? 'del' : 'ins'].push(...op.tokens);
    else segments.push({ del: op.type === 'delete' ? [...op.tokens] : [], ins: op.type === 'insert' ? [...op.tokens] : [] });
  });
  const size = (s) => Math.max(s.del.length, s.ins.length);
  for (let k = 1; k < segments.length - 1; ) {
    const [before, eq, after] = segments.slice(k - 1, k + 2);
    if (eq.eq && !before.eq && !after.eq && eq.eq.length <= Math.min(size(before), size(after))) {
      segments.splice(k - 1, 3, { del: [...before.del, ...eq.eq, ...after.del], ins: [...before.ins, ...eq.eq, ...after.ins] });
      k = Math.max(1, k - 1);
    } else k += 1;
  }
  const out = [];
  const add = (type, tokens) => tokens.length && out.push({ type, tokens });
  segments.forEach((s) => {
    if (s.eq) add('equal', s.eq);
    else {
      add('delete', s.del);
      add('insert', s.ins);
    }
  });
  return out;
}

// Differences between two sequences of tokens (characters, or words), as runs of equal, inserted
// and deleted tokens. The common start and end are trimmed first; the middle is compared exactly
// (longest common subsequence) when it is small enough. A middle too large to compare, or one
// with less than half of its shorter side in common (a rewrite, whose few matches would be
// coincidences), is reported as one replacement.
export function diffTokens(a, b, limit = 250000) {
  const ops = [];
  const push = (type, tokens) => {
    if (!tokens.length) return;
    const last = ops[ops.length - 1];
    if (last && last.type === type) last.tokens.push(...tokens);
    else ops.push({ type, tokens: [...tokens] });
  };

  let start = 0;
  while (start < a.length && start < b.length && a[start] === b[start]) start += 1;
  let endA = a.length;
  let endB = b.length;
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA -= 1;
    endB -= 1;
  }

  push('equal', a.slice(0, start));
  const ma = a.slice(start, endA);
  const mb = b.slice(start, endB);
  if (ma.length * mb.length > limit) {
    push('delete', ma);
    push('insert', mb);
  } else {
    // table[i][j] is the length of the longest common subsequence of ma[i..] and mb[j..].
    const n = ma.length;
    const m = mb.length;
    const w = m + 1;
    const table = new Uint16Array((n + 1) * w);
    for (let i = n - 1; i >= 0; i -= 1) {
      for (let j = m - 1; j >= 0; j -= 1) {
        table[i * w + j] = ma[i] === mb[j] ? table[(i + 1) * w + j + 1] + 1 : Math.max(table[(i + 1) * w + j], table[i * w + j + 1]);
      }
    }
    // A rewrite skips the walk: what remains below is the whole middle, deleted then inserted.
    const rewrite = table[0] * 2 < Math.min(n, m);
    let i = 0;
    let j = 0;
    while (!rewrite && i < n && j < m) {
      if (ma[i] === mb[j]) {
        push('equal', [ma[i]]);
        i += 1;
        j += 1;
      } else if (table[(i + 1) * w + j] >= table[i * w + j + 1]) {
        push('delete', [ma[i]]);
        i += 1;
      } else {
        push('insert', [mb[j]]);
        j += 1;
      }
    }
    push('delete', ma.slice(i));
    push('insert', mb.slice(j));
  }
  push('equal', a.slice(endA));
  return absorbShortEqualities(ops);
}
