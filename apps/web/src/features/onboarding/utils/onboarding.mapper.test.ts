import { describe, expect, it } from 'vitest';
import { ZodError } from 'zod';
import { INITIAL_ONBOARDING_DRAFT } from '../constants/onboarding.constants';
import type { OnboardingDraft } from '../types/onboarding.types';
import {
  buildProductFitPayloads,
  buildSignUpInfoRequest,
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
  it('회원가입 요청은 서버 필드명으로 만들고 피부 고민·타입 이름을 id 로 바꾼다', () => {
    expect(
      buildSignUpInfoRequest({
        nickname: ' somesay ',
        gender: 'FEMALE',
        age: 'TWENTIES',
        concerns: ['보습', '주름/탄력'],
        skinTypeNames: ['건성', '모르겠음'],
      })
    ).toEqual({
      userNickname: 'somesay',
      userGender: 'FEMALE',
      userAge: 'TWENTIES',
      skinConcernIds: [1, 7],
      skinTypeIds: [1, 8],
    });
  });

  it('옵션 표에 없는 이름은 회원가입 요청에서 뺀다', () => {
    expect(
      buildSignUpInfoRequest({
        nickname: 'somesay',
        gender: 'NONE',
        age: 'TEENS',
        concerns: ['없는 고민'],
        skinTypeNames: ['지성', '없는 타입'],
      })
    ).toMatchObject({ skinConcernIds: [], skinTypeIds: [2] });
  });

  it('잘 맞는 상품과 안 맞는 상품이 있으면 각각 payload를 만든다', () => {
    expect(buildProductFitPayloads(createCompletedDraft())).toEqual([
      {
        status: 'MATCHED',
        productIds: [1, 2],
      },
      {
        status: 'MISMATCHED',
        productIds: [3],
      },
    ]);
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

  it('선택된 제품이 없으면 payload를 만들지 않는다', () => {
    expect(
      buildProductFitPayloads({
        ...createCompletedDraft(),
        matchedProductIds: [],
        mismatchedProductIds: [],
      })
    ).toEqual([]);
  });

  it('최종 제품 payload의 배열 제한을 다시 검증한다', () => {
    expect(() =>
      buildProductFitPayloads({
        ...createCompletedDraft(),
        matchedProductIds: [1, 1],
      })
    ).toThrow(ZodError);
  });
});
