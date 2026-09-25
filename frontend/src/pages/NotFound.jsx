import { Navigation } from '@/components/sections/Navigation';
import { SiteFooter } from '@/components/sections/SiteFooter';

export const NotFound = () => (
  <>
    <Navigation />
    <main id="main" className="bg-white">
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Page not found</p>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          There is no record at this address.
        </h1>
        <p className="mt-4 text-gray-600">The page may have moved, or the link may be mistyped.</p>
        <a href="/" className="mt-8 inline-block font-semibold text-teal-700 underline">Return to the home page</a>
      </div>
    </main>
    <SiteFooter />
  </>
);
