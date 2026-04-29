import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { TabBar } from './TabBar';

const meta: Meta<typeof TabBar> = {
  title: 'Shared/Tab/TabBar',
  component: TabBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TabBar>;

// 첫 번째 탭 활성화 — 정적 표시
export const Default: Story = {
  args: {
    tabs: [
      { tabText: '일치하는 제품', isActive: true, onClick: () => {} },
      { tabText: '일치하는 리뷰', isActive: false, onClick: () => {} },
    ],
  },
};

// 두 번째 탭 활성화
export const SecondTabActive: Story = {
  args: {
    tabs: [
      { tabText: '일치하는 제품', isActive: false, onClick: () => {} },
      { tabText: '일치하는 리뷰', isActive: true, onClick: () => {} },
    ],
  },
};

// 클릭 인터랙션 — 탭 전환 가능
const InteractiveTabBar = () => {
  const TABS = ['일치하는 제품', '일치하는 리뷰'];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TabBar
      tabs={TABS.map((text, i) => ({
        tabText: text,
        isActive: i === activeIndex,
        onClick: () => setActiveIndex(i),
      }))}
    />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTabBar />,
};

// 탭 3개
const ThreeTabsBar = () => {
  const TABS = ['전체', '스킨케어', '메이크업'];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TabBar
      tabs={TABS.map((text, i) => ({
        tabText: text,
        isActive: i === activeIndex,
        onClick: () => setActiveIndex(i),
      }))}
    />
  );
};

export const ThreeTabs: Story = {
  render: () => <ThreeTabsBar />,
};
