import type { ApiPage } from '../../api/types';
import type {
  PreviewInfoDto,
  ProductCardDto,
  ProductDetailDto,
  ProductListResponseDto,
} from './product.dto';
import type { ProductCardType, ProductDetailType } from './product.types';
import type { ReviewOverviewDto } from '../review/review.dto';
import type { CreatorReviewSummaryType } from '../review/review.types';

export const mapProductDetailDto = (
  item: ProductDetailDto
): ProductDetailType => ({
  productId: item.productId,
  imageUrl: item.productImageUrl,
  brand: item.brandName,
  productName: item.productName,
  price: item.price,
  isHearted: item.userWish,
  brandImageUrl: item.brandImageUrl,
  volume: item.volume,
});

// ReviewOverviewDto를 CreatorReviewSummaryType으로 변환합니다.
export const mapCreatorReviewSummary = (
  item: ReviewOverviewDto
): CreatorReviewSummaryType => ({
  productId: item.productId,
  aveRating: item.aveRating,
  reviewCount: item.reviewCount,
  aiSummary: item.aiSummary,
  productSkinType: item.productSkinType,
  productSkinExpectations: item.productSkinExpectations,
});

const mapCreatorUrls = (urls: string[]) =>
  urls.map((url) => ({
    name: '',
    profileImageUrl: url,
  }));

//TODO: 수정 이거 뭐임?
export const mapProductCardDtoToCard = (
  item: ProductCardDto
): ProductCardType => ({
  productId: item.productId,
  imageUrl: item.productImageUrl,
  brand: item.brandName,
  productName: item.productName,
  price: item.price,
  rating: item.aveRating,
  reviewCount: item.reviewCount ?? 0,
  isHearted: item.userWish,
  creators: mapCreatorUrls(item.creatorImageUrls),
});

// 상품 카드에 사용.
export const mapPreviewInfoDtoToCard = (
  item: PreviewInfoDto
): ProductCardType => ({
  productId: item.productId,
  imageUrl: item.productImageUrl,
  brand: item.brandName,
  productName: item.productName,
  price: item.price,
  rating: item.aveRating,
  reviewCount: item.reviewCount,
  isHearted: item.userWish,
  creators: mapCreatorUrls(item.creatorImageUrls),
});

export const mapProductListDtoToCards = (data: ProductListResponseDto) => ({
  ...data,
  products: data.products.map(mapProductCardDtoToCard),
});

export const mapProductPreviewPageDtoToCards = (
  page: ApiPage<PreviewInfoDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapPreviewInfoDtoToCard),
});
