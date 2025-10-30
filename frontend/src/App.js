import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { LandingPage } from '@/pages/LandingPage';
import { Login } from '@/pages/Login';
import { useEffect } from 'react';

// Component to handle external redirect
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
          <Route 
            path="/Fileserver" 
            element={<ExternalRedirect url="https://vericase.egnyte.com/subDomainLogin.do#login" />} 
          />
          <Route 
            path="/fileserver" 
            element={<ExternalRedirect url="https://vericase.egnyte.com/subDomainLogin.do#login" />} 
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;