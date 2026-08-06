import type { ApiResponse } from '../types';
import { apiClient } from '../client';
import { buildPath } from '../buildApi';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type {
  PatchProductWishRequestDto,
  PatchProductWishResponseDto,
} from '../../domain/product/product.dto';
import { mapProductWishResponseDto } from '../../domain/product/product.mapper';
import type { ProductWishStatusType } from '../../domain/product/product.types';

// 로그인한 사용자의 상품 찜 상태를 변경합니다.
export const patchProductWish = async (
  productId: number,
  status: ProductWishStatusType
) => {
  const body: PatchProductWishRequestDto = { status };
  const response = await apiClient.patch<
    ApiResponse<PatchProductWishResponseDto>
  >(buildPath(API_ENDPOINTS.PRODUCT_WISH, { productId }), body);

  return mapProductWishResponseDto(response.data.data);
};
