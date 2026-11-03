import { useMemo } from 'react';

import { flattenPages, getTotalCount } from '@somesay/shared';

import { useCreatorWish, useFetchWishCreators } from '@/shared/hooks';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';

import type { WishCreatorType } from '@somesay/shared';

// 찜한 크리에이터 탭의 목록과 찜 토글을 한곳에서 다룹니다.
export const useWishCreators = () => {
  const creatorsQuery = useFetchWishCreators();
  const { toggleWish } = useCreatorWish();

  const creators = useMemo(
    () => flattenPages(creatorsQuery.data),
    [creatorsQuery.data]
  );

  const loadMoreRef = useInfiniteScroll({
    hasNextPage: creatorsQuery.hasNextPage,
    isFetchingNextPage: creatorsQuery.isFetchingNextPage,
    fetchNextPage: creatorsQuery.fetchNextPage,
  });

  return {
    count: getTotalCount(creatorsQuery.data),
    listProps: {
      creators,
      onHeartToggle: (creator: WishCreatorType) =>
        toggleWish({
          creatorId: creator.creatorId,
          isWished: creator.isWished,
        }),
      isLoading: creatorsQuery.isPending,
      isError: creatorsQuery.isError,
      onRetry: () => {
        void creatorsQuery.refetch();
      },
    },
    loadMoreProps: {
      loadMoreRef,
      isFetchingNextPage: creatorsQuery.isFetchingNextPage,
      isFetchNextPageError: creatorsQuery.isFetchNextPageError,
      onRetryNextPage: () => {
        void creatorsQuery.fetchNextPage();
      },
    },
  };
};
