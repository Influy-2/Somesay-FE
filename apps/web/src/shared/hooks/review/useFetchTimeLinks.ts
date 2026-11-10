import { useApiQuery } from '@/shared/api';

// 리뷰 원본 영상(타임링크) 목록을 조회하는 React Query hook입니다.
export const useFetchTimeLinks = (reviewId?: number) => {
  const isValidReviewId =
    typeof reviewId === 'number' && Number.isFinite(reviewId);

  return useApiQuery(
    '/api/v1/reviews/{reviewId}/timelinks',
    { params: { path: { reviewId: reviewId ?? 0 } } },
    { enabled: isValidReviewId }
  );
};
