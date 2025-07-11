import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RoutingLayout } from './RoutingLayout';
import { Provider as ChakraUIProvider } from '@/shared/ui/provider.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from '@/shared/constants/routes.tsx';
import { AuthProvider } from '@/features/Authorization/AuthContext';
import { Toaster } from '@/shared/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/api';
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename={'/'}>
      <ChakraUIProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
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
          </QueryClientProvider>
        </AuthProvider>
        <Toaster />
      </ChakraUIProvider>
    </BrowserRouter>
  </StrictMode>
);
