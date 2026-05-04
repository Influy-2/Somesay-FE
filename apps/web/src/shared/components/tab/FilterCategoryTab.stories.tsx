import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { FilterCategoryTab } from './FilterCategoryTab';

const meta: Meta<typeof FilterCategoryTab> = {
  title: 'Shared/Tab/FilterCategoryTab',
  component: FilterCategoryTab,
  tags: ['autodocs'],
  argTypes: {
    categories: { control: 'object' },
    activeCategory: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof FilterCategoryTab>;

const CATEGORIES = [
  { category: 'all', label: '전체' },
  { category: 'skincare', label: '스킨케어' },
  { category: 'makeup', label: '메이크업' },
  { category: 'suncare', label: '선케어' },
];

const FilterCategoryTabWithState = (
  args: React.ComponentProps<typeof FilterCategoryTab>
) => {
  const [activeCategory, setActiveCategory] = useState('all');
  return (
    <FilterCategoryTab
      {...args}
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
    />
  );
};

export const Default: Story = {
  args: {
    categories: CATEGORIES,
  },
  render: (args) => <FilterCategoryTabWithState {...args} />,
};
