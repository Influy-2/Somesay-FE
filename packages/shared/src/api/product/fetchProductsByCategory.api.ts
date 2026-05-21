import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiPageParams, ApiResponse } from '../types';
import type { ProductListResponseDto } from '../../domain/product/product.dto';
import type { SortOptionsType } from '../../domain/product/product.types';
import { mapProductListDtoToCards } from '../../domain/product/product.mapper';

/**
 * 카테고리별 상품 목록 조회
 */

interface FetchProductsByCategoryParamsDto extends ApiPageParams {
  mainCategoryId: number;
  subCategoryId?: number;
  sortType?: SortOptionsType['sortType'];
}

export const fetchProductsByCategory = async (
  params: FetchProductsByCategoryParamsDto
) => {
  const response = await apiClient.get<ApiResponse<ProductListResponseDto>>(
    API_ENDPOINTS.PRODUCT,
    { params }
  );

  return mapProductListDtoToCards(response.data.data);
};
