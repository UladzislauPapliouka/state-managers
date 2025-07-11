import { ReactNode, useEffect } from 'react';
import { useAuthContext } from '@/features/Authorization/auth-context';
import { useLocation, useNavigate } from 'react-router';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { setInitialRoute } = useAuthContext();
  const from = location.pathname;
  useEffect(() => {
    setInitialRoute(from);
  }, [from, setInitialRoute]);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return children;
};
