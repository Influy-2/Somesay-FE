import type {
  LoginInfoRequestDto,
  LoginInfoResponseDto,
} from '../../domain/auth/auth.dto';
import { API_ENDPOINTS } from '../../constants/endpoints';
import { apiClient } from '../client';
import type { ApiResponse } from '../types';

// 회원가입 후 기본 정보를 저장하는 API 함수입니다.
export const postLoginInfo = async (body: LoginInfoRequestDto) => {
  const response = await apiClient.post<ApiResponse<LoginInfoResponseDto>>(
    API_ENDPOINTS.AUTH.LOGIN_INFO,
    body
  );

  return response.data.data;
};
