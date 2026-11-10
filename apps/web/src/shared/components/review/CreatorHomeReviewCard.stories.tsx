import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProductImg from '@/assets/mock_product_img.png';

import { CreatorHomeReviewCard } from './CreatorHomeReviewCard';

const meta: Meta<typeof CreatorHomeReviewCard> = {
  title: 'Shared/Review/CreatorHomeReviewCard',
  component: CreatorHomeReviewCard,
  tags: ['autodocs'],
  argTypes: {
    reviewRating: { control: 'number' },
    reviewContent: { control: 'text' },
    brandName: { control: 'text' },
    productName: { control: 'text' },
    productImgUrl: { control: 'text' },
    productPrice: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof CreatorHomeReviewCard>;

export const Default: Story = {
  args: {
    reviewRating: 4.5,
    reviewContent:
      '촉촉하고 흡수가 빨라서 데일리로 쓰기 정말 좋아요. 자극 없이 순하게 스며드는 느낌이에요.',
    productImgUrl: mockProductImg,
    brandName: '이니스프리',
    productName: '블랙티 유스 에센스 200ml',
    productPrice: 38000,
  },
};
