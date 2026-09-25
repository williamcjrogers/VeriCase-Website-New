import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { LandingPage } from '@/pages/LandingPage';
import { Login } from '@/pages/Login';
import { Cookies } from '@/pages/Cookies';
import { NotFound } from '@/pages/NotFound';
import { CookieConsent } from '@/components/CookieConsent';
import { useEffect } from 'react';

// Component to handle external redirect to Egnyte
const ExternalRedirect = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to File Server...</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route 
            path="/Fileserver" 
            element={<ExternalRedirect url="https://files.veri-case.com" />} 
          />
          <Route 
            path="/fileserver" 
            element={<ExternalRedirect url="https://files.veri-case.com" />} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;