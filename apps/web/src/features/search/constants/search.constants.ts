import type { SelectedFiltersType } from '../types/search.types';

// 아무 필터도 고르지 않은 상태입니다. 필터 초기값과 초기화에 함께 씁니다.
export const EMPTY_FILTERS: SelectedFiltersType = {
  skinType: [],
  effect: [],
  category: [],
};
