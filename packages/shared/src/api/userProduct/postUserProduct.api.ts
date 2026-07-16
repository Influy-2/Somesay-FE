import { API_ENDPOINTS } from '../../constants/endpoints';
import type {
  UserProductRequestType,
  UserProductResponseType,
} from '../../domain/userProduct/userProduct.types';
import { apiClient } from '../client';
import type { ApiResponse } from '../types';

// 사용자에게 잘 맞거나 맞지 않는 상품을 저장하는 API 함수입니다.
export const postUserProduct = async (body: UserProductRequestType) => {
  const response = await apiClient.post<ApiResponse<UserProductResponseType>>(
    API_ENDPOINTS.USER_PRODUCT,
    body
  );

  return response.data.data;
};
