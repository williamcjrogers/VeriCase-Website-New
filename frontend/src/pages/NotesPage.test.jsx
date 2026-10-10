import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { NotesPage } from './NotesPage';
import { LandingPage } from './LandingPage';
import { NOTES_PAGE } from '@/content/home';
import { noteByNumber } from '@/content/notes';
import { RESEARCH_SOURCES, UNUSED_DATA_SOURCE } from '@/content/researchSources';

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

it('retains numbered research round trips and the collaboration note beside the separate audience', async () => {
  await render(<LandingPage />, '/');
  expect(container.querySelector('[id^="note-"]')).toBeNull();
  const markers = [...container.querySelectorAll('.record-context-source[role="doc-noteref"]')];
  const sources = [...RESEARCH_SOURCES, UNUSED_DATA_SOURCE];
  expect(markers).toHaveLength(sources.length);
  for (const source of sources) {
    const marker = container.querySelector(`#research-ref-${source.number}`);
    const reference = container.querySelector(`#research-source-${source.number}`);
    expect(marker.getAttribute('href')).toBe(`#research-source-${source.number}`);
    expect(reference.querySelector('a').getAttribute('href')).toBe(source.url);
    expect(reference.querySelector('[role="doc-backlink"]').getAttribute('href')).toBe(`#research-ref-${source.number}`);
  }
  expect(container.querySelector('#collaboration .discussion-cost-links a[href="/notes#note-3"]')).not.toBeNull();
  expect(NOTES_PAGE.groups.flatMap((group) => group.notes)).toContain(3);
  // The audience follows the entire solution, with its own semantic section.
  const platform = container.querySelector('#platform');
  const audience = container.querySelector('.collaboration-audience-section');
  expect(audience).not.toBeNull();
  expect(platform.querySelector('.collaboration-audience')).toBeNull();
  expect(audience.previousElementSibling).toBe(platform);
  expect(audience.querySelector('#collaboration-audience-title').tagName).toBe('H2');
});
