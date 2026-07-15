import { SortOptionsType } from '../domain/product/product.types';
import type { BrandProductSortType } from '../domain/brand/brand.types';

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
      [...QUERY_KEYS.PRODUCT.ALL, 'review-overview', productId] as const,
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
      size,
      mainCategoryId,
    }: {
      size?: number;
      mainCategoryId?: number;
    } = {}) =>
      [
        ...QUERY_KEYS.RANKING.ALL,
        'products',
        { size, mainCategoryId },
      ] as const,
    CREATORS: ({ size }: { size?: number } = {}) =>
      [...QUERY_KEYS.RANKING.ALL, 'creators', { size }] as const,
  },
  CATEGORY: {
    ALL: ['category'] as const,
    LIST: () => [...QUERY_KEYS.CATEGORY.ALL, 'list'] as const,
  },
  BRAND: {
    ALL: ['brand'] as const,
    DETAIL: (brandId: number) =>
      [...QUERY_KEYS.BRAND.ALL, 'detail', brandId] as const,
    PRODUCTS: (
      brandId: number,
      {
        subCategoryId,
        sortType,
        size,
      }: {
        subCategoryId?: number;
        sortType?: BrandProductSortType;
        size?: number;
      } = {}
    ) =>
      [
        ...QUERY_KEYS.BRAND.ALL,
        brandId,
        'products',
        { subCategoryId, sortType, size },
      ] as const,
    SEARCH: (
      brandId: number,
      {
        keyword,
        subCategoryId,
        sortType,
        size,
      }: {
        keyword: string;
        subCategoryId?: number;
        sortType?: BrandProductSortType;
        size?: number;
      }
    ) =>
      [
        ...QUERY_KEYS.BRAND.ALL,
        brandId,
        'search',
        { keyword, subCategoryId, sortType, size },
      ] as const,
  },
};
