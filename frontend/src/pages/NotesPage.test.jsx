import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { NotesPage } from './NotesPage';
import { LandingPage } from './LandingPage';
import { NOTES_PAGE } from '@/content/home';
import { noteByNumber } from '@/content/notes';

// The notes have a page of their own: every note cited on the home page is there in full, each
// marker on the home page points to it, and each note links back to the section citing it.
let container;
let root;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 0);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
});
const render = async (page, path) => act(async () => {
  root.render(<MemoryRouter initialEntries={[path]}>{page}</MemoryRouter>);
});

it('sets out each note in full, with its way back to the text', async () => {
  await render(<NotesPage />, '/notes');
  expect(container.querySelector('h1').textContent).toBe(NOTES_PAGE.h1);
  for (const group of NOTES_PAGE.groups) {
    for (const n of group.notes) {
      const item = container.querySelector(`#note-${n}`);
      const note = noteByNumber(n);
      expect(item).not.toBeNull();
      expect(item.querySelector('.notes-title').textContent).toBe(note.title);
      expect(item.querySelectorAll('.notes-body')).toHaveLength([].concat(note.body).length);
      expect(item.querySelector('.notes-back').getAttribute('href')).toBe(`/#${group.id}`);
    }
  }
});

it('takes the notes off the home page, and points every marker there', async () => {
  await render(<LandingPage />, '/');
  expect(container.querySelector('[id^="note-"]')).toBeNull();
  const markers = [...container.querySelectorAll('[data-note-ref]')];
  expect(markers.length).toBeGreaterThan(0);
  const listed = NOTES_PAGE.groups.flatMap((g) => g.notes);
  for (const marker of markers) {
    const n = Number(marker.getAttribute('data-note-ref'));
    expect(marker.getAttribute('href')).toBe(`/notes#note-${n}`);
    expect(listed).toContain(n);
  }
  // Who it is for closes the collaboration section, after its illustrations.
  const audience = container.querySelector('#collaboration .collaboration-audience');
  expect(audience).not.toBeNull();
  expect(audience.previousElementSibling.matches('figure, .live-figure')).toBe(true);
  expect(audience.nextElementSibling).toBeNull();
});
