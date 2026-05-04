import type { Meta, StoryObj } from '@storybook/react-vite';

import { TabItem } from './TabItem';

const meta: Meta<typeof TabItem> = {
  title: 'Shared/Tab/TabItem',
  component: TabItem,
  tags: ['autodocs'],
  argTypes: {
    tabText: { control: 'text' },
    isActive: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TabItem>;

export const Active: Story = {
  args: {
    tabText: '일치하는 제품',
    isActive: true,
    onClick: () => {},
  },
};

export const Inactive: Story = {
  args: {
    tabText: '일치하는 리뷰',
    isActive: false,
    onClick: () => {},
  },
};
