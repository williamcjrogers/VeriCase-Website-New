import { Navigation } from '@/components/sections/Navigation';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { Button } from '@/components/ui/button';

export const Cookies = () => {
  const openSettings = () => window.dispatchEvent(new Event('vc-open-cookie-settings'));

  return (
    <>
      <Navigation />
      <main id="main" className="bg-white">
        <article className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-gray-700 leading-relaxed">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Cookie notice
          </h1>
          <p className="mb-6">
            This notice explains the cookies and similar technologies used on this website, and how you can control them.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-3">Analytics (only with your consent)</h2>
          <p className="mb-4">
            With your consent, we use PostHog analytics to understand how visitors use this website, so that we can improve it. PostHog sets a cookie and uses browser storage to recognise a returning browser. Analytics data is processed by PostHog on servers in the United States. Analytics does not run unless you choose to allow it.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-3">Strictly necessary storage</h2>
          <p className="mb-4">
            We store your analytics choice in your browser (under the name <code className="text-sm">vc-analytics-consent</code>) so that we do not ask you again on every visit. If you sign in, a session token is kept in your browser so that the application can recognise you.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-3">Changing your choice</h2>
          <p className="mb-6">
            You can change your choice at any time. You can also delete cookies and site data through your browser settings.
          </p>
          <Button onClick={openSettings} className="bg-teal-700 hover:bg-teal-800 text-white">
            Change my cookie choice
          </Button>
        </article>
      </main>
      <SiteFooter />
    </>
  );
};
