import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { ProductFigure, PRODUCT_VIEWS } from './ProductFigure';

let container;
let root;
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => { root.unmount(); await tick(); });
  container.remove();
});
const render = async (content = <ProductFigure kind="reader" />) => act(async () => root.render(content));
const open = async (trigger) => {
  await act(async () => { trigger.focus(); trigger.click(); await tick(); });
  return document.querySelector('[role="dialog"]');
};
const key = (target, value, shiftKey = false) => act(() => target.dispatchEvent(new KeyboardEvent('keydown', { key: value, shiftKey, bubbles: true, cancelable: true })));

it('opens a named modal, moves focus inside and restores trigger focus on Escape', async () => {
  await render();
  const trigger = container.querySelector('button');
  const dialog = await open(trigger);
  expect(dialog).not.toBeNull();
  expect(document.getElementById(dialog.getAttribute('aria-labelledby')).textContent).toBe(PRODUCT_VIEWS.reader.title);
  expect(document.getElementById(dialog.getAttribute('aria-describedby')).textContent).toContain(PRODUCT_VIEWS.reader.caption);
  expect(dialog.contains(document.activeElement)).toBe(true);
  // Radix implements modal semantics with background accessibility isolation.
  expect(container.getAttribute('aria-hidden')).toBe('true');
  key(document.activeElement, 'Escape');
  await act(async () => { await tick(); });
  expect(document.querySelector('[role="dialog"]')).toBeNull();
  expect(document.activeElement).toBe(trigger);
});

it('wraps keyboard focus at both dialog boundaries and closes using the visible control', async () => {
  await render();
  const trigger = container.querySelector('button');
  const dialog = await open(trigger);
  const close = dialog.querySelector('button');
  const inspect = dialog.querySelector('[role="region"]');
  act(() => close.focus());
  key(close, 'Tab', true);
  expect(document.activeElement).toBe(inspect);
  key(inspect, 'Tab');
  expect(document.activeElement).toBe(close);
  act(() => trigger.focus());
  expect(dialog.contains(document.activeElement)).toBe(true);
  act(() => close.click());
  await act(async () => { await tick(); });
  expect(document.querySelector('[role="dialog"]')).toBeNull();
  expect(document.activeElement).toBe(trigger);
});

it('opens the selected capture when several figures share a page', async () => {
  await render(<><ProductFigure kind="reader" /><ProductFigure kind="search" /></>);
  const dialog = await open(container.querySelectorAll('button')[1]);
  expect(dialog.querySelector('img').getAttribute('src')).toContain(PRODUCT_VIEWS.search.file);
  expect(dialog.textContent).toContain(PRODUCT_VIEWS.search.caption);
});

it('preserves the caption and meaningful alternative when the preview image fails', async () => {
  await render();
  act(() => container.querySelector('img').dispatchEvent(new Event('error')));
  expect(container.querySelector('[role="status"]').textContent).toContain(PRODUCT_VIEWS.reader.alt);
  expect(container.querySelector('figcaption').textContent).toContain(PRODUCT_VIEWS.reader.caption);
  expect(container.querySelector('button').getAttribute('aria-label')).toBe(`Read image description: ${PRODUCT_VIEWS.reader.title}`);
});

it('keeps a stable focus return target when the enlarged image fails', async () => {
  await render();
  const trigger = container.querySelector('button');
  const dialog = await open(trigger);
  act(() => dialog.querySelector('img').dispatchEvent(new Event('error')));
  expect(dialog.querySelector('[role="status"]').textContent).toContain(PRODUCT_VIEWS.reader.alt);
  expect(container.querySelector('button')).toBe(trigger);
  key(document.activeElement, 'Escape');
  await act(async () => { await tick(); });
  expect(document.querySelector('[role="dialog"]')).toBeNull();
  expect(document.activeElement).toBe(trigger);
  expect(trigger.getAttribute('aria-label')).toContain('Read image description');
});
