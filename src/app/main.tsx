import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RoutingLayout } from './RoutingLayout';
import { Provider as ChakraUIProvider } from '@/shared/ui/provider.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from '@/shared/constants/routes.tsx';
import { AuthProvider } from '@/features/AuthContext.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename={'/'}>
      <ChakraUIProvider>
        <AuthProvider>
          <Routes>
            {PUBLIC_ROUTES.map((props, index) => (
              <Route key={index} {...props} />
            ))}
            <Route path="/" element={<RoutingLayout />}>
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
