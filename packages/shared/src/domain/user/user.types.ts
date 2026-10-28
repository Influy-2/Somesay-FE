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

// 마이페이지 첫 화면의 활동 통계입니다.
// 서버가 statistics 한 덩어리로 내려주고 화면도 한 덩어리로 쓰므로 중첩을 그대로 받습니다.
export interface UserMyPageStatisticsType {
  reviewTotalCount: number;
  reviewCreatorCount: number;
  agreeReviewCount: number;
  disagreeReviewCount: number;
  commentCount: number;
}

// 마이페이지 첫 화면 응답입니다. 프로필 필드는 /users/info와 같은 개념이라 UserType에서 파생합니다.
// TODO: 응답에 age가 없어 연령 칩은 화면이 /users/info 캐시에서 채웁니다. 백엔드에 age 추가 요청 중.
export interface UserMyPageType extends Pick<
  UserType,
  'userId' | 'profileImgUrl' | 'nickname' | 'gender' | 'skinTypeIds'
> {
  statistics: UserMyPageStatisticsType;
}
