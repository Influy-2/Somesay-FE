import { configureApiClient } from '@somesay/shared';
import { clearAuthTokens, getAccessToken } from '@/features/auth';
import { PATH } from '@/routes/path';

const DEFAULT_API_BASE_URL = 'http://localhost:8080';

export const setupApiClient = () => {
  configureApiClient({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    getAccessToken,
    onUnauthorized: () => {
      clearAuthTokens();
      window.location.href = PATH.LOGIN.BASE;
    },
  });
};
