import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { useActiveSection } from './useActiveSection';

let fixture;
let container;
let root;
let observers;
let originalObserver;
const IDS = ['platform', 'worked-example', 'collaboration', 'about'];

function Reader({ ids = IDS, enabled = true }) {
  const active = useActiveSection(ids, { enabled });
  return <output>{active || 'none'}</output>;
}

beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  originalObserver = global.IntersectionObserver;
  observers = [];
  global.IntersectionObserver = jest.fn((callback, options) => {
    const observer = { callback, options, observe: jest.fn(), disconnect: jest.fn() };
    observers.push(observer);
    return observer;
  });
  fixture = document.createElement('main');
  fixture.innerHTML = '<section id="platform"><section id="worked-example"></section><section id="collaboration"></section></section><section id="about"></section>';
  container = document.createElement('div');
  document.body.append(fixture, container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  fixture.remove();
  container.remove();
  global.IntersectionObserver = originalObserver;
});

const render = (props = {}) => act(() => root.render(<Reader {...props} />));
const notify = (...entries) => act(() => observers.at(-1).callback(entries.map(([id, isIntersecting]) => ({ target: document.getElementById(id), isIntersecting }))));
const active = () => container.querySelector('output').textContent;

it.each(['worked-example', 'collaboration'])('selects visible nested %s ahead of platform and restores the platform fallback', (id) => {
  render();
  expect(observers[0].observe.mock.calls.map(([el]) => el.id)).toEqual(IDS);
  expect(observers[0].options).toEqual({ rootMargin: '-30% 0px -69% 0px', threshold: 0 });
  notify(['platform', true], [id, true]);
  expect(active()).toBe(id);
  notify([id, false]);
  expect(active()).toBe('platform');
  notify(['platform', false]);
  expect(active()).toBe('none');
});

it('selects the deepest child over all visible ancestors', () => {
  const child = document.createElement('section');
  child.id = 'bundle-detail';
  document.getElementById('worked-example').appendChild(child);
  render({ ids: ['platform', 'worked-example', 'bundle-detail'] });
  notify(['bundle-detail', true], ['worked-example', true], ['platform', true]);
  expect(active()).toBe('bundle-detail');
});

it('uses registry order for unrelated visible ties regardless of notification order', () => {
  render();
  notify(['collaboration', true], ['about', true], ['worked-example', true], ['platform', true]);
  expect(active()).toBe('worked-example');
  notify(['worked-example', false]);
  expect(active()).toBe('collaboration');
});

it('clears active state and disconnects when disabled, then starts afresh when enabled', () => {
  render();
  notify(['collaboration', true]);
  expect(active()).toBe('collaboration');
  const first = observers[0];
  render({ enabled: false });
  expect(first.disconnect).toHaveBeenCalledTimes(1);
  expect(active()).toBe('none');
  expect(observers).toHaveLength(1);
  render();
  expect(observers).toHaveLength(2);
  expect(active()).toBe('none');
});

it('ignores missing destinations and supports browsers without IntersectionObserver', () => {
  render({ ids: ['missing'] });
  expect(observers).toHaveLength(0);
  expect(active()).toBe('none');
  global.IntersectionObserver = undefined;
  render();
  expect(active()).toBe('none');
});

it('disconnects the reading-line observer on unmount', () => {
  render();
  const observer = observers[0];
  act(() => root.render(null));
  expect(observer.disconnect).toHaveBeenCalledTimes(1);
});
