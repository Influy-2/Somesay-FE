import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiPageParams, ApiPageResponse } from '../types';
import type { CommentPreviewType } from '../../domain/comment/comment.types';
import { buildPath } from '../buildApi';

export const fetchReviewComments = async (
  reviewId: number,
  params: ApiPageParams
) => {
  const response = await apiClient.get<ApiPageResponse<CommentPreviewType>>(
    buildPath(API_ENDPOINTS.REVIEW_COMMENTS, { reviewId }),
    { params }
  );
  return response.data.data;
};
