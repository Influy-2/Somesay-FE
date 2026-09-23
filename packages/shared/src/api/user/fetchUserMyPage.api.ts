import { API_ENDPOINTS } from '../../constants/endpoints';
import type { UserMyPageType } from '../../domain/user/user.types';
import { apiClient } from '../client';
import type { ApiResponse } from '../types';

// 마이페이지 첫 화면의 프로필과 활동 통계를 조회합니다.
export const fetchUserMyPage = async (): Promise<UserMyPageType> => {
  const response = await apiClient.get<ApiResponse<UserMyPageType>>(
    API_ENDPOINTS.USER.MYPAGE
  );

  return response.data.data;
};
