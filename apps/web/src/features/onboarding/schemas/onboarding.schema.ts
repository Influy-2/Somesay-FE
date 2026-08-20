import { z } from 'zod';
import { MAX_PRODUCT_SELECTION } from '@/features/productSelection';
import { REQUIRED_AGREEMENT_IDS } from '../constants/onboarding.constants';
import type { OnboardingStep } from '../types/onboarding.types';

export const onboardingGenderSchema = z.enum(['MALE', 'FEMALE', 'NONE']);
export const onboardingAgeSchema = z.enum([
  'TEENS',
  'TWENTIES',
  'THIRTIES',
  'FORTIES',
  'FIFTIES',
  'SIXTIES_PLUS',
]);
export const productFitStatusSchema = z.enum(['MATCHED', 'MISMATCHED']);

export const onboardingStepSchema = z.enum([
  'terms',
  'email',
  'emailVerification',
  'nickname',
  'profile',
  'skinTypes',
  'skinConcerns',
  'matchedProducts',
  'mismatchedProducts',
  'complete',
]);

export const emailSchema = z
  .string()
  .trim()
  .min(1, '이메일을 입력해주세요.')
  .email('올바른 이메일 형식으로 입력해주세요.');

export const nicknameSchema = z
  .string()
  .trim()
  .regex(
    /^[가-힣ㄱ-ㅎㅏ-ㅣa-z0-9]+$/,
    '아이디는 한글, 영어 소문자, 숫자만 사용할 수 있습니다.'
  )
  .min(3, '아이디는 최소 3자, 최대 12자까지 입력할 수 있습니다.')
  .max(12, '아이디는 최소 3자, 최대 12자까지 입력할 수 있습니다.');

export const agreementsSchema = z
  .record(z.string(), z.boolean())
  .superRefine((agreements, context) => {
    REQUIRED_AGREEMENT_IDS.forEach((agreementId) => {
      if (!agreements[agreementId]) {
        context.addIssue({
          code: 'custom',
          message: '필수 약관에 동의해주세요.',
          path: [agreementId],
        });
      }
    });
  });

const uniqueStringArraySchema = z
  .array(z.string().trim().min(1, '선택값은 비어 있을 수 없습니다.'))
  .refine((values) => new Set(values).size === values.length, {
    message: '같은 항목을 중복으로 선택할 수 없습니다.',
  });

export const skinTypeNamesSchema = uniqueStringArraySchema
  .min(1, '피부 타입을 1개 이상 선택해주세요.')
  .max(2, '피부 타입은 최대 2개까지 선택할 수 있습니다.');

export const concernsSchema = uniqueStringArraySchema.max(
  2,
  '피부 고민은 최대 2개까지 선택할 수 있습니다.'
);

export const productIdsSchema = z
  .array(z.number().int().positive('올바른 제품 ID가 아닙니다.'))
  .max(
    MAX_PRODUCT_SELECTION,
    `제품은 최대 ${MAX_PRODUCT_SELECTION}개까지 선택할 수 있습니다.`
  )
  .refine((values) => new Set(values).size === values.length, {
    message: '같은 제품을 중복으로 선택할 수 없습니다.',
  });

const completedStepSchema = (step: OnboardingStep) =>
  z.array(onboardingStepSchema).refine((steps) => steps.includes(step), {
    message: '아직 완료하지 않은 온보딩 단계입니다.',
  });

export const onboardingStepSchemas = {
  terms: z.object({
    agreements: agreementsSchema,
    completedSteps: completedStepSchema('terms'),
  }),
  email: z.object({
    email: emailSchema,
    completedSteps: completedStepSchema('email'),
  }),
  emailVerification: z.object({
    emailVerified: z.literal(true),
    completedSteps: completedStepSchema('emailVerification'),
  }),
  nickname: z.object({
    nickname: nicknameSchema,
    completedSteps: completedStepSchema('nickname'),
  }),
  profile: z.object({
    gender: onboardingGenderSchema,
    age: onboardingAgeSchema,
    completedSteps: completedStepSchema('profile'),
  }),
  skinTypes: z.object({
    skinTypeNames: skinTypeNamesSchema,
    completedSteps: completedStepSchema('skinTypes'),
  }),
  skinConcerns: z.object({
    concerns: concernsSchema,
    completedSteps: completedStepSchema('skinConcerns'),
  }),
  matchedProducts: z.object({
    matchedProductIds: productIdsSchema,
    completedSteps: completedStepSchema('matchedProducts'),
  }),
  mismatchedProducts: z.object({
    mismatchedProductIds: productIdsSchema,
    completedSteps: completedStepSchema('mismatchedProducts'),
  }),
} satisfies Record<Exclude<OnboardingStep, 'complete'>, z.ZodType>;

export const productFitPayloadSchema = z.object({
  status: productFitStatusSchema,
  productIds: productIdsSchema.min(
    1,
    '제품을 1개 이상 선택한 경우에만 전송할 수 있습니다.'
  ),
});
