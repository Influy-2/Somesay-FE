import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import { ApiPageResponse } from '../types';
import type {
  FetchProductsRankingParamsDto,
  ProductRankingItemDto,
} from './ranking.dto';

export const fetchProductsRanking = async ({
  page,
  size,
  mainCategoryId,
}: FetchProductsRankingParamsDto) => {
  const response = await apiClient.get<ApiPageResponse<ProductRankingItemDto>>(
    API_ENDPOINTS.PRODUCT_RANKING,

    { params: { page, size, mainCategoryId } }
  );

  return response.data.data;
};
