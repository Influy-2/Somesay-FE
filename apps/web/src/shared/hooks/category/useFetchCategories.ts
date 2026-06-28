import { fetchCategories, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

// 대분류, 소분류 카테고리 목록을 조회하는 React Query hook입니다.
export const useFetchCategories = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.CATEGORY.LIST(),
    queryFn: fetchCategories,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  return query;
};
