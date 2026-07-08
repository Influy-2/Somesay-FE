import type { Meta, StoryObj } from '@storybook/react-vite';

import { ChipLarge } from './ChipLarge';

const meta: Meta<typeof ChipLarge> = {
  title: 'Shared/Chips/ChipLarge',
  component: ChipLarge,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    color: {
      control: 'select',
      options: [
        'white',
        'blue300',
        'blue200',
        'blue100',
        'yellow100',
        'yellow200',
        'gray02',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChipLarge>;

export const Default: Story = {
  args: {
    label: '샘플 텍스트',
    color: 'blue200',
  },
};
