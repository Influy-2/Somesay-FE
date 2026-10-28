import type { Meta, StoryObj } from '@storybook/react-vite';
import { EvaluatedCreatorItemHorizontal } from './EvaluatedCreatorItemHorizontal';

const meta: Meta<typeof EvaluatedCreatorItemHorizontal> = {
  title: 'Shared/Profile/EvaluatedCreatorItemHorizontal',
  component: EvaluatedCreatorItemHorizontal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EvaluatedCreatorItemHorizontal>;

export const Default: Story = {
  args: {
    creatorId: 1,
    profileImageUrl: '',
    name: '김크리스탈',
    age: 'TWENTIES',
    skinType: '지성',
    reviewCount: 3,
  },
};
