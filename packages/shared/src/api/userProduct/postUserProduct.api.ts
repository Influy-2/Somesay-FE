import { API_ENDPOINTS } from '../../constants/endpoints';
import type { UserProductResponseDto } from '../../domain/userProduct/userProduct.dto';
import {
  mapUserProductRequestToDto,
  mapUserProductResponseDto,
} from '../../domain/userProduct/userProduct.mapper';
import type { UserProductRequestType } from '../../domain/userProduct/userProduct.types';
import { apiClient } from '../client';
import type { ApiResponse } from '../types';

// JWT 인증을 사용해 사용자에게 잘 맞거나 맞지 않는 상품을 저장합니다.
export const postUserProduct = async (body: UserProductRequestType) => {
  const response = await apiClient.post<ApiResponse<UserProductResponseDto>>(
    API_ENDPOINTS.USER_PRODUCT,
    mapUserProductRequestToDto(body)
  );

  return mapUserProductResponseDto(response.data.data);
};
