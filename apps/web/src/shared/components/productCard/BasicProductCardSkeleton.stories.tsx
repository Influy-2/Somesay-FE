import type { Meta, StoryObj } from '@storybook/react-vite';

import { BasicProductCardSkeleton } from './BasicProductCardSkeleton';

const meta: Meta<typeof BasicProductCardSkeleton> = {
  title: 'Shared/ProductCard/BasicProductCardSkeleton',
  component: BasicProductCardSkeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BasicProductCardSkeleton>;

export const Default: Story = {
  render: () => (
    <div className="w-44">
      <BasicProductCardSkeleton />
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="grid max-w-sm grid-cols-2 gap-x-1 gap-y-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <BasicProductCardSkeleton
          key={`basic-product-card-skeleton-story-${index}`}
        />
      ))}
    </div>
  ),
};
