import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider as ChakraUIProvider } from '@/components/ui/provider';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ROUTES } from '@/constants/routes.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename={'/'}>
      <ChakraUIProvider>
        <Routes>
          <Route path="/" element={<App />}>
            {ROUTES.map((props, index) => (
              <Route key={index} {...props} />
            ))}
          </Route>
        </Routes>
      </ChakraUIProvider>
    </BrowserRouter>
  </StrictMode>
);
