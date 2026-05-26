import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiResponse } from '../types';
import { buildPath } from '../buildApi';
import type { FetchProductProductIdReviewOverviewPathDto } from '../../domain/product/product.dto';
import type { ReviewOverviewDto } from '../../domain/review/review.dto';
import { mapCreatorReviewSummary } from '../../domain/product/product.mapper';

/**
 * 상품 리뷰 개요 정보를 조회하는 API 함수입니다.
 */
export const fetchProductReviewOverview = async (
  pathParams: FetchProductProductIdReviewOverviewPathDto
) => {
  const response = await apiClient.get<ApiResponse<ReviewOverviewDto>>(
    buildPath(API_ENDPOINTS.PRODUCT_PRODUCT_ID_REVIEW_OVERVIEW, {
      productId: pathParams.productId,
    })
  );

  return mapCreatorReviewSummary(response.data.data);
};
