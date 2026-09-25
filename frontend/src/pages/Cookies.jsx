import { SiteHeader } from '@/components/sections/SiteHeader';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { Gated } from '@/components/editorial/Gated';

// The cookie notice. Its wording is PR 1's; the PostHog host sentence follows gate G8.
export const Cookies = () => {
  const openSettings = () => window.dispatchEvent(new Event('vc-open-cookie-settings'));

  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="bg-parchment outline-none">
        <article className="container py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12 lg:col-span-7 lg:col-start-3">
              <div className="double-rule mb-5 max-w-[8rem]" aria-hidden="true" />
              <p className="eyebrow">Cookies</p>
              <h1 className="mt-4 text-h2 font-medium">Cookie notice</h1>
              <p className="mt-6 max-w-measure text-lead text-ink">
                This notice explains the cookies and similar technologies used on this website, and how you can control them.
              </p>

              <h2 className="mt-12 text-h3 font-medium">Analytics (only with your consent)</h2>
              <p className="mt-3 max-w-measure text-body text-ink">
                With your consent, we use PostHog analytics to understand how visitors use this website, so that we can improve it. PostHog sets a cookie and uses browser storage to recognise a returning browser.{' '}
                <Gated id="G8_host">Analytics data is processed by PostHog on servers in the United States.</Gated> Analytics does not run unless you choose to allow it.
              </p>

              <h2 className="mt-10 text-h3 font-medium">Strictly necessary storage</h2>
              <p className="mt-3 max-w-measure text-body text-ink">
                We store your analytics choice in your browser (under the name <code className="rounded-sm bg-parchment-300 px-1 text-[0.875em]">vc-analytics-consent</code>) so that we do not ask you again on every visit. If you sign in, a session token is kept in your browser so that the application can recognise you.
              </p>

              <h2 className="mt-10 text-h3 font-medium">Changing your choice</h2>
              <p className="mt-3 max-w-measure text-body text-ink">
                You can change your choice at any time. You can also delete cookies and site data through your browser settings.
              </p>
              <button type="button" onClick={openSettings} className="vc-btn vc-btn-primary mt-6">
                Change my cookie choice
              </button>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
};
