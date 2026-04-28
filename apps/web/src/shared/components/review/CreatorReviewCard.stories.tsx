import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProfile from '@/assets/mock_profile_img.svg';

import { CreatorReviewCard } from './CreatorReviewCard';

const meta: Meta<typeof CreatorReviewCard> = {
  title: 'Shared/Review/CreatorReviewCard',
  component: CreatorReviewCard,
  tags: ['autodocs'],
  argTypes: {
    creator: { control: 'object' },
    rating: { control: 'number' },
    content: { control: 'text' },
    productName: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CreatorReviewCard>;

const mockCreator = {
  creatorId: 1,
  nickname: '글로우픽',
  profileImageUrl: mockProfile,
  subscriberCount: 124000,
  trustScore: 92,
  ageGroup: 20,
  skinType: '건성',
};

export const Default: Story = {
  args: {
    creator: mockCreator,
    rating: 4.5,
    content:
      '촉촉하고 흡수가 빨라서 데일리로 쓰기 정말 좋아요. 자극 없이 순하게 스며드는 느낌이에요.',
    productName: '블랙티 유스 에센스 200ml',
  },
};

export const LongContent: Story = {
  args: {
    creator: mockCreator,
    rating: 5,
    content:
      '처음에는 반신반의하고 써봤는데 진짜 대박이에요. 아침에 세안 후 바르면 하루 종일 촉촉함이 유지되고, 메이크업 전에 발라도 밀리지 않아요. 향도 은은하고 자극이 없어서 민감한 피부에도 잘 맞는 것 같아요. 재구매 확정입니다.',
    productName: '블랙티 유스 에센스 200ml',
  },
};
