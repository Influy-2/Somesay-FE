import { mapProductCardDtoToCard } from '../product/product.mapper';
import type {
  HomeRecommendationResponseDto,
  RecommendedProductDto,
} from './recommendation.dto';
import type {
  RecommendedProductType,
  RecommendedTopReviewType,
} from './recommendation.types';

// 추천 상품 DTO를 화면에서 사용하는 추천 상품 정보로 변환합니다.
const mapRecommendedProductDto = (
  item: RecommendedProductDto
): RecommendedProductType => {
  const { productCard, topReview, recommendationScore } = item;

  const mappedTopReview: RecommendedTopReviewType | null = topReview
    ? {
        creator: {
          creatorId: topReview.creator.creatorId,
          creatorName: topReview.creator.creatorName,
          profileImgUrl: topReview.creator.profileImgUrl,
          ageGroup: topReview.creator.ageGroup,
          skinTypes: topReview.creator.skinTypes,
          subscriberNum: topReview.creator.subscriberNum,
          trustScore: topReview.creator.trustScore,
        },
        reviewId: topReview.review.reviewId,
        productId: topReview.review.productId,
        productName: topReview.review.productName,
        content: topReview.review.content,
        rating: topReview.review.rating,
        createdAt: topReview.review.createdAt,
      }
    : null;

  return {
    ...mapProductCardDtoToCard(productCard),
    mainCategoryId: productCard.mainCategoryId,
    subCategoryId: productCard.subCategoryId,
    shortSummary: productCard.shortSummary,
    productSkinTypes: productCard.productSkinTypes ?? [],
    productSkinExpectations: productCard.productSkinExpectations ?? [],
    topReview: mappedTopReview,
    recommendationScore,
  };
};

export const mapHomeRecommendationDto = (
  data: HomeRecommendationResponseDto
): RecommendedProductType[] =>
  (data.productResponses ?? []).map(mapRecommendedProductDto);
