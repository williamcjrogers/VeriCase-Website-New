import { COMPANY, CONTACT_EMAIL, DEMO_MAILTO, SIGN_IN_URL } from '@/lib/site';

const FOOTER_COLUMNS = [
  {
    heading: 'Platform',
    links: [
      { label: 'What VeriCase does', href: '/#platform' },
      { label: 'How it works', href: '/#how-it-works' }
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'Book a demonstration', href: DEMO_MAILTO },
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      { label: 'Sign in', href: SIGN_IN_URL }
    ]
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Cookies', href: '/cookies' }
    ]
  }
];

export const SiteFooter = () => {
  return (
    <footer id="about" className="py-16 md:py-20 bg-gray-900 text-gray-300" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and Tagline */}
          <div className="lg:col-span-1">
            <div className="mb-6 inline-block rounded-lg bg-white px-4 py-3">
              <img
                src="/assets/LOGOTOBEUSED.png"
                alt="VeriCase"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              The evidence intelligence platform for construction disputes: evidence, chronology, claims and rebuttal, with every point cited to its source.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h2 className="font-bold text-base mb-6 text-white">{column.heading}</h2>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm hover:text-teal-400 transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal disclosures */}
        <div className="pt-8 border-t border-gray-800 text-center space-y-2">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-500" data-testid="company-disclosure">
            {COMPANY.name} is registered in England and Wales (company number {COMPANY.number}). Registered office: {COMPANY.registeredOffice}.
          </p>
          <p className="text-xs text-gray-500">
            VeriCase™ and Chronology Lens™ are trade marks of {COMPANY.name}.
          </p>
        </div>
      </div>
    </footer>
  );
};
