import type { CategoryGroupDto, SubcategoryDto } from './category.dto';
import type { CategoryGroupType, SubcategoryType } from './category.types';

// 백엔드 소분류 DTO를 화면에서 사용하던 소분류 타입으로 변환합니다.
const mapSubcategoryDto = (item: SubcategoryDto): SubcategoryType => ({
  subCategoryId: item.subCategoryId,
  subCategoryName: item.subCategoryName,
});

// 백엔드 대분류 DTO를 화면에서 사용하던 대분류 타입으로 변환합니다.
export const mapCategoryGroupDto = (
  item: CategoryGroupDto
): CategoryGroupType => ({
  mainCategoryId: item.mainCategoryId,
  mainCategoryName: item.mainCategoryName,
  imageUrl: item.imageUrl,
  subCategories: item.subCategories.map(mapSubcategoryDto),
});
