import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider as ChakraUIProvider } from '@/components/ui/provider';
import { BrowserRouter, Route, Routes } from 'react-router';
import {
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
  ROUTES
} from '@/constants/routes.tsx';
import { LoginPage } from '@/components/Pages/Login';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename={'/'}>
      <ChakraUIProvider>
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
      </ChakraUIProvider>
    </BrowserRouter>
  </StrictMode>
);
