import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider as ChakraUIProvider } from '@/components/ui/provider';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from '@/constants/routes.tsx';
import { AuthProvider } from '@/components/Providers/AuthContext.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename={'/'}>
      <ChakraUIProvider>
        <AuthProvider>
          <Routes>
            {PUBLIC_ROUTES.map((props, index) => (
              <Route key={index} {...props} />
            ))}
            <Route path="/" element={<App />}>
              {PROTECTED_ROUTES.map((props, index) => (
                <Route key={index} {...props} />
              ))}
            </Route>
          </Routes>
        </AuthProvider>
      </ChakraUIProvider>
    </BrowserRouter>
  </StrictMode>
);
