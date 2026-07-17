import type { Meta, StoryObj } from '@storybook/react-vite';

import { HorizontalScrollProductCard } from './HorizontalScrollProductCard';

const meta: Meta<typeof HorizontalScrollProductCard> = {
  title: 'Shared/ProductCard/HorizontalScrollProductCard',
  component: HorizontalScrollProductCard,
  tags: ['autodocs'],
  argTypes: {
    productId: { control: 'number' },
    productImgUrl: { control: 'text' },
    brandName: { control: 'text' },
    productName: { control: 'text' },
    price: { control: 'number' },
    rating: { control: 'number' },
    reviewCount: { control: 'number' },
    isHearted: { control: 'boolean' },
    creatorImageUrls: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof HorizontalScrollProductCard>;

export const Default: Story = {
  args: {
    productId: 1,
    productImgUrl: 'https://placehold.co/100',
    brandName: '브랜드명',
    productName: '이름',
    price: 10000,
    rating: 4.5,
    reviewCount: 0,
    isHearted: false,
    creatorImageUrls: [],
  },
};
