import type { Meta, StoryObj } from '@storybook/react-vite';

import { MoreButton } from './MoreButton';

const meta: Meta<typeof MoreButton> = {
  title: 'Shared/Buttons/MoreButton',
  component: MoreButton,
  tags: ['autodocs'],
  argTypes: {
    to: { control: 'text' },
    text: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof MoreButton>;

export const Default: Story = {
  args: {
    to: '/ranking',
    text: '랭킹 더보기',
  },
};
