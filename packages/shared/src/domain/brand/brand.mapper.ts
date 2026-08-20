import type {
  BrandAvailableSubCategoryDto,
  BrandDetailDto,
  BrandProductDto,
  BrandProductListDto,
} from './brand.dto';
import type {
  BrandAvailableSubCategoryType,
  BrandSummaryType,
  BrandProductType,
  BrandProductPageType,
} from './brand.types';
import { mapProductCardDtoToCard } from '../product/product.mapper';

// 백엔드 브랜드 소분류 DTO를 프론트엔드 소분류 타입으로 변환합니다.
const mapBrandAvailableSubCategoryDto = (
  item: BrandAvailableSubCategoryDto
): BrandAvailableSubCategoryType => ({
  subCategoryId: item.subCategoryId,
  subName: item.subName,
});

// 브랜드 상세 DTO를 브랜드 홈 UI 타입으로 변환합니다.
export const mapBrandDetailDto = (item: BrandDetailDto): BrandSummaryType => ({
  brandId: item.brandId,
  brandName: item.brandName,
  brandLogoUrl: item.brandLogoUrl,
  brandImgUrl: item.brandImgUrl,
  avgRating: item.avgRating,
  reviewCount: item.totalReviewCount,
  ranking: item.ranking,
  availableSubCategories: item.availableSubCategories.map(
    mapBrandAvailableSubCategoryDto
  ),
});

// 기존 상품 카드 mapper를 재사용해 브랜드 상품 UI 타입으로 변환합니다.
export const mapBrandProductDto = (
  item: BrandProductDto
): BrandProductType => ({
  ...mapProductCardDtoToCard(item),
  mainCategoryId: item.mainCategoryId,
  subCategoryId: item.subCategoryId,
  reviewSummary: item.shortSummary,
  skinTypes: item.productSkinTypes,
  expectedEffects: item.productSkinExpectations.map(
    (expectation) => expectation.concern
  ),
});

// 브랜드 상품 목록의 페이지 메타데이터와 상품을 함께 변환합니다.
export const mapBrandProductListDto = (
  data: BrandProductListDto
): BrandProductPageType => ({
  ...data,
  products: data.products.map(mapBrandProductDto),
});
