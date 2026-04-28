import type { Meta, StoryObj } from '@storybook/react-vite';

import { ReviewVoteButton } from './ReviewVoteButton';

const meta: Meta<typeof ReviewVoteButton> = {
  title: 'Shared/Buttons/ReviewVoteButton',
  component: ReviewVoteButton,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['agree', 'disagree'] },
    isActive: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewVoteButton>;

export const Default: Story = {
  args: {
    type: 'agree',
    isActive: false,
    onClick: () => {},
  },
};
