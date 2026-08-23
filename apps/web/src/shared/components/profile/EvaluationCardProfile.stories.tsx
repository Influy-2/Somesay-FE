import type { Meta, StoryObj } from '@storybook/react-vite';

import { AGE_TYPES } from '@somesay/shared';

import mockProfile from '@/assets/mock_profile_img.svg';

import { EvaluationCardProfile } from './EvaluationCardProfile';

const meta: Meta<typeof EvaluationCardProfile> = {
  title: 'Shared/Profile/EvaluationCardProfile',
  component: EvaluationCardProfile,
  tags: ['autodocs'],
  argTypes: {
    evaluated: { control: 'boolean' },
    creatorName: { control: 'text' },
    profileImgUrl: { control: 'text' },
    subscriberNum: { control: 'number' },
    trustScore: { control: 'number' },
    ranking: { control: 'number' },
    age: { control: 'select', options: AGE_TYPES },
    skinTypeIds: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof EvaluationCardProfile>;

export const Evaluated: Story = {
  args: {
    evaluated: true,
    creatorName: '글로우픽',
    profileImgUrl: mockProfile,
    subscriberNum: 1240000,
    trustScore: 4.5,
    ranking: 5,
    age: 'TWENTIES',
    skinTypeIds: [3],
  },
};

export const EvaluatedNoRank: Story = {
  args: {
    evaluated: true,
    creatorName: '글로우픽',
    profileImgUrl: mockProfile,
    subscriberNum: 1010,
    trustScore: 4.5,
    ranking: 0,
    age: 'THIRTIES',
    skinTypeIds: [2],
  },
};

export const NotEvaluated: Story = {
  args: {
    evaluated: false,
    creatorName: '글로우픽',
    profileImgUrl: mockProfile,
    subscriberNum: 1240000,
    trustScore: 4.5,
    ranking: 5,
    age: 'TWENTIES',
    skinTypeIds: [3],
  },
};
