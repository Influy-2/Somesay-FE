//Review/ Preview

import { Link } from 'react-router';
import { PATH } from '@/routes/path';
import { StarRating } from '../rating/StarRating';
import { formatPrice } from '@somesay/shared';

interface ReviewPreviewCardProps {
  reviewId: number;
  rating: number;
  content: string;
  product: {
    productId: number;
    productName: string;
    brandName: string;
    productImgUrl: string;
    price: number;
  };
}

export const ReviewPreviewCard = ({
  reviewId,
  rating,
  content,
  product,
}: ReviewPreviewCardProps) => {
  return (
    // 카드 전체가 리뷰 원본으로 가는 하나의 링크입니다.
    // 상품 정보는 보여주기만 하고 이동시키지 않아 중첩 링크가 생기지 않습니다.
    <Link
      to={`${PATH.PRODUCT.BASE}/${product.productId}?review=${reviewId}`}
      className="border-grey02 flex h-58 w-[calc(100vw_-_44px)] max-w-99 flex-col justify-between gap-5 border p-5"
      aria-label="리뷰 원본 보기"
    >
      <div className="flex flex-1 flex-col gap-1">
        {/* 별점 */}
        <div className="flex items-center gap-1">
          <StarRating rating={rating} />
          <span className="body2-sb">{rating}</span>
        </div>
        {/* 리뷰 */}
        <div className="flex flex-1 items-start">
          <p className="body2-m line-clamp-4">{content}</p>
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="flex w-full items-center gap-3">
        <div className="border-grey02 h-[3.6875rem] w-[3.25rem] shrink-0 overflow-hidden border">
          <img
            src={product.productImgUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="caption1-m text-black">{product.brandName}</span>
          <span className="caption1-m line-clamp-1 text-black">
            {product.productName}
          </span>
          <span className="caption1-m text-black">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
};
