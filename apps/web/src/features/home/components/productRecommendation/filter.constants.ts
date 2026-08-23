import {
  SKIN_TYPE_OPTIONS as USER_SKIN_TYPE_OPTIONS,
  USER_SKIN_CONCERN_OPTIONS,
  type SubcategoryType,
} from '@somesay/shared';

import type {
  RecommendedFilterGroupType,
  SelectedFiltersType,
} from './filter.types';

export const FILTER_CATEGORIES: {
  category: RecommendedFilterGroupType;
  label: string;
}[] = [
  { category: 'skinConcern', label: '피부 고민' },
  { category: 'skinType', label: '피부 타입' },
  { category: 'category', label: '카테고리' },
];

export const INITIAL_FILTERS: SelectedFiltersType = {
  skinConcern: [],
  skinType: [],
  category: [],
};

// 카테고리를 고르지 않은 상태를 뜻하는 선택지입니다. (서버에는 보내지 않습니다)
export const ALL_SUBCATEGORY_ID = 0;
export const ALL_SUBCATEGORY_OPTION: SubcategoryType = {
  subCategoryId: ALL_SUBCATEGORY_ID,
  subCategoryName: '전체',
};

// 회원가입에서 저장한 조건과 라벨이 어긋나면 프리필/강조가 조용히 실패하므로
// 선택지는 shared의 사용자 피부 정보 상수 하나에서만 만듭니다.
export const SKIN_CONCERN_OPTIONS = USER_SKIN_CONCERN_OPTIONS.map(
  ({ label }) => label
);

export const SKIN_TYPE_OPTIONS = USER_SKIN_TYPE_OPTIONS.map(
  ({ label }) => label
);

export const MAX_SELECTIONS: Record<RecommendedFilterGroupType, number> = {
  skinConcern: 2,
  skinType: 1,
  category: 1,
};
