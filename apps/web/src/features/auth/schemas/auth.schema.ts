import { z } from 'zod';

export const socialProviderSchema = z.enum(['KAKAO', 'NAVER', 'GOOGLE']);

export type SocialProvider = z.infer<typeof socialProviderSchema>;
