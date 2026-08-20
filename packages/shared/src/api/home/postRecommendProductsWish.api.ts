import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiResponse } from '../types';
import type { RecommendProductsWishRequestDto } from '../../domain/recommendation/recommendation.dto';
import type { RecommendedProductsWishResultType } from '../../domain/recommendation/recommendation.types';

// 추천 상품 목록을 한 번에 찜합니다. (이미 찜한 상품은 그대로 유지됩니다)
export const postRecommendProductsWish = async (
  productIds: number[]
): Promise<RecommendedProductsWishResultType> => {
  const body: RecommendProductsWishRequestDto = { productIds };
  const response = await apiClient.post<
    ApiResponse<RecommendedProductsWishResultType>
  >(API_ENDPOINTS.HOME_RECOMMEND_WISH, body);

  return response.data.data;
};
