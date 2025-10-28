import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { LandingPage } from '@/pages/LandingPage';
import { Login } from '@/pages/Login';
import { AuthProvider } from '@/context/AuthContext';
import { ContentProvider } from '@/context/ContentContext';
import { EditModeProvider } from '@/context/EditModeContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <EditModeProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <Toaster />
          </EditModeProvider>
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;