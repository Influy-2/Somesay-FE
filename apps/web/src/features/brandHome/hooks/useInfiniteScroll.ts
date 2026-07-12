import { useCallback, useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
}

// 목록 하단이 가까워지면 다음 무한 쿼리 페이지를 요청합니다.
export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const latestOptionsRef = useRef({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  useEffect(() => {
    latestOptionsRef.current = {
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const loadMoreRef = useCallback((loadMoreTarget: HTMLDivElement | null) => {
    observerRef.current?.disconnect();

    if (!loadMoreTarget) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const { hasNextPage, isFetchingNextPage, fetchNextPage } =
          latestOptionsRef.current;

        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(loadMoreTarget);
    observerRef.current = observer;
  }, []);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return loadMoreRef;
};
