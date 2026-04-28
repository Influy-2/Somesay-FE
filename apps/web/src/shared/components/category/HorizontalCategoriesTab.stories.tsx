import type { Meta, StoryObj } from '@storybook/react-vite';

import { HorizontalCategoriesTab } from './HorizontalCategoriesTab';

const meta: Meta<typeof HorizontalCategoriesTab> = {
  title: 'Shared/Category/HorizontalCategoriesTab',
  component: HorizontalCategoriesTab,
  tags: ['autodocs'],
  argTypes: {
    categories: { control: 'object' },
    selectedId: { control: 'number' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof HorizontalCategoriesTab>;

export const Default: Story = {
  args: {
    categories: [
      { id: 1, label: '전체' },
      { id: 2, label: '스킨케어' },
      { id: 3, label: '마스크/팩' },
      { id: 4, label: '클랜징' },
    ],
    selectedId: 1,
    onSelect: () => {},
    ariaLabel: '샘플 텍스트',
  },
};
