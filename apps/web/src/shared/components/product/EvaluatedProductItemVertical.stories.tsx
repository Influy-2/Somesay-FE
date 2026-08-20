import type { Meta, StoryObj } from '@storybook/react-vite';
import { EvaluatedProductItemVertical } from './EvaluatedProductItemVertical';

const meta: Meta<typeof EvaluatedProductItemVertical> = {
  title: 'Shared/Product/EvaluatedProductItemVertical',
  component: EvaluatedProductItemVertical,
  tags: ['autodocs'],
  argTypes: {
    isSelected: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EvaluatedProductItemVertical>;

export const Selected: Story = {
  args: {
    productId: 1,
    productImgUrl: '',
    productName: '아토베리어 365 크림아토베리어 365크림',
    isSelected: true,
    onClick: () => {},
  },
};

export const Unselected: Story = {
  args: {
    productId: 1,
    productImgUrl: '',
    productName: '아토베리어 365 크림아토베리어 365크림',
    isSelected: false,
    onClick: () => {},
  },
};
