import type {
  ProductCardDto,
  ProductListResponseDto,
} from '../product/product.dto';
import type { BrandProductType, BrandProductPageType } from './brand.types';
import { mapProductCardDtoToCard } from '../product/product.mapper';

// 기존 상품 카드 mapper를 재사용해 브랜드 상품 UI 타입으로 변환합니다.
export const mapBrandProductDto = (item: ProductCardDto): BrandProductType => ({
  ...mapProductCardDtoToCard(item),
  mainCategoryId: item.mainCategoryId,
  subCategoryId: item.subCategoryId,
  reviewSummary: item.shortSummary,
  skinTypeIds: item.productSkinTypeIds,
  expectedEffects: item.productSkinExpectations.map(
    (expectation) => expectation.concern
  ),
});

// 브랜드 상품 목록의 페이지 메타데이터와 상품을 함께 변환합니다.
export const mapBrandProductListDto = (
  data: ProductListResponseDto
): BrandProductPageType => ({
  ...data,
  products: data.products.map(mapBrandProductDto),
});
