import { API_ENDPOINTS } from '../../constants/endpoints';
import type { UserInfoType } from '../../domain/user/user.types';
import { apiClient } from '../client';
import type { ApiResponse } from '../types';

// 로그인한 사용자의 서비스 공통 정보를 조회합니다.
export const fetchUserInfo = async (): Promise<UserInfoType> => {
  const response = await apiClient.get<ApiResponse<UserInfoType>>(
    API_ENDPOINTS.USER.INFO
  );

  return response.data.data;
};
