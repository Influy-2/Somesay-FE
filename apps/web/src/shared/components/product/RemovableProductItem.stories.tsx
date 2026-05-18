import type { Meta, StoryObj } from '@storybook/react-vite';
import { RemovableProductItem } from './RemovableProductItem';

const meta: Meta<typeof RemovableProductItem> = {
  title: 'Shared/Product/RemovableProductItem',
  component: RemovableProductItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RemovableProductItem>;

export const Good: Story = {
  args: {
    productId: 1,
    imageUrl: '',
    brand: '스킨푸드',
    productName: '당근 패드당근 패드',
    type: 'good',
    onDelete: (id) => console.log('삭제', id),
  },
};

export const Bad: Story = {
  args: {
    productId: 1,
    imageUrl: '',
    brand: '스킨푸드',
    productName: '당근 패드당근 패드',
    type: 'bad',
    onDelete: (id) => console.log('삭제', id),
  },
};
