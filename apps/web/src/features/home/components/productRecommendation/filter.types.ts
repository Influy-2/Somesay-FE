import type {
  SkinConcernOption,
  SkinTypeOption,
  SubcategoryOption,
  FilterGroupType,
} from '@somesay/shared';

export type RecommendedFilterGroupType = Exclude<FilterGroupType, 'effect'>;

export interface SelectedFiltersType {
  skinConcern: SkinConcernOption[];
  skinType: SkinTypeOption[];
  category: SubcategoryOption[];
}
