import type { CurationReviewDto, HomeCurationResponseDto } from './review.dto';
import type { HomeCurationReviewType, HomeCurationType } from './review.types';

// 홈 큐레이션 리뷰 DTO를 화면에서 사용하는 리뷰 정보로 변환합니다.
const mapHomeCurationReviewDto = (
  review: CurationReviewDto
): HomeCurationReviewType => ({
  productId: review.productId,
  productName: review.productName,
  brandName: review.brandName,
  productImgUrl: review.productImgUrl,
  price: review.price,
  creator: {
    creatorId: review.creatorId,
    creatorName: review.creatorName,
    profileImgUrl: review.profileImgUrl,
    age: review.age,
    skinTypeIds: review.skinTypeIds,
    subscriberNum: review.subscriberNum,
    trustScore: review.trustScore,
  },
  reviewId: review.reviewId,
  content: review.content,
  rating: review.rating,
  agreeRatio: review.agreeRatio,
  mostAgreedSkinTypeIds: review.mostAgreedSkinTypeIds,
});

// 홈 큐레이션 응답 DTO 전체를 화면용 데이터로 변환합니다.
export const mapHomeCurationDto = (
  data: HomeCurationResponseDto
): HomeCurationType => ({
  skinTypeId: data.skinTypeId,
  skinTypeName: data.skinTypeName,
  reviews: data.reviews.map(mapHomeCurationReviewDto),
});
