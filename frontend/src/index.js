import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App';

const el = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// The build prerenders the home page and the 404 page. Their markup is hydrated only when it
// belongs to the page being opened; index.html has already cleared it otherwise.
if (el.hasChildNodes() && el.hasAttribute('data-prerendered')) {
  hydrateRoot(el, app);
} else {
  el.textContent = '';
  createRoot(el).render(app);
}
