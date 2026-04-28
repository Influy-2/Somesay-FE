import type { Meta, StoryObj } from '@storybook/react-vite';

import { Snackbar } from './Snackbar';

const meta: Meta<typeof Snackbar> = {
  title: 'Shared/Snackbar/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    duration: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  args: {
    message: '텍스트',
    onClose: () => {},
  },
};
