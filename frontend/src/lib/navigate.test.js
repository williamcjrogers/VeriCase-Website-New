import { focusSection, onSectionClick } from './navigate';

describe('links into the optional worked example', () => {
  beforeEach(() => {
    document.body.innerHTML = '<details id="example"><summary>Explore the worked example</summary><section id="research"><h2 id="research-title" tabindex="-1">Ask questions</h2></section></details>';
    Element.prototype.scrollIntoView = jest.fn();
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 0);
    window.history.replaceState(null, '', '/');
  });
  afterEach(() => { jest.restoreAllMocks(); document.body.innerHTML = ''; });

  test('reveals a collapsed example before moving keyboard focus to the linked heading', () => {
    expect(focusSection('research', { smooth: false, updateHash: true })).toBe(true);
    expect(document.getElementById('example').open).toBe(true);
    expect(document.activeElement.id).toBe('research-title');
    expect(window.location.hash).toBe('#research');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
  });

  test('modified clicks leave the current disclosure and focus unchanged', () => {
    const event = { button: 0, ctrlKey: true, preventDefault: jest.fn() };
    onSectionClick('research')(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(document.getElementById('example').open).toBe(false);
  });

  test('a missing target does not open unrelated material or change the address', () => {
    expect(focusSection('missing', { updateHash: true })).toBe(false);
    expect(document.getElementById('example').open).toBe(false);
    expect(window.location.hash).toBe('');
  });
});
