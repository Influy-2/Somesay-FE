import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProfileImg from '@/assets/mock_profile_img.svg';
import mockProfile2Img from '@/assets/mock_profile2_img.png';
import mockProfile3Img from '@/assets/mock_profile3_img.png';
import recommendedProductCardImg from '@/assets/recommended_product_card_img.png';

import { RecommendedProductCard } from './RecommendedProductCard';

const meta: Meta<typeof RecommendedProductCard> = {
  title: 'Shared/Product/RecommendedProductCard',
  component: RecommendedProductCard,
  tags: ['autodocs'],
  args: {
    order: 1,
    productId: 1,
    brandName: '토리든',
    productName: '캐롯 카로팅 카밍 워터 패드 50p',
    productImgUrl: recommendedProductCardImg,
    productPrice: 10000,
    productAvgRating: 4.9,
    productReviewCount: 43,
    creatorProfileImgUrls: [mockProfileImg, mockProfile2Img, mockProfile3Img],
    isWished: false,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[40rem] bg-white py-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RecommendedProductCard>;

export const Default: Story = {};

export const Hearted: Story = {
  args: { isWished: true },
};
