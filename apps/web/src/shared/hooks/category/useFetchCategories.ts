import { useApiQuery } from '@/shared/api';

interface UseFetchCategoriesOptions {
  // 조회 실패를 화면 안에서 안내하는 곳만 전역 throwOnError(true)를 끈다.
  throwOnError?: boolean;
}

// 대분류, 소분류 카테고리 목록을 조회하는 React Query hook입니다.
// 경로·응답 타입은 스펙에서 추론됩니다. data: MainCategoryResponse[]
export const useFetchCategories = ({
  throwOnError = true,
}: UseFetchCategoriesOptions = {}) =>
  useApiQuery('/api/v1/categories', undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    throwOnError,
  });
