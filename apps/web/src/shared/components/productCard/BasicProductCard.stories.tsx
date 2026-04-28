import type { Meta, StoryObj } from '@storybook/react-vite';

import { BasicProductCard } from './BasicProductCard';

import mockProfile1 from '@/assets/mock_profile_img.svg';
import mockProfile2 from '@/assets/mock_profile2_img.png';
import mockProfile3 from '@/assets/mock_profile3_img.png';
import mockItem from '@/assets/mock_product_img.png';
const meta: Meta<typeof BasicProductCard> = {
  title: 'Shared/ProductCard/BasicProductCard',
  component: BasicProductCard,
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
type Story = StoryObj<typeof BasicProductCard>;

export const Default: Story = {
  args: {
    productId: 1,
    imageUrl: mockItem,
    brand: '브랜드명',
    productName: '이름',
    price: 10000,
    rating: 4.5,
    reviewCount: 0,
    isHearted: false,
    creators: [
      { name: '크리에이터1', profileImageUrl: mockProfile1 },
      { name: '크리에이터2', profileImageUrl: mockProfile2 },
      { name: '크리에이터3', profileImageUrl: mockProfile3 },
    ],
  },
};
