import type { Meta, StoryObj } from '@storybook/react-vite';
import { EvaluatedReviewCard } from './EvaluatedReviewCard';

const meta: Meta<typeof EvaluatedReviewCard> = {
  title: 'Shared/Review/EvaluatedReviewCard',
  component: EvaluatedReviewCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EvaluatedReviewCard>;

const baseReview = {
  reviewId: 1,
  creatorName: '김크리스탈',
  rating: 4.5,
  content:
    '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요.',
  isAgreed: true,
  product: {
    productId: 1,
    productName: '[캐롯] 카로팅 카밍밍밍ㅁ이밍밍밍밍...',
    brand: '토리든',
    imageUrl: '',
    price: 10000,
  },
};

export const WithComment: Story = {
  args: {
    review: {
      ...baseReview,
      myComment: {
        commentId: 1,
        nickname: 'asdf234',
        isAgree: true,
        content: '이 리뷰에 정말 공감합니다.',
      },
    },
  },
};

export const WithoutComment: Story = {
  args: {
    review: baseReview,
  },
};

export const Disagreed: Story = {
  args: {
    review: {
      ...baseReview,
      isAgreed: false,
    },
  },
};
