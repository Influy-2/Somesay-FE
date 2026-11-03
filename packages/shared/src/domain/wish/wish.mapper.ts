import type {
  PatchCreatorWishResponseDto,
  WishCreatorListResponseDto,
  WishProductDto,
  WishProductListResponseDto,
} from './wish.dto';
import type {
  CreatorWishResultType,
  WishCreatorPageType,
  WishProductPageType,
  WishProductType,
} from './wish.types';

// 찜 목록 응답에는 userWish가 없지만, 목록에 있다는 것 자체가 찜 상태라 true로 채웁니다.
export const mapWishProductDto = (item: WishProductDto): WishProductType => ({
  productId: item.productId,
  productImgUrl: item.productImgUrl,
  brandName: item.brandName,
  productName: item.productName,
  price: item.price,
  avgRating: item.avgRating,
  reviewCount: item.reviewCount,
  creatorImageUrls: item.creatorImageUrls,
  isHearted: true,
  reviewSummary: item.shortSummary,
  skinTypeIds: item.productSkinTypeIds,
  expectedEffects: item.productSkinExpectations.map(
    (expectation) => expectation.concern
  ),
});

// productList 래핑을 벗기고 totalCount를 페이지에 붙입니다.
export const mapWishProductListDto = (
  data: WishProductListResponseDto
): WishProductPageType => ({
  ...data.productList,
  content: data.productList.content.map(mapWishProductDto),
  totalCount: data.totalCount,
});

// creatorList 래핑을 벗기고 찜 목록의 크리에이터는 모두 찜 상태로 채웁니다.
export const mapWishCreatorListDto = (
  data: WishCreatorListResponseDto
): WishCreatorPageType => ({
  ...data.creatorList,
  content: data.creatorList.content.map((creator) => ({
    ...creator,
    isHearted: true,
  })),
  creatorCount: data.creatorCount,
});

// 크리에이터 찜 API 응답을 화면에서 사용하는 boolean 상태로 변환합니다.
export const mapCreatorWishResponseDto = (
  item: PatchCreatorWishResponseDto
): CreatorWishResultType => ({
  creatorId: item.creatorId,
  isHearted: item.status === 'LIKE',
});
