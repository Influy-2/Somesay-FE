import type { BrandProductSortType } from '@somesay/shared';

// '전체' 소분류를 뜻하는 값입니다. 기본값이라 URL에는 담지 않습니다.
export const ALL_SUB_CATEGORY_ID = 0;

const DEFAULT_SORT_TYPE: BrandProductSortType = 'RATING';
const SORT_TYPES: BrandProductSortType[] = ['RATING', 'REVIEW', 'PRICE'];

// URL은 사용자가 고칠 수 있으므로 계약에 없는 값이면 기본 정렬로 되돌립니다.
export const getBrandProductSort = (
  value: string | null
): BrandProductSortType =>
  SORT_TYPES.find((sortType) => sortType === value) ?? DEFAULT_SORT_TYPE;

// 양의 정수가 아니면 '전체'로 봅니다.
export const getSubCategoryId = (value: string | null) => {
  const parsedId = Number(value);

  return Number.isInteger(parsedId) && parsedId > 0
    ? parsedId
    : ALL_SUB_CATEGORY_ID;
};
