import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReviewSearchItemResponse } from '@somesay/shared';

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

// 리뷰 검색 응답은 리뷰·크리에이터·상품 필드가 한 객체에 평탄하게 실립니다.
const MOCK_REVIEW: ReviewSearchItemResponse = {
  reviewId: 1,
  reviewContent:
    '건성 피부인데 이 세럼 바른 후 확실히 촉촉해졌어요. 향도 은은하고 흡수도 빠른 편입니다. 자기 전에 바르면 다음날 아침 피부가 탱탱한 느낌이에요.',
  reviewChips: { positive: [], negative: [] },
  reviewRating: 5,
  creatorId: 1,
  creatorName: '올리브영언니',
  creatorProfileImgUrl: mockProfile1,
  creatorAge: 'TWENTIES',
  creatorSkinTypeIds: [1],
  creatorSubscriberNum: 128000,
  creatorRanking: 3,
  productId: 1,
  brandName: '이니스프리',
  productName: '그린티 씨드 세럼 80ml',
  productImgUrl: mockProductImg,
  productPrice: 35000,
};

// 기본 — 별점 5점
export const Default: Story = {
  args: {
    review: MOCK_REVIEW,
  },
};

// 별점 3점 — 중간 평가
export const MidRating: Story = {
  args: {
    review: {
      ...MOCK_REVIEW,
      reviewId: 2,
      reviewRating: 3,
      reviewContent:
        '보습력은 좋은데 가격 대비 용량이 아쉬워요. 향이 호불호가 갈릴 것 같고 지성 피부엔 조금 무거울 수 있어요.',
      creatorId: 2,
      creatorName: '뷰티러버',
      creatorSkinTypeIds: [2],
      creatorSubscriberNum: 45000,
    },
  },
};

// 긴 리뷰 텍스트 — 4줄 말줄임 확인
export const LongContent: Story = {
  args: {
    review: {
      ...MOCK_REVIEW,
      reviewId: 3,
      reviewRating: 4,
      reviewContent:
        '처음에는 반신반의하며 구매했는데 사용해보니 정말 좋더라고요. 건성 피부에 아주 잘 맞고, 아침저녁으로 꾸준히 사용하면 피부 결이 확연히 좋아지는 걸 느낄 수 있어요. 다만 뚜껑이 조금 불편하고 세럼 양 조절이 어려워서 매번 너무 많이 나오는 편입니다. 그래도 전반적으로 만족하며 계속 구매할 것 같아요. 특히 환절기에 진짜 도움이 많이 되었습니다.',
      creatorId: 3,
      creatorName: '피부고민러',
      creatorSkinTypeIds: [1],
      creatorSubscriberNum: 65000,
    },
  },
};

// 다른 상품 — 고가 브랜드
export const LuxuryProduct: Story = {
  args: {
    review: {
      ...MOCK_REVIEW,
      reviewId: 4,
      reviewRating: 5,
      reviewContent:
        '가격이 있지만 그만한 값어치를 해요. 피부 진정 효과가 뛰어나고 민감한 피부에도 트러블 없이 사용할 수 있었습니다.',
      creatorId: 4,
      creatorName: '럭셔리뷰티',
      creatorSkinTypeIds: [6],
      creatorSubscriberNum: 320000,
      brandName: '설화수',
      productName: '자음 생크림 진설',
      productPrice: 289000,
    },
  },
};
