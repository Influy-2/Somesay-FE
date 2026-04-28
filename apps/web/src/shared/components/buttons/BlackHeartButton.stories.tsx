import type { Meta, StoryObj } from '@storybook/react-vite';

import { BlackHeartButton } from './BlackHeartButton';

const meta: Meta<typeof BlackHeartButton> = {
  title: 'Shared/Buttons/BlackHeartButton',
  component: BlackHeartButton,
  tags: ['autodocs'],
  argTypes: {
    isLiked: { control: 'boolean' },
    likeCount: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof BlackHeartButton>;

export const Default: Story = {
  args: {
    isLiked: false,
    onLikeToggle: () => {},
  },
};
