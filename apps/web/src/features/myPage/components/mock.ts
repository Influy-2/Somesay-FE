import type {
  AgeType,
  BasicCreatorProfileType,
  ReactedCreatorResponse,
  ReactedProductResponse,
  ReviewSearchItemResponse,
} from '@somesay/shared';

type FitProduct = {
  productId: number;
  productImgUrl: string;
  productName: string;
  brandName: string;
};

type MockProduct = FitProduct & { categoryId: number };

// TODO: 계정 화면 연동 시 InfoResponse(userNickname·userGender·userAge…)로 교체.
// 성별은 서버 enum(MALE·FEMALE·NONE)과 GENDER_OPTIONS 값(male…)·라벨 비교 방식이 달라 함께 정리해야 합니다.
type AccountInfo = {
  userProfileImgUrl: string | null;
  nickname: string;
  gender: string;
  age: AgeType;
  skinTypeIds: number[];
  skinExpectationIds: number[];
  goodProducts: FitProduct[];
  badProducts: FitProduct[];
};

// 추천 크리에이터 API 는 아직 없습니다. 크리에이터·리뷰 필드는 다른 응답과 같은 서버 이름을 씁니다.
// 리뷰는 리뷰 검색 응답(ReviewSearchItemResponse)처럼 리뷰·상품 필드가 평탄하게 실린 모양입니다.
export type RecommendedCreatorMockType = BasicCreatorProfileType & {
  review: Pick<
    ReviewSearchItemResponse,
    | 'reviewId'
    | 'reviewRating'
    | 'reviewContent'
    | 'productId'
    | 'productName'
    | 'brandName'
    | 'productImgUrl'
    | 'productPrice'
  >;
};

export const MOCK_RECOMMENDED_CREATORS: RecommendedCreatorMockType[] = [
  {
    creatorId: 1,
    creatorName: '김크리스탈김크리스탈김트리스탈',
    creatorProfileImgUrl: '',
    creatorAge: 'TWENTIES',
    creatorSkinTypes: [{ skinTypeId: 2, skinTypeName: '지성' }],
    creatorSubscriberNum: 100000,
    review: {
      reviewId: 1,
      reviewRating: 4.5,
      reviewContent:
        '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요.',
      productId: 1,
      productName: '당근 패드당근 패드',
      brandName: '스킨푸드',
      productImgUrl: '',
      productPrice: 10000,
    },
  },
  {
    creatorId: 2,
    creatorName: '뷰티인사이더',
    creatorProfileImgUrl: '',
    creatorAge: 'THIRTIES',
    creatorSkinTypes: [{ skinTypeId: 1, skinTypeName: '건성' }],
    creatorSubscriberNum: 100000,
    review: {
      reviewId: 2,
      reviewRating: 4.0,
      reviewContent:
        '향이 은은하고 발림성이 좋아요. 피부에 자극 없이 순하게 스며드는 느낌이에요.',
      productId: 2,
      productName: '녹두 약산성 클렌징폼 160ml',
      brandName: '이니스프리',
      productImgUrl: '',
      productPrice: 12000,
    },
  },
  {
    creatorId: 3,
    creatorName: '글로우픽',
    creatorProfileImgUrl: '',
    creatorAge: 'TWENTIES',
    creatorSkinTypes: [{ skinTypeId: 3, skinTypeName: '복합성' }],
    creatorSubscriberNum: 100000,
    review: {
      reviewId: 3,
      reviewRating: 4.8,
      reviewContent: '촉촉하고 흡수가 빨라서 데일리로 쓰기 정말 좋아요.',
      productId: 3,
      productName: '세라마이드 아토 로션',
      brandName: '시드물',
      productImgUrl: '',
      productPrice: 15000,
    },
  },
  {
    creatorId: 4,
    creatorName: '스킨로그',
    creatorProfileImgUrl: '',
    creatorAge: 'THIRTIES',
    creatorSkinTypes: [{ skinTypeId: 6, skinTypeName: '민감성' }],
    creatorSubscriberNum: 100000,
    review: {
      reviewId: 4,
      reviewRating: 4.3,
      reviewContent: '민감한 피부에도 자극 없이 잘 맞아요.',
      productId: 4,
      productName: '시카플러스트 밤 B5+ 100ml',
      brandName: '닥터자르트',
      productImgUrl: '',
      productPrice: 28000,
    },
  },
  {
    creatorId: 5,
    creatorName: '뷰티블로거',
    creatorProfileImgUrl: '',
    creatorAge: 'TWENTIES',
    creatorSkinTypes: [{ skinTypeId: 1, skinTypeName: '건성' }],
    creatorSubscriberNum: 100000,
    review: {
      reviewId: 5,
      reviewRating: 4.6,
      reviewContent: '보습력이 정말 좋아요. 겨울에도 촉촉하게 유지돼요.',
      productId: 5,
      productName: '시카플러스트 밤 2x B5+ 100ml',
      brandName: '닥터자르트',
      productImgUrl: '',
      productPrice: 35000,
    },
  },
];

