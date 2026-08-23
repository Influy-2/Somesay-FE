import {
  getAgeLabel,
  getSkinTypeLabel,
  USER_SKIN_EXPECTATION_OPTIONS,
} from '@somesay/shared';

import { useFetchUserInfo } from './useFetchUserInfo';

/**
 * 로그인 사용자가 회원가입에서 저장한 피부 조건을 화면용 라벨로 변환합니다.
 *
 * 사용자 정보는 id 배열(skinTypes, skinExpectations)로 내려오는데
 * 화면의 칩과 필터는 라벨 문자열로 다루기 때문에 이 계층에서 한 번만 변환합니다.
 * 비로그인이면 모든 배열이 비어 있고 isMyCondition은 항상 false입니다.
 */
export const useMySkinProfile = () => {
  const { data: userInfo } = useFetchUserInfo();

  const skinTypeLabels = (userInfo?.skinTypes ?? [])
    .map(getSkinTypeLabel)
    .filter((label): label is string => Boolean(label));

  const selectedExpectations = (userInfo?.skinExpectations ?? []).flatMap(
    (id) => {
      const option = USER_SKIN_EXPECTATION_OPTIONS.find(
        ({ value }) => value === id
      );

      return option ? [option] : [];
    }
  );

  // 피부 고민은 고민명(속건조)과 기대효과명(속건조 완화) 표기가 화면마다 달라 둘 다 제공합니다.
  const concernLabels = selectedExpectations.map(({ concern }) => concern);
  const productEffectLabels = selectedExpectations.map(
    ({ productEffect }) => productEffect
  );

  const ageLabel = userInfo ? getAgeLabel(userInfo.age) : undefined;

  const myLabels = new Set([
    ...skinTypeLabels,
    ...concernLabels,
    ...productEffectLabels,
    ...(ageLabel ? [ageLabel] : []),
  ]);

  // 내 조건과 일치하는 칩만 강조할 때 사용합니다.
  const isMyCondition = (label: string) => myLabels.has(label);

  return {
    skinTypeLabels,
    concernLabels,
    productEffectLabels,
    ageLabel,
    isMyCondition,
  };
};
