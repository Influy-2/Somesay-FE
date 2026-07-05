import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../constants/auth.constants';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const getAccessToken = () =>
  localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

export const saveAuthTokens = ({ accessToken, refreshToken }: AuthTokens) => {
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
};

export const clearAuthTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
};
