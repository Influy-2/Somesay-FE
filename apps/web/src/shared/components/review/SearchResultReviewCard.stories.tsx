import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProductImg from '@/assets/mock_product_img.png';
import mockProfile1 from '@/assets/mock_profile_img.svg';

import { SearchResultReviewCard } from './SearchResultReviewCard';

const meta: Meta<typeof SearchResultReviewCard> = {
  title: 'Shared/Review/SearchResultReviewCard',
  component: SearchResultReviewCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchResultReviewCard>;

const MOCK_CREATOR = {
  creatorId: 1,
  nickname: '올리브영언니',
  profileImageUrl: mockProfile1,
  subscriberNum: 128000,
  trustScore: 92.4,
  ageGroup: 20,
  skinTypes: ['건성'],
};

const MOCK_PRODUCT = {
  productId: 1,
  brand: '이니스프리',
  productName: '그린티 씨드 세럼 80ml',
  imageUrl: mockProductImg,
  price: 35000,
  rating: 4.5,
  reviewCount: 1280,
  isHearted: false,
  creators: [{ name: '올리브영언니', profileImageUrl: mockProfile1 }],
};

// 기본 — 별점 5점
export const Default: Story = {
  args: {
    review: {
      reviewId: 1,
      rating: 5,
      content:
        '건성 피부인데 이 세럼 바른 후 확실히 촉촉해졌어요. 향도 은은하고 흡수도 빠른 편입니다. 자기 전에 바르면 다음날 아침 피부가 탱탱한 느낌이에요.',
      agreeCount: 320,
      disagreeCount: 12,
      createdAt: '2024-03-15',
      creator: MOCK_CREATOR,
      product: MOCK_PRODUCT,
    },
  },
};

// 별점 3점 — 중간 평가
export const MidRating: Story = {
  args: {
    review: {
      reviewId: 2,
      rating: 3,
      content:
        '보습력은 좋은데 가격 대비 용량이 아쉬워요. 향이 호불호가 갈릴 것 같고 지성 피부엔 조금 무거울 수 있어요.',
      agreeCount: 85,
      disagreeCount: 30,
      createdAt: '2024-02-20',
      creator: {
        ...MOCK_CREATOR,
        creatorId: 2,
        nickname: '뷰티러버',
        skinTypes: ['지성'],
        trustScore: 78.1,
        subscriberNum: 45000,
      },
      product: MOCK_PRODUCT,
    },
  },
};

// 긴 리뷰 텍스트 — 4줄 말줄임 확인
export const LongContent: Story = {
  args: {
    review: {
      reviewId: 3,
      rating: 4,
      content:
        '처음에는 반신반의하며 구매했는데 사용해보니 정말 좋더라고요. 건성 피부에 아주 잘 맞고, 아침저녁으로 꾸준히 사용하면 피부 결이 확연히 좋아지는 걸 느낄 수 있어요. 다만 뚜껑이 조금 불편하고 세럼 양 조절이 어려워서 매번 너무 많이 나오는 편입니다. 그래도 전반적으로 만족하며 계속 구매할 것 같아요. 특히 환절기에 진짜 도움이 많이 되었습니다.',
      agreeCount: 210,
      disagreeCount: 5,
      createdAt: '2024-01-08',
      creator: {
        ...MOCK_CREATOR,
        creatorId: 3,
        nickname: '피부고민러',
        skinTypes: ['건성'],
        trustScore: 85.7,
        subscriberNum: 65000,
      },
      product: MOCK_PRODUCT,
    },
  },
};

// 다른 상품 — 고가 브랜드
export const LuxuryProduct: Story = {
  args: {
    review: {
      reviewId: 4,
      rating: 5,
      content:
        '가격이 있지만 그만한 값어치를 해요. 피부 진정 효과가 뛰어나고 민감한 피부에도 트러블 없이 사용할 수 있었습니다.',
      agreeCount: 540,
      disagreeCount: 8,
      createdAt: '2024-03-01',
      creator: {
        ...MOCK_CREATOR,
        creatorId: 4,
        nickname: '럭셔리뷰티',
        skinTypes: ['민감성'],
        subscriberNum: 320000,
        trustScore: 96.2,
      },
      product: {
        ...MOCK_PRODUCT,
        brand: '설화수',
        productName: '자음 생크림 진설',
        price: 289000,
      },
    },
  },
};
