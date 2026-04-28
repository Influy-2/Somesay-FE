import type { Meta, StoryObj } from '@storybook/react-vite';

import { ChipBasic } from './ChipBasic';

const meta: Meta<typeof ChipBasic> = {
  title: 'Shared/Chips/ChipBasic',
  component: ChipBasic,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    bgColor: { control: 'text' },
    textColor: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ChipBasic>;

export const Default: Story = {
  args: {
    label: '뷰티',
  },
};

export const Dark: Story = {
  args: {
    label: '뷰티',
    bgColor: 'bg-black',
    textColor: 'text-white',
  },
};

export const Grey: Story = {
  args: {
    label: '스킨케어',
    bgColor: 'bg-grey03',
    textColor: 'text-grey07',
  },
};
