import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';

import { SortBar } from './SortBar';

const SORT_OPTIONS = [
  { value: 'rating', label: '평점순' },
  { value: 'review', label: '리뷰 많은 순' },
  { value: 'price_low', label: '가격 낮은 순' },
];

const meta: Meta<typeof SortBar> = {
  title: 'Shared/Sort/SortBar',
  component: SortBar,
  tags: ['autodocs'],
  argTypes: {
    count: { control: 'number' },
    sortOptions: { control: 'object' },
    currentSortValue: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SortBar>;

export const Default: Story = {
  args: {
    count: 0,
    sortOptions: [],
    currentSortValue: '텍스트',
    onSelectSort: () => {},
  },
};

export const WithSortBottomSheet: Story = {
  args: {
    count: 128,
    sortOptions: SORT_OPTIONS,
    currentSortValue: 'rating',
    onSelectSort: () => {},
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        height: '400px',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /정렬 옵션/ });
    await userEvent.click(button);
  },
};
