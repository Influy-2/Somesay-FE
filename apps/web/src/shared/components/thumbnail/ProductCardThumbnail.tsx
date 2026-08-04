// 컴포넌트 Thumbnail/기본형
import { Link } from 'react-router';

import { Star16Icon } from '@/shared/icons';
import { PATH } from '@/routes/path';
import { LoadingImage } from '../image/LoadingImage';
import { formatPrice } from '@somesay/shared';
interface ProductCardThumbnailProps {
  brandName: string;
  productName: string;
  price: number;
  rating: number;
  reviewCount?: number;
  productImgUrl: string;
  productId?: number;
}

export const ProductCardThumbnail = ({
  brandName,
  productName,
  price,
  rating,
  reviewCount,
  productImgUrl,
  productId,
}: ProductCardThumbnailProps) => {
  const formattedReviewCount = reviewCount?.toLocaleString('ko-KR');
  const formattedRating = rating.toFixed(2);
  const reviewCountLabel =
    formattedReviewCount === undefined
      ? ''
      : `, 리뷰 ${formattedReviewCount}개`;
  return (
    <div
      className="border-grey03 relative flex w-full items-center overflow-hidden border bg-white p-5"
      aria-label={`${brandName} ${productName}, ${formatPrice(price)}원, 별점 ${formattedRating}점${reviewCountLabel}`}
    >
      {/* 좌측 텍스트 */}
      <div
        className="body2-m relative flex w-1/2 shrink-0 flex-col gap-1 text-black"
        aria-hidden="true"
      >
        <p className="truncate">{brandName} </p>
        <p className="truncate tracking-[-0.014px]">{productName} </p>
        <p className="truncate">{formatPrice(price)}</p>
        <div className="flex items-center gap-1">
          {/* 별점 */}
          <div className="flex items-center">
            <Star16Icon className="text-primary-300" />
            <span>{formattedRating}</span>
          </div>
          {formattedReviewCount !== undefined && (
            <span className="truncate">({formattedReviewCount})</span>
          )}
        </div>
      </div>

      {/* 우측 이미지 + 블러 */}
      <div
        className="absolute top-0 right-0 flex h-full w-1/2 shrink-0"
        aria-hidden="true"
      >
        <LoadingImage
          src={productImgUrl}
          alt=""
          wrapperClassName="h-full w-full"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-y-0 left-0 w-2/5"
          style={{
            background:
              'linear-gradient(268.36deg, rgba(255,255,255,0) 26.148%, rgba(255,255,255,0.7) 68.95%, rgb(255,255,255) 97.484%)',
          }}
        />
      </div>

      {productId !== undefined && (
        <Link
          to={`${PATH.PRODUCT.BASE}/${productId}`}
          className="absolute inset-0 z-10"
          aria-label={`${brandName} ${productName} 상세 보기`}
        />
      )}
    </div>
  );
};
