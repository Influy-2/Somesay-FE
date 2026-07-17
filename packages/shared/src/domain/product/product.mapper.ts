import type { ApiPage } from '../../api/types';
import type {
  PreviewInfoDto,
  ProductCardDto,
  ProductDetailDto,
  ProductListResponseDto,
  ProductReviewsPageDto,
  ProductReviewsDto,
} from './product.dto';
import type {
  ProductCardType,
  ProductDetailType,
  ProductReviewPageType,
  ProductReviewType,
} from './product.types';
import type { ReviewOverviewDto } from '../review/review.dto';
import type { CreatorReviewSummaryType } from '../review/review.types';
import type { CommentPreviewDto } from '../comment/comment.dto';
import type { CommentPreviewType } from '../comment/comment.types';

export const mapProductDetailDto = (
  item: ProductDetailDto
): ProductDetailType => ({
  productId: item.productId,
  productImageUrl: item.productImgUrl,
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

// ReviewOverviewDto를 CreatorReviewSummaryType으로 변환합니다.
export const mapCreatorReviewSummary = (
  item: ReviewOverviewDto
): CreatorReviewSummaryType => ({
  productId: item.productId,
  avgRating: item.avgRating,
  reviewCount: item.reviewCount,
  aiSummary: item.aiSummary,
  frequentMention: item.frequentMention,
  consideration: item.consideration,
  productSkinTypes: item.productSkinTypes,
  productSkinExpectations: item.productSkinExpectations,
});

export const mapProductCardDtoToCard = (
  item: ProductCardDto
): ProductCardType => ({
  productId: item.productId,
  productImageUrl: item.productImgUrl,
  brandName: item.brandName,
  productName: item.productName,
  price: item.price,
  rating: item.avgRating,
  reviewCount: item.reviewCount ?? 0,
  isHearted: item.userWish,
  creatorImageUrls: item.creatorImageUrls,
});

// 상품 카드에 사용.
export const mapPreviewInfoDtoToCard = (
  item: PreviewInfoDto
): ProductCardType => ({
  productId: item.productId,
  productImageUrl: item.productImgUrl,
  brandName: item.brandName,
  productName: item.productName,
  price: item.price,
  rating: item.avgRating,
  reviewCount: item.reviewCount,
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
  content: page.content.map(mapPreviewInfoDtoToCard),
});

// 백엔드 코멘트 DTO를 화면에서 사용하던 코멘트 타입으로 변환합니다.
const mapCommentPreviewDto = (item: CommentPreviewDto): CommentPreviewType => ({
  reactionId: item.reactionId,
  userId: item.userId,
  nickname: item.nickname,
  profileImageUrl: item.profileImgUrl,
  reactionType: item.reactionType,
  comment: item.comment,
  createdAt: item.createdAt,
  skinTypes: item.skinTypes,
  skinExpectations: item.skinExpectations,
});

// 백엔드 상품 리뷰 DTO를 화면에서 사용하던 상품 리뷰 타입으로 변환합니다.
export const mapProductReviewDto = (
  item: ProductReviewsDto
): ProductReviewType => ({
  nickname: item.creatorName,
  ranking: item.ranking,
  subscriberNum: item.subscriberNum,
  profileImageUrl: item.profileImgUrl,
  trustScore: item.trustScore,
  skinTypes: item.skinTypes,
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
