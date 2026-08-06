// Product/랭킹용/홈 컴포넌트
import { formatPrice, type ProductCardType } from '@somesay/shared';
import { Link } from 'react-router';

import { PATH } from '@/routes/path';
import { Star16Icon as StarIcon } from '@/shared/icons';
import { AvatarStack } from './AvatarStack';
import { HeartButton } from '../buttons/HeartButton';

type HomeProductRankingCardProps = ProductCardType & {
  ranking: number;
  isWishPending?: boolean;
  onHeartToggle: () => void;
};

export const HomeProductRankingCard = ({
  productId,
  productImgUrl,
  brandName,
  productName,
  price,
  rating,
  reviewCount,
  ranking,
  isHearted,
  creatorImageUrls,
  isWishPending,
  onHeartToggle,
}: HomeProductRankingCardProps) => {
  const formattedReviewCount = reviewCount
    ? reviewCount.toLocaleString('ko-KR')
    : '0';

  return (
    <article
      className="relative flex flex-1 shrink-0 flex-col items-start"
      aria-label={`${ranking}위 ${brandName} ${productName}, ${formatPrice(price)}, 별점 ${rating}점, 리뷰 ${formattedReviewCount}개`}
    >
      {/* 이미지 영역 */}
      <div className="relative h-[12.5rem] w-full overflow-hidden">
        {/* 상품 이미지 */}
        <div aria-hidden="true" className="border-grey02 h-full w-full border">
          {productImgUrl && productImgUrl.length > 0 && (
            <img
              src={productImgUrl}
              alt=""
              className="size-full object-cover"
            />
          )}
        </div>

        {/* 랭킹 배지 */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 flex size-8 items-center justify-center bg-black"
        >
          <span className="body2-m text-white">{ranking}</span>
        </div>

        {/* 찜 버튼 */}
        <div className="absolute right-2 bottom-2 z-1">
          <HeartButton
            isHearted={isHearted}
            onHeartToggle={onHeartToggle}
            productName={productName}
            onColor="white"
            offColor="white"
            isPending={isWishPending ?? false}
          />
        </div>
      </div>

      {/* 텍스트 정보 영역 */}
      <div
        className="flex w-full flex-col gap-1 pt-2 text-black"
        aria-hidden="true"
      >
        {/* 브랜드 */}
        <p className="body2-m truncate text-black">{brandName}</p>

        {/* 상품명 */}
        <p className="body2-m w-full truncate text-black">{productName}</p>

        {/* 가격 */}
        <p className="body2-m truncate text-black">{formatPrice(price)}</p>

        {/* 별점 + 리뷰수 + 크리에이터 프로필 */}
        <div className="flex items-center gap-1">
          {/* 별점 */}
          <div className="flex items-center">
            <StarIcon className="text-primary-300 size-4" />
            <span className="body2-sb">{rating.toFixed(1)}</span>
          </div>
          {/* 리뷰수 */}
          <span className="body2-m">({formattedReviewCount})</span>
          {/* 크리에이터 프로필 스택 */}
          <AvatarStack creatorImageUrls={creatorImageUrls} />
        </div>
      </div>
      <Link
        to={`${PATH.PRODUCT.BASE}/${productId}`}
        className="absolute inset-0"
      />
    </article>
  );
};
