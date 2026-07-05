import type { ProductCategory } from './productSelection.types';

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
