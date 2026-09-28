// Server entry for scripts/prerender.mjs: renders a route to HTML with a StaticRouter and
// builds the JSON-LD blocks from the same content the page renders.
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App, { KNOWN_ROUTES } from '@/App';
import { IN_BRIEF } from '@/content/home';
import { GATES } from '@/content/gates';
import { COMPANY, CONTACT_EMAIL, SITE } from '@/lib/site';

export { KNOWN_ROUTES };

export const render = (url) => renderToString(<App Router={StaticRouter} routerProps={{ location: url }} />);

const resolved = (gate) => !gate || GATES[gate]?.status === 'confirmed';
const hasToken = (s) => /\{\{[A-Z0-9_]+\}\}/.test(s);
const plain = (s) => String(s).replace(/\[\[note:\d+\]\]/g, '').replace(/\*([^*]+)\*/g, '$1');

export function jsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VeriCase',
    legalName: COMPANY.name,
    url: SITE.url,
    logo: `${SITE.url}logo-positive.svg`,
    email: CONTACT_EMAIL,
    founder: { '@type': 'Person', name: 'William Rogers' },
    identifier: { '@type': 'PropertyValue', propertyID: 'Companies House company number', value: COMPANY.number },
  };
  // The address is added once the registered office has been supplied (gate G7).
  if (!hasToken(COMPANY.registeredOffice)) organization.address = COMPANY.registeredOffice;

  const application = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'VeriCase',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE.url,
  };

  const questions = IN_BRIEF.questions.filter((q) => resolved(q.gate) && !hasToken(q.a));
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: plain(q.q),
      acceptedAnswer: { '@type': 'Answer', text: plain(q.a) },
    })),
  };
  return [organization, application, ...(questions.length ? [faq] : [])];
}
