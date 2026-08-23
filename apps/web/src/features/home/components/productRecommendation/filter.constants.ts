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
export const MAX_SELECTIONS: Record<RecommendedFilterGroupType, number> = {
  skinConcern: 2,
  skinType: 1,
  category: 1,
};
