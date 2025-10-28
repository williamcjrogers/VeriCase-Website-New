import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { LandingPage } from '@/pages/LandingPage';
import { AdminPanel } from '@/pages/AdminPanel';
import { Login } from '@/pages/Login';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ContentProvider } from '@/context/ContentContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;