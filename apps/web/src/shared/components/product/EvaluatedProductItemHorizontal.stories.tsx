import type { Meta, StoryObj } from '@storybook/react-vite';
import { EvaluatedProductItemHorizontal } from './EvaluatedProductItemHorizontal';

const meta: Meta<typeof EvaluatedProductItemHorizontal> = {
  title: 'Shared/Product/EvaluatedProductItemHorizontal',
  component: EvaluatedProductItemHorizontal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EvaluatedProductItemHorizontal>;

export const Default: Story = {
  args: {
    productId: 1,
    productImageUrl: '',
    productName: '아토베리어 365 크림아토베리어 365크림',
    brandName: '에스트라',
    reviewCount: 3,
  },
};
