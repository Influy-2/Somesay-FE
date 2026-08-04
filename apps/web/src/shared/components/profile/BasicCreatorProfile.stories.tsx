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
    trustRank: { control: 'number' },
    highlightedLabels: { control: 'object' },
    ageGroup: { control: 'text' },
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
    trustRank: 3,
    ageGroup: '20',
    skinTypes: ['건성'],
    highlightedLabels: ['건성'],
  },
};

export const WithoutVisibleTrustRank: Story = {
  args: {
    ...Default.args,
    trustRank: 11,
    highlightedLabels: [],
  },
};
