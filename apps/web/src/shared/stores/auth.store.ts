import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthTokenStore {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: AuthTokens) => void;
  clearTokens: () => void;
}

const INITIAL_TOKEN_STATE = {
  accessToken: null,
  refreshToken: null,
};

export const useAuthTokenStore = create<AuthTokenStore>()(
  persist(
    (set) => ({
      ...INITIAL_TOKEN_STATE,

      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),

      clearTokens: () => set(INITIAL_TOKEN_STATE),
    }),
    {
      name: 'somesay_auth_tokens',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ accessToken, refreshToken }) => ({
        accessToken,
        refreshToken,
      }),
    }
  )
);
