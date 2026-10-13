import { API_ENDPOINTS } from '../../constants/endpoints';
import type { UserSkinInfoType, UserType } from '../../domain/user/user.types';
import { apiClient } from '../client';
import type { ApiResponse } from '../types';

// 로그인한 사용자의 피부 타입·피부 고민을 수정합니다.
export const patchUserSkinInfo = async (body: UserSkinInfoType) => {
  const response = await apiClient.patch<
    ApiResponse<Pick<UserType, 'userId'> & UserSkinInfoType>
  >(API_ENDPOINTS.USER.SKIN_INFO, body);

  return response.data.data;
};
