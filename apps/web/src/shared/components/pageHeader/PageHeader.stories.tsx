import type { Meta, StoryObj } from '@storybook/react-vite';

import ArrowBackIcon from '@/shared/icons/ArrowBackIcon.svg?react';
import SearchIcon from '@/shared/icons/SearchIcon.svg?react';

import { PageHeader } from './PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'Shared/PageHeader/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: '예시',
    left: (
      <button type="button" aria-label="뒤로가기">
        <ArrowBackIcon />
      </button>
    ),
    right: [
      <button key="search" type="button" aria-label="검색">
        <SearchIcon />
      </button>,
    ],
  },
};

export const RightTwoButtons: Story = {
  args: {
    title: '예시',
    left: (
      <button type="button" aria-label="뒤로가기">
        <ArrowBackIcon />
      </button>
    ),
    right: [
      <button key="search" type="button" aria-label="검색">
        <SearchIcon />
      </button>,
      <button key="search" type="button" aria-label="검색">
        <SearchIcon />
      </button>,
    ],
  },
};
