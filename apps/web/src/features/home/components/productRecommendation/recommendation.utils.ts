import { ALL_SUBCATEGORY_ID } from './filter.constants';
import type { SelectedFiltersType } from './filter.types';

// 추천 결과 화면 상단에 노출할 조건 키워드(선택한 필터 라벨) 목록입니다.
export const getSelectedKeywords = (filters: SelectedFiltersType): string[] => [
  ...filters.skinConcern,
  ...filters.skinType,
  ...filters.category
    .filter(({ subCategoryId }) => subCategoryId !== ALL_SUBCATEGORY_ID)
    .map(({ subCategoryName }) => subCategoryName),
];

export const hasAnySelection = (filters: SelectedFiltersType): boolean =>
  Object.values(filters).some((value) => value.length > 0);
