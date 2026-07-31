import mockProfileImg from '@/assets/mock_creator.png';
import mockProductImg from '@/assets/mock_product_2.png';

const MOCK_PRODUCT_THUMBNAILS = {
  brandName: '코스알엑스',
  productName: '더 6 펩타이드 스킨 부스터 세럼',
  price: 23000,
  rating: 4.9,
  reviewCount: 1123,
  productImgUrl: mockProductImg,
};
const MOCK_CREATOR = {
  creatorId: 1,
  nickname: '다예 Daily Daye',
  profileImageUrl: mockProfileImg,
  subscriberNum: 388000,
  trustScore: 100,
  ageGroup: '20',
  skinTypes: ['건성', '민감성'],
};

const MOCK_REVIEW = {
  creator: { ...MOCK_CREATOR },
  rating: 4.5,
  content:
    '많은 유튜버분들이 추천해서 내돈내산으로 구매했는데, 정말 만족스러워요. 속수분을 효과적으로 채워줘서 다음 단계 제품들의 흡수도 도와주고요. 펌프 타입이라 사용하기 편리해서 세안 후 첫 단계에 가장 손이 많이 가는 세럼이에요.',
  productName: '더 6 펩타이드 스킨 부스터 세럼',
};
const MOCK_REVIEW_2 = {
  creator: { ...MOCK_CREATOR },
  rating: 4.5,
  content:
    '많은 유튜버분들이 추천해서 내돈내산으로 구매했는데, 정말 만족스러워요. 속수분을 효과적으로 채워줘서 다음 단계 제품들의 흡수도 도와주고요. 펌프 타입이라 사용하기 편리해서 세안 후 첫 단계에 가장 손이 많이 가는 세럼이에요.많은 유튜버분들이 추천해서 내돈내산으로 구매했는데, 정말 만족스러워요. 속수분을 효과적으로 채워줘서 다음 단계 제품들의 흡수도 도와주고요. 펌프 타입이라 사용하기 편리해서 세안 후 첫 단계에 가장 손이 많이 가는 세럼이에요.',
  productName: '더 6 펩타이드 스킨 부스터 세럼',
};
const MOCK_REVIEW_3 = {
  creator: { ...MOCK_CREATOR },
  rating: 4.5,
  content:
    '많은 유튜버분들이 추천해서 내돈내산으로 구매했는데, 정말 만족스러워요. ',
  productName: '더 6 펩타이드 스킨 부스터 세럼',
};
export const MOCK_REVIEWS = [
  {
    review: { ...MOCK_REVIEW },
    product: { ...MOCK_PRODUCT_THUMBNAILS },
    agreePercent: '91%',
    skinType: '건성',
  },
  {
    review: { ...MOCK_REVIEW_2 },
    product: { ...MOCK_PRODUCT_THUMBNAILS },
    agreePercent: '93%',
    skinType: '건성',
  },
  {
    review: { ...MOCK_REVIEW_3 },
    product: { ...MOCK_PRODUCT_THUMBNAILS },
    agreePercent: '93%',
    skinType: '건성',
  },
  {
    review: { ...MOCK_REVIEW },
    product: { ...MOCK_PRODUCT_THUMBNAILS },
    agreePercent: '93%',
    skinType: '건성',
  },
];
