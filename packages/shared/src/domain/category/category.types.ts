export interface CategoryGroupType {
  mainCategoryId: number;
  mainName: string;
  imageUrl: string;
  subCategories: SubcategoryType[];
}

export interface SubcategoryType {
  subCategoryId: number;
  subName: string;
}
