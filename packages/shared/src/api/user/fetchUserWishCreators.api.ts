import type { ApiResponse } from '../types';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { WishCreatorListResponseDto } from '../../domain/wish/wish.dto';
import { mapWishCreatorListDto } from '../../domain/wish/wish.mapper';
import type { FetchUserWishCreatorsParams } from '../../domain/wish/wish.types';

// 로그인한 사용자가 찜한 크리에이터 목록을 조회합니다.
export const fetchUserWishCreators = async (
  params: FetchUserWishCreatorsParams
) => {
  const response = await apiClient.get<ApiResponse<WishCreatorListResponseDto>>(
    API_ENDPOINTS.USER.WISH_CREATORS,
    { params }
  );

  return mapWishCreatorListDto(response.data.data);
};
