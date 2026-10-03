import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { Cookies } from './Cookies';
import { NotFound } from './NotFound';
import { HOME_NAV } from '@/content/home';
import { focusSection } from '@/lib/navigate';

let container;
let root;
let frames;
const legacy = ['chronology-lens', 'research', 'case-room', 'integrity', 'clock', 'claims', 'notes'];
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  frames = [];
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => { frames.push(callback); return frames.length; });
  Element.prototype.scrollIntoView = jest.fn();
  window.history.replaceState(null, '', '/');
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
});
const render = async (page = <LandingPage />, path = '/') => act(async () => {
  root.render(<MemoryRouter initialEntries={[path]}>{page}</MemoryRouter>);
});

it('mounts unique real destinations for navigation and all supported legacy fragments', async () => {
  await render();
  for (const id of new Set([...HOME_NAV.map((item) => item.id), ...legacy])) {
    expect(container.querySelectorAll(`[id="${id}"]`)).toHaveLength(1);
    expect(focusSection(id, { smooth: false })).toBe(true);
    const target = document.getElementById(id);
    const heading = document.getElementById(`${id}-title`) || document.getElementById(target.getAttribute('aria-labelledby'));
    expect(heading).not.toBeNull();
    expect(document.activeElement).toBe(heading);
  }
});

it('gives every region landmark a distinct name', async () => {
  await render();
  const name = (el) => (el.getAttribute('aria-label')
    || (el.getAttribute('aria-labelledby') || '').split(/\s+/).map((id) => document.getElementById(id)?.textContent.trim()).join(' ')).trim();
  const regions = [...container.querySelectorAll('section[aria-label], section[aria-labelledby], [role="region"]')].map(name);
  expect(regions.length).toBeGreaterThan(0);
  expect(regions.filter((n, i) => regions.indexOf(n) !== i)).toEqual([]);
});

it('follows an initial legacy fragment to its mounted heading', async () => {
  window.history.replaceState(null, '', '/#research');
  await render();
  const initialFrames = frames.splice(0);
  act(() => initialFrames.forEach((callback) => callback()));
  expect(document.activeElement.id).toBe('research-title');
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
});

it.each([['/cookies', Cookies], ['/missing-page', NotFound]])('sends section navigation back home from %s', async (path, Page) => {
  await render(<Page />, path);
  const links = [...container.querySelectorAll('a[href*="#"]')].filter((link) => link.getAttribute('href') !== '#main');
  expect(links.length).toBeGreaterThan(0);
  for (const link of links) expect(link.getAttribute('href')).toMatch(/^\/#.+/);
});

it('expands every profile and question for print and restores each prior state afterwards', async () => {
  await render();
  const disclosures = [...container.querySelectorAll('#about details, details.clarity-question')];
  expect(disclosures).toHaveLength(10);
  disclosures[1].open = true;
  disclosures[7].open = true;
  const previous = disclosures.map((details) => details.open);
  act(() => window.dispatchEvent(new Event('beforeprint')));
  expect(disclosures.every((details) => details.open)).toBe(true);
  // Some browsers repeat beforeprint while the print preview is open.
  act(() => window.dispatchEvent(new Event('beforeprint')));
  act(() => window.dispatchEvent(new Event('afterprint')));
  expect(disclosures.map((details) => details.open)).toEqual(previous);
});

it('removes print handlers on unmount and restores disclosures if printing is interrupted', async () => {
  const add = jest.spyOn(window, 'addEventListener');
  const remove = jest.spyOn(window, 'removeEventListener');
  await render();
  const disclosures = [...container.querySelectorAll('#about details, details.clarity-question')];
  disclosures[0].open = true;
  const previous = disclosures.map((details) => details.open);
  act(() => window.dispatchEvent(new Event('beforeprint')));
  expect(disclosures.every((details) => details.open)).toBe(true);
  const registered = add.mock.calls.filter(([event]) => ['beforeprint', 'afterprint'].includes(event));
  expect(registered.map(([event]) => event).sort()).toEqual(['afterprint', 'beforeprint']);
  act(() => root.render(null));
  for (const [event, handler] of registered) expect(remove).toHaveBeenCalledWith(event, handler);
  expect(disclosures.map((details) => details.open)).toEqual(previous);
  act(() => window.dispatchEvent(new Event('beforeprint')));
  expect(disclosures.map((details) => details.open)).toEqual(previous);
});
