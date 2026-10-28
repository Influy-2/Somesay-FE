import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../constants/endpoints';
import type { ApiResponse } from '../types';
import type { CategoryGroupType } from '../../domain/category/category.types';

// 대분류, 소분류 카테고리 목록을 조회하는 API 함수입니다.
export const fetchCategories = async () => {
  const response = await apiClient.get<ApiResponse<CategoryGroupType[]>>(
    API_ENDPOINTS.CATEGORY
  );

  return response.data.data;
};
