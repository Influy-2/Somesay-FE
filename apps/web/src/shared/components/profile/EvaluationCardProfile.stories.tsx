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
    creatorSkinTypes: { control: 'object' },
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
    creatorSkinTypes: [{ skinTypeId: 3, skinTypeName: '복합성' }],
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
    creatorSkinTypes: [{ skinTypeId: 2, skinTypeName: '지성' }],
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
    creatorSkinTypes: [{ skinTypeId: 3, skinTypeName: '복합성' }],
  },
};
