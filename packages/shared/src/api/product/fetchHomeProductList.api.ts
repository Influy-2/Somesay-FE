import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiResponse } from '../types';
import type { ProductCardDto } from '../../domain/product/product.dto';
import { mapProductCardDtoToCard } from '../../domain/product/product.mapper';

interface FetchHomeProductListParamsDto {
  mainCategoryId?: number;
  subCategoryId?: number;
}

// 홈 카테고리별 추천 상품 목록을 조회하는 API 함수입니다.
export const fetchHomeProductList = async (
  params?: FetchHomeProductListParamsDto
) => {
  const response = await apiClient.get<ApiResponse<ProductCardDto[]>>(
    API_ENDPOINTS.HOME_PRODUCT_LIST,
    { params }
  );

  return response.data.data.map(mapProductCardDtoToCard);
};
