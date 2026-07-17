import {
  socialProviderSchema,
  type SocialProvider,
} from '../schemas/auth.schema';

export const SOCIAL_PROVIDERS = socialProviderSchema.options;

export const SOCIAL_PROVIDER_LABELS: Record<SocialProvider, string> = {
  KAKAO: '카카오',
  NAVER: '네이버',
  GOOGLE: '구글',
};
