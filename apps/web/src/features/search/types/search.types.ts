import {
  EffectOption,
  SubcategoryOption,
  FilterGroupType,
  SkinTypeOption,
} from '@somesay/shared';

export type SearchTabType = 'product' | 'review';
export type SearchFilterGroupType = Exclude<FilterGroupType, 'skinConcern'>;
export interface RecentSearchItemType {
  id: string;
  query: string;
}

export interface SelectedFiltersType {
  skinType: SkinTypeOption[];
  effect: EffectOption[];
  category: SubcategoryOption[];
}

export type FilterOptionType =
  | SkinTypeOption
  | SubcategoryOption
  | EffectOption;
