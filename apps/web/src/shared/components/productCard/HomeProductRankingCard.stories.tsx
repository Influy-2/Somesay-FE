import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProfile1 from '@/assets/mock_profile_img.svg';
import mockProfile2 from '@/assets/mock_profile2_img.png';
import mockProfile3 from '@/assets/mock_profile3_img.png';
import mockProduct from '@/assets/mock_product_img.png';
import { HomeProductRankingCard } from './HomeProductRankingCard';

const meta: Meta<typeof HomeProductRankingCard> = {
  title: 'Shared/ProductCard/HomeProductRankingCard',
  component: HomeProductRankingCard,
  tags: ['autodocs'],
  argTypes: {
    productId: { control: 'number' },
    productImgUrl: { control: 'text' },
    brandName: { control: 'text' },
    productName: { control: 'text' },
    price: { control: 'number' },
    rating: { control: 'number' },
    reviewCount: { control: 'number' },
    ranking: { control: 'number' },
    isHearted: { control: 'boolean' },
    creatorImageUrls: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof HomeProductRankingCard>;

export const Default: Story = {
  args: {
    productId: 1,
    productImgUrl: mockProduct,
    brandName: '토리든',
    productName: '다이브인 저분자 히알루론산 세럼',
    price: 24000,
    rating: 4.9,
    reviewCount: 43,
    ranking: 1,
    isHearted: false,
    onHeartToggle: () => {},
    creatorImageUrls: [mockProfile1, mockProfile2, mockProfile3],
  },
};
