import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProduct from '@/assets/mock_product_img.png';
import mockProduct2 from '@/assets/mock_product_2.png';

import { SelectedProductDock } from './SelectedProductDock';

const meta: Meta<typeof SelectedProductDock> = {
  title: 'Shared/ProductSelection/SelectedProductDock',
  component: SelectedProductDock,
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
    ],
    onRemove: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SelectedProductDock>;

export const Default: Story = {};

export const Empty: Story = { args: { products: [] } };
