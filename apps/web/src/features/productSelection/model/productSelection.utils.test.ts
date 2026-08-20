import { describe, expect, it } from 'vitest';
import type { SelectableProduct } from './productSelection.types';
import {
  filterSelectableProducts,
  getProductsByIds,
  hasReachedProductLimit,
} from './productSelection.utils';

const PRODUCTS: SelectableProduct[] = [
  {
    productId: 1,
    productImgUrl: '',
    brandName: '스킨푸드',
    productName: '캐롯 카로틴 Water 패드',
    categoryId: 1,
  },
  {
    productId: 2,
    productImgUrl: '',
    brandName: '이니스프리',
    productName: '화산송이 클렌징폼',
    categoryId: 2,
  },
];

describe('product selection utils', () => {
  it('카테고리로 상품을 필터링한다', () => {
    expect(filterSelectableProducts(PRODUCTS, 1, '')).toEqual([PRODUCTS[0]]);
    expect(filterSelectableProducts(PRODUCTS, 0, '')).toEqual(PRODUCTS);
  });

  it('브랜드와 제품명을 공백과 대소문자에 관계없이 검색한다', () => {
    expect(filterSelectableProducts(PRODUCTS, 0, '스킨 푸드')).toEqual([
      PRODUCTS[0],
    ]);
    expect(filterSelectableProducts(PRODUCTS, 0, 'WATER 패드')).toEqual([
      PRODUCTS[0],
    ]);
  });

  it('선택 순서대로 제품 정보를 반환한다', () => {
    expect(getProductsByIds(PRODUCTS, [2, 1])).toEqual([
      PRODUCTS[1],
      PRODUCTS[0],
    ]);
  });

  it('최대 개수에서는 새 제품만 추가 제한한다', () => {
    expect(hasReachedProductLimit([1, 2], 3, 2)).toBe(true);
    expect(hasReachedProductLimit([1, 2], 2, 2)).toBe(false);
  });
});
