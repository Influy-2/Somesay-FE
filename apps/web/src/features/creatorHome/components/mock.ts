import type {
  BasicCreatorProfileType,
  ProductPreviewCard,
} from '@somesay/shared';
import mockProfileImg from '@/assets/mock_profile_img.svg';
import mockProfile2Img from '@/assets/mock_profile2_img.png';
import mockProfile3Img from '@/assets/mock_profile3_img.png';
import mockProductImg from '@/assets/mock_product_img.png';

// 타입 확장
interface MockCreatorType extends BasicCreatorProfileType {
  likeCount: number;
  youtubeUrl: string;
}

interface MockProductCardType extends ProductPreviewCard {
  categoryId: number;
}

interface MockReviewType {
  rating: number;
  content: string;
  product: MockProductCardType;
}

// 크리에이터
export const MOCK_CREATOR: MockCreatorType = {
  creatorId: 1,
  creatorName: '레오제이',
  creatorProfileImgUrl: mockProfileImg,
  creatorSubscriberNum: 300000,
  creatorAge: 'TWENTIES',
  creatorSkinTypeIds: [1],
  likeCount: 10000,
  youtubeUrl: 'https://www.youtube.com',
};

// 신뢰도
export const MOCK_TRUST_SCORE = {
  trustScore: 99,
  trustRank: 1,
  totalReviews: 50,
  highEmpathyReviews: 42,
  myEmpathyReviews: 9,
  myOpposedReviews: 0,
  highEmpathyRatio: 90,
};

// 공통 상품 베이스
const MOCK_PRODUCT_BASE: Omit<MockProductCardType, 'productId' | 'categoryId'> =
  {
    productImgUrl: mockProductImg,
    brandName: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍 세럼',
    productPrice: 10000,
    productAvgRating: 4.9,
    productReviewCount: 43,
    isWished: false,
    creatorProfileImgUrls: [mockProfileImg, mockProfile2Img, mockProfile3Img],
  };

// 공통 리뷰 내용
const MOCK_REVIEW_CONTENT =
  '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 향도 은은하고, 남은 에센스는 닦토처럼 써도 부담 없어요. 매일 아침 세안 후에 피부결 정돈용으로 딱 좋습니다.';

// 리뷰 목록 (categoryId는 product에서 관리)
export const MOCK_CREATOR_REVIEWS: MockReviewType[] = [
  {
    rating: 4.8,
    content: MOCK_REVIEW_CONTENT,
    product: { ...MOCK_PRODUCT_BASE, productId: 1, categoryId: 1 },
  },
  {
    rating: 4.8,
    content: MOCK_REVIEW_CONTENT,
    product: { ...MOCK_PRODUCT_BASE, productId: 2, categoryId: 2 },
  },
  {
    rating: 4.8,
    content: MOCK_REVIEW_CONTENT,
    product: { ...MOCK_PRODUCT_BASE, productId: 3, categoryId: 3 },
  },
  {
    rating: 4.8,
    content: MOCK_REVIEW_CONTENT,
    product: { ...MOCK_PRODUCT_BASE, productId: 4, categoryId: 1 },
  },
];
