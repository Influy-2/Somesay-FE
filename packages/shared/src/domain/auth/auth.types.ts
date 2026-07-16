// 카카오 로그인 후 프론트엔드에서 사용하는 인증 결과입니다.
export interface KakaoLoginResultType {
  accessToken: string;
  refreshToken: string;
  newUser: boolean;
}
