import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiResponse } from '../types';
import type { HomeCreatorRankingDto } from '../../domain/ranking/ranking.dto';
import { mapHomeCreatorRanking } from '../../domain/ranking/ranking.mapper';

// 홈 크리에이터 신뢰도 랭킹 5개를 조회하는 API 함수입니다.
export const fetchHomeCreatorRanking = async () => {
  const response = await apiClient.get<ApiResponse<HomeCreatorRankingDto[]>>(
    API_ENDPOINTS.HOME_CREATOR_RANKING
  );

  return mapHomeCreatorRanking(response.data.data);
};
