import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { DemoCTA } from './DemoCTA';
import { CONTACT_EMAIL } from '@/lib/site';
import { trackDemonstration } from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({ trackDemonstration: jest.fn() }));
let container;
let root;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  jest.clearAllMocks();
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  delete navigator.clipboard;
});

it.each([false, true])('announces visible manual-copy guidance when clipboard rejects, compact=%s', async (compact) => {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: jest.fn().mockRejectedValue(new Error('Denied')) } });
  act(() => root.render(<DemoCTA withCopy compact={compact} placement="hero" section="top" />));
  await act(async () => container.querySelector('button').click());
  const status = container.querySelector('[role="status"]');
  expect(status.textContent).toMatch(/Copy the email address manually/);
  expect(status.className).not.toContain('sr-only');
  expect(container.textContent).toContain(CONTACT_EMAIL);
  expect(trackDemonstration).not.toHaveBeenCalled();
});

it('provides manual-copy guidance when the clipboard API is unavailable', async () => {
  act(() => root.render(<DemoCTA withCopy compact />));
  await act(async () => container.querySelector('button').click());
  expect(container.querySelector('[role="status"]').textContent).toMatch(/Copy the email address manually/);
  expect(container.querySelector('a[href="mailto:' + CONTACT_EMAIL + '"]')).not.toBeNull();
});

it('announces and tracks a successful copy only after the clipboard resolves', async () => {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: jest.fn().mockResolvedValue() } });
  act(() => root.render(<DemoCTA withCopy placement="hero" section="top" />));
  await act(async () => container.querySelector('button').click());
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(CONTACT_EMAIL);
  expect(container.querySelector('[role="status"]').textContent).toMatch(/copied/i);
  expect(trackDemonstration).toHaveBeenCalledWith('hero', 'top', true);
});
