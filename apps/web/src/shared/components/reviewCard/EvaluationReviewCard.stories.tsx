import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProfile from '@/assets/mock_profile_img.svg';
import { EvaluationReviewCard } from './EvaluationReviewCard';
import type { ReviewVoteType } from '../buttons/ReviewVoteButton';

const meta: Meta<typeof EvaluationReviewCard> = {
  title: 'Shared/ReviewCard/EvaluationReviewCard',
  component: EvaluationReviewCard,
  tags: ['autodocs'],
  argTypes: {
    rating: { control: 'number' },
    content: { control: 'text' },
    evaluated: { control: 'boolean' },
    agreePercentage: { control: 'number' },
    participantCount: { control: 'number' },
    selectedVote: {
      control: 'select',
      options: [null, 'agree', 'disagree'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof EvaluationReviewCard>;

const mockCreator = {
  nickname: '김점례',
  profileImageUrl: mockProfile as string,
  subscriberNum: 300000,
  trustScore: 100,
  ranking: 1,
  ageGroup: 20,
  skinTypes: ['건성'],
};

const reviewContent =
  '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 향도 은은하고, 남은 에센스는 닦토처럼 써도 부담 없어요. 매일 아침 세안 후에 피부결 정돈용으로 딱 좋습니다.';

const EvaluationReviewCardWithState = (
  args: React.ComponentProps<typeof EvaluationReviewCard>
) => {
  const [selectedVote, setSelectedVote] = useState<ReviewVoteType | null>(null);
  const evaluated = selectedVote !== null;
  return (
    <EvaluationReviewCard
      {...args}
      evaluated={evaluated}
      selectedVote={selectedVote}
      onClickVote={setSelectedVote}
    />
  );
};

export const BeforeEvaluation: Story = {
  args: {
    creator: mockCreator,
    rating: 4.8,
    content: reviewContent,
    evaluated: false,
    selectedVote: null,
    agreePercentage: 80,
    participantCount: 31243,
    onClickVote: () => {},
  },
};

export const AfterAgree: Story = {
  args: {
    creator: mockCreator,
    rating: 4.8,
    content: reviewContent,
    evaluated: true,
    selectedVote: 'agree',
    agreePercentage: 80,
    participantCount: 31243,
    onClickVote: () => {},
  },
};

export const AfterDisagree: Story = {
  args: {
    creator: mockCreator,
    rating: 4.8,
    content: reviewContent,
    evaluated: true,
    selectedVote: 'disagree',
    agreePercentage: 80,
    participantCount: 31243,
    onClickVote: () => {},
  },
};

export const Interactive: Story = {
  args: {
    creator: mockCreator,
    rating: 4.8,
    content: reviewContent,
    agreePercentage: 80,
    participantCount: 31243,
  },
  render: (args) => <EvaluationReviewCardWithState {...args} />,
};
