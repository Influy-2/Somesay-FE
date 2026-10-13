import { useAuthTokenStore } from '@/shared/stores';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const getAccessToken = () => useAuthTokenStore.getState().accessToken;

export const getRefreshToken = () => useAuthTokenStore.getState().refreshToken;

export const saveAuthTokens = ({ accessToken, refreshToken }: AuthTokens) => {
  useAuthTokenStore.getState().setTokens({
    accessToken,
    refreshToken,
  });
};

export const clearAuthTokens = () => {
  useAuthTokenStore.getState().clearTokens();
};
