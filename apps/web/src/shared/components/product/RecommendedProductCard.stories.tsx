import type { Meta, StoryObj } from '@storybook/react-vite';

import { RecommendedProductCard } from './RecommendedProductCard';

const meta: Meta<typeof RecommendedProductCard> = {
  title: 'Shared/Product/RecommendedProductCard',
  component: RecommendedProductCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-[40rem] bg-white py-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RecommendedProductCard>;

export const Default: Story = {};
