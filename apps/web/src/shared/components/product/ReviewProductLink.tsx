// product/리뷰용 컴포넌트
import { Link } from 'react-router';

import { ArrowRightIcon } from '@/shared/icons';
import type { ProductCardType } from '@somesay/shared';

interface ReviewProductLinkProps {
  product: Pick<
    ProductCardType,
    'productId' | 'brand' | 'productName' | 'imageUrl' | 'price'
  >;
  showArrow?: boolean;
}

export const ReviewProductLink = ({
  product,
  showArrow,
}: ReviewProductLinkProps) => {
  return (
    <Link
      to={`/임시`}
      className="flex items-center gap-3"
      aria-label={`연결 상품: ${product.brand} ${product.productName}`}
    >
      <div className="border-grey02 h-[3.6875rem] w-[3.25rem] shrink-0 overflow-hidden border">
        <img
          src={product.imageUrl}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <span className="caption1-m text-black">{product.brand}</span>
        <span className="caption1-m line-clamp-1 text-black">
          {product.productName}
        </span>
        <span className="caption1-m text-black">
          {product.price.toLocaleString()}원
        </span>
      </div>
      {showArrow && <ArrowRightIcon className="size-4 shrink-0 -rotate-90" />}
    </Link>
  );
};
