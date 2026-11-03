import type { ApiResponse } from '../types';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { WishProductListResponseDto } from '../../domain/wish/wish.dto';
import { mapWishProductListDto } from '../../domain/wish/wish.mapper';
import type { FetchUserWishProductsParams } from '../../domain/wish/wish.types';

// 로그인한 사용자가 찜한 상품 목록을 조회합니다.
export const fetchUserWishProducts = async (
  params: FetchUserWishProductsParams
) => {
  const response = await apiClient.get<ApiResponse<WishProductListResponseDto>>(
    API_ENDPOINTS.USER.WISH_PRODUCTS,
    { params }
  );

  return mapWishProductListDto(response.data.data);
};
