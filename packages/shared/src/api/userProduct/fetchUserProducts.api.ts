import { API_ENDPOINTS } from '../../constants/endpoints';
import { mapUserProductStatusToDto } from '../../domain/userProduct/userProduct.mapper';
import type {
  UserProductDetailType,
  UserProductStatusType,
} from '../../domain/userProduct/userProduct.types';
import { apiClient } from '../client';
import type { ApiResponse } from '../types';

// 사용자가 저장해 둔 잘 맞거나 맞지 않는 상품 목록을 조회합니다.
export const fetchUserProducts = async (status: UserProductStatusType) => {
  const response = await apiClient.get<ApiResponse<UserProductDetailType[]>>(
    API_ENDPOINTS.USER_PRODUCT.BASE,
    { params: { status: mapUserProductStatusToDto(status) } }
  );

  return response.data.data;
};
