import { useState } from 'react';
import { Link } from 'react-router';
import {
  HorizontalCategoryTab,
  CategoryType,
} from '@/shared/components/category/HorizontalCategoryTab';
import { BasicProductCard } from '@/shared/components/productCard/BasicProductCard';
import { ProductCardType } from '@somesay/shared';

const CATEGORIES: CategoryType[] = [
  { id: 'all', label: '전체' },
  { id: 'cleansing', label: '클렌징/필링' },
  { id: 'mask', label: '마스크/팩' },
  { id: 'suncare', label: '선케어' },
  { id: 'base', label: '베이스' },
];

const MOCK_CREATORS = [
  {
    name: '크리에이터1',
    profileImageUrl:
      'https://www.figma.com/api/mcp/asset/6b2ae759-07cf-4904-8edf-4bd8daae4fac',
  },
  {
    name: '크리에이터2',
    profileImageUrl:
      'https://www.figma.com/api/mcp/asset/7886d7f9-53bf-4ae7-9ec9-81574d513504',
  },
  {
    name: '크리에이터3',
    profileImageUrl:
      'https://www.figma.com/api/mcp/asset/059e3306-6209-463c-9217-ce5dcf1a9734',
  },
];

const MOCK_PRODUCTS: ProductCardType[] = [
  {
    productId: '1',
    imageUrl:
      'https://www.figma.com/api/mcp/asset/7e52fcf9-84e4-4618-a738-77f71f7ec940',
    brand: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍 세럼',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    isHearted: false,
    creators: MOCK_CREATORS,
  },
  {
    productId: '2',
    imageUrl:
      'https://www.figma.com/api/mcp/asset/7e52fcf9-84e4-4618-a738-77f71f7ec940',
    brand: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍 세럼',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    isHearted: false,
    creators: MOCK_CREATORS,
  },
  {
    productId: '3',
    imageUrl:
      'https://www.figma.com/api/mcp/asset/7e52fcf9-84e4-4618-a738-77f71f7ec940',
    brand: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍 세럼',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    isHearted: false,
    creators: MOCK_CREATORS,
  },
  {
    productId: '4',
    imageUrl:
      'https://www.figma.com/api/mcp/asset/7e52fcf9-84e4-4618-a738-77f71f7ec940',
    brand: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍 세럼',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    isHearted: false,
    creators: MOCK_CREATORS,
  },
];

// 카테고리 id → 카테고리 페이지 경로 매핑 (4.2.2 기준)
const CATEGORY_PATH_MAP: Record<string, string> = {
  all: '/category',
  cleansing: '/category/cleansing',
  mask: '/category/mask',
  suncare: '/category/suncare',
  base: '/category/base',
};

export const CategoryProductSection = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');

  return (
    <section
      aria-labelledby="category-product-title"
      className="flex w-full flex-col gap-5 px-4"
    >
      {/* 타이틀 */}
      <h2 id="category-product-title" className="headline4 text-black">
        이 제품들의 크리에이터
        <br />
        내돈내산 리뷰를 확인하세요
      </h2>

      {/* 카테고리 탭 + 상품 그리드 */}
      <div className="flex flex-col gap-5">
        <HorizontalCategoryTab
          categories={CATEGORIES}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
          ariaLabel="상품 카테고리"
        />

        {/* 2열 상품 그리드 */}
        <div
          role="list"
          aria-label="추천 상품 목록"
          className="grid grid-cols-2 gap-x-1 gap-y-6"
        >
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.productId} role="listitem">
              <BasicProductCard {...product} />
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <Link
          to={CATEGORY_PATH_MAP[selectedCategoryId] ?? '/category'}
          className="body2-m border-grey02 flex w-full items-center justify-center border py-3 text-black"
          aria-label={`${CATEGORIES.find((c) => c.id === selectedCategoryId)?.label ?? '전체'} 카테고리 더보기`}
        >
          스킨케어 상품 더보기
        </Link>
      </div>
    </section>
  );
};
