import { fetchUserWishProducts, QUERY_KEYS } from '@somesay/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

import type { WishProductSortType } from '@somesay/shared';

interface UseFetchWishProductsParams {
  subCategoryId?: number;
  sortType: WishProductSortType;
  size?: number;
}

// 찜한 상품을 페이지 단위로 조회하는 React Query hook입니다.
export const useFetchWishProducts = ({
  subCategoryId,
  sortType,
  size = 10,
}: UseFetchWishProductsParams) => {
  // exactOptionalPropertyTypes 때문에 undefined를 키에 넣지 않도록 조건부로 펼칩니다.
  const filter = {
    sortType,
    ...(subCategoryId !== undefined ? { subCategoryId } : {}),
  };

  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.USER.WISH_PRODUCTS(filter),
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchUserWishProducts({ ...filter, page: pageParam, size }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.pageNumber + 1 : undefined,
    // 전역 기본값과 달리 목록 안에서 재시도 UI를 직접 보여주므로 에러를 던지지 않습니다.
    throwOnError: false,
  });

  return query;
};