// 리뷰 평가한 크리에이터 (GET /api/v1/users/reactions/creators 의 항목 모양)
export const MOCK_EVALUATED_CREATORS_LIST: ReactedCreatorResponse[] =
  MOCK_RECOMMENDED_CREATORS.map(
    ({
      creatorId,
      creatorName,
      creatorProfileImgUrl,
      creatorAge,
      creatorSkinTypes,
      creatorSubscriberNum,
    }) => ({
      creatorId,
      creatorName,
      creatorProfileImgUrl,
      creatorAge,
      creatorSkinTypes,
      creatorSubscriberNum,
      myReactionCount: 3,
    })
  );

export const MOCK_EVALUATED_PRODUCTS: Pick<
  ReactedProductResponse,
  'productId' | 'productImgUrl' | 'productName'
>[] = [
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

// 리뷰 평가한 상품 (GET /api/v1/users/reactions/products 의 항목 모양)
// categoryId 는 목업 화면의 카테고리 탭 필터용입니다. 응답에는 카테고리가 없습니다.
// TODO: 연동 시 카테고리 탭을 어떻게 거를지 확인 (API 쿼리 또는 응답 필드)
export const MOCK_EVALUATED_PRODUCTS_LIST: (ReactedProductResponse & {
  categoryId: number;
})[] = [
  {
    productId: 1,
    productImgUrl: '',
    productName: '아토베리어 365 크림아토베리어 365크림',
    brandName: '에스트라',
    myReactionCount: 3,
    categoryId: 1,
  },
  {
    productId: 2,
    productImgUrl: '',
    productName: '캐롯 패드 카로팅 카밍워터 패드 200매',
    brandName: '에스트라',
    myReactionCount: 3,
    categoryId: 2,
  },
  {
    productId: 3,
    productImgUrl: '',
    productName: '아토베리어 365 선크림 SPF50+ PA+++',
    brandName: '에스트라',
    myReactionCount: 3,
    categoryId: 1,
  },
  {
    productId: 4,
    productImgUrl: '',
    productName: '아토베리어 365 토너 200ml 대용량',
    brandName: '에스트라',
    myReactionCount: 3,
    categoryId: 2,
  },
  {
    productId: 5,
    productImgUrl: '',
    productName: '아이오페 레티놀 엑스퍼트 0.1 크림',
    brandName: '아이오페',
    myReactionCount: 3,
    categoryId: 1,
  },
];

// TODO: 내 평가 목록 연동 시 MyReactionResponse(평탄, reactionType·commentContent)로 교체.
// 지금 화면은 리뷰마다 isAgreed·myComment 묶음을 쓰고 있어 화면 구조와 함께 바꿔야 합니다.
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
      productPrice: 10000,
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
      productPrice: 10000,
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
  userProfileImgUrl: null,
  nickname: 'sobi22',
  gender: '여성',
  age: 'TWENTIES',
  skinTypeIds: [1, 3],
  skinExpectationIds: [7, 2],
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
