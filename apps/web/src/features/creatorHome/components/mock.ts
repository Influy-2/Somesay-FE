import type {
  CreatorDetailResponse,
  CreatorReviewResponse,
} from '@somesay/shared';
import mockProfileImg from '@/assets/mock_profile_img.svg';
import mockProductImg from '@/assets/mock_product_img.png';

// 크리에이터 상세 (GET /api/v1/creators/{creatorId} 응답 모양)
export const MOCK_CREATOR: CreatorDetailResponse = {
  creatorId: 1,
  creatorName: '레오제이',
  creatorProfileImgUrl: mockProfileImg,
  creatorAge: 'TWENTIES',
  creatorSkinTypes: [{ skinTypeId: 1, skinTypeName: '건성' }],
  creatorSubscriberNum: 300000,
  creatorRanking: 1,
  creatorTrustScore: 99,
  creatorYoutubeLink: 'https://www.youtube.com',
  creatorPersonalColor: 'COOL',
  creatorReviewCount: 50,
  creatorHighApprovalReviewCount: 42,
  myAgreedReviewCount: 9,
  myDisagreedReviewCount: 0,
};

// 크리에이터 찜 수입니다. 상세 응답에 찜 수 필드가 없어 따로 둡니다.
// TODO: 크리에이터 상세에 찜 수(·내 찜 여부)가 내려오는지 백엔드 확인
export const MOCK_CREATOR_LIKE_COUNT = 10000;

// 공통 리뷰 내용
const MOCK_REVIEW_CONTENT =
  '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 향도 은은하고, 남은 에센스는 닦토처럼 써도 부담 없어요. 매일 아침 세안 후에 피부결 정돈용으로 딱 좋습니다.';

const MOCK_REVIEW_BASE: Omit<
  CreatorReviewResponse,
  'reviewId' | 'productId' | 'mainCategoryName' | 'subCategoryName'
> = {
  reviewContent: MOCK_REVIEW_CONTENT,
  reviewChips: { positive: [], negative: [] },
  reviewRating: 4.8,
  reviewCreatedAt: '2026-11-01T00:00:00',
  creatorId: MOCK_CREATOR.creatorId,
  brandName: '토리든',
  productName: '[스킨푸드] 캐롯 카로팅 카밍 세럼',
  productImgUrl: mockProductImg,
  productPrice: 10000,
};

// 크리에이터 리뷰 목록 (GET /api/v1/creators/{creatorId}/reviews 의 content 모양)
export const MOCK_CREATOR_REVIEWS: CreatorReviewResponse[] = [
  {
    ...MOCK_REVIEW_BASE,
    reviewId: 1,
    productId: 1,
    mainCategoryName: '스킨케어',
    subCategoryName: '세럼',
  },
  {
    ...MOCK_REVIEW_BASE,
    reviewId: 2,
    productId: 2,
    mainCategoryName: '클렌징',
    subCategoryName: '클렌징폼',
  },
  {
    ...MOCK_REVIEW_BASE,
    reviewId: 3,
    productId: 3,
    mainCategoryName: '마스크/팩',
    subCategoryName: '패드',
  },
  {
    ...MOCK_REVIEW_BASE,
    reviewId: 4,
    productId: 4,
    mainCategoryName: '스킨케어',
    subCategoryName: '세럼',
  },
];
