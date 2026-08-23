import mockProfileImg from '@/assets/mock_profile_img.svg';
import mockProductImg from '@/assets/mock_product_img.png';
import { ProductCardType } from '@somesay/shared';

export interface SubcategoryProductType extends ProductCardType {
  categoryId: number;
  subCategoryId: number;
  reviewSummary: string;
  skinTypeIds: number[];
  expectedEffects: string[];
}

const MOCK_CREATOR_IMAGE_URLS = [
  mockProfileImg,
  mockProfileImg,
  mockProfileImg,
];

const MOCK_SUBCATEGORY_PRODUCT: SubcategoryProductType = {
  productId: 1,
  categoryId: 1,
  subCategoryId: 1,
  productImgUrl: mockProductImg,
  brandName: '브랜드명',
  productName:
    '캐롯 카터 패드 (200매)캐롯 카밍 워터 패드 캐롯 카터 패드 (200매)캐롯 카밍 워터 패...',
  price: 10000,
  avgRating: 4.9,
  reviewCount: 43,
  isHearted: false,
  creatorImageUrls: MOCK_CREATOR_IMAGE_URLS,
  reviewSummary:
    '“세럼이 끈적임 없이 촉촉하고, 수분감이 많아서 특히 건성 피부인 분들에게 추천해요.”',
  skinTypeIds: [1, 6],
  expectedEffects: [
    '각질제거',
    '여드름 진정',
    '각질제거각질제거',
    '여드름 진정',
    '줄 띄움 확인용 기대 효과 기대기대',
  ],
};

export const MOCK_SUBCATEGORY_PRODUCTS: SubcategoryProductType[] = [
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
