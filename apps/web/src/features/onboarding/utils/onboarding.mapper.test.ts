import { describe, expect, it } from 'vitest';
import { ZodError } from 'zod';
import { INITIAL_ONBOARDING_DRAFT } from '../constants/onboarding.constants';
import type { OnboardingDraft } from '../types/onboarding.types';
import {
  buildProductFitPayloads,
  buildSignupPayload,
} from './onboarding.mapper';

const createCompletedDraft = (): OnboardingDraft => ({
  ...INITIAL_ONBOARDING_DRAFT,
  provider: 'KAKAO',
  nickname: ' somesay ',
  gender: 'FEMALE',
  age: 'TWENTIES',
  concerns: ['보습'],
  skinTypeNames: ['건성'],
  matchedProductIds: [1, 2],
  mismatchedProductIds: [3],
});

describe('onboarding payload mappers', () => {
  it('회원가입에 필요한 필드만 변환한다', () => {
    expect(buildSignupPayload(createCompletedDraft())).toEqual({
      nickname: 'somesay',
      gender: 'FEMALE',
      age: 'TWENTIES',
      concerns: ['보습'],
      skinTypeNames: ['건성'],
    });
  });

  it('필수 회원가입 값이 없으면 payload를 만들지 않는다', () => {
    expect(() =>
      buildSignupPayload({
        ...createCompletedDraft(),
        gender: null,
      })
    ).toThrow(ZodError);
  });

  it('제품이 선택된 상태의 payload만 만든다', () => {
    expect(
      buildProductFitPayloads({
        ...createCompletedDraft(),
        mismatchedProductIds: [],
      })
    ).toEqual([
      {
        status: 'MATCHED',
        productIds: [1, 2],
      },
    ]);
  });

  it('최종 payload의 배열 제한을 다시 검증한다', () => {
    expect(() =>
      buildSignupPayload({
        ...createCompletedDraft(),
        concerns: ['보습', '진정', '모공'],
      })
    ).toThrow(ZodError);

    expect(() =>
      buildProductFitPayloads({
        ...createCompletedDraft(),
        matchedProductIds: [1, 1],
      })
    ).toThrow(ZodError);
  });
});
