/**
 * 쿼리키 규칙 (아직 openapi 로 옮기지 않은 쿼리만 남아 있습니다)
 *
 * - 옮긴 쿼리는 openapi-react-query 키(['get', 경로, init])를 쓰고, 손으로 가리킬 때는 web 의 `apiKey()` 를 씁니다.
 * - 파라미터가 붙는 키는 `_ALL()` prefix 팩토리를 짝으로 둡니다.
 *   invalidateQueries / setQueriesData의 부분 매칭 필터로는 반드시 `_ALL()`을 씁니다.
 * - `ALL` 바로 아래에는 값이 아니라 리터럴 세그먼트를 둡니다.
 *   (`['product', 5]`처럼 값을 바로 붙이면 다른 키와 prefix가 충돌합니다)
 */
export const QUERY_KEYS = {
  PRODUCT: {
    ALL: ['product'] as const,
    REVIEW_OVERVIEW: (productId?: number) =>
      [...QUERY_KEYS.PRODUCT.ALL, 'review-overview', productId] as const,
    REVIEWS: (
      productId?: number,
      {
        filterByMySkin,
      }: {
        filterByMySkin?: boolean;
      } = {}
    ) =>
      [
        ...QUERY_KEYS.PRODUCT.ALL,
        'detail',
        productId,
        'reviews',
        { filterByMySkin },
      ] as const,
  },
  HOME: {
    ALL: ['home'] as const,
    CREATOR_RANKING: () => [...QUERY_KEYS.HOME.ALL, 'creator-ranking'] as const,
    CURATION: (selectedSkinTypeId?: number) =>
      [...QUERY_KEYS.HOME.ALL, 'curation', { selectedSkinTypeId }] as const,
  },
  RANKING: {
    ALL: ['ranking'] as const,
    CREATORS_ALL: () => [...QUERY_KEYS.RANKING.ALL, 'creators'] as const,
    CREATORS: ({ size }: { size?: number }) =>
      [...QUERY_KEYS.RANKING.CREATORS_ALL(), { size }] as const,
  },
  REVIEW: {
    ALL: ['review'] as const,
    TIMELINKS: (reviewId: number) =>
      [...QUERY_KEYS.REVIEW.ALL, reviewId, 'timelinks'] as const,
    COMMENTS: (reviewId: number) =>
      [...QUERY_KEYS.REVIEW.ALL, reviewId, 'comments'] as const,
  },
};
