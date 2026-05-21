import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiResponse } from '../types';
import type {
  FetchProductProductIdReviewOverviewPathDto,
  ReviewOverviewDto,
} from '../../domain/product/product.dto';

/**
 * 리뷰 개수, AI 요약 및 피부 타입
 */
export const fetchProductProductIdReviewOverview = async (
  pathParams: FetchProductProductIdReviewOverviewPathDto
) => {
  const response = await apiClient.get<ApiResponse<ReviewOverviewDto>>(
    API_ENDPOINTS.PRODUCT_PRODUCT_ID_REVIEW_OVERVIEW.replace(
      '{productId}',
      String(pathParams.productId)
    )
  );

  return response.data.data;
};
