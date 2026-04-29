import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProductImg from '@/assets/mock_product_img.png';

import { ReviewProductLink } from './ReviewProductLink';

const meta: Meta<typeof ReviewProductLink> = {
  title: 'Shared/Product/ReviewProductLink',
  component: ReviewProductLink,
  tags: ['autodocs'],
  argTypes: {
    showArrow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewProductLink>;

const MOCK_PRODUCT = {
  productId: 1,
  brand: '이니스프리',
  productName: '그린티 씨드 세럼 80ml',
  imageUrl: mockProductImg,
  price: 35000,
};

// 화살표 있음 — 상세 페이지 이동 링크
export const WithArrow: Story = {
  args: {
    product: MOCK_PRODUCT,
    showArrow: true,
  },
};

// 화살표 없음 — 단순 상품 표시
export const WithoutArrow: Story = {
  args: {
    product: MOCK_PRODUCT,
    showArrow: false,
  },
};

// 긴 상품명 — 말줄임 확인
export const LongProductName: Story = {
  args: {
    product: {
      ...MOCK_PRODUCT,
      productName:
        '설화수 자음 생크림 진설 에센스 집중 보습 안티에이징 세럼 60ml 리미티드 에디션',
    },
    showArrow: true,
  },
};

// 고가 상품 — 가격 포맷 확인
export const HighPrice: Story = {
  args: {
    product: {
      ...MOCK_PRODUCT,
      brand: '설화수',
      productName: '자음 생크림 진설',
      price: 289000,
    },
    showArrow: true,
  },
};
