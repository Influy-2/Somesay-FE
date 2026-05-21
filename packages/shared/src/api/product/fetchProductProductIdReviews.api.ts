import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiResponse } from '../types';
import type {
  FetchProductProductIdReviewsParamsDto,
  FetchProductProductIdReviewsPathDto,
  PageResponseReviewDetailDto,
} from '../../domain/product/product.dto';

/**
 * 특정 상품에 대한 리뷰 리스트 조회
 */
export const fetchProductProductIdReviews = async (options: {
  pathParams: FetchProductProductIdReviewsPathDto;
  params: FetchProductProductIdReviewsParamsDto;
}) => {
  const response = await apiClient.get<
    ApiResponse<PageResponseReviewDetailDto>
  >(
    API_ENDPOINTS.PRODUCT_PRODUCT_ID_REVIEWS.replace(
      '{productId}',
      String(options.pathParams.productId)
    ),
    { params: options.params }
  );

  return response.data.data;
};
