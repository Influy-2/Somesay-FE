import { describe, expect, it } from 'vitest';
import {
  ALL_SUB_CATEGORY_ID,
  getProductSort,
  getSubCategoryId,
} from './subcategory.params';

describe('getProductSort', () => {
  it('계약에 있는 정렬 값은 그대로 돌려준다', () => {
    expect(getProductSort('REVIEW')).toBe('REVIEW');
    expect(getProductSort('PRICE')).toBe('PRICE');
  });

  it('값이 없거나 계약에 없으면 평점순으로 되돌린다', () => {
    expect(getProductSort(null)).toBe('RATING');
    expect(getProductSort('rating')).toBe('RATING');
    expect(getProductSort('RECOMMEND')).toBe('RATING');
  });
});

describe('getSubCategoryId', () => {
  it('양의 정수 문자열은 숫자 ID로 바꾼다', () => {
    expect(getSubCategoryId('101')).toBe(101);
  });

  it('양의 정수가 아니면 전체로 본다', () => {
    expect(getSubCategoryId(null)).toBe(ALL_SUB_CATEGORY_ID);
    expect(getSubCategoryId('abc')).toBe(ALL_SUB_CATEGORY_ID);
    expect(getSubCategoryId('-3')).toBe(ALL_SUB_CATEGORY_ID);
    expect(getSubCategoryId('1.5')).toBe(ALL_SUB_CATEGORY_ID);
  });
});
