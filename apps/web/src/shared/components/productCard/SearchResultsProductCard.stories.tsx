import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProductImg from '@/assets/mock_product_img.png';
import mockProfile1 from '@/assets/mock_profile_img.svg';
import mockProfile2 from '@/assets/mock_profile2_img.png';
import mockProfile3 from '@/assets/mock_profile3_img.png';

import { SearchResultsProductCard } from './SearchResultsProductCard';

const meta: Meta<typeof SearchResultsProductCard> = {
  title: 'Shared/ProductCard/SearchResultsProductCard',
  component: SearchResultsProductCard,
  tags: ['autodocs'],
  argTypes: {
    product: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchResultsProductCard>;

export const Default: Story = {
  args: {
    product: {
      productId: 1,
      categoryId: 1,
      subCategoryId: 1,
      imageUrl: mockProductImg,
      brand: '이니스프리',
      productName: '블랙티 유스 에센스 200ml 인기 베스트 세럼',
      price: 38000,
      rating: 4.5,
      reviewCount: 1240,
      isHearted: false,
      creators: [
        { name: '크리에이터1', profileImageUrl: mockProfile1 },
        { name: '크리에이터2', profileImageUrl: mockProfile2 },
        { name: '크리에이터3', profileImageUrl: mockProfile3 },
      ],
      reviewSummary: '촉촉하고 흡수가 빨라서 데일리로 쓰기 좋아요.',
      skinTypes: ['건성', '복합성'],
      expectedEffects: ['보습', '탄력', '미백'],
    },
    onHeartToggle: () => {},
  },
};
