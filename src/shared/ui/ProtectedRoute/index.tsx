import { ReactNode, useEffect } from 'react';
import { useAuthContext } from '@/features/AuthContext.tsx';
import { useLocation, useNavigate } from 'react-router';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { setInitialRoute } = useAuthContext();
  const from = location.pathname;
  setInitialRoute(from);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return children;
};
