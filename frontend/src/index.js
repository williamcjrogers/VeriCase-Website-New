import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@/index.css';
import App, { CALCULATOR_ROUTES, loadCalculators } from '@/App';

// Content that reveals itself on scroll is hidden only once this bundle runs (see index.css).
document.documentElement.classList.add('js');

const el = document.getElementById('root');
const app = (calculators) => (
  <React.StrictMode>
    <App calculators={calculators} />
  </React.StrictMode>
);

// The build prerenders the home page, the cookie notice, the two calculators and the 404 page.
// Their markup is hydrated only when it belongs to the page being opened; index.html has already
// cleared it otherwise. A calculator's chunk is loaded before its page is hydrated.
const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
if (el.hasChildNodes() && el.hasAttribute('data-prerendered')) {
  if (CALCULATOR_ROUTES.includes(path)) loadCalculators().then((calculators) => hydrateRoot(el, app(calculators)));
  else hydrateRoot(el, app());
} else {
  el.textContent = '';
  createRoot(el).render(app());
}
