import {
  SKIN_TYPE_OPTIONS,
  USER_SKIN_CONCERN_OPTIONS,
  type AgeType,
  type SignUpInfoRequest,
  type UserProductRequestType,
} from '@somesay/shared';
import { productFitPayloadSchema } from '../schemas/onboarding.schema';
import type {
  OnboardingDraft,
  OnboardingGender,
} from '../types/onboarding.types';

type SignUpDraft = Pick<
  OnboardingDraft,
  'nickname' | 'skinTypeNames' | 'concerns'
> & {
  gender: OnboardingGender;
  age: AgeType;
};

// 온보딩 화면은 선택지를 이름으로 들고 있고 서버는 id 를 받으므로, 같은 옵션 표로 바꿉니다.
// 표에 없는 이름은 보낼 id 가 없어 버립니다.
const toOptionIds = (
  names: string[],
  options: { value: number; label: string }[]
) =>
  names.flatMap((name) => {
    const option = options.find(({ label }) => label === name);
    return option ? [option.value] : [];
  });

// 회원가입 추가 정보 요청(POST /api/v1/auth/signup)을 만듭니다.
export const buildSignUpInfoRequest = ({
  nickname,
  gender,
  age,
  skinTypeNames,
  concerns,
}: SignUpDraft): SignUpInfoRequest => ({
  userNickname: nickname.trim(),
  userGender: gender,
  userAge: age,
  skinConcernIds: toOptionIds(concerns, USER_SKIN_CONCERN_OPTIONS),
  skinTypeIds: toOptionIds(skinTypeNames, SKIN_TYPE_OPTIONS),
});

export const buildProductFitPayloads = (
  draft: OnboardingDraft
): UserProductRequestType[] => {
  const payloads: UserProductRequestType[] = [];

  if (draft.matchedProductIds.length > 0) {
    payloads.push(
      productFitPayloadSchema.parse({
        status: 'MATCHED',
        productIds: draft.matchedProductIds,
      })
    );
  }

  if (draft.mismatchedProductIds.length > 0) {
    payloads.push(
      productFitPayloadSchema.parse({
        status: 'MISMATCHED',
        productIds: draft.mismatchedProductIds,
      })
    );
  }

  return payloads;
};
