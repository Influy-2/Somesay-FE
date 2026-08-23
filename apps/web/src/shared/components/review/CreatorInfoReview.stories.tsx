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
      reviewId: 1,
      creatorName: '글로우픽',
      ranking: 1,
      subscriberNum: 124000,
      profileImgUrl: mockProfile,
      trustScore: 92,
      skinTypeIds: [1, 6],
      content:
        '촉촉하고 흡수가 빨라서 데일리로 쓰기 정말 좋아요. 자극 없이 순하게 스며드는 느낌이에요.',
      rating: 4.5,
      agreeCount: 24370,
      disagreeCount: 6873,
      agreeRatio: 78,
      youtubeUrl: '',
      videoTitle: '',
      viewCount: 0,
      timeLinkCount: 0,
      totalCommentCount: 0,
      previewComments: [],
    },
  },
};

export const NoEvaluation: Story = {
  args: {
    review: {
      reviewId: 2,
      creatorName: '뷰티인사이더',
      ranking: 2,
      subscriberNum: 32000,
      profileImgUrl: mockProfile,
      trustScore: 85,
      skinTypeIds: [3],
      content: '향이 은은하고 발림성이 좋아요.',
      rating: 4,
      agreeCount: 0,
      disagreeCount: 0,
      agreeRatio: 0,
      youtubeUrl: '',
      videoTitle: '',
      viewCount: 0,
      timeLinkCount: 0,
      totalCommentCount: 0,
      previewComments: [],
    },
  },
};
