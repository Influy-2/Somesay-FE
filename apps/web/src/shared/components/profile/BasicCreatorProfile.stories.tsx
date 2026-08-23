import type { Meta, StoryObj } from '@storybook/react-vite';

import { BasicCreatorProfile } from './BasicCreatorProfile';

const meta: Meta<typeof BasicCreatorProfile> = {
  title: 'Shared/Profile/BasicCreatorProfile',
  component: BasicCreatorProfile,
  tags: ['autodocs'],
  argTypes: {
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
type Story = StoryObj<typeof BasicCreatorProfile>;

export const Default: Story = {
  args: {
    creatorId: 1,
    nickname: '이름',
    profileImageUrl: 'https://placehold.co/100',
    subscriberNum: 0,
    trustScore: 4.5,
    ageGroup: 0,
    skinTypes: ['텍스트'],
  },
};
