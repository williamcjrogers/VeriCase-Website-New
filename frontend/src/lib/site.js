// Shared destinations for calls to action and sign-in, and the company's trading details.
export const CONTACT_EMAIL = 'enquiries@veri-case.com';

const SUBJECT = 'VeriCase demonstration request';
const BODY = [
  'Name:',
  'Organisation:',
  'Role:',
  'I would like to explore how VeriCase supports evidence investigation and case preparation using sample material.',
  'Areas of interest (optional):',
  '',
  'Please do not include confidential details of a live matter.',
].join('\r\n');

export const DEMO_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

const envUrl = process.env.REACT_APP_APP_URL;
const base = envUrl && envUrl.startsWith('https://') ? envUrl : 'https://app.veri-case.com/';
export const APP_URL = base.endsWith('/') ? base : `${base}/`;
// The production build must resolve to https://app.veri-case.com/login (checked by lint-copy).
export const SIGN_IN_URL = `${APP_URL}login`;

// As registered at Companies House (VERICASE LTD, company 16562435; checked 25 September 2026).
export const COMPANY = {
  name: 'VeriCase Ltd',
  number: '16562435',
  registeredOffice: '85 Great Portland Street, London, England, W1W 7LT',
};

export const SITE = {
  url: 'https://veri-case.com/',
  legalPages: { privacy: false, cookies: true },
};
