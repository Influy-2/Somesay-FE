import { fetchTimeLinks, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

export const useFetchTimeLinks = (reviewId?: number) => {
  const isValidReviewId =
    typeof reviewId === 'number' && Number.isFinite(reviewId);

  return useQuery({
    queryKey: QUERY_KEYS.REVIEW.TIMELINKS(reviewId ?? 0),
    queryFn: () => fetchTimeLinks(reviewId ?? 0),
    enabled: isValidReviewId,
  });
};
