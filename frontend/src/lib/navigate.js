// In-page navigation that also moves focus: to the section's heading (`${id}-title`, which
// carries tabIndex -1), else to the section itself. Smooth unless reduced motion is set.

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function focusSection(id, { smooth = true, updateHash = false } = {}) {
  const section = document.getElementById(id);
  if (!section) return false;
  const heading = document.getElementById(`${id}-title`) || section;
  if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
  section.scrollIntoView({ behavior: smooth && !reducedMotion() ? 'smooth' : 'auto', block: 'start' });
  heading.focus({ preventScroll: true });
  if (updateHash && window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
  return true;
}

// Anchors to home-page sections: "#id" on the home page, "/#id" anywhere else, so none is dead.
export const sectionHref = (id, onHome) => (onHome ? `#${id}` : `/#${id}`);

// Click handler for a section anchor on the home page. Leaves modified clicks to the browser.
export const onSectionClick = (id) => (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (!document.getElementById(id)) return;
  e.preventDefault();
  focusSection(id, { updateHash: true });
};
