import { renderToString } from 'react-dom/server';
import { ResearchFigure } from './RecordContext';

it.each([
  ['40,000', 'emails'],
  ['5.5', 'hours a week'],
  ['18%', 'of project time'],
])('keeps %s exact and readable without motion', (value, unit) => {
  const container = document.createElement('div');
  container.innerHTML = renderToString(<ResearchFigure value={value} unit={unit} />);
  expect(container.querySelector('.sr-only').textContent.trim()).toBe(value);
  expect(container.querySelector('.record-context-unit').textContent).toBe(unit);
  const visual = container.querySelector('.stat-digits');
  expect(visual.getAttribute('aria-hidden')).toBe('true');
  const settled = [...visual.children].map((slot) => slot.classList.contains('stat-digit')
    ? slot.querySelector('.stat-reel').lastElementChild.textContent
    : slot.textContent).join('');
  expect(settled).toBe(value);
  expect(container.querySelector('.is-in-view')).toBeNull();
});
