import mockProfileImg from '@/assets/mock_profile_img.svg';
import mockProductImg from '@/assets/mock_product_img.png';
import type {
  ProductSearchResultType,
  ReviewSearchResultType,
} from '@somesay/shared';

const MOCK_CREATORS = [
  { name: '크리에이터1', profileImageUrl: mockProfileImg },
  { name: '크리에이터2', profileImageUrl: mockProfileImg },
  { name: '크리에이터3', profileImageUrl: mockProfileImg },
];

const MOCK_SEARCH_PRODUCT: ProductSearchResultType = {
  productId: 1,
  imageUrl: mockProductImg,
  brand: '브랜드명',
  productName:
    '캐롯 카터 패드 (200매)캐롯 카밍 워터 패드 캐롯 카터 패드 (200매)캐롯 카밍 워터 패...',
  price: 10000,
  rating: 4.9,
  reviewCount: 43,
  isHearted: false,
  creators: MOCK_CREATORS,
  reviewSummary:
    '"세럼이 끈적임 없이 촉촉하고, 수분감이 많아서 특히 건성 피부인 분들에게 추천해요."',
  skinTypes: ['건성', '민감성'],
  expectedEffects: [
    '각질제거',
    '여드름 진정',
    '각질제거각질제거',
    '여드름 진정',
    '줄 띄움 확인용 기대 효과 기대기대',
  ],
};

export const MOCK_SEARCH_PRODUCTS: ProductSearchResultType[] = [
  { ...MOCK_SEARCH_PRODUCT, productId: 1 },
  { ...MOCK_SEARCH_PRODUCT, productId: 2 },
  { ...MOCK_SEARCH_PRODUCT, productId: 3 },
  { ...MOCK_SEARCH_PRODUCT, productId: 4 },
  { ...MOCK_SEARCH_PRODUCT, productId: 5 },
  { ...MOCK_SEARCH_PRODUCT, productId: 6 },
  { ...MOCK_SEARCH_PRODUCT, productId: 7 },
  { ...MOCK_SEARCH_PRODUCT, productId: 8 },
];

const MOCK_CREATOR_PROFILE = {
  creatorId: 1,
  nickname: '크리에이터닉네임',
  profileImageUrl: mockProfileImg,
  subscriberCount: 12000,
  trustScore: 4.7,
  ageGroup: 20,
  skinType: '건성',
};

const MOCK_REVIEW_PRODUCT: ProductSearchResultType = {
  ...MOCK_SEARCH_PRODUCT,
  productId: 1,
};

export const MOCK_SEARCH_REVIEWS: ReviewSearchResultType[] = [
  {
    reviewId: 1,
    content:
      '세럼이 끈적임 없이 촉촉하고, 수분감이 많아서 특히 건성 피부인 분들에게 추천해요. 향도 은은하고 좋아요.',
    rating: 4.5,
    agreeCount: 12,
    disagreeCount: 1,
    createdAt: '2024-03-01',
    creator: MOCK_CREATOR_PROFILE,
    product: MOCK_REVIEW_PRODUCT,
  },
  {
    reviewId: 2,
    content:
      '발림성이 좋고 흡수가 빠릅니다. 민감한 피부에도 자극이 없어서 만족해요.',
    rating: 4.0,
    agreeCount: 8,
    disagreeCount: 0,
    createdAt: '2024-02-15',
    creator: MOCK_CREATOR_PROFILE,
    product: MOCK_REVIEW_PRODUCT,
  },
];
