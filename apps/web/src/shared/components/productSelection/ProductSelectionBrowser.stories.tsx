import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProduct from '@/assets/mock_product_img.png';
import mockProduct2 from '@/assets/mock_product_2.png';

import { ProductSelectionBrowser } from './ProductSelectionBrowser';
import { SelectableProductCardList } from './SelectableProductCardList';

// children으로 들어갈 카드 목록을 스토리 전체가 공유합니다.
const cardList = (
  <SelectableProductCardList
    products={[
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
    ]}
    selectedProductIds={new Set([1])}
    onToggle={() => {}}
    emptyMessage="검색 결과가 없습니다."
  />
);

const meta: Meta<typeof ProductSelectionBrowser> = {
  title: 'Shared/ProductSelection/ProductSelectionBrowser',
  component: ProductSelectionBrowser,
  tags: ['autodocs'],
  args: {
    categories: [
      { id: 1, label: '전체' },
      { id: 2, label: '스킨케어' },
      { id: 3, label: '마스크/팩' },
      { id: 4, label: '클렌징' },
    ],
    selectedCategoryId: 1,
    onSelectCategory: () => {},
    children: cardList,
  },
};

export default meta;
type Story = StoryObj<typeof ProductSelectionBrowser>;

export const Default: Story = {};

export const WithToolbar: Story = {
  args: {
    toolbar: (
      <div className="px-4 py-3.5">
        <span className="body2-m text-grey08">6개</span>
      </div>
    ),
  },
};
