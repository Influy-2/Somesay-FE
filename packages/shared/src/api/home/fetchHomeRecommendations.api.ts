import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import { SKIN_TYPE_OPTIONS } from '../../constants/user.constants';
import type { ApiResponse } from '../types';
import type { HomeRecommendationResponseDto } from '../../domain/recommendation/recommendation.dto';
import { mapHomeRecommendationDto } from '../../domain/recommendation/recommendation.mapper';
import type {
  HomeRecommendationParamsType,
  SelectedFiltersType,
} from '../../domain/recommendation/recommendation.types';

// 카테고리를 고르지 않은(= '전체') 상태를 뜻하는 subCategoryId입니다. 조건에서 제외합니다.
const ALL_SUBCATEGORY_ID = 0;

/**
 * 화면에서 고른 필터 라벨을 추천 API의 쿼리 파라미터(id 기반)로 변환합니다.
 *
 * 화면은 사람이 읽는 라벨로 상태를 다루고 API는 id를 받으므로, 요청 직전 이 한 곳에서만
 * 라벨→id로 바꿉니다. 고르지 않은 조건은 키 자체를 넣지 않아 서버가 전체 조건으로 처리합니다.
 */
export const buildRecommendationParams = (
  filters: SelectedFiltersType
): HomeRecommendationParamsType => {
  const skinTypeId = SKIN_TYPE_OPTIONS.find(
    ({ label }) => label === filters.skinType[0]
  )?.value;

  const subCategoryId = filters.category[0]?.subCategoryId;

  return {
    // 서버의 effects는 상품 기대효과명(= 피부 고민명) 목록입니다.
    ...(filters.skinConcern.length ? { effects: filters.skinConcern } : {}),
    ...(skinTypeId === undefined ? {} : { skinTypeId }),
    ...(subCategoryId === undefined || subCategoryId === ALL_SUBCATEGORY_ID
      ? {}
      : { subCategoryId }),
  };
};

// 홈에서 고른 피부 조건에 맞는 추천 상품 목록을 조회하는 API 함수입니다.
export const fetchHomeRecommendations = async ({
  effects,
  skinTypeId,
  subCategoryId,
}: HomeRecommendationParamsType = {}) => {
  const response = await apiClient.get<
    ApiResponse<HomeRecommendationResponseDto>
  >(API_ENDPOINTS.HOME_RECOMMEND, {
    params: {
      // 값이 없는 조건은 쿼리에서 빠집니다. (axios가 undefined를 직렬화하지 않습니다)
      ...(effects?.length ? { effects } : {}),
      ...(skinTypeId === undefined ? {} : { skinTypeId }),
      ...(subCategoryId === undefined ? {} : { subCategoryId }),
    },
    // effects[]=보습 이 아니라 effects=보습&effects=진정 으로 보냅니다.
    paramsSerializer: { indexes: null },
  });

  return mapHomeRecommendationDto(response.data.data);
};
