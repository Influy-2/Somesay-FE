import type { AgeType } from '@somesay/shared';

type FitProduct = {
  productId: number;
  productImgUrl: string;
  productName: string;
  brandName: string;
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

export type RecommendedCreator = {
  creatorId: number;
  name: string;
  profileImageUrl: string;
  age: AgeType | null;
  skinType: string;
  review: {
    reviewId: number;
    rating: number;
    content: string;
    product: {
      productId: number;
      productName: string;
      brandName: string;
      productImgUrl: string;
      price: number;
    };
  };
};

export const MOCK_RECOMMENDED_CREATORS: RecommendedCreator[] = [
  {
    creatorId: 1,
    name: '김크리스탈김크리스탈김트리스탈',
    profileImageUrl: '',
    age: 'TWENTIES',
    skinType: '지성',
    review: {
      reviewId: 1,
      rating: 4.5,
      content:
        '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요.',
      product: {
        productId: 1,
        productName: '당근 패드당근 패드',
        brandName: '스킨푸드',
        productImgUrl: '',
        price: 10000,
      },
    },
  },
  {
    creatorId: 2,
    name: '뷰티인사이더',
    profileImageUrl: '',
    age: 'THIRTIES',
    skinType: '건성',
    review: {
      reviewId: 2,
      rating: 4.0,
      content:
        '향이 은은하고 발림성이 좋아요. 피부에 자극 없이 순하게 스며드는 느낌이에요.',
      product: {
        productId: 2,
        productName: '녹두 약산성 클렌징폼 160ml',
        brandName: '이니스프리',
        productImgUrl: '',
        price: 12000,
      },
    },
  },
  {
    creatorId: 3,
    name: '글로우픽',
    profileImageUrl: '',
    age: 'TWENTIES',
    skinType: '복합성',
    review: {
      reviewId: 3,
      rating: 4.8,
      content: '촉촉하고 흡수가 빨라서 데일리로 쓰기 정말 좋아요.',
      product: {
        productId: 3,
        productName: '세라마이드 아토 로션',
        brandName: '시드물',
        productImgUrl: '',
        price: 15000,
      },
    },
  },
  {
    creatorId: 4,
    name: '스킨로그',
    profileImageUrl: '',
    age: 'THIRTIES',
    skinType: '민감성',
    review: {
      reviewId: 4,
      rating: 4.3,
      content: '민감한 피부에도 자극 없이 잘 맞아요.',
      product: {
        productId: 4,
        productName: '시카플러스트 밤 B5+ 100ml',
        brandName: '닥터자르트',
        productImgUrl: '',
        price: 28000,
      },
    },
  },
  {
    creatorId: 5,
    name: '뷰티블로거',
    profileImageUrl: '',
    age: 'TWENTIES',
    skinType: '건성',
    review: {
      reviewId: 5,
      rating: 4.6,
      content: '보습력이 정말 좋아요. 겨울에도 촉촉하게 유지돼요.',
      product: {
        productId: 5,
        productName: '시카플러스트 밤 2x B5+ 100ml',
        brandName: '닥터자르트',
        productImgUrl: '',
        price: 35000,
      },
    },
  },
];

export const MOCK_EVALUATED_CREATORS_LIST = MOCK_RECOMMENDED_CREATORS.map(
  (c) => ({
    creatorId: c.creatorId,
    profileImageUrl: c.profileImageUrl,
    name: c.name,
    age: c.age,
    skinType: c.skinType,
    reviewCount: 3,
  })
);

export const MOCK_EVALUATED_PRODUCTS = [
  {
    productId: 1,
    productImgUrl: '',
    productName: '아토베리어 365 크림아토베리어 365크림',
  },
  {
    productId: 2,
    productImgUrl: '',
    productName: '캐롯 패드 카로팅 카밍워터 패드 200매',
  },
  {
    productId: 3,
    productImgUrl: '',
    productName: '아토베리어 365 선크림 SPF50+ PA+++',
  },
  {
    productId: 4,
    productImgUrl: '',
    productName: '아토베리어 365 토너 200ml 대용량',
  },
  {
    productId: 5,
    productImgUrl: '',
    productName: '아이오페 레티놀 엑스퍼트 0.1 크림',
  },
];

export const MOCK_EVALUATED_PRODUCTS_LIST = [
  {
    productId: 1,
    productImgUrl: '',
    productName: '아토베리어 365 크림아토베리어 365크림',
    brandName: '에스트라',
    reviewCount: 3,
    categoryId: 1,
  },
  {
    productId: 2,
    productImgUrl: '',
    productName: '캐롯 패드 카로팅 카밍워터 패드 200매',
    brandName: '에스트라',
    reviewCount: 3,
    categoryId: 2,
  },
  {
    productId: 3,
    productImgUrl: '',
    productName: '아토베리어 365 선크림 SPF50+ PA+++',
    brandName: '에스트라',
    reviewCount: 3,
    categoryId: 1,
  },
  {
    productId: 4,
    productImgUrl: '',
    productName: '아토베리어 365 토너 200ml 대용량',
    brandName: '에스트라',
    reviewCount: 3,
    categoryId: 2,
  },
  {
    productId: 5,
    productImgUrl: '',
    productName: '아이오페 레티놀 엑스퍼트 0.1 크림',
    brandName: '아이오페',
    reviewCount: 3,
    categoryId: 1,
  },
];

export const MOCK_EVALUATED_REVIEWS = [
  {
    reviewId: 1,
    creatorId: 1,
    creatorName: '김점례',
    rating: 4.5,
    content:
      '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요.',
    isAgreed: true,
    product: {
      productId: 1,
      productName: '[캐롯] 카로팅 카밍밍밍ㅁ이밍밍밍밍...',
      brandName: '토리든',
      productImgUrl: '',
      price: 10000,
    },
    myComment: {
      commentId: 1,
      nickname: 'asdf234',
      isAgree: true,
      content: '이 리뷰에 정말 공감합니다.',
    },
  },
  {
    reviewId: 2,
    creatorId: 1,
    creatorName: '김점례',
    rating: 4.5,
    content:
      '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요.',
    isAgreed: false,
    product: {
      productId: 1,
      productName: '[캐롯] 카로팅 카밍밍밍ㅁ이밍밍밍밍...',
      brandName: '토리든',
      productImgUrl: '',
      price: 10000,
    },
  },
];

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    productId: 1,
    productImgUrl: '',
    brandName: '스킨푸드',
    productName: '당근 패드당근 패드',
    categoryId: 1,
  },
  {
    productId: 2,
    productImgUrl: '',
    brandName: '이니스프리',
    productName: '녹두 약산성 클렌징폼 160ml',
    categoryId: 3,
  },
  {
    productId: 3,
    productImgUrl: '',
    brandName: '시드물',
    productName: '세라마이드 아토 로션',
    categoryId: 1,
  },
  {
    productId: 4,
    productImgUrl: '',
    brandName: '닥터자르트',
    productName: '시카플러스트 밤 B5+ 100ml',
    categoryId: 1,
  },
  {
    productId: 5,
    productImgUrl: '',
    brandName: '닥터자르트',
    productName: '시카플러스트 밤 2x B5+ 100ml',
    categoryId: 1,
  },
  {
    productId: 6,
    productImgUrl: '',
    brandName: '바이오더마',
    productName: '센시비오 H2O 85ml',
    categoryId: 3,
  },
  {
    productId: 7,
    productImgUrl: '',
    brandName: '아비브',
    productName: '약산성 pH 폼 클렌저 180ml',
    categoryId: 3,
  },
  {
    productId: 8,
    productImgUrl: '',
    brandName: '라로슈포제',
    productName: '에파클라 모이스처라이저',
    categoryId: 1,
  },
  {
    productId: 9,
    productImgUrl: '',
    brandName: '이니스프리',
    productName: '그린티 씨드 세럼',
    categoryId: 1,
  },
  {
    productId: 10,
    productImgUrl: '',
    brandName: '코스알엑스',
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
      productImgUrl: '',
      productName: '당근 패드당근 패드',
      brandName: '스킨푸드',
    },
    {
      productId: 2,
      productImgUrl: '',
      productName: '녹두 약산성 클렌징폼 160ml',
      brandName: '이니스프리',
    },
    {
      productId: 3,
      productImgUrl: '',
      productName: '세라마이드 아토 로션',
      brandName: '시드물',
    },
  ],
  badProducts: [
    {
      productId: 4,
      productImgUrl: '',
      productName: '시카플러스트 밤 B5+ 100ml',
      brandName: '닥터자르트',
    },
    {
      productId: 5,
      productImgUrl: '',
      productName: '시카플러스트 밤 2x B5+ 100ml',
      brandName: '닥터자르트',
    },
  ],
};
