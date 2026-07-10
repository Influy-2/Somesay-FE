import type { Meta, StoryObj } from '@storybook/react-vite';

import { ChipBasic } from './ChipBasic';

const meta: Meta<typeof ChipBasic> = {
  title: 'Shared/Chips/ChipBasic',
  component: ChipBasic,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'radio',
      options: ['default', 'blue', 'black'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChipBasic>;

export const Default: Story = {
  args: {
    label: '뷰티',
  },
};

export const Blue: Story = {
  args: {
    label: '뷰티',
    variant: 'blue',
  },
};

export const Black: Story = {
  args: {
    label: '뷰티',
    variant: 'black',
  },
};
