import type { FilterGroupType, SubcategoryType } from '@somesay/shared';

export type RecommendedFilterGroupType = Exclude<FilterGroupType, 'effect'>;

export interface SelectedFiltersType {
  skinConcern: string[];
  skinType: string[];
  category: SubcategoryType[];
}
