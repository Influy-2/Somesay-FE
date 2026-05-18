export const QUERY_KEYS = {
  PRODUCT: {
    ALL: ['product'] as const,
    LIST: ({
      mainCategoryId,
      subCategoryId,
      sortType,
    }: {
      mainCategoryId?: number;
      subCategoryId?: number;
      sortType?: string;
    } = {}) =>
      [
        ...QUERY_KEYS.PRODUCT.ALL,
        'list',
        { mainCategoryId, subCategoryId, sortType },
      ] as const,
    DETAIL: (productId: number) =>
      [...QUERY_KEYS.PRODUCT.ALL, 'detail', productId] as const,
    REVIEW_OVERVIEW: (productId: number) =>
      [...QUERY_KEYS.PRODUCT.DETAIL(productId), 'review-overview'] as const,
    REVIEWS: (
      productId: number,
      {
        filterByMySkin,
      }: {
        filterByMySkin?: boolean;
      } = {}
    ) =>
      [
        ...QUERY_KEYS.PRODUCT.DETAIL(productId),
        'reviews',
        { filterByMySkin },
      ] as const,
    SIMILAR: (productId: number) =>
      [...QUERY_KEYS.PRODUCT.DETAIL(productId), 'similar'] as const,
  },
  RANKING: {
    ALL: ['ranking'] as const,
    PRODUCTS: ({
      mainCategoryId,
    }: {
      mainCategoryId?: number;
    } = {}) =>
      [...QUERY_KEYS.RANKING.ALL, 'products', { mainCategoryId }] as const,
  },
};
