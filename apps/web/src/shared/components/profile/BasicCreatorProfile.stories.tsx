import type { Meta, StoryObj } from '@storybook/react-vite';

import { AGE_TYPES } from '@somesay/shared';

import { BasicCreatorProfile } from './BasicCreatorProfile';

const meta: Meta<typeof BasicCreatorProfile> = {
  title: 'Shared/Profile/BasicCreatorProfile',
  component: BasicCreatorProfile,
  tags: ['autodocs'],
  argTypes: {
    creatorId: { control: 'number' },
    creatorName: { control: 'text' },
    profileImgUrl: { control: 'text' },
    subscriberNum: { control: 'number' },
    trustRank: { control: 'number' },
    highlightedLabels: { control: 'object' },
    age: { control: 'select', options: AGE_TYPES },
    skinTypes: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof BasicCreatorProfile>;

export const Default: Story = {
  args: {
    creatorId: 1,
    creatorName: '이름',
    profileImgUrl: 'https://placehold.co/100',
    subscriberNum: 0,
    trustRank: 3,
    age: 'TWENTIES',
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

// 서버가 연령을 내려주지 않는 크리에이터가 있어 폴백 문구를 스토리로 남깁니다.
export const WithoutAge: Story = {
  args: {
    ...Default.args,
    age: null,
  },
};
