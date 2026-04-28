import type { Meta, StoryObj } from '@storybook/react-vite';

import { SortBar } from './SortBar';

const meta: Meta<typeof SortBar> = {
  title: 'Shared/Sort/SortBar',
  component: SortBar,
  tags: ['autodocs'],
  argTypes: {
    productCount: { control: 'number' },
    sortOptions: { control: 'object' },
    currentSortValue: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SortBar>;

export const Default: Story = {
  args: {
    productCount: 0,
    sortOptions: [],
    currentSortValue: '텍스트',
    onSelectSort: () => {},
  },
};
