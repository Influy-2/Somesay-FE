import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiPageParams, ApiPageResponse } from '../types';
import type { ProductDto } from '../../domain/product/product.dto';

interface ProductRankingParams extends ApiPageParams {
  mainCategoryId?: number;
}

/**
 * 상품 랭킹 조회
 */
export const fetchProductRanking = async ({
  page,
  size,
  mainCategoryId,
}: ProductRankingParams) => {
  const response = await apiClient.get<ApiPageResponse<ProductDto>>(
    API_ENDPOINTS.PRODUCT_RANKING,
    { params: { page, size, mainCategoryId } }
  );

  return response.data.data;
};
