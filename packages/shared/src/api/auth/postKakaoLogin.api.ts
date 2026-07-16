import type { JwtLoginResponseDto } from '../../domain/auth/auth.dto';
import { mapJwtLoginResponseDto } from '../../domain/auth/auth.mapper';
import { API_ENDPOINTS } from '../../constants/endpoints';
import { apiClient } from '../client';

// 카카오 인가 코드를 백엔드에 전달해 로그인 결과를 받아옵니다.
export const postKakaoLogin = async (code: string) => {
  const response = await apiClient.post<JwtLoginResponseDto>(
    API_ENDPOINTS.AUTH.KAKAO_LOGIN,
    undefined,
    {
      params: { code },
    }
  );

  return mapJwtLoginResponseDto(response.data);
};
