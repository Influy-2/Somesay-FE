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
    creatorYoutubeLink: { control: 'text' },
    creatorName: { control: 'text' },
    creatorProfileImgUrl: { control: 'text' },
    creatorSubscriberNum: { control: 'number' },
    creatorAge: { control: 'select', options: AGE_TYPES },
    creatorSkinTypes: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof CreatorHomeProfile>;

export const Default: Story = {
  args: {
    likeCount: 0,
    creatorYoutubeLink: 'https://placehold.co/100',
    creatorName: '이름',
    creatorProfileImgUrl: 'https://placehold.co/100',
    creatorSubscriberNum: 0,
    creatorAge: 'TWENTIES',
    creatorSkinTypes: [{ skinTypeId: 1, skinTypeName: '건성' }],
  },
};
