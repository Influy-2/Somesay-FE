import type { Meta, StoryObj } from '@storybook/react-vite';

import { CreatorHomeProfile } from './CreatorHomeProfile';

const meta: Meta<typeof CreatorHomeProfile> = {
  title: 'Shared/Profile/CreatorHomeProfile',
  component: CreatorHomeProfile,
  tags: ['autodocs'],
  argTypes: {
    likeCount: { control: 'number' },
    isLiked: { control: 'boolean' },
    youtubeUrl: { control: 'text' },
    creatorId: { control: 'number' },
    nickname: { control: 'text' },
    profileImageUrl: { control: 'text' },
    subscriberNum: { control: 'number' },
    trustScore: { control: 'number' },
    ageGroup: { control: 'number' },
    skinTypes: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof CreatorHomeProfile>;

export const Default: Story = {
  args: {
    likeCount: 0,
    youtubeUrl: 'https://placehold.co/100',
    creatorId: 1,
    nickname: '이름',
    profileImageUrl: 'https://placehold.co/100',
    subscriberNum: 0,
    trustScore: 4.5,
    ageGroup: 0,
    skinTypes: ['텍스트'],
  },
};
