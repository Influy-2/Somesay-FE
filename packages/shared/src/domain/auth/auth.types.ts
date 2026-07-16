export type AuthGenderType = 'MALE' | 'FEMALE' | 'NONE';

export type AuthAgeType =
  | 'TEENS'
  | 'TWENTIES'
  | 'THIRTIES'
  | 'FORTIES'
  | 'FIFTIES'
  | 'SIXTIES_PLUS';

// 카카오 로그인 후 프론트엔드에서 사용하는 인증 결과입니다.
export interface KakaoLoginResultType {
  accessToken: string;
  refreshToken: string;
  newUser: boolean;
}

// 회원가입 기본 정보 API에서 사용하는 프론트엔드 데이터입니다.
export interface LoginInfoType {
  nickname: string;
  gender: AuthGenderType;
  age: AuthAgeType;
  concerns: string[];
  skinTypeNames: string[];
}
