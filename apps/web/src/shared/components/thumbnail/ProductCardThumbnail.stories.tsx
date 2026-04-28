import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProductCardThumbnail } from './ProductCardThumbnail';

const meta: Meta<typeof ProductCardThumbnail> = {
  title: 'Shared/Thumbnail/ProductCardThumbnail',
  component: ProductCardThumbnail,
  tags: ['autodocs'],
  argTypes: {
    brand: { control: 'text' },
    productName: { control: 'text' },
    price: { control: 'number' },
    rating: { control: 'number' },
    reviewCount: { control: 'number' },
    imageUrl: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCardThumbnail>;

export const Default: Story = {
  args: {
    brand: '브랜드명',
    productName: '이름',
    price: 10000,
    rating: 4.5,
    reviewCount: 0,
    imageUrl: 'https://placehold.co/100',
  },
};
