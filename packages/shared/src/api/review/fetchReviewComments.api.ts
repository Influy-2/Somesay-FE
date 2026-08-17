import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiPageParams, ApiResponse } from '../types';
import type { CommentPageDto } from '../../domain/comment/comment.dto';
import { buildPath } from '../buildApi';

export const fetchReviewComments = async (
  reviewId: number,
  params: ApiPageParams
) => {
  const response = await apiClient.get<ApiResponse<CommentPageDto>>(
    buildPath(API_ENDPOINTS.REVIEW_COMMENTS, { reviewId }),
    { params }
  );
  return response.data.data;
};
