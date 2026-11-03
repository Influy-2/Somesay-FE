import type { ApiResponse } from '../types';
import { apiClient } from '../client';
import { buildPath } from '../buildApi';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type {
  CreatorWishStatusDto,
  PatchCreatorWishResponseDto,
} from '../../domain/wish/wish.dto';
import { mapCreatorWishResponseDto } from '../../domain/wish/wish.mapper';

// 로그인한 사용자의 크리에이터 찜 상태를 변경합니다.
export const patchCreatorWish = async (
  creatorId: number,
  status: CreatorWishStatusDto
) => {
  const response = await apiClient.patch<
    ApiResponse<PatchCreatorWishResponseDto>
  >(buildPath(API_ENDPOINTS.CREATOR.WISH, { creatorId }), { status });

  return mapCreatorWishResponseDto(response.data.data);
};
