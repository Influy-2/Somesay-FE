import { useState } from 'react';
import { HorizontalCategoriesTab } from '@/shared/components/category/HorizontalCategoriesTab';
import { BasicProductCard, MoreButton } from '@/shared/components';
import { ProductCardType, ProductsByCategory } from '@somesay/shared';
import { CategoryType } from '@somesay/shared';

const CATEGORIES: CategoryType[] = [
  { id: 1, title: '전체' },
  { id: 2, title: '클렌징/필링' },
  { id: 3, title: '마스크/팩' },
  { id: 4, title: '선케어' },
  { id: 5, title: '베이스' },
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

const MOCK_PRODUCT: ProductCardType = {
  productId: 1,
  imageUrl:
    'https://www.figma.com/api/mcp/asset/7e52fcf9-84e4-4618-a738-77f71f7ec940',
  brand: '토리든',
  productName: '[스킨푸드] 캐롯 카로팅 카밍 세럼',
  price: 10000,
  rating: 4.9,
  reviewCount: 43,
  isHearted: false,
  creators: MOCK_CREATORS,
};

const MOCK_CATEGORY_PRODUCTS: ProductsByCategory[] = [
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

export const CategoryProductSection = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  const selectedCategoryProducts =
    MOCK_CATEGORY_PRODUCTS.find(
      (category) => category.categoryId === selectedCategoryId
    )?.products || [];

  // TODO: useMemo 사용해서 최적화...? (api 연결시 고려해보기)
  // const selectedCategoryData = useMemo(
  //   () => MOCK_CATEGORY_PRODUCTS.find((c) => c.categoryId === selectedCategoryId),
  //   [selectedCategoryId]
  // );

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
        <HorizontalCategoriesTab
          categories={CATEGORIES}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
          ariaLabel="상품 카테고리"
        />

        {/* 2열 상품 그리드 */}
        <div
          role="list"
          aria-label="추천 상품 목록"
          className="grid grid-cols-2 gap-x-1 gap-y-6 pb-2"
        >
          {selectedCategoryProducts.map((product) => (
            <div key={product.productId} role="listitem">
              <BasicProductCard {...product} />
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <MoreButton
          to={'/임시'}
          text={`${CATEGORIES.find((c) => c.id === selectedCategoryId)?.title || ''} 상품 더보기`}
        />
      </div>
    </section>
  );
};
