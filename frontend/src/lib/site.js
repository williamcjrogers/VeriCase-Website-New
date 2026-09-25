// Shared destinations for calls to action and sign-in.
export const CONTACT_EMAIL = 'enquiries@veri-case.com';

export const DEMO_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  'VeriCase demonstration request'
)}`;

export const APP_URL = process.env.REACT_APP_APP_URL || 'https://app.veri-case.com/ui/';

export const SIGN_IN_URL = `${APP_URL}login.html`;

// As registered at Companies House (VERICASE LTD, checked 25 September 2026).
export const COMPANY = {
  name: 'VeriCase Ltd',
  number: '16562435',
  registeredOffice: '85 Great Portland Street, London, England, W1W 7LT',
};
