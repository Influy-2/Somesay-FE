import {
  apiClient,
  postLoginInfo,
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

describe('auth API', () => {
  afterEach(() => vi.restoreAllMocks());

  it('회원가입 기본 정보만 body로 전송하고 data를 반환한다', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: { code: 'SUCCESS', message: '', data: loginInfoResponse },
    });

    await expect(postLoginInfo(loginInfoRequest)).resolves.toEqual(
      loginInfoResponse
    );
    expect(post).toHaveBeenCalledWith(
      '/api/v1/auth/login/info',
      loginInfoRequest
    );
    expect(loginInfoRequest).not.toHaveProperty('matchedProductIds');
    expect(loginInfoRequest).not.toHaveProperty('mismatchedProductIds');
  });
});
