import mockProfileImg from '@/assets/mock_profile_img.svg';
import mockProductImg from '@/assets/mock_product_img.png';
import type { ProductCard, ReviewSearchItemResponse } from '@somesay/shared';

const MOCK_CREATOR_IMAGE_URLS = [
  mockProfileImg,
  mockProfileImg,
  mockProfileImg,
];

const MOCK_SEARCH_PRODUCT: ProductCard = {
  productId: 1,
  mainCategoryId: 1,
  subCategoryId: 1,
  productImgUrl: mockProductImg,
  brandName: '브랜드명',
  productName:
    '캐롯 카터 패드 (200매)캐롯 카밍 워터 패드 캐롯 카터 패드 (200매)캐롯 카밍 워터 패...',
  productPrice: 10000,
  productAvgRating: 4.9,
  productReviewCount: 43,
  isWished: false,
  creatorProfileImgUrls: MOCK_CREATOR_IMAGE_URLS,
  productShortSummary:
    '"세럼이 끈적임 없이 촉촉하고, 수분감이 많아서 특히 건성 피부인 분들에게 추천해요."',
  productSkinTypes: [
    { skinTypeId: 1, skinTypeName: '건성' },
    { skinTypeId: 6, skinTypeName: '민감성' },
  ],
  productEffectChips: [
    '각질제거',
    '여드름 진정',
    '각질제거각질제거',
    '여드름 진정',
    '줄 띄움 확인용 기대 효과 기대기대',
  ].map((chipName, index) => ({ chipId: index + 1, chipName })),
};

export const MOCK_SEARCH_PRODUCTS: ProductCard[] = [
  { ...MOCK_SEARCH_PRODUCT, productId: 1 },
  { ...MOCK_SEARCH_PRODUCT, productId: 2 },
  { ...MOCK_SEARCH_PRODUCT, productId: 3 },
  { ...MOCK_SEARCH_PRODUCT, productId: 4 },
  { ...MOCK_SEARCH_PRODUCT, productId: 5 },
  { ...MOCK_SEARCH_PRODUCT, productId: 6 },
  { ...MOCK_SEARCH_PRODUCT, productId: 7 },
  { ...MOCK_SEARCH_PRODUCT, productId: 8 },
];

// 리뷰 검색 응답(ReviewSearchItemResponse)은 리뷰·크리에이터·상품 필드가 평탄하게 실립니다.
const MOCK_SEARCH_REVIEW_BASE: Omit<
  ReviewSearchItemResponse,
  'reviewId' | 'reviewContent' | 'reviewRating'
> = {
  reviewChips: { positive: [], negative: [] },
  creatorId: 1,
  creatorName: '크리에이터닉네임',
  creatorProfileImgUrl: mockProfileImg,
  creatorAge: 'TWENTIES',
  creatorSkinTypes: [{ skinTypeId: 1, skinTypeName: '건성' }],
  creatorSubscriberNum: 12000,
  creatorRanking: 5,
  creatorTrustScore: 80,
  productId: MOCK_SEARCH_PRODUCT.productId,
  brandName: MOCK_SEARCH_PRODUCT.brandName,
  productName: MOCK_SEARCH_PRODUCT.productName,
  productImgUrl: MOCK_SEARCH_PRODUCT.productImgUrl,
  productPrice: MOCK_SEARCH_PRODUCT.productPrice,
};

export const MOCK_SEARCH_REVIEWS: ReviewSearchItemResponse[] = [
  {
    ...MOCK_SEARCH_REVIEW_BASE,
    reviewId: 1,
    reviewContent:
      '세럼이 끈적임 없이 촉촉하고, 수분감이 많아서 특히 건성 피부인 분들에게 추천해요. 향도 은은하고 좋아요.',
    reviewRating: 4.5,
  },
  {
    ...MOCK_SEARCH_REVIEW_BASE,
    reviewId: 2,
    reviewContent:
      '발림성이 좋고 흡수가 빠릅니다. 민감한 피부에도 자극이 없어서 만족해요.',
    reviewRating: 4.0,
  },
];
