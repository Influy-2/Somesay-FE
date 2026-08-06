import { formatPrice, type ProductCardType } from '@somesay/shared';
import { Link } from 'react-router';

import { PATH } from '@/routes/path';
import { HeartButton } from '@/shared/components/buttons/HeartButton';
import { Star16Icon } from '@/shared/icons';
import { AvatarStack } from './AvatarStack';

export type ProductRankingCardProps = ProductCardType & {
  ranking: number;
  onHeartToggle: () => void;
};

export const ProductRankingCard = ({
  productId,
  productImgUrl,
  brandName,
  productName,
  price,
  rating,
  reviewCount,
  creatorImageUrls,
  isHearted,
  ranking,
  onHeartToggle,
}: ProductRankingCardProps) => {
  const formattedReviewCount = reviewCount.toLocaleString('ko-KR');
  const visibleCreatorImageUrls = creatorImageUrls.slice(0, 3);

  return (
    <article className="relative flex min-w-0 flex-col items-start gap-2">
      <div className="bg-grey01 border-grey02 relative aspect-39/44 w-full overflow-hidden border">
        {productImgUrl && (
          <img
            src={productImgUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        )}

        <span
          className="body2-m absolute top-0 left-0 flex size-8 items-center justify-center bg-black text-white"
          aria-hidden="true"
        >
          {ranking}
        </span>

        <div className="absolute right-2 bottom-2 z-1">
          <HeartButton
            isHearted={isHearted}
            onHeartToggle={onHeartToggle}
            productName={productName}
          />
        </div>
      </div>

      <div
        className="flex w-full min-w-0 flex-col gap-1 px-3 text-black"
        aria-hidden="true"
      >
        <p className="body2-m w-full truncate">{brandName}</p>
        <p className="body2-m w-full truncate">{productName}</p>
        <p className="body2-m w-full truncate">{formatPrice(price)}</p>

        <div className="flex max-w-full items-center gap-1 overflow-hidden">
          <div className="flex shrink-0 items-center">
            <Star16Icon className="text-primary-300 size-4" />
            <span className="body2-sb">{rating.toFixed(1)}</span>
          </div>
          <span className="body2-m shrink-0">({formattedReviewCount})</span>
          {visibleCreatorImageUrls.length > 0 && (
            <AvatarStack creatorImageUrls={visibleCreatorImageUrls} />
          )}
        </div>
      </div>

      <Link
        to={`${PATH.PRODUCT.BASE}/${productId}`}
        className="absolute inset-0"
        aria-label={`${ranking}위 ${brandName} ${productName}, ${formatPrice(price)}, 별점 ${rating.toFixed(1)}점, 리뷰 ${formattedReviewCount}개 상세 페이지로 이동`}
      />
    </article>
  );
};
