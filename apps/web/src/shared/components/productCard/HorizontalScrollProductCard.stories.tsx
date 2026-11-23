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
    productPrice: { control: 'number' },
    productAvgRating: { control: 'number' },
    productReviewCount: { control: 'number' },
    isWished: { control: 'boolean' },
    creatorProfileImgUrls: { control: 'object' },
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
    productPrice: 10000,
    productAvgRating: 4.5,
    productReviewCount: 0,
    isWished: false,
    onHeartToggle: () => {},
    creatorProfileImgUrls: [],
  },
};
