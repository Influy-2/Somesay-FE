import { useApiInfiniteQuery } from '@/shared/api';

const COMMENT_PAGE_SIZE = 10;

// 리뷰 코멘트를 페이지 단위로 조회하는 React Query hook입니다.
export const useFetchReviewComments = (reviewId?: number) => {
  const isValidReviewId =
    typeof reviewId === 'number' && Number.isFinite(reviewId);

  return useApiInfiniteQuery(
    '/api/v1/reviews/{reviewId}/comments',
    {
      params: {
        path: { reviewId: reviewId ?? 0 },
        query: { size: COMMENT_PAGE_SIZE },
      },
    },
    { enabled: isValidReviewId }
  );
};
