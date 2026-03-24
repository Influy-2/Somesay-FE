import type {
  SkinConcernOption,
  SkinTypeOption,
  ProductSubCategoryOption,
} from '@somesay/shared';

export type FilterCategoryType = 'skinConcern' | 'skinType' | 'productCategory';

export interface SelectedFiltersType {
  skinConcern: SkinConcernOption[];
  skinType: SkinTypeOption[];
  productCategory: ProductSubCategoryOption[];
}
