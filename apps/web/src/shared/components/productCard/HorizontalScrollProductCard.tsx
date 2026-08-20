// Product/가로스크롤형 컴포넌트

import { Star16Icon as StarIcon } from '@/shared/icons';
import { Link } from 'react-router';
import { ProductCardType } from '@somesay/shared';
import { HeartButton, AvatarStack } from '@/shared/components';
import { PATH } from '@/routes/path';

export type HorizontalScrollProductCardProps = ProductCardType & {
  onHeartToggle: () => void;
};

export const HorizontalScrollProductCard = ({
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
}: HorizontalScrollProductCardProps) => {
  const formattedPrice = price
    ? price.toLocaleString('ko-KR') + '원'
    : '가격 정보 없음';
  const formattedReviewCount = reviewCount.toLocaleString('ko-KR');
  const formattedRating =
    (String(avgRating).split('.')[1]?.length ?? 0) > 2
      ? avgRating.toFixed(2)
      : avgRating;

  return (
    <article
      className="relative flex w-39 shrink-0 flex-col items-start gap-2"
      aria-label={`${brandName} ${productName}, ${formattedPrice}, 별점 ${avgRating}점, 리뷰 ${formattedReviewCount}개`}
    >
      <div className="bg-grey02 relative aspect-39/44 h-44 self-stretch overflow-hidden">
        <div aria-hidden="true" className="h-full w-full">
          {productImgUrl && productImgUrl.length > 0 && (
            <img
              src={productImgUrl}
              alt=""
              className="size-full object-cover"
            />
          )}
        </div>

        <div className="absolute right-2 bottom-2 z-1">
          <HeartButton
            isHearted={isHearted}
            onHeartToggle={onHeartToggle}
            productName={productName}
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-1" aria-hidden="true">
        <p className="caption2-m truncate text-black">{brandName}</p>
        <p className="body2-m line-clamp-1 w-full truncate text-black">
          {productName}
        </p>
        <p className="body2-m truncate text-black">{formattedPrice}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <StarIcon className="size-4 text-black" aria-hidden="true" />
              <span className="body2-sb text-black">{formattedRating}</span>
            </div>
            <span className="body2-m text-black">({formattedReviewCount})</span>
          </div>
          <AvatarStack creatorImageUrls={creatorImageUrls} />
        </div>
      </div>

      <Link
        to={`${PATH.PRODUCT.BASE}/${productId}`}
        className="absolute inset-0"
        aria-label={`${brandName} ${productName} 상세 페이지로 이동`}
      />
    </article>
  );
};
