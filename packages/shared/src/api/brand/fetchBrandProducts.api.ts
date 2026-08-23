import { apiClient } from '../client';
import { buildPath } from '../buildApi';
import type { ApiPageParams, ApiResponse } from '../types';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ProductListResponseDto } from '../../domain/product/product.dto';
import type { BrandProductSortType } from '../../domain/brand/brand.types';
import { mapBrandProductListDto } from '../../domain/brand/brand.mapper';

interface FetchBrandProductsParams extends ApiPageParams {
  subCategoryId?: number;
  sortType?: BrandProductSortType;
}

// 브랜드의 전체 또는 소분류별 상품을 페이지 단위로 조회합니다.
export const fetchBrandProducts = async (
  brandId: number,
  params: FetchBrandProductsParams
) => {
  const response = await apiClient.get<ApiResponse<ProductListResponseDto>>(
    buildPath(`${API_ENDPOINTS.BRAND.BASE}/${API_ENDPOINTS.BRAND.PRODUCTS}`, {
      brandId,
    }),
    { params }
  );

  return mapBrandProductListDto(response.data.data);
};
