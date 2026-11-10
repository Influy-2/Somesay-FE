import { Star16Icon } from '@/shared/icons';
import { Move12Icon } from '@/shared/icons';
import { formatPrice, type CreatorReviewResponse } from '@somesay/shared';

// 크리에이터 리뷰 응답은 리뷰·상품 필드가 평탄하게 실려 응답 항목을 그대로 넘깁니다.
type CreatorHomeReviewCardProps = Pick<
  CreatorReviewResponse,
  | 'reviewRating'
  | 'reviewContent'
  | 'brandName'
  | 'productName'
  | 'productImgUrl'
  | 'productPrice'
>;

export const CreatorHomeReviewCard = ({
  reviewRating,
  reviewContent,
  brandName,
  productName,
  productImgUrl,
  productPrice,
}: CreatorHomeReviewCardProps) => {
  return (
    <article
      aria-label={`${productName} 리뷰`}
      className="flex w-full flex-col gap-6"
    >
      {/* 상품 정보 */}
      <div className="flex w-full items-center gap-3">
        {productImgUrl ? (
          <img
            src={productImgUrl}
            alt={productName}
            className="h-auto w-15 object-cover"
          />
        ) : (
          <span
            className="bg-grey01 aspect-square w-15 shrink-0"
            aria-hidden="true"
          />
        )}
        <div className="caption1-m flex flex-1 flex-col gap-1">
          <span>{brandName}</span>
          <span className="line-clamp-1">{productName}</span>
          <span>{formatPrice(productPrice)}</span>
        </div>
        <Move12Icon aria-hidden="true" />
      </div>
      {/* 별점 + 리뷰 내용 */}
      <div
        className="flex w-full flex-col gap-1"
        aria-label={`별점 ${reviewRating}점. ${reviewContent}`}
      >
        {/* 별점 */}
        <div className="flex items-center gap-1" aria-hidden="true">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star16Icon key={i} />
            ))}
          </div>
          <span className="body2-sb">{reviewRating}</span>
        </div>
        {/* 리뷰 내용 */}
        <p aria-hidden="true" className="body2-m">
          {reviewContent}
        </p>
      </div>
      {/* 구분선 */}
      <hr className="border-grey03 w-full px-4" />
    </article>
  );
};
