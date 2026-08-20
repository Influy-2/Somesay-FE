// Product/상품추천화면

import { formatPrice, type ProductCardType } from '@somesay/shared';
import { Link } from 'react-router';

import { PATH } from '@/routes/path';
import { AvatarStack } from '../productCard/AvatarStack';
import { HeartButton } from '../buttons/HeartButton';
import { Star16Icon as StarIcon } from '@/shared/icons';

export type RecommendedProductCardProps = ProductCardType & {
  /** 추천 순서 (카드 왼쪽 위 숫자) */
  order: number;
  onHeartToggle: () => void;
};

export const RecommendedProductCard = ({
  productId,
  brandName,
  productName,
  productImgUrl,
  price,
  avgRating,
  reviewCount,
  creatorImageUrls,
  isHearted,
  order,
  onHeartToggle,
}: RecommendedProductCardProps) => {
  const formattedPrice = formatPrice(price);
  const formattedReviewCount = reviewCount?.toLocaleString('ko-KR') || 0;

  return (
    <article className="bg-grey02 relative aspect-100/105 w-full overflow-hidden">
      {productImgUrl && (
        <img
          src={productImgUrl}
          alt=""
          decoding="async"
          className="absolute inset-0 size-full object-cover"
          aria-hidden="true"
        />
      )}

      {/* 하단 제품 정보 및 하트 */}
      <div className="absolute inset-x-0 bottom-0 flex items-end bg-linear-to-t from-black to-black/0 p-5">
        <div className="flex min-w-0 flex-1 flex-col gap-1 text-white">
          {/* 상품 기본 정보 */}
          <div aria-hidden="true">
            <p className="body2-m truncate">{brandName}</p>
            <p className="body2-m line-clamp-1">{productName}</p>
            <p className="body2-m truncate">{formattedPrice}</p>
          </div>

          {/* 상품 평가와 찜 */}
          <div className="flex items-center justify-between gap-3">
            {/* 상품 평가 정보 */}
            <div className="flex min-w-0 items-center gap-1" aria-hidden="true">
              <div className="flex shrink-0 items-center">
                <StarIcon className="size-4 text-white" />
                <span className="body2-sb">{avgRating.toFixed(1)}</span>
              </div>
              <span className="body2-m shrink-0">({formattedReviewCount})</span>
              {creatorImageUrls?.length > 0 && (
                <AvatarStack
                  creatorImageUrls={creatorImageUrls}
                  borderColor="border-grey09"
                />
              )}
            </div>

            {/* 상품 찜 버튼 */}
            <div className="z-1">
              <HeartButton
                isHearted={isHearted}
                onHeartToggle={onHeartToggle}
                productName={productName}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 추천 상품 순위 */}
      <div
        className="body2-m absolute top-0 left-0 flex size-9 items-center justify-center bg-black text-white"
        aria-hidden="true"
      >
        {order}
      </div>

      <Link
        to={`${PATH.PRODUCT.BASE}/${productId}`}
        className="absolute inset-0"
        aria-label={`${order}번째 추천 제품 ${brandName} ${productName}, ${formattedPrice}, 별점 ${avgRating.toFixed(1)}점, 리뷰 ${formattedReviewCount}개 상세 페이지로 이동`}
      />
    </article>
  );
};
