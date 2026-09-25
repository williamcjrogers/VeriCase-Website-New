import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { APP_URL, DEMO_MAILTO, SIGN_IN_URL } from '@/lib/site';

const TAGLINE_SEQUENCE = [
  { text: '"Records"', duration: 2000 },
  { text: '"Records, records"', duration: 2000 },
  { text: '"Records, records, VeriCase"', duration: 3000 },
  { text: '"Records, records, VeriCase." Make time your ally.', duration: null }
];

const NAV_LINKS = [
  { label: 'Platform', href: '/#platform' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Contact', href: DEMO_MAILTO }
];

export const Navigation = () => {
  const { user, logout } = useAuth();
  const [currentText, setCurrentText] = useState(TAGLINE_SEQUENCE[0].text);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timers = [];
    let elapsed = 0;
    TAGLINE_SEQUENCE.forEach((step, index) => {
      if (index === 0) return;
      elapsed += TAGLINE_SEQUENCE[index - 1].duration;
      timers.push(setTimeout(() => setCurrentText(step.text), elapsed));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm bg-white/95" data-testid="navigation-header">
      {/* Tagline Banner */}
      <div className="w-full py-2 md:py-3 lg:py-4 relative" style={{
        background: 'linear-gradient(135deg, #F5F5F0 0%, #E8E6E1 50%, #F5F5F0 100%)',
        borderBottom: '1px solid #D4D2CB'
      }}>
        {/* Logo on the far left edge */}
        <a href="/" aria-label="VeriCase home">
          <img
            src="/assets/LOGOTOBEUSED.png"
            alt="VeriCase"
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 h-8 sm:h-10 md:h-12"
          />
        </a>

        {/* Animated Text - centered with mobile padding */}
        <div className="text-center px-8 sm:pl-40 sm:pr-8 md:px-0 min-h-[2rem] sm:min-h-0">
          <span className="sr-only">Records, records, VeriCase. Make time your ally.</span>
          <span
            aria-hidden="true"
            className="hidden sm:inline"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: '400',
              fontStyle: 'italic',
              letterSpacing: '0.04em',
              fontSize: 'clamp(0.7rem, 2.2vw, 2.25rem)',
              color: '#1a1a1a',
              lineHeight: '1.3'
            }}
          >
            {currentText}
          </span>
        </div>
      </div>

      {/* Navigation Container */}
      <div className="w-full" style={{ backgroundColor: '#2C3E50' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-14 md:h-16 w-full">
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              data-testid="mobile-menu-button"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-10" data-testid="nav-links" aria-label="Main">
              {NAV_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="text-white text-sm lg:text-base font-semibold hover:text-teal-300 transition-colors duration-200">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              {user ? (
                <>
                  <span className="hidden md:inline text-sm text-white">Welcome, {user.full_name}</span>
                  <Button
                    size="sm"
                    className="text-xs md:text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg px-4 md:px-8 bg-teal-600 hover:bg-teal-700"
                    onClick={() => {
                      // Redirect to VeriCase application dashboard
                      const token = localStorage.getItem('token');
                      window.location.href = `${APP_URL}dashboard.html?token=${token}`;
                    }}
                  >
                    Open App
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs md:text-sm font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="text-xs md:text-sm font-semibold border-2 border-white bg-transparent text-white hover:bg-white hover:text-gray-900"
                  >
                    <a href={SIGN_IN_URL} data-testid="sign-in-link">Sign in</a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="text-xs md:text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg px-4 md:px-8 bg-teal-600 hover:bg-teal-700"
                  >
                    <a href={DEMO_MAILTO} data-testid="nav-demo-cta">
                      <span className="hidden sm:inline">Book a demonstration</span>
                      <span className="sm:hidden">Demo</span>
                    </a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <nav id="mobile-menu" className="md:hidden border-t border-white/20 px-6 pb-4" aria-label="Main" data-testid="mobile-nav-links">
            <ul className="flex flex-col pt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block py-3 text-white text-base font-semibold border-b border-white/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
