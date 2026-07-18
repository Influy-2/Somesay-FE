import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewVoteStatusButton } from './ReviewVoteStatusButton';

const meta: Meta<typeof ReviewVoteStatusButton> = {
  title: 'Shared/Buttons/ReviewVoteStatusButton',
  component: ReviewVoteStatusButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['agree', 'disagree'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewVoteStatusButton>;

export const Agree: Story = {
  args: {
    type: 'agree',
    creatorName: '김크리스탈',
  },
};

export const Disagree: Story = {
  args: {
    type: 'disagree',
    creatorName: '김크리스탈',
  },
};
