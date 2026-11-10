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
type Story = StoryObj<typeof BasicProductCard>;

export const Default: Story = {
  args: {
    productId: 1,
    productImgUrl: mockItem,
    brandName: '브랜드명',
    productName: '이름',
    productPrice: 10000,
    productAvgRating: 4.5,
    productReviewCount: 0,
    isWished: false,
    onHeartToggle: () => {},
    creatorProfileImgUrls: [mockProfile1, mockProfile2, mockProfile3],
  },
};
