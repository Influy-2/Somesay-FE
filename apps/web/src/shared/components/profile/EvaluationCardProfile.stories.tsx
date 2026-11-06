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
    creatorProfileImgUrl: { control: 'text' },
    creatorSubscriberNum: { control: 'number' },
    creatorTrustScore: { control: 'number' },
    creatorRanking: { control: 'number' },
    creatorAge: { control: 'select', options: AGE_TYPES },
    creatorSkinTypeIds: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof EvaluationCardProfile>;

export const Evaluated: Story = {
  args: {
    evaluated: true,
    creatorName: '글로우픽',
    creatorProfileImgUrl: mockProfile,
    creatorSubscriberNum: 1240000,
    creatorTrustScore: 4.5,
    creatorRanking: 5,
    creatorAge: 'TWENTIES',
    creatorSkinTypeIds: [3],
  },
};

export const EvaluatedNoRank: Story = {
  args: {
    evaluated: true,
    creatorName: '글로우픽',
    creatorProfileImgUrl: mockProfile,
    creatorSubscriberNum: 1010,
    creatorTrustScore: 4.5,
    creatorRanking: 0,
    creatorAge: 'THIRTIES',
    creatorSkinTypeIds: [2],
  },
};

export const NotEvaluated: Story = {
  args: {
    evaluated: false,
    creatorName: '글로우픽',
    creatorProfileImgUrl: mockProfile,
    creatorSubscriberNum: 1240000,
    creatorTrustScore: 4.5,
    creatorRanking: 5,
    creatorAge: 'TWENTIES',
    creatorSkinTypeIds: [3],
  },
};
