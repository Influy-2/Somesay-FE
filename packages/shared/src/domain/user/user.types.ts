// 성별 enum
export type GenderType = 'MALE' | 'FEMALE' | 'NONE';

// 나이 enum. zod 스키마(z.enum)가 non-empty 튜플을 요구해 값 목록을 원본으로 두고 타입을 파생한다.
// 타입·스키마·라벨이 모두 여기서 갈라지므로 값이 어긋날 수 없다.
export const AGE_TYPES = [
  'TEENS',
  'TWENTIES',
  'THIRTIES',
  'FORTIES',
  'FIFTIES',
  'SIXTIES_PLUS',
] as const;

export type AgeType = (typeof AGE_TYPES)[number];

export interface UserType {
  userId: number;
  profileImgUrl: string | null;
  nickname: string;
  gender: GenderType;
  age: AgeType;
  skinTypeIds: number[];
  skinExpectationIds: number[];
}

// 서비스 전역에서 사용하는 로그인 사용자 정보입니다.
export type UserInfoType = UserType;
