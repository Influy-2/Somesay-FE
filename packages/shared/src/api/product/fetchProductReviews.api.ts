import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiPageParams, ApiResponse } from '../types';
import type { ProductReviewPageType } from '../../domain/product/product.types';
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
  const response = await apiClient.get<ApiResponse<ProductReviewPageType>>(
    buildPath(API_ENDPOINTS.PRODUCT_REVIEWS, {
      productId,
    }),
    { params }
  );

  return response.data.data;
};
