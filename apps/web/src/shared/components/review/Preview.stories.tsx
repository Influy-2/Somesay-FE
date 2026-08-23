import type { Meta, StoryObj } from '@storybook/react-vite';
import { Preview } from './Preview';

const meta: Meta<typeof Preview> = {
  title: 'Shared/Review/Preview',
  component: Preview,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Preview>;

export const Default: Story = {
  args: {
    rating: 4.5,
    content:
      '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요.',
    product: {
      productId: 1,
      productName: '당근 패드당근 패드',
      brandName: '스킨푸드',
      productImageUrl: '',
      price: 10000,
    },
  },
};

export const ShortContent: Story = {
  args: {
    rating: 4.0,
    content: '향이 은은하고 발림성이 좋아요.',
    product: {
      productId: 1,
      productName: '당근 패드당근 패드',
      brandName: '스킨푸드',
      productImageUrl: '',
      price: 10000,
    },
  },
};
