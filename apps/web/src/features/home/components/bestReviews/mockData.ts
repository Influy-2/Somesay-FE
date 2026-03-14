import mockProfileImg from '@/assets/mock_profile_img.svg';
import mockProductImg from '@/assets/mock_product_img.png';

const MOCK_PRODUCT_THUMBNAILS = {
  brand: '토리든',
  productName: '캐롯 캐롯 캐롯 캐롯 카로팅 카밍 세럼',
  price: 10000,
  rating: 4.9,
  reviewCount: 1123,
  imageUrl: mockProductImg,
};
const MOCK_CREATOR = {
  creatorId: 1,
  nickname: '김점례',
  profileImageUrl: mockProfileImg,
  subscriberCount: 30,
  trustScore: 100,
  ageGroup: 20,
  skinType: '건성',
};

const MOCK_REVIEW = {
  creator: { ...MOCK_CREATOR },
  rating: 4.8,
  content:
    '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 향도 은은하고, 남은 에센스는 닦토처럼 써도 부담 없어요.매일 아침 세안 후에 피부결 정돈용으로 딱 좋습니다.',
  productName: '토리든',
};
export const MOCK_REVIEWS = [
  {
    review: { ...MOCK_REVIEW },
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
  {
    review: { ...MOCK_REVIEW },
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
