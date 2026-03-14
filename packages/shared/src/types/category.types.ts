export interface SubCategoryType {
  id: number;
  name: string;
}

export interface CategoryType {
  id: number;
  title: string;
  subCategories?: SubCategoryType[];

}
