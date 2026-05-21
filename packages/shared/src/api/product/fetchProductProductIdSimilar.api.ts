import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiResponse } from '../types';
import type {
  FetchProductProductIdSimilarPathDto,
  PreviewInfoDto,
} from '../../domain/product/product.dto';
import { mapPreviewInfoDtoToCard } from '../../domain/product/product.mapper';

/**
 * 비슷한 기대효과 제품 리스트 조회
 */
export const fetchProductProductIdSimilar = async (
  pathParams: FetchProductProductIdSimilarPathDto
) => {
  const response = await apiClient.get<ApiResponse<PreviewInfoDto[]>>(
    API_ENDPOINTS.PRODUCT_PRODUCT_ID_SIMILAR.replace(
      '{productId}',
      String(pathParams.productId)
    )
  );

  return response.data.data.map(mapPreviewInfoDtoToCard);
};
