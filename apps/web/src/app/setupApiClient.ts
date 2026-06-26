import { configureApiClient } from '@somesay/shared';
import { PATH } from '@/routes/path';

const DEFAULT_API_BASE_URL = 'http://localhost:8080';
const ACCESS_TOKEN_STORAGE_KEY = 'access_token';

export const setupApiClient = () => {
  configureApiClient({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
    onUnauthorized: () => {
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      window.location.href = PATH.LOGIN.BASE;
    },
  });
};
