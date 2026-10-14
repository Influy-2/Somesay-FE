import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProduct from '@/assets/mock_product_img.png';
import mockProduct2 from '@/assets/mock_product_2.png';

import { SelectableProductCardList } from './SelectableProductCardList';

const meta: Meta<typeof SelectableProductCardList> = {
  title: 'Shared/ProductSelection/SelectableProductCardList',
  component: SelectableProductCardList,
  tags: ['autodocs'],
  args: {
    products: [
      {
        productId: 1,
        productImgUrl: mockProduct,
        brandName: '이니스프리',
        productName: '캐롯 카로팅 카밍 워터 패드 50p',
      },
      {
        productId: 2,
        productImgUrl: mockProduct2,
        brandName: '스킨푸드',
        productName: '당근 패드 60매',
      },
      {
        productId: 3,
        productImgUrl: mockProduct,
        brandName: '라운드랩',
        productName: '1025 독도 토너 200ml',
      },
    ],
    selectedProductIds: new Set<number>(),
    onToggle: () => {},
    emptyMessage: '검색 결과가 없습니다.',
  },
};

export default meta;
type Story = StoryObj<typeof SelectableProductCardList>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selectedProductIds: new Set([1, 3]) },
};

export const AlreadyAdded: Story = {
  args: { alreadyAddedProductIds: new Set([2]), onAlreadyAdded: () => {} },
};

export const Loading: Story = { args: { status: 'loading' } };

export const Error: Story = { args: { status: 'error' } };

export const Empty: Story = { args: { products: [] } };
