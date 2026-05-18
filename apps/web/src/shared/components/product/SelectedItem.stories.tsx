import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectedItem } from './SelectedItem';

const meta: Meta<typeof SelectedItem> = {
  title: 'Shared/Product/SelectedItem',
  component: SelectedItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SelectedItem>;

export const Default: Story = {
  args: {
    productId: 1,
    imageUrl: '',
    brand: '스킨푸드',
    productName: '당근 패드당근 패드',
    onRemove: (id) => console.log('제거', id),
  },
};
