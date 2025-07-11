import { toaster } from '@/shared/ui/toaster';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import { AuthUser } from './types';
import { dummyJsonAuthApi } from './api';
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string>('');
  const navigate = useNavigate();

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await dummyJsonAuthApi.login(email, password);
      if (response.status === 200) {
        setUser(response.data);
        setIsAuthenticated(true);
        sessionStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        toaster.create({ type: 'success', title: 'Successed login' });
        navigate('/');
      } else {
        toaster.create({ type: 'error', title: 'Incorrect Login or Password' });
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const getMe = async (accessToken: string, signal: AbortSignal) => {
      const response = await dummyJsonAuthApi.getMe(accessToken, signal);
      if (response.status === 200) {
        setUser(response.data);
        setIsAuthenticated(true);
        navigate('/');
      }
    };

    if (!user) {
      const accessToken = sessionStorage.getItem('accessToken') || '';
      getMe(accessToken, controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [user, navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        initialRoute,
        setInitialRoute
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
