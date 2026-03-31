// features/home/mocks/categories.mock.ts
import { CategoryType } from '@somesay/shared';
import mockProfileImg from '@/assets/mock_profile_img.svg';
import mockProfile2Img from '@/assets/mock_profile2_img.png';
import mockProfile3Img from '@/assets/mock_profile3_img.png';
import mockProductImg from '@/assets/mock_product_img.png';

export const CATEGORIES: CategoryType[] = [
  { categoryId: 1, categoryLabel: '전체' },
  { categoryId: 2, categoryLabel: '클렌징/필링' },
  { categoryId: 3, categoryLabel: '마스크/팩' },
  { categoryId: 4, categoryLabel: '선케어' },
  { categoryId: 5, categoryLabel: '베이스' },
];

// features/home/mocks/categoryProducts.mock.ts
import { ProductCardType, ProductsByCategory } from '@somesay/shared';

const MOCK_CREATORS = [
  {
    name: '크리에이터1',
    profileImageUrl: mockProfileImg,
  },
  {
    name: '크리에이터2',
    profileImageUrl: mockProfile2Img,
  },
  {
    name: '크리에이터3',
    profileImageUrl: mockProfile3Img,
  },
];

const MOCK_PRODUCT: ProductCardType = {
  productId: 1,
  imageUrl: mockProductImg,
  brand: '토리든',
  productName: '[스킨푸드] 캐롯 카로팅 카밍 세럼',
  price: 10000,
  rating: 4.9,
  reviewCount: 43,
  isHearted: false,
  creators: MOCK_CREATORS,
};

// categoryId를 key로 하는 Map 구조

export const MOCK_CATEGORY_PRODUCTS: ProductsByCategory[] = [
  {
    categoryId: 1,
    categoryTitle: '전체',
    moreLinkPath: '/category',
    moreLinkLabel: '스킨케어 상품 더보기',
    products: [
      { ...MOCK_PRODUCT, productId: 1 },
      { ...MOCK_PRODUCT, productId: 2 },
      { ...MOCK_PRODUCT, productId: 3 },
      { ...MOCK_PRODUCT, productId: 4 },
    ],
  },
  {
    categoryId: 2,
    categoryTitle: '클렌징/필링',
    moreLinkPath: '/category/cleansing',
    moreLinkLabel: '클렌징/필링 상품 더보기',
    products: [
      { ...MOCK_PRODUCT, productId: 5 },
      { ...MOCK_PRODUCT, productId: 6 },
    ],
  },
  {
    categoryId: 3,
    categoryTitle: '마스크/팩',
    moreLinkPath: '/category/mask',
    moreLinkLabel: '마스크/팩 상품 더보기',
    products: [
      { ...MOCK_PRODUCT, productId: 7 },
      { ...MOCK_PRODUCT, productId: 8 },
    ],
  },
  {
    categoryId: 4,
    categoryTitle: '선케어',
    moreLinkPath: '/category/suncare',
    moreLinkLabel: '선케어 상품 더보기',
    products: [
      { ...MOCK_PRODUCT, productId: 9 },
      { ...MOCK_PRODUCT, productId: 10 },
    ],
  },
  {
    categoryId: 5,
    categoryTitle: '베이스',
    moreLinkPath: '/category/base',
    moreLinkLabel: '베이스 상품 더보기',
    products: [
      { ...MOCK_PRODUCT, productId: 11 },
      { ...MOCK_PRODUCT, productId: 12 },
    ],
  },
];
