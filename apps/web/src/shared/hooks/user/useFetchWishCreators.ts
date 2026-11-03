import { fetchUserWishCreators, QUERY_KEYS } from '@somesay/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseFetchWishCreatorsOptions {
  size?: number;
}

// 찜한 크리에이터를 페이지 단위로 조회하는 React Query hook입니다.
export const useFetchWishCreators = ({
  size = 10,
}: UseFetchWishCreatorsOptions = {}) => {
  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.USER.WISH_CREATORS_ALL(),
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchUserWishCreators({ page: pageParam, size }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.pageNumber + 1 : undefined,
    // 전역 기본값과 달리 목록 안에서 재시도 UI를 직접 보여주므로 에러를 던지지 않습니다.
    throwOnError: false,
  });

  return query;
};
