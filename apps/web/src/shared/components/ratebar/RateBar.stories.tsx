import type { Meta, StoryObj } from '@storybook/react-vite';

import { RateBar } from './RateBar';

const meta: Meta<typeof RateBar> = {
  title: 'Shared/Ratebar/RateBar',
  component: RateBar,
  tags: ['autodocs'],
  argTypes: {
    percentage: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof RateBar>;

export const Default: Story = {
  args: {
    percentage: 40,
  },
};
