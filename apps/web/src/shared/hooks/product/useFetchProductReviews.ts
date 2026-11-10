import { useApiInfiniteQuery } from '@/shared/api';

interface UseFetchProductReviewsOptions {
  filterByMySkin?: boolean;
  size?: number;
}

// 상품 리뷰를 페이지 단위로 조회하는 React Query hook입니다.
export const useFetchProductReviews = (
  productId?: number,
  { size = 10, filterByMySkin }: UseFetchProductReviewsOptions = {}
) => {
  const isValidProductId =
    typeof productId === 'number' && Number.isFinite(productId);

  return useApiInfiniteQuery(
    '/api/v1/products/{productId}/reviews',
    {
      params: {
        path: { productId: productId ?? 0 },
        query:
          typeof filterByMySkin === 'boolean'
            ? { size, filterByMySkin }
            : { size },
      },
    },
    {
      // PageResponse 는 page 인덱스를 돌려주지 않아 받은 페이지 수로 다음 page 를 정합니다.
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasNext ? allPages.length : undefined,
      enabled: isValidProductId,
    }
  );
};
