import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiResponse } from '../types';
import type { PreviewInfoDto } from '../../domain/product/product.dto';
import { mapPreviewInfoDtoToCard } from '../../domain/product/product.mapper';
import { buildPath } from '../buildApi';

export const fetchSimilarProducts = async (productId: number) => {
  const response = await apiClient.get<ApiResponse<PreviewInfoDto[]>>(
    buildPath(API_ENDPOINTS.PRODUCT_SIMILAR, { productId })
  );
  return response.data.data.map(mapPreviewInfoDtoToCard);
};
