import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState('"Records"');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const sequence = [
      { text: '"Records"', duration: 2000 },
      { text: '"Records, Records"', duration: 2000 },
      { text: '"Records, Records, VeriCase"', duration: 3000 },
      { text: '"Records, Records, VeriCase" — Making Time Your Ally', duration: 1000 },
      { text: '"Records, Records, VeriCase" — Making Time Your Ally', duration: null }
    ];
    
    let currentIndex = 0;
    
    const animate = () => {
      setCurrentText(sequence[currentIndex].text);
      if (sequence[currentIndex].duration !== null && currentIndex < sequence.length - 1) {
        setTimeout(() => {
          currentIndex++;
          animate();
        }, sequence[currentIndex].duration);
      }
    };
    
    animate();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm bg-white/95" data-testid="navigation-header">
      {/* Tagline Banner */}
      <div className="w-full py-2 md:py-3 lg:py-4 relative" style={{ 
        background: 'linear-gradient(135deg, #F5F5F0 0%, #E8E6E1 50%, #F5F5F0 100%)',
        borderBottom: '1px solid #D4D2CB'
      }}>
        {/* Logo on the far left edge */}
        <img 
          src="/assets/LOGOTOBEUSED.png" 
          alt="VeriCase Logo" 
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 h-8 sm:h-10 md:h-12"
        />
        
        {/* Animated Text - centered with mobile padding */}
        <div className="text-center px-8 sm:px-16 md:px-0">
          <span 
            className="transition-all duration-700 ease-in-out"
            style={{ 
              fontFamily: "'Didot', 'Bodoni MT', 'Garamond', serif",
              fontWeight: '500',
              fontStyle: 'italic',
              letterSpacing: '0.08em',
              fontSize: 'clamp(0.7rem, 2.2vw, 2.5rem)',
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
          {/* Main Navigation */}
          <div className="flex items-center justify-between h-14 md:h-16 w-full">
            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-10" data-testid="nav-links">
              <a href="#platform" className="text-white text-sm lg:text-base font-semibold hover:text-teal-300 transition-colors duration-200">Platform</a>
              <a href="#construction" className="text-white text-sm lg:text-base font-semibold hover:text-teal-300 transition-colors duration-200">Construction Focus</a>
              <a href="#pricing" className="text-white text-sm lg:text-base font-semibold hover:text-teal-300 transition-colors duration-200">Pricing</a>
              <a href="#about" className="text-white text-sm lg:text-base font-semibold hover:text-teal-300 transition-colors duration-200">About Us</a>
            </nav>

            {/* Mobile navigation on small screens */}
            <nav className="flex md:hidden items-center space-x-2" data-testid="mobile-nav-links">
              <a href="#platform" className="text-white text-xs font-semibold">Platform</a>
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
                      const appUrl = process.env.REACT_APP_APP_URL || 'http://localhost:8010/ui/';
                      window.location.href = `${appUrl}dashboard.html?token=${token}`;
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="text-xs md:text-sm font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900"
                      >
                        Login
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => {
                          const appUrl = process.env.REACT_APP_APP_URL || 'http://localhost:8010/ui/';
                          window.location.href = `${appUrl}login.html`;
                        }}
                      >
                        Analysis
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => {
                          window.location.href = 'https://vericase.egnyte.com/subDomainLogin.do#login';
                        }}
                      >
                        Files
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button 
                    size="sm"
                    className="text-xs md:text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg px-4 md:px-8 bg-teal-600 hover:bg-teal-700"
                    onClick={() => {
                      const appUrl = process.env.REACT_APP_APP_URL || 'http://localhost:8010/ui/';
                      window.location.href = `${appUrl}signup.html`;
                    }}
                  >
                    <span className="hidden sm:inline">Get Started</span>
                    <span className="sm:hidden">Start</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};