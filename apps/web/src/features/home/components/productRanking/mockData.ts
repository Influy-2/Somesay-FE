import { ProductRankingCardType } from '@somesay/shared';
import mockProfileImg from '@/assets/mock_profile_img.svg';
import mockProfile2Img from '@/assets/mock_profile2_img.png';
import mockProfile3Img from '@/assets/mock_profile3_img.png';
import mockProductImg from '@/assets/mock_product_img.png';

export const MOCK_PRODUCT_RANKING_CARDS: ProductRankingCardType[] = [
  {
    productId: 1,
    imageUrl: mockProductImg,
    brand: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍...',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    rank: 1,
    isHearted: false,
    creators: [
      {
        name: '김점례',
        profileImageUrl: mockProfileImg,
      },
      { name: '뷰티수달', profileImageUrl: mockProfile2Img },
      { name: '올리브언니', profileImageUrl: mockProfile3Img },
    ],
  },
  {
    productId: 2,
    imageUrl: mockProductImg,
    brand: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍...',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    rank: 2,
    isHearted: true,
    creators: [
      { name: '닥터스킨', profileImageUrl: mockProfileImg },
      { name: '피부요정', profileImageUrl: mockProfile2Img },
      { name: '김점례', profileImageUrl: mockProfileImg },
    ],
  },
  {
    productId: 3,
    imageUrl: mockProductImg,
    brand: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍...',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    rank: 3,
    isHearted: false,
    creators: [
      { name: '뷰티수달', profileImageUrl: mockProfile2Img },
      { name: '올리브언니', profileImageUrl: mockProfile3Img },
      { name: '닥터스킨', profileImageUrl: mockProfileImg },
    ],
  },
  {
    productId: 4,
    imageUrl: mockProductImg,
    brand: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍...',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    rank: 4,
    isHearted: false,
    creators: [
      { name: '피부요정', profileImageUrl: mockProfile2Img },
      { name: '김점례', profileImageUrl: mockProfileImg },
      { name: '뷰티수달', profileImageUrl: mockProfile2Img },
    ],
  },
];
