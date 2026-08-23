import type { ApiPage } from '../../api/types';
import type {
  PreviewInfoDto,
  ProductDetailDto,
  ProductListResponseDto,
  PatchProductWishResponseDto,
} from './product.dto';
import type {
  ProductCardType,
  ProductDetailType,
  ProductWishResultType,
} from './product.types';

// 상품 찜 API 응답을 화면에서 사용하는 boolean 상태로 변환합니다.
export const mapProductWishResponseDto = (
  item: PatchProductWishResponseDto
): ProductWishResultType => ({
  userId: item.userId,
  productId: item.productId,
  isHearted: item.status === 'LIKE',
});

export const mapProductDetailDto = (
  item: ProductDetailDto
): ProductDetailType => ({
  productId: item.productId,
  productImgUrl: item.productImgUrl,
  brandName: item.brandName,
  productName: item.productName,
  price: item.price,
  isHearted: item.userWish,
  brandId: item.brandId,
  brandLogoUrl: item.brandLogoUrl,
  volume: item.volume,
  collabChannelUrl: item.collabChannelUrl,
  collabChannelName: item.collabChannelName,
  collabProfileImgUrl: item.collabProfileImgUrl,
  productNotes: item.productNotes,
});

// 상품 카드/미리보기 DTO를 화면용 상품 카드 타입으로 변환합니다.
// 남는 변환은 userWish → isHearted 뿐이라 카드/미리보기용을 하나로 합쳤습니다.
export const mapProductCardDtoToCard = (
  item: PreviewInfoDto
): ProductCardType => ({
  productId: item.productId,
  productImgUrl: item.productImgUrl,
  brandName: item.brandName,
  productName: item.productName,
  price: item.price,
  avgRating: item.avgRating,
  reviewCount: item.reviewCount ?? 0,
  isHearted: item.userWish,
  creatorImageUrls: item.creatorImageUrls,
});

export const mapProductListDtoToCards = (data: ProductListResponseDto) => ({
  ...data,
  products: data.products.map(mapProductCardDtoToCard),
});

export const mapProductPreviewPageDtoToCards = (
  page: ApiPage<PreviewInfoDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapProductCardDtoToCard),
});
