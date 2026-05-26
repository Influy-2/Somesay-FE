import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProfile from '@/assets/mock_profile_img.svg';

import { CreatorInfoReview } from './CreatorInfoReview';

const meta: Meta<typeof CreatorInfoReview> = {
  title: 'Shared/Review/CreatorInfoReview',
  component: CreatorInfoReview,
  tags: ['autodocs'],
  argTypes: {
    review: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof CreatorInfoReview>;

export const Default: Story = {
  args: {
    review: {
      ranking: 1,
      creator: {
        name: '글로우픽',
        profileImg: mockProfile,
        subscriberCount: '12.4만',
        trustScore: 92,
        tags: ['건성', '보습'],
      },
      rating: 4.5,
      content:
        '촉촉하고 흡수가 빨라서 데일리로 쓰기 정말 좋아요. 자극 없이 순하게 스며드는 느낌이에요.',
      agreedPercentage: 78,
    },
  },
};

export const NoEvaluation: Story = {
  args: {
    review: {
      ranking: 2,
      creator: {
        name: '뷰티인사이더',
        profileImg: mockProfile,
        subscriberCount: '3.2만',
        trustScore: 85,
        tags: ['복합성'],
      },
      rating: 4,
      content: '향이 은은하고 발림성이 좋아요.',
      agreedPercentage: 0,
    },
  },
};
