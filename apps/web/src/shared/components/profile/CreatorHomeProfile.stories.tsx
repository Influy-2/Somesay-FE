import type { Meta, StoryObj } from '@storybook/react-vite';

import { AGE_TYPES } from '@somesay/shared';

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
    creatorName: { control: 'text' },
    profileImgUrl: { control: 'text' },
    subscriberNum: { control: 'number' },
    trustScore: { control: 'number' },
    age: { control: 'select', options: AGE_TYPES },
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
    creatorName: '이름',
    profileImgUrl: 'https://placehold.co/100',
    subscriberNum: 0,
    trustScore: 4.5,
    age: 'TWENTIES',
    skinTypes: ['텍스트'],
  },
};
