import type { Meta, StoryObj } from '@storybook/react-vite';

import { HomeProductRankingCardSkeleton } from './HomeProductRankingCardSkeleton';

const meta: Meta<typeof HomeProductRankingCardSkeleton> = {
  title: 'Shared/ProductCard/HomeProductRankingCardSkeleton',
  component: HomeProductRankingCardSkeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HomeProductRankingCardSkeleton>;

export const Default: Story = {
  render: () => (
    <div className="w-44">
      <HomeProductRankingCardSkeleton />
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="grid max-w-sm grid-cols-2 gap-x-1 gap-y-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <HomeProductRankingCardSkeleton
          key={`home-product-ranking-card-skeleton-story-${index}`}
        />
      ))}
    </div>
  ),
};
