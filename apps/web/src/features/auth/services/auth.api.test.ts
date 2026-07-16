import {
  apiClient,
  postKakaoLogin,
  postLoginInfo,
  type JwtLoginResponseDto,
  type LoginInfoRequestDto,
  type LoginInfoResponseDto,
} from '@somesay/shared';
import { afterEach, describe, expect, it, vi } from 'vitest';

const loginInfoRequest: LoginInfoRequestDto = {
  nickname: 'somesay',
  gender: 'FEMALE',
  age: 'TWENTIES',
  concerns: ['보습'],
  skinTypeNames: ['건성'],
};

const loginInfoResponse: LoginInfoResponseDto = {
  userId: 1,
  ...loginInfoRequest,
};

const kakaoLoginResponse: JwtLoginResponseDto = {
  userId: 1,
  email: 'somesay@example.com',
  nickname: 'somesay',
  profileImgUrl: 'https://example.com/profile.png',
  jwtAccessToken: 'access-token',
  refreshToken: 'refresh-token',
  enabled: true,
  newUser: true,
};

describe('auth API', () => {
  afterEach(() => vi.restoreAllMocks());

  it('카카오 인가 코드를 query parameter로 전송하고 JWT 정보를 반환한다', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: kakaoLoginResponse,
    });

    await expect(postKakaoLogin('kakao-auth-code')).resolves.toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      newUser: true,
    });
    expect(post).toHaveBeenCalledWith('/auth/login/kakao', undefined, {
      params: {
        code: 'kakao-auth-code',
      },
    });
  });

  it('회원가입 기본 정보만 body로 전송하고 data를 반환한다', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: { code: 'SUCCESS', message: '', data: loginInfoResponse },
    });

    await expect(postLoginInfo(loginInfoRequest)).resolves.toEqual(
      loginInfoResponse
    );
    expect(post).toHaveBeenCalledWith('/auth/login/info', loginInfoRequest);
    expect(loginInfoRequest).not.toHaveProperty('matchedProductIds');
    expect(loginInfoRequest).not.toHaveProperty('mismatchedProductIds');
  });
});
