import type { Meta, StoryObj } from '@storybook/react-vite';

import { RecentProductSearchList } from './RecentProductSearchList';

const meta: Meta<typeof RecentProductSearchList> = {
  title: 'Shared/ProductSelection/RecentProductSearchList',
  component: RecentProductSearchList,
  tags: ['autodocs'],
  args: {
    items: [
      { id: '1', query: '토너 패드' },
      { id: '2', query: '이니스프리' },
      { id: '3', query: '캐롯 카로팅 카밍 워터 패드 50p' },
    ],
    onSelect: () => {},
    onRemove: () => {},
    onClearAll: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof RecentProductSearchList>;

export const Default: Story = {};

export const Empty: Story = { args: { items: [] } };
