import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ReviewVoteCard } from './ReviewVoteCard';
import type { ReviewVoteType } from '../buttons/ReviewVoteButton';

const meta: Meta<typeof ReviewVoteCard> = {
  title: 'Shared/Review/ReviewVoteCard',
  component: ReviewVoteCard,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewVoteCard>;

const ReviewVoteCardWithState = (
  args: React.ComponentProps<typeof ReviewVoteCard>
) => {
  const [selectedVote, setSelectedVote] = useState<ReviewVoteType | null>(null);
  return (
    <ReviewVoteCard
      {...args}
      selectedVote={selectedVote}
      onClickVote={setSelectedVote}
    />
  );
};

export const Default: Story = {
  args: {
    content:
      '이 제품 진짜 촉촉하고 흡수력이 좋아서 매일 쓰고 있어요. 강추합니다!',
  },
  render: (args) => <ReviewVoteCardWithState {...args} />,
};
