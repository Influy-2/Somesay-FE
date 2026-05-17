import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import { ApiPageResponse } from '../types';

export const fetchProductsRanking = async ({
  page,
  size,
  mainCategoryId,
}: {
  page?: number;
  size?: number;
  mainCategoryId?: number;
}) => {
  const response = await apiClient.get<ApiPageResponse<any>>(
    API_ENDPOINTS.PRODUCT_RANKING,

    { params: { page, size, mainCategoryId } }
  );

  return response.data.data;
};
