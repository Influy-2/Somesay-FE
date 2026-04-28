import type { Meta, StoryObj } from '@storybook/react-vite';

import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Shared/Modal/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'object' },
    leftButton: { control: 'object' },
    rightButton: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: '샘플 텍스트',
    description: '내용을 입력하세요',
    leftButton: { label: '취소', onClick: () => {} },
    rightButton: { label: '확인', onClick: () => {} },
  },
};
