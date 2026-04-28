import type { Meta, StoryObj } from '@storybook/react-vite';

import { ChipLarge } from './ChipLarge';

const meta: Meta<typeof ChipLarge> = {
  title: 'Shared/Chips/ChipLarge',
  component: ChipLarge,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    bgColor: { control: 'text' },
    textColor: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ChipLarge>;

export const Default: Story = {
  args: {
    label: '샘플 텍스트',
  },
};
