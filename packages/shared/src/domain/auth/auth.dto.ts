// 카카오 로그인 API가 반환하는 사용자 및 JWT 정보입니다.
export interface JwtLoginResponseDto {
  userId: number;
  email: string;
  nickname: string;
  profileImgUrl: string;
  jwtAccessToken: string;
  refreshToken: string;
  enabled: boolean;
  newUser: boolean;
}
