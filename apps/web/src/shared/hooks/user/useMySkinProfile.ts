import type { AgeType } from '@somesay/shared';

import { useFetchUserInfo } from './useFetchUserInfo';

/**
 * 크리에이터·상품의 조건이 로그인 사용자의 조건과 일치하는지 판단합니다.
 *
 * 화면에서 "내 조건과 일치하는 칩만 강조"할 때 쓰는 매처만 제공합니다.
 * id·enum을 한글로 바꾸는 일은 화면이 `@somesay/shared`의 `get*Label(s)`로 직접 합니다.
 * 비로그인이면 두 매처 모두 항상 false입니다.
 */
export const useMySkinProfile = () => {
  const { data: userInfo } = useFetchUserInfo();

  // 피부 타입은 서버와 사용자 양쪽 다 id를 갖고 있어, 표기 차이에 흔들리지 않게 id로 비교합니다.
  const mySkinTypeIdSet = new Set(userInfo?.skinTypeIds ?? []);

  const isMySkinTypeId = (id: number) => mySkinTypeIdSet.has(id);

  // 연령은 id가 없어 enum끼리 비교합니다.
  // 연령을 모르는 크리에이터끼리 '연령 정보 없음'으로 매칭되지 않도록 값이 있을 때만 봅니다.
  const isMyAge = (age?: AgeType | null) =>
    age != null && age === userInfo?.age;

  return {
    isMyAge,
    isMySkinTypeId,
  };
};
