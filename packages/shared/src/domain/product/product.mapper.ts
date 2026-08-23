import type { ApiPage } from '../../api/types';
import type {
  PreviewInfoDto,
  ProductDetailDto,
  ProductListResponseDto,
  ProductReviewsPageDto,
  ProductReviewsDto,
  PatchProductWishResponseDto,
} from './product.dto';
import type {
  ProductCardType,
  ProductDetailType,
  ProductReviewPageType,
  ProductReviewType,
  ProductWishResultType,
} from './product.types';
import type { CommentPreviewDto } from '../comment/comment.dto';
import type { CommentPreviewType } from '../comment/comment.types';

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

// 백엔드 코멘트 DTO를 화면에서 사용하던 코멘트 타입으로 변환합니다.
const mapCommentPreviewDto = (item: CommentPreviewDto): CommentPreviewType => ({
  reactionId: item.reactionId,
  userId: item.userId,
  nickname: item.nickname,
  profileImgUrl: item.profileImgUrl,
  reactionType: item.reactionType,
  comment: item.comment,
  createdAt: item.createdAt,
  skinTypeIds: item.skinTypeIds,
  skinExpectationIds: item.skinExpectationIds,
});

// 백엔드 상품 리뷰 DTO를 화면에서 사용하던 상품 리뷰 타입으로 변환합니다.
export const mapProductReviewDto = (
  item: ProductReviewsDto
): ProductReviewType => ({
  creatorName: item.creatorName,
  ranking: item.ranking,
  subscriberNum: item.subscriberNum,
  profileImgUrl: item.profileImgUrl,
  trustScore: item.trustScore,
  skinTypeIds: item.skinTypeIds,
  reviewId: item.reviewId,
  content: item.content,
  rating: item.rating,
  agreeCount: item.agreeCount,
  disagreeCount: item.disagreeCount,
  agreeRatio: item.agreeRatio,
  youtubeUrl: item.youtubeUrl,
  videoTitle: item.videoTitle,
  viewCount: item.viewCount,
  timeLinkCount: item.timeLinkCount,
  totalCommentCount: item.totalCommentCount,
  previewComments: item.previewComments.map(mapCommentPreviewDto),
});

export const mapProductReviewPageDto = (
  page: ProductReviewsPageDto
): ProductReviewPageType => ({
  ...page,
  content: page.content.map(mapProductReviewDto),
});
