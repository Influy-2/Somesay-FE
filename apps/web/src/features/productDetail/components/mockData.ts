import mockProfileImg from '@/assets/mock_profile_img.svg';
import mockProductImg from '@/assets/mock_product_img.png';

export const MOCK_PRODUCT_DETAIL = {
  productImgUrl: mockProductImg,
  brandName: '토리든',
  brandImageUrl: 'https://placeholder.com/brand_logo.png',
  productName:
    '다이브인 저분자 히알루론산 세럼 [흔적 리페어] 10개입 마데카소사이드',
  price: 30000,
  capacity: '50ml',
  likeCount: 1250,
  isLiked: false,
};

export const MOCK_REVIEW_SUMMARY = {
  rating: 4.9,
  reviewCount: 423,
  summaryText:
    '세럼이 끈적임 없이 촉촉하고, 수분감이 많아서 특히 건성 피부인 분들에게 추천해요.',
  skinTypes: ['건성'],
  effects: ['여드름 진정', '붉은기 완화', '각질제거'],
};

export const MOCK_REVIEWS = [
  {
    id: 1,
    ranking: 1,
    creator: {
      name: '김점례',
      profileImg: mockProfileImg,
      subscriberCount: '30만',
      reliability: 100,
      tags: ['20대', '건성'],
    },
    rating: 4.8,
    content:
      '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 향도 은은하고, 남은 에센스는 닦토처럼 써도 부담 없어요. \n 매일 아침 세안 후에 피부결 정돈용으로 딱 좋습니다.',
    agreedPercentage: 82,
    comments: [
      {
        id: 101,
        userId: 1,
        nickname: 'abcdef',
        isAgree: true,
        content:
          '이 리뷰에 정말 공감합니다. 이 제품이 메이크업 전에 쓰기에 진짜 좋아요.',
      },
      {
        id: 102,
        userId: 2,
        nickname: 'qwerty',
        isAgree: false,
        content:
          '이 리뷰에 정말 반대합니다. 이 제품이 메이크업 전에 쓰기에 진짜 나빠요.',
      },
      {
        id: 103,
        userId: 3,
        nickname: 'qwerty',
        isAgree: false,
        content:
          '이 리뷰에 정말 반대합니다. 이 제품이 메이크업 전에 쓰기에 진짜 나빠요.',
      },
    ],
    source: {
      title: '광고❌ 올리브영 1등 수분 세럼! 과연 다른 것도 좋을까..?',
      viewCount: '29만회',
      uploadDate: '10개월 전',
      thumbnail: mockProductImg,
      channelName: 'LeoJ Makeup',
    },
  },
  {
    id: 2,
    ranking: 2,
    creator: {
      name: '김점례',
      profileImg: mockProfileImg,
      subscriberCount: '30만',
      reliability: 100,
      tags: ['20대', '건성'],
    },
    rating: 4.8,
    content:
      '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 향도 은은하고, 남은 에센스는 닦토처럼 써도 부담 없어요. \n 매일 아침 세안 후에 피부결 정돈용으로 딱 좋습니다.',
    agreedPercentage: 82,
    comments: [
      {
        id: 101,
        userId: 1,
        nickname: 'abcdef',
        isAgree: true,
        content:
          '이 리뷰에 정말 공감합니다. 이 제품이 메이크업 전에 쓰기에 진짜 좋아요.',
      },
      {
        id: 102,
        userId: 2,
        nickname: 'qwerty',
        isAgree: false,
        content:
          '이 리뷰에 정말 반대합니다. 이 제품이 메이크업 전에 쓰기에 진짜 나빠요.',
      },
    ],
    source: {
      title: '광고❌ 올리브영 1등 수분 세럼! 과연 다른 것도 좋을까..?',
      viewCount: '29만회',
      uploadDate: '10개월 전',
      thumbnail: mockProductImg,
      channelName: 'LeoJ Makeup',
    },
  },
  {
    id: 3,
    ranking: 3,
    creator: {
      name: '김점례',
      profileImg: mockProfileImg,
      subscriberCount: '30만',
      reliability: 100,
      tags: ['20대', '건성'],
    },
    rating: 4.8,
    content:
      '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 향도 은은하고, 남은 에센스는 닦토처럼 써도 부담 없어요. \n 매일 아침 세안 후에 피부결 정돈용으로 딱 좋습니다.',
    agreedPercentage: 0,
    comments: [],
    source: {
      title: '광고❌ 올리브영 1등 수분 세럼! 과연 다른 것도 좋을까..?',
      viewCount: '29만회',
      uploadDate: '10개월 전',
      thumbnail: mockProductImg,
      channelName: 'LeoJ Makeup',
    },
  },
  {
    id: 4,
    ranking: 4,
    creator: {
      name: '김점례',
      profileImg: mockProfileImg,
      subscriberCount: '30만',
      reliability: 100,
      tags: ['20대', '건성'],
    },
    rating: 4.8,
    content:
      '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 향도 은은하고, 남은 에센스는 닦토처럼 써도 부담 없어요. \n 매일 아침 세안 후에 피부결 정돈용으로 딱 좋습니다.',
    agreedPercentage: 82,
    comments: [
      {
        id: 101,
        userId: 1,
        nickname: 'abcdef',
        isAgree: true,
        content:
          '이 리뷰에 정말 공감합니다. 이 제품이 메이크업 전에 쓰기에 진짜 좋아요.',
      },
    ],
    source: {
      title: '광고❌ 올리브영 1등 수분 세럼! 과연 다른 것도 좋을까..?',
      viewCount: '29만회',
      uploadDate: '10개월 전',
      thumbnail: mockProductImg,
      channelName: 'LeoJ Makeup',
    },
  },
];

export const MOCK_SIMILAR_PRODUCTS = [
  {
    productId: 101,
    imageUrl: mockProductImg,
    brand: '토리든',
    productName: '[캐롯] 카로틴 카밍워터 패드',
    price: 10000,
    rating: 4.9,
    reviewCount: 43,
    isHearted: false,
    creators: [
      {
        name: '크리에이터1',
        profileImageUrl: mockProfileImg,
      },
      {
        name: '크리에이터2',
        profileImageUrl: mockProfileImg,
      },
      {
        name: '크리에이터3',
        profileImageUrl: mockProfileImg,
      },
    ],
  },
  {
    productId: 102,
    imageUrl: mockProductImg,
    brand: '스킨푸드',
    productName: '당근 수분 패드 60매',
    price: 18000,
    rating: 4.8,
    reviewCount: 128,
    isHearted: true,
    creators: [
      {
        name: '크리에이터4',
        profileImageUrl: mockProfileImg,
      },
      {
        name: '크리에이터5',
        profileImageUrl: mockProfileImg,
      },
    ],
  },
  {
    productId: 103,
    imageUrl: mockProductImg,
    brand: '메디힐',
    productName: '티트리 트러블 패드 더블기획',
    price: 22000,
    rating: 4.7,
    reviewCount: 85,
    isHearted: false,
    creators: [
      {
        name: '크리에이터6',
        profileImageUrl: mockProfileImg,
      },
    ],
  },
  {
    productId: 104,
    imageUrl: mockProductImg,
    brand: '아누아',
    productName: '어성초 77 클리어 패드',
    price: 15000,
    rating: 4.9,
    reviewCount: 312,
    isHearted: false,
    creators: [
      {
        name: '크리에이터7',
        profileImageUrl: mockProfileImg,
      },
      {
        name: '크리에이터8',
        profileImageUrl: mockProfileImg,
      },
    ],
  },
];
