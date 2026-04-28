import type { Meta, StoryObj } from '@storybook/react-vite';

import { CarouselIndicator } from './CarouselIndicator';

const meta: Meta<typeof CarouselIndicator> = {
  title: 'Shared/Indicator/CarouselIndicator',
  component: CarouselIndicator,
  tags: ['autodocs'],
  argTypes: {
    count: { control: 'number' },
    selectedIndex: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof CarouselIndicator>;

export const Default: Story = {
  args: {
    count: 5,
    selectedIndex: 0,
  },
};
