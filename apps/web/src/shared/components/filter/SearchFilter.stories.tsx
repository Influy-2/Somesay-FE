import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchFilter } from './SearchFilter';

const meta: Meta<typeof SearchFilter> = {
  title: 'Shared/Filter/SearchFilter',
  component: SearchFilter,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    selectedLabel: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchFilter>;

// 선택 없음 — placeholder 표시
export const Default: Story = {
  args: {
    placeholder: '피부 타입',
    selectedLabel: [],
    onClick: () => {},
  },
};

// 1개 선택됨
export const SingleSelected: Story = {
  args: {
    placeholder: '피부 타입',
    selectedLabel: ['건성'],
    onClick: () => {},
  },
};

// 여러 개 선택됨 — 쉼표로 이어붙임
export const MultipleSelected: Story = {
  args: {
    placeholder: '피부 타입',
    selectedLabel: ['건성', '복합성'],
    onClick: () => {},
  },
};

// 기대 효과 필터
export const EffectFilter: Story = {
  args: {
    placeholder: '기대 효과',
    selectedLabel: [],
    onClick: () => {},
  },
};

// 기대 효과 — 선택됨
export const EffectFilterSelected: Story = {
  args: {
    placeholder: '기대 효과',
    selectedLabel: ['보습', '미백'],
    onClick: () => {},
  },
};
