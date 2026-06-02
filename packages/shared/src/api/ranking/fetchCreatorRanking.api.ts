import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiPageParams, ApiPageResponse } from '../types';
import type { CreatorRankingDto } from '../../domain/creator/creator.dto';
import { mapCreatorRankingPage } from '../../domain/ranking/ranking.mapper';

/**
 * 크리에이터 신뢰도 랭킹 조회
 */
export const fetchCreatorRanking = async (params: ApiPageParams) => {
  const response = await apiClient.get<ApiPageResponse<CreatorRankingDto>>(
    API_ENDPOINTS.CREATOR_RANKING,
    { params }
  );

  return mapCreatorRankingPage(response.data.data);
};
