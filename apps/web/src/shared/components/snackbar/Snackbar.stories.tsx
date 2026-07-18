import type { Meta, StoryObj } from '@storybook/react-vite';

import { Snackbar } from './Snackbar';

const meta: Meta<typeof Snackbar> = {
  title: 'Shared/Snackbar/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
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

export const WithBottomBar: Story = {
  args: {
    message: '텍스트',
    placement: 'bottomBar',
    onClose: () => {},
  },
};

export const Error: Story = {
  args: {
    message: '오류가 발생했습니다.',
    variant: 'error',
    onClose: () => {},
  },
};
