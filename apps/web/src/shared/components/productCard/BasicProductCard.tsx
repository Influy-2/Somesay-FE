// Product/기본 컴포넌트

import { Star16Icon as StarIcon } from '@/shared/icons';
import { Link } from 'react-router';
import { ProductCardType } from '@somesay/shared';
import { HeartButton } from '@/shared/components';
import { PATH } from '@/routes/path';
import { AvatarStack } from '@/shared/components';
type ProductRankingCardProps = ProductCardType & {
  onHeartToggle: () => void;
};

export const BasicProductCard = ({
  productId,
  productImgUrl,
  brandName,
  productName,
  price,
  avgRating,
  reviewCount,
  isHearted,
  creatorImageUrls,
  onHeartToggle,
}: ProductRankingCardProps) => {
  const formattedReviewCount = reviewCount
    ? reviewCount.toLocaleString('ko-KR')
    : 0;

  return (
    <article
      className="relative flex flex-1 shrink-0 flex-col items-start"
      aria-label={`${brandName} ${productName}, ${price ? price + '원' : '가격 정보 없음'}, 별점 ${avgRating}점, 리뷰 ${formattedReviewCount}개`}
    >
      {/* 이미지 영역 */}
      <div className="relative h-50 w-full overflow-hidden border-none">
        {/* 상품 이미지 */}
        <div aria-hidden="true" className="border-grey02 h-full w-full border">
          {productImgUrl && productImgUrl.length > 0 && (
            <img
              src={productImgUrl}
              alt=""
              className="size-full border border-none object-cover"
            />
          )}
        </div>

        {/* 찜 버튼 */}
        <div className="absolute right-2 bottom-2 z-1">
          <HeartButton
            isHearted={isHearted}
            onHeartToggle={onHeartToggle}
            productName={productName}
          />
        </div>
      </div>

      {/* 텍스트 정보 영역 */}
      <div
        className="flex w-full flex-col gap-1 pt-2 text-black"
        aria-hidden="true"
      >
        {/* 브랜드 */}
        <p className="body2-m text-grey-black truncate">{brandName}</p>

        {/* 상품명 */}
        <p className="body2-m text-grey-black line-clamp-1 w-full truncate whitespace-pre-wrap">
          {productName}
        </p>

        {/* 가격 */}
        <p className="body2-m text-grey-black truncate">
          {price ? price.toLocaleString('ko-KR') + '원' : '가격 정보 없음'}
        </p>

        {/* 별점 + 리뷰수 + 크리에이터 프로필 */}
        <div className="flex items-center gap-1">
          {/* 별점 */}
          <div className="flex items-center">
            <StarIcon className="text-primary-300 size-4" />
            <span className="body2-sb">{avgRating.toFixed(1)}</span>
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
