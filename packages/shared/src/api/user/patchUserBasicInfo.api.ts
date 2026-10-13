import { API_ENDPOINTS } from '../../constants/endpoints';
import type { UserBasicInfoType, UserType } from '../../domain/user/user.types';
import { apiClient } from '../client';
import type { ApiResponse } from '../types';

// 로그인한 사용자의 닉네임·성별·연령을 수정합니다.
export const patchUserBasicInfo = async (body: UserBasicInfoType) => {
  const response = await apiClient.patch<
    ApiResponse<Pick<UserType, 'userId'> & UserBasicInfoType>
  >(API_ENDPOINTS.USER.BASIC_INFO, body);

  return response.data.data;
};
