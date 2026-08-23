//Product/내리뷰평가화면/세로형

import cn from '@/utils/cn';

interface EvaluatedProductItemVerticalProps {
  productId: number;
  productImageUrl: string;
  productName: string;
  isSelected: boolean;
  onClick: (productId: number) => void;
}

export const EvaluatedProductItemVertical = ({
  productId,
  productImageUrl,
  productName,
  isSelected,
  onClick,
}: EvaluatedProductItemVerticalProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick(productId)}
      className="flex flex-col items-center gap-2"
    >
      <div
        className={cn(
          'size-15 overflow-hidden rounded-full',
          isSelected ? 'border-[1.8px] border-black' : 'opacity-50'
        )}
      >
        {productImageUrl && (
          <img
            src={productImageUrl}
            alt={productName}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <span className="caption1-m line-clamp-1 w-15 text-center">
        {productName}
      </span>
    </button>
  );
};
