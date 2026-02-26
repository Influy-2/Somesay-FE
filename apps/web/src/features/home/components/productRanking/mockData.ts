import { ProductRankingCardType } from '@somesay/shared';
export const MOCK_PRODUCT_RANKING_CARDS: ProductRankingCardType[] = [
  {
    productId: 'product-001',
    imageUrl:
      'https://www.figma.com/api/mcp/asset/91dd6a94-e9c4-480c-8452-3d916c193bb2',
    brand: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍...',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    rank: 1,
    isHearted: false,
    creators: [
      { name: '김점례', profileImageUrl: '/mocks/images/creator-01.png' },
      { name: '뷰티수달', profileImageUrl: '/mocks/images/creator-02.png' },
      { name: '올리브언니', profileImageUrl: '/mocks/images/creator-03.png' },
    ],
  },
  {
    productId: 'product-002',
    imageUrl: '',
    brand: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍...',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    rank: 2,
    isHearted: true,
    creators: [
      { name: '닥터스킨', profileImageUrl: '/mocks/images/creator-04.png' },
      { name: '피부요정', profileImageUrl: '/mocks/images/creator-05.png' },
      { name: '김점례', profileImageUrl: '/mocks/images/creator-01.png' },
    ],
  },
  {
    productId: 'product-003',
    imageUrl:
      'https://www.figma.com/api/mcp/asset/91dd6a94-e9c4-480c-8452-3d916c193bb2',
    brand: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍...',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    rank: 3,
    isHearted: false,
    creators: [
      { name: '뷰티수달', profileImageUrl: '/mocks/images/creator-02.png' },
      { name: '올리브언니', profileImageUrl: '/mocks/images/creator-03.png' },
      { name: '닥터스킨', profileImageUrl: '/mocks/images/creator-04.png' },
    ],
  },
  {
    productId: 'product-004',
    imageUrl:
      'https://www.figma.com/api/mcp/asset/91dd6a94-e9c4-480c-8452-3d916c193bb2',
    brand: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍...',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    rank: 4,
    isHearted: false,
    creators: [
      { name: '피부요정', profileImageUrl: '/mocks/images/creator-05.png' },
      { name: '김점례', profileImageUrl: '/mocks/images/creator-01.png' },
      { name: '뷰티수달', profileImageUrl: '/mocks/images/creator-02.png' },
    ],
  },
];
