import { ReactNode } from 'react';
import { Redirect } from '@/components/Redirect';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  if (false) {
    return <Redirect to={'/login'} />;
  }
  return children;
};
