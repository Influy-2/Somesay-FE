import type { SocialProvider } from '../schemas/auth.schema';

export type SocialLoginResult =
  | {
      status: 'AUTHENTICATED';
    }
  | {
      status: 'ONBOARDING_REQUIRED';
      provider: SocialProvider;
    };
