import type { WishProductSortType } from '@somesay/shared';

import { WISH_PRODUCT_SORT_OPTIONS } from '../constants/myPage.constants';

// '전체' 소분류를 뜻하는 값입니다. 기본값이라 URL에는 담지 않습니다.
export const ALL_SUB_CATEGORY_ID = 0;

const DEFAULT_SORT_TYPE: WishProductSortType = 'WISHED_AT';

// URL은 사용자가 고칠 수 있으므로 계약에 없는 값이면 기본 정렬로 되돌립니다.
export const getWishProductSort = (value: string | null): WishProductSortType =>
  WISH_PRODUCT_SORT_OPTIONS.find((option) => option.value === value)?.value ??
  DEFAULT_SORT_TYPE;

// 양의 정수가 아니면 '전체'로 봅니다.
export const getSubCategoryId = (value: string | null) => {
  const parsedId = Number(value);

  return Number.isInteger(parsedId) && parsedId > 0
    ? parsedId
    : ALL_SUB_CATEGORY_ID;
};
