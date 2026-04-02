import type {
  SkinConcernOption,
  SkinTypeOption,
  SubcategoryOption,
} from '@somesay/shared';

export type FilterGroupType = 'skinConcern' | 'skinType' | 'category';

export interface SelectedFiltersType {
  skinConcern: SkinConcernOption[];
  skinType: SkinTypeOption[];
  category: SubcategoryOption[];
}
