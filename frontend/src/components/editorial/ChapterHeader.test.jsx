import { renderToStaticMarkup } from 'react-dom/server';
import { ChapterHeader } from './ChapterHeader';
import { GATES } from '@/content/gates';
import { CLAIMS } from '@/content/home';
import { plainText } from './Rich';

const render = (props) => {
  const container = document.createElement('div');
  container.innerHTML = renderToStaticMarkup(<ChapterHeader {...props} />);
  return container;
};

it('keeps a focusable h2 by default and accepts the chapter h3, numeral and explicit margin label', () => {
  const defaults = render({ id: 'research', title: 'A cited answer.' });
  expect(defaults.querySelector('h2#research-title').tabIndex).toBe(-1);
  expect(defaults.querySelector('.ch-note').textContent).toBe('Ask your evidence');
  const chapter = render({ id: 'research', as: 'h3', numeral: 'II', label: 'Custom margin label', title: 'A cited answer.' });
  expect(chapter.querySelector('h2')).toBeNull();
  expect(chapter.querySelector('h3#research-title').tabIndex).toBe(-1);
  expect(chapter.querySelector('.ch-note').textContent).toBe('Custom margin label');
  expect(chapter.querySelector('.ch-numeral').getAttribute('aria-hidden')).toBe('true');
  expect(chapter.querySelector('.ch-side .sr-only').textContent).toBe('Chapter II: ');
});

it('keeps the publication gate on a lead and preserves ordinary ungated leads', () => {
  const previous = GATES.G5_claims.status;
  try {
    GATES.G5_claims.status = 'struck';
    const gated = render({ id: 'claims', title: 'Develop the argument.', lead: 'A gated lead promise.', leadGate: 'G5_claims' });
    expect(gated.textContent).not.toContain('A gated lead promise.');
    expect(gated.querySelector('h2').textContent).toContain('Develop the argument.');
    const plain = render({ title: 'Review.', lead: 'Review the sources.' });
    expect(plain.textContent).toContain('Review the sources.');
    GATES.G5_claims.status = 'confirmed';
    expect(render({ title: 'Develop.', lead: 'A gated lead promise.', leadGate: 'G5_claims' }).textContent).toContain('A gated lead promise.');
  } finally {
    GATES.G5_claims.status = previous;
  }
});

it('keeps spaces between visual sentence lines so the accessible heading reads the approved copy', () => {
  const title = 'Many threads. One order of events.';
  const chapter = render({ id: 'chronology-lens', as: 'h3', title });
  const heading = chapter.querySelector('h3');
  expect(heading.querySelectorAll('span.block')).toHaveLength(2);
  expect(heading.textContent).toBe(title);
});

it('preserves bold report copy within its publication gate and removes it when struck', () => {
  const previous = GATES.G5_research.status;
  const props = { id: 'worked-example', title: CLAIMS.h2, lead: CLAIMS.lead, leadGate: CLAIMS.leadGate };
  try {
    expect(CLAIMS.leadGate).toBe('G5_research');
    GATES.G5_research.status = 'confirmed';
    const confirmed = render(props);
    expect(confirmed.querySelector('.text-lead strong').textContent).toBe('Deep Research');
    expect(confirmed.querySelector('.text-lead').textContent).toBe(plainText(CLAIMS.lead));

    GATES.G5_research.status = 'struck';
    const struck = render(props);
    expect(struck.querySelector('strong')).toBeNull();
    expect(struck.textContent).not.toContain(plainText(CLAIMS.lead));
    expect(struck.querySelector('h2').textContent).toBe(CLAIMS.h2);
  } finally {
    GATES.G5_research.status = previous;
  }
});
