import type { SocialProvider } from '../schemas/auth.schema';
import type { SocialLoginResult } from '../types/auth.types';

export const requestSocialLogin = (
  provider: SocialProvider
): Promise<SocialLoginResult> => {
  // TODO: OAuth 연동 후 백엔드 응답으로 기존 회원과 신규 회원을 구분합니다.
  return Promise.resolve({
    status: 'ONBOARDING_REQUIRED',
    provider,
  });
};
