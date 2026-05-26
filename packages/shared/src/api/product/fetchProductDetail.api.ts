import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiResponse } from '../types';
import type { ProductDetailDto } from '../../domain/product/product.dto';
import { mapProductDetailDto } from '../../domain/product/product.mapper';
import { buildPath } from '../buildApi';
/**
 * 제품 기본 정보 제공
 */
export const fetchProductDetail = async (pathParams: { productId: number }) => {
  const response = await apiClient.get<ApiResponse<ProductDetailDto>>(
    buildPath(API_ENDPOINTS.PRODUCT_DETAIL, pathParams)
  );

  return mapProductDetailDto(response.data.data);
};
