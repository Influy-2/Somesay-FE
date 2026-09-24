import { fetchCategories, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

interface UseFetchCategoriesOptions {
  // 조회 실패를 화면 안에서 안내하는 곳만 전역 throwOnError(true)를 끈다.
  throwOnError?: boolean;
}

// 대분류, 소분류 카테고리 목록을 조회하는 React Query hook입니다.
export const useFetchCategories = ({
  throwOnError = true,
}: UseFetchCategoriesOptions = {}) => {
  const query = useQuery({
    queryKey: QUERY_KEYS.CATEGORY.LIST(),
    queryFn: fetchCategories,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    throwOnError,
  });

  return query;
};
