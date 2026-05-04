import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProfile from '@/assets/mock_profile_img.svg';

import { EvaluationCardProfile } from './EvaluationCardProfile';

const meta: Meta<typeof EvaluationCardProfile> = {
  title: 'Shared/Profile/EvaluationCardProfile',
  component: EvaluationCardProfile,
  tags: ['autodocs'],
  argTypes: {
    evaluated: { control: 'boolean' },
    nickname: { control: 'text' },
    profileImageUrl: { control: 'text' },
    subscriberCount: { control: 'number' },
    trustScore: { control: 'number' },
    ranking: { control: 'number' },
    ageGroup: { control: 'number' },
    skinType: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof EvaluationCardProfile>;

export const Evaluated: Story = {
  args: {
    evaluated: true,
    nickname: '글로우픽',
    profileImageUrl: mockProfile,
    subscriberCount: 1240000,
    trustScore: 4.5,
    ranking: 5,
    ageGroup: 20,
    skinType: '복합성',
  },
};

export const EvaluatedNoRank: Story = {
  args: {
    evaluated: true,
    nickname: '글로우픽',
    profileImageUrl: mockProfile,
    subscriberCount: 1010,
    trustScore: 4.5,
    ranking: 0,
    ageGroup: 30,
    skinType: '지성',
  },
};

export const NotEvaluated: Story = {
  args: {
    evaluated: false,
    nickname: '글로우픽',
    profileImageUrl: mockProfile,
    subscriberCount: 1240000,
    trustScore: 4.5,
    ranking: 5,
    ageGroup: 20,
    skinType: '복합성',
  },
};
