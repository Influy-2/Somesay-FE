import { apiClient } from '../client';
import { buildPath } from '../buildApi';
import type { ApiResponse } from '../types';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { BrandDetailDto } from '../../domain/brand/brand.dto';
import { mapBrandDetailDto } from '../../domain/brand/brand.mapper';

// 브랜드 홈 상단에 필요한 브랜드 상세 정보를 조회합니다.
export const fetchBrandDetail = async (brandId: number) => {
  const response = await apiClient.get<ApiResponse<BrandDetailDto>>(
    buildPath(`${API_ENDPOINTS.BRAND.BASE}/${API_ENDPOINTS.BRAND.DETAIL}`, {
      brandId,
    })
  );

  return mapBrandDetailDto(response.data.data);
};
