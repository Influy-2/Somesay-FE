import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioProductItem } from './RadioProductItem';

const meta: Meta<typeof RadioProductItem> = {
  title: 'Shared/Product/RadioProductItem',
  component: RadioProductItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioProductItem>;

export const Default: Story = {
  args: {
    productId: 1,
    imageUrl: '',
    brand: '스킨푸드',
    productName: '당근 패드당근 패드',
    isSelected: false,
    isAlreadyAdded: false,
    onClick: (id) => console.log('선택', id),
    onAlreadyAdded: () => console.log('이미 추가됨'),
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    isSelected: true,
  },
};

export const AlreadyAdded: Story = {
  args: {
    ...Default.args,
    isAlreadyAdded: true,
  },
};
