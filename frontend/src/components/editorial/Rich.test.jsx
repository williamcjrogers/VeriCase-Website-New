import { renderToStaticMarkup } from 'react-dom/server';
import { Rich, plainText } from './Rich';

it('renders bold and italic copy together and keeps dates unbroken inside bold text', () => {
  const container = document.createElement('div');
  container.innerHTML = renderToStaticMarkup(
    <Rich text="A **Deep Research** report dated **10 October 2026**, with *source review*." />
  );

  expect([...container.querySelectorAll('strong')].map((node) => node.textContent)).toEqual([
    'Deep Research',
    '10\u00a0October\u00a02026',
  ]);
  expect(container.querySelector('em').textContent).toBe('source review');
  expect(container.textContent).toBe('A Deep Research report dated 10\u00a0October\u00a02026, with source review.');
});

it('removes bold and italic markup from plain text while preserving evidence references', () => {
  expect(plainText('Use **Deep Research** and *source review*: [[ev:EV-0131]], [[c:EV-0138]][[note:3]].'))
    .toBe('Use Deep Research and source review: EV-0131, EV-0138.');
});
