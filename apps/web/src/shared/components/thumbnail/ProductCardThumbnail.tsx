// 컴포넌트 Thumbnail/기본형
import Star16Icon from '@/shared/icons/Star16Icon.svg?react';
interface ProductCardThumbnailProps {
  brand: string;
  productName: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
}

export const ProductCardThumbnail = ({
  brand,
  productName,
  price,
  rating,
  reviewCount,
  imageUrl,
}: ProductCardThumbnailProps) => {
  const formattedPrice = price.toLocaleString('ko-KR');
  const formattedReviewCount = reviewCount.toLocaleString('ko-KR');
  return (
    <div
      className="border-grey03 relative flex w-full items-center overflow-hidden border bg-white p-5"
      aria-label={`${brand} ${productName}, ${formattedPrice}원, 별점 ${rating}점, 리뷰 ${formattedReviewCount}개`}
    >
      {/* 좌측 텍스트 */}
      <div
        className="body2-m relative flex w-1/2 shrink-0 flex-col gap-1 text-black"
        aria-hidden="true"
      >
        <p className="truncate">{brand} </p>
        <p className="truncate tracking-[-0.014px]">{productName} </p>
        <p className="truncate">{formattedPrice}원</p>
        <div className="flex items-center gap-1">
          {/* 별점 */}
          <div className="flex items-center">
            <Star16Icon className="text-grey07" />
            <span>{rating}</span>
          </div>
          <span className="truncate">({formattedReviewCount})</span>
        </div>
      </div>

      {/* 우측 이미지 + 블러 */}
      <div
        className="absolute top-0 right-0 flex h-full w-1/2 shrink-0"
        aria-hidden="true"
      >
        <img
          src={imageUrl}
          alt={`${brand} ${productName} 제품 이미지`}
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
    </div>
  );
};
