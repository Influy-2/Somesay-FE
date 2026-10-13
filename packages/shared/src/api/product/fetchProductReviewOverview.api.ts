import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiResponse } from '../types';
import { buildPath } from '../buildApi';
import type { CreatorReviewSummaryType } from '../../domain/review/review.types';

/**
 * 상품 리뷰 개요 정보를 조회하는 API 함수입니다.
 */
export const fetchProductReviewOverview = async (productId: number) => {
  const response = await apiClient.get<ApiResponse<CreatorReviewSummaryType>>(
    buildPath(API_ENDPOINTS.PRODUCT_PRODUCT_ID_REVIEW_OVERVIEW, {
      productId,
    })
  );

  return response.data.data;
};
