import type { Meta, StoryObj } from '@storybook/react-vite';
import { FloatingButtonPlus } from './FloatingButtonPlus';

const meta: Meta<typeof FloatingButtonPlus> = {
  title: 'Shared/FloatingButton/FloatingButtonPlus',
  component: FloatingButtonPlus,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FloatingButtonPlus>;

export const Default: Story = {
  args: {
    onClick: () => console.log('클릭'),
  },
};
