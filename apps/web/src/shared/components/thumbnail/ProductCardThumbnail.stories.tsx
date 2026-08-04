import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProductCardThumbnail } from './ProductCardThumbnail';

const meta: Meta<typeof ProductCardThumbnail> = {
  title: 'Shared/Thumbnail/ProductCardThumbnail',
  component: ProductCardThumbnail,
  tags: ['autodocs'],
  argTypes: {
    brandName: { control: 'text' },
    productName: { control: 'text' },
    price: { control: 'number' },
    rating: { control: 'number' },
    reviewCount: { control: 'number' },
    productImgUrl: { control: 'text' },
    productId: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCardThumbnail>;

export const Default: Story = {
  args: {
    brandName: '브랜드명',
    productName: '이름',
    price: 10000,
    rating: 4.5,
    reviewCount: 0,
    productImgUrl: 'https://placehold.co/100',
  },
};

export const Linked: Story = {
  args: {
    ...Default.args,
    productId: 1,
  },
};

export const ImageError: Story = {
  args: {
    ...Default.args,
    productImgUrl: '/not-found-product-image.png',
  },
};
