//Product/내리뷰평가화면/가로형

import { Link } from 'react-router';
import { PATH } from '@/routes/path';
import { ArrowRightIcon } from '@/shared/icons';

interface EvaluatedProductItemHorizontalProps {
  productId: number;
  productImgUrl: string;
  productName: string;
  brandName: string;
  reviewCount: number;
}

export const EvaluatedProductItemHorizontal = ({
  productId,
  productImgUrl,
  productName,
  brandName,
  reviewCount,
}: EvaluatedProductItemHorizontalProps) => {
  return (
    <Link
      to={`${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.REVIEW_EVALUATION.BASE}`}
      state={{ selectedProductId: productId }}
      className="flex items-center gap-3.5 px-4 py-3"
      aria-label={`${brandName} ${productName} 리뷰 평가 보기`}
    >
      <div className="bg-grey02 size-15 shrink-0 overflow-hidden rounded-full">
        {productImgUrl && (
          <img
            src={productImgUrl}
            alt={productName}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="body2-m flex flex-col gap-1">
        <span>{brandName}</span>
        <span className="line-clamp-1">{productName}</span>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-1">
        <span className="body2-m text-grey08">{reviewCount}개</span>
        <ArrowRightIcon className="text-grey06" />
      </div>
    </Link>
  );
};
