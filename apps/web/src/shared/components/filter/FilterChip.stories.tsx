import type { Meta, StoryObj } from '@storybook/react-vite';

import { FilterChip } from './FilterChip';

const meta: Meta<typeof FilterChip> = {
  title: 'Shared/Filter/FilterChip',
  component: FilterChip,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    isSelected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FilterChip>;

export const Default: Story = {
  args: {
    label: '샘플 텍스트',
    isSelected: false,
    onClick: () => {},
  },
};
