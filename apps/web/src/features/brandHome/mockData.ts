import type { BrandProductPageType, BrandSummaryType } from '@somesay/shared';
import mockBrandCover from '@/assets/brandHome/mock-brand-cover.png';
import mockBrandLogo from '@/assets/brandHome/mock-brand-logo.png';
import mockProductImage from '@/assets/mock_product_img.png';
import mockCreatorImage from '@/assets/mock_profile_img.svg';

interface BrandHomeMockData {
  brand: BrandSummaryType;
  categories: { id: number; label: string }[];
  productPage: BrandProductPageType;
}

// 브랜드 홈 API 연결 전 화면과 상호작용을 확인하기 위한 단일 mock입니다.
export const MOCK_BRAND_HOME_DATA: BrandHomeMockData = {
  brand: {
    brandId: 1,
    brandName: '토리든',
    brandLogoUrl: mockBrandLogo,
    brandImageUrl: mockBrandCover,
    rating: 4.9,
    reviewCount: 423,
    ranking: 1,
  },
  categories: [
    { id: 0, label: '전체' },
    { id: 1, label: '스킨/토너' },
    { id: 2, label: '로션/에멀젼' },
    { id: 3, label: '에센스/앰플/세럼' },
    { id: 4, label: '크림' },
    { id: 5, label: '미스트/오일' },
  ],
  productPage: {
    products: [
      {
        productId: 1,
        mainCategoryId: 3,
        subCategoryId: 4,
        brandName: '토리든',
        productName: '다이브인 저분자 히알루론산 세럼',
        productImageUrl: mockProductImage,
        price: 23000,
        rating: 4.9,
        reviewCount: 43,
        creators: [
          {
            name: '크리에이터',
            profileImageUrl: mockCreatorImage,
          },
        ],
        isHearted: false,
        reviewSummary:
          '“끈적임 없이 촉촉하고 수분감이 오래 유지돼서 건성 피부에 추천해요.”',
        skinTypes: ['건성', '민감성'],
        expectedEffects: ['수분 공급', '보습', '피부 진정'],
      },
    ],
    totalCount: 1,
    hasNext: false,
  },
};
