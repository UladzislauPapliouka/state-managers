import { ReactNode, useEffect } from 'react';
import { useAuthContext } from '@/components/Providers/AuthContext.tsx';
import { useNavigate } from 'react-router';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return children;
};
