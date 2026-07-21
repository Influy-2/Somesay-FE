// Product/가로스크롤형 컴포넌트

import { Star16Icon as StarIcon } from '@/shared/icons';
import { Link } from 'react-router';
import { ProductCardType } from '@somesay/shared';
import { WhiteHeartButton, AvatarStack } from '@/shared/components';
import { PATH } from '@/routes/path';

export type HorizontalScrollProductCardProps = ProductCardType;

export const HorizontalScrollProductCard = ({
  productId,
  productImageUrl,
  brandName,
  productName,
  price,
  rating,
  reviewCount,
  isHearted,
  creators,
}: HorizontalScrollProductCardProps) => {
  const formattedPrice = price
    ? price.toLocaleString('ko-KR')
    : '가격 정보 없음';
  const formattedReviewCount = reviewCount.toLocaleString('ko-KR');
  const creatorNames = creators.map((c) => c.name).join(', ');

  const onHeartToggle = () => {
    console.log('하트클릭');
  };
  const formattedRating =
    (String(rating).split('.')[1]?.length ?? 0) > 2
      ? rating.toFixed(2)
      : rating;

  return (
    <article
      className="relative flex w-39 shrink-0 flex-col items-start gap-2"
      aria-label={`${brandName} ${productName}, ${formattedPrice}, 별점 ${rating}점, 리뷰 ${formattedReviewCount}개, 리뷰한 크리에이터: ${creatorNames}`}
    >
      <div className="bg-grey02 relative aspect-39/44 h-44 self-stretch overflow-hidden">
        <div aria-hidden="true" className="h-full w-full">
          {productImageUrl && productImageUrl.length > 0 && (
            <img
              src={productImageUrl}
              alt=""
              className="size-full object-cover"
            />
          )}
        </div>

        <div className="absolute right-2 bottom-2 z-1">
          <WhiteHeartButton
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
          <AvatarStack creators={creators} />
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
