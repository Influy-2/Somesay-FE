import mockProfileImg from '@/assets/mock_profile_img.svg';
import mockProductImg from '@/assets/mock_product_img.png';

export interface SubCategoryProductType {
  productId: number;
  categoryId: number;
  subCategoryId: number;
  imageUrl: string;
  brand: string;
  productName: string;
  price: number;
  rating: number;
  reviewCount: number;
  isHearted: boolean;
  creators: { name: string; profileImageUrl: string }[];
  reviewSummary: string;
  skinTypes: string[];
  expectedEffects: string[];
}

const MOCK_CREATORS = [
  {
    name: '크리에이터1',
    profileImageUrl: mockProfileImg,
  },
  {
    name: '크리에이터2',
    profileImageUrl: mockProfileImg,
  },
  {
    name: '크리에이터3',
    profileImageUrl: mockProfileImg,
  },
];

const MOCK_SUBCATEGORY_PRODUCT: SubCategoryProductType = {
  productId: 1,
  categoryId: 1,
  subCategoryId: 1,
  imageUrl: mockProductImg,
  brand: '브랜드명',
  productName:
    '캐롯 카터 패드 (200매)캐롯 카밍 워터 패드 캐롯 카터 패드 (200매)캐롯 카밍 워터 패...',
  price: 10000,
  rating: 4.9,
  reviewCount: 43,
  isHearted: false,
  creators: MOCK_CREATORS,
  reviewSummary:
    '“세럼이 끈적임 없이 촉촉하고, 수분감이 많아서 특히 건성 피부인 분들에게 추천해요.”',
  skinTypes: ['건성', '민감성'],
  expectedEffects: [
    '각질제거',
    '여드름 진정',
    '각질제거각질제거',
    '여드름 진정',
    '줄 띄움 확인용 기대 효과 기대기대',
  ],
};

export const MOCK_SUBCATEGORY_PRODUCTS: SubCategoryProductType[] = [
  {
    ...MOCK_SUBCATEGORY_PRODUCT,
    productId: 1,
    categoryId: 1,
    subCategoryId: 101,
  },
  {
    ...MOCK_SUBCATEGORY_PRODUCT,
    productId: 2,
    categoryId: 1,
    subCategoryId: 101,
  },
  {
    ...MOCK_SUBCATEGORY_PRODUCT,
    productId: 3,
    categoryId: 1,
    subCategoryId: 101,
  },
  {
    ...MOCK_SUBCATEGORY_PRODUCT,
    productId: 4,
    categoryId: 1,
    subCategoryId: 102,
  },
  {
    ...MOCK_SUBCATEGORY_PRODUCT,
    productId: 5,
    categoryId: 1,
    subCategoryId: 103,
  },
  {
    ...MOCK_SUBCATEGORY_PRODUCT,
    productId: 6,
    categoryId: 2,
    subCategoryId: 201,
  },
  {
    ...MOCK_SUBCATEGORY_PRODUCT,
    productId: 7,
    categoryId: 2,
    subCategoryId: 201,
  },
  {
    ...MOCK_SUBCATEGORY_PRODUCT,
    productId: 8,
    categoryId: 2,
    subCategoryId: 202,
  },
];
