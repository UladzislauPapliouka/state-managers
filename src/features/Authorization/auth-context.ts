import { createContext, useContext } from 'react';
import { type AuthContext as AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('You must be in AuthProvider to use this hook');
  }
  return context;
};
