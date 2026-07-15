//Review/ Preview

import { Star16Icon } from '@/shared/icons';
import { Link } from 'react-router';
import { PATH } from '@/routes/path';
import { ReviewProductLink } from '@/shared/components';

interface PreviewProps {
  rating: number;
  content: string;
  product: {
    productId: number;
    productName: string;
    brandName: string;
    productImageUrl: string;
    price: number;
  };
}

export const Preview = ({ rating, content, product }: PreviewProps) => {
  return (
    <div className="border-grey02 flex h-58 w-83.5 flex-col justify-between border p-5">
      <Link
        to={`${PATH.PRODUCT.BASE}/${product.productId}`}
        className="flex flex-1 flex-col gap-1"
        aria-label="리뷰 원본 보기"
      >
        {/* 별점 */}
        <div className="flex items-center gap-px">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star16Icon
              key={i}
              className={i < rating ? 'text-primary-300' : 'text-grey03'}
              aria-hidden="true"
            />
          ))}
          <span className="body2-sb ml-0.5">{rating}</span>
        </div>
        {/* 리뷰 */}
        <div className="flex flex-1 items-center">
          <p className="body2-m line-clamp-4">{content}</p>
        </div>
      </Link>

      {/* 상품 정보 */}
      <ReviewProductLink product={product} />
    </div>
  );
};
