// 카테고리 목록 API의 소분류 응답 DTO입니다.
export interface SubcategoryDto {
  subCategoryId: number;
  subCategoryName: string;
}

// 카테고리 목록 API의 대분류 응답 DTO입니다.
export interface CategoryGroupDto {
  mainCategoryId: number;
  mainCategoryName: string;
  imageUrl: string;
  subCategories: SubcategoryDto[];
}
