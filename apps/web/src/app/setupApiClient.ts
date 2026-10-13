import { configureApiClient } from '@somesay/shared';
import { clearAuthTokens, getAccessToken } from '@/features/auth';
import { useSnackbarStore } from '@/shared/stores';

const DEFAULT_API_BASE_URL = 'http://localhost:8080';

export const setupApiClient = () => {
  configureApiClient({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    getAccessToken,
    onUnauthorized: () => {
      const hadAccessToken = Boolean(getAccessToken());
      clearAuthTokens();

      if (hadAccessToken) {
        useSnackbarStore
          .getState()
          .showSnackbar('로그인이 만료되었어요. 다시 로그인해 주세요.', {
            variant: 'error',
          });
      }
    },
  });
};
