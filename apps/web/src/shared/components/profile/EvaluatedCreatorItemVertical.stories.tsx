import type { Meta, StoryObj } from '@storybook/react-vite';
import { EvaluatedCreatorItemVertical } from './EvaluatedCreatorItemVertical';

const meta: Meta<typeof EvaluatedCreatorItemVertical> = {
  title: 'Shared/Profile/EvaluatedCreatorItemVertical',
  component: EvaluatedCreatorItemVertical,
  tags: ['autodocs'],
  argTypes: {
    isSelected: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EvaluatedCreatorItemVertical>;

export const Selected: Story = {
  args: {
    creatorId: 1,
    profileImageUrl: '',
    name: '김크리스탈',
    isSelected: true,
    onClick: () => {},
  },
};

export const Unselected: Story = {
  args: {
    creatorId: 1,
    profileImageUrl: '',
    name: '김크리스탈',
    isSelected: false,
    onClick: () => {},
  },
};
