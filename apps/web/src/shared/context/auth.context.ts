import { createContext } from 'react';
import type { UserInfoType } from '@somesay/shared';

export type AuthStatus =
  | 'checking'
  | 'authenticated'
  | 'unauthenticated'
  | 'error';

export interface AuthContextValue {
  status: AuthStatus;
  isAuthenticated: boolean;
  user: UserInfoType | null;
  refreshUser: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
