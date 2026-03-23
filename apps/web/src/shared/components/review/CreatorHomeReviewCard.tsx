import Star16Icon from '@/shared/icons/Star16Icon.svg?react';
import Move12Icon from '@/shared/icons/Move12Icon.svg?react';
import { ProductCardType } from '@somesay/shared';

interface CreatorHomeReviewCardProps {
  rating: number;
  content: string;
  product: ProductCardType;
}

export const CreatorHomeReviewCard = ({
  rating,
  content,
  product,
}: CreatorHomeReviewCardProps) => {
  return (
    <article
      aria-label={`${product.productName} 리뷰`}
      className="flex w-full flex-col gap-6"
    >
      {/* 상품 정보 */}
      <div className="flex w-full items-center gap-3">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="h-auto w-15 object-cover"
        />
        <div className="caption1-m flex flex-1 flex-col gap-1">
          <span>{product.brand}</span>
          <span className="line-clamp-1">{product.productName}</span>
          <span>{product.price.toLocaleString()}원</span>
        </div>
        <Move12Icon aria-hidden="true" />
      </div>
      {/* 별점 + 리뷰 내용 */}
      <div
        className="flex w-full flex-col gap-1"
        aria-label={`별점 ${rating}점. ${content}`}
      >
        {/* 별점 */}
        <div className="flex items-center gap-1" aria-hidden="true">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star16Icon key={i} />
            ))}
          </div>
          <span className="body2-sb">{rating}</span>
        </div>
        {/* 리뷰 내용 */}
        <p aria-hidden="true" className="body2-m">
          {content}
        </p>
      </div>
      {/* 구분선 */}
      <hr className="border-grey03 w-full px-4" />{' '}
    </article>
  );
};
