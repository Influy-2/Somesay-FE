import type { Meta, StoryObj } from '@storybook/react-vite';

import { StarRating } from './StarRating';

const meta: Meta<typeof StarRating> = {
  title: 'Shared/Rating/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const Full: Story = {
  args: { rating: 5 },
};

export const High: Story = {
  args: { rating: 4 },
};

export const Mid: Story = {
  args: { rating: 3 },
};

export const Low: Story = {
  args: { rating: 2 },
};

export const One: Story = {
  args: { rating: 1 },
};

export const Empty: Story = {
  args: { rating: 0 },
};
