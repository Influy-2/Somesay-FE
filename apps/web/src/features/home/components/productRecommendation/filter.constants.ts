import type { FilterCategoryType, SelectedFiltersType } from './filter.types';

export const FILTER_CATEGORIES: {
  category: FilterCategoryType;
  label: string;
}[] = [
  { category: 'skinConcern', label: '피부 고민' },
  { category: 'skinType', label: '피부 타입' },
  { category: 'productCategory', label: '제품군' },
];
export const INITIAL_FILTERS: SelectedFiltersType = {
  skinConcern: [],
  skinType: [],
  productCategory: [],
};
export const MAX_SELECTIONS: Record<FilterCategoryType, number> = {
  skinConcern: 2,
  skinType: 1,
  productCategory: 1,
};
