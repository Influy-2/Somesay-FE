import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProductImg from '@/assets/mock_product_img.png';
import mockProfile from '@/assets/mock_profile_img.svg';

import { CreatorHomeReviewCard } from './CreatorHomeReviewCard';

const meta: Meta<typeof CreatorHomeReviewCard> = {
  title: 'Shared/Review/CreatorHomeReviewCard',
  component: CreatorHomeReviewCard,
  tags: ['autodocs'],
  argTypes: {
    rating: { control: 'number' },
    content: { control: 'text' },
    product: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof CreatorHomeReviewCard>;

export const Default: Story = {
  args: {
    rating: 4.5,
    content:
      '촉촉하고 흡수가 빨라서 데일리로 쓰기 정말 좋아요. 자극 없이 순하게 스며드는 느낌이에요.',
    product: {
      productId: 1,
      imageUrl: mockProductImg,
      brand: '이니스프리',
      productName: '블랙티 유스 에센스 200ml',
      price: 38000,
      rating: 4.5,
      reviewCount: 1240,
      isHearted: false,
      creators: [{ name: '크리에이터1', profileImageUrl: mockProfile }],
    },
  },
};
