type FitProduct = {
  productId: number;
  imageUrl: string;
  productName: string;
  brand: string;
};

type MockProduct = FitProduct & { categoryId: number };

type AccountInfo = {
  profileImageUrl: string | null;
  nickname: string;
  gender: string;
  age: string;
  skinTypes: string[];
  skinConcerns: string[];
  goodProducts: FitProduct[];
  badProducts: FitProduct[];
};

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    productId: 1,
    imageUrl: '',
    brand: '스킨푸드',
    productName: '당근 패드당근 패드',
    categoryId: 1,
  },
  {
    productId: 2,
    imageUrl: '',
    brand: '이니스프리',
    productName: '녹두 약산성 클렌징폼 160ml',
    categoryId: 3,
  },
  {
    productId: 3,
    imageUrl: '',
    brand: '시드물',
    productName: '세라마이드 아토 로션',
    categoryId: 1,
  },
  {
    productId: 4,
    imageUrl: '',
    brand: '닥터자르트',
    productName: '시카플러스트 밤 B5+ 100ml',
    categoryId: 1,
  },
  {
    productId: 5,
    imageUrl: '',
    brand: '닥터자르트',
    productName: '시카플러스트 밤 2x B5+ 100ml',
    categoryId: 1,
  },
  {
    productId: 6,
    imageUrl: '',
    brand: '바이오더마',
    productName: '센시비오 H2O 85ml',
    categoryId: 3,
  },
  {
    productId: 7,
    imageUrl: '',
    brand: '아비브',
    productName: '약산성 pH 폼 클렌저 180ml',
    categoryId: 3,
  },
  {
    productId: 8,
    imageUrl: '',
    brand: '라로슈포제',
    productName: '에파클라 모이스처라이저',
    categoryId: 1,
  },
  {
    productId: 9,
    imageUrl: '',
    brand: '이니스프리',
    productName: '그린티 씨드 세럼',
    categoryId: 1,
  },
  {
    productId: 10,
    imageUrl: '',
    brand: '코스알엑스',
    productName: '어드밴스드 달팽이 96 뮤신 파워 에센스',
    categoryId: 1,
  },
];

export const MOCK_USERS = [
  { nickname: 'sobi22' },
  { nickname: 'leo123' },
  { nickname: 'test' },
];

export const MOCK_ACCOUNT: AccountInfo = {
  profileImageUrl: null,
  nickname: 'sobi22',
  gender: '여성',
  age: '20대',
  skinTypes: ['건성', '복합성'],
  skinConcerns: ['주름/탄력', '속건조'],
  goodProducts: [
    {
      productId: 1,
      imageUrl: '',
      productName: '당근 패드당근 패드',
      brand: '스킨푸드',
    },
    {
      productId: 2,
      imageUrl: '',
      productName: '녹두 약산성 클렌징폼 160ml',
      brand: '이니스프리',
    },
    {
      productId: 3,
      imageUrl: '',
      productName: '세라마이드 아토 로션',
      brand: '시드물',
    },
  ],
  badProducts: [
    {
      productId: 4,
      imageUrl: '',
      productName: '시카플러스트 밤 B5+ 100ml',
      brand: '닥터자르트',
    },
    {
      productId: 5,
      imageUrl: '',
      productName: '시카플러스트 밤 2x B5+ 100ml',
      brand: '닥터자르트',
    },
  ],
};
