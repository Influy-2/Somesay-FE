import { API_ENDPOINTS } from '../../constants/endpoints';
import type {
  FetchUserProductSearchParams,
  UserProductSearchResultType,
} from '../../domain/userProduct/userProduct.types';
import { apiClient } from '../client';
import type { ApiResponse } from '../types';

// 잘 맞거나 맞지 않는 상품으로 추가할 상품을 검색합니다.
export const fetchUserProductSearch = async (
  params: FetchUserProductSearchParams
) => {
  const response = await apiClient.get<
    ApiResponse<UserProductSearchResultType>
  >(API_ENDPOINTS.USER_PRODUCT.SEARCH, { params });

  return response.data.data;
};
