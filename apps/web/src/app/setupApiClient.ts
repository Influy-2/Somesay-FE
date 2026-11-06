import type { Middleware } from 'openapi-fetch';
import { clearAuthTokens, getAccessToken } from '@/features/auth';
import { fetchClient } from '@/shared/api';
import { useSnackbarStore } from '@/shared/stores';

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

// openapi-fetch 클라이언트용 인증 미들웨어입니다.
// 요청에 Bearer 토큰을 붙이고, 401 응답이면 토큰을 지우고 만료 안내를 띄웁니다.
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
  // 앱 초기화가 반복되어도 미들웨어가 중복 등록되지 않도록 먼저 뗍니다.
  fetchClient.eject(authMiddleware);
  fetchClient.use(authMiddleware);
};
