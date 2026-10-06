import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { Cookies } from '@/pages/Cookies';
import { NotFound } from '@/pages/NotFound';
import { RouteMetadata } from '@/components/RouteMetadata';
import { SIGN_IN_URL } from '@/lib/site';
import { isShown } from '@/components/editorial/Gated';

// Neither renders anything before hydration, so both load as their own chunks once the page
// has mounted (rendering a lazy component during the prerender would leave a client-only
// boundary for hydration to report).
const CookieConsent = lazy(() => import('@/components/CookieConsent').then((m) => ({ default: m.CookieConsent })));
const Toaster = lazy(() => import('@/components/ui/sonner').then((m) => ({ default: m.Toaster })));

// The cost calculators are a chunk of their own. A prerendered calculator page is hydrated with
// the chunk already loaded (src/index.js and the prerender pass it in as `calculators`), so the
// markup matches; reached any other way, the page loads it first.
export const CALCULATOR_ROUTES = ['/discussion-cost', '/evidence-cost'];
export const loadCalculators = () => import('@/pages/calculators');
const LazyDiscussionCost = lazy(() => loadCalculators().then((m) => ({ default: m.DiscussionCost })));
const LazyEvidenceCost = lazy(() => loadCalculators().then((m) => ({ default: m.EvidenceCost })));
const CalculatorLoading = () => <div className="min-h-screen bg-parchment" role="status" aria-label="Loading the calculator" />;

// The routes the site serves. index.html uses the same list to decide whether the prerendered
// markup belongs to the page being opened (see public/index.html and src/index.js).
export const KNOWN_ROUTES = ['/', '/login', '/cookies', ...CALCULATOR_ROUTES, '/fileserver', '/Fileserver'];

// Hands the visitor on to the app's sign-in page or the file server.
const ExternalRedirect = ({ url, label }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-parchment">
      <div className="text-center" role="status">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-rule border-t-azure-500" aria-hidden="true" />
        <p className="text-caption text-graphite">{label}</p>
      </div>
    </div>
  );
};

// The router is injected so that the build can prerender with a StaticRouter.
function App({ Router = BrowserRouter, routerProps = {}, calculators = null }) {
  const DiscussionCost = calculators?.DiscussionCost || LazyDiscussionCost;
  const EvidenceCost = calculators?.EvidenceCost || LazyEvidenceCost;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <Router {...routerProps}>
      <RouteMetadata />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<ExternalRedirect url={SIGN_IN_URL} label="Redirecting to sign in…" />} />
        <Route path="/cookies" element={<Cookies />} />
        {isShown('G15_calculators') && <Route path="/discussion-cost" element={<Suspense fallback={<CalculatorLoading />}><DiscussionCost /></Suspense>} />}
        {isShown('G15_calculators') && <Route path="/evidence-cost" element={<Suspense fallback={<CalculatorLoading />}><EvidenceCost /></Suspense>} />}
        <Route path="/Fileserver" element={<ExternalRedirect url="https://files.veri-case.com" label="Redirecting to the file server…" />} />
        <Route path="/fileserver" element={<ExternalRedirect url="https://files.veri-case.com" label="Redirecting to the file server…" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {mounted && (
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
      )}
      {mounted && (
        <Suspense fallback={null}>
          <Toaster position="bottom-center" offset="calc(var(--consent-h, 0px) + 16px)" />
        </Suspense>
      )}
    </Router>
  );
}

export default App;
