import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiPageParams, ApiPageResponse } from '../types';
import type { CreatorRankingResponseDto } from '../../domain/creator/creator.dto';
import { rankingMapper } from '../../domain/ranking/ranking.mapper';

type FetchRankingCreatorRankingParamsDto = ApiPageParams;

/**
 * 크리에이터 신뢰도 랭킹 조회
 */
export const fetchRankingCreatorRanking = async (
  params: FetchRankingCreatorRankingParamsDto
) => {
  const response = await apiClient.get<
    ApiPageResponse<CreatorRankingResponseDto>
  >(API_ENDPOINTS.RANKING_CREATOR_RANKING, { params });

  return rankingMapper(response.data.data);
};
