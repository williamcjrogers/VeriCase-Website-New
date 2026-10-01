// In-page navigation that also moves focus: to the section's heading (`${id}-title`, which
// carries tabIndex -1), else to the section itself. Smooth unless reduced motion is set.

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Figures mount as the page scrolls past them, and one that settles at a slightly different height
// moves everything below it. Once the scroll has been still for a few frames, land on the section
// again if it has moved, unless the reader has taken over the scroll in the meantime.
function settleOn(section) {
  let last = NaN;
  let still = 0;
  let frames = 0;
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
  events.forEach((e) => window.addEventListener(e, cancel, { once: true, passive: true }));
  const done = () => events.forEach((e) => window.removeEventListener(e, cancel));
  const check = () => {
    if (cancelled) return done();
    frames += 1;
    still = window.scrollY === last ? still + 1 : 0;
    last = window.scrollY;
    if (still < 4 && frames < 180) return requestAnimationFrame(check);
    done();
    const want = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    if (Math.abs(section.getBoundingClientRect().top - want) > 4) section.scrollIntoView({ behavior: 'auto', block: 'start' });
    return undefined;
  };
  requestAnimationFrame(check);
}

export function focusSection(id, { smooth = true, updateHash = false } = {}) {
  const section = document.getElementById(id);
  if (!section) return false;
  // A deep link can target the optional worked example while it is collapsed.
  for (let parent = section.parentElement; parent; parent = parent.parentElement) {
    if (parent.tagName === 'DETAILS') parent.open = true;
  }
  const heading = document.getElementById(`${id}-title`) || section;
  if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
  section.scrollIntoView({ behavior: smooth && !reducedMotion() ? 'smooth' : 'auto', block: 'start' });
  heading.focus({ preventScroll: true });
  settleOn(section);
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
