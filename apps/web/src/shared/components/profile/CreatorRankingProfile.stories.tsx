import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProfile from '@/assets/mock_profile_img.svg';

import { CreatorRankingProfile } from './CreatorRankingProfile';

const meta: Meta<typeof CreatorRankingProfile> = {
  title: 'Shared/Profile/CreatorRankingProfile',
  component: CreatorRankingProfile,
  tags: ['autodocs'],
  argTypes: {
    ranking: { control: 'number' },
    nickname: { control: 'text' },
    subscriberNum: { control: 'number' },
    trustScore: { control: 'number' },
    skinTypeIds: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof CreatorRankingProfile>;

export const Default: Story = {
  args: {
    ranking: 1,
    nickname: '글로우픽',
    profileImageUrl: mockProfile,
    subscriberNum: 124000,
    trustScore: 92,
    skinTypeIds: [1, 6],
  },
};
