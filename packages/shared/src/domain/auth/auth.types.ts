import { GenderType, AgeType } from '../user/user.types';

export interface AuthTokenType {
  accessToken: string;
  refreshToken: string;
}

// 카카오 로그인 후 프론트엔드에서 사용하는 인증 결과입니다.
export interface KakaoLoginResultType extends AuthTokenType {
  newUser: boolean;
  nickname: string;
  enabled: boolean;
}

// 회원가입 기본 정보 API에서 사용하는 프론트엔드 데이터입니다.
export interface LoginInfoType {
  nickname: string;
  gender: GenderType;
  age: AgeType;
  concerns: string[];
  skinTypeNames: string[];
}
