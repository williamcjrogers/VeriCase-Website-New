// Shared destinations for calls to action and sign-in, and the company's trading details.
export const CONTACT_EMAIL = 'enquiries@veri-case.com';

const SUBJECT = 'VeriCase demonstration request';
const BODY = [
  'Name:',
  'Organisation:',
  'Role:',
  'What would you like to see?',
  '',
  'Please do not include confidential details of a live matter.',
].join('\r\n');

export const DEMO_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

const envUrl = process.env.REACT_APP_APP_URL;
const base = envUrl && envUrl.startsWith('https://') ? envUrl : 'https://app.veri-case.com/ui/';
export const APP_URL = base.endsWith('/') ? base : `${base}/`;
// The production build must resolve to https://app.veri-case.com/ui/login.html (checked by lint-copy).
export const SIGN_IN_URL = `${APP_URL}login.html`;

export const COMPANY = {
  name: 'VeriCase Ltd',
  number: '14789532',
  // Registered office: gate G7. Supplied by the owner before publication.
  registeredOffice: '{{REGISTERED_OFFICE}}',
};

export const SITE = {
  url: 'https://veri-case.com/',
  legalPages: { privacy: false, cookies: true },
};
