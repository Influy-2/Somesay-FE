import { configureApiClient } from '@somesay/shared';
import type { Middleware } from 'openapi-fetch';
import { clearAuthTokens, getAccessToken } from '@/features/auth';
import { fetchClient } from '@/shared/api';
import { useSnackbarStore } from '@/shared/stores';

const DEFAULT_API_BASE_URL = 'http://localhost:8080';

const handleUnauthorized = () => {
  const hadAccessToken = Boolean(getAccessToken());
  clearAuthTokens();

  if (hadAccessToken) {
    useSnackbarStore
      .getState()
      .showSnackbar('로그인이 만료되었어요. 다시 로그인해 주세요.', {
        variant: 'error',
      });
  }
};

// openapi-fetch 클라이언트용 인증 미들웨어입니다. axios 인터셉터 두 개와 같은 일을 합니다.
const authMiddleware: Middleware = {
  onRequest({ request }) {
    const token = getAccessToken();

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    return request;
  },
  onResponse({ response }) {
    if (response.status === 401) {
      handleUnauthorized();
    }

    return response;
  },
};

export const setupApiClient = () => {
  // 구역별 이관이 끝날 때까지 axios 클라이언트와 openapi-fetch 클라이언트를 함께 설정합니다.
  configureApiClient({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    getAccessToken,
    onUnauthorized: handleUnauthorized,
  });

  // 앱 초기화가 반복되어도 미들웨어가 중복 등록되지 않도록 먼저 뗍니다.
  fetchClient.eject(authMiddleware);
  fetchClient.use(authMiddleware);
};
