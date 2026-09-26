// A citation keeps the punctuation after it on its own line, a mark never starts or ends on bare
// punctuation, and dates stay whole inside the redline.
import { renderToStaticMarkup } from 'react-dom/server';
import { CitedText, Redline, citeParts } from './CitedText';

// The chip stands in as a plain button: the real one reaches the Source sheet's Radix dialog,
// whose package exports this test runner (Jest 27) cannot resolve.
jest.mock('@/components/mock/EvidenceChip', () => {
  const React = require('react');
  return { EvidenceChip: ({ id }) => React.createElement('button', { type: 'button', className: 'ev-chip' }, `[${id}]`) };
});

const html = (el) => renderToStaticMarkup(el);

describe('citeParts', () => {
  it('takes a citation and the punctuation straight after it as one part', () => {
    expect(citeParts('as a Change [EV-0131], and on [EV-0133].')).toEqual([
      { text: 'as a Change ' },
      { id: 'EV-0131', punct: ',' },
      { text: ' and on ' },
      { id: 'EV-0133', punct: '.' },
    ]);
    expect(citeParts('[EV-0138]')).toEqual([{ id: 'EV-0138', punct: '' }]);
  });
});

describe('CitedText', () => {
  it('sets each citation and its punctuation in one no-wrap span, and keeps dates whole', () => {
    const out = html(<CitedText text="acted on it on 05 March 2025 [EV-0133]." />);
    expect(out).toContain('05\u00a0March\u00a02025');
    expect(out).toMatch(/<span class="cr-cite"><button[^>]*>\[EV-0133\]<\/button><span class="cr-cite-end">\.<\/span><\/span>$/);
  });

  it('draws inert look-alike chips for the strike-through overlay', () => {
    const out = html(<CitedText text="before 26 March 2025 [EV-0139]." inert />);
    expect(out).not.toContain('<button');
    expect(out).toContain('<span class="ev-chip">[EV-0139]</span><span class="cr-cite-end">.</span>');
  });
});

describe('Redline', () => {
  const before = 'Denied. Delay was not reasonably apparent until 26 March 2025.';
  const after = 'Denied. The email of 12 March 2025 gave a lead time [EV-0138]. Notice followed two days later [EV-0151].';

  it('ends the inserted run on the chip and keeps the full stop outside it, on the chip\'s line', () => {
    const out = html(<Redline before={before} after={after} side="after" />);
    expect(out).toMatch(/<span class="cr-cite"><ins class="cr-ins"><button[^>]*>\[EV-0151\]<\/button><\/ins>\.<\/span>$/);
    // No inserted run begins or ends on bare punctuation.
    for (const [, run] of out.matchAll(/<ins class="cr-ins">(.*?)<\/ins>/g)) {
      const text = run.replace(/<[^>]+>/g, '');
      expect(text).not.toMatch(/^[.,;:]/);
      expect(text).not.toMatch(/(^|\s|\])[.,;:]+$/);
    }
    expect(out).toContain('12\u00a0March\u00a02025');
  });

  it('strikes the deleted words on the "before" side and compares a date as one word', () => {
    const out = html(<Redline before={before} after={after} side="before" />);
    expect(out).toBe('Denied. <del class="cr-del">Delay was not reasonably apparent until 26\u00a0March\u00a02025.</del>');
  });

  it('sets punctuation standing alone at either end of a run outside the mark', () => {
    const out = html(<Redline before="Denied [EV-0138]" after="Denied [EV-0138] , as stated ." side="after" />);
    expect(out).toContain(', <ins class="cr-ins">as stated</ins> .');
  });
});
