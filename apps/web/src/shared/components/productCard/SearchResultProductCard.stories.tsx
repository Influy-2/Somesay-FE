import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProductImg from '@/assets/mock_product_img.png';
import mockProfile1 from '@/assets/mock_profile_img.svg';
import mockProfile2 from '@/assets/mock_profile2_img.png';
import mockProfile3 from '@/assets/mock_profile3_img.png';

import type { ProductCard } from '@somesay/shared';

import { SearchResultProductCard } from './SearchResultProductCard';

const meta: Meta<typeof SearchResultProductCard> = {
  title: 'Shared/ProductCard/SearchResultProductCard',
  component: SearchResultProductCard,
  tags: ['autodocs'],
  argTypes: {
    product: { control: 'object' },
    onHeartToggle: { action: 'heart toggled' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchResultProductCard>;

const MOCK_CREATOR_IMAGE_URLS = [mockProfile1, mockProfile2, mockProfile3];

const toEffectChips = (names: string[]) =>
  names.map((chipName, index) => ({ chipId: index + 1, chipName }));

const MOCK_PRODUCT: ProductCard = {
  productId: 1,
  mainCategoryId: 1,
  subCategoryId: 1,
  productImgUrl: mockProductImg,
  brandName: '이니스프리',
  productName: '블랙티 유스 에센스 200ml 인기 베스트 세럼',
  productPrice: 38000,
  productAvgRating: 4.5,
  productReviewCount: 1240,
  isWished: false,
  creatorProfileImgUrls: MOCK_CREATOR_IMAGE_URLS,
  productShortSummary: '촉촉하고 흡수가 빨라서 데일리로 쓰기 좋아요.',
  productSkinTypes: [
    { skinTypeId: 1, skinTypeName: '건성' },
    { skinTypeId: 3, skinTypeName: '복합성' },
  ],
  productEffectChips: toEffectChips(['보습', '탄력', '미백']),
};

// 기본 — 찜 안 된 상태
export const Default: Story = {
  args: {
    product: MOCK_PRODUCT,
    onHeartToggle: () => {},
  },
};

// 찜 된 상태
export const Hearted: Story = {
  args: {
    product: { ...MOCK_PRODUCT, isWished: true },
    onHeartToggle: () => {},
  },
};

// 크리에이터 1명
export const SingleCreator: Story = {
  args: {
    product: {
      ...MOCK_PRODUCT,
      creatorProfileImgUrls: [MOCK_CREATOR_IMAGE_URLS[0]!],
    },
    onHeartToggle: () => {},
  },
};

// 긴 상품명 — 2줄 말줄임 확인
export const LongProductName: Story = {
  args: {
    product: {
      ...MOCK_PRODUCT,
      productName:
        '설화수 자음 생크림 진설 에센스 집중 보습 안티에이징 세럼 60ml 리미티드 에디션',
    },
    onHeartToggle: () => {},
  },
};

// 고가 상품 — 가격 포맷 확인
export const HighPrice: Story = {
  args: {
    product: {
      ...MOCK_PRODUCT,
      brandName: '설화수',
      productName: '자음 생크림 진설',
      productPrice: 289000,
      productAvgRating: 4.8,
      productReviewCount: 3420,
      productShortSummary:
        '고가이지만 그만한 가치가 있어요. 민감 피부에도 트러블 없이 사용 가능합니다.',
      productSkinTypes: [
        { skinTypeId: 6, skinTypeName: '민감성' },
        { skinTypeId: 1, skinTypeName: '건성' },
      ],
      productEffectChips: toEffectChips(['보습', '진정', '미백', '탄력']),
    },
    onHeartToggle: () => {},
  },
};

// 리뷰 수 많음 — 숫자 포맷 확인
export const ManyReviews: Story = {
  args: {
    product: { ...MOCK_PRODUCT, productReviewCount: 12480 },
    onHeartToggle: () => {},
  },
};

// 태그 적음 — 칩 1개씩
export const FewTags: Story = {
  args: {
    product: {
      ...MOCK_PRODUCT,
      productSkinTypes: [{ skinTypeId: 2, skinTypeName: '지성' }],
      productEffectChips: toEffectChips(['모공']),
    },
    onHeartToggle: () => {},
  },
};
