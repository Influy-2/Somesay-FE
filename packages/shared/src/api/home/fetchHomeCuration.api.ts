import { apiClient } from '../client';
import type { ApiResponse } from '../types';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { HomeCurationResponseDto } from '../../domain/review/review.dto';
import { mapHomeCurationDto } from '../../domain/review/review.mapper';

// 선택한 피부 타입에 맞는 홈 고평점 리뷰를 조회합니다.
export const fetchHomeCuration = async (selectedSkinTypeId?: number) => {
  const config =
    selectedSkinTypeId === undefined
      ? undefined
      : { params: { selectedSkinTypeId } };

  const response = await apiClient.get<ApiResponse<HomeCurationResponseDto>>(
    API_ENDPOINTS.HOME_CURATION,
    config
  );

  return mapHomeCurationDto(response.data.data);
};
