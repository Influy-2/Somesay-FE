import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchClient } from '@/shared/api';
import { useAuthTokenStore } from '@/shared/stores';
import { setupApiClient } from './setupApiClient';

describe('setupApiClient', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    useAuthTokenStore.getState().clearTokens();
  });

  it('저장된 JWT를 Authorization 헤더에 포함한다', async () => {
    setupApiClient();
    useAuthTokenStore.getState().setTokens({
      accessToken: 'jwt-access-token',
      refreshToken: 'jwt-refresh-token',
    });
    // openapi-fetch 는 전역 fetch 를 부르므로 fetch 를 가로채 보낸 요청을 확인합니다.
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async () =>
        Response.json(
          { code: 'SUCCESS', message: '', data: [] },
          { headers: { 'Content-Type': 'application/json' } }
        )
      );

    await fetchClient.GET('/api/v1/categories');

    const sent = fetchSpy.mock.calls.at(0)?.[0] as Request;
    expect(sent.headers.get('Authorization')).toBe('Bearer jwt-access-token');
  });
});
