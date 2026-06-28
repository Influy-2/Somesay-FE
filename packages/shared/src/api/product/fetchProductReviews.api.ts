import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiPageParams, ApiPageResponse } from '../types';
import type { ProductReviewsDto } from '../../domain/product/product.dto';
import { buildPath } from '../buildApi';

interface FetchProductReviewsParamsDto extends ApiPageParams {
  filterByMySkin?: boolean;
}

/**
 * 특정 상품에 대한 리뷰 리스트 조회
 */
export const fetchProductReviews = async (
  productId: number,
  params: FetchProductReviewsParamsDto
) => {
  const response = await apiClient.get<ApiPageResponse<ProductReviewsDto[]>>(
    buildPath(API_ENDPOINTS.PRODUCT_REVIEWS, {
      productId,
    }),
    { params }
  );

  return response.data.data;
};
