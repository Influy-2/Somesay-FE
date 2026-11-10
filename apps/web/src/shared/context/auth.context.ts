import { createContext } from 'react';
import type { InfoResponse } from '@somesay/shared';

export type AuthStatus =
  | 'checking'
  | 'authenticated'
  | 'unauthenticated'
  | 'error';

export interface AuthContextValue {
  status: AuthStatus;
  isAuthenticated: boolean;
  user: InfoResponse | null;
  refreshUser: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
