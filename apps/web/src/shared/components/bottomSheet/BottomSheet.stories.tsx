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
        height: '800px',
      },
    },
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    children: { control: 'object' },
    header: { control: 'object' },
    footer: { control: 'object' },
    ariaLabel: { control: 'text' },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small', 'compact'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    ariaLabel: '바텀시트',
    children: '바텀시트 내용',
  },
};

export const Large: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    ariaLabel: '바텀시트',
    size: 'large',
    children: '바텀시트 내용',
  },
};

export const Small: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    ariaLabel: '바텀시트',
    size: 'small',
    children: '바텀시트 내용',
  },
};

export const Compact: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    ariaLabel: '바텀시트',
    size: 'compact',
    children: '바텀시트 내용',
  },
};
