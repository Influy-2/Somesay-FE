export const QUERY_KEYS = {
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
