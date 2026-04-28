import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProfile from '@/assets/mock_profile_img.svg';

import { CreatorRankingProfile } from './CreatorRankingProfile';

const meta: Meta<typeof CreatorRankingProfile> = {
  title: 'Shared/Profile/CreatorRankingProfile',
  component: CreatorRankingProfile,
  tags: ['autodocs'],
  argTypes: {
    ranking: { control: 'number' },
    creator: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof CreatorRankingProfile>;

export const Default: Story = {
  args: {
    ranking: 1,
    creator: {
      name: '글로우픽',
      profileImg: mockProfile,
      subscriberCount: '12.4만',
      reliability: 92,
      tags: ['건성', '보습'],
    },
  },
};
