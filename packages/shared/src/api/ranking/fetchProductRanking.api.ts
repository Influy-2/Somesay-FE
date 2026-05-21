import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiPageParams, ApiPageResponse } from '../types';
import type { PreviewInfoDto } from '../../domain/product/product.dto';
import { mapProductRankingPageDtoToCards } from '../../domain/ranking/ranking.mapper';

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
  const response = await apiClient.get<ApiPageResponse<PreviewInfoDto>>(
    API_ENDPOINTS.PRODUCT_RANKING,
    { params: { page, size, mainCategoryId } }
  );

  return mapProductRankingPageDtoToCards(response.data.data);
};
