// Product/상품추천화면

import { useState } from 'react';

import recommendedProductCardImg from '@/assets/recommended_product_card_img.png';
import mockProfileImg from '@/assets/mock_profile_img.svg';
import mockProfile2Img from '@/assets/mock_profile2_img.png';
import mockProfile3Img from '@/assets/mock_profile3_img.png';
import { AvatarStack, WhiteHeartButton } from '@/shared/components';
import { Star16Icon as StarIcon } from '@/shared/icons';

// TODO: API 연동 후 더미 데이터 제거
const PRODUCT = {
  order: 1,
  brand: '토리든',
  productName: '캐롯 카로팅 카밍 워터 패드 50p',
  price: '10,000원',
  rating: 4.9,
  reviewCount: 43,
  imageUrl: recommendedProductCardImg,
  creators: [
    { name: 'creator1', profileImageUrl: mockProfileImg },
    { name: 'creator2', profileImageUrl: mockProfile2Img },
    { name: 'creator3', profileImageUrl: mockProfile3Img },
  ],
};

export const RecommendedProductCard = () => {
  const [isHearted, setIsHearted] = useState(false);

  const formattedReviewCount = PRODUCT.reviewCount.toLocaleString('ko-KR');

  return (
    <article
      className="bg-grey02 relative aspect-[358/341] w-full overflow-hidden"
      aria-label={`${PRODUCT.brand} ${PRODUCT.productName}, ${PRODUCT.price}, 별점 ${PRODUCT.rating}점, 리뷰 ${formattedReviewCount}개`}
    >
      <img
        src={PRODUCT.imageUrl}
        alt=""
        className="absolute inset-0 size-full object-cover"
        aria-hidden="true"
      />

      {/* 하단 제품 정보 및 하트 */}
      <div
        className="absolute inset-x-0 bottom-0 flex items-end bg-linear-to-t from-black to-black/0 p-5"
        aria-hidden="true"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1 text-white">
          {/* 브랜드 */}
          <p className="body2-m truncate">{PRODUCT.brand}</p>
          {/* 제품명 */}
          <p className="body2-m line-clamp-1">{PRODUCT.productName}</p>
          {/* 가격 */}
          <p className="body2-m truncate">{PRODUCT.price}</p>

          {/* 별점, 리뷰수, 리뷰어, 하트 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-1">
              <div className="flex shrink-0 items-center">
                <StarIcon className="size-4 text-white" />
                <span className="body2-sb">{PRODUCT.rating}</span>
              </div>
              <span className="body2-m shrink-0">({formattedReviewCount})</span>
              <AvatarStack
                creators={PRODUCT.creators}
                borderColor="border-grey09"
              />
            </div>

            <WhiteHeartButton
              isHearted={isHearted}
              onHeartToggle={() => setIsHearted((prev) => !prev)}
              productName={PRODUCT.productName}
            />
          </div>
        </div>
      </div>

      {/* 제품 순위 표시 */}
      <div
        className="body2-m absolute top-0 left-0 flex size-9 items-center justify-center bg-black text-white"
        aria-hidden="true"
      >
        {PRODUCT.order}
      </div>
    </article>
  );
};
