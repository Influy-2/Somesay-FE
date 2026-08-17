import { fetchReviewComments, QUERY_KEYS } from '@somesay/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useFetchReviewComments = (reviewId?: number) => {
  const isValidReviewId =
    typeof reviewId === 'number' && Number.isFinite(reviewId);

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.REVIEW.COMMENTS(reviewId ?? 0),
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchReviewComments(reviewId ?? 0, { page: pageParam, size: 10 }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNext ? pages.length : undefined,
    enabled: isValidReviewId,
  });
};
