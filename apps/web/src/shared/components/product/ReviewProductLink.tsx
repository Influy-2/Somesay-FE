// product/리뷰용 컴포넌트
import { Link } from 'react-router';
import { formatPrice, type ProductPreviewCard } from '@somesay/shared';

interface ReviewProductLinkProps {
  product: Pick<
    ProductPreviewCard,
    'productId' | 'brandName' | 'productName' | 'productImgUrl' | 'productPrice'
  >;
  showArrow?: boolean;
}

export const ReviewProductLink = ({ product }: ReviewProductLinkProps) => {
  return (
    <Link
      to={`/임시`}
      className="flex w-full items-center gap-3"
      aria-label={`연결 상품: ${product.brandName} ${product.productName}`}
    >
      {/* 사진 */}
      <div className="border-grey02 bg-grey01 h-[3.6875rem] w-[3.25rem] shrink-0 overflow-hidden border">
        {product.productImgUrl && (
          <img
            src={product.productImgUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
      </div>
      {/* 브랜드 상품이름 가격 */}
      <div className="flex flex-1 flex-col gap-1">
        <span className="caption1-m text-black">{product.brandName}</span>
        <span className="caption1-m line-clamp-1 text-black">
          {product.productName}
        </span>
        <span className="caption1-m text-black">
          {formatPrice(product.productPrice)}
        </span>
      </div>
    </Link>
  );
};
