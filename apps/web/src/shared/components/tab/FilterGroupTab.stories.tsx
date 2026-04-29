import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { FilterGroupTab } from './FilterGroupTab';

const meta: Meta<typeof FilterGroupTab> = {
  title: 'Shared/Tab/FilterGroupTab',
  component: FilterGroupTab,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterGroupTab>;

const SKIN_CATEGORIES = [
  { category: 'all', label: '전체' },
  { category: 'dry', label: '건성' },
  { category: 'oily', label: '지성' },
  { category: 'combination', label: '복합성' },
  { category: 'sensitive', label: '민감성' },
];

const FILTER_CATEGORIES = [
  { category: 'skinType', label: '피부 타입' },
  { category: 'effect', label: '기대 효과' },
  { category: 'category', label: '제품 카테고리' },
];

// 첫 번째 탭 활성화 — 정적 표시
export const Default: Story = {
  args: {
    categories: SKIN_CATEGORIES,
    activeCategory: 'all',
    onCategoryChange: () => {},
  },
};

// 중간 탭 활성화
export const MiddleActive: Story = {
  args: {
    categories: SKIN_CATEGORIES,
    activeCategory: 'oily',
    onCategoryChange: () => {},
  },
};

// 클릭 인터랙션 — 피부 타입 탭
const InteractiveSkinTypeTab = () => {
  const [active, setActive] = useState('all');
  return (
    <FilterGroupTab
      categories={SKIN_CATEGORIES}
      activeCategory={active}
      onCategoryChange={setActive}
    />
  );
};

export const InteractiveSkinType: Story = {
  render: () => <InteractiveSkinTypeTab />,
};

// 클릭 인터랙션 — 필터 카테고리 탭
const InteractiveFilterCategoryTab = () => {
  const [active, setActive] = useState('skinType');
  return (
    <FilterGroupTab
      categories={FILTER_CATEGORIES}
      activeCategory={active}
      onCategoryChange={setActive}
    />
  );
};

export const InteractiveFilterCategory: Story = {
  render: () => <InteractiveFilterCategoryTab />,
};
