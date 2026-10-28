import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiResponse } from '../types';
import type { TimeLinksType } from '../../domain/review/review.types';
import { buildPath } from '../buildApi';

export const fetchTimeLinks = async (reviewId: number) => {
  const response = await apiClient.get<ApiResponse<TimeLinksType>>(
    buildPath(API_ENDPOINTS.REVIEW_TIMELINKS, { reviewId })
  );
  return response.data.data;
};
