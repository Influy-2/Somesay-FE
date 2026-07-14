export interface CategoryGroupType {
  mainCategoryId: number;
  mainCategoryName: string;
  imageUrl: string;
  subCategories: SubcategoryType[];
}

export interface SubcategoryType {
  subCategoryId: number;
  subCategoryName: string;
}
