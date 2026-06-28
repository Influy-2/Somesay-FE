import { describe, expect, it } from 'vitest';
import {
  agreementsSchema,
  concernsSchema,
  emailSchema,
  nicknameSchema,
  onboardingStepSchemas,
  productFitPayloadSchema,
  signupPayloadSchema,
  skinTypeNamesSchema,
} from './onboarding.schema';

describe('onboarding field schemas', () => {
  it('이메일 형식을 검사하고 앞뒤 공백을 제거한다', () => {
    expect(emailSchema.parse(' user@example.com ')).toBe('user@example.com');
    expect(emailSchema.safeParse('invalid-email').success).toBe(false);
  });

  it('닉네임 길이와 허용 문자를 검사한다', () => {
    expect(nicknameSchema.parse(' 썸세이12 ')).toBe('썸세이12');
    expect(nicknameSchema.safeParse('nickname!').success).toBe(false);
    expect(nicknameSchema.safeParse('1234567890123').success).toBe(false);
  });

  it('필수 약관 동의를 검사한다', () => {
    expect(
      agreementsSchema.safeParse({
        TERMS_OF_SERVICE: true,
        PRIVACY_POLICY: true,
      }).success
    ).toBe(true);
    expect(
      agreementsSchema.safeParse({
        TERMS_OF_SERVICE: true,
        PRIVACY_POLICY: false,
      }).success
    ).toBe(false);
  });

  it('피부 타입과 피부 고민의 필수 여부, 최대 개수, 중복을 검사한다', () => {
    expect(skinTypeNamesSchema.safeParse([]).success).toBe(false);
    expect(
      skinTypeNamesSchema.safeParse(['건성', '지성', '복합성']).success
    ).toBe(false);
    expect(skinTypeNamesSchema.safeParse(['건성', '건성']).success).toBe(false);

    expect(concernsSchema.safeParse([]).success).toBe(true);
    expect(concernsSchema.safeParse(['보습', '진정', '모공']).success).toBe(
      false
    );
  });
});

describe('onboarding step schemas', () => {
  it('선택값이 비어 있어도 완료 기록이 있으면 건너뛴 단계로 인정한다', () => {
    expect(
      onboardingStepSchemas.skinConcerns.safeParse({
        concerns: [],
        completedSteps: ['skinConcerns'],
      }).success
    ).toBe(true);
    expect(
      onboardingStepSchemas.matchedProducts.safeParse({
        matchedProductIds: [],
        completedSteps: ['matchedProducts'],
      }).success
    ).toBe(true);
  });

  it('완료 기록이 없는 선택 단계는 통과하지 못한다', () => {
    expect(
      onboardingStepSchemas.skinConcerns.safeParse({
        concerns: [],
        completedSteps: [],
      }).success
    ).toBe(false);
  });

  it('성별과 연령은 모두 선택해야 한다', () => {
    expect(
      onboardingStepSchemas.profile.safeParse({
        gender: 'FEMALE',
        age: null,
        completedSteps: ['profile'],
      }).success
    ).toBe(false);
  });
});

describe('onboarding payload schemas', () => {
  it('가입 payload를 검증하고 변환한다', () => {
    expect(
      signupPayloadSchema.parse({
        nickname: ' somesay ',
        gender: 'FEMALE',
        age: 'TWENTIES',
        concerns: [],
        skinTypeNames: ['건성'],
      })
    ).toEqual({
      nickname: 'somesay',
      gender: 'FEMALE',
      age: 'TWENTIES',
      concerns: [],
      skinTypeNames: ['건성'],
    });
  });

  it('제품 API payload는 최소 한 개의 제품을 요구한다', () => {
    expect(
      productFitPayloadSchema.safeParse({
        status: 'MATCHED',
        productIds: [],
      }).success
    ).toBe(false);
  });
});
