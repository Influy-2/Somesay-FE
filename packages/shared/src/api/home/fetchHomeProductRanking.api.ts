import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiResponse } from '../types';
import type { HomeProductRankingResponseDto } from '../../domain/ranking/ranking.dto';
import { mapHomeProductRanking } from '../../domain/ranking/ranking.mapper';

// 홈 평점 상위 상품 4개를 조회하는 API 함수입니다.
export const fetchHomeProductRanking = async () => {
  const response = await apiClient.get<
    ApiResponse<HomeProductRankingResponseDto>
  >(API_ENDPOINTS.HOME_PRODUCT_RANKING);

  return mapHomeProductRanking(response.data.data);
};
