import {
  getAgeLabel,
  getSkinTypeLabels,
  USER_SKIN_EXPECTATION_OPTIONS,
} from '@somesay/shared';

import { useFetchUserInfo } from './useFetchUserInfo';

/**
 * 로그인 사용자가 회원가입에서 저장한 피부 조건을 화면에서 쓸 수 있게 풀어줍니다.
 *
 * 서버는 피부 조건을 id로 내려주므로, 강조 판단은 id로 하고(isMySkinTypeId)
 * 라벨이 필요한 화면을 위해 한글 변환본도 함께 제공합니다.
 * 비로그인이면 모든 배열이 비어 있고 매처는 항상 false입니다.
 */
export const useMySkinProfile = () => {
  const { data: userInfo } = useFetchUserInfo();

  const skinTypeIds = userInfo?.skinTypeIds ?? [];
  const skinExpectationIds = userInfo?.skinExpectationIds ?? [];

  const skinTypeLabels = getSkinTypeLabels(skinTypeIds);

  const selectedExpectations = skinExpectationIds.flatMap((id) => {
    const option = USER_SKIN_EXPECTATION_OPTIONS.find(
      ({ value }) => value === id
    );

    return option ? [option] : [];
  });

  // 피부 고민은 고민명(속건조)과 기대효과명(속건조 완화) 표기가 화면마다 달라 둘 다 제공합니다.
  const concernLabels = selectedExpectations.map(({ concern }) => concern);
  const productEffectLabels = selectedExpectations.map(
    ({ productEffect }) => productEffect
  );

  const ageLabel = userInfo ? getAgeLabel(userInfo.age) : undefined;

  // 피부 조건은 서버와 사용자 양쪽 다 id를 갖고 있어, 표기 차이에 흔들리지 않게 id로 비교합니다.
  const mySkinTypeIdSet = new Set(skinTypeIds);
  const mySkinExpectationIdSet = new Set(skinExpectationIds);

  const isMySkinTypeId = (id: number) => mySkinTypeIdSet.has(id);
  const isMySkinExpectationId = (id: number) => mySkinExpectationIdSet.has(id);

  // 연령은 id가 아니라 enum이라 라벨로 비교합니다.
  const myLabels = new Set([
    ...skinTypeLabels,
    ...concernLabels,
    ...productEffectLabels,
    ...(ageLabel ? [ageLabel] : []),
  ]);

  const isMyCondition = (label: string) => myLabels.has(label);

  return {
    skinTypeLabels,
    concernLabels,
    productEffectLabels,
    ageLabel,
    isMyCondition,
    isMySkinTypeId,
    isMySkinExpectationId,
  };
};
