// Shared destinations for calls to action and sign-in.
export const CONTACT_EMAIL = 'enquiries@veri-case.com';

export const DEMO_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  'VeriCase demonstration request'
)}`;

export const APP_URL = process.env.REACT_APP_APP_URL || 'https://app.veri-case.com/ui/';

export const SIGN_IN_URL = `${APP_URL}login.html`;

export const COMPANY = {
  name: 'VeriCase Ltd',
  number: '14789532',
  // Registered office to be supplied by the owner before publication.
  registeredOffice: '[to be supplied]',
};
