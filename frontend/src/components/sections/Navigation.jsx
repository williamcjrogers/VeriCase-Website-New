import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState('"Records"');
  
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
      <div className="w-full py-3 md:py-4 relative" style={{ 
        background: 'linear-gradient(135deg, #F5F5F0 0%, #E8E6E1 50%, #F5F5F0 100%)',
        borderBottom: '1px solid #D4D2CB'
      }}>
        {/* Logo on the far left edge */}
        <img 
          src="/NewLogo.jpg" 
          alt="VeriCase Logo" 
          className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 h-12"
          style={{ 
            mixBlendMode: 'multiply',
            opacity: 0.95
          }}
        />
        
        {/* Animated Text - centered */}
        <div className="text-center">
          <span 
            className="transition-all duration-700 ease-in-out"
            style={{ 
              fontFamily: "'Didot', 'Bodoni MT', 'Garamond', serif",
              fontWeight: '500',
              fontStyle: 'italic',
              letterSpacing: '0.08em',
              fontSize: 'clamp(1.25rem, 3vw, 2.5rem)',
              color: '#1a1a1a',
              lineHeight: '1.2'
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
          <div className="flex items-center justify-between h-16 w-full">
            <nav className="flex items-center space-x-10" data-testid="nav-links">
              <a href="#platform" className="text-white font-semibold hover:text-teal-300 transition-colors duration-200">Platform</a>
              <a href="#construction" className="text-white font-semibold hover:text-teal-300 transition-colors duration-200">Construction Focus</a>
              <a href="#pricing" className="text-white font-semibold hover:text-teal-300 transition-colors duration-200">Pricing</a>
              <a href="#about" className="text-white font-semibold hover:text-teal-300 transition-colors duration-200">About Us</a>
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-sm text-white">Welcome, {user.full_name}</span>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                  <Button 
                    size="lg"
                    className="font-semibold text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg px-8 bg-teal-600 hover:bg-teal-700"
                    onClick={() => navigate('/login')}
                  >
                    Get Started
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