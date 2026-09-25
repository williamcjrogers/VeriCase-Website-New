import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { LandingPage } from '@/pages/LandingPage';
import { Login } from '@/pages/Login';
import { Cookies } from '@/pages/Cookies';
import { NotFound } from '@/pages/NotFound';
import { CookieConsent } from '@/components/CookieConsent';

// The routes the site serves. index.html uses the same list to decide whether the prerendered
// markup belongs to the page being opened (see public/index.html and src/index.js).
export const KNOWN_ROUTES = ['/', '/login', '/cookies', '/fileserver', '/Fileserver'];

// Hands the visitor on to the file server.
const ExternalRedirect = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-parchment">
      <div className="text-center" role="status">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-rule border-t-azure-500" aria-hidden="true" />
        <p className="text-caption text-graphite">Redirecting to the file server…</p>
      </div>
    </div>
  );
};

// The router is injected so that the build can prerender with a StaticRouter.
function App({ Router = BrowserRouter, routerProps = {} }) {
  return (
    <Router {...routerProps}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/Fileserver" element={<ExternalRedirect url="https://files.veri-case.com" />} />
        <Route path="/fileserver" element={<ExternalRedirect url="https://files.veri-case.com" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieConsent />
      <Toaster position="bottom-center" offset="calc(var(--consent-h, 0px) + 16px)" />
    </Router>
  );
}

export default App;
