import type { JwtLoginResponseDto } from './auth.dto';
import type { KakaoLoginResultType } from './auth.types';

// 백엔드 JWT 응답을 프론트엔드 인증 결과로 변환합니다.
export const mapJwtLoginResponseDto = ({
  jwtAccessToken,
  refreshToken,
  newUser,
}: JwtLoginResponseDto): KakaoLoginResultType => ({
  accessToken: jwtAccessToken,
  refreshToken,
  newUser,
});
