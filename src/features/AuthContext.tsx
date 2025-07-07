import { toaster } from '@/shared/ui/toaster';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

import { dummyJsonAxiosInstance } from '@/shared/api';

interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
dummyJsonAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.name === 'CanceledError') {
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/refresh-token'
    ) {
      originalRequest._retry = true;
      const refreshToken = document.cookie
        .split(';')
        .find((cookie) => cookie.includes('refreshToken'))
        ?.split('=')[1];

      if (refreshToken) {
        return dummyJsonAuthApi.refreshToken(refreshToken).then((response) => {
          if (response.status === 200) {
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return dummyJsonAxiosInstance(originalRequest);
          }
          return Promise.reject(error);
        });
      }
    } else if (
      error.response.status === 401 &&
      originalRequest.url === '/auth/refresh-token'
    ) {
      document.cookie = `accessToken=; path=/`;
      document.cookie = `refreshToken=; path=/`;
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

const dummyJsonAuthApi = {
  login: async (username: string, password: string) => {
    const response = await dummyJsonAxiosInstance.post<AuthUser>(
      '/auth/login',
      {
        username,
        password
      }
    );
    document.cookie = `accessToken=${response.data.accessToken}; path=/`;
    document.cookie = `refreshToken=${response.data.refreshToken}; path=/`;
    return response;
  },
  getMe: async (accessToken: string) => {
    const response = await dummyJsonAxiosInstance.get<AuthUser>('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response;
  },
  refreshToken: async (refreshToken: string) => {
    return await dummyJsonAxiosInstance.post<AuthUser>('/auth/refresh-token', {
      body: {
        refreshToken
      },
      withCredentials: true
    });
  }
};
interface AuthContext {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ status: number }>;
  logout: () => void;
  initialRoute: string;
  setInitialRoute: (route: string) => void;
}
const AuthContext = createContext<AuthContext | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('You must be in AuthProvider to use this hook');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string>('');
  const login = useCallback(async (email: string, password: string) => {
    const response = await dummyJsonAuthApi.login(email, password);
    if (response.status === 200) {
      setUser(response.data);
      setIsAuthenticated(true);
      toaster.create({ type: 'success', title: 'Successed login' });
      return { status: 200 };
    } else {
      toaster.create({ type: 'error', title: 'Incorrect Login or Password' });
      return { status: 401 };
    }
  }, []);
  const logout = useCallback(async () => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);
  useEffect(() => {
    if (!user) {
      const cookies = document.cookie.split(';');
      const accessToken = cookies
        .find((cookie) => cookie.includes('accessToken'))
        ?.split('=')[1];
      console.log(cookies);
      if (accessToken) {
        dummyJsonAuthApi.getMe(accessToken).then((response) => {
          if (response.status === 200) {
            setUser(response.data);
            setIsAuthenticated(true);
          }
        });
      }
    }
  });
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
