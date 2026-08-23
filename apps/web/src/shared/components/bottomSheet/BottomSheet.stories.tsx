import type { Meta, StoryObj } from '@storybook/react-vite';

import { BottomSheet } from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Shared/BottomSheet/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        inline: false,
        height: '400px',
      },
    },
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    children: { control: 'object' },
    header: { control: 'object' },
    footer: { control: 'object' },
    ariaLabel: { control: 'text' },
    height: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    ariaLabel: '바텀시트',
    height: 'h-[60vh]',
    children: '바텀시트 내용',
  },
};
export const Small: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    ariaLabel: '바텀시트',
    height: 'h-[40vh]',

    children: '바텀시트 내용',
  },
};
