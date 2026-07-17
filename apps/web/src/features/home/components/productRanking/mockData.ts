import { ProductRankingCardType } from '@somesay/shared';
import mockProfileImg from '@/assets/mock_profile_img.svg';
import mockProfile2Img from '@/assets/mock_profile2_img.png';
import mockProfile3Img from '@/assets/mock_profile3_img.png';
import mockProductImg from '@/assets/mock_product_img.png';

export const MOCK_PRODUCT_RANKING_CARDS: ProductRankingCardType[] = [
  {
    productId: 1,
    productImgUrl: mockProductImg,
    brandName: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍...',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    rank: 1,
    isHearted: false,
    creatorImageUrls: [mockProfileImg, mockProfile2Img, mockProfile3Img],
  },
  {
    productId: 2,
    productImgUrl: mockProductImg,
    brandName: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍...',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    rank: 2,
    isHearted: true,
    creatorImageUrls: [mockProfileImg, mockProfile2Img, mockProfileImg],
  },
  {
    productId: 3,
    productImgUrl: mockProductImg,
    brandName: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍...',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    rank: 3,
    isHearted: false,
    creatorImageUrls: [mockProfile2Img, mockProfile3Img, mockProfileImg],
  },
  {
    productId: 4,
    productImgUrl: mockProductImg,
    brandName: '토리든',
    productName: '[스킨푸드] 캐롯 카로팅 카밍...',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    rank: 4,
    isHearted: false,
    creatorImageUrls: [mockProfile2Img, mockProfileImg, mockProfile2Img],
  },
];
