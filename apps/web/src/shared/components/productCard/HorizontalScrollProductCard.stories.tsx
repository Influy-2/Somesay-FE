import type { Meta, StoryObj } from '@storybook/react-vite';

import { HorizontalScrollProductCard } from './HorizontalScrollProductCard';

const meta: Meta<typeof HorizontalScrollProductCard> = {
  title: 'Shared/ProductCard/HorizontalScrollProductCard',
  component: HorizontalScrollProductCard,
  tags: ['autodocs'],
  argTypes: {
    productId: { control: 'number' },
    imageUrl: { control: 'text' },
    brand: { control: 'text' },
    productName: { control: 'text' },
    price: { control: 'number' },
    rating: { control: 'number' },
    reviewCount: { control: 'number' },
    isHearted: { control: 'boolean' },
    creators: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof HorizontalScrollProductCard>;

export const Default: Story = {
  args: {
    productId: 1,
    imageUrl: 'https://placehold.co/100',
    brand: '브랜드명',
    productName: '이름',
    price: 10000,
    rating: 4.5,
    reviewCount: 0,
    isHearted: false,
    creators: [],
  },
};
