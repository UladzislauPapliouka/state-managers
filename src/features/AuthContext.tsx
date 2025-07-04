import { toaster } from '@/shared/ui/toaster';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react';

interface User {
  id: number;
  nickname: string;
  email: string;
}
interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ status: number }>;
  logout: () => void;
}
const AuthContext = createContext<AuthContext | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('You must be in AuthProvider to use this hook');
  }
  return context;
};
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = useCallback(async (email: string, password: string) => {
    await sleep(5000);
    if (email === 'dev@gmail.com' && password === 'dev') {
      setUser({
        id: 1,
        email,
        nickname: 'dev'
      });
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
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
