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
      creatorName: '글로우픽',
      creatorRanking: 1,
      creatorSubscriberNum: 124000,
      creatorProfileImgUrl: mockProfile,
      creatorTrustScore: 92,
      creatorSkinTypes: [
        { skinTypeId: 1, skinTypeName: '건성' },
        { skinTypeId: 6, skinTypeName: '민감성' },
      ],
      reviewContent:
        '촉촉하고 흡수가 빨라서 데일리로 쓰기 정말 좋아요. 자극 없이 순하게 스며드는 느낌이에요.',
      reviewRating: 4.5,
      reviewAgreeCount: 24370,
      reviewDisagreeCount: 6873,
      reviewAgreeRatio: 78,
    },
  },
};

export const NoEvaluation: Story = {
  args: {
    review: {
      creatorName: '뷰티인사이더',
      creatorRanking: 2,
      creatorSubscriberNum: 32000,
      creatorProfileImgUrl: mockProfile,
      creatorTrustScore: 85,
      creatorSkinTypes: [{ skinTypeId: 3, skinTypeName: '복합성' }],
      reviewContent: '향이 은은하고 발림성이 좋아요.',
      reviewRating: 4,
      reviewAgreeCount: 0,
      reviewDisagreeCount: 0,
      reviewAgreeRatio: 0,
    },
  },
};
