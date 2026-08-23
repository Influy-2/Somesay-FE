import { apiClient } from '../client';
import { buildPath } from '../buildApi';
import type { ApiPageParams, ApiResponse } from '../types';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ProductListResponseDto } from '../../domain/product/product.dto';
import type { BrandProductSortType } from '../../domain/brand/brand.types';
import { mapBrandProductListDto } from '../../domain/brand/brand.mapper';

interface FetchBrandProductSearchParams extends ApiPageParams {
  keyword: string;
  subCategoryId?: number;
  sortType?: BrandProductSortType;
}

// 브랜드 내 상품을 검색어와 선택 조건으로 페이지 단위 조회합니다.
export const fetchBrandProductSearch = async (
  brandId: number,
  params: FetchBrandProductSearchParams
) => {
  const response = await apiClient.get<ApiResponse<ProductListResponseDto>>(
    buildPath(
      `${API_ENDPOINTS.BRAND.BASE}/${API_ENDPOINTS.BRAND.PRODUCT_SEARCH}`,
      { brandId }
    ),
    { params }
  );

  return mapBrandProductListDto(response.data.data);
};
