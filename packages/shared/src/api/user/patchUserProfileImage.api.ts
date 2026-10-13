import { API_ENDPOINTS } from '../../constants/endpoints';
import { apiClient } from '../client';
import type { ApiResponse } from '../types';

// 로그인한 사용자의 프로필 이미지를 변경합니다.
export const patchUserProfileImage = async (profileImage: File) => {
  const formData = new FormData();
  formData.append('profileImage', profileImage);

  const response = await apiClient.patch<ApiResponse<string>>(
    API_ENDPOINTS.USER.PROFILE_IMAGE,
    formData,
    {
      // apiClient 기본 Content-Type이 JSON이라, 명시하지 않으면 axios가 FormData를 JSON으로 직렬화합니다.
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return response.data.data;
};
