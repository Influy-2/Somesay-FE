import type { Meta, StoryObj } from '@storybook/react-vite';

import { CreatorRankingUpDownRowSkeleton } from './CreatorRankingUpDownRowSkeleton';

const meta: Meta<typeof CreatorRankingUpDownRowSkeleton> = {
  title: 'Shared/Profile/CreatorRankingUpDownRowSkeleton',
  component: CreatorRankingUpDownRowSkeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CreatorRankingUpDownRowSkeleton>;

export const Default: Story = {};

export const List: Story = {
  render: () => (
    <ol className="flex max-w-sm flex-col gap-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <CreatorRankingUpDownRowSkeleton
          key={`creator-ranking-row-skeleton-story-${index}`}
        />
      ))}
    </ol>
  ),
};
