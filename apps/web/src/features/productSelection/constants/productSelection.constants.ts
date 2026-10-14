import type { ProductCategory } from '../types/productSelection.types';

export const MAX_PRODUCT_SELECTION = 15;
// TODO: 카테고리 api로 수정 필요
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: 0, label: '전체' },
  { id: 1, label: '스킨케어' },
  { id: 2, label: '클렌징' },
  { id: 3, label: '마스크/팩' },
  { id: 4, label: '선케어' },
  { id: 5, label: '베이스' },
];

// 최근 검색어는 이 개수까지만 보관하고, 넘치면 오래된 것부터 버립니다.
export const MAX_RECENT_PRODUCT_SEARCHES = 10;
