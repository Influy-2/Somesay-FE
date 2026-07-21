import { fetchTimeLinks } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

export const useFetchTimeLinks = (reviewId?: number) => {
  const isValidReviewId =
    typeof reviewId === 'number' && Number.isFinite(reviewId);

  return useQuery({
    queryKey: ['review', reviewId, 'timelinks'],
    queryFn: () => fetchTimeLinks(reviewId ?? 0),
    enabled: isValidReviewId,
  });
};
