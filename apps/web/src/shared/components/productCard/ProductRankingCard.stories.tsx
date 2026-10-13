import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProduct from '@/assets/mock_product_img.png';
import mockProfile1 from '@/assets/mock_profile_img.svg';
import mockProfile2 from '@/assets/mock_profile2_img.png';
import mockProfile3 from '@/assets/mock_profile3_img.png';
import { ProductRankingCard } from './ProductRankingCard';

const meta: Meta<typeof ProductRankingCard> = {
  title: 'Shared/ProductCard/ProductRankingCard',
  component: ProductRankingCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[12.1875rem]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    productId: { control: 'number' },
    productImgUrl: { control: 'text' },
    brandName: { control: 'text' },
    productName: { control: 'text' },
    price: { control: 'number' },
    avgRating: { control: 'number' },
    reviewCount: { control: 'number' },
    creatorImageUrls: { control: 'object' },
    isHearted: { control: 'boolean' },
    ranking: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof ProductRankingCard>;

export const Default: Story = {
  args: {
    productId: 1,
    productImgUrl: mockProduct,
    brandName: '토리든',
    productName: '다이브인 저분자 히알루론산 세럼',
    price: 24000,
    avgRating: 4.9,
    reviewCount: 43,
    creatorImageUrls: [mockProfile1, mockProfile2, mockProfile3],
    isHearted: false,
    ranking: 1,
    onHeartToggle: () => undefined,
  },
};

export const Hearted: Story = {
  args: {
    ...Default.args,
    isHearted: true,
    ranking: 2,
  },
};

export const WithoutCreatorProfiles: Story = {
  args: {
    ...Default.args,
    creatorImageUrls: [],
    ranking: 10,
  },
};

export const LongContent: Story = {
  args: {
    ...Default.args,
    brandName: '매우 긴 브랜드명이 들어가는 경우',
    productName: '스토리에서 말줄임 처리를 확인하기 위한 아주 긴 상품명',
    price: 1234567,
    reviewCount: 123456,
    creatorImageUrls: [mockProfile1, mockProfile2, mockProfile3, mockProfile1],
    ranking: 30,
  },
};
