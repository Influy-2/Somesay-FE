import { describe, expect, it } from 'vitest';
import { createKakaoAuthorizationUrl } from './kakaoOAuth.service';

describe('Kakao OAuth', () => {
  it('인가 요청 URL에 필요한 파라미터를 담는다', () => {
    const url = new URL(
      createKakaoAuthorizationUrl({
        clientId: 'rest-api-key',
        redirectUri: 'http://localhost:8080/login/oauth2/code/kakao',
      })
    );

    expect(url.origin + url.pathname).toBe(
      'https://kauth.kakao.com/oauth/authorize'
    );
    expect(Object.fromEntries(url.searchParams)).toEqual({
      client_id: 'rest-api-key',
      redirect_uri: 'http://localhost:8080/login/oauth2/code/kakao',
      response_type: 'code',
    });
  });
});
