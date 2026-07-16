import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  clearKakaoAuthorizationState,
  createKakaoAuthorizationUrl,
  isValidKakaoAuthorizationState,
} from './kakaoOAuth.service';

const KAKAO_AUTHORIZATION_STATE_STORAGE_KEY = 'kakao_authorization_state';

describe('Kakao OAuth', () => {
  const storage = new Map<string, string>();

  beforeEach(() => {
    storage.clear();
    vi.stubGlobal('sessionStorage', {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('인가 요청 URL에 필요한 파라미터를 담는다', () => {
    const url = new URL(
      createKakaoAuthorizationUrl({
        clientId: 'rest-api-key',
        redirectUri: 'http://localhost:5173/login/kakao/callback',
        state: 'oauth-state',
      })
    );

    expect(url.origin + url.pathname).toBe(
      'https://kauth.kakao.com/oauth/authorize'
    );
    expect(Object.fromEntries(url.searchParams)).toEqual({
      client_id: 'rest-api-key',
      redirect_uri: 'http://localhost:5173/login/kakao/callback',
      response_type: 'code',
      state: 'oauth-state',
    });
  });

  it('콜백 state가 로그인 시작 시 저장한 값과 같은지 검증한다', () => {
    sessionStorage.setItem(
      KAKAO_AUTHORIZATION_STATE_STORAGE_KEY,
      'oauth-state'
    );

    expect(isValidKakaoAuthorizationState('oauth-state')).toBe(true);
    expect(isValidKakaoAuthorizationState('different-state')).toBe(false);
    expect(isValidKakaoAuthorizationState(null)).toBe(false);
  });

  it('사용이 끝난 OAuth state를 제거한다', () => {
    sessionStorage.setItem(
      KAKAO_AUTHORIZATION_STATE_STORAGE_KEY,
      'oauth-state'
    );

    clearKakaoAuthorizationState();

    expect(sessionStorage.getItem(KAKAO_AUTHORIZATION_STATE_STORAGE_KEY)).toBe(
      null
    );
  });
});
