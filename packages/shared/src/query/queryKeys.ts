import { SortOptionsType } from '../domain/product/product.types';

export const QUERY_KEYS = {
  PRODUCT: {
    ALL: ['product'] as const,
    BY_CATEGORY: ({
      mainCategoryId,
      subCategoryId,
      sortType,
    }: {
      mainCategoryId?: number;
      subCategoryId?: number;
      sortType?: SortOptionsType['sortType'];
    } = {}) =>
      [
        ...QUERY_KEYS.PRODUCT.ALL,
        mainCategoryId,
        subCategoryId,
        sortType,
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
  CATEGORY: {
    ALL: ['category'] as const,
    LIST: () => [...QUERY_KEYS.CATEGORY.ALL, 'list'] as const,
  },
};
