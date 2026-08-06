import { SortOptionsType } from '../domain/product/product.types';
import type { BrandProductSortType } from '../domain/brand/brand.types';

/**
 * 쿼리키 규칙
 *
 * - 파라미터가 붙는 키는 `_ALL()` prefix 팩토리를 짝으로 둡니다.
 *   invalidateQueries / setQueriesData의 부분 매칭 필터로는 반드시 `_ALL()`을 씁니다.
 * - 파라미터를 받는 팩토리를 필터로 쓰면 안 됩니다.
 *   `PRODUCT_LIST({})`는 `['home','product-list',{}]`이라 실제 캐시된
 *   `['home','product-list',{mainCategoryId:1}]`과 매칭되지 않습니다.
 * - `ALL` 바로 아래에는 값이 아니라 리터럴 세그먼트를 둡니다.
 *   (`['product', 5]`처럼 값을 바로 붙이면 다른 키와 prefix가 충돌합니다)
 */
export const QUERY_KEYS = {
  USER: {
    ALL: ['user'] as const,
    INFO: () => [...QUERY_KEYS.USER.ALL, 'info'] as const,
  },
  PRODUCT: {
    ALL: ['product'] as const,
    BY_CATEGORY_ALL: () => [...QUERY_KEYS.PRODUCT.ALL, 'by-category'] as const,
    BY_CATEGORY: ({
      mainCategoryId,
      subCategoryId,
      sortType,
    }: {
      mainCategoryId?: number;
      subCategoryId?: number;
      sortType?: SortOptionsType['sortType'];
    }) =>
      [
        ...QUERY_KEYS.PRODUCT.BY_CATEGORY_ALL(),
        { mainCategoryId, subCategoryId, sortType },
      ] as const,
    DETAIL_ALL: () => [...QUERY_KEYS.PRODUCT.ALL, 'detail'] as const,
    DETAIL: (productId?: number) =>
      [...QUERY_KEYS.PRODUCT.DETAIL_ALL(), productId] as const,
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
        ...QUERY_KEYS.PRODUCT.DETAIL(productId),
        'reviews',
        { filterByMySkin },
      ] as const,
    SIMILAR: (productId?: number) =>
      [...QUERY_KEYS.PRODUCT.DETAIL(productId), 'similar'] as const,
  },
  HOME: {
    ALL: ['home'] as const,
    CREATOR_RANKING: () => [...QUERY_KEYS.HOME.ALL, 'creator-ranking'] as const,
    PRODUCT_RANKING: () => [...QUERY_KEYS.HOME.ALL, 'product-ranking'] as const,
    CURATION: (selectedSkinTypeId?: number) =>
      [...QUERY_KEYS.HOME.ALL, 'curation', { selectedSkinTypeId }] as const,
    PRODUCT_LIST_ALL: () => [...QUERY_KEYS.HOME.ALL, 'product-list'] as const,
    PRODUCT_LIST: ({
      mainCategoryId,
      subCategoryId,
    }: {
      mainCategoryId?: number;
      subCategoryId?: number;
    }) =>
      [
        ...QUERY_KEYS.HOME.PRODUCT_LIST_ALL(),
        { mainCategoryId, subCategoryId },
      ] as const,
  },
  RANKING: {
    ALL: ['ranking'] as const,
    PRODUCTS_ALL: () => [...QUERY_KEYS.RANKING.ALL, 'products'] as const,
    PRODUCTS: ({
      size,
      mainCategoryId,
    }: {
      size?: number;
      mainCategoryId?: number;
    }) =>
      [...QUERY_KEYS.RANKING.PRODUCTS_ALL(), { size, mainCategoryId }] as const,
    CREATORS_ALL: () => [...QUERY_KEYS.RANKING.ALL, 'creators'] as const,
    CREATORS: ({ size }: { size?: number }) =>
      [...QUERY_KEYS.RANKING.CREATORS_ALL(), { size }] as const,
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
  REVIEW: {
    ALL: ['review'] as const,
    TIMELINKS: (reviewId: number) =>
      [...QUERY_KEYS.REVIEW.ALL, reviewId, 'timelinks'] as const,
    COMMENTS: (reviewId: number) =>
      [...QUERY_KEYS.REVIEW.ALL, reviewId, 'comments'] as const,
  },
};

/**
 * 상품 찜 상태(isHearted)가 캐시에 실리는 쿼리들의 prefix 목록입니다.
 *
 * 찜을 토글한 뒤 캐시를 갱신할 때 이 목록만 순회하면 됩니다.
 * 리뷰/큐레이션/크리에이터 랭킹처럼 찜과 무관한 쿼리는 건드리지 않습니다.
 *
 * 새로 만든 쿼리가 상품 카드나 상품 상세를 담는다면 여기에 prefix를 추가하세요.
 * (누락되면 해당 화면만 갱신되지 않고, 다른 화면은 영향받지 않습니다)
 */
export const WISH_QUERY_PREFIXES = [
  QUERY_KEYS.HOME.PRODUCT_RANKING(),
  QUERY_KEYS.HOME.PRODUCT_LIST_ALL(),
  QUERY_KEYS.RANKING.PRODUCTS_ALL(),
  QUERY_KEYS.PRODUCT.BY_CATEGORY_ALL(),
  QUERY_KEYS.PRODUCT.DETAIL_ALL(),
  // 브랜드 상품 목록/검색은 brandId가 키 중간에 들어가 prefix를 좁힐 수 없습니다.
  // 브랜드 상세에는 찜 상태가 없어 함께 순회해도 변경되지 않습니다.
  QUERY_KEYS.BRAND.ALL,
] as const;
